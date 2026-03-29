'use client'
import { useState } from 'react'
import { Mail, Upload, StickyNote, LayoutGrid, Send, FileUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import MailComposer from '@/components/admin/MailComposer'
import NotizenEditor from '@/components/admin/NotizenEditor'
import UploadManager from '@/components/admin/UploadManager'

type Tab = 'uebersicht' | 'mails' | 'uploads' | 'notizen'

interface Mail {
  id: string
  createdAt: Date
  an: string
  betreff: string
  inhalt: string
  typ: string
}

interface Upload {
  id: string
  createdAt: Date
  dateiname: string
  dateigroesse: number
  heruntergeladen: boolean
  heruntergeladenAm: Date | null
}

interface Notiz {
  id: string
  createdAt: Date
  inhalt: string
}

interface Projekt {
  id: string
  name: string
  kontaktEmail: string
  kontaktVorname: string
  kontaktNachname: string
  kontaktFirma: string
  kontaktTelefon: string
  offerteBetrag: unknown
  rechnungsNr: string | null
  rechnungsBetrag: unknown
  offerteNr: string | null
  beschreibung: string | null
  mails: Mail[]
  uploads: Upload[]
  notizen: Notiz[]
}

export default function ProjektTabs({ projekt }: { projekt: Projekt }) {
  const [activeTab, setActiveTab] = useState<Tab>('uebersicht')
  const [mailComposerOpen, setMailComposerOpen] = useState(false)

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'uebersicht', label: 'Übersicht', icon: LayoutGrid },
    { id: 'mails', label: `Mails (${projekt.mails.length})`, icon: Mail },
    { id: 'uploads', label: `Uploads (${projekt.uploads.length})`, icon: Upload },
    { id: 'notizen', label: `Notizen (${projekt.notizen.length})`, icon: StickyNote },
  ]

  async function handleUploadRequest() {
    const res = await fetch(`/api/projekte/${projekt.id}/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        an: projekt.kontaktEmail,
        betreff: 'Dateien hochladen für Ihr Twyne-Projekt',
        inhalt: 'Upload-Link wird automatisch generiert und gesendet.',
        typ: 'UPLOAD_ANFRAGE',
        projektId: projekt.id,
      }),
    })
    if (res.ok) alert('Upload-Anfrage wurde gesendet!')
  }

  return (
    <div className="space-y-4">
      {/* Tab nav */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#F4F4F6] rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#111111] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111111]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setMailComposerOpen(true)}>
            <Send size={14} className="mr-1.5" />
            Mail senden
          </Button>
          <Button size="sm" variant="secondary" onClick={handleUploadRequest}>
            <FileUp size={14} className="mr-1.5" />
            Upload anfordern
          </Button>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
        {activeTab === 'uebersicht' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Kontakt</h3>
                <div className="space-y-1.5 text-sm">
                  <p className="font-medium text-[#111111]">{projekt.kontaktVorname} {projekt.kontaktNachname}</p>
                  <p className="text-[#374151]">{projekt.kontaktFirma}</p>
                  <a href={`mailto:${projekt.kontaktEmail}`} className="text-[#7C3AED] hover:underline block">
                    {projekt.kontaktEmail}
                  </a>
                  <p className="text-[#374151]">{projekt.kontaktTelefon}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Finanzen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Offerte-Nr.</span>
                    <span className="font-mono font-medium text-[#111111]">{projekt.offerteNr || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Offerte-Betrag</span>
                    <span className="font-medium text-[#111111]">
                      {projekt.offerteBetrag ? `CHF ${Number(projekt.offerteBetrag).toLocaleString('de-CH', { minimumFractionDigits: 2 })}` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Rechnungs-Nr.</span>
                    <span className="font-mono font-medium text-[#111111]">{projekt.rechnungsNr || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Rechnungs-Betrag</span>
                    <span className="font-medium text-[#111111]">
                      {projekt.rechnungsBetrag ? `CHF ${Number(projekt.rechnungsBetrag).toLocaleString('de-CH', { minimumFractionDigits: 2 })}` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {projekt.beschreibung && (
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Beschreibung</h3>
                <p className="text-sm text-[#374151] leading-relaxed">{projekt.beschreibung}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'mails' && (
          <div className="space-y-3">
            {projekt.mails.length === 0 ? (
              <p className="text-sm text-[#6B7280] text-center py-8">Noch keine Mails gesendet</p>
            ) : (
              projekt.mails.map((mail) => (
                <div key={mail.id} className="p-4 bg-[#F4F4F6] rounded-lg border border-[#E8E8ED]">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold text-[#111111]">{mail.betreff}</p>
                    <p className="text-xs text-[#6B7280]">
                      {new Date(mail.createdAt).toLocaleDateString('de-CH')}
                    </p>
                  </div>
                  <p className="text-xs text-[#6B7280]">An: {mail.an}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Typ: {mail.typ}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'uploads' && (
          <UploadManager uploads={projekt.uploads} projektId={projekt.id} />
        )}

        {activeTab === 'notizen' && (
          <NotizenEditor projektId={projekt.id} initialNotizen={projekt.notizen} />
        )}
      </div>

      <MailComposer
        open={mailComposerOpen}
        onClose={() => setMailComposerOpen(false)}
        defaultEmail={projekt.kontaktEmail}
        defaultName={`${projekt.kontaktVorname} ${projekt.kontaktNachname}`}
        projektId={projekt.id}
      />
    </div>
  )
}
