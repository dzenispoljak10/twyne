'use client'
import Link from 'next/link'
import { Globe, Layout, Code2, FileEdit, Sparkles, TrendingUp, Search, Mail, BarChart2, Users, FileText } from 'lucide-react'

const services = [
  { href: '/leistungen/webseiten', Icon: Globe, name: 'Webseiten & Design', desc: 'Moderne, schnelle Websites' },
  { href: '/leistungen/webapplikationen', Icon: Layout, name: 'Webapplikationen', desc: 'Komplexe Web-Plattformen' },
  { href: '/leistungen/software', Icon: Code2, name: 'Softwareentwicklung', desc: 'Individuelle Lösungen' },
  { href: '/leistungen/cms', Icon: FileEdit, name: 'CMS-Lösungen', desc: 'Inhalte selbst verwalten' },
  { href: '/leistungen/ki-beratung', Icon: Sparkles, name: 'KI-Beratung', desc: 'AI pragmatisch integrieren' },
  { href: '/leistungen/digitale-transformation', Icon: TrendingUp, name: 'Digitale Transformation', desc: 'Strategie bis Umsetzung' },
  { href: '/leistungen/seo', Icon: Search, name: 'SEO & Sichtbarkeit', desc: 'Google Seite 1 erreichen' },
]

const marketingServices = [
  { href: '/leistungen/email-marketing', Icon: Mail, name: 'E-Mail Marketing', desc: 'Newsletter & Automatisierung' },
  { href: '/leistungen/google-ads', Icon: BarChart2, name: 'Google Ads', desc: 'Bezahlte Suchanzeigen' },
  { href: '/leistungen/social-media', Icon: Users, name: 'Social Media', desc: 'Instagram, LinkedIn & mehr' },
  { href: '/leistungen/content-marketing', Icon: FileText, name: 'Content Marketing', desc: 'Blog & Inhalte die ranken' },
]

interface Props {
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  pathname: string
}

export default function MegaMenuLeistungen({ isOpen, onMouseEnter, onMouseLeave, pathname }: Props) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        width: '100vw',
        background: 'white',
        borderTop: '1px solid #F0F0F0',
        borderBottom: '1px solid #F0F0F0',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        zIndex: 999,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
      aria-hidden={!isOpen}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>

          {/* Left column — intro box */}
          <div style={{
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="6" fill="rgba(255,255,255,0.9)"/>
                <circle cx="24" cy="14" r="6" fill="rgba(255,255,255,0.7)"/>
                <circle cx="24" cy="34" r="6" fill="rgba(255,255,255,0.7)"/>
                <circle cx="36" cy="24" r="6" fill="rgba(255,255,255,0.5)"/>
                <line x1="18" y1="24" x2="18" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <line x1="18" y1="24" x2="18" y2="34" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <line x1="30" y1="14" x2="30" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                <line x1="30" y1="34" x2="30" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.5px' }}>
              Unsere Leistungen
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', lineHeight: 1.6, flex: 1 }}>
              Von der Website bis zur KI-Integration — alles aus einer Hand.
            </p>
            <Link
              href="/leistungen"
              style={{
                display: 'block',
                color: 'white',
                fontWeight: 600,
                fontSize: '13px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
              }}
            >
              Alle Leistungen ansehen →
            </Link>
          </div>

          {/* Right column — groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Core services — 3-col grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              {services.map(({ href, Icon, name, desc }) => {
                const isActive = pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      background: isActive ? 'rgba(124,58,237,0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = '#F8F9FA'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isActive ? 'rgba(124,58,237,0.06)' : 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={20} style={{ color: '#7C3AED' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: isActive ? '#7C3AED' : '#111111', marginBottom: '2px' }}>
                        {name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.4 }}>
                        {desc}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Marketing group */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', padding: '0 16px', marginBottom: '4px' }}>
                Marketing
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px' }}>
                {marketingServices.map(({ href, Icon, name, desc }) => {
                  const isActive = pathname.startsWith(href)
                  return (
                    <Link
                      key={href}
                      href={href}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(124,58,237,0.06)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = '#F8F9FA'
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isActive ? 'rgba(124,58,237,0.06)' : 'transparent'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        background: isActive ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={18} style={{ color: '#7C3AED' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: isActive ? '#7C3AED' : '#111111', marginBottom: '2px' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>
                          {desc}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Featured bar */}
        <div style={{
          borderTop: '1px solid #F4F4F4',
          marginTop: '24px',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            ✦ Kostenloses Erstgespräch — in der Regel Antwort innerhalb 24h
          </span>
          <Link
            href="/anfrage"
            style={{ fontSize: '13px', fontWeight: 600, color: '#7C3AED', textDecoration: 'none' }}
          >
            Jetzt anfragen →
          </Link>
        </div>
      </div>
    </div>
  )
}
