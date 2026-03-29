'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Globe, AppWindow, Code2, FileCode2, Brain, Zap, Search } from 'lucide-react'

const services = [
  { id: '01', icon: Globe, title: 'Webseiten & Webdesign', description: 'Moderne, schnelle Websites die bei Google gefunden werden. Mobile-first, SEO-optimiert, mit CMS.', href: '/leistungen/webseiten' },
  { id: '02', icon: AppWindow, title: 'Webapplikationen', description: 'Massgeschneiderte Web-Plattformen und SaaS-Lösungen. React, Next.js, skalierbar.', href: '/leistungen/webapplikationen' },
  { id: '03', icon: Code2, title: 'Softwareentwicklung', description: 'Individuelle Software für Windows & Mac. Exakt auf Ihre Prozesse zugeschnitten.', href: '/leistungen/software' },
  { id: '04', icon: FileCode2, title: 'CMS-Lösungen', description: 'Inhalte selbst pflegen ohne technische Kenntnisse. WordPress, Headless CMS, massgeschneidert.', href: '/leistungen/cms' },
  { id: '05', icon: Brain, title: 'KI-Beratung', description: 'KI pragmatisch einsetzen. ChatGPT, Claude, Automatisierung — DSGVO-konform.', href: '/leistungen/ki-beratung' },
  { id: '06', icon: Zap, title: 'Digitale Transformation', description: 'Von der Strategie bis zur Umsetzung. Schrittweise, messbar, ohne Disruption.', href: '/leistungen/digitale-transformation' },
  { id: '07', icon: Search, title: 'SEO & Sichtbarkeit', description: 'Google Seite 1 für Ihr Business. Technisches SEO, Content, lokale Optimierung.', href: '/leistungen/seo' },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <Link
      href={service.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: '#FFFFFF',
        border: hovered ? '1px solid rgba(124,58,237,0.2)' : '1px solid #EFEFEF',
        borderRadius: '16px',
        padding: '32px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(124,58,237,0.1)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        position: 'relative',
        textDecoration: 'none',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#E8E8ED', marginBottom: '20px' }}>
        {service.id}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Icon size={28} style={{ color: '#7C3AED' }} />
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '10px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
        {service.description}
      </p>
      <div style={{ position: 'absolute', bottom: '28px', right: '28px', fontSize: '18px', color: '#7C3AED', opacity: hovered ? 1 : 0, transform: hovered ? 'translate(0, 0)' : 'translate(-4px, 4px)', transition: 'all 0.3s ease' }}>
        →
      </div>
    </Link>
  )
}

export default function Services() {
  return (
    <section style={{ background: '#F8F9FA', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="animate-on-scroll" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Alle Leistungen
          </span>
        </div>
        <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-2px', color: '#111111', marginBottom: '16px', maxWidth: '600px', lineHeight: 1.1 }}>
          Was wir für Sie leisten
        </h2>
        <p className="animate-on-scroll" style={{ fontSize: '16px', color: '#6B7280', marginBottom: '48px', maxWidth: '560px', lineHeight: 1.7 }}>
          Sieben Kernkompetenzen — alles aus einer Hand. Von der einfachen Website bis zur komplexen KI-Integration.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 animate-on-scroll">
          {services.slice(0, 4).map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-on-scroll">
          {services.slice(4).map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>
    </section>
  )
}
