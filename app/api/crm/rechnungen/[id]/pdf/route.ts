import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRechnungPdf, generateMahnungPdf } from '@/lib/pdf-generator'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const typ = new URL(req.url).searchParams.get('typ') ?? 'rechnung'

  const rechnung = await prisma.rechnung.findUnique({
    where: { id },
    include: {
      positionen: { orderBy: { reihenfolge: 'asc' } },
      projekt: { include: { kunde: true } },
    },
  })

  if (!rechnung) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  let buffer: Buffer
  let filename: string

  if (typ === 'mahnung1') {
    buffer = await generateMahnungPdf(rechnung as any, 1)
    filename = `Mahnung1-${rechnung.nr}.pdf`
  } else if (typ === 'mahnung2') {
    buffer = await generateMahnungPdf(rechnung as any, 2)
    filename = `Mahnung2-${rechnung.nr}.pdf`
  } else {
    buffer = await generateRechnungPdf(rechnung as any)
    filename = `Rechnung-${rechnung.nr}.pdf`
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  })
}
