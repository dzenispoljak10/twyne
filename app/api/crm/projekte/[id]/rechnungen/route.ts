import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { naechsteRechnungsNr } from '@/lib/crm-helpers'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rechnungen = await prisma.rechnung.findMany({
    where: { projektId: id },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(rechnungen)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { datum, faelligBis, zahlungsreferenz, vonOfferteId, positionen: bodyPositionen } = body

  if (!faelligBis) {
    return NextResponse.json({ error: 'faelligBis erforderlich' }, { status: 400 })
  }

  // Optionally copy positions from an existing offerte
  let positionen = bodyPositionen ?? []
  if (vonOfferteId && positionen.length === 0) {
    const offerte = await prisma.offerte.findUnique({
      where: { id: vonOfferteId },
      include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
    })
    if (offerte) {
      positionen = offerte.positionen.map((p) => ({
        beschreibung: p.beschreibung,
        menge: Number(p.menge),
        einheit: p.einheit,
        einzelpreis: Number(p.einzelpreis),
        reihenfolge: p.reihenfolge,
      }))
    }
  }

  const nr = await naechsteRechnungsNr()

  const rechnung = await prisma.rechnung.create({
    data: {
      nr,
      datum: datum ? new Date(datum) : new Date(),
      faelligBis: new Date(faelligBis),
      zahlungsreferenz: zahlungsreferenz || null,
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

  return NextResponse.json(rechnung, { status: 201 })
}
