import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { validateZipFile, validateFileSize, ensureUploadDir } from '@/lib/upload'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const uploads = await prisma.upload.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(uploads)
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const projektId = formData.get('projektId') as string | null
    const anfrageId = formData.get('anfrageId') as string | null

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

    // Use a temporary ID-based token for legacy uploads
    const upload = await prisma.upload.create({
      data: {
        projektId: projektId || null,
        anfrageId: anfrageId || null,
        status: 'HOCHGELADEN',
      },
    })

    const dir = ensureUploadDir(upload.token)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = path.join(dir, safeName)
    fs.writeFileSync(filePath, buffer)

    await prisma.upload.update({
      where: { id: upload.id },
      data: { dateiname: safeName, dateipfad: filePath, dateigroesse: file.size },
    })

    return NextResponse.json({ upload }, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ message: 'Upload fehlgeschlagen' }, { status: 500 })
  }
}
