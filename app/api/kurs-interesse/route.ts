import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const EmailSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = EmailSchema.parse(body)

    const existing = await prisma.kursInteresse.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: true, exists: true })
    }

    await prisma.kursInteresse.create({ data: { email } })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Fehler beim Speichern.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format')

  const items = await prisma.kursInteresse.findMany({
    orderBy: { createdAt: 'desc' },
  })

  if (format === 'csv') {
    const rows = ['E-Mail,Datum', ...items.map((i) => `${i.email},${i.createdAt.toISOString()}`)]
    return new NextResponse(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="kurs-interesse.csv"',
      },
    })
  }

  return NextResponse.json(items)
}
