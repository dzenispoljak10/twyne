'use client'
import { useState } from 'react'
import { kategorieMeta } from '@/lib/portfolio-meta'

interface PortfolioItem {
  id: string
  name: string
  kategorie: string
  jahr: number
  beschreibung: string
  tags: string[]
  bildUrl: string | null
  reihenfolge: number
  sichtbar: boolean
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [hovered, setHovered] = useState(false)
  const meta = kategorieMeta[item.kategorie] ?? { label: item.kategorie, color: '#7C3AED', fallback: '' }
  const imgSrc = item.bildUrl || meta.fallback

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #EFEFEF',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(124,58,237,0.06)' : 'rgba(0,0,0,0.18)',
          transition: 'background 0.3s ease',
        }} />
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

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B7280', fontSize: '15px' }}>
        Noch keine Projekte vorhanden.
      </div>
    )
  }

  return (
    <div className="portfolio-grid">
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}
