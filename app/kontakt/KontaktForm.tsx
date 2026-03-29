'use client'
import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  background: 'white',
  color: '#111111',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: '#374151',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

export default function KontaktForm() {
  const [form, setForm] = useState({ name: '', email: '', nachricht: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/kontakt-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
    } catch {
      setError('Fehler beim Senden. Bitte schreiben Sie uns direkt an info@twyne.ch.')
    } finally {
      setSending(false)
    }
  }

  if (success) {
    return (
      <div style={{ padding: '24px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0', textAlign: 'center' }}>
        <p style={{ fontSize: '15px', fontWeight: 700, color: '#065F46', marginBottom: '4px' }}>Nachricht erhalten</p>
        <p style={{ fontSize: '13px', color: '#059669', margin: 0 }}>Wir melden uns bald bei Ihnen.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <label style={labelStyle}>Name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          type="text"
          autoComplete="name"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
        />
      </div>
      <div>
        <label style={labelStyle}>E-Mail *</label>
        <input
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          autoComplete="email"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
        />
      </div>
      <div>
        <label style={labelStyle}>Nachricht *</label>
        <textarea
          required
          value={form.nachricht}
          onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' } as React.CSSProperties}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
        />
      </div>
      {error && (
        <p style={{ fontSize: '12px', color: '#DC2626', margin: 0 }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        style={{
          background: sending ? '#A78BFA' : '#7C3AED',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 700,
          border: 'none',
          cursor: sending ? 'not-allowed' : 'pointer',
          width: '100%',
          fontFamily: 'inherit',
        }}
      >
        {sending ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
    </form>
  )
}
