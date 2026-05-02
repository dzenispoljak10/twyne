'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'twyne_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const choice = localStorage.getItem(STORAGE_KEY)
      if (!choice) {
        const t = setTimeout(() => setVisible(true), 600)
        return () => clearTimeout(t)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function decide(value: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(STORAGE_KEY, value)
      localStorage.setItem(`${STORAGE_KEY}_at`, new Date().toISOString())
    } catch {}
    setVisible(false)
  }

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes twyne-cookie-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .twyne-cookie-card {
          animation: twyne-cookie-in 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .twyne-cookie-btn-accept:hover {
          background: #0E2570 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(19, 50, 141,0.35) !important;
        }
        .twyne-cookie-btn-reject:hover {
          background: #F4F4F6 !important;
          color: #111111 !important;
        }
        .twyne-cookie-link:hover {
          color: #0E2570 !important;
          text-decoration: underline;
        }
        .twyne-cookie-close:hover {
          background: #F4F4F6 !important;
          color: #111111 !important;
        }
        @media (max-width: 640px) {
          .twyne-cookie-wrap {
            left: 12px !important;
            right: 12px !important;
            bottom: 12px !important;
            max-width: none !important;
          }
          .twyne-cookie-card {
            padding: 18px !important;
          }
          .twyne-cookie-actions {
            flex-direction: column-reverse !important;
            gap: 8px !important;
          }
          .twyne-cookie-actions > * {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="twyne-cookie-wrap"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          right: 'auto',
          maxWidth: '460px',
          zIndex: 1100,
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie-Einstellungen"
        aria-hidden={!visible}
      >
        <div
          className="twyne-cookie-card"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8E8ED',
            borderRadius: '16px',
            padding: '22px 22px 20px',
            boxShadow: '0 20px 50px rgba(17, 17, 17, 0.12), 0 4px 12px rgba(17, 17, 17, 0.05)',
            position: 'relative',
          }}
        >
          <button
            onClick={() => decide('rejected')}
            className="twyne-cookie-close"
            aria-label="Banner schliessen"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#9CA3AF',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #13328D 0%, #4F6FBF 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(19, 50, 141,0.3)',
              }}
            >
              <Cookie size={17} strokeWidth={2.2} />
            </div>
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
                letterSpacing: '-0.2px',
              }}
            >
              Cookies & Datenschutz
            </h2>
          </div>

          <p
            style={{
              fontSize: '13.5px',
              color: '#4B5563',
              lineHeight: 1.6,
              margin: '0 0 16px',
            }}
          >
            Wir verwenden Cookies, um die Website-Funktionalität sicherzustellen und unser Angebot zu verbessern. Details findest du in unserer{' '}
            <Link
              href="/datenschutz"
              className="twyne-cookie-link"
              style={{
                color: '#13328D',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              Datenschutzerklärung
            </Link>
            .
          </p>

          <div
            className="twyne-cookie-actions"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={() => decide('rejected')}
              className="twyne-cookie-btn-reject"
              style={{
                background: 'transparent',
                color: '#6B7280',
                border: '1px solid #E8E8ED',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              Ablehnen
            </button>
            <button
              onClick={() => decide('accepted')}
              className="twyne-cookie-btn-accept"
              style={{
                background: '#13328D',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                boxShadow: '0 4px 14px rgba(19, 50, 141,0.25)',
              }}
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
