import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const ReorderSchema = z.object({
  items: z.array(z.object({ id: z.string(), reihenfolge: z.number().int() })),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { items } = ReorderSchema.parse(body)

    await prisma.$transaction(
      items.map(({ id, reihenfolge }) =>
        prisma.portfolio.update({ where: { id }, data: { reihenfolge } })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 })
    return NextResponse.json({ error: 'Fehler beim Sortieren' }, { status: 500 })
  }
}
