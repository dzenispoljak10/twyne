import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const projekt = await prisma.projekt.findUnique({
    where: { id },
    include: {
      kunde: true,
      anfrage: true,
      mails: { orderBy: { createdAt: 'desc' } },
      notizen: { orderBy: { createdAt: 'desc' } },
      uploads: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!projekt) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(projekt)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()

  if (body.notiz) {
    const notiz = await prisma.projektNotiz.create({
      data: { inhalt: body.notiz, projektId: id },
    })
    const notizen = await prisma.projektNotiz.findMany({
      where: { projektId: id },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ notiz, notizen })
  }

  const updated = await prisma.projekt.update({
    where: { id },
    data: {
      name: body.name,
      beschreibung: body.beschreibung,
      status: body.status,
    },
  })
  return NextResponse.json(updated)
}
