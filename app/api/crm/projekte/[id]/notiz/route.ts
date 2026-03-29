import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  if (!body.inhalt) {
    return NextResponse.json({ message: 'Inhalt fehlt' }, { status: 400 })
  }

  const notiz = await prisma.projektNotiz.create({
    data: { inhalt: body.inhalt, projektId: id },
  })
  return NextResponse.json(notiz, { status: 201 })
}
