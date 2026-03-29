// PDF generation utilities
export function generateOfferteNr(): string {
  const year = new Date().getFullYear()
  return `TW-${year}`
}

export function formatCHF(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(amount)
}
