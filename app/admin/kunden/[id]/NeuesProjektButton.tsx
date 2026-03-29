'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'

export default function NeuesProjektButton({ kundeId, kundeName }: { kundeId: string; kundeName: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', beschreibung: '' })
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/crm/projekte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, kundeId }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setOpen(false)
      router.push(`/admin/projekte/${data.id}`)
      router.refresh()
    } catch {
      alert('Fehler beim Erstellen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
        style={{ background: '#7C3AED' }}
      >
        <Plus size={16} />
        Neues Projekt
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-[#111111]" style={{ letterSpacing: '-0.3px' }}>
                  Neues Projekt
                </h2>
                <p className="text-xs text-[#6B7280]">{kundeName}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#9CA3AF] hover:text-[#374151]">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Projektname *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="z.B. Website Redesign 2026"
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Beschreibung</label>
                <textarea
                  value={form.beschreibung}
                  onChange={(e) => setForm({ ...form, beschreibung: e.target.value })}
                  rows={3}
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED] resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-[#374151] border border-[#E5E7EB] hover:bg-[#F4F4F6]"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: '#7C3AED' }}
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
