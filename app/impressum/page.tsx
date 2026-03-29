import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { FIRMA } from '@/lib/firma-config'

export const metadata: Metadata = {
  title: 'Impressum | Twyne',
  description: 'Impressum der Twyne Digitalagentur Schweiz.',
}

const h2Style: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#111111',
  marginTop: '40px',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid #F0F0F0',
}

const textStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#374151',
  lineHeight: 1.8,
  margin: 0,
}

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 40px 120px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#111111', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            Impressum
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '48px' }}>
            Angaben gemäss § 5 TMG / Art. 12 UWG
          </p>

          <h2 style={h2Style}>Unternehmensangaben</h2>
          <p style={textStyle}>
            <strong style={{ fontWeight: 600, color: '#111111' }}>{FIRMA.name}</strong><br />
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{FIRMA.zusatz}</span><br />
            {FIRMA.strasse}<br />
            {FIRMA.plz} {FIRMA.ort}<br />
            {FIRMA.land}
          </p>

          <h2 style={h2Style}>Handelsregister & UID</h2>
          <p style={textStyle}>
            Handelsregisteramt des Kantons Aargau<br />
            <strong style={{ fontWeight: 600, color: '#111111' }}>HR-Nr.:</strong> {FIRMA.hr}<br />
            <strong style={{ fontWeight: 600, color: '#111111' }}>UID/MWST:</strong> {FIRMA.uid}
          </p>

          <h2 style={h2Style}>Kontakt</h2>
          <p style={textStyle}>
            <strong style={{ fontWeight: 600, color: '#111111' }}>E-Mail:</strong>{' '}
            <a href={`mailto:${FIRMA.email}`} style={{ color: '#7C3AED', textDecoration: 'none' }}>{FIRMA.email}</a><br />
            <strong style={{ fontWeight: 600, color: '#111111' }}>Website:</strong>{' '}
            <a href={`https://${FIRMA.web}`} style={{ color: '#7C3AED', textDecoration: 'none' }}>{FIRMA.web}</a>
          </p>

          <h2 style={h2Style}>Haftungsausschluss</h2>

          <p style={{ ...textStyle, fontWeight: 600, color: '#111111', marginBottom: '8px' }}>Haftung für Inhalte</p>
          <p style={textStyle}>
            Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
            und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>

          <p style={{ ...textStyle, fontWeight: 600, color: '#111111', marginTop: '20px', marginBottom: '8px' }}>Haftung für Links</p>
          <p style={textStyle}>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
          </p>

          <h2 style={h2Style}>Urheberrecht</h2>
          <p style={textStyle}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Schweizer
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb
            der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
