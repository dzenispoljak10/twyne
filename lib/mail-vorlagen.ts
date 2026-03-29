import { formatChf } from './crm-helpers'

interface MailVorlage {
  betreff: string
  inhalt: string
}

// ─── Offerte ─────────────────────────────────────────────────────────────────

export function offerteVorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  offerteNr: string
  total: number
  gueltigBis: string
}): MailVorlage {
  return {
    betreff: `Ihre Offerte ${params.offerteNr} — ${params.projektName}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Vielen Dank für Ihr Interesse an einer Zusammenarbeit mit Twyne.

Anbei finden Sie unsere Offerte ${params.offerteNr} für das Projekt «${params.projektName}».

Offerte-Nr.: ${params.offerteNr}
Betrag: ${formatChf(params.total)}
Gültig bis: ${params.gueltigBis}

Das Angebot finden Sie als PDF-Anhang. Für Rückfragen stehen wir jederzeit zur Verfügung.

Freundliche Grüsse
Ihr Twyne-Team

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Nachfassen ───────────────────────────────────────────────────────────────

export function nachfassenVorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  offerteNr: string
}): MailVorlage {
  return {
    betreff: `Rückfrage zu Ihrer Offerte ${params.offerteNr}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Ich wollte kurz nachfragen, ob Sie die Gelegenheit hatten, unsere Offerte ${params.offerteNr} für das Projekt «${params.projektName}» zu prüfen.

Haben Sie Fragen oder benötigen Sie weitere Informationen? Ich stehe gerne für ein kurzes Gespräch zur Verfügung.

Freundliche Grüsse
Ihr Twyne-Team

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Auftragsbestätigung ──────────────────────────────────────────────────────

export function auftragsbestaetigungVorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  offerteNr: string
}): MailVorlage {
  return {
    betreff: `Auftragsbestätigung — ${params.projektName}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Herzlichen Dank für Ihren Auftrag! Wir freuen uns sehr auf die Zusammenarbeit.

Wir bestätigen hiermit den Projektstart für «${params.projektName}» (Referenz: ${params.offerteNr}).

Wir werden uns in Kürze bei Ihnen melden, um die nächsten Schritte zu besprechen.

Freundliche Grüsse
Ihr Twyne-Team

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Rechnung ─────────────────────────────────────────────────────────────────

export function rechnungVorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  rechnungsNr: string
  total: number
  faelligAm: string
}): MailVorlage {
  return {
    betreff: `Ihre Rechnung ${params.rechnungsNr} — ${params.projektName}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Anbei erhalten Sie die Rechnung ${params.rechnungsNr} für das Projekt «${params.projektName}».

Rechnungs-Nr.: ${params.rechnungsNr}
Betrag: ${formatChf(params.total)}
Fällig am: ${params.faelligAm}

Bitte überweisen Sie den Betrag bis zum angegebenen Datum.

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Freundliche Grüsse
Ihr Twyne-Team

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Zahlungserinnerung ───────────────────────────────────────────────────────

export function zahlungserinnerungVorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  rechnungsNr: string
  total: number
  faelligAm: string
}): MailVorlage {
  return {
    betreff: `Zahlungserinnerung — Rechnung ${params.rechnungsNr}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Wir möchten Sie freundlich daran erinnern, dass die Rechnung ${params.rechnungsNr} für «${params.projektName}» bislang noch nicht beglichen wurde.

Rechnungs-Nr.: ${params.rechnungsNr}
Offener Betrag: ${formatChf(params.total)}
Ursprünglich fällig am: ${params.faelligAm}

Bitte überweisen Sie den Betrag bis zum ${params.faelligAm}. Falls die Zahlung bereits erfolgt ist, bitten wir Sie, dieses Schreiben als gegenstandslos zu betrachten.

Freundliche Grüsse
Ihr Twyne-Team

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Mahnung 1 ────────────────────────────────────────────────────────────────

export function mahnung1Vorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  rechnungsNr: string
  total: number
  neueFaelligkeit: string
}): MailVorlage {
  return {
    betreff: `1. Mahnung — Rechnung ${params.rechnungsNr}`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Trotz unserer Zahlungserinnerung ist der Betrag aus Rechnung ${params.rechnungsNr} noch nicht auf unserem Konto eingegangen.

Rechnungs-Nr.: ${params.rechnungsNr}
Projekt: ${params.projektName}
Offener Betrag: ${formatChf(params.total)}
Neue Fälligkeit: ${params.neueFaelligkeit}

Bitte veranlassen Sie die Zahlung bis zum genannten Datum. Bei Fragen melden Sie sich bitte umgehend.

Freundliche Grüsse
Twyne GmbH

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}

// ─── Mahnung 2 ────────────────────────────────────────────────────────────────

export function mahnung2Vorlage(params: {
  vorname: string
  nachname: string
  projektName: string
  rechnungsNr: string
  total: number
  neueFaelligkeit: string
}): MailVorlage {
  const totalMitGebuehr = params.total + 50
  return {
    betreff: `2. Mahnung — Rechnung ${params.rechnungsNr} (Letzte Mahnung)`,
    inhalt: `Guten Tag ${params.vorname} ${params.nachname}

Wir haben Ihnen bereits zwei Zahlungsaufforderungen zugestellt. Leider ist der offene Betrag aus Rechnung ${params.rechnungsNr} bis heute nicht beglichen worden.

Rechnungs-Nr.: ${params.rechnungsNr}
Projekt: ${params.projektName}
Offener Betrag: ${formatChf(params.total)}
Mahngebühr: CHF 50.00
Gesamtbetrag: ${formatChf(totalMitGebuehr)}
Fällig bis: ${params.neueFaelligkeit}

Dies ist unsere letzte Mahnung. Bei weiterhin ausbleibender Zahlung sehen wir uns gezwungen, rechtliche Schritte einzuleiten.

Twyne GmbH

—
Twyne GmbH · Rothrist · info@twyne.ch · twyne.ch`,
  }
}
