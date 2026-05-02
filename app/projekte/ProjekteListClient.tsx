'use client'
import { useMemo, useState } from 'react'
import type { Project, ProjectCategory } from '@/lib/projects-data'
import ProjektCard from '@/components/public/ProjektCard'

type Filter = 'Alle' | ProjectCategory

const filters: Filter[] = ['Alle', 'Website', 'E-Commerce', 'Webapp', 'Plattform', 'Software']

export default function ProjekteListClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>('Alle')

  const visible = useMemo(() => {
    if (active === 'Alle') return projects
    return projects.filter((p) => p.category === active)
  }, [active, projects])

  return (
    <>
      {/* Filter-Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '40px',
          scrollbarWidth: 'thin',
        }}
      >
        {filters.map((f) => {
          const isActive = active === f
          const count = f === 'Alle' ? projects.length : projects.filter((p) => p.category === f).length
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '100px',
                border: `1px solid ${isActive ? '#7C3AED' : '#E5E7EB'}`,
                background: isActive ? '#7C3AED' : 'white',
                color: isActive ? 'white' : '#374151',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              {f}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 8px',
                  borderRadius: '100px',
                  background: isActive ? 'rgba(255,255,255,0.22)' : '#F4F4F6',
                  color: isActive ? 'white' : '#9CA3AF',
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <style>{`
        .projekte-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .projekte-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .projekte-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @keyframes projekteFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .projekte-grid > * {
          animation: projekteFadeIn 0.4s ease both;
        }
      `}</style>

      {visible.length === 0 ? (
        <p style={{ color: '#6B7280', textAlign: 'center', padding: '48px 0' }}>
          Keine Projekte in dieser Kategorie.
        </p>
      ) : (
        <div className="projekte-grid" key={active}>
          {visible.map((p) => (
            <ProjektCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </>
  )
}
