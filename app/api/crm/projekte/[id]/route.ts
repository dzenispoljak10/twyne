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

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.projekt.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
