import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL ?? '' })
const prisma = new PrismaClient({ adapter } as never)

async function main() {
  console.log('Seeding database...')

  // Blog post
  await prisma.blogPost.upsert({
    where: { slugDe: 'ki-beratung-kmu-schweiz' },
    update: {},
    create: {
      titelDe: 'KI für KMU: Welche Tools sich für Schweizer Unternehmen wirklich lohnen',
      titelEn: 'AI for SMEs: Which tools are really worth it for Swiss companies',
      slugDe: 'ki-beratung-kmu-schweiz',
      slugEn: 'ai-tools-swiss-sme',
      inhaltDe: 'KI-Tools für KMU in der Schweiz...',
      inhaltEn: 'AI tools for Swiss SMEs...',
      excerptDe: 'Welche KI-Tools lohnen sich wirklich für KMU?',
      excerptEn: 'Which AI tools are really worth it for SMEs?',
      veroeffentlicht: true,
    },
  })

  // Portfolio — replace with the 10 canonical showcase projects
  await prisma.portfolio.deleteMany()
  await prisma.portfolio.createMany({
    data: [
      {
        name: 'Nobilis Tuning',
        kategorie: 'WEBSEITEN',
        jahr: 2024,
        beschreibung: 'Professioneller Webauftritt für ein Schweizer Tuning-Unternehmen mit integriertem Fahrzeugkonfigurator. Kunden konfigurieren ihr Wunschfahrzeug online und fordern direkt eine Offerte an. Vollständig SEO-optimiert für den Automobil-Bereich.',
        tags: ['WordPress', 'Fahrzeugkonfigurator', 'SEO', 'WooCommerce'],
        bildUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1a1a2e',
        technologie: 'WordPress',
        reihenfolge: 1,
        sichtbar: true,
      },
      {
        name: 'Friedli Bikeshop',
        kategorie: 'WEBSEITEN',
        jahr: 2024,
        beschreibung: 'Moderner Online-Auftritt für einen etablierten Fahrrad-Fachhandel mit integriertem Produktkatalog und Servicebuchung. Klares sportliches Design das Vertrauen schafft und Kunden direkt zur Buchung führt.',
        tags: ['Webflow', 'Produktkatalog', 'Servicebuchung', 'UX Design'],
        bildUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1e3a2f',
        technologie: 'Webflow',
        reihenfolge: 2,
        sichtbar: true,
      },
      {
        name: 'ReservaPro',
        kategorie: 'WEBAPPLIKATIONEN',
        jahr: 2024,
        beschreibung: 'Cloudbasiertes Buchungssystem für Restaurants, Coiffeure und Dienstleister. Kunden buchen online rund um die Uhr, Betreiber verwalten Termine und Kapazitäten in einem übersichtlichen Dashboard mit automatischen Erinnerungen per SMS und E-Mail.',
        tags: ['Next.js', 'SaaS', 'PostgreSQL', 'Buchungssystem'],
        bildUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#2d1b69',
        technologie: 'Next.js · PostgreSQL',
        reihenfolge: 3,
        sichtbar: true,
      },
      {
        name: 'Vaultly',
        kategorie: 'SOFTWARE',
        jahr: 2025,
        beschreibung: 'Desktop-Dokumentenverwaltung für KMUs — sicher, schnell, ohne Cloud-Zwang. Dokumente kategorisieren, versionieren und per Stichwort finden. Läuft lokal auf Windows und macOS ohne monatliche Kosten.',
        tags: ['Desktop-App', 'Windows', 'macOS', 'Dokumentenverwaltung'],
        bildUrl: 'https://images.unsplash.com/photo-1568667256531-5d4a3ff7da7a?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1a2744',
        technologie: 'Electron · React',
        reihenfolge: 4,
        sichtbar: true,
      },
      {
        name: 'PulseBoard',
        kategorie: 'WEBAPPLIKATIONEN',
        jahr: 2024,
        beschreibung: 'Internes KPI-Dashboard für ein mittelgrosses Handelsunternehmen. Echtzeit-Auswertung von Umsatz, Lagerbestand und Lieferkette in einer übersichtlichen Oberfläche. Ersetzt fünf verschiedene Excel-Tabellen.',
        tags: ['Dashboard', 'KPI', 'Next.js', 'Datenvisualisierung'],
        bildUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1a2e2a',
        technologie: 'Next.js · Prisma · Chart.js',
        reihenfolge: 5,
        sichtbar: true,
      },
      {
        name: 'AutoFlow',
        kategorie: 'KI_BERATUNG',
        jahr: 2025,
        beschreibung: 'KI-gestützte Automatisierung für einen Dienstleistungsbetrieb: automatisches Kunden-Onboarding, KI-Chatbot für häufige Anfragen und automatisierte Reporting-Mails. Spart dem Team täglich über zwei Stunden manuelle Arbeit.',
        tags: ['KI-Automatisierung', 'n8n', 'OpenAI', 'Chatbot'],
        bildUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#2a1a3a',
        technologie: 'n8n · OpenAI · Make',
        reihenfolge: 6,
        sichtbar: true,
      },
      {
        name: 'LocalRank',
        kategorie: 'SEO',
        jahr: 2024,
        beschreibung: 'Komplette SEO-Strategie und technische Optimierung für einen lokalen Gewerbebetrieb. Durch gezieltes lokales SEO, strukturierte Daten und Content-Aufbau stieg der organische Traffic innerhalb von drei Monaten um über 200%.',
        tags: ['SEO', 'Lokales SEO', 'Google Rankings', 'Content'],
        bildUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1a3a1a',
        technologie: 'WordPress · SEO-Strategie',
        reihenfolge: 7,
        sichtbar: true,
      },
      {
        name: 'RetailShift',
        kategorie: 'DIGITALE_TRANSFORMATION',
        jahr: 2024,
        beschreibung: 'Umfassende Digitalisierung eines stationären Einzelhandelsbetriebs: Online-Shop, CRM-Integration für Kundenbindung und digitales Kassensystem. Der neue Online-Kanal generierte im ersten Jahr über 35% des Gesamtumsatzes.',
        tags: ['Digitale Transformation', 'Shopify', 'CRM', 'E-Commerce'],
        bildUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#2a1a2e',
        technologie: 'Next.js · Shopify · CRM',
        reihenfolge: 8,
        sichtbar: true,
      },
      {
        name: 'ClinicDesk',
        kategorie: 'WEBAPPLIKATIONEN',
        jahr: 2025,
        beschreibung: 'Patientenportal für eine medizinische Praxis mit Online-Terminbuchung, digitalen Anmeldeformularen und automatischen Erinnerungen. Reduziert telefonische Anfragen um 60% und entlastet das Praxisteam spürbar.',
        tags: ['Next.js', 'Terminbuchung', 'DSGVO-konform', 'Gesundheit'],
        bildUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#1a2a3a',
        technologie: 'Next.js · PostgreSQL · Resend',
        reihenfolge: 9,
        sichtbar: true,
      },
      {
        name: 'BrandSpark',
        kategorie: 'SEO',
        jahr: 2025,
        beschreibung: 'Content-Strategie und technisches SEO für ein B2B-Unternehmen. Aufbau eines strukturierten Blog-Systems, Keyword-Recherche und monatliche Content-Produktion. Organischer Traffic verdreifacht innerhalb von sechs Monaten.',
        tags: ['Content Marketing', 'SEO', 'Blog', 'B2B'],
        bildUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&auto=format',
        thumbnailColor: '#2e1a1a',
        technologie: 'Next.js · CMS · SEO',
        reihenfolge: 10,
        sichtbar: true,
      },
    ],
  })

  console.log('✓ Seed abgeschlossen')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
