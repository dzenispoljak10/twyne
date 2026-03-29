'use client'
import Link from 'next/link'
import { Users, Calendar, Inbox, Zap } from 'lucide-react'
import { produkteData } from '@/lib/produkte-data'

const iconMap: Record<string, React.ElementType> = {
  club: Users,
  table: Calendar,
  desk: Inbox,
  flow: Zap,
}

export default function ProductsSection() {
  const produkte = Object.values(produkteData)

  return (
    <section style={{ background: '#111111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unsere Produkte</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-2px', lineHeight: 1.1, maxWidth: '480px' }}>
              Software, die einfach<br />
              <span style={{ color: '#7C3AED' }}>funktioniert</span>
            </h2>
          </div>
          <Link
            href="/produkte"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#A78BFA', textDecoration: 'none', flexShrink: 0 }}
          >
            Alle Produkte ansehen →
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {produkte.map((produkt) => {
            const Icon = iconMap[produkt.slug] ?? Zap
            return (
              <Link
                key={produkt.slug}
                href={`/produkte/${produkt.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    height: '100%',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.06)'
                    el.style.borderColor = `${produkt.color}40`
                    el.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.03)'
                    el.style.borderColor = 'rgba(255,255,255,0.06)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${produkt.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={20} style={{ color: produkt.color }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    twyne {produkt.slug.charAt(0).toUpperCase() + produkt.slug.slice(1)}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                    {produkt.hero.h1Purple}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginBottom: '20px' }}>
                    {produkt.hero.tagline}
                  </p>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: produkt.color }}>
                    Mehr erfahren →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
