import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  kategorie: z.enum(['WEBSEITEN', 'WEBAPPLIKATIONEN', 'SOFTWARE', 'CMS', 'KI_BERATUNG', 'DIGITALE_TRANSFORMATION', 'SEO']).optional(),
  jahr: z.number().int().min(2000).max(2035).optional(),
  beschreibung: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  bildUrl: z.string().optional().nullable(),
  thumbnailColor: z.string().optional(),
  technologie: z.string().optional(),
  reihenfolge: z.number().int().optional(),
  sichtbar: z.boolean().optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const projekt = await prisma.portfolio.findUnique({ where: { id } })
  if (!projekt) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  return NextResponse.json(projekt)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    const body = await req.json()
    const data = UpdateSchema.parse(body)
    const projekt = await prisma.portfolio.update({ where: { id }, data })
    return NextResponse.json(projekt)
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 })
    console.error('[PATCH /api/portfolio/:id]', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.portfolio.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
