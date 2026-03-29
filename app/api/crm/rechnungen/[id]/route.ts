import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rechnung = await prisma.rechnung.findUnique({
    where: { id },
    include: {
      positionen: { orderBy: { reihenfolge: 'asc' } },
      projekt: { include: { kunde: true } },
    },
  })
  if (!rechnung) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  return NextResponse.json(rechnung)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { status, zahlungsreferenz, faelligBis, datum } = body

  const rechnung = await prisma.rechnung.update({
    where: { id },
    data: {
      ...(status !== undefined && { status }),
      ...(zahlungsreferenz !== undefined && { zahlungsreferenz }),
      ...(faelligBis !== undefined && { faelligBis: new Date(faelligBis) }),
      ...(datum !== undefined && { datum: new Date(datum) }),
    },
    include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
  })

  return NextResponse.json(rechnung)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rechnung = await prisma.rechnung.findUnique({ where: { id }, select: { status: true } })
  if (!rechnung) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  if (rechnung.status !== 'ENTWURF') {
    return NextResponse.json({ error: 'Nur Entwürfe können gelöscht werden' }, { status: 409 })
  }
  await prisma.rechnung.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
