import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { naechsteOfferteNr } from '@/lib/crm-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const offerten = await prisma.offerte.findMany({
    where: { projektId: id },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(offerten)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { datum, gueltigBis, notiz, positionen = [] } = body

  if (!gueltigBis) {
    return NextResponse.json({ error: 'gueltigBis erforderlich' }, { status: 400 })
  }

  const nr = await naechsteOfferteNr()

  const offerte = await prisma.offerte.create({
    data: {
      nr,
      datum: datum ? new Date(datum) : new Date(),
      gueltigBis: new Date(gueltigBis),
      notiz: notiz || null,
      projektId: id,
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
  })

  return NextResponse.json(offerte, { status: 201 })
}
