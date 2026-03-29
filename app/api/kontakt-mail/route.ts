import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'info@twyne.ch'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'info@twyne.ch'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  nachricht: z.string().min(5),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `Kontaktanfrage von ${data.name} | Twyne`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#111111;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Nachricht:</strong></p>
          <p style="background:#F4F4F6;padding:16px;border-radius:8px;white-space:pre-wrap;">${data.nachricht}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Fehler beim Senden' }, { status: 500 })
  }
}
