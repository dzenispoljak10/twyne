import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { anfrageSchema } from '@/lib/validations'
import { sendEingangsbestaetigung } from '@/lib/mail'
import { sanitizeAnfrage } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = anfrageSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Ungültige Eingabe', errors: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const data = sanitizeAnfrage(parsed.data as Record<string, unknown>)
    const anfrage = await prisma.anfrage.create({
      data: {
        vorname: data.vorname,
        nachname: data.nachname,
        firma: data.firma,
        email: data.email,
        telefon: data.telefon,
        website: data.website || null,
        budget: data.budget || null,
        dienstleistung: data.dienstleistung,
        nachricht: data.nachricht,
        status: 'NEU',
      },
    })

    await sendEingangsbestaetigung({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      dienstleistung: data.dienstleistung,
      nachricht: data.nachricht,
    }).catch(console.error)

    await prisma.mail.create({
      data: {
        an: data.email,
        betreff: 'Ihre Anfrage bei Twyne — Bestätigung',
        inhalt: `Eingangsbestätigung für ${data.vorname} ${data.nachname}`,
        typ: 'BESTAETIGUNG',
        anfrageId: anfrage.id,
      },
    })

    return NextResponse.json({ success: true, id: anfrage.id }, { status: 201 })
  } catch (error) {
    console.error('Anfrage creation error:', error)
    return NextResponse.json({ message: 'Interner Fehler' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const anfragen = await prisma.anfrage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(anfragen)
  } catch {
    return NextResponse.json({ message: 'Fehler' }, { status: 500 })
  }
}
