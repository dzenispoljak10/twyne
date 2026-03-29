'use client'
import Link from 'next/link'

export default function CtaSection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <div className="animate-on-scroll" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: 500 }}>
            ✦ Jetzt starten
          </span>
        </div>

        <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '20px' }}>
          Bereit für Ihr<br />
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>nächstes Projekt?</span>
        </h2>

        <p className="animate-on-scroll" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.7 }}>
          Kostenloses Erstgespräch — unverbindlich und in der Regel innerhalb von 24h.
        </p>

        <div className="animate-on-scroll" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            href="/anfrage"
            style={{ background: '#FFFFFF', color: '#7C3AED', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Projekt anfragen
          </Link>
          <Link
            href="/portfolio"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
          >
            Portfolio ansehen
          </Link>
        </div>
      </div>
    </section>
  )
}
