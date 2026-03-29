'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Link from 'next/link'

interface AnfrageActionsProps {
  anfrageId: string
  status: string
  email: string
  vorname: string
  nachname: string
  projektId?: string
}

export default function AnfrageActions({ anfrageId, status, email, vorname, nachname, projektId }: AnfrageActionsProps) {
  const router = useRouter()
  const [ablehnenOpen, setAblehnenOpen] = useState(false)
  const [ablehnungsgrund, setAblehnungsgrund] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleAnnehmen() {
    setLoading('annehmen')
    try {
      const res = await fetch(`/api/anfragen/${anfrageId}/annehmen`, { method: 'POST' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/admin/projekte/${data.projektId}`)
    } catch {
      setError('Fehler beim Annehmen.')
      setLoading(null)
    }
  }

  async function handleAblehnen() {
    setLoading('ablehnen')
    try {
      const res = await fetch(`/api/anfragen/${anfrageId}/ablehnen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ablehnungsgrund }),
      })
      if (!res.ok) throw new Error()
      setAblehnenOpen(false)
      router.refresh()
    } catch {
      setError('Fehler beim Ablehnen.')
    } finally {
      setLoading(null)
    }
  }

  const isPending = status === 'NEU' || status === 'IN_BEARBEITUNG'
  const isAccepted = status === 'ANGENOMMEN'

  return (
    <div className="bg-white rounded-xl border border-[#E8E8ED] p-5 space-y-3">
      <h3 className="text-sm font-bold text-[#111111]">Aktionen</h3>

      {projektId && (
        <Link
          href={`/admin/projekte/${projektId}`}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-[#7C3AED] border border-[#7C3AED]/30 rounded-lg hover:bg-violet-50 transition-colors"
        >
          <ExternalLink size={15} />
          Zum Projekt
        </Link>
      )}

      {isPending && (
        <>
          <Button
            variant="success"
            className="w-full"
            onClick={handleAnnehmen}
            loading={loading === 'annehmen'}
          >
            <CheckCircle size={15} className="mr-1.5" />
            Annehmen & Projekt erstellen
          </Button>
          <Button
            variant="danger"
            className="w-full"
            onClick={() => setAblehnenOpen(true)}
          >
            <XCircle size={15} className="mr-1.5" />
            Ablehnen
          </Button>
        </>
      )}

      {isAccepted && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 font-medium">
          ✓ Diese Anfrage wurde angenommen
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Ablehnen Modal */}
      <Modal open={ablehnenOpen} onClose={() => setAblehnenOpen(false)} title="Anfrage ablehnen">
        <div className="space-y-4">
          <p className="text-sm text-[#374151]">
            Möchten Sie die Anfrage von <strong>{vorname} {nachname}</strong> wirklich ablehnen? Eine Ablehnungsmail wird automatisch versandt.
          </p>
          <div>
            <label className="block text-sm font-semibold text-[#111111] mb-1.5">
              Begründung (optional, intern)
            </label>
            <textarea
              rows={3}
              value={ablehnungsgrund}
              onChange={(e) => setAblehnungsgrund(e.target.value)}
              placeholder="Interne Notiz zum Ablehnungsgrund..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setAblehnenOpen(false)}>Abbrechen</Button>
            <Button variant="danger" onClick={handleAblehnen} loading={loading === 'ablehnen'}>
              Ablehnen & Mail senden
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
