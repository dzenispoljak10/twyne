'use client'
import { useState } from 'react'
import { Filter, Download, Mail, ChevronDown, X, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

type LeadStatus = 'NEU' | 'KONTAKTIERT' | 'IN_VERHANDLUNG' | 'GEWONNEN' | 'VERLOREN'
type LeadQuelle = 'PRODUKT_DEMO' | 'DIENSTLEISTUNG' | 'KONTAKTFORMULAR'

interface Lead {
  id: string
  createdAt: string
  firma: string
  ansprechperson: string
  email: string
  telefon: string | null
  nachricht: string | null
  quelle: LeadQuelle
  produkt: string | null
  dienstleistung: string | null
  status: LeadStatus
  notiz: string | null
}

interface Props {
  initialLeads: Lead[]
}

const statusColors: Record<LeadStatus, { bg: string; color: string; label: string }> = {
  NEU: { bg: '#EFF6FF', color: '#1D4ED8', label: 'Neu' },
  KONTAKTIERT: { bg: '#FFF7ED', color: '#C2410C', label: 'Kontaktiert' },
  IN_VERHANDLUNG: { bg: '#FEFCE8', color: '#A16207', label: 'In Verhandlung' },
  GEWONNEN: { bg: '#F0FDF4', color: '#166534', label: 'Gewonnen' },
  VERLOREN: { bg: '#FEF2F2', color: '#B91C1C', label: 'Verloren' },
}

const quelleLabel: Record<LeadQuelle, string> = {
  PRODUKT_DEMO: 'Produkt-Demo',
  DIENSTLEISTUNG: 'Dienstleistung',
  KONTAKTFORMULAR: 'Kontaktformular',
}

export default function LeadCenter({ initialLeads }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterQuelle, setFilterQuelle] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [mailBetreff, setMailBetreff] = useState('')
  const [mailInhalt, setMailInhalt] = useState('')
  const [mailSending, setMailSending] = useState(false)
  const [mailSent, setMailSent] = useState(false)
  const [notizText, setNotizText] = useState('')
  const [savingNotiz, setSavingNotiz] = useState(false)
  const [convertingToKunde, setConvertingToKunde] = useState(false)
  const router = useRouter()

  const filtered = leads.filter((l) => {
    if (filterStatus && l.status !== filterStatus) return false
    if (filterQuelle && l.quelle !== filterQuelle) return false
    return true
  })

  const stats = {
    total: leads.length,
    neu: leads.filter((l) => l.status === 'NEU').length,
    inVerhandlung: leads.filter((l) => l.status === 'IN_VERHANDLUNG').length,
    gewonnen: leads.filter((l) => l.status === 'GEWONNEN').length,
  }

  const updateStatus = async (id: string, status: LeadStatus) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : null)
  }

  const saveNotiz = async () => {
    if (!selectedLead) return
    setSavingNotiz(true)
    await fetch(`/api/leads/${selectedLead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notiz: notizText }),
    })
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notiz: notizText } : l)))
    setSelectedLead((prev) => prev ? { ...prev, notiz: notizText } : null)
    setSavingNotiz(false)
  }

  const sendMail = async () => {
    if (!selectedLead || !mailBetreff || !mailInhalt) return
    setMailSending(true)
    await fetch(`/api/leads/${selectedLead.id}/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ betreff: mailBetreff, inhalt: mailInhalt }),
    })
    setMailSending(false)
    setMailSent(true)
    setMailBetreff('')
    setMailInhalt('')
    setTimeout(() => setMailSent(false), 3000)
  }

  const openLead = (lead: Lead) => {
    setSelectedLead(lead)
    setNotizText(lead.notiz ?? '')
    setMailSent(false)
  }

  const convertToKunde = async () => {
    if (!selectedLead) return
    setConvertingToKunde(true)
    const res = await fetch(`/api/leads/${selectedLead.id}/zu-kunde`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      router.push(`/admin/kunden/${data.kundeId}`)
    } else {
      alert('Fehler beim Konvertieren')
    }
    setConvertingToKunde(false)
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Gesamt', value: stats.total, color: '#374151' },
          { label: 'Neu', value: stats.neu, color: '#1D4ED8' },
          { label: 'In Verhandlung', value: stats.inVerhandlung, color: '#A16207' },
          { label: 'Gewonnen', value: stats.gewonnen, color: '#166534' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-[#E8E8ED]">
            <p className="text-xs text-[#6B7280] font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E8E8ED] p-4 mb-4 flex items-center gap-3 flex-wrap">
        <Filter size={15} className="text-[#6B7280]" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm border border-[#E8E8ED] rounded-lg px-3 py-1.5 text-[#374151] bg-white"
        >
          <option value="">Alle Status</option>
          {Object.entries(statusColors).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          value={filterQuelle}
          onChange={(e) => setFilterQuelle(e.target.value)}
          className="text-sm border border-[#E8E8ED] rounded-lg px-3 py-1.5 text-[#374151] bg-white"
        >
          <option value="">Alle Quellen</option>
          {Object.entries(quelleLabel).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <div className="flex-1" />
        <a
          href="/api/leads?format=csv"
          className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111111] transition-colors"
        >
          <Download size={14} />
          CSV Export
        </a>
      </div>

      {/* Table + Detail panel */}
      <div className="flex gap-4" style={{ minHeight: '400px' }}>
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F8F9FA]">
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Firma</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3 hidden md:table-cell">Quelle</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3 hidden lg:table-cell">Datum</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-sm text-[#9CA3AF]">
                    Keine Leads gefunden
                  </td>
                </tr>
              )}
              {filtered.map((lead) => {
                const sc = statusColors[lead.status]
                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-[#F4F4F6] hover:bg-[#F8F9FA] cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-violet-50' : ''}`}
                    onClick={() => openLead(lead)}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-[#111111]">{lead.firma}</p>
                      <p className="text-xs text-[#6B7280]">{lead.ansprechperson}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-[#6B7280]">{quelleLabel[lead.quelle]}</span>
                      {(lead.produkt || lead.dienstleistung) && (
                        <p className="text-xs text-[#9CA3AF]">{lead.produkt ?? lead.dienstleistung}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-[#9CA3AF]">
                        {new Date(lead.createdAt).toLocaleDateString('de-CH')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronDown size={14} className="text-[#9CA3AF] rotate-[-90deg]" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selectedLead && (
          <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-[#E8E8ED] p-5 overflow-y-auto" style={{ maxHeight: '600px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111111] text-sm">{selectedLead.firma}</h3>
              <button onClick={() => setSelectedLead(null)} className="text-[#9CA3AF] hover:text-[#111111]">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">Name:</span> {selectedLead.ansprechperson}</p>
              <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">E-Mail:</span> <a href={`mailto:${selectedLead.email}`} className="text-[#7C3AED]">{selectedLead.email}</a></p>
              {selectedLead.telefon && <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">Telefon:</span> {selectedLead.telefon}</p>}
              <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">Quelle:</span> {quelleLabel[selectedLead.quelle]}</p>
              {selectedLead.produkt && <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">Produkt:</span> {selectedLead.produkt}</p>}
              {selectedLead.dienstleistung && <p className="text-xs text-[#6B7280]"><span className="font-medium text-[#374151]">Dienstleistung:</span> {selectedLead.dienstleistung}</p>}
              {selectedLead.nachricht && (
                <div>
                  <p className="text-xs font-medium text-[#374151] mb-1">Nachricht:</p>
                  <p className="text-xs text-[#6B7280] bg-[#F4F4F6] p-2 rounded-lg">{selectedLead.nachricht}</p>
                </div>
              )}
            </div>

            {/* Status update */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#374151] mb-2">Status</p>
              <select
                value={selectedLead.status}
                onChange={(e) => updateStatus(selectedLead.id, e.target.value as LeadStatus)}
                className="w-full text-sm border border-[#E8E8ED] rounded-lg px-3 py-2 text-[#374151] bg-white"
              >
                {Object.entries(statusColors).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Zu Kunde konvertieren */}
            {selectedLead.status !== 'GEWONNEN' && selectedLead.status !== 'VERLOREN' && (
              <div className="mb-4">
                <button
                  onClick={convertToKunde}
                  disabled={convertingToKunde}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white disabled:opacity-50"
                  style={{ background: '#059669' }}
                >
                  <UserPlus size={13} />
                  {convertingToKunde ? 'Konvertiere...' : 'Zu Kunde konvertieren'}
                </button>
              </div>
            )}

            {/* Notiz */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#374151] mb-2">Notiz</p>
              <textarea
                value={notizText}
                onChange={(e) => setNotizText(e.target.value)}
                rows={3}
                className="w-full text-xs border border-[#E8E8ED] rounded-lg px-3 py-2 text-[#374151] resize-none"
                placeholder="Interne Notiz..."
              />
              <button
                onClick={saveNotiz}
                disabled={savingNotiz}
                className="mt-1 text-xs font-medium text-[#7C3AED] hover:text-[#6D28D9] disabled:opacity-50"
              >
                {savingNotiz ? 'Speichern...' : 'Notiz speichern'}
              </button>
            </div>

            {/* Mail composer */}
            <div>
              <p className="text-xs font-semibold text-[#374151] mb-2 flex items-center gap-1.5">
                <Mail size={12} /> E-Mail senden
              </p>
              {mailSent ? (
                <p className="text-xs text-green-600 font-medium py-2">E-Mail erfolgreich gesendet!</p>
              ) : (
                <>
                  <input
                    value={mailBetreff}
                    onChange={(e) => setMailBetreff(e.target.value)}
                    placeholder="Betreff"
                    className="w-full text-xs border border-[#E8E8ED] rounded-lg px-3 py-2 text-[#374151] mb-2"
                  />
                  <textarea
                    value={mailInhalt}
                    onChange={(e) => setMailInhalt(e.target.value)}
                    rows={4}
                    placeholder="Nachricht..."
                    className="w-full text-xs border border-[#E8E8ED] rounded-lg px-3 py-2 text-[#374151] resize-none mb-2"
                  />
                  <button
                    onClick={sendMail}
                    disabled={mailSending || !mailBetreff || !mailInhalt}
                    className="w-full text-xs font-semibold bg-[#7C3AED] text-white py-2 rounded-lg disabled:opacity-50 hover:bg-[#6D28D9] transition-colors"
                  >
                    {mailSending ? 'Senden...' : 'E-Mail senden'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
