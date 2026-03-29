'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface MailComposerProps {
  open: boolean
  onClose: () => void
  defaultEmail: string
  defaultName: string
  projektId?: string
  anfrageId?: string
  onSent?: () => void
}

const VORLAGEN = [
  { typ: 'INDIVIDUELL', label: 'Freie Mail', betreff: '', inhalt: '' },
  {
    typ: 'UPLOAD_ANFRAGE',
    label: 'Upload anfordern',
    betreff: 'Dateien hochladen für Ihr Twyne-Projekt',
    inhalt: 'Guten Tag,\n\nfür Ihr Projekt benötigen wir Ihre Dateien (Logos, Bilder, Dokumente etc.). Wir senden Ihnen in Kürze einen sicheren Upload-Link.\n\nMit freundlichen Grüssen\nTwyne',
  },
  {
    typ: 'OFFERTE',
    label: 'Offerte zusenden',
    betreff: 'Offerte für Ihr Twyne-Projekt',
    inhalt: 'Guten Tag,\n\nanbei finden Sie unsere Offerte für Ihr Projekt. Bei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüssen\nTwyne',
  },
  {
    typ: 'STATUSUPDATE',
    label: 'Statusupdate',
    betreff: 'Statusupdate zu Ihrem Twyne-Projekt',
    inhalt: 'Guten Tag,\n\nwir möchten Sie kurz über den aktuellen Stand Ihres Projekts informieren:\n\n[Hier Statusupdate einfügen]\n\nMit freundlichen Grüssen\nTwyne',
  },
]

export default function MailComposer({
  open,
  onClose,
  defaultEmail,
  defaultName,
  projektId,
  anfrageId,
  onSent,
}: MailComposerProps) {
  const [vorlage, setVorlage] = useState(VORLAGEN[0])
  const [betreff, setBetreff] = useState('')
  const [inhalt, setInhalt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function selectVorlage(v: typeof VORLAGEN[0]) {
    setVorlage(v)
    setBetreff(v.betreff)
    setInhalt(v.inhalt)
  }

  async function handleSend() {
    if (!betreff.trim() || !inhalt.trim()) {
      setError('Betreff und Inhalt sind Pflichtfelder.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const url = projektId ? `/api/projekte/${projektId}/mail` : '/api/anfragen'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          an: defaultEmail,
          betreff,
          inhalt,
          typ: vorlage.typ,
          projektId,
          anfrageId,
        }),
      })
      if (!res.ok) throw new Error('Fehler beim Senden')
      onSent?.()
      onClose()
    } catch {
      setError('E-Mail konnte nicht gesendet werden.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="E-Mail senden" className="max-w-2xl">
      <div className="space-y-4">
        {/* Vorlage */}
        <div>
          <label className="block text-sm font-semibold text-[#111111] mb-2">Vorlage</label>
          <div className="flex flex-wrap gap-2">
            {VORLAGEN.map((v) => (
              <button
                key={v.typ}
                onClick={() => selectVorlage(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  vorlage.typ === v.typ
                    ? 'border-[#7C3AED] bg-violet-50 text-[#7C3AED]'
                    : 'border-[#E8E8ED] text-[#374151] hover:border-[#7C3AED]/40'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* An */}
        <div>
          <label className="block text-sm font-semibold text-[#111111] mb-1.5">An</label>
          <div className="px-4 py-2.5 rounded-lg border border-[#E8E8ED] bg-[#F4F4F6] text-sm text-[#374151]">
            {defaultName} &lt;{defaultEmail}&gt;
          </div>
        </div>

        {/* Betreff */}
        <Input
          label="Betreff"
          value={betreff}
          onChange={(e) => setBetreff(e.target.value)}
          placeholder="E-Mail Betreff..."
        />

        {/* Inhalt */}
        <div>
          <label className="block text-sm font-semibold text-[#111111] mb-1.5">Inhalt</label>
          <textarea
            rows={8}
            value={inhalt}
            onChange={(e) => setInhalt(e.target.value)}
            placeholder="E-Mail Inhalt..."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>Abbrechen</Button>
          <Button onClick={handleSend} loading={loading}>Senden</Button>
        </div>
      </div>
    </Modal>
  )
}
