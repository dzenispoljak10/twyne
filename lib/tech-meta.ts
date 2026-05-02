export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Datenbank'
  | 'Auth & Security'
  | 'Payments'
  | 'Mail & Messaging'
  | 'Storage & CDN'
  | 'DevOps & Hosting'
  | 'CMS & Content'
  | 'UI & Visualisierung'
  | 'Mobile'

export type TechMeta = {
  category: TechCategory
  description: string
}

export const techMeta: Record<string, TechMeta> = {
  // Frontend / Framework
  'Next.js': {
    category: 'Frontend',
    description: 'React-Framework mit App Router, Server Components und automatischer Optimierung.',
  },
  'Next.js 15': {
    category: 'Frontend',
    description: 'Aktuelle Version mit verbesserten Server Components und stabiler Caching-Strategie.',
  },
  React: {
    category: 'Frontend',
    description: 'Komponentenbasierte UI-Bibliothek als Grundlage für schnelle, interaktive Oberflächen.',
  },
  TypeScript: {
    category: 'Frontend',
    description: 'Statische Typisierung — fängt Fehler im Build statt erst in Produktion.',
  },
  'Tailwind CSS': {
    category: 'Frontend',
    description: 'Utility-first Styling für konsistente Designsysteme ohne CSS-Wildwuchs.',
  },
  MDX: {
    category: 'CMS & Content',
    description: 'Markdown mit JSX — strukturierter Content, der Komponenten einbetten kann.',
  },
  Sanity: {
    category: 'CMS & Content',
    description: 'Headless-CMS mit live Preview, robustem Schema und Real-Time Collaboration.',
  },

  // Backend / Data
  Prisma: {
    category: 'Backend',
    description: 'Type-safe ORM für PostgreSQL — Schema-first, mit Migrationen und Studio.',
  },
  PostgreSQL: {
    category: 'Datenbank',
    description: 'Bewährte relationale Datenbank für transaktionale Workloads.',
  },
  Postgres: {
    category: 'Datenbank',
    description: 'Bewährte relationale Datenbank für transaktionale Workloads.',
  },
  TimescaleDB: {
    category: 'Datenbank',
    description: 'Postgres-Erweiterung für effiziente Zeitreihen-Daten und Aggregationen.',
  },
  tRPC: {
    category: 'Backend',
    description: 'End-to-end typsichere APIs zwischen Frontend und Backend ohne Codegen.',
  },
  WebSockets: {
    category: 'Backend',
    description: 'Bidirektionale Verbindungen für Live-Updates ohne Polling-Overhead.',
  },
  BullMQ: {
    category: 'Backend',
    description: 'Robuste Job-Queue auf Redis — verzögerte Tasks, Retries, Concurrency-Control.',
  },
  Redis: {
    category: 'Backend',
    description: 'In-Memory-Store für Queues, Caching und Rate-Limiting.',
  },
  libsodium: {
    category: 'Auth & Security',
    description: 'Audited Crypto-Library für client-seitige Verschlüsselung und Signierung.',
  },

  // Auth
  NextAuth: {
    category: 'Auth & Security',
    description: 'Auth für Next.js mit OAuth, Magic Links und Session-Handling.',
  },

  // Payments
  Stripe: {
    category: 'Payments',
    description: 'Bewährter Payment-Provider mit Checkout, Subscriptions und Webhooks.',
  },
  'Stripe Terminal': {
    category: 'Payments',
    description: 'Stripe-Hardware für Karten-Zahlungen am POS, integriert ins Backend.',
  },

  // Messaging
  Resend: {
    category: 'Mail & Messaging',
    description: 'Modernes Transactional-Mail-API mit React-Templates und sauberer DX.',
  },
  Twilio: {
    category: 'Mail & Messaging',
    description: 'SMS- und Voice-Plattform für globale Erreichbarkeit und Erinnerungen.',
  },

  // Storage & CDN
  'AWS S3': {
    category: 'Storage & CDN',
    description: 'Object-Storage als Standard für Asset-Speicher und Backups.',
  },
  Sharp: {
    category: 'Storage & CDN',
    description: 'Hochperformante Bildverarbeitung — Resize, Format-Konvertierung, Komprimierung.',
  },

  // DevOps
  Vercel: {
    category: 'DevOps & Hosting',
    description: 'Hosting für Next.js mit globalem CDN, ISR und Preview-Deployments pro Branch.',
  },
  'Cloudflare Workers': {
    category: 'DevOps & Hosting',
    description: 'Edge-Compute weltweit — geringe Latenz für verteilte Crawler und APIs.',
  },

  // UI / Visualization
  'React Flow': {
    category: 'UI & Visualisierung',
    description: 'Bibliothek für Node-basierte Editoren mit Drag-and-drop und Mini-Map.',
  },
  Recharts: {
    category: 'UI & Visualisierung',
    description: 'React-Charts auf Basis von D3 — ergonomisch und performant.',
  },

  // Mobile
  'React Native': {
    category: 'Mobile',
    description: 'Native Mobile-Apps mit React-Komponenten und gemeinsamer Code-Basis.',
  },
}

const categoryOrder: TechCategory[] = [
  'Frontend',
  'Backend',
  'Datenbank',
  'Auth & Security',
  'Payments',
  'Mail & Messaging',
  'Storage & CDN',
  'CMS & Content',
  'UI & Visualisierung',
  'Mobile',
  'DevOps & Hosting',
]

export function getTechMeta(name: string): TechMeta {
  return (
    techMeta[name] ?? {
      category: 'Backend',
      description: 'Eingesetzte Technologie im Projekt-Stack.',
    }
  )
}

export function groupTechByCategory(techs: string[]): { category: TechCategory; items: { name: string; description: string }[] }[] {
  const map = new Map<TechCategory, { name: string; description: string }[]>()
  for (const t of techs) {
    const meta = getTechMeta(t)
    const arr = map.get(meta.category) ?? []
    arr.push({ name: t, description: meta.description })
    map.set(meta.category, arr)
  }
  return categoryOrder
    .filter((c) => map.has(c))
    .map((c) => ({ category: c, items: map.get(c) as { name: string; description: string }[] }))
}
