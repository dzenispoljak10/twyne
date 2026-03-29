import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import CtaSection from '@/components/public/CtaSection'
import { kategorieMeta } from '@/lib/portfolio-meta'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portfolio — Twyne Digitalagentur',
  description: 'Ausgewählte Projekte von Twyne — Webseiten, Apps, Software und KI-Lösungen für Schweizer Unternehmen.',
  alternates: {
    canonical: 'https://twyne.ch/portfolio',
  },
}

export default async function PortfolioPage() {
  const items = await prisma.portfolio.findMany({
    where: { sichtbar: true },
    orderBy: [{ reihenfolge: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section style={{ background: '#111111', padding: '96px 0 80px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: '16px' }}>
              Portfolio
            </p>
            <h1 style={{ color: 'white', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px' }}>
              Ausgewählte<br />
              <span style={{ color: '#7C3AED' }}>Projekte</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: '18px', maxWidth: '520px', lineHeight: 1.6 }}>
              Reale Projekte, messbare Resultate — für Unternehmen in der ganzen Schweiz.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <style>{`
          .portfolio-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            border: 1px solid #EFEFEF;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .portfolio-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          }
        `}</style>
        <section style={{ padding: '80px 0', background: '#F4F4F6' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {items.length === 0 ? (
              <p style={{ color: '#6B7280', fontSize: '15px', textAlign: 'center', padding: '60px 0' }}>
                Noch keine Projekte vorhanden.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {items.map((item) => {
                  const meta = kategorieMeta[item.kategorie] ?? { label: item.kategorie, color: '#7C3AED' }
                  const bgColor = item.thumbnailColor || meta.color

                  return (
                    <div key={item.id} className="portfolio-card">
                      {/* Thumbnail */}
                      {item.bildUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.bildUrl}
                          alt={item.name}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <div style={{ background: bgColor, height: '180px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
                          <span style={{ fontSize: '28px', fontWeight: 900, color: 'rgba(255,255,255,0.12)', letterSpacing: '-1px', userSelect: 'none', position: 'relative', zIndex: 1 }}>
                            {item.name}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div style={{ padding: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED', background: '#EDE9FE', padding: '3px 8px', borderRadius: '5px' }}>
                            {meta.label}
                          </span>
                          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{item.jahr}</span>
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '10px', lineHeight: 1.2 }}>
                          {item.name}
                        </h2>
                        <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7, marginBottom: '16px' }}>
                          {item.beschreibung}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{ fontSize: '11px', color: '#374151', background: '#F3F4F6', border: '1px solid #E5E7EB', padding: '3px 8px', borderRadius: '5px', fontWeight: 500 }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
