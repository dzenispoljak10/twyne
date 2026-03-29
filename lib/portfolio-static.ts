export interface PortfolioStaticItem {
  id: string
  name: string
  kategoriLabel: string
  beschreibung: string
  tags: string[]
  jahr: number
  thumbnailColor: string
  technologie: string
}

export const portfolioItems: PortfolioStaticItem[] = [
  {
    id: 'nobilis-tuning',
    name: 'Nobilis Tuning',
    kategoriLabel: 'Webseite',
    beschreibung: 'Professioneller Webauftritt für ein Schweizer Tuning-Unternehmen mit integriertem Fahrzeugkonfigurator. Kunden konfigurieren ihr Wunschfahrzeug online und fordern direkt eine Offerte an. Vollständig SEO-optimiert für den Automobil-Bereich.',
    tags: ['WordPress', 'Fahrzeugkonfigurator', 'SEO', 'WooCommerce'],
    jahr: 2024,
    thumbnailColor: '#1a1a2e',
    technologie: 'WordPress',
  },
  {
    id: 'friedli-bikeshop',
    name: 'Friedli Bikeshop',
    kategoriLabel: 'Webseite',
    beschreibung: 'Moderner Online-Auftritt für einen etablierten Fahrrad-Fachhandel mit integriertem Produktkatalog und Servicebuchung. Klares sportliches Design das Vertrauen schafft und Kunden direkt zur Buchung führt.',
    tags: ['Webflow', 'Produktkatalog', 'Servicebuchung', 'UX Design'],
    jahr: 2024,
    thumbnailColor: '#1e3a2f',
    technologie: 'Webflow',
  },
  {
    id: 'reservapro',
    name: 'ReservaPro',
    kategoriLabel: 'Webapplikation',
    beschreibung: 'Cloudbasiertes Buchungssystem für Restaurants, Coiffeure und Dienstleister. Kunden buchen online rund um die Uhr, Betreiber verwalten Termine und Kapazitäten in einem übersichtlichen Dashboard mit automatischen Erinnerungen per SMS und E-Mail.',
    tags: ['Next.js', 'SaaS', 'PostgreSQL', 'Buchungssystem'],
    jahr: 2024,
    thumbnailColor: '#2d1b69',
    technologie: 'Next.js · PostgreSQL',
  },
  {
    id: 'vaultly',
    name: 'Vaultly',
    kategoriLabel: 'Software',
    beschreibung: 'Desktop-Dokumentenverwaltung für KMUs — sicher, schnell, ohne Cloud-Zwang. Dokumente kategorisieren, versionieren und per Stichwort finden. Läuft lokal auf Windows und macOS ohne monatliche Kosten.',
    tags: ['Desktop-App', 'Windows', 'macOS', 'Dokumentenverwaltung'],
    jahr: 2025,
    thumbnailColor: '#1a2744',
    technologie: 'Electron · React',
  },
  {
    id: 'pulseboard',
    name: 'PulseBoard',
    kategoriLabel: 'Webapplikation',
    beschreibung: 'Internes KPI-Dashboard für ein mittelgrosses Handelsunternehmen. Echtzeit-Auswertung von Umsatz, Lagerbestand und Lieferkette in einer übersichtlichen Oberfläche. Ersetzt fünf verschiedene Excel-Tabellen.',
    tags: ['Dashboard', 'KPI', 'Next.js', 'Datenvisualisierung'],
    jahr: 2024,
    thumbnailColor: '#1a2e2a',
    technologie: 'Next.js · Prisma · Chart.js',
  },
  {
    id: 'autoflow',
    name: 'AutoFlow',
    kategoriLabel: 'KI-Beratung & Automatisierung',
    beschreibung: 'KI-gestützte Automatisierung für einen Dienstleistungsbetrieb: automatisches Kunden-Onboarding, KI-Chatbot für häufige Anfragen und automatisierte Reporting-Mails. Spart dem Team täglich über zwei Stunden manuelle Arbeit.',
    tags: ['KI-Automatisierung', 'n8n', 'OpenAI', 'Chatbot'],
    jahr: 2025,
    thumbnailColor: '#2a1a3a',
    technologie: 'n8n · OpenAI · Make',
  },
  {
    id: 'localrank',
    name: 'LocalRank',
    kategoriLabel: 'SEO',
    beschreibung: 'Komplette SEO-Strategie und technische Optimierung für einen lokalen Gewerbebetrieb. Durch gezieltes lokales SEO, strukturierte Daten und Content-Aufbau stieg der organische Traffic innerhalb von drei Monaten um über 200%.',
    tags: ['SEO', 'Lokales SEO', 'Google Rankings', 'Content'],
    jahr: 2024,
    thumbnailColor: '#1a3a1a',
    technologie: 'WordPress · SEO-Strategie',
  },
  {
    id: 'retailshift',
    name: 'RetailShift',
    kategoriLabel: 'Digitale Transformation',
    beschreibung: 'Umfassende Digitalisierung eines stationären Einzelhandelsbetriebs: Online-Shop, CRM-Integration für Kundenbindung und digitales Kassensystem. Der neue Online-Kanal generierte im ersten Jahr über 35% des Gesamtumsatzes.',
    tags: ['Digitale Transformation', 'Shopify', 'CRM', 'E-Commerce'],
    jahr: 2024,
    thumbnailColor: '#2a1a2e',
    technologie: 'Next.js · Shopify · CRM',
  },
  {
    id: 'clinicdesk',
    name: 'ClinicDesk',
    kategoriLabel: 'Webapplikation',
    beschreibung: 'Patientenportal für eine medizinische Praxis mit Online-Terminbuchung, digitalen Anmeldeformularen und automatischen Erinnerungen. Reduziert telefonische Anfragen um 60% und entlastet das Praxisteam spürbar.',
    tags: ['Next.js', 'Terminbuchung', 'DSGVO-konform', 'Gesundheit'],
    jahr: 2025,
    thumbnailColor: '#1a2a3a',
    technologie: 'Next.js · PostgreSQL · Resend',
  },
  {
    id: 'brandspark',
    name: 'BrandSpark',
    kategoriLabel: 'SEO & Content Marketing',
    beschreibung: 'Content-Strategie und technisches SEO für ein B2B-Unternehmen. Aufbau eines strukturierten Blog-Systems, Keyword-Recherche und monatliche Content-Produktion. Organischer Traffic verdreifacht innerhalb von sechs Monaten.',
    tags: ['Content Marketing', 'SEO', 'Blog', 'B2B'],
    jahr: 2025,
    thumbnailColor: '#2e1a1a',
    technologie: 'Next.js · CMS · SEO',
  },
]
