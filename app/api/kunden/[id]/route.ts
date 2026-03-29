import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const kunde = await prisma.kunde.findUnique({
    where: { id },
    include: {
      projekte: {
        orderBy: { updatedAt: 'desc' },
        include: { offerten: true, rechnungen: true },
      },
      mails: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!kunde) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(kunde)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updated = await prisma.kunde.update({
    where: { id },
    data: {
      firma: body.firma,
      vorname: body.vorname,
      nachname: body.nachname,
      email: body.email,
      telefon: body.telefon,
      website: body.website,
      adresse: body.adresse,
      notiz: body.notiz,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.kunde.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
