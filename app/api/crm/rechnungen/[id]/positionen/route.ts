import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { positionen } = await req.json()

  const [, rechnung] = await prisma.$transaction([
    prisma.rechnungsPosition.deleteMany({ where: { rechnungId: id } }),
    prisma.rechnung.update({
      where: { id },
      data: {
        positionen: {
          create: positionen.map((p: any, i: number) => ({
            beschreibung: p.beschreibung,
            menge: p.menge ?? 1,
            einheit: p.einheit ?? 'Std.',
            einzelpreis: p.einzelpreis ?? 0,
            reihenfolge: p.reihenfolge ?? i,
          })),
        },
      },
      include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
    }),
  ])

  return NextResponse.json(rechnung)
}
