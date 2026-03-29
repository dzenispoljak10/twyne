import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOffertePdf } from '@/lib/pdf-generator'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const offerte = await prisma.offerte.findUnique({
    where: { id },
    include: {
      positionen: { orderBy: { reihenfolge: 'asc' } },
      projekt: { include: { kunde: true } },
    },
  })

  if (!offerte) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  const buffer = await generateOffertePdf(offerte as any)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="Offerte-${offerte.nr}.pdf"`,
    },
  })
}
