'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { anfrageSchema, type AnfrageFormData } from '@/lib/validations'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const DIENSTLEISTUNGEN = [
  'Webseiten & Webdesign',
  'Webapplikationen',
  'Softwareentwicklung',
  'CMS-Lösungen',
  'KI-Beratung',
  'Digitale Transformation',
  'SEO & Suchmaschinenoptimierung',
]

const BUDGET_OPTIONS = [
  { value: 'unter_2k', label: "Unter CHF 2'000" },
  { value: '2k_5k', label: "CHF 2'000 – 5'000" },
  { value: '5k_15k', label: "CHF 5'000 – 15'000" },
  { value: '15k_50k', label: "CHF 15'000 – 50'000" },
  { value: 'ueber_50k', label: "Über CHF 50'000" },
  { value: 'offen', label: 'Offen / noch unklar' },
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<AnfrageFormData>({
    resolver: zodResolver(anfrageSchema),
    defaultValues: { dienstleistung: [] },
  })

  const selectedServices = watch('dienstleistung') || []

  function toggleService(service: string) {
    const current = selectedServices
    if (current.includes(service)) {
      setValue('dienstleistung', current.filter((s) => s !== service), { shouldValidate: true })
    } else {
      setValue('dienstleistung', [...current, service], { shouldValidate: true })
    }
  }

  async function onSubmit(data: AnfrageFormData) {
    setServerError('')
    try {
      const res = await fetch('/api/anfragen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Fehler beim Senden')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      setServerError(message)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#111111] mb-3">Vielen Dank!</h3>
        <p className="text-[#6B7280] max-w-md">
          Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="vorname"
          label="Vorname *"
          placeholder="Max"
          error={errors.vorname?.message}
          {...register('vorname')}
        />
        <Input
          id="nachname"
          label="Nachname *"
          placeholder="Mustermann"
          error={errors.nachname?.message}
          {...register('nachname')}
        />
      </div>

      {/* Firma */}
      <Input
        id="firma"
        label="Firma *"
        placeholder="Musterfirma AG"
        error={errors.firma?.message}
        {...register('firma')}
      />

      {/* Email + Telefon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="email"
          type="email"
          label="E-Mail *"
          placeholder="max@firma.ch"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="telefon"
          type="tel"
          label="Telefon *"
          placeholder="+41 79 123 45 67"
          error={errors.telefon?.message}
          {...register('telefon')}
        />
      </div>

      {/* Website */}
      <Input
        id="website"
        label="Website (optional)"
        placeholder="https://www.firma.ch"
        {...register('website')}
      />

      {/* Dienstleistungen */}
      <div>
        <p className="block text-sm font-semibold text-[#111111] mb-3">
          Gewünschte Dienstleistung *
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DIENSTLEISTUNGEN.map((service) => {
            const isSelected = selectedServices.includes(service)
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-[#7C3AED] bg-violet-50 text-[#7C3AED]'
                    : 'border-[#E8E8ED] bg-white text-[#374151] hover:border-[#7C3AED]/40'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#7C3AED] border-[#7C3AED]' : 'border-[#D1D5DB]'
                  }`}
                >
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                {service}
              </button>
            )
          })}
        </div>
        {errors.dienstleistung && (
          <p className="mt-1.5 text-xs text-red-600">{errors.dienstleistung.message}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-[#111111] mb-1.5">
          Budget
        </label>
        <select
          id="budget"
          className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-[#374151] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent bg-white"
          {...register('budget')}
        >
          <option value="">Budget wählen (optional)</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Nachricht */}
      <div>
        <label htmlFor="nachricht" className="block text-sm font-semibold text-[#111111] mb-1.5">
          Ihre Nachricht *
        </label>
        <textarea
          id="nachricht"
          rows={5}
          placeholder="Beschreiben Sie kurz Ihr Projekt, Ihre Ziele und Ihre Anforderungen..."
          className={`w-full px-4 py-2.5 rounded-lg border text-[#374151] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none ${
            errors.nachricht ? 'border-red-400 bg-red-50' : 'border-[#E8E8ED] bg-white hover:border-[#6B7280]'
          }`}
          {...register('nachricht')}
        />
        {errors.nachricht && (
          <p className="mt-1 text-xs text-red-600">{errors.nachricht.message}</p>
        )}
      </div>

      {/* Datenschutz */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="datenschutz"
          className="mt-0.5 w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED]"
          {...register('datenschutz')}
        />
        <label htmlFor="datenschutz" className="text-sm text-[#6B7280]">
          Ich habe die{' '}
          <a href="/datenschutz" className="text-[#7C3AED] hover:underline">
            Datenschutzerklärung
          </a>{' '}
          gelesen und akzeptiert. *
        </label>
      </div>
      {errors.datenschutz && (
        <p className="text-xs text-red-600 -mt-4">{errors.datenschutz.message}</p>
      )}

      {/* Server error */}
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        Anfrage senden
      </Button>
    </form>
  )
}
