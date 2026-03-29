import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateRechnungPdf, generateMahnungPdf } from '@/lib/pdf-generator'
import { sendRechnung, sendZahlungserinnerung, sendMahnung } from '@/lib/mail'
import { berechnePositionen, formatChf } from '@/lib/crm-helpers'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { an, betreff, inhalt, mitPdf, typ = 'RECHNUNG', mahnungStufe } = await req.json()

  if (!an) return NextResponse.json({ message: 'Empfänger fehlt' }, { status: 400 })

  const rechnung = await prisma.rechnung.findUnique({
    where: { id },
    include: {
      positionen: { orderBy: { reihenfolge: 'asc' } },
      projekt: { include: { kunde: true } },
    },
  })
  if (!rechnung) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  const { summen } = berechnePositionen(rechnung.positionen)
  const betrag = formatChf(summen.total)
  const vorname = rechnung.projekt.kontaktVorname ?? rechnung.projekt.kunde?.vorname ?? undefined
  const faelligStr = new Date(rechnung.faelligBis).toLocaleDateString('de-CH', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  try {
    if (typ === 'ZAHLUNGSERINNERUNG') {
      await sendZahlungserinnerung({
        an,
        rechnungNr: rechnung.nr,
        betrag,
        faelligBis: faelligStr,
        vorname,
      }).catch(console.error)
    } else if (typ === 'MAHNUNG_1' || typ === 'MAHNUNG_2') {
      const stufe = (mahnungStufe === 2 || typ === 'MAHNUNG_2') ? 2 : 1
      await sendMahnung({ an, rechnungNr: rechnung.nr, betrag, stufe, vorname }).catch(console.error)
    } else {
      // RECHNUNG — sends user-composed text with optional PDF
      if (!betreff || !inhalt) return NextResponse.json({ message: 'Betreff und Inhalt erforderlich' }, { status: 400 })
      let pdfBuffer: Buffer | undefined
      if (mitPdf) {
        if (mahnungStufe === 1 || mahnungStufe === 2) {
          pdfBuffer = await generateMahnungPdf(rechnung as any, mahnungStufe)
        } else {
          pdfBuffer = await generateRechnungPdf(rechnung as any)
        }
      }
      await sendRechnung({ an, betreff, nachricht: inhalt, rechnungNr: rechnung.nr, pdfBuffer }).catch(console.error)
    }

    const mail = await prisma.projektMail.create({
      data: {
        an,
        betreff: betreff || (typ === 'ZAHLUNGSERINNERUNG'
          ? `Zahlungserinnerung — Rechnung ${rechnung.nr}`
          : typ === 'MAHNUNG_1' ? `1. Mahnung — Rechnung ${rechnung.nr}`
          : typ === 'MAHNUNG_2' ? `2. Mahnung — Rechnung ${rechnung.nr}`
          : `Rechnung ${rechnung.nr}`),
        inhalt: inhalt || typ,
        typ,
        projektId: rechnung.projekt.id,
      },
    })

    return NextResponse.json({ success: true, mail })
  } catch (error) {
    console.error('Rechnung mail error:', error)
    return NextResponse.json({ message: 'Fehler beim Senden' }, { status: 500 })
  }
}
