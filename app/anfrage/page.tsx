import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import AnfrageForm from './AnfrageForm'

export const metadata: Metadata = {
  title: 'Projekt anfragen — Kostenlose Erstberatung',
  description: 'Starten Sie Ihr Projekt mit Twyne. Kostenlose Erstberatung für Schweizer KMU — Antwort innerhalb von 24 Stunden. Webseiten, SEO, Apps und KI-Beratung.',
  alternates: {
    canonical: 'https://twyne.ch/anfrage',
  },
}

export default function AnfragePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section style={{ background: '#111111', padding: '72px 0 64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: '16px' }}>
              Projekt anfragen
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '16px' }}>
              Erzählen Sie uns<br />
              <span style={{ color: '#7C3AED' }}>von Ihrer Idee</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#9CA3AF', lineHeight: 1.7, marginBottom: '24px' }}>
              Wir antworten innerhalb von 24 Stunden mit einem ersten Feedback — kostenlos und unverbindlich.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {['24h Antwortzeit', 'Kostenlos & unverbindlich', 'Schweizer Qualität'].map((badge) => (
                <span
                  key={badge}
                  style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#A78BFA', borderRadius: '100px', padding: '5px 14px', fontSize: '12px', fontWeight: 500 }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Form section */}
        <section style={{ background: '#F4F4F6', padding: '64px 24px 80px' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <AnfrageForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
