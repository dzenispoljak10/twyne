import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
  return NextResponse.json(offerte)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { status, notiz, gueltigBis, datum } = body

  const offerte = await prisma.offerte.update({
    where: { id },
    data: {
      ...(status !== undefined && { status }),
      ...(notiz !== undefined && { notiz }),
      ...(gueltigBis !== undefined && { gueltigBis: new Date(gueltigBis) }),
      ...(datum !== undefined && { datum: new Date(datum) }),
    },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
  })

  return NextResponse.json(offerte)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const offerte = await prisma.offerte.findUnique({ where: { id }, select: { status: true } })
  if (!offerte) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  if (offerte.status !== 'ENTWURF') {
    return NextResponse.json({ error: 'Nur Entwürfe können gelöscht werden' }, { status: 409 })
  }
  await prisma.offerte.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
