import { prisma } from './prisma'

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
