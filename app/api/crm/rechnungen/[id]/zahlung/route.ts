import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { berechnePositionen } from '@/lib/crm-helpers'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { bezahltBetrag } = await req.json()

  const rechnung = await prisma.rechnung.findUnique({
    where: { id },
    include: { positionen: true },
  })
  if (!rechnung) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  const { summen } = berechnePositionen(rechnung.positionen)
  const betrag = Number(bezahltBetrag)
  const total = summen.total

  let status: string
  if (betrag <= 0) {
    status = rechnung.status as string
  } else if (betrag >= total) {
    status = 'BEZAHLT'
  } else {
    status = 'TEILBEZAHLT'
  }

  const updated = await prisma.rechnung.update({
    where: { id },
    data: { bezahltBetrag: betrag, status: status as any },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
  })

  return NextResponse.json(updated)
}
