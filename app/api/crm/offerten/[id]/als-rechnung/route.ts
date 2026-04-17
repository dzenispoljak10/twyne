import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { naechsteRechnungsNr } from '@/lib/crm-helpers-server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { faelligBis } = body

  const offerte = await prisma.offerte.findUnique({
    where: { id },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
  })
  if (!offerte) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })

  const nr = await naechsteRechnungsNr()

  const [rechnung] = await prisma.$transaction([
    prisma.rechnung.create({
      data: {
        nr,
        datum: new Date(),
        faelligBis: faelligBis ? new Date(faelligBis) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        projektId: offerte.projektId,
        positionen: {
          create: offerte.positionen.map((p) => ({
            beschreibung: p.beschreibung,
            menge: p.menge,
            einheit: p.einheit,
            einzelpreis: p.einzelpreis,
            reihenfolge: p.reihenfolge,
          })),
        },
      },
    }),
    prisma.offerte.update({
      where: { id },
      data: { status: 'ANGENOMMEN' },
    }),
  ])

  return NextResponse.json({ success: true, rechnungId: rechnung.id, nr: rechnung.nr }, { status: 201 })
}
