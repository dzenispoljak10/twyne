import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import CtaSection from '@/components/public/CtaSection'
import { branchenMeta } from '@/lib/branchen-data'

export const metadata: Metadata = {
  title: 'Branchen — Twyne Digitalagentur',
  description: 'Digitallösungen für jede Branche — Twyne entwickelt massgeschneiderte Webseiten, Apps und Automatisierungen für Restaurants, KMU, Handwerker, Vereine, Startups und Arztpraxen.',
  alternates: {
    canonical: 'https://twyne.ch/branchen',
  },
}

export default function BranchenPage() {
  const branchen = Object.entries(branchenMeta)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section style={{ background: '#111111', padding: '96px 0 80px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: '16px' }}>
              Branchen
            </p>
            <h1 style={{ color: 'white', fontWeight: 800, lineHeight: 1.05, marginBottom: '20px', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px' }}>
              Für Ihre Branche<br />
              <span style={{ color: '#7C3AED' }}>gemacht</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: '18px', maxWidth: '520px', lineHeight: 1.6 }}>
              Jede Branche hat eigene Anforderungen. Wir kennen sie — und liefern Digitallösungen, die wirklich passen.
            </p>
          </div>
        </section>

        {/* Cards */}
        <style>{`
          .branche-card {
            background: #F8F9FA;
            border-radius: 20px;
            padding: 40px 36px;
            border: 1px solid #EFEFEF;
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
            cursor: pointer;
          }
          .branche-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(124,58,237,0.10);
            border-color: #C4B5FD;
          }
        `}</style>
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchen.map(([slug, meta]) => (
                <Link
                  key={slug}
                  href={`/branchen/${slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="branche-card">
                    <div style={{ fontSize: '36px', marginBottom: '20px' }}>{meta.icon}</div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '10px' }}>
                      {meta.label}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, margin: '0 0 20px' }}>
                      {meta.desc}
                    </p>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C3AED' }}>
                      Mehr erfahren →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
