import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resolveFilePath, deleteFile } from '@/lib/upload'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const cutoff = new Date()
  cutoff.setHours(cutoff.getHours() - 48)

  // Delete old HOCHGELADEN uploads that have never been downloaded (48h+)
  const oldUploads = await prisma.upload.findMany({
    where: {
      status: 'HOCHGELADEN',
      createdAt: { lt: cutoff },
      dateipfad: { not: null },
    },
  })

  let deleted = 0
  for (const upload of oldUploads) {
    if (upload.dateipfad) {
      const filePath = resolveFilePath(upload.dateipfad)
      deleteFile(filePath)
    }
    await prisma.upload.delete({ where: { id: upload.id } })
    deleted++
  }

  return NextResponse.json({ success: true, deleted })
}
