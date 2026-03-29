import { prisma } from './prisma'

// ─── Number formatting ──────────────────────────────────────────────────────

export function formatChf(betrag: number | string): string {
  const n = typeof betrag === 'string' ? parseFloat(betrag) : betrag
  const safe = isNaN(n) ? 0 : n
  const [intPart, decPart] = safe.toFixed(2).split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '\u2019')
  return `CHF ${grouped}.${decPart}`
}

export function formatDatum(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('de-CH').format(d)
}

// ─── Positionen berechnen ──────────────────────────────────────────────────

export interface PositionBerechnet {
  id: string
  beschreibung: string
  menge: number
  einheit: string
  einzelpreis: number
  netto: number
  reihenfolge: number
}

export interface SummenBerechnet {
  subtotal: number
  rabattBetrag: number // always 0, kept for compat
  mwst: number
  total: number
}

type PosLike = {
  id: string
  beschreibung: string
  menge: { toNumber?: () => number } | number | string
  einheit: string
  einzelpreis: { toNumber?: () => number } | number | string
  reihenfolge: number
}

function toNum(v: { toNumber?: () => number } | number | string): number {
  if (typeof v === 'object' && v !== null && typeof (v as any).toNumber === 'function') {
    return (v as any).toNumber()
  }
  const n = typeof v === 'string' ? parseFloat(v as string) : (v as number)
  return isNaN(n) ? 0 : n
}

export function berechnePositionen(positionen: PosLike[]): {
  zeilen: PositionBerechnet[]
  summen: SummenBerechnet
} {
  const zeilen: PositionBerechnet[] = positionen
    .sort((a, b) => a.reihenfolge - b.reihenfolge)
    .map((p) => {
      const menge = toNum(p.menge)
      const ep = toNum(p.einzelpreis)
      const netto = menge * ep
      return {
        id: p.id,
        beschreibung: p.beschreibung,
        menge,
        einheit: p.einheit,
        einzelpreis: ep,
        netto,
        reihenfolge: p.reihenfolge,
      }
    })

  const subtotal = zeilen.reduce((s, z) => s + z.netto, 0)
  const mwst = subtotal * 0.081
  const total = subtotal + mwst

  return { zeilen, summen: { subtotal, rabattBetrag: 0, mwst, total } }
}

// ─── Nummernvergabe ────────────────────────────────────────────────────────

export async function naechsteOfferteNr(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.offerte.count()
  return `TW-${year}-${String(count + 1).padStart(4, '0')}`
}

export async function naechsteRechnungsNr(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.rechnung.count()
  return `TW-R-${year}-${String(count + 1).padStart(4, '0')}`
}

// ─── Status Konfigurationen ────────────────────────────────────────────────

export const projektStatusConfig = {
  ANGEBOT: { label: 'Angebot', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  AKTIV: { label: 'Aktiv', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  ABGESCHLOSSEN: { label: 'Abgeschlossen', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
  PAUSIERT: { label: 'Pausiert', color: '#0284C7', bg: 'rgba(2,132,199,0.08)' },
  STORNIERT: { label: 'Storniert', color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
} as const

export const offerteStatusConfig = {
  ENTWURF: { label: 'Entwurf', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
  VERSENDET: { label: 'Versendet', color: '#0284C7', bg: 'rgba(2,132,199,0.08)' },
  ANGENOMMEN: { label: 'Angenommen', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  ABGELEHNT: { label: 'Abgelehnt', color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
} as const

export const rechnungsStatusConfig = {
  ENTWURF: { label: 'Entwurf', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
  VERSENDET: { label: 'Versendet', color: '#0284C7', bg: 'rgba(2,132,199,0.08)' },
  TEILBEZAHLT: { label: 'Teilbezahlt', color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  BEZAHLT: { label: 'Bezahlt', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  UEBERFAELLIG: { label: 'Überfällig', color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
  MAHNUNG_1: { label: 'Mahnung 1', color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  MAHNUNG_2: { label: 'Mahnung 2', color: '#DC2626', bg: 'rgba(220,38,38,0.12)' },
} as const
