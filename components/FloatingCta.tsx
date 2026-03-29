'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FloatingCta() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <style>{`@media (max-width: 767px) { .floating-cta { display: none !important; } }`}</style>
      <Link
        href="/anfrage"
        className="floating-cta"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          background: '#7C3AED',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '50px',
          fontWeight: 600,
          fontSize: '14px',
          boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
          zIndex: 999,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease',
          pointerEvents: visible ? 'auto' : 'none',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap',
        }}
      >
        Projekt starten ↗
      </Link>
    </>
  )
}
