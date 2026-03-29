import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendAnnahme } from '@/lib/mail'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const anfrage = await prisma.anfrage.findUnique({ where: { id } })
    if (!anfrage) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    if (anfrage.status === 'ANGENOMMEN') {
      const existing = await prisma.projekt.findUnique({ where: { anfrageId: id } })
      if (existing) return NextResponse.json({ projektId: existing.id })
    }

    const [, projekt] = await prisma.$transaction([
      prisma.anfrage.update({ where: { id }, data: { status: 'ANGENOMMEN' } }),
      prisma.projekt.create({
        data: {
          name: anfrage.firma,
          status: 'AKTIV',
          anfrageId: anfrage.id,
          kontaktVorname: anfrage.vorname,
          kontaktNachname: anfrage.nachname,
          kontaktEmail: anfrage.email,
          kontaktTelefon: anfrage.telefon,
          kontaktFirma: anfrage.firma,
        },
      }),
    ])

    await sendAnnahme({
      vorname: anfrage.vorname,
      email: anfrage.email,
      projektName: anfrage.firma,
    }).catch(console.error)

    await prisma.mail.create({
      data: {
        an: anfrage.email,
        betreff: 'Ihr Projekt bei Twyne — Willkommen!',
        inhalt: `Annahme-Mail für Projekt: ${projekt.id}`,
        typ: 'ANNAHME',
        anfrageId: id,
      },
    })

    return NextResponse.json({ success: true, projektId: projekt.id })
  } catch (error) {
    console.error('Annehmen error:', error)
    return NextResponse.json({ message: 'Fehler beim Annehmen' }, { status: 500 })
  }
}
