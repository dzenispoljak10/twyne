'use client'
import { useState } from 'react'
import Link from 'next/link'

// ─── Data ──────────────────────────────────────────────────────────────────────

const interesseOptionen = [
  {
    gruppe: 'Webprojekte',
    optionen: [
      { value: 'Webseiten', label: 'Webseite & Design' },
      { value: 'Webapplikationen', label: 'Webapplikation' },
      { value: 'CMS', label: 'CMS-Lösung' },
    ],
  },
  {
    gruppe: 'Technologie',
    optionen: [
      { value: 'Software', label: 'Softwareentwicklung' },
      { value: 'KI-Beratung', label: 'KI-Beratung & Automatisierung' },
      { value: 'Digitale Transformation', label: 'Digitale Transformation' },
    ],
  },
  {
    gruppe: 'Marketing & SEO',
    optionen: [
      { value: 'SEO', label: 'SEO & Sichtbarkeit' },
      { value: 'Lokales SEO', label: 'Lokales SEO' },
      { value: 'SEO Audit', label: 'SEO Audit' },
      { value: 'E-Mail Marketing', label: 'E-Mail Marketing' },
      { value: 'Google Ads', label: 'Google Ads' },
      { value: 'Social Media', label: 'Social Media Marketing' },
      { value: 'Content Marketing', label: 'Content Marketing' },
    ],
  },
  {
    gruppe: 'Sonstiges',
    optionen: [{ value: 'Anderes', label: 'Anderes / Ich bin unsicher' }],
  },
]

const budgetOptionen = [
  { value: '', label: 'Budget (optional)' },
  { value: 'unter 5000', label: "Unter CHF 5'000" },
  { value: '5000–15000', label: "CHF 5'000 – 15'000" },
  { value: '15000–50000', label: "CHF 15'000 – 50'000" },
  { value: 'über 50000', label: "Über CHF 50'000" },
  { value: 'noch offen', label: 'Noch offen / unklar' },
]

const startOptionen = [
  { value: '', label: 'Gewünschter Start (optional)' },
  { value: 'so bald wie möglich', label: 'So bald wie möglich' },
  { value: 'in 1–3 Monaten', label: 'In 1–3 Monaten' },
  { value: 'in 3–6 Monaten', label: 'In 3–6 Monaten' },
  { value: 'in 6+ Monaten', label: 'In mehr als 6 Monaten' },
  { value: 'noch offen', label: 'Noch offen' },
]

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FormValues {
  vorname: string
  nachname: string
  firma: string
  email: string
  telefon: string
  interesse: string
  budget: string
  start: string
  nachricht: string
  datenschutz: boolean
}

const empty: FormValues = {
  vorname: '', nachname: '', firma: '', email: '', telefon: '',
  interesse: '', budget: '', start: '', nachricht: '', datenschutz: false,
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validateStep(step: number, v: FormValues): Record<string, string> {
  const e: Record<string, string> = {}
  if (step === 1) {
    if (v.vorname.trim().length < 2) e.vorname = 'Zu kurz'
    if (v.nachname.trim().length < 2) e.nachname = 'Zu kurz'
    if (v.firma.trim().length < 2) e.firma = 'Zu kurz'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Ungültige E-Mail'
    if (v.telefon.trim().length < 8) e.telefon = 'Zu kurz'
  }
  if (step === 2) {
    if (!v.interesse) e.interesse = 'Bitte wählen'
    if (v.nachricht.trim().length < 20) e.nachricht = 'Mindestens 20 Zeichen'
  }
  if (step === 3) {
    if (!v.datenschutz) e.datenschutz = 'Bitte akzeptieren'
  }
  return e
}

// ─── Step Indicator ────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ['Kontakt', 'Projekt', 'Absenden']
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
      {steps.map((label, i) => {
        const n = i + 1
        const done = n < step
        const active = n === step
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700,
                background: done || active ? '#7C3AED' : 'white',
                border: `2px solid ${done || active ? '#7C3AED' : '#D1D5DB'}`,
                color: done || active ? 'white' : '#9CA3AF',
                transition: 'all 0.3s ease',
                boxShadow: active ? '0 0 0 4px rgba(124,58,237,0.15)' : 'none',
              }}>
                {done
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  : n}
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: active ? '#7C3AED' : done ? '#6B7280' : '#9CA3AF', whiteSpace: 'nowrap' }} className="step-label">
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '80px', height: '2px',
                background: n < step ? '#7C3AED' : '#E5E7EB',
                margin: '0 4px', marginBottom: '22px',
                transition: 'background 0.3s ease',
              }} className="step-line" />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.08em',
  color: '#6B7280', marginBottom: '6px',
}

function inputStyle(err: boolean, shake: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '11px 14px', fontSize: '14px',
    borderRadius: '10px', background: 'white', color: '#111111',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    border: `1.5px solid ${err ? '#EF4444' : '#E5E7EB'}`,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    animation: shake ? 'shake 0.35s ease' : 'none',
  }
}

function Field({ label, error, shake = false, children }: {
  label: string; error?: string; shake?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}

function Input({ field, values, errors, shakeSet, onChange, type = 'text', placeholder, autoComplete }: {
  field: keyof FormValues
  values: FormValues
  errors: Record<string, string>
  shakeSet: Set<string>
  onChange: (f: keyof FormValues) => React.ChangeEventHandler<HTMLInputElement>
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  const err = !!errors[field]
  const shake = shakeSet.has(field)
  return (
    <input
      type={type}
      value={values[field] as string}
      onChange={onChange(field)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      style={inputStyle(err, shake)}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = err ? '#EF4444' : '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
    />
  )
}

function Select({ field, values, errors, shakeSet, onChange, children }: {
  field: keyof FormValues
  values: FormValues
  errors: Record<string, string>
  shakeSet: Set<string>
  onChange: (f: keyof FormValues) => React.ChangeEventHandler<HTMLSelectElement>
  children: React.ReactNode
}) {
  const err = !!errors[field]
  const shake = shakeSet.has(field)
  return (
    <select
      value={values[field] as string}
      onChange={onChange(field) as React.ChangeEventHandler<HTMLSelectElement>}
      style={{ ...inputStyle(err, shake), appearance: 'auto' } as React.CSSProperties}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = err ? '#EF4444' : '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {children}
    </select>
  )
}

// ─── Steps ─────────────────────────────────────────────────────────────────────

type StepProps = {
  values: FormValues
  errors: Record<string, string>
  shakeSet: Set<string>
  onChange: (f: keyof FormValues) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}

function Step1({ values, errors, shakeSet, onChange }: StepProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
          Wer bist du?
        </h2>
        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Damit wir Ihre Anfrage persönlich beantworten können.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="two-col">
        <Field label="Vorname *" error={errors.vorname} shake={shakeSet.has('vorname')}>
          <Input field="vorname" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never} autoComplete="given-name" />
        </Field>
        <Field label="Nachname *" error={errors.nachname} shake={shakeSet.has('nachname')}>
          <Input field="nachname" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never} autoComplete="family-name" />
        </Field>
      </div>
      <Field label="Firma *" error={errors.firma} shake={shakeSet.has('firma')}>
        <Input field="firma" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never} autoComplete="organization" />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="two-col">
        <Field label="E-Mail *" error={errors.email} shake={shakeSet.has('email')}>
          <Input field="email" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never} type="email" autoComplete="email" />
        </Field>
        <Field label="Telefon *" error={errors.telefon} shake={shakeSet.has('telefon')}>
          <Input field="telefon" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never} type="tel" placeholder="+41 ..." autoComplete="tel" />
        </Field>
      </div>
    </div>
  )
}

function Step2({ values, errors, shakeSet, onChange }: StepProps) {
  const nachrichtLen = values.nachricht.length
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
          Was brauchst du?
        </h2>
        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Helfen Sie uns, das Richtige für Sie zu finden.</p>
      </div>
      <Field label="Ich interessiere mich für *" error={errors.interesse} shake={shakeSet.has('interesse')}>
        <Select field="interesse" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never}>
          <option value="">Leistung auswählen</option>
          {interesseOptionen.map((g) => (
            <optgroup key={g.gruppe} label={g.gruppe}>
              {g.optionen.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </optgroup>
          ))}
        </Select>
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="two-col">
        <Field label="Budget">
          <Select field="budget" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never}>
            {budgetOptionen.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
        <Field label="Gewünschter Start">
          <Select field="start" values={values} errors={errors} shakeSet={shakeSet} onChange={onChange as never}>
            {startOptionen.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
      </div>
      <Field label={`Projektbeschreibung * · ${nachrichtLen}/1000`} error={errors.nachricht} shake={shakeSet.has('nachricht')}>
        <textarea
          value={values.nachricht}
          onChange={onChange('nachricht') as React.ChangeEventHandler<HTMLTextAreaElement>}
          rows={4}
          maxLength={1000}
          placeholder="Beschreiben Sie kurz Ihr Projekt, Ihre Ziele und was Sie sich wünschen…"
          style={{ ...inputStyle(!!errors.nachricht, shakeSet.has('nachricht')), resize: 'vertical', minHeight: '100px' } as React.CSSProperties}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = errors.nachricht ? '#EF4444' : '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </Field>
    </div>
  )
}

function Step3({ values, errors, shakeSet, onChange, serverError }: StepProps & { serverError: string }) {
  const interesseLabel = interesseOptionen.flatMap(g => g.optionen).find(o => o.value === values.interesse)?.label ?? values.interesse
  const budgetLabel = budgetOptionen.find(o => o.value === values.budget)?.label ?? '—'
  const startLabel = startOptionen.find(o => o.value === values.start)?.label ?? '—'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
          Fast fertig!
        </h2>
        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Überprüfen Sie Ihre Angaben und senden Sie die Anfrage ab.</p>
      </div>

      {/* Summary */}
      <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '20px', border: '1px solid #EFEFEF' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: '14px' }}>Ihre Angaben</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }} className="two-col">
          {[
            { label: 'Name', value: `${values.vorname} ${values.nachname}` },
            { label: 'Firma', value: values.firma },
            { label: 'E-Mail', value: values.email },
            { label: 'Telefon', value: values.telefon },
            { label: 'Interesse', value: interesseLabel },
            { label: 'Budget', value: values.budget ? budgetLabel : '—' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: '2px' }}>{label}</p>
              <p style={{ fontSize: '13px', color: '#111111', fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || '—'}</p>
            </div>
          ))}
        </div>
        {values.nachricht && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #EFEFEF' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: '4px' }}>Beschreibung</p>
            <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: 0 }}>{values.nachricht.slice(0, 120)}{values.nachricht.length > 120 ? '…' : ''}</p>
          </div>
        )}
      </div>

      {/* Datenschutz */}
      <div style={{ animation: shakeSet.has('datenschutz') ? 'shake 0.35s ease' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <input
            id="datenschutz"
            type="checkbox"
            checked={values.datenschutz}
            onChange={onChange('datenschutz') as React.ChangeEventHandler<HTMLInputElement>}
            style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, accentColor: '#7C3AED', cursor: 'pointer' }}
          />
          <label htmlFor="datenschutz" style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.55, cursor: 'pointer' }}>
            Ich habe die{' '}
            <a href="/datenschutz" target="_blank" rel="noopener" style={{ color: '#7C3AED', textDecoration: 'none' }}>
              Datenschutzerklärung
            </a>{' '}
            gelesen und stimme der Verarbeitung meiner Daten zu. *
          </label>
        </div>
        {errors.datenschutz && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '6px' }}>{errors.datenschutz}</p>}
      </div>

      {serverError && (
        <p style={{ fontSize: '13px', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', margin: 0 }}>
          {serverError}
        </p>
      )}
    </div>
  )
}

// ─── Success Screen ─────────────────────────────────────────────────────────────

function SuccessScreen({ vorname, onReset }: { vorname: string; onReset: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0 8px', animation: 'fadeInUp 0.4s ease' }}>
      {/* Animated checkmark */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40" cy="40" r="36"
            stroke="#16A34A" strokeWidth="3" fill="none"
            strokeDasharray="226" strokeDashoffset="226"
            style={{ animation: 'drawCircle 0.6s ease forwards' }}
          />
          <polyline
            points="22,40 34,52 58,28"
            stroke="#16A34A" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="55" strokeDashoffset="55"
            style={{ animation: 'drawCheck 0.4s ease 0.4s forwards' }}
          />
        </svg>
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111111', letterSpacing: '-1px', marginBottom: '10px' }}>
        Anfrage erhalten! 🎉
      </h2>
      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 12px' }}>
        Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen. Schauen Sie auch in Ihren Spam-Ordner.
      </p>
      <p style={{ fontSize: '14px', color: '#7C3AED', fontWeight: 600, marginBottom: '28px' }}>
        Danke, {vorname}! Wir freuen uns auf das Gespräch.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/"
          style={{ padding: '11px 22px', background: '#7C3AED', color: 'white', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}
        >
          Zur Startseite
        </Link>
        <button
          onClick={onReset}
          style={{ padding: '11px 22px', background: 'white', color: '#374151', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Weitere Anfrage
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function AnfrageForm() {
  const [step, setStep] = useState(1)
  const [animClass, setAnimClass] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shakeSet, setShakeSet] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const onChange = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = (e.target as HTMLInputElement).type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value
    setValues(v => ({ ...v, [field]: val }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const transition = (nextStep: number, forward: boolean) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setAnimClass(forward ? 'anim-exit-left' : 'anim-exit-right')
    setTimeout(() => {
      setStep(nextStep)
      setAnimClass(forward ? 'anim-enter-right' : 'anim-enter-left')
      setTimeout(() => {
        setAnimClass('')
        setIsTransitioning(false)
      }, 360)
    }, 300)
  }

  const goNext = () => {
    const errs = validateStep(step, values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShakeSet(new Set(Object.keys(errs)))
      setTimeout(() => setShakeSet(new Set()), 500)
      return
    }
    setErrors({})
    transition(step + 1, true)
  }

  const goBack = () => transition(step - 1, false)

  const handleSubmit = async () => {
    const errs = validateStep(3, values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShakeSet(new Set(Object.keys(errs)))
      setTimeout(() => setShakeSet(new Set()), 500)
      return
    }
    setSubmitting(true)
    setServerError('')
    try {
      const startHinweis = values.start ? `Gewünschter Start: ${values.start}\n\n` : ''
      const res = await fetch('/api/anfragen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vorname: values.vorname,
          nachname: values.nachname,
          firma: values.firma,
          email: values.email,
          telefon: values.telefon,
          budget: values.budget || undefined,
          dienstleistung: [values.interesse],
          nachricht: startHinweis + values.nachricht,
          datenschutz: values.datenschutz,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Fehler beim Senden. Bitte versuchen Sie es erneut.')
      }
      setSubmitted(true)
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Unbekannter Fehler.')
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setValues(empty)
    setStep(1)
    setSubmitted(false)
    setErrors({})
    setAnimClass('')
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to   { transform: translateX(-32px); opacity: 0; }
        }
        @keyframes slideInRight {
          from { transform: translateX(32px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to   { transform: translateX(32px); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-32px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        .anim-exit-left  { animation: slideOutLeft  0.3s ease forwards; }
        .anim-enter-right{ animation: slideInRight  0.36s ease forwards; }
        .anim-exit-right { animation: slideOutRight 0.3s ease forwards; }
        .anim-enter-left { animation: slideInLeft   0.36s ease forwards; }
        @media (max-width: 640px) {
          .two-col { grid-template-columns: 1fr !important; }
          .step-label { display: none; }
          .step-line { width: 40px !important; }
        }
      `}</style>

      <StepIndicator step={step} />

      <div
        className={animClass}
        style={{ minHeight: submitted ? 'auto' : '280px' }}
      >
        {submitted ? (
          <SuccessScreen vorname={values.vorname} onReset={reset} />
        ) : step === 1 ? (
          <Step1 values={values} errors={errors} shakeSet={shakeSet} onChange={onChange} />
        ) : step === 2 ? (
          <Step2 values={values} errors={errors} shakeSet={shakeSet} onChange={onChange} />
        ) : (
          <Step3 values={values} errors={errors} shakeSet={shakeSet} onChange={onChange} serverError={serverError} />
        )}
      </div>

      {!submitted && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              disabled={isTransitioning}
              style={{
                flex: '0 0 auto', padding: '13px 20px',
                background: 'white', color: '#374151',
                border: '1.5px solid #E5E7EB', borderRadius: '10px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Zurück
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={isTransitioning}
              style={{
                flex: 1, padding: '13px 20px',
                background: '#7C3AED', color: 'white',
                border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              Weiter
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                flex: 1, padding: '13px 20px',
                background: submitting ? '#A78BFA' : '#7C3AED', color: 'white',
                border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {submitting ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M21 12a9 9 0 00-9-9" /></svg>
                  Wird gesendet…
                </>
              ) : (
                <>
                  Anfrage absenden
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {!submitted && (
        <p style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px' }}>
          Schritt {step} von 3 · * Pflichtfelder · Ihre Daten werden vertraulich behandelt
        </p>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
