import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendUploadLinkMail } from '@/lib/mail'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { an, nachricht } = await req.json()

  if (!an || !nachricht) {
    return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 })
  }

  const projekt = await prisma.projekt.findUnique({ where: { id }, select: { name: true } })
  if (!projekt) return NextResponse.json({ message: 'Projekt nicht gefunden' }, { status: 404 })

  // Create upload record (token auto-generated via @default(cuid()))
  const upload = await prisma.upload.create({
    data: { projektId: id, status: 'AUSSTEHEND' },
  })

  const uploadUrl = `${APP_URL}/upload/${upload.token}`

  await sendUploadLinkMail({
    an,
    nachricht,
    uploadUrl,
    projektName: projekt.name,
  }).catch(console.error)

  await prisma.projektMail.create({
    data: {
      an,
      betreff: `Upload-Link gesendet — ${projekt.name}`,
      inhalt: `${nachricht}\n\n${uploadUrl}`,
      typ: 'INDIVIDUELL',
      projektId: id,
    },
  })

  return NextResponse.json({ success: true, uploadId: upload.id })
}
