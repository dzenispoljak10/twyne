'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
        Etwas ist schiefgelaufen
      </h2>
      <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
        {error.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
      </p>
      <button
        onClick={unstable_retry}
        style={{ padding: '8px 20px', borderRadius: '8px', background: '#7C3AED', color: 'white', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
      >
        Erneut versuchen
      </button>
    </div>
  )
}
