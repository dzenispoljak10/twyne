import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import CtaSection from '@/components/public/CtaSection'

const posts = [
  {
    slug: 'ki-beratung-kmu-schweiz',
    datum: '15. März 2025',
    kategorie: 'KI-Beratung',
    titel: 'KI für KMU: Welche Tools sich für Schweizer Unternehmen wirklich lohnen',
    lesezeit: '8 min',
    inhalt: `
Künstliche Intelligenz ist längst kein Zukunftsthema mehr — sie verändert Arbeitsprozesse in Unternehmen jeder Grösse. Doch welche Tools lohnen sich wirklich für Schweizer KMU, und wo lauern die Fallstricke?

## Warum KMU jetzt handeln sollten

Die Einstiegshürde für KI-Tools ist in den letzten zwei Jahren dramatisch gesunken. Was früher ein Team von Datenwissenschaftlern und ein Millionenbudget erforderte, ist heute mit wenigen hundert Franken pro Monat zugänglich.

## Die wichtigsten KI-Tools für KMU

**1. ChatGPT / Claude für den Alltag**
Für Texterstellung, E-Mails, Übersetzungen und erste Analysen sind diese Tools unverzichtbar geworden. Der ROI ist sofort messbar.

**2. GitHub Copilot für Entwickler**
Für Unternehmen mit eigenem Entwicklungsteam: Bis zu 40% Produktivitätssteigerung im Code-Alltag.

**3. Midjourney / DALL-E für Marketing**
Marketingmaterialien, Produktbilder, Social-Media-Content — günstiger und schneller als klassische Bildagenturen.

## Worauf Sie achten sollten

Datenschutz ist ein zentrales Thema — besonders für Schweizer Unternehmen mit DSGVO-relevanten Daten. Prüfen Sie immer, wo Ihre Daten verarbeitet werden.

## Fazit

KI ist kein Hexenwerk. Mit den richtigen Tools und einer klaren Strategie können auch kleine Unternehmen sofort von KI profitieren.
    `,
  },
  {
    slug: 'next-js-vs-wordpress-2025',
    datum: '28. Februar 2025',
    kategorie: 'Webentwicklung',
    titel: 'Next.js vs. WordPress 2025: Was ist die richtige Wahl für Ihr Projekt?',
    lesezeit: '6 min',
    inhalt: `
Die Frage "WordPress oder Next.js?" stellen sich viele Unternehmen, wenn sie eine neue Website planen. Beide Technologien haben ihre Berechtigung — aber für sehr unterschiedliche Anwendungsfälle.

## WordPress: Die Stärken

WordPress dominiert seit Jahren den CMS-Markt mit über 40% Marktanteil. Der Grund: Einfache Bedienung, riesiges Plugin-Ökosystem und viele verfügbare Entwickler.

**Wann WordPress die richtige Wahl ist:**
- Redaktionell geprägter Content
- Budget unter CHF 10'000
- Team ohne technisches Background

## Next.js: Die Stärken

Next.js ist ein React-Framework, das sich für komplexe, hochperformante Anwendungen eignet.

**Wann Next.js die richtige Wahl ist:**
- Web-Apps mit komplexer Logik
- Hohe Performance-Anforderungen
- Langfristige Skalierbarkeit

## Unser Fazit

Für einfache Marketingseiten kann WordPress eine valide Wahl sein. Für alles, was über eine Broschüren-Website hinausgeht, empfehlen wir Next.js.
    `,
  },
  {
    slug: 'seo-technische-grundlagen',
    datum: '10. Februar 2025',
    kategorie: 'SEO',
    titel: 'Technisches SEO 2025: Die Grundlagen die jede Webseite braucht',
    lesezeit: '10 min',
    inhalt: `
Technisches SEO ist die Basis jeder erfolgreichen SEO-Strategie. Ohne solide technische Grundlage verpuffen alle Content-Massnahmen.

## Core Web Vitals 2025

Google misst die Qualität Ihrer Webseite mit drei Metriken:

**Largest Contentful Paint (LCP)**: Wie schnell lädt das grösste sichtbare Element? Ziel: unter 2.5 Sekunden.

**Interaction to Next Paint (INP)**: Wie reaktionsschnell ist die Seite? Ziel: unter 200ms.

**Cumulative Layout Shift (CLS)**: Verschieben sich Elemente beim Laden? Ziel: unter 0.1.

## Crawlability

Stellen Sie sicher, dass Suchmaschinen Ihre Seite vollständig crawlen können:
- Robots.txt korrekt konfiguriert
- Sitemap vorhanden und aktuell
- Keine Duplicate Content Probleme

## Strukturierte Daten

Schema.org Markup hilft Suchmaschinen, Ihre Inhalte zu verstehen und verbessert die Darstellung in den Suchergebnissen (Rich Snippets).

## Fazit

Technisches SEO ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess. Regelmässige Audits sind unerlässlich.
    `,
  },
]

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Artikel nicht gefunden' }
  return {
    title: post.titel,
    description: post.inhalt.substring(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-[#111111] py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#A78BFA] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Zurück zum Blog
            </Link>
            <span className="text-xs font-medium uppercase tracking-widest text-[#A78BFA]">
              {post.kategorie}
            </span>
            <h1
              className="text-white font-extrabold leading-tight mt-3 mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-1.5px' }}
            >
              {post.titel}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.datum}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.lesezeit} Lesezeit
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {post.inhalt.trim().split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-bold text-[#111111] mt-10 mb-4"
                      style={{ letterSpacing: '-0.5px' }}
                    >
                      {para.replace('## ', '')}
                    </h2>
                  )
                }
                if (para.startsWith('**') && para.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-[#111111] mb-3">
                      {para.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                if (para.includes('\n-')) {
                  const lines = para.split('\n')
                  return (
                    <div key={i}>
                      {lines.map((line, j) =>
                        line.startsWith('- ') ? (
                          <p key={j} className="text-[#374151] leading-relaxed mb-1">
                            • {line.replace('- ', '')}
                          </p>
                        ) : (
                          <p key={j} className="text-[#374151] leading-relaxed mb-3">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  )
                }
                return (
                  <p key={i} className="text-[#374151] leading-relaxed mb-6">
                    {para}
                  </p>
                )
              })}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
