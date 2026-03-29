import Link from 'next/link'
import { CheckCircle, Palette, Zap, Search, Code2, Shield, BarChart2, Brain, Layers, FileText, Globe, Smartphone, Pencil, Server, Settings, MapPin, TrendingUp, Monitor, Users, Sparkles } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import FaqAccordion from './FaqAccordion'
import type { LeistungData } from '@/lib/leistungen-data'
import { leistungenData } from '@/lib/leistungen-data'

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={28} style={{ color: '#7C3AED' }} />,
  Zap: <Zap size={28} style={{ color: '#7C3AED' }} />,
  Search: <Search size={28} style={{ color: '#7C3AED' }} />,
  Code2: <Code2 size={28} style={{ color: '#7C3AED' }} />,
  Shield: <Shield size={28} style={{ color: '#7C3AED' }} />,
  BarChart2: <BarChart2 size={28} style={{ color: '#7C3AED' }} />,
  Brain: <Brain size={28} style={{ color: '#7C3AED' }} />,
  Layers: <Layers size={28} style={{ color: '#7C3AED' }} />,
  FileText: <FileText size={28} style={{ color: '#7C3AED' }} />,
  Globe: <Globe size={28} style={{ color: '#7C3AED' }} />,
  Smartphone: <Smartphone size={28} style={{ color: '#7C3AED' }} />,
  Pencil: <Pencil size={28} style={{ color: '#7C3AED' }} />,
  Server: <Server size={28} style={{ color: '#7C3AED' }} />,
  Settings: <Settings size={28} style={{ color: '#7C3AED' }} />,
  MapPin: <MapPin size={28} style={{ color: '#7C3AED' }} />,
  TrendingUp: <TrendingUp size={28} style={{ color: '#7C3AED' }} />,
  Monitor: <Monitor size={28} style={{ color: '#7C3AED' }} />,
  Users: <Users size={28} style={{ color: '#7C3AED' }} />,
  Sparkles: <Sparkles size={28} style={{ color: '#7C3AED' }} />,
}

const splitIconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={64} style={{ color: 'white' }} />,
  Globe: <Globe size={64} style={{ color: 'white' }} />,
  Brain: <Brain size={64} style={{ color: 'white' }} />,
  Code2: <Code2 size={64} style={{ color: 'white' }} />,
  Monitor: <Monitor size={64} style={{ color: 'white' }} />,
  Pencil: <Pencil size={64} style={{ color: 'white' }} />,
  Sparkles: <Sparkles size={64} style={{ color: 'white' }} />,
  Zap: <Zap size={64} style={{ color: 'white' }} />,
  Users: <Users size={64} style={{ color: 'white' }} />,
  Search: <Search size={64} style={{ color: 'white' }} />,
  Shield: <Shield size={64} style={{ color: 'white' }} />,
}

const relatedMap: Record<string, string[]> = {
  webseiten: ['webapplikationen', 'cms', 'seo'],
  webapplikationen: ['webseiten', 'software', 'ki-beratung'],
  software: ['webapplikationen', 'ki-beratung', 'digitale-transformation'],
  cms: ['webseiten', 'seo', 'webapplikationen'],
  'ki-beratung': ['software', 'digitale-transformation', 'seo'],
  'digitale-transformation': ['ki-beratung', 'software', 'webapplikationen'],
  seo: ['webseiten', 'cms', 'ki-beratung'],
}

const BASE = 'https://twyne.ch'

export default function LeistungTemplate({ data, slug }: { data: LeistungData; slug: string }) {
  const relatedSlugs = relatedMap[slug] ?? []

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${data.hero.h1} ${data.hero.h1Purple}`,
    description: data.meta.description,
    url: `${BASE}/leistungen/${slug}`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Twyne',
      url: BASE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Galliweg 3',
        postalCode: '4852',
        addressLocality: 'Rothrist',
        addressCountry: 'CH',
      },
    },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    serviceType: data.hero.badge,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${BASE}/leistungen` },
      { '@type': 'ListItem', position: 3, name: data.hero.breadcrumb, item: `${BASE}/leistungen/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <style dangerouslySetInnerHTML={{ __html: `
        /* Feature cards */
        .l-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; cursor: default; }
        .l-card:hover { transform: translateY(-5px); border-color: rgba(124,58,237,0.25) !important; box-shadow: 0 16px 40px rgba(124,58,237,0.08), 0 4px 12px rgba(0,0,0,0.04); }
        .l-card:hover .l-icon { background: rgba(124,58,237,0.14) !important; transform: scale(1.08); }
        .l-icon { transition: background 0.25s ease, transform 0.25s ease; }

        /* Process steps */
        .l-step { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .l-step:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .l-step:hover .l-step-num { background: #6D28D9 !important; }
        .l-step-num { transition: background 0.25s ease; }

        /* Stat banner */
        .l-stat { transition: background 0.2s ease; cursor: default; }
        .l-stat:hover { background: rgba(255,255,255,0.03); }
        .l-stat:hover .l-stat-val { color: #A78BFA !important; }
        .l-stat-val { transition: color 0.2s ease; }

        /* Hero CTA */
        .l-hero-btn { transition: all 0.25s ease; }
        .l-hero-btn:hover { background: #6D28D9 !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.45); }

        /* Related cards */
        .l-related { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .l-related:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .l-related:hover .l-related-arrow { transform: translateX(5px); }
        .l-related-arrow { transition: transform 0.2s ease; display: inline-block; }

        /* CTA button */
        .l-cta-btn { transition: all 0.25s ease; }
        .l-cta-btn:hover { background: rgba(255,255,255,0.92) !important; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.2); }

        /* Split highlight checks */
        .l-check { transition: transform 0.2s ease; }
        .l-check:hover { transform: translateX(3px); }

        /* Intro check items */
        .l-intro-check { transition: transform 0.2s ease; }
        .l-intro-check:hover { transform: translateX(3px); }
      ` }} />
      <Navbar />
      <main className="pt-16">

        {/* ① HERO — dark */}
        <section style={{ background: '#111111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6B7280' }}>
                  <Link href="/leistungen" style={{ color: '#6B7280', textDecoration: 'none' }}>Leistungen</Link>
                  <span>→</span>
                  <span style={{ color: '#A78BFA' }}>{data.hero.breadcrumb}</span>
                </div>
                <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#A78BFA', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.05em' }}>
                  {data.hero.badge}
                </span>
                <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '20px' }}>
                  {data.hero.h1}<br />
                  <span style={{ color: '#7C3AED' }}>{data.hero.h1Purple}</span>
                </h1>
                <p style={{ fontSize: '17px', color: '#9CA3AF', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
                  {data.hero.description}
                </p>
                <Link
                  href="/anfrage"
                  className="l-hero-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', background: '#7C3AED', color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
                >
                  Jetzt anfragen →
                </Link>
              </div>
              <div className="hidden lg:block">
                <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', height: '360px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.hero.imageUrl}
                    alt={data.hero.imageAlt}
                    loading="eager"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(124,58,237,0.15)' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ② STAT BANNER — dark strip */}
        {data.stats && data.stats.length > 0 && (
          <section style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="l-stat"
                    style={{
                      padding: '16px 24px',
                      textAlign: 'center',
                      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="l-stat-val" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#7C3AED', lineHeight: 1, marginBottom: '8px', letterSpacing: '-1px' }}>
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

        {/* ③ 2-COL INTRO — white */}
        {data.introTitle && (
          <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '24px' }}>
                    {data.introTitle}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {data.intro?.map((para, i) => (
                      <p key={i} style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8 }}>{para}</p>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#F8F9FA', borderRadius: '16px', padding: '32px', border: '1px solid #EFEFEF' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
                    Was das bedeutet für Sie
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {data.introChecks?.map((check, i) => (
                      <div key={i} className="l-intro-check" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                          <CheckCircle size={15} style={{ color: '#7C3AED' }} />
                        </div>
                        <span style={{ fontSize: '14px', color: '#374151', lineHeight: 1.55, fontWeight: 500 }}>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ④ FEATURE GRID — gray */}
        <section style={{ background: '#F8F9FA', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Leistungen</span>
                <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px' }}>
                Was Sie davon haben
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.benefits.map((b, i) => (
                <div key={i} className="l-card" style={{ background: 'white', padding: '28px', borderRadius: '16px', border: '1px solid #EFEFEF' }}>
                  <div className="l-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    {iconMap[b.iconName] ?? <Zap size={28} style={{ color: '#7C3AED' }} />}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px', letterSpacing: '-0.3px' }}>{b.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ SPLIT HIGHLIGHT — white */}
        {data.splitHighlight && (
          <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Gradient box */}
                <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', borderRadius: '20px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '280px', justifyContent: 'center' }}>
                  <div>{splitIconMap[data.splitHighlight.icon] ?? <Zap size={64} style={{ color: 'white' }} />}</div>
                  <p style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 800, color: 'white', lineHeight: 1.25, letterSpacing: '-0.5px', margin: 0 }}>
                    {data.splitHighlight.quote}
                  </p>
                </div>
                {/* Text */}
                <div>
                  <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#111111', letterSpacing: '-0.8px', marginBottom: '16px', lineHeight: 1.2 }}>
                    {data.splitHighlight.h3}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.75, marginBottom: '28px' }}>
                    {data.splitHighlight.text}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.splitHighlight.checks.map((c, i) => (
                      <div key={i} className="l-check" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                        <CheckCircle size={16} style={{ color: '#7C3AED', flexShrink: 0 }} />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ⑥ PROCESS TIMELINE — gray */}
        <section style={{ background: '#F8F9FA', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unser Prozess</span>
                <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px' }}>
                So arbeiten wir
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.process.map((step, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div className="l-step" style={{ background: 'white', borderRadius: '16px', padding: '28px 24px', border: '1px solid #EFEFEF', height: '100%' }}>
                    <div className="l-step-num" style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>{step.num}</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>{step.title}</h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.65 }}>{step.description}</p>
                  </div>
                  {i < data.process.length - 1 && (
                    <div
                      className="hidden lg:block"
                      style={{ position: 'absolute', top: '40px', right: '-16px', width: '20px', height: '2px', borderTop: '2px dashed #D1D5DB', zIndex: 1 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑦ FAQ — white */}
        <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '40px', textAlign: 'center' }}>
              Häufige Fragen
            </h2>
            <FaqAccordion items={data.faq} />
          </div>
        </section>

        {/* ⑧ RELATED LEISTUNGEN — gray */}
        {relatedSlugs.length > 0 && (
          <section style={{ background: '#F8F9FA', padding: '64px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED', marginBottom: '8px' }}>
                Das könnte Sie auch interessieren
              </p>
              <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#111111', letterSpacing: '-0.8px', marginBottom: '32px' }}>
                Verwandte Leistungen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedSlugs.map((rSlug) => {
                  const rel = leistungenData[rSlug]
                  if (!rel) return null
                  return (
                    <Link key={rSlug} href={`/leistungen/${rSlug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div className="l-related" style={{ padding: '28px', borderRadius: '16px', border: '1px solid #EFEFEF', background: 'white' }}>
                        <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.08)', color: '#7C3AED', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', marginBottom: '12px' }}>
                          {rel.hero.badge}
                        </span>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                          {rel.hero.h1} {rel.hero.h1Purple}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, marginBottom: '14px' }}>
                          {rel.hero.description.slice(0, 100)}…
                        </p>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#7C3AED' }}>
                          Mehr erfahren <span className="l-related-arrow">→</span>
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ⑨ CTA CARD — gradient */}
        <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="max-w-3xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
              {data.ctaTitle}
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', marginBottom: '40px', lineHeight: 1.7 }}>
              Kostenloses Erstgespräch — Antwort innerhalb von 24h.
            </p>
            <Link
              href="/anfrage"
              className="l-cta-btn"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'white', color: '#7C3AED', padding: '16px 40px', borderRadius: '12px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.2px' }}
            >
              Jetzt anfragen →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
