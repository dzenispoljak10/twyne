import type { Metadata } from 'next'
import UeberUnsContent from './UeberUnsContent'

export const metadata: Metadata = {
  title: 'Über uns — Twyne Digitalagentur',
  description: 'Lerne das Team hinter Twyne kennen. Dzenis Poljak, Gründer und Geschäftsführer — persönlich, präzise, digital.',
  alternates: {
    canonical: 'https://twyne.ch/ueber-uns',
  },
}

export default function UeberUnsPage() {
  return <UeberUnsContent />
}
