import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendLeadBestaetigung } from '@/lib/mail'
import { z } from 'zod'

const CreateLeadSchema = z.object({
  firma: z.string().min(1),
  ansprechperson: z.string().min(1),
  email: z.string().email(),
  telefon: z.string().optional(),
  nachricht: z.string().optional(),
  quelle: z.enum(['PRODUKT_DEMO', 'DIENSTLEISTUNG', 'KONTAKTFORMULAR']),
  produkt: z.enum(['CLUB', 'TABLE', 'DESK', 'FLOW']).optional(),
  dienstleistung: z.enum(['WEBSEITEN', 'WEBAPPLIKATIONEN', 'SOFTWARE', 'CMS', 'KI_BERATUNG', 'DIGITALE_TRANSFORMATION', 'SEO']).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = CreateLeadSchema.parse(body)

    const lead = await prisma.lead.create({ data })

    await sendLeadBestaetigung({
      firma: lead.firma,
      ansprechperson: lead.ansprechperson,
      email: lead.email,
      produkt: lead.produkt,
      dienstleistung: lead.dienstleistung,
    }).catch(console.error)

    return NextResponse.json({ id: lead.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Fehler beim Erstellen des Leads' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const quelle = searchParams.get('quelle')
  const format = searchParams.get('format')

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (quelle) where.quelle = quelle

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  if (format === 'csv') {
    const header = 'ID,Firma,Ansprechperson,E-Mail,Telefon,Quelle,Produkt,Dienstleistung,Status,Erstellt'
    const rows = leads.map((l) =>
      [
        l.id,
        `"${l.firma}"`,
        `"${l.ansprechperson}"`,
        l.email,
        l.telefon ?? '',
        l.quelle,
        l.produkt ?? '',
        l.dienstleistung ?? '',
        l.status,
        l.createdAt.toISOString(),
      ].join(',')
    )
    const csv = [header, ...rows].join('\n')
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    })
  }

  return NextResponse.json(leads)
}
