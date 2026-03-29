'use client'
import Link from 'next/link'
import { Users, UtensilsCrossed, LayoutDashboard, Ticket, Package } from 'lucide-react'

interface Props {
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  pathname: string
}

const webApps = [
  {
    href: '/produkte/club',
    Icon: Users,
    name: 'Twyne Club',
    typ: 'Webapplikation',
    desc: 'Für Vereine & Verbände',
    iconBg: '#EDE9FE',
    iconColor: '#7C3AED',
  },
  {
    href: '/produkte/table',
    Icon: UtensilsCrossed,
    name: 'Twyne Table',
    typ: 'Webapplikation',
    desc: 'Für Restaurants & Cafés',
    iconBg: '#FEF9C3',
    iconColor: '#D97706',
  },
]

const desktopApps = [
  {
    href: '/produkte/desk',
    Icon: LayoutDashboard,
    name: 'Twyne Desk',
    typ: 'Windows & Mac',
    desc: 'Für KMU & Selbstständige',
    iconBg: '#DBEAFE',
    iconColor: '#1D4ED8',
  },
  {
    href: '/produkte/flow',
    Icon: Ticket,
    name: 'Twyne Flow',
    typ: 'Windows & Mac',
    desc: 'Für Events & Veranstaltungen',
    iconBg: '#D1FAE5',
    iconColor: '#059669',
  },
]

function ProduktLink({ href, Icon, name, typ, desc, iconBg, iconColor, isActive }: {
  href: string
  Icon: React.ElementType
  name: string
  typ: string
  desc: string
  iconBg: string
  iconColor: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid transparent',
        textDecoration: 'none',
        background: isActive ? 'rgba(124,58,237,0.04)' : 'transparent',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#F8F9FA'
        e.currentTarget.style.borderColor = '#EFEFEF'
        e.currentTarget.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isActive ? 'rgba(124,58,237,0.04)' : 'transparent'
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} style={{ color: iconColor }} />
      </div>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: isActive ? '#7C3AED' : '#111111', marginBottom: '2px' }}>
          {name}
        </div>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {typ}
        </div>
        <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.4 }}>
          {desc}
        </div>
      </div>
    </Link>
  )
}

export default function MegaMenuProdukte({ isOpen, onMouseEnter, onMouseLeave, pathname }: Props) {
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
            background: 'linear-gradient(135deg, #111111, #1F2937)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <Package size={48} style={{ color: 'white' }} />
            </div>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.5px' }}>
              Twyne Produkte
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.6, flex: 1 }}>
              Fertige Webapplikationen & Software — sofort einsatzbereit, Swiss-Made.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.3)', color: '#A78BFA', borderRadius: '100px', padding: '4px 12px', fontSize: '11px', fontWeight: 600, width: 'fit-content' }}>
                Webapplikationen
              </span>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: '100px', padding: '4px 12px', fontSize: '11px', fontWeight: 600, width: 'fit-content' }}>
                Desktop Software
              </span>
            </div>
            <Link
              href="/produkte"
              style={{
                display: 'block',
                color: 'white',
                fontWeight: 600,
                fontSize: '13px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
              }}
            >
              Alle Produkte ansehen →
            </Link>
          </div>

          {/* Right column — 2×2 grid with category labels */}
          <div>
            {/* Webapplikationen category */}
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 0 4px 16px',
              borderBottom: '1px solid #F4F4F4',
              marginBottom: '4px',
            }}>
              Webapplikationen
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '16px' }}>
              {webApps.map((p) => (
                <ProduktLink key={p.href} {...p} isActive={pathname.startsWith(p.href)} />
              ))}
            </div>

            {/* Desktop Software category */}
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 0 4px 16px',
              borderBottom: '1px solid #F4F4F4',
              marginBottom: '4px',
            }}>
              Desktop Software
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {desktopApps.map((p) => (
                <ProduktLink key={p.href} {...p} isActive={pathname.startsWith(p.href)} />
              ))}
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
            ✦ Demo anfragen — kostenlos & innerhalb 24h Rückmeldung
          </span>
          <Link
            href="/anfrage"
            style={{ fontSize: '13px', fontWeight: 600, color: '#7C3AED', textDecoration: 'none' }}
          >
            Demo anfragen →
          </Link>
        </div>
      </div>
    </div>
  )
}
