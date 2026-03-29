import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const lead = await prisma.lead.findUnique({ where: { id } })
  if (!lead) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  // Check if customer with this email already exists
  const existingKunde = await prisma.kunde.findUnique({ where: { email: lead.email } })
  if (existingKunde) {
    return NextResponse.json({ kundeId: existingKunde.id, existing: true })
  }

  // Parse name
  const nameParts = lead.ansprechperson.trim().split(' ')
  const vorname = nameParts[0] || lead.ansprechperson
  const nachname = nameParts.slice(1).join(' ') || '—'

  const [kunde] = await prisma.$transaction([
    prisma.kunde.create({
      data: {
        firma: lead.firma,
        vorname,
        nachname,
        email: lead.email,
        telefon: lead.telefon,
        notiz: lead.nachricht,
      },
    }),
    prisma.lead.update({
      where: { id },
      data: { status: 'GEWONNEN' },
    }),
  ])

  return NextResponse.json({ kundeId: kunde.id, existing: false }, { status: 201 })
}
