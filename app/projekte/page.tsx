import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { projects } from '@/lib/projects-data'
import ProjekteListClient from './ProjekteListClient'

export const metadata: Metadata = {
  title: 'Projekte – Twyne | Webdesign & Software-Entwicklung Schweiz',
  description:
    'Unsere Cases: Websites, E-Commerce und Webapps für Schweizer KMU. Von Bikeshop bis B2B-Plattform.',
  alternates: { canonical: 'https://twyne.ch/projekte' },
  openGraph: {
    title: 'Projekte – Twyne',
    description:
      'Unsere Cases: Websites, E-Commerce und Webapps für Schweizer KMU. Von Bikeshop bis B2B-Plattform.',
    url: 'https://twyne.ch/projekte',
    images: [{ url: '/twyne-icon.png', width: 512, height: 512, alt: 'Twyne' }],
  },
}

export default function ProjektePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(180deg, #FAFAFA 0%, #EEF2FA 100%)',
            padding: '96px 0 64px',
            borderBottom: '1px solid #E0E7F5',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: '#13328D' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#13328D',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Projekte
              </span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 800,
                letterSpacing: '-2.5px',
                lineHeight: 1.05,
                color: '#111111',
                margin: '0 0 20px',
                maxWidth: '760px',
              }}
            >
              Unsere Projekte
            </h1>
            <p
              style={{
                fontSize: '19px',
                color: '#0E2570',
                lineHeight: 1.6,
                maxWidth: '640px',
                margin: 0,
              }}
            >
              Echte Cases und Konzepte aus unserer Werkstatt — Websites, E-Commerce und Webapps für
              Schweizer Unternehmen.
            </p>
          </div>
        </section>

        {/* Listing */}
        <section style={{ background: 'white', padding: '64px 0 96px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ProjekteListClient projects={projects} />
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: '#111111',
            padding: '96px 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(19, 50, 141,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#4F6FBF',
                  marginBottom: '16px',
                }}
              >
                Nächster Schritt
              </p>
              <h2
                style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  margin: '0 0 20px',
                }}
              >
                Bereit für dein Projekt?
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  margin: '0 auto 36px',
                }}
              >
                Erzähl uns davon — wir antworten in der Regel innerhalb von 24h.
              </p>
              <Link
                href="/anfrage"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#13328D',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                Anfrage starten <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
