import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/projects-data'
import ProjektCard from './ProjektCard'

export default function Projekte() {
  const featured = projects.filter((p) => p.featured).slice(0, 6)
  const items = featured.length > 0 ? featured : projects.slice(0, 4)

  return (
    <section style={{ background: '#FFFFFF', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div
              className="animate-on-scroll"
              style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}
            >
              <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#7C3AED',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Projekte
              </span>
            </div>
            <h2
              className="animate-on-scroll"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-2px',
                color: '#111111',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Ausgewählte Projekte
            </h2>
          </div>
          <Link
            href="/projekte"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#7C3AED',
              textDecoration: 'none',
            }}
            className="hidden md:inline-flex"
          >
            Alle Projekte ansehen <ArrowRight size={16} />
          </Link>
        </div>

        <style>{`
          .home-projekte-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 640px) {
            .home-projekte-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .home-projekte-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>

        <div className="animate-on-scroll home-projekte-grid">
          {items.map((p) => (
            <ProjektCard key={p.slug} project={p} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '48px',
          }}
        >
          <Link
            href="/projekte"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: '10px',
              border: '1px solid #E5E7EB',
              background: 'white',
              color: '#111111',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
          >
            Alle Projekte ansehen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
