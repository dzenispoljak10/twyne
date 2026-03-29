import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendIndividuelleMail } from '@/lib/mail'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { an, betreff, inhalt, typ } = body

  if (!an || !betreff || !inhalt) {
    return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 })
  }

  try {
    await sendIndividuelleMail({ an, betreff, inhalt }).catch(console.error)

    const mail = await prisma.projektMail.create({
      data: {
        an,
        betreff,
        inhalt,
        typ: typ || 'INDIVIDUELL',
        projektId: id,
      },
    })
    return NextResponse.json({ success: true, mail })
  } catch (error) {
    console.error('CRM mail error:', error)
    return NextResponse.json({ message: 'Fehler beim Senden' }, { status: 500 })
  }
}
