import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateOffertePdf } from '@/lib/pdf-generator'
import { sendOfferte } from '@/lib/mail'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { an, betreff, inhalt, mitPdf } = await req.json()

  if (!an || !betreff || !inhalt) {
    return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 })
  }

  const offerte = await prisma.offerte.findUnique({
    where: { id },
    include: {
      positionen: { orderBy: { reihenfolge: 'asc' } },
      projekt: { include: { kunde: true } },
    },
  })
  if (!offerte) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  try {
    let pdfBuffer: Buffer | undefined
    if (mitPdf) {
      pdfBuffer = await generateOffertePdf(offerte as any)
    }

    await sendOfferte({
      an,
      betreff,
      nachricht: inhalt,
      offerteNr: offerte.nr,
      pdfBuffer,
    }).catch(console.error)

    const mail = await prisma.projektMail.create({
      data: {
        an,
        betreff,
        inhalt,
        typ: 'OFFERTE',
        projektId: offerte.projekt.id,
      },
    })

    return NextResponse.json({ success: true, mail })
  } catch (error) {
    console.error('Offerte mail error:', error)
    return NextResponse.json({ message: 'Fehler beim Senden' }, { status: 500 })
  }
}
