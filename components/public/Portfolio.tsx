import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { kategorieMeta } from '@/lib/portfolio-meta'

interface PortfolioItem {
  id: string
  name: string
  kategorie: string
  jahr: number
  beschreibung: string
  tags: string[]
  bildUrl: string | null
}

function PortfolioCardStatic({ item }: { item: PortfolioItem }) {
  const meta = kategorieMeta[item.kategorie] ?? { label: item.kategorie, color: '#7C3AED', fallback: '' }
  const imgSrc = item.bildUrl || meta.fallback

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #EFEFEF',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            borderRadius: '100px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}>
            {meta.label}
          </span>
          <span style={{
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.85)',
            borderRadius: '100px',
            padding: '4px 10px',
            fontSize: '11px',
          }}>
            {item.jahr}
          </span>
        </div>
      </div>
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111111', marginBottom: '8px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
          {item.name}
        </h3>
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
          {item.beschreibung}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 10px', background: '#F8F9FA', color: '#374151',
              fontSize: '12px', fontWeight: 500, borderRadius: '6px', border: '1px solid #EFEFEF',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Portfolio() {
  const items = await prisma.portfolio.findMany({
    where: { sichtbar: true },
    orderBy: [{ reihenfolge: 'asc' }, { createdAt: 'desc' }],
    take: 3,
  })

  return (
    <section style={{ background: '#FFFFFF', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div>
            <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Portfolio
              </span>
            </div>
            <h2 className="animate-on-scroll" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-2px',
              color: '#111111', lineHeight: 1.1,
            }}>
              Ausgewählte Projekte
            </h2>
          </div>
          <Link href="/portfolio" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '14px', fontWeight: 500, color: '#7C3AED',
          }} className="hidden md:flex">
            Alle Projekte <ArrowRight size={16} />
          </Link>
        </div>

        {items.length === 0 ? (
          <p style={{ color: '#6B7280', textAlign: 'center', padding: '48px 0' }}>
            Noch keine Projekte vorhanden.
          </p>
        ) : (
          <div className="animate-on-scroll" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {items.map((item) => (
              <PortfolioCardStatic key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
