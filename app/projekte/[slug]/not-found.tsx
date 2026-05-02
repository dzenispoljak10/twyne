import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: 'calc(100vh - 180px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '96px 24px',
          background: 'linear-gradient(180deg, #FAFAFA 0%, #F4F0FF 100%)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#7C3AED',
              marginBottom: '12px',
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-1.5px',
              color: '#111111',
              margin: '0 0 16px',
            }}
          >
            Projekt nicht gefunden
          </h1>
          <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.6, margin: '0 0 32px' }}>
            Das gesuchte Projekt existiert nicht oder wurde verschoben.
          </p>
          <Link
            href="/projekte"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#7C3AED',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> Zurück zu allen Projekten
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
