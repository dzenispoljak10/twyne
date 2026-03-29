import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { branchenData, branchenMeta } from '@/lib/branchen-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(branchenData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = branchenData[slug]
  if (!data) return {}
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: `https://twyne.ch/branchen/${slug}` },
  }
}

// Inline icon map using SVG paths (subset of Lucide icons used in data)
const iconPaths: Record<string, string> = {
  Phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.05 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
  Search: 'M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z',
  Globe: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20',
  Calendar: 'M3 4h18v18H3V4zM16 2v4M8 2v4M3 10h18',
  MapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a2 2 0 100-4 2 2 0 000 4z',
  CreditCard: 'M1 4h22v16H1V4zM1 10h22',
  ShoppingCart: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  Layout: 'M3 3h18v18H3V3zM3 9h18M9 21V9',
  TrendingUp: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  Users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  Zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  Heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  Star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  Wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  Shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  FileText: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  Activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  Clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  Mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
}

function InlineIcon({ name, size = 22, color = '#7C3AED' }: { name: string; size?: number; color?: string }) {
  const path = iconPaths[name]
  if (!path) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}

export default async function BrancheDetailPage({ params }: Props) {
  const { slug } = await params
  const data = branchenData[slug]
  if (!data) notFound()

  const meta = branchenMeta[slug]

  return (
    <>
      <style>{`
        .branche-cards-3 { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .branche-cards-2 { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) {
          .branche-cards-3 { grid-template-columns: repeat(2, 1fr); }
          .branche-cards-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .branche-cards-3 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .branche-cards-4 { grid-template-columns: repeat(4, 1fr); }
        }
        .branche-cards-4 { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .branche-cards-4 { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
      <Navbar />
      <main className="pt-16">

        {/* 1. Hero */}
        <section style={{ background: '#111111', padding: '96px 0 80px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: '16px' }}>
              {data.hero.badge}
            </p>
            <h1 style={{ color: 'white', fontWeight: 800, lineHeight: 1.05, marginBottom: '24px', fontSize: 'clamp(30px, 4.5vw, 52px)', letterSpacing: '-2px', maxWidth: '700px' }}>
              {data.hero.h1}
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: '18px', maxWidth: '540px', lineHeight: 1.7, marginBottom: '36px' }}>
              {data.hero.subtext}
            </p>
            <Link
              href="/anfrage"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#7C3AED', color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
            >
              Jetzt anfragen
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>

        {/* 2. Herausforderungen */}
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '12px' }}>
              Die Realität
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '48px' }}>
              Herausforderungen in dieser Branche
            </h2>
            <div className="branche-cards-3">
              {data.herausforderungen.map((item) => (
                <div key={item.title} style={{ background: '#F8F9FA', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <InlineIcon name={item.icon} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.75, margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Was Twyne liefert */}
        <section style={{ background: '#F4F4F6', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '12px' }}>
              Unsere Leistungen
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '48px' }}>
              Was Twyne liefert
            </h2>
            <div className={data.leistungen.length === 4 ? 'branche-cards-4' : 'branche-cards-3'}>
              {data.leistungen.map((item) => (
                <div key={item.title} style={{ background: 'white', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <InlineIcon name={item.icon} />
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111111', marginBottom: '10px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.75, margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Portfolio-Projekte */}
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '12px' }}>
              Referenzen
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '48px' }}>
              Passende Projekte
            </h2>
            <div className="branche-cards-2">
              {data.projekte.map((projekt) => (
                <div key={projekt.name} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div style={{ background: projekt.thumbnailColor, height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
                    <span style={{ fontSize: '28px', fontWeight: 900, color: 'rgba(255,255,255,0.15)', letterSpacing: '-1px', userSelect: 'none', position: 'relative', zIndex: 1 }}>
                      {projekt.name}
                    </span>
                  </div>
                  <div style={{ padding: '28px', background: '#F8F9FA', border: '1px solid #EFEFEF', borderTop: 'none' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED', background: '#EDE9FE', padding: '3px 8px', borderRadius: '5px', display: 'inline-block', marginBottom: '12px' }}>
                      {projekt.kategoriLabel}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', marginBottom: '8px' }}>{projekt.name}</h3>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{projekt.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <Link
                href="/portfolio"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}
              >
                Alle Projekte ansehen →
              </Link>
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section style={{ background: '#F4F4F6', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '12px' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '48px' }}>
              Häufige Fragen
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
              {data.faq.map((item) => (
                <div key={item.question} style={{ background: 'white', borderRadius: '16px', padding: '28px 32px', border: '1px solid #EFEFEF' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111111', marginBottom: '10px', lineHeight: 1.4 }}>
                    {item.question}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.75, margin: 0 }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', marginBottom: '16px', lineHeight: 1.1 }}>
              {data.ctaTitle}
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '36px' }}>
              Kostenlose Erstberatung — unverbindlich, Antwort innerhalb von 24h.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/anfrage"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#7C3AED', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
              >
                Jetzt anfragen
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link
                href="/kontakt"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
