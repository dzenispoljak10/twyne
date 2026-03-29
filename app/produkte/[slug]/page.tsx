import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle, Users, Star, Calendar, Globe, Zap, Shield, Brain,
  UtensilsCrossed, LayoutDashboard, Ticket, QrCode, Clock, BarChart2,
  Wifi, Settings, FileText, CreditCard, TrendingUp, Monitor, Smartphone,
} from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import FaqAccordion from '@/components/public/FaqAccordion'
import DemoAnfrageForm from '@/components/public/DemoAnfrageForm'
import { produkteData, produkteSlugs } from '@/lib/produkte-data'

const featureIconMap: Record<string, React.ReactElement> = {
  Users: <Users size={26} />,
  Star: <Star size={26} />,
  Calendar: <Calendar size={26} />,
  Globe: <Globe size={26} />,
  Zap: <Zap size={26} />,
  Shield: <Shield size={26} />,
  Brain: <Brain size={26} />,
  QrCode: <QrCode size={26} />,
  Clock: <Clock size={26} />,
  BarChart2: <BarChart2 size={26} />,
  Wifi: <Wifi size={26} />,
  Settings: <Settings size={26} />,
  FileText: <FileText size={26} />,
  CreditCard: <CreditCard size={26} />,
  TrendingUp: <TrendingUp size={26} />,
  Monitor: <Monitor size={26} />,
  Smartphone: <Smartphone size={26} />,
  UtensilsCrossed: <UtensilsCrossed size={26} />,
  LayoutDashboard: <LayoutDashboard size={26} />,
  Ticket: <Ticket size={26} />,
}

const splitIconMap: Record<string, React.ReactElement> = {
  Users: <Users size={64} style={{ color: 'white' }} />,
  UtensilsCrossed: <UtensilsCrossed size={64} style={{ color: 'white' }} />,
  LayoutDashboard: <LayoutDashboard size={64} style={{ color: 'white' }} />,
  Ticket: <Ticket size={64} style={{ color: 'white' }} />,
  Zap: <Zap size={64} style={{ color: 'white' }} />,
  Globe: <Globe size={64} style={{ color: 'white' }} />,
  TrendingUp: <TrendingUp size={64} style={{ color: 'white' }} />,
}

export function generateStaticParams() {
  return produkteSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const produkt = produkteData[slug]
  if (!produkt) return {}
  return {
    title: produkt.meta.title,
    description: produkt.meta.description,
    alternates: {
      canonical: `https://twyne.ch/produkte/${slug}`,
    },
    openGraph: {
      title: produkt.meta.title,
      description: produkt.meta.description,
      url: `https://twyne.ch/produkte/${slug}`,
    },
  }
}

export default async function ProduktPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const produkt = produkteData[slug]
  if (!produkt) notFound()

  const produktJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `twyne ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
    description: produkt.meta.description,
    url: `https://twyne.ch/produkte/${slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: produkt.pricing
      .filter((p) => p.preis !== 'Auf Anfrage')
      .map((p) => ({
        '@type': 'Offer',
        name: p.label,
        description: p.beschreibung,
        priceCurrency: 'CHF',
        price: p.preis.replace(/[^0-9]/g, ''),
      })),
    provider: {
      '@type': 'Organization',
      name: 'Twyne',
      url: 'https://twyne.ch',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://twyne.ch' },
      { '@type': 'ListItem', position: 2, name: 'Produkte', item: 'https://twyne.ch/produkte' },
      { '@type': 'ListItem', position: 3, name: `twyne ${slug.charAt(0).toUpperCase() + slug.slice(1)}`, item: `https://twyne.ch/produkte/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(produktJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <style dangerouslySetInnerHTML={{ __html: `
        /* Feature cards */
        .p-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; cursor: default; }
        .p-card:hover { transform: translateY(-5px); border-color: rgba(124,58,237,0.15) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04); }
        .p-card:hover .p-icon { transform: scale(1.08); filter: brightness(1.1); }
        .p-icon { transition: transform 0.25s ease, filter 0.25s ease; }

        /* Stat banner */
        .p-stat { transition: background 0.2s ease; cursor: default; }
        .p-stat:hover { background: rgba(255,255,255,0.03); }
        .p-stat:hover .p-stat-val { opacity: 0.85; }
        .p-stat-val { transition: opacity 0.2s ease; }

        /* Split checks */
        .p-check { transition: transform 0.2s ease; }
        .p-check:hover { transform: translateX(3px); }

        /* Hero buttons */
        .p-hero-btn-primary { transition: all 0.25s ease; }
        .p-hero-btn-primary:hover { filter: brightness(1.12); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .p-hero-btn-outline { transition: all 0.2s ease; }
        .p-hero-btn-outline:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.25) !important; color: white !important; }

        /* Demo form CTA button */
        .p-cta-link { transition: all 0.25s ease; display: inline-block; }
        .p-cta-link:hover { opacity: 0.85; transform: translateY(-2px); }
      ` }} />
      <Navbar />
      <main>

        {/* ① HERO */}
        <section style={{ background: '#111111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', background: `radial-gradient(circle, ${produkt.color}18 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6B7280' }}>
                  <Link href="/produkte" style={{ color: '#6B7280', textDecoration: 'none' }}>Produkte</Link>
                  <span>→</span>
                  <span style={{ color: '#A78BFA' }}>twyne {slug.charAt(0).toUpperCase() + slug.slice(1)}</span>
                </div>
                <span style={{ display: 'inline-block', background: `${produkt.color}18`, border: `1px solid ${produkt.color}30`, color: produkt.color, borderRadius: '100px', padding: '5px 14px', fontSize: '12px', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.05em' }}>
                  {produkt.hero.badge}
                </span>
                <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '16px' }}>
                  {produkt.hero.h1}<br />
                  <span style={{ color: produkt.color }}>{produkt.hero.h1Purple}</span>
                </h1>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {produkt.hero.tagline}
                </p>
                <p style={{ fontSize: '17px', color: '#9CA3AF', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
                  {produkt.hero.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="#demo"
                    className="p-hero-btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', background: produkt.color, color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Demo anfragen →
                  </a>
                  <a
                    href="#features"
                    className="p-hero-btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#9CA3AF', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    Funktionen entdecken
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '420px', aspectRatio: '4/3', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${produkt.color}20 0%, transparent 70%)` }} />
                  <div style={{ textAlign: 'center', position: 'relative' }}>
                    <div style={{ fontSize: '96px', fontWeight: 900, color: produkt.color, opacity: 0.15, letterSpacing: '-4px', lineHeight: 1 }}>
                      {slug.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '16px', color: '#6B7280', fontWeight: 600, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      twyne {slug}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ② STAT BANNER */}
        {produkt.stats && produkt.stats.length > 0 && (
          <section style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {produkt.stats.map((stat: { value: string; label: string }, i: number) => (
                  <div
                    key={i}
                    className="p-stat"
                    style={{
                      padding: '16px 24px',
                      textAlign: 'center',
                      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="p-stat-val" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: produkt.color, lineHeight: 1, marginBottom: '8px', letterSpacing: '-1px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, lineHeight: 1.4 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ③ FEATURE GRID */}
        <section id="features" style={{ background: '#FFFFFF', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '1px', background: produkt.color }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: produkt.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Funktionen</span>
                <div style={{ width: '40px', height: '1px', background: produkt.color }} />
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#111111', letterSpacing: '-1.5px' }}>
                Alles, was Sie brauchen
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {produkt.features.map((feature, i) => (
                <div key={i} className="p-card" style={{ padding: '28px', borderRadius: '16px', border: '1px solid #EFEFEF', background: '#FAFAFA' }}>
                  <div className="p-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${produkt.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: produkt.color }}>
                    {featureIconMap[feature.icon] ?? <CheckCircle size={26} />}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ④ SPLIT HIGHLIGHT */}
        {produkt.splitHighlight && (
          <section style={{ background: '#F8F9FA', padding: '80px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div style={{ background: `linear-gradient(135deg, ${produkt.color} 0%, #5B21B6 100%)`, borderRadius: '20px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '280px', justifyContent: 'center' }}>
                  <div>{splitIconMap[produkt.splitHighlight.icon] ?? <Zap size={64} style={{ color: 'white' }} />}</div>
                  <p style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: 'white', lineHeight: 1.25, letterSpacing: '-0.5px', margin: 0 }}>
                    {produkt.splitHighlight.quote}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#111111', letterSpacing: '-0.8px', marginBottom: '16px', lineHeight: 1.2 }}>
                    {produkt.splitHighlight.h3}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.75, marginBottom: '28px' }}>
                    {produkt.splitHighlight.text}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {produkt.splitHighlight.checks.map((c: string, i: number) => (
                      <div key={i} className="p-check" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                        <CheckCircle size={16} style={{ color: produkt.color, flexShrink: 0 }} />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ⑤ FAQ */}
        <section id="faq" style={{ background: '#FFFFFF', padding: '80px 0' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '40px', textAlign: 'center' }}>
              Häufige Fragen
            </h2>
            <FaqAccordion items={produkt.faq} />
          </div>
        </section>

        {/* ⑥ DEMO FORM */}
        <section id="demo" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.05em' }}>
                  Demo anfragen
                </span>
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '20px' }}>
                  {produkt.ctaTitle}
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '32px' }}>
                  Füllen Sie das Formular aus — wir melden uns innerhalb von 24h für ein kostenloses Demo-Gespräch.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {['Persönliche Demo, kein Self-Service', '14 Tage kostenlos testen', 'Monatlich kündbar, keine Bindung'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      <CheckCircle size={16} style={{ color: 'rgba(255,255,255,0.7)', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <DemoAnfrageForm
                  quelle="PRODUKT_DEMO"
                  produkt={produkt.produktEnum}
                  titel={`Demo für twyne ${slug.charAt(0).toUpperCase() + slug.slice(1)}`}
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
