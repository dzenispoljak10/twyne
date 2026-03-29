import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { produkteData } from '@/lib/produkte-data'
import { Users, Calendar, Inbox, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Produkte — twyne',
  description: 'Entdecken Sie unsere Softwareprodukte: Club, Table, Desk und Flow. Massgeschneiderte Lösungen für Schweizer KMU.',
}

const iconMap: Record<string, React.ElementType> = {
  club: Users,
  table: Calendar,
  desk: Inbox,
  flow: Zap,
}

export default function ProduktePage() {
  const produkte = Object.values(produkteData)

  return (
    <>
      <style>{`.produkt-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }`}</style>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: '#111111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" style={{ position: 'relative' }}>
            <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#A78BFA', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', fontWeight: 500, marginBottom: '24px', letterSpacing: '0.05em' }}>
              Unsere Produkte
            </span>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '20px' }}>
              Software, die<br />
              <span style={{ color: '#7C3AED' }}>einfach funktioniert</span>
            </h1>
            <p style={{ fontSize: '18px', color: '#9CA3AF', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
              Vier fokussierte Produkte für die häufigsten Herausforderungen in Schweizer KMU. Kein Overkill — nur das, was Sie wirklich brauchen.
            </p>
          </div>
        </section>

        {/* Products grid */}
        <section style={{ background: '#F8F9FA', padding: '96px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {produkte.map((produkt) => {
                const Icon = iconMap[produkt.slug] ?? Zap
                return (
                  <Link
                    key={produkt.slug}
                    href={`/produkte/${produkt.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      className="produkt-card"
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '40px',
                        border: '1px solid #EFEFEF',
                        transition: 'all 0.25s ease',
                        height: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${produkt.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={24} style={{ color: produkt.color }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', background: '#F4F4F6', padding: '4px 10px', borderRadius: '100px' }}>
                          twyne {produkt.slug.charAt(0).toUpperCase() + produkt.slug.slice(1)}
                        </span>
                      </div>
                      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111111', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                        {produkt.hero.h1} <span style={{ color: produkt.color }}>{produkt.hero.h1Purple}</span>
                      </h2>
                      <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>
                        {produkt.hero.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: produkt.color, fontSize: '14px', fontWeight: 600 }}>
                        Mehr erfahren
                        <span style={{ fontSize: '16px' }}>→</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '80px 0', textAlign: 'center' }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-2px', color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.1 }}>
              Nicht sicher, welches Produkt passt?
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px', lineHeight: 1.6 }}>
              Sprechen Sie mit uns. In einem kurzen Gespräch finden wir gemeinsam die richtige Lösung.
            </p>
            <Link
              href="/anfrage"
              style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFFFF', color: '#7C3AED', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
            >
              Kostenloses Gespräch →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
