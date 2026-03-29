export const kategorieMeta: Record<string, { label: string; color: string; fallback: string }> = {
  WEBSEITEN: {
    label: 'Webseite',
    color: '#7C3AED',
    fallback: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&auto=format',
  },
  WEBAPPLIKATIONEN: {
    label: 'Webapplikation',
    color: '#0F766E',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
  },
  SOFTWARE: {
    label: 'Software',
    color: '#BE185D',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format',
  },
  CMS: {
    label: 'CMS',
    color: '#B45309',
    fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
  },
  KI_BERATUNG: {
    label: 'KI-Beratung',
    color: '#D97706',
    fallback: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop&auto=format',
  },
  DIGITALE_TRANSFORMATION: {
    label: 'Transformation',
    color: '#0369A1',
    fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&auto=format',
  },
  SEO: {
    label: 'SEO',
    color: '#15803D',
    fallback: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop&auto=format',
  },
}

export const kategorieOptions = [
  { value: 'WEBSEITEN', label: 'Webseiten & Design' },
  { value: 'WEBAPPLIKATIONEN', label: 'Webapplikationen' },
  { value: 'SOFTWARE', label: 'Softwareentwicklung' },
  { value: 'CMS', label: 'CMS-Lösungen' },
  { value: 'KI_BERATUNG', label: 'KI-Beratung' },
  { value: 'DIGITALE_TRANSFORMATION', label: 'Digitale Transformation' },
  { value: 'SEO', label: 'SEO & Sichtbarkeit' },
]
