import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Twyne',
  description: 'Datenschutzerklärung von Twyne gemäss Schweizer Datenschutzgesetz (DSG).',
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

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 40px 120px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#111111', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            Datenschutzerklärung
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '48px' }}>
            Gemäss Schweizer Datenschutzgesetz (nDSG)
          </p>

          <h2 style={h2Style}>1. Verantwortliche Stelle</h2>
          <p style={textStyle}>
            Twyne<br />
            c/o Visiosign Poljak<br />
            Galliweg 3<br />
            4852 Rothrist<br />
            Schweiz<br />
            <a href="mailto:info@twyne.ch" style={{ color: '#7C3AED', textDecoration: 'none' }}>info@twyne.ch</a>
          </p>

          <h2 style={h2Style}>2. Grundsätze der Datenverarbeitung</h2>
          <p style={textStyle}>
            Wir verarbeiten Ihre personenbezogenen Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen
            Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt nur mit Ihrer
            Einwilligung oder soweit gesetzlich erlaubt.
          </p>

          <h2 style={h2Style}>3. Kontaktformular</h2>
          <p style={textStyle}>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
            inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
            von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>

          <h2 style={h2Style}>4. Daten die wir erheben</h2>
          <ul style={{ ...textStyle, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>Name und Kontaktdaten (bei Anfragen)</li>
            <li style={{ marginBottom: '6px' }}>E-Mail-Adresse (bei Newsletter/Kursanmeldung)</li>
            <li style={{ marginBottom: '6px' }}>IP-Adresse (technisch notwendig)</li>
            <li>Nutzungsdaten (Seitenaufrufe, anonymisiert)</li>
          </ul>

          <h2 style={h2Style}>5. Cookies</h2>
          <p style={textStyle}>
            Unsere Website verwendet nur technisch notwendige Cookies. Wir setzen keine Tracking- oder
            Marketing-Cookies ein.
          </p>

          <h2 style={h2Style}>6. Hosting</h2>
          <p style={textStyle}>
            Diese Website wird auf Servern von Vercel Inc. (USA) gehostet. Vercel ist nach dem EU-US Data
            Privacy Framework zertifiziert. Die Datenbank wird bei Neon Inc. in der EU (Frankfurt) betrieben.
          </p>

          <h2 style={h2Style}>7. Ihre Rechte</h2>
          <p style={textStyle}>
            Sie haben jederzeit das Recht auf:
          </p>
          <ul style={{ ...textStyle, paddingLeft: '20px', marginTop: '8px' }}>
            <li style={{ marginBottom: '6px' }}>Auskunft über Ihre gespeicherten Daten</li>
            <li style={{ marginBottom: '6px' }}>Berichtigung unrichtiger Daten</li>
            <li style={{ marginBottom: '6px' }}>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
          </ul>
          <p style={{ ...textStyle, marginTop: '12px' }}>
            Für Anfragen wenden Sie sich an:{' '}
            <a href="mailto:info@twyne.ch" style={{ color: '#7C3AED', textDecoration: 'none' }}>info@twyne.ch</a>
          </p>

          <h2 style={h2Style}>8. Änderungen</h2>
          <p style={textStyle}>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist stets
            auf dieser Seite verfügbar.
          </p>
          <p style={{ ...textStyle, marginTop: '16px', color: '#9CA3AF', fontSize: '13px' }}>
            Stand: Januar 2025
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
