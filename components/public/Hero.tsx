'use client'
import Link from 'next/link'

function DashboardSvg() {
  return (
    <div className="float-animate" style={{ width: '100%', maxWidth: '480px' }}>
      <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.12))' }}>
        <rect width="480" height="360" rx="20" fill="#F8F9FA" stroke="#EFEFEF" strokeWidth="1"/>
        <rect width="480" height="48" rx="20" fill="white"/>
        <rect y="20" width="480" height="28" fill="white"/>
        <circle cx="24" cy="24" r="6" fill="#FF5F57"/>
        <circle cx="44" cy="24" r="6" fill="#FFBD2E"/>
        <circle cx="64" cy="24" r="6" fill="#28C840"/>
        <rect x="88" y="16" width="180" height="16" rx="8" fill="#F4F4F6"/>
        <rect x="0" y="48" width="72" height="312" fill="#FAFAFA" stroke="#F0F0F0" strokeWidth="1"/>
        <rect x="12" y="68" width="48" height="48" rx="10" fill="#7C3AED" fillOpacity="0.1"/>
        <rect x="20" y="80" width="32" height="4" rx="2" fill="#7C3AED"/>
        <rect x="20" y="90" width="24" height="3" rx="1.5" fill="#A78BFA"/>
        <rect x="12" y="126" width="48" height="48" rx="10" fill="#F4F4F6"/>
        <rect x="20" y="138" width="28" height="4" rx="2" fill="#9CA3AF"/>
        <rect x="20" y="148" width="20" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="12" y="184" width="48" height="48" rx="10" fill="#F4F4F6"/>
        <rect x="20" y="196" width="28" height="4" rx="2" fill="#9CA3AF"/>
        <rect x="20" y="206" width="20" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="88" y="64" width="100" height="72" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="104" y="78" width="40" height="6" rx="3" fill="#7C3AED"/>
        <rect x="104" y="90" width="60" height="18" rx="4" fill="#111111"/>
        <rect x="104" y="114" width="30" height="5" rx="2.5" fill="#D1D5DB"/>
        <rect x="200" y="64" width="100" height="72" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="216" y="78" width="40" height="6" rx="3" fill="#10B981"/>
        <rect x="216" y="90" width="60" height="18" rx="4" fill="#111111"/>
        <rect x="216" y="114" width="30" height="5" rx="2.5" fill="#D1D5DB"/>
        <rect x="312" y="64" width="100" height="72" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="328" y="78" width="40" height="6" rx="3" fill="#F59E0B"/>
        <rect x="328" y="90" width="60" height="18" rx="4" fill="#111111"/>
        <rect x="328" y="114" width="30" height="5" rx="2.5" fill="#D1D5DB"/>
        <rect x="88" y="152" width="200" height="120" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="104" y="166" width="80" height="6" rx="3" fill="#111111"/>
        <rect x="108" y="226" width="20" height="30" rx="4" fill="#EDE9FE"/>
        <rect x="136" y="210" width="20" height="46" rx="4" fill="#C4B5FD"/>
        <rect x="164" y="196" width="20" height="60" rx="4" fill="#A78BFA"/>
        <rect x="192" y="200" width="20" height="56" rx="4" fill="#7C3AED"/>
        <rect x="220" y="186" width="20" height="70" rx="4" fill="#6D28D9"/>
        <rect x="248" y="192" width="20" height="64" rx="4" fill="#5B21B6"/>
        <rect x="300" y="152" width="160" height="120" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="316" y="166" width="60" height="5" rx="2.5" fill="#111111"/>
        <rect x="316" y="182" width="128" height="1" fill="#F4F4F6"/>
        <circle cx="326" cy="196" r="8" fill="#EDE9FE"/>
        <rect x="342" y="192" width="60" height="4" rx="2" fill="#374151"/>
        <rect x="342" y="200" width="40" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="408" y="192" width="28" height="14" rx="4" fill="#DCFCE7"/>
        <rect x="316" y="214" width="128" height="1" fill="#F4F4F6"/>
        <circle cx="326" cy="228" r="8" fill="#FEF9C3"/>
        <rect x="342" y="224" width="50" height="4" rx="2" fill="#374151"/>
        <rect x="342" y="232" width="35" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="408" y="224" width="28" height="14" rx="4" fill="#FEE2E2"/>
        <rect x="316" y="246" width="128" height="1" fill="#F4F4F6"/>
        <circle cx="326" cy="260" r="8" fill="#E0F2FE"/>
        <rect x="342" y="256" width="55" height="4" rx="2" fill="#374151"/>
        <rect x="342" y="264" width="42" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="408" y="256" width="28" height="14" rx="4" fill="#DCFCE7"/>
        <rect x="88" y="288" width="372" height="48" rx="12" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
        <rect x="104" y="304" width="120" height="16" rx="4" fill="#7C3AED"/>
        <rect x="240" y="307" width="80" height="5" rx="2.5" fill="#F4F4F6"/>
        <rect x="240" y="317" width="60" height="4" rx="2" fill="#F4F4F6"/>
        <rect x="408" y="304" width="36" height="16" rx="6" fill="#F4F4F6"/>
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', background: '#FFFFFF', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: '96px', paddingBottom: '80px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <div className="fade-up" style={{ marginBottom: '28px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.2)', color: '#7C3AED', borderRadius: '100px', padding: '6px 16px', fontSize: '13px', fontWeight: 500 }}>
                ✦ Digitalagentur · Schweiz
              </span>
            </div>

            <h1 className="fade-up-1" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.05, color: '#111111', marginBottom: '24px' }}>
              Wir bauen digitale<br />
              <span style={{ color: '#7C3AED' }}>Produkte die wirken.</span>
            </h1>

            <p className="fade-up-2" style={{ color: '#6B7280', fontSize: '17px', maxWidth: '480px', lineHeight: 1.7, marginBottom: '36px' }}>
              Twyne ist Ihre Digitalagentur in der Schweiz — spezialisiert auf Webseiten, Webapplikationen, Software und KI-Beratung für Schweizer KMU in der ganzen Schweiz.
            </p>

            <div className="fade-up-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              <Link
                href="/anfrage"
                style={{ background: '#7C3AED', color: 'white', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.4)'; e.currentTarget.style.background = '#6D28D9' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#7C3AED' }}
              >
                Projekt starten
              </Link>
              <Link
                href="/leistungen"
                style={{ background: 'transparent', border: '1.5px solid #E8E8ED', color: '#374151', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#7C3AED' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#374151' }}
              >
                Leistungen entdecken ↓
              </Link>
            </div>

            <div className="fade-up-4" style={{ borderTop: '1px solid #F0F0F0', paddingTop: '28px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                {[
                  { value: '60', suffix: '+', label: 'Projekte' },
                  { value: '8', suffix: '+', label: 'Jahre Erfahrung' },
                  { value: '100', suffix: '%', label: 'Schweiz' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: '#111111', lineHeight: 1, marginBottom: '4px' }}>
                      {stat.value}<span style={{ color: '#7C3AED' }}>{stat.suffix}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — animated SVG */}
          <div className="hidden lg:flex justify-end fade-up-2">
            <DashboardSvg />
          </div>
        </div>
      </div>
    </section>
  )
}
