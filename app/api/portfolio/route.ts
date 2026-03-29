import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const CreateSchema = z.object({
  name: z.string().min(1),
  kategorie: z.enum(['WEBSEITEN', 'WEBAPPLIKATIONEN', 'SOFTWARE', 'CMS', 'KI_BERATUNG', 'DIGITALE_TRANSFORMATION', 'SEO']),
  jahr: z.number().int().min(2000).max(2035),
  beschreibung: z.string().min(1),
  tags: z.array(z.string()),
  bildUrl: z.string().optional().nullable(),
  thumbnailColor: z.string().default('#1a1a2e'),
  technologie: z.string().default(''),
  reihenfolge: z.number().int().default(0),
  sichtbar: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const kategorie = searchParams.get('kategorie')
  const sichtbarParam = searchParams.get('sichtbar')

  const where: Record<string, unknown> = {}
  if (kategorie) where.kategorie = kategorie
  if (sichtbarParam !== null) where.sichtbar = sichtbarParam === 'true'

  const projekte = await prisma.portfolio.findMany({
    where,
    orderBy: [{ reihenfolge: 'asc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json(projekte)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = CreateSchema.parse(body)
    const projekt = await prisma.portfolio.create({ data })
    return NextResponse.json(projekt, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 })
    console.error('[POST /api/portfolio]', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
