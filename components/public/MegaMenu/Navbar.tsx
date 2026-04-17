'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu } from 'lucide-react'
import MegaMenuLeistungen from './MegaMenuLeistungen'
import MegaMenuProdukte from './MegaMenuProdukte'
import MobileMenu from './MobileMenu'

function Logo() {
  return (
    <svg width="130" height="30" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg" aria-label="twyne">
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

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [leistungenOpen, setLeistungenOpen] = useState(false)
  const [produkteOpen, setProdukteOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const leistungenOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leistungenCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const produkteOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const produkteCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLeistungenOpen(false)
        setProdukteOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ── Leistungen handlers ───────────────────────────────────────
  const handleLeistungenEnter = () => {
    if (leistungenCloseTimer.current) clearTimeout(leistungenCloseTimer.current)
    if (produkteOpenTimer.current) clearTimeout(produkteOpenTimer.current)
    if (produkteCloseTimer.current) clearTimeout(produkteCloseTimer.current)
    setProdukteOpen(false)
    leistungenOpenTimer.current = setTimeout(() => setLeistungenOpen(true), 150)
  }
  const handleLeistungenMenuEnter = () => {
    if (leistungenCloseTimer.current) clearTimeout(leistungenCloseTimer.current)
  }
  const handleLeistungenLeave = () => {
    if (leistungenOpenTimer.current) clearTimeout(leistungenOpenTimer.current)
    if (leistungenCloseTimer.current) clearTimeout(leistungenCloseTimer.current)
    leistungenCloseTimer.current = setTimeout(() => setLeistungenOpen(false), 300)
  }

  // ── Produkte handlers ─────────────────────────────────────────
  const handleProdukteEnter = () => {
    if (produkteCloseTimer.current) clearTimeout(produkteCloseTimer.current)
    if (leistungenOpenTimer.current) clearTimeout(leistungenOpenTimer.current)
    if (leistungenCloseTimer.current) clearTimeout(leistungenCloseTimer.current)
    setLeistungenOpen(false)
    produkteOpenTimer.current = setTimeout(() => setProdukteOpen(true), 150)
  }
  const handleProdukteMenuEnter = () => {
    if (produkteCloseTimer.current) clearTimeout(produkteCloseTimer.current)
  }
  const handleProdukteLeave = () => {
    if (produkteOpenTimer.current) clearTimeout(produkteOpenTimer.current)
    if (produkteCloseTimer.current) clearTimeout(produkteCloseTimer.current)
    produkteCloseTimer.current = setTimeout(() => setProdukteOpen(false), 300)
  }

  // ── Area leave (header boundary) ─────────────────────────────
  // Fires when mouse exits the sticky header. Both menus may still be
  // hovered (position:fixed panels below), so their onMouseEnter handlers
  // will cancel these timers before they fire.
  const handleAreaLeave = () => {
    if (leistungenOpenTimer.current) clearTimeout(leistungenOpenTimer.current)
    if (produkteOpenTimer.current) clearTimeout(produkteOpenTimer.current)
    // Clear before setting — prevents orphaned timers when button-leave
    // and header-leave both fire in quick succession
    if (leistungenCloseTimer.current) clearTimeout(leistungenCloseTimer.current)
    if (produkteCloseTimer.current) clearTimeout(produkteCloseTimer.current)
    leistungenCloseTimer.current = setTimeout(() => setLeistungenOpen(false), 300)
    produkteCloseTimer.current = setTimeout(() => setProdukteOpen(false), 300)
  }

  const isLeistungenActive = pathname.startsWith('/leistungen')
  const isProdukteActive = pathname.startsWith('/produkte')

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '68px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #F0F0F0',
          boxShadow: scrolled
            ? '0 4px 20px rgba(0,0,0,0.06)'
            : '0 1px 0 rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseLeave={handleAreaLeave}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <style>{`@media (max-width: 767px) { .nav-inner { padding: 0 16px !important; } }`}</style>
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center" style={{ gap: '2px' }}>

            {/* Leistungen trigger */}
            <button
              onMouseEnter={handleLeistungenEnter}
              onMouseLeave={handleLeistungenLeave}
              onClick={() => setLeistungenOpen(!leistungenOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: isLeistungenActive ? 600 : 500,
                color: isLeistungenActive ? '#7C3AED' : leistungenOpen ? '#111111' : '#374151',
                padding: '8px 16px',
                borderRadius: '8px',
                background: leistungenOpen ? '#F8F9FA' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Leistungen
              <ChevronDown
                size={14}
                style={{
                  transform: leistungenOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: isLeistungenActive ? '#7C3AED' : '#9CA3AF',
                }}
              />
            </button>

            {/* Produkte trigger */}
            <button
              onMouseEnter={handleProdukteEnter}
              onMouseLeave={handleProdukteLeave}
              onClick={() => setProdukteOpen(!produkteOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: isProdukteActive ? 600 : 500,
                color: isProdukteActive ? '#7C3AED' : produkteOpen ? '#111111' : '#374151',
                padding: '8px 16px',
                borderRadius: '8px',
                background: produkteOpen ? '#F8F9FA' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Produkte
              <ChevronDown
                size={14}
                style={{
                  transform: produkteOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: isProdukteActive ? '#7C3AED' : '#9CA3AF',
                }}
              />
            </button>

            {/* Other nav links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#7C3AED' : '#374151',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#111111'
                      e.currentTarget.style.background = '#F8F9FA'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? '#7C3AED' : '#374151'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right — CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/anfrage"
              className="hidden md:inline-flex items-center"
              style={{
                background: '#7C3AED',
                color: 'white',
                padding: '9px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6D28D9'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(124,58,237,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#7C3AED'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Projekt starten
            </Link>

            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen(true)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#111111',
                alignItems: 'center',
              }}
              aria-label="Menu öffnen"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Leistungen Mega Menu — position: fixed, top: 68px, no gap */}
      <MegaMenuLeistungen
        isOpen={leistungenOpen}
        onMouseEnter={handleLeistungenMenuEnter}
        onMouseLeave={handleLeistungenLeave}
        pathname={pathname}
      />

      {/* Produkte Mega Menu — position: fixed, top: 68px, no gap */}
      <MegaMenuProdukte
        isOpen={produkteOpen}
        onMouseEnter={handleProdukteMenuEnter}
        onMouseLeave={handleProdukteLeave}
        pathname={pathname}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
