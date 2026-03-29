import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const anfrage = await prisma.anfrage.findUnique({
    where: { id },
    include: { mails: true, uploads: true, projekt: true },
  })
  if (!anfrage) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(anfrage)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const anfrage = await prisma.anfrage.update({ where: { id }, data: body })
  return NextResponse.json(anfrage)
}
