'use client'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

const werte = [
  {
    titel: 'Präzision',
    text: 'Effizienz ohne Kompromisse. Jede Lösung ist zielgerichtet und auf den Punkt gebaut.',
  },
  {
    titel: 'Partnerschaft',
    text: 'Ich denke langfristig und handle als echter Partner, nicht als reiner Dienstleister.',
  },
  {
    titel: 'Resultate',
    text: 'Messbare Ergebnisse, die zählen. Keine leeren Versprechen, sondern nachweisbare Fakten.',
  },
]

export default function UeberUnsContent() {
  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{ background: '#111111', padding: '120px 0 100px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Das Team hinter Twyne
            </span>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-2px',
            color: '#FFFFFF',
            lineHeight: 1.05,
            marginBottom: '24px',
          }}>
            Persönlich. Präzise. Digital.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Twyne ist eine Schweizer Digitalagentur mit dem Fokus auf das Wesentliche: Lösungen, die wirklich funktionieren.
          </p>
        </div>
      </section>

      {/* ── Gründer ───────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '100px 0' }}>
        <style>{`
          .founder-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: center;
          }
          @media (min-width: 768px) {
            .founder-grid {
              grid-template-columns: 320px 1fr;
              gap: 64px;
            }
          }
          .werte-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 768px) {
            .werte-grid { grid-template-columns: repeat(3, 1fr); }
          }
          .linkedin-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border-radius: 8px;
            border: 1.5px solid #0077B5;
            color: #0077B5;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            background: transparent;
          }
          .linkedin-btn:hover {
            background: #0077B5;
            color: white;
          }
          .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: white;
            color: #7C3AED;
            padding: 14px 32px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          }
        `}</style>
        <div className="founder-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Foto */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '320px', height: '320px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
              <Image
                src="/images/dzenis.jpg"
                alt="Dzenis Poljak — Gründer & Geschäftsführer, Twyne"
                fill
                style={{ objectFit: 'cover' }}
                sizes="320px"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
              Gründer & Geschäftsführer
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111111', lineHeight: 1.1, marginBottom: '24px' }}>
              Dzenis Poljak
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
                Ich bin Dzenis Poljak, Gründer und Geschäftsführer von Twyne. Mit über 10 Jahren Erfahrung in der IT-Branche, von der Softwareentwicklung bis zur strategischen Beratung, begleite ich Unternehmen auf dem Weg zur digitalen Exzellenz.
              </p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
                Meine Überzeugung: Digitale Lösungen müssen nicht kompliziert sein. Sie müssen funktionieren, messbare Resultate liefern und zum Unternehmen passen. Nicht umgekehrt.
              </p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
                Mit Twyne habe ich eine Agentur aufgebaut die genau das liefert: präzise, persönlich und ohne Overhead.
              </p>
            </div>

            <div style={{ marginTop: '32px' }}>
              <a
                href="https://www.linkedin.com/company/twynech/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Werte ─────────────────────────────────────────────── */}
      <section style={{ background: '#F4F4F6', padding: '100px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unsere Werte</span>
              <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111111', lineHeight: 1.1, margin: 0 }}>
              Wofür wir stehen
            </h2>
          </div>
          <div className="werte-grid">
            {werte.map((w) => (
              <div
                key={w.titel}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ width: '40px', height: '4px', background: '#7C3AED', borderRadius: '2px', marginBottom: '24px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111111', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                  {w.titel}
                </h3>
                <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
        padding: '100px 0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>
            Bereit für Ihr digitales Projekt?
          </h2>
          <Link href="/anfrage" className="cta-btn">
            Projekt starten →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
