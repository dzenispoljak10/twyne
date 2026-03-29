import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import KursInteresseForm from '@/components/public/KursInteresseForm'
import { Search, MapPin, Globe, Check, BookOpen, Trophy, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Twyne Academy — SEO & Digital Kurse Schweiz',
  description: 'Online-Kurse für Schweizer Unternehmen. SEO Grundlagen, Lokales SEO, Website erstellen. Bald verfügbar — jetzt vormerken lassen.',
}

const kurse = [
  {
    title: 'SEO Grundlagen für KMU',
    icon: Search,
    iconColor: '#7C3AED',
    gradient: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
    badge: 'Anfänger',
    badgeStyle: { background: '#DCFCE7', color: '#166534' },
    description: 'Lerne wie du deine Website bei Google auf Seite 1 bringst — ohne technisches Vorwissen. Praxisnah, auf die Schweiz zugeschnitten.',
    module: ['Keyword-Recherche', 'On-Page Optimierung', 'Google Business Profile', 'Lokales SEO Schweiz'],
    dauer: 'ca. 4 Stunden',
    format: 'Video + Quiz + Zertifikat',
    preis: 'Ab CHF 149',
  },
  {
    title: 'Lokales SEO Schweiz',
    icon: MapPin,
    iconColor: '#1D4ED8',
    gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
    badge: 'Fortgeschritten',
    badgeStyle: { background: '#FEF9C3', color: '#854D0E' },
    description: 'Werde in deiner Region auf Google gefunden. Für Restaurants, KMU und lokale Dienstleister die mehr Laufkundschaft wollen.',
    module: ['Google Maps Optimierung', 'Bewertungen & Reputation', 'Lokale Backlinks aufbauen', 'Mehrsprachiges SEO CH'],
    dauer: 'ca. 3 Stunden',
    format: 'Video + Quiz + Zertifikat',
    preis: 'Ab CHF 129',
  },
  {
    title: 'Website selbst erstellen',
    icon: Globe,
    iconColor: '#059669',
    gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
    badge: 'Anfänger',
    badgeStyle: { background: '#DCFCE7', color: '#166534' },
    description: 'Erstelle deine eigene professionelle Website — ohne Programmierkenntnisse. Von der Domain bis zum Launch.',
    module: ['Domain & Hosting einrichten', 'Design & Inhalte erstellen', 'SEO von Anfang an richtig', 'Website warten & aktualisieren'],
    dauer: 'ca. 5 Stunden',
    format: 'Video + Quiz + Zertifikat',
    preis: 'Ab CHF 99',
  },
]

const schritte = [
  { icon: Play, title: 'Kurs Online', desc: 'Lerne in deinem Tempo, wann und wo du willst.' },
  { icon: BookOpen, title: 'Wissen testen', desc: 'Multiple Choice Fragen nach jedem Kapitel sichern dein Wissen.' },
  { icon: Trophy, title: 'Zertifikat erhalten', desc: 'Beende den Kurs und erhalte dein offizielles Twyne-Zertifikat.' },
]

export default function KursePage() {
  return (
    <>
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .kurs-grid { animation: gridMove 10s linear infinite; }
        .kurs-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.08); border-color: rgba(124,58,237,0.2) !important; }
        .kurs-btn:hover { background: #6D28D9 !important; transform: translateY(-1px); }
      `}</style>

      <Navbar />
      <main className="pt-16">

        {/* ── HERO ──────────────────────────────────────── */}
        <section style={{ position: 'relative', background: '#111111', padding: '96px 24px 100px', textAlign: 'center', overflow: 'hidden' }}>
          {/* Animated grid */}
          <div
            className="kurs-grid"
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Purple glow */}
          <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-block',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#A78BFA',
              borderRadius: '100px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              ✦ Twyne Academy — Coming Soon
            </div>

            <h1 style={{
              color: 'white',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
              Lerne. Wachse. Zertifiziere dich.
            </h1>

            <p style={{
              color: '#9CA3AF',
              fontSize: '18px',
              maxWidth: '560px',
              margin: '0 auto 48px',
              lineHeight: 1.7,
            }}>
              Die Twyne Academy bringt professionelles Digital-Wissen direkt zu Schweizer Unternehmen.
              Online, flexibel, praxisnah.
            </p>

            <KursInteresseForm id="kurs-form" />
          </div>
        </section>

        {/* ── KURS-KARTEN ───────────────────────────────── */}
        <section style={{ background: 'white', padding: '80px 24px' }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED', marginBottom: '12px' }}>
                Geplante Kurse
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111111', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                Was dich erwartet
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {kurse.map((kurs) => {
                const Icon = kurs.icon
                return (
                  <div
                    key={kurs.title}
                    className="kurs-card"
                    style={{
                      border: '1px solid #EFEFEF',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: 'white',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Gradient top */}
                    <div style={{ background: kurs.gradient, height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        width: '64px', height: '64px', borderRadius: '50%', background: 'white',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={28} style={{ color: kurs.iconColor }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ ...kurs.badgeStyle, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>
                          {kurs.badge}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '10px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                        {kurs.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '0' }}>
                        {kurs.description}
                      </p>

                      {/* Module */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
                        {kurs.module.map((m) => (
                          <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={14} style={{ color: '#7C3AED', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: '#374151' }}>{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* Divider + price row */}
                      <div style={{ borderTop: '1px solid #F4F4F4', marginTop: '16px', paddingTop: '16px' }}>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>
                          {kurs.dauer} · {kurs.format}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: '#111111' }}>{kurs.preis}</span>
                        </div>
                        <a
                          href="#kurs-form"
                          className="kurs-btn"
                          style={{
                            display: 'block', width: '100%', textAlign: 'center', marginTop: '14px',
                            padding: '11px', background: '#7C3AED', color: 'white',
                            border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                            textDecoration: 'none', transition: 'background 0.2s, transform 0.2s',
                            boxSizing: 'border-box',
                          }}
                        >
                          Interesse bekunden
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── WIE ES FUNKTIONIERT ───────────────────────── */}
        <section style={{ background: '#F8F9FA', padding: '60px 24px' }}>
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '48px' }}>
              So funktioniert die Twyne Academy
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {schritte.map((schritt, i) => {
                const Icon = schritt.icon
                return (
                  <div key={schritt.title} style={{ textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <Icon size={24} style={{ color: '#7C3AED' }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      Schritt {i + 1}
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>
                      {schritt.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
                      {schritt.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────── */}
        <section style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px', lineHeight: 1.1 }}>
              Sei dabei wenn wir launchen
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '40px', lineHeight: 1.6 }}>
              Trage dich jetzt ein und erhalte als Erste/r Zugang zur Twyne Academy.
            </p>
            <KursInteresseForm id="kurs-form-bottom" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
