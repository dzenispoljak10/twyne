'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Kunde } from '@prisma/client'
import { Pencil, X } from 'lucide-react'

export default function KundeEditForm({ kunde }: { kunde: Kunde }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firma: kunde.firma,
    vorname: kunde.vorname,
    nachname: kunde.nachname,
    email: kunde.email,
    telefon: kunde.telefon || '',
    website: kunde.website || '',
    adresse: kunde.adresse || '',
    notiz: kunde.notiz || '',
  })
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/kunden/${kunde.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setOpen(false)
      router.refresh()
    } catch {
      alert('Fehler beim Speichern')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#374151] border border-[#E5E7EB] hover:bg-[#F4F4F6] transition-colors"
      >
        <Pencil size={14} />
        Bearbeiten
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#111111]" style={{ letterSpacing: '-0.3px' }}>
                Kunde bearbeiten
              </h2>
              <button onClick={() => setOpen(false)} className="text-[#9CA3AF] hover:text-[#374151]">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Firma *</label>
                <input
                  required
                  value={form.firma}
                  onChange={(e) => setForm({ ...form, firma: e.target.value })}
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Vorname *</label>
                  <input
                    required
                    value={form.vorname}
                    onChange={(e) => setForm({ ...form, vorname: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Nachname *</label>
                  <input
                    required
                    value={form.nachname}
                    onChange={(e) => setForm({ ...form, nachname: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">E-Mail *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Telefon</label>
                  <input
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Website</label>
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Adresse</label>
                <textarea
                  value={form.adresse}
                  onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                  rows={2}
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Interne Notiz</label>
                <textarea
                  value={form.notiz}
                  onChange={(e) => setForm({ ...form, notiz: e.target.value })}
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
                  {loading ? 'Speichert...' : 'Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
