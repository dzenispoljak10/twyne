export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/[<>'"]/g, (char) => ({
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#x27;',
      '"': '&quot;',
    }[char] || char))
    .trim()
    .slice(0, 10000)
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 254)
}

export function sanitizeAnfrage(data: Record<string, unknown>) {
  return {
    vorname:        sanitizeString(String(data.vorname || '')).slice(0, 100),
    nachname:       sanitizeString(String(data.nachname || '')).slice(0, 100),
    firma:          sanitizeString(String(data.firma || '')).slice(0, 200),
    email:          sanitizeEmail(String(data.email || '')),
    telefon:        sanitizeString(String(data.telefon || '')).slice(0, 50),
    website:        sanitizeString(String(data.website || '')).slice(0, 200),
    nachricht:      sanitizeString(String(data.nachricht || '')).slice(0, 5000),
    budget:         sanitizeString(String(data.budget || '')).slice(0, 50),
    dienstleistung: Array.isArray(data.dienstleistung)
      ? (data.dienstleistung as string[]).map((d) => sanitizeString(String(d))).slice(0, 10)
      : [],
  }
}
