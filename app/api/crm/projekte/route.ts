import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const projekte = await prisma.projekt.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      kunde: { select: { id: true, firma: true, vorname: true, nachname: true, email: true } },
      _count: { select: { mails: true, notizen: true } },
    },
  })
  return NextResponse.json(projekte)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, beschreibung, kundeId } = body

  if (!name) {
    return NextResponse.json({ message: 'Name ist erforderlich' }, { status: 400 })
  }

  const projekt = await prisma.projekt.create({
    data: { name, beschreibung, kundeId: kundeId || undefined },
    include: {
      kunde: { select: { id: true, firma: true, vorname: true, nachname: true } },
    },
  })
  return NextResponse.json(projekt, { status: 201 })
}
