import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Twyne <info@twyne.ch>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// ─── Logo (weiss für dunklen Header) ──────────────────────────────────────────

const logoSvg = `<svg width="110" height="26" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="16" r="9" fill="none" stroke="#7C3AED" stroke-width="2.5"/>
  <circle cx="32" cy="16" r="9" fill="none" stroke="#A78BFA" stroke-width="2.5"/>
  <line x1="21" y1="16" x2="23" y2="16" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="12" cy="16" r="3" fill="#7C3AED"/>
  <circle cx="32" cy="16" r="3" fill="#A78BFA"/>
  <text x="50" y="22" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="#FFFFFF" letter-spacing="-1">twyne</text>
</svg>`

// ─── HTML Template ─────────────────────────────────────────────────────────────

function htmlTemplate(inhalt: string, ctaText?: string, ctaUrl?: string): string {
  const cta = ctaText && ctaUrl
    ? `<table cellpadding="0" cellspacing="0" style="margin:32px 0 8px;">
        <tr>
          <td style="background:#7C3AED;border-radius:8px;">
            <a href="${ctaUrl}" style="display:inline-block;padding:12px 28px;color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">${ctaText}</a>
          </td>
        </tr>
      </table>`
    : ''

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Twyne</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F6;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F6;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <!-- Header -->
      <tr>
        <td style="background:#111111;border-radius:12px 12px 0 0;padding:24px 40px;">
          ${logoSvg}
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="background:#FFFFFF;border-radius:0 0 12px 12px;padding:40px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#374151;line-height:1.7;">
            ${inhalt}
            ${cta}
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
            <tr>
              <td style="border-top:1px solid #E8E8ED;padding-top:24px;font-family:Arial,sans-serif;font-size:14px;color:#6B7280;line-height:1.7;">
                Mit freundlichen Grüssen<br>
                <strong style="color:#111111;font-size:15px;">Twyne</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="padding:24px 0;text-align:center;font-family:Arial,sans-serif;">
          <p style="margin:0 0 4px;color:#9CA3AF;font-size:12px;">
            Twyne &middot; <a href="https://twyne.ch" style="color:#9CA3AF;text-decoration:none;">twyne.ch</a> &middot; <a href="mailto:info@twyne.ch" style="color:#9CA3AF;text-decoration:none;">info@twyne.ch</a>
          </p>
          <p style="margin:0;color:#9CA3AF;font-size:12px;">
            &copy; 2025 Twyne, c/o Visiosign Poljak, Galliweg 3, 4852 Rothrist
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

// ─── Infoblock Helper ──────────────────────────────────────────────────────────

function infoBlock(rows: [string, string][]): string {
  return `<table cellpadding="0" cellspacing="0" width="100%" style="background:#F4F4F6;border-radius:8px;padding:20px;margin:24px 0;">
    <tbody>
      ${rows.map(([label, value]) =>
        `<tr><td style="padding:3px 0;font-size:14px;color:#374151;font-family:Arial,sans-serif;">
          <strong>${label}:</strong> ${value}
        </td></tr>`
      ).join('')}
    </tbody>
  </table>`
}

function para(text: string): string {
  return `<p style="margin:0 0 20px;font-size:16px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;">${text}</p>`
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#111111;font-family:Arial,sans-serif;">${text}</h2>`
}

// ─── 1. Eingangsbestätigung ────────────────────────────────────────────────────

export async function sendEingangsbestaetigung(data: {
  vorname: string
  nachname: string
  email: string
  dienstleistung: string[]
  nachricht: string
}) {
  const inhalt = `
    ${heading('Ihre Anfrage ist eingegangen')}
    ${para(`Guten Tag ${data.vorname} ${data.nachname},`)}
    ${para('vielen Dank für Ihre Anfrage. Wir haben diese erhalten und melden uns in der Regel innerhalb von 24 Stunden.')}
    ${infoBlock([
      ['Dienstleistung', data.dienstleistung.join(', ')],
      ['Nachricht', data.nachricht.length > 300 ? data.nachricht.substring(0, 300) + '…' : data.nachricht],
    ])}
  `
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Ihre Anfrage bei Twyne — Bestätigung',
    html: htmlTemplate(inhalt),
  })
}

// ─── 2. Annahme ───────────────────────────────────────────────────────────────

export async function sendAnnahme(data: {
  vorname: string
  email: string
  projektName: string
}) {
  const inhalt = `
    ${heading('Ihr Projekt bei Twyne — Willkommen!')}
    ${para(`Guten Tag ${data.vorname},`)}
    ${para(`wir freuen uns, Ihr Projekt annehmen zu können! Unter dem Namen <strong style="color:#7C3AED;">${data.projektName}</strong> werden wir Ihr Vorhaben gemeinsam umsetzen.`)}
    ${para('In Kürze melden wir uns mit den nächsten Schritten.')}
  `
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Ihr Projekt bei Twyne — Willkommen!',
    html: htmlTemplate(inhalt),
  })
}

// ─── 3. Absage ────────────────────────────────────────────────────────────────

export async function sendAbsage(data: {
  vorname: string
  nachname: string
  email: string
  grund?: string
}) {
  const grundBlock = data.grund
    ? `<table cellpadding="0" cellspacing="0" width="100%" style="background:#F4F4F6;border-radius:8px;padding:20px;margin:24px 0;">
        <tr><td style="font-size:14px;color:#374151;font-family:Arial,sans-serif;line-height:1.6;">${data.grund}</td></tr>
      </table>`
    : ''

  const inhalt = `
    ${heading('Rückmeldung zu Ihrer Anfrage')}
    ${para(`Guten Tag ${data.vorname} ${data.nachname},`)}
    ${para('vielen Dank für Ihr Vertrauen und Ihr Interesse an Twyne.')}
    ${para('Wir haben Ihre Anfrage sorgfältig geprüft und müssen Ihnen leider mitteilen, dass wir Ihr Projekt zum jetzigen Zeitpunkt nicht annehmen können. Dies liegt ausschliesslich an unserer aktuellen Auslastung und keinesfalls an Ihrem Vorhaben.')}
    ${grundBlock}
    ${para('Wir wünschen Ihnen viel Erfolg und hoffen auf eine zukünftige Zusammenarbeit.')}
  `
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Ihre Anfrage bei Twyne — Rückmeldung',
    html: htmlTemplate(inhalt),
  })
}

// ─── 4. Upload-Link ───────────────────────────────────────────────────────────

export async function sendUploadLink(data: {
  an: string
  uploadUrl: string
  projektName: string
  vorname?: string
}) {
  const gruss = data.vorname ? `Guten Tag ${data.vorname},` : 'Guten Tag,'
  const inhalt = `
    ${heading('Dateien hochladen')}
    ${para(gruss)}
    ${para(`für Ihr Projekt <strong>${data.projektName}</strong> benötigen wir Ihre Dateien (Logos, Bilder, Dokumente etc.). Bitte packen Sie alles in eine ZIP-Datei und laden Sie diese über den folgenden Link hoch:`)}
    <table cellpadding="0" cellspacing="0" style="background:#F4F4F6;border-radius:8px;padding:16px 20px;margin:24px 0;">
      <tr><td style="font-size:13px;color:#6B7280;font-family:Arial,sans-serif;line-height:1.8;">
        📦 Maximale Dateigrösse: 200 MB<br>
        📁 Nur ZIP-Dateien erlaubt<br>
        🔒 Der Link kann einmalig verwendet werden
      </td></tr>
    </table>
  `
  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: `Dateien hochladen für Ihr Twyne-Projekt`,
    html: htmlTemplate(inhalt, 'Dateien hochladen →', data.uploadUrl),
  })
}

// ─── 5. Offerte ───────────────────────────────────────────────────────────────

export async function sendOfferte(data: {
  an: string
  betreff: string
  nachricht: string
  offerteNr: string
  pdfBuffer?: Buffer
}) {
  const inhalt = `
    ${heading(`Offerte ${data.offerteNr}`)}
    <p style="margin:0;font-size:16px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;white-space:pre-line;">${data.nachricht}</p>
  `
  const attachments = data.pdfBuffer
    ? [{ filename: `${data.offerteNr}_Offerte.pdf`, content: data.pdfBuffer }]
    : undefined

  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: data.betreff,
    html: htmlTemplate(inhalt),
    attachments,
  })
}

// ─── 6. Rechnung ──────────────────────────────────────────────────────────────

export async function sendRechnung(data: {
  an: string
  betreff: string
  nachricht: string
  rechnungNr: string
  pdfBuffer?: Buffer
}) {
  const inhalt = `
    ${heading(`Rechnung ${data.rechnungNr}`)}
    <p style="margin:0;font-size:16px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;white-space:pre-line;">${data.nachricht}</p>
  `
  const attachments = data.pdfBuffer
    ? [{ filename: `${data.rechnungNr}_Rechnung.pdf`, content: data.pdfBuffer }]
    : undefined

  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: data.betreff,
    html: htmlTemplate(inhalt),
    attachments,
  })
}

// ─── 7. Zahlungserinnerung ────────────────────────────────────────────────────

export async function sendZahlungserinnerung(data: {
  an: string
  rechnungNr: string
  betrag: string
  faelligBis: string
  vorname?: string
}) {
  const gruss = data.vorname ? `Guten Tag ${data.vorname},` : 'Guten Tag,'
  const inhalt = `
    ${heading(`Zahlungserinnerung — Rechnung ${data.rechnungNr}`)}
    ${para(gruss)}
    ${para(`wir erlauben uns, Sie freundlich an die ausstehende Zahlung der Rechnung <strong>${data.rechnungNr}</strong> über <strong>${data.betrag}</strong> zu erinnern.`)}
    ${infoBlock([
      ['Zahlbar bis', data.faelligBis],
      ['IBAN', 'CH25 8080 8004 3893 2201 6'],
      ['Verwendungszweck', `Rechnung ${data.rechnungNr}`],
    ])}
    ${para('Falls Sie die Zahlung bereits veranlasst haben, ignorieren Sie bitte diese Mail.')}
  `
  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: `Zahlungserinnerung — Rechnung ${data.rechnungNr}`,
    html: htmlTemplate(inhalt),
  })
}

// ─── 8. Mahnung ───────────────────────────────────────────────────────────────

export async function sendMahnung(data: {
  an: string
  rechnungNr: string
  betrag: string
  stufe: 1 | 2
  vorname?: string
}) {
  const gruss = data.vorname ? `Guten Tag ${data.vorname},` : 'Guten Tag,'

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() + (data.stufe === 1 ? 10 : 5))
  const fristStr = cutoff.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const inhalt = data.stufe === 1
    ? `
      ${heading(`1. Mahnung — Rechnung ${data.rechnungNr}`)}
      ${para(gruss)}
      ${para(`trotz unserer Zahlungserinnerung ist der Betrag von <strong>${data.betrag}</strong> für Rechnung <strong>${data.rechnungNr}</strong> noch ausstehend.`)}
      ${para(`Bitte begleichen Sie den offenen Betrag bis <strong>${fristStr}</strong>.`)}
      ${infoBlock([['IBAN', 'CH25 8080 8004 3893 2201 6'], ['Verwendungszweck', `Rechnung ${data.rechnungNr}`]])}
    `
    : `
      ${heading(`2. Mahnung — Rechnung ${data.rechnungNr} — Letzte Frist`)}
      ${para(gruss)}
      ${para(`dies ist unsere letzte Mahnung. Der ausstehende Betrag von <strong>${data.betrag}</strong> für Rechnung <strong>${data.rechnungNr}</strong> ist sofort fällig.`)}
      ${para(`Zahlungsfrist: <strong>${fristStr}</strong>`)}
      ${infoBlock([['IBAN', 'CH25 8080 8004 3893 2201 6'], ['Verwendungszweck', `Rechnung ${data.rechnungNr}`]])}
      ${para('Bei Nichtbezahlung behalten wir uns vor, die Forderung einem Inkassobüro zu übergeben.')}
    `

  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: data.stufe === 1
      ? `1. Mahnung — Rechnung ${data.rechnungNr}`
      : `2. Mahnung — Rechnung ${data.rechnungNr} — Letzte Frist`,
    html: htmlTemplate(inhalt),
  })
}

// ─── 9. Individuelle Mail ─────────────────────────────────────────────────────

export async function sendIndividuelleMail(data: {
  an: string
  betreff: string
  inhalt: string
}) {
  const content = `<p style="margin:0;font-size:16px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;white-space:pre-line;">${data.inhalt}</p>`
  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: data.betreff,
    html: htmlTemplate(content),
  })
}

// Individuelle Mail mit optionalem PDF-Anhang (für Offerte/Rechnung-Modals)
export async function sendIndividuelleMailMitAnhang(data: {
  an: string
  betreff: string
  inhalt: string
  anhang?: { filename: string; content: Buffer }
}) {
  const content = `<p style="margin:0;font-size:16px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;white-space:pre-line;">${data.inhalt}</p>`
  return resend.emails.send({
    from: FROM,
    to: data.an,
    subject: data.betreff,
    html: htmlTemplate(content),
    attachments: data.anhang
      ? [{ filename: data.anhang.filename, content: data.anhang.content }]
      : undefined,
  })
}

// ─── Lead-Bestätigung (Kundenmail, bleibt erhalten) ───────────────────────────

export async function sendLeadBestaetigung(data: {
  firma: string
  ansprechperson: string
  email: string
  produkt?: string | null
  dienstleistung?: string | null
}) {
  const interesse = data.produkt ?? data.dienstleistung ?? 'unsere Leistungen'
  const inhalt = `
    ${heading('Ihre Anfrage ist eingegangen')}
    ${para(`Guten Tag ${data.ansprechperson},`)}
    ${para('vielen Dank für Ihr Interesse. Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.')}
    ${infoBlock([
      ['Firma', data.firma],
      ['Interesse', interesse],
    ])}
    ${para('Wir freuen uns auf das Gespräch mit Ihnen.')}
  `
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Twyne — Ihre Anfrage ist eingegangen',
    html: htmlTemplate(inhalt),
  })
}

// ─── Backward-compat Aliases ──────────────────────────────────────────────────

/** @deprecated Verwende sendAnnahme */
export function sendAnnahmeMail(data: { vorname: string; nachname: string; email: string; offerteNr: string }) {
  return sendAnnahme({ vorname: data.vorname, email: data.email, projektName: data.offerteNr })
}

/** @deprecated Verwende sendAbsage */
export function sendAblehnungsMail(data: { vorname: string; nachname: string; email: string; grund?: string }) {
  return sendAbsage(data)
}

/** @deprecated Verwende sendUploadLink */
export function sendUploadLinkMail(data: { an: string; nachricht: string; uploadUrl: string; projektName: string }) {
  return sendUploadLink({ an: data.an, uploadUrl: data.uploadUrl, projektName: data.projektName })
}
