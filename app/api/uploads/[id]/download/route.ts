import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { resolveFilePath, deleteFile } from '@/lib/upload'
import fs from 'fs'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const upload = await prisma.upload.findUnique({ where: { id } })
  if (!upload) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  if (!upload.dateipfad) return NextResponse.json({ message: 'Datei nicht verfügbar' }, { status: 404 })

  const filePath = resolveFilePath(upload.dateipfad)

  if (!fs.existsSync(filePath)) {
    // File already gone — mark as downloaded anyway
    await prisma.upload.update({
      where: { id },
      data: { status: 'HERUNTERGELADEN', heruntergeladenAm: new Date() },
    })
    return NextResponse.json({ message: 'Datei nicht mehr vorhanden' }, { status: 404 })
  }

  const fileBuffer = fs.readFileSync(filePath)
  const filename = upload.dateiname || 'datei.zip'

  const headers = new Headers()
  headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  headers.set('Content-Type', 'application/zip')
  headers.set('Content-Length', String(fileBuffer.length))

  await prisma.upload.update({
    where: { id },
    data: { status: 'HERUNTERGELADEN', heruntergeladenAm: new Date() },
  })

  deleteFile(filePath)

  return new NextResponse(fileBuffer, { headers })
}
