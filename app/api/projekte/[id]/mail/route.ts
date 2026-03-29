import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendIndividuelleMail, sendUploadLink } from '@/lib/mail'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { an, betreff, inhalt, typ } = body

  try {
    if (typ === 'UPLOAD_ANFRAGE') {
      const upload = await prisma.upload.create({
        data: { projektId: id },
      })

      const projekt = await prisma.projekt.findUnique({
        where: { id },
        select: { name: true, kontaktVorname: true, kontaktEmail: true, kunde: { select: { vorname: true, email: true } } },
      })

      if (projekt) {
        const vorname = projekt.kontaktVorname ?? projekt.kunde?.vorname ?? undefined
        const empfaenger = projekt.kontaktEmail ?? projekt.kunde?.email ?? an
        const uploadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/upload/${upload.token}`
        await sendUploadLink({
          an: empfaenger,
          uploadUrl,
          projektName: projekt.name,
          vorname,
        }).catch(console.error)
      }
    } else {
      await sendIndividuelleMail({ an, betreff, inhalt }).catch(console.error)
    }

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
    console.error('Mail send error:', error)
    return NextResponse.json({ message: 'Fehler beim Senden' }, { status: 500 })
  }
}
