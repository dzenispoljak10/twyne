import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const kunden = await prisma.kunde.findMany({
    orderBy: { firma: 'asc' },
    include: {
      _count: { select: { projekte: true, mails: true } },
    },
  })
  return NextResponse.json(kunden)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { firma, vorname, nachname, email, telefon, website, adresse, notiz } = body

  if (!firma || !vorname || !nachname || !email) {
    return NextResponse.json({ message: 'Pflichtfelder fehlen' }, { status: 400 })
  }

  const kunde = await prisma.kunde.create({
    data: { firma, vorname, nachname, email, telefon, website, adresse, notiz },
  })
  return NextResponse.json(kunde, { status: 201 })
}
