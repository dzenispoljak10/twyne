'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  firma: z.string().min(2, 'Bitte Firma eingeben'),
  ansprechperson: z.string().min(2, 'Bitte Namen eingeben'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  telefon: z.string().optional(),
  nachricht: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  quelle: 'PRODUKT_DEMO' | 'DIENSTLEISTUNG' | 'KONTAKTFORMULAR'
  produkt?: 'CLUB' | 'TABLE' | 'DESK' | 'FLOW'
  dienstleistung?: 'WEBSEITEN' | 'WEBAPPLIKATIONEN' | 'SOFTWARE' | 'CMS' | 'KI_BERATUNG' | 'DIGITALE_TRANSFORMATION' | 'SEO'
  titel?: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #E8E8ED',
  fontSize: '14px',
  color: '#111111',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '6px',
}

const errorStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#EF4444',
  marginTop: '4px',
}

export default function DemoAnfrageForm({ quelle, produkt, dienstleistung, titel }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError(false)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, quelle, produkt, dienstleistung }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setServerError(true)
      }
    } catch {
      setServerError(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 32px', background: '#F8F9FA', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <CheckCircle size={48} style={{ color: '#7C3AED' }} />
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111111', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          Anfrage erhalten!
        </h3>
        <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto' }}>
          Wir melden uns innerhalb von 24h bei Ihnen. Schauen Sie auch in Ihren Spam-Ordner.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      {titel && (
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111111', marginBottom: '24px', letterSpacing: '-0.5px' }}>
          {titel}
        </h3>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>Firma *</label>
          <input {...register('firma')} style={inputStyle} placeholder="Muster AG" />
          {errors.firma && <p style={errorStyle}>{errors.firma.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Ihr Name *</label>
          <input {...register('ansprechperson')} style={inputStyle} placeholder="Max Muster" />
          {errors.ansprechperson && <p style={errorStyle}>{errors.ansprechperson.message}</p>}
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>E-Mail *</label>
        <input {...register('email')} type="email" style={inputStyle} placeholder="max@muster.ch" />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Telefon</label>
        <input {...register('telefon')} type="tel" style={inputStyle} placeholder="+41 79 123 45 67" />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>Nachricht (optional)</label>
        <textarea
          {...register('nachricht')}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
          placeholder="Was möchten Sie umsetzen?"
        />
      </div>

      {serverError && (
        <p style={{ ...errorStyle, marginBottom: '16px', fontSize: '14px' }}>
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an info@twyne.ch.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          background: isSubmitting ? '#A78BFA' : '#7C3AED',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '15px',
          fontWeight: 600,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'inherit',
        }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Wird gesendet...
          </>
        ) : 'Anfrage senden →'}
      </button>
    </form>
  )
}
