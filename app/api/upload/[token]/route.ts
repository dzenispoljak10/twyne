import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateZipFile, validateFileSize, ensureUploadDir } from '@/lib/upload'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const upload = await prisma.upload.findUnique({
    where: { token },
    include: { projekt: { select: { id: true, name: true } } },
  })

  if (!upload) {
    return NextResponse.json({ message: 'Ungültiger Link' }, { status: 404 })
  }
  if (upload.status !== 'AUSSTEHEND') {
    return NextResponse.json({ message: 'Dieser Link wurde bereits verwendet' }, { status: 409 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ message: 'Upload fehlgeschlagen' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ message: 'Keine Datei' }, { status: 400 })

  if (!file.name.toLowerCase().endsWith('.zip')) {
    return NextResponse.json({ message: 'Nur ZIP-Dateien erlaubt' }, { status: 400 })
  }

  if (!validateFileSize(file.size)) {
    return NextResponse.json({ message: 'Datei zu gross (max. 200 MB)' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  if (!validateZipFile(buffer)) {
    return NextResponse.json({ message: 'Ungültiges ZIP-Format' }, { status: 400 })
  }

  const dir = ensureUploadDir(token)
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = path.join(dir, safeName)
  fs.writeFileSync(filePath, buffer)

  await prisma.upload.update({
    where: { token },
    data: {
      dateiname: safeName,
      dateipfad: filePath,
      dateigroesse: file.size,
      status: 'HOCHGELADEN',
    },
  })


  return NextResponse.json({ success: true })
}
