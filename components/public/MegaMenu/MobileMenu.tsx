'use client'
import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronDown, Globe, Layout, Code2, FileEdit, Sparkles, TrendingUp, Search, Users, Calendar, Inbox, Zap } from 'lucide-react'

const subLinks = [
  { href: '/leistungen/webseiten', Icon: Globe, name: 'Webseiten & Design' },
  { href: '/leistungen/webapplikationen', Icon: Layout, name: 'Webapplikationen' },
  { href: '/leistungen/software', Icon: Code2, name: 'Softwareentwicklung' },
  { href: '/leistungen/cms', Icon: FileEdit, name: 'CMS-Lösungen' },
  { href: '/leistungen/ki-beratung', Icon: Sparkles, name: 'KI-Beratung' },
  { href: '/leistungen/digitale-transformation', Icon: TrendingUp, name: 'Digitale Transformation' },
  { href: '/leistungen/seo', Icon: Search, name: 'SEO & Sichtbarkeit' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

function Logo() {
  return (
    <svg width="120" height="28" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg" aria-label="twyne">
      <circle cx="12" cy="16" r="9" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
      <circle cx="32" cy="16" r="9" fill="none" stroke="#A78BFA" strokeWidth="2.5" />
      <line x1="21" y1="16" x2="23" y2="16" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="3" fill="#7C3AED" />
      <circle cx="32" cy="16" r="3" fill="#A78BFA" />
      <text x="50" y="22" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', fill: '#111111', letterSpacing: '-1px' }}>
        twyne
      </text>
    </svg>
  )
}

const produktLinks = [
  { href: '/produkte/club', Icon: Users, name: 'twyne Club', color: '#7C3AED' },
  { href: '/produkte/table', Icon: Calendar, name: 'twyne Table', color: '#059669' },
  { href: '/produkte/desk', Icon: Inbox, name: 'twyne Desk', color: '#0EA5E9' },
  { href: '/produkte/flow', Icon: Zap, name: 'twyne Flow', color: '#F59E0B' },
]

export default function MobileMenu({ isOpen, onClose, pathname }: Props) {
  const [leistungenOpen, setLeistungenOpen] = useState(false)
  const [produkteOpen, setProdukteOpen] = useState(false)

  const linkStyle = (href: string): React.CSSProperties => ({
    display: 'block',
    fontSize: '18px',
    fontWeight: 600,
    color: pathname === href || pathname.startsWith(href + '/') ? '#7C3AED' : '#111111',
    padding: '16px 0',
    borderBottom: '1px solid #F4F4F4',
    textDecoration: 'none',
  })

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 997,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(360px, 100vw)',
          background: 'white',
          zIndex: 998,
          padding: '20px 24px 32px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: '-20px 0 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Link href="/" onClick={onClose}>
            <Logo />
          </Link>
          <button
            onClick={onClose}
            style={{ padding: '8px', background: '#F4F4F6', borderRadius: '8px', border: 'none', cursor: 'pointer', color: '#111111', display: 'flex', alignItems: 'center' }}
            aria-label="Menu schliessen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          {/* Leistungen with expand */}
          <div style={{ borderBottom: '1px solid #F4F4F4' }}>
            <button
              onClick={() => setLeistungenOpen(!leistungenOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: 600,
                color: pathname.startsWith('/leistungen') ? '#7C3AED' : '#111111',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Leistungen
              <ChevronDown
                size={18}
                style={{
                  color: '#9CA3AF',
                  transform: leistungenOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              />
            </button>
            <div style={{
              maxHeight: leistungenOpen ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              <div style={{ paddingBottom: '8px' }}>
                {subLinks.map(({ href, Icon, name }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      paddingLeft: '20px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '15px',
                      color: pathname.startsWith(href) ? '#7C3AED' : '#6B7280',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    <Icon size={16} style={{ color: pathname.startsWith(href) ? '#7C3AED' : '#9CA3AF', flexShrink: 0 }} />
                    {name}
                  </Link>
                ))}
                <Link
                  href="/leistungen"
                  onClick={onClose}
                  style={{
                    display: 'block',
                    paddingLeft: '20px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontSize: '13px',
                    color: '#7C3AED',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Alle Leistungen ansehen →
                </Link>
              </div>
            </div>
          </div>

          {/* Produkte with expand */}
          <div style={{ borderBottom: '1px solid #F4F4F4' }}>
            <button
              onClick={() => setProdukteOpen(!produkteOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: 600,
                color: pathname.startsWith('/produkte') ? '#7C3AED' : '#111111',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Produkte
              <ChevronDown
                size={18}
                style={{
                  color: '#9CA3AF',
                  transform: produkteOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              />
            </button>
            <div style={{ maxHeight: produkteOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
              <div style={{ paddingBottom: '8px' }}>
                {produktLinks.map(({ href, Icon, name, color }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      paddingLeft: '20px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '15px',
                      color: pathname.startsWith(href) ? color : '#6B7280',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    <Icon size={16} style={{ color: pathname.startsWith(href) ? color : '#9CA3AF', flexShrink: 0 }} />
                    {name}
                  </Link>
                ))}
                <Link
                  href="/produkte"
                  onClick={onClose}
                  style={{ display: 'block', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px', fontSize: '13px', color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}
                >
                  Alle Produkte ansehen →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/portfolio" onClick={onClose} style={linkStyle('/portfolio')}>Portfolio</Link>
          <Link href="/kontakt" onClick={onClose} style={linkStyle('/kontakt')}>Kontakt</Link>
        </nav>

        {/* Bottom CTA */}
        <div style={{ paddingTop: '24px' }}>
          <Link
            href="/anfrage"
            onClick={onClose}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: '#7C3AED',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
            }}
          >
            Projekt starten
          </Link>
        </div>
      </div>
    </>
  )
}
