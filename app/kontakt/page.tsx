import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Mail, Clock, MapPin, ArrowRight } from 'lucide-react'
import { FIRMA } from '@/lib/firma-config'
import KontaktForm from './KontaktForm'

export const metadata: Metadata = {
  title: 'Kontakt — Twyne Digitalagentur',
  description: 'So erreichen Sie Twyne. Adresse, E-Mail und Erreichbarkeit der Digitalagentur für Schweizer KMU.',
  alternates: {
    canonical: 'https://twyne.ch/kontakt',
  },
}

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section style={{ background: '#111111', padding: '80px 0 72px' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: '16px' }}>
              Kontakt
            </p>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: '#FFFFFF', marginBottom: '16px' }}>
              So erreichen<br />
              <span style={{ color: '#7C3AED' }}>Sie uns</span>
            </h1>
            <p style={{ fontSize: '18px', color: '#9CA3AF', maxWidth: '480px', lineHeight: 1.7 }}>
              Wir sind eine Digitalagentur mit Sitz in Rothrist — und arbeiten für Unternehmen in der ganzen Schweiz.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '64px' }}>
              {/* Adresse */}
              <div style={{ background: '#F8F9FA', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <MapPin size={22} style={{ color: '#7C3AED' }} />
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>Adresse</h2>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                  {FIRMA.name}<br />
                  {FIRMA.strasse}<br />
                  {FIRMA.plz} {FIRMA.ort}<br />
                  {FIRMA.land}
                </p>
              </div>

              {/* E-Mail */}
              <div style={{ background: '#F8F9FA', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Mail size={22} style={{ color: '#7C3AED' }} />
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>E-Mail</h2>
                <a
                  href={`mailto:${FIRMA.email}`}
                  style={{ fontSize: '15px', color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}
                >
                  {FIRMA.email}
                </a>
                <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '8px', marginBottom: 0 }}>
                  Antwort in der Regel innerhalb von 24h.
                </p>
              </div>

              {/* Erreichbarkeit */}
              <div style={{ background: '#F8F9FA', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Clock size={22} style={{ color: '#7C3AED' }} />
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>Erreichbarkeit</h2>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                  Montag – Freitag<br />
                  08:00 – 18:00 Uhr<br />
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Schweizer Zeit (CET/CEST)</span>
                </p>
              </div>

              {/* Instagram */}
              <div style={{ background: '#F8F9FA', borderRadius: '20px', padding: '36px', border: '1px solid #EFEFEF' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#7C3AED" stroke="none"/></svg>
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>Instagram</h2>
                <a
                  href="https://www.instagram.com/twyne.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '15px', color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}
                >
                  @twyne.ch
                </a>
                <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '8px', marginBottom: 0 }}>
                  News, Projekte & Einblicke.
                </p>
              </div>
            </div>

            {/* Contact form + CTA banner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: Simple contact form */}
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                  Schreiben Sie uns
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, marginBottom: '24px' }}>
                  Für allgemeine Anfragen und Fragen — für Projektanfragen nutzen Sie bitte unser{' '}
                  <Link href="/anfrage" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>
                    Anfrageformular
                  </Link>.
                </p>
                <KontaktForm />
              </div>

              {/* Right: CTA banner */}
              <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', borderRadius: '24px', padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '250px', background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                  Projekt starten
                </p>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-1px', color: 'white', marginBottom: '12px', lineHeight: 1.15 }}>
                  Bereit für Ihr nächstes Projekt?
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '28px', lineHeight: 1.7 }}>
                  Kostenlose Erstberatung — unverbindlich, Antwort innerhalb von 24h.
                </p>
                <Link
                  href="/anfrage"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#7C3AED', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}
                >
                  Jetzt anfragen
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
