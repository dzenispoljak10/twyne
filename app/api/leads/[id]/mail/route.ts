import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendIndividuelleMail } from '@/lib/mail'
import { z } from 'zod'

const MailSchema = z.object({
  betreff: z.string().min(1),
  inhalt: z.string().min(1),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const lead = await prisma.lead.findUnique({ where: { id } })
  if (!lead) return NextResponse.json({ error: 'Lead nicht gefunden' }, { status: 404 })

  const body = await req.json()

  try {
    const data = MailSchema.parse(body)
    await sendIndividuelleMail({ an: lead.email, betreff: data.betreff, inhalt: data.inhalt })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Fehler beim Senden der E-Mail' }, { status: 500 })
  }
}
