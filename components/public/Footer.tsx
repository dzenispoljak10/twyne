'use client'
import Link from 'next/link'

function Logo() {
  return (
    <svg width="120" height="28" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg" aria-label="twyne">
      <circle cx="12" cy="16" r="9" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
      <circle cx="32" cy="16" r="9" fill="none" stroke="#A78BFA" strokeWidth="2.5" />
      <line x1="21" y1="16" x2="23" y2="16" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="3" fill="#7C3AED" />
      <circle cx="32" cy="16" r="3" fill="#A78BFA" />
      <text x="50" y="22" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '22px', fill: '#FFFFFF', letterSpacing: '-1px' }}>
        twyne
      </text>
    </svg>
  )
}

const h4Style: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '16px',
  marginTop: 0,
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'white' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px' }}>

          {/* Spalte 1 — Logo + Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Logo />
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 12px' }}>
              Digitalagentur für Schweizer Unternehmen. Webseiten, Apps, Software, KI & SEO.
            </p>
            <a
              href="mailto:info@twyne.ch"
              style={{ fontSize: '13px', color: '#A78BFA', textDecoration: 'none', transition: 'color 0.2s', display: 'block', marginBottom: '8px' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#A78BFA' }}
            >
              info@twyne.ch
            </a>
            <a
              href="https://www.instagram.com/twyne.ch"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @twyne.ch
            </a>
          </div>

          {/* Spalte 2 — Leistungen */}
          <div>
            <h4 style={h4Style}>Leistungen</h4>
            <FooterLink href="/leistungen/webseiten">Webseiten & Design</FooterLink>
            <FooterLink href="/leistungen/webapplikationen">Webapplikationen</FooterLink>
            <FooterLink href="/leistungen/software">Softwareentwicklung</FooterLink>
            <FooterLink href="/leistungen/cms">CMS-Lösungen</FooterLink>
            <FooterLink href="/leistungen/ki-beratung">KI-Beratung</FooterLink>
            <FooterLink href="/leistungen/seo">SEO</FooterLink>
            <FooterLink href="/leistungen/email-marketing">E-Mail Marketing</FooterLink>
            <FooterLink href="/leistungen/google-ads">Google Ads</FooterLink>
            <FooterLink href="/leistungen/social-media">Social Media</FooterLink>
          </div>

          {/* Spalte 3 — Produkte */}
          <div>
            <h4 style={h4Style}>Produkte</h4>
            <FooterLink href="/produkte/club">Twyne Club</FooterLink>
            <FooterLink href="/produkte/table">Twyne Table</FooterLink>
            <FooterLink href="/produkte/desk">Twyne Desk</FooterLink>
            <FooterLink href="/produkte/flow">Twyne Flow</FooterLink>
            <FooterLink href="/kurse">Twyne Academy</FooterLink>
          </div>

          {/* Spalte 4 — Unternehmen */}
          <div>
            <h4 style={h4Style}>Unternehmen</h4>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/kurse">Kurse</FooterLink>
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href="/anfrage">Anfrage stellen</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2025 Twyne
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[{ href: '/impressum', label: 'Impressum' }, { href: '/datenschutz', label: 'Datenschutz' }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'white' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
