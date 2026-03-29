import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendAbsage } from '@/lib/mail'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { ablehnungsgrund } = body

  try {
    const anfrage = await prisma.anfrage.findUnique({ where: { id } })
    if (!anfrage) return NextResponse.json({ message: 'Not found' }, { status: 404 })

    await prisma.anfrage.update({
      where: { id },
      data: { status: 'ABGELEHNT', ablehnungsgrund: ablehnungsgrund || null },
    })

    await sendAbsage({
      vorname: anfrage.vorname,
      nachname: anfrage.nachname,
      email: anfrage.email,
      grund: ablehnungsgrund || undefined,
    }).catch(console.error)

    await prisma.mail.create({
      data: {
        an: anfrage.email,
        betreff: 'Ihre Anfrage bei Twyne — Rückmeldung',
        inhalt: 'Absage-Mail',
        typ: 'ABLEHNUNG',
        anfrageId: id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ablehnen error:', error)
    return NextResponse.json({ message: 'Fehler' }, { status: 500 })
  }
}
