'use client'
import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function KursInteresseForm({ id = 'kurs-form' }: { id?: string }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/kurs-interesse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Fehler')
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div id={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={22} style={{ color: '#10B981', flexShrink: 0 }} />
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#A78BFA' }}>
            Perfekt — wir melden uns beim Launch!
          </span>
        </div>
      </div>
    )
  }

  return (
    <div id={id}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ihre E-Mail-Adresse"
          required
          style={{
            width: '320px',
            padding: '14px 20px',
            background: 'rgba(255,255,255,0.08)',
            border: `1px solid ${focused ? '#7C3AED' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '10px',
            color: 'white',
            fontSize: '15px',
            outline: 'none',
            boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.2)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px 24px',
            background: loading ? '#6D28D9' : '#7C3AED',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = '#6D28D9'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = loading ? '#6D28D9' : '#7C3AED'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Vormerken lassen
        </button>
      </form>
      {error && (
        <p style={{ fontSize: '13px', color: '#FCA5A5', marginTop: '10px', textAlign: 'center' }}>{error}</p>
      )}
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '12px', textAlign: 'center' }}>
        Kein Spam. Nur eine E-Mail wenn die Kurse live gehen.
      </p>
    </div>
  )
}
