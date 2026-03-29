'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

interface Kunde {
  id: string
  firma: string
  vorname: string
  nachname: string
}

export default function NeuesProjektButton({ kunden }: { kunden: Kunde[] }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [beschreibung, setBeschreibung] = useState('')
  const [kundeId, setKundeId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/projekte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), beschreibung: beschreibung.trim() || undefined, kundeId: kundeId || undefined }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setOpen(false)
      setName('')
      setBeschreibung('')
      setKundeId('')
      router.push(`/admin/projekte/${data.id}`)
    } catch {
      setError('Fehler beim Erstellen.')
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-lg hover:bg-[#6D28D9] transition-colors"
      >
        <Plus size={16} />
        Neues Projekt
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#374151]"
              type="button"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-[#111111] mb-5">Neues Projekt erstellen</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Projektname *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Website Redesign"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Beschreibung</label>
                <textarea
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                  rows={2}
                  placeholder="Optional..."
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-none"
                />
              </div>
              {kunden.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Kunde (optional)</label>
                  <select
                    value={kundeId}
                    onChange={(e) => setKundeId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E8E8ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  >
                    <option value="">Kein Kunde ausgewählt</option>
                    {kunden.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.firma} — {k.vorname} {k.nachname}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {error && <p className="text-xs text-red-600">{error}</p>}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#374151] border border-[#E8E8ED] rounded-lg hover:bg-[#F4F4F6]"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] disabled:opacity-50"
                >
                  {loading ? 'Erstelle...' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
