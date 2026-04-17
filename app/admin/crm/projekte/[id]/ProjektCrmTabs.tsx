'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Kunde, Projekt, Offerte, Rechnung, Position, RechnungsPosition, ProjektMail, ProjektNotiz, Upload } from '@prisma/client'
import { formatChf, formatDatum, berechnePositionen } from '@/lib/crm-helpers'
import { formatFileSize } from '@/lib/upload-utils'
import { OfferteStatusBadge, RechnungsStatusBadge } from '@/components/admin/StatusBadge'
import { PositionenEditorKern, PositionRow, initialPositionenToRows } from './PositionenEditor'
import {
  Plus, Download, Send, CheckCircle, XCircle, FileText,
  StickyNote, LayoutGrid, Trash2, AlertTriangle, X, Mail, RefreshCw, Upload as UploadIcon, Link as LinkIcon, Pencil,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type OfferteFull = Offerte & { positionen: Position[] }
type RechnungFull = Rechnung & { positionen: RechnungsPosition[] }

type ProjektFull = Projekt & {
  kunde: Kunde | null
  offerten: OfferteFull[]
  rechnungen: RechnungFull[]
  mails: ProjektMail[]
  notizen: ProjektNotiz[]
  uploads: Upload[]
}

type Tab = 'uebersicht' | 'offerten' | 'rechnungen' | 'mails' | 'notizen' | 'uploads'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function in30DaysStr() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().slice(0, 10)
}

function rowsToPayload(rows: PositionRow[]) {
  return rows.map((r, i) => ({
    beschreibung: r.beschreibung,
    menge: typeof r.menge === 'string' ? parseFloat(r.menge) || 1 : r.menge,
    einheit: r.einheit,
    einzelpreis: typeof r.einzelpreis === 'string' ? parseFloat(r.einzelpreis) || 0 : r.einzelpreis,
    reihenfolge: i,
  }))
}

// ─── Modal Wrapper ────────────────────────────────────────────────────────────

function Modal({ onClose, children, wide }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
        padding: '24px 16px', overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'white', borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          width: '100%', maxWidth: wide ? '860px' : '520px',
          padding: '28px', position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}
          type="button"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}

function ConfirmModal({
  title, text, onConfirm, onCancel, loading,
}: {
  title: string; text: string; onConfirm: () => void; onCancel: () => void; loading: boolean
}) {
  return (
    <Modal onClose={onCancel}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Trash2 size={32} color="#EF4444" />
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', lineHeight: 1.6, marginBottom: '24px' }}>{text}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onCancel} disabled={loading}
          style={{ flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}
        >
          Abbrechen
        </button>
        <button
          onClick={onConfirm} disabled={loading}
          style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, color: 'white', background: loading ? '#FCA5A5' : '#EF4444', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Löschen...' : 'Ja, löschen'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Input helpers ────────────────────────────────────────────────────────────

const inputCls = 'w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]'
const labelCls = 'block text-xs font-semibold text-[#374151] mb-1'

// ─── Download helper ──────────────────────────────────────────────────────────

async function downloadPdf(url: string, filename: string) {
  const res = await fetch(url)
  if (!res.ok) { alert('Fehler beim Laden des PDFs'); return }
  const blob = await res.blob()
  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)
}

// ─── Mail Senden Modal ────────────────────────────────────────────────────────

function MailSendenModal({
  defaultAn, defaultBetreff, defaultInhalt, apiUrl, mailTyp, mahnungStufe, onClose, onSent,
}: {
  defaultAn: string
  defaultBetreff: string
  defaultInhalt: string
  apiUrl: string
  mailTyp: string
  mahnungStufe?: 1 | 2
  onClose: () => void
  onSent: () => void
}) {
  const [an, setAn] = useState(defaultAn)
  const [betreff, setBetreff] = useState(defaultBetreff)
  const [inhalt, setInhalt] = useState(defaultInhalt)
  const [mitPdf, setMitPdf] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSend() {
    setSending(true)
    setError('')
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ an, betreff, inhalt, mitPdf, typ: mailTyp, mahnungStufe }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || 'Fehler beim Senden')
      }
      onSent()
    } catch (e: any) {
      setError(e.message)
      setSending(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>Mail senden</h2>
      <div className="space-y-3">
        <div>
          <label className={labelCls}>An</label>
          <input value={an} onChange={(e) => setAn(e.target.value)} className={inputCls} type="email" required />
        </div>
        <div>
          <label className={labelCls}>Betreff</label>
          <input value={betreff} onChange={(e) => setBetreff(e.target.value)} className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>Nachricht</label>
          <textarea value={inhalt} onChange={(e) => setInhalt(e.target.value)} rows={7}
            className={inputCls + ' resize-none font-mono'} required />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
          <input type="checkbox" checked={mitPdf} onChange={(e) => setMitPdf(e.target.checked)} />
          PDF als Anhang beifügen
        </label>
      </div>
      {error && <p style={{ fontSize: '13px', color: '#DC2626', marginTop: '12px' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button onClick={onClose} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
          Abbrechen
        </button>
        <button onClick={handleSend} disabled={sending || !an || !betreff || !inhalt} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: sending ? '#A78BFA' : '#7C3AED', cursor: sending ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Mail size={14} />
          {sending ? 'Sende...' : 'Senden'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Zahlungserinnerung Modal ─────────────────────────────────────────────────

function ZahlungserinnerungModal({
  rechnung, emailAddress, projektId, onClose, onSent,
}: {
  rechnung: { id: string; nr: string; faelligBis: string | Date; positionen: any[] }
  emailAddress: string
  projektId: string
  onClose: () => void
  onSent: () => void
}) {
  const { summen } = berechnePositionen(rechnung.positionen)
  const faelligStr = new Date(rechnung.faelligBis).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const defaultInhalt = `Sehr geehrte Damen und Herren,\n\nwir erlauben uns, Sie freundlich an die Begleichung der Rechnung ${rechnung.nr} im Betrag von ${formatChf(summen.total)} zu erinnern.\n\nZahlbar bis: ${faelligStr}\nIBAN: CH25 8080 8004 3893 2201 6\nKontoinhaber: Twyne / c/o Visiosign Poljak, Galliweg 3, 4852 Rothrist\nVerwendungszweck: ${rechnung.nr}\n\nFalls Sie die Zahlung bereits veranlasst haben, bitten wir Sie, dieses Schreiben als gegenstandslos zu betrachten.\n\nFreundliche Grüsse\nTwyne`

  return (
    <MailSendenModal
      defaultAn={emailAddress}
      defaultBetreff={`Zahlungserinnerung ${rechnung.nr} — Twyne`}
      defaultInhalt={defaultInhalt}
      apiUrl={`/api/crm/rechnungen/${rechnung.id}/mail`}
      mailTyp="ZAHLUNGSERINNERUNG"
      onClose={onClose}
      onSent={onSent}
    />
  )
}

// ─── Mahnung Senden Modal ─────────────────────────────────────────────────────

function MahnungSendenModal({
  rechnung, emailAddress, onClose, onSent,
}: {
  rechnung: { id: string; nr: string; faelligBis: string | Date; positionen: any[]; status: string }
  emailAddress: string
  onClose: () => void
  onSent: () => void
}) {
  const { summen } = berechnePositionen(rechnung.positionen)
  const initialStufe: 1 | 2 = rechnung.status === 'MAHNUNG_1' ? 2 : 1
  const [stufe, setStufe] = useState<1 | 2>(initialStufe)
  const [mahngebuehr, setMahngebuehr] = useState(true)

  const faelligStr = new Date(rechnung.faelligBis).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const totalMitGebuehr = mahngebuehr ? summen.total + 20 : summen.total

  const defaultInhalt = stufe === 1
    ? `Sehr geehrte Damen und Herren,\n\ntrotz unserer Zahlungserinnerung haben wir bis heute keinen Zahlungseingang für die Rechnung ${rechnung.nr} (${formatChf(summen.total)}) verzeichnet.\n\nWir bitten Sie dringend, den ausstehenden Betrag${mahngebuehr ? ' zuzüglich einer Mahngebühr von CHF 20.00' : ''} zu begleichen:\n\nBetrag: ${formatChf(totalMitGebuehr)}\nZahlbar bis: ${faelligStr}\nIBAN: CH25 8080 8004 3893 2201 6\nKontoinhaber: Twyne / c/o Visiosign Poljak, Galliweg 3, 4852 Rothrist\nVerwendungszweck: ${rechnung.nr}\n\nFreundliche Grüsse\nTwyne`
    : `Sehr geehrte Damen und Herren,\n\nohne Reaktion auf unsere 1. Mahnung sehen wir uns leider gezwungen, Ihnen diese 2. und letzte Mahnung zuzustellen.\n\nWir fordern Sie auf, den Betrag von ${formatChf(totalMitGebuehr)} (inkl.${mahngebuehr ? ' Mahngebühr CHF 20.00' : ''}) bis spätestens ${faelligStr} zu überweisen.\n\nIBAN: CH25 8080 8004 3893 2201 6\nKontoinhaber: Twyne / c/o Visiosign Poljak, Galliweg 3, 4852 Rothrist\nVerwendungszweck: ${rechnung.nr}\n\nBei ausbleibender Zahlung behalten wir uns rechtliche Schritte vor.\n\nFreundliche Grüsse\nTwyne`

  return (
    <MailSendenModal
      defaultAn={emailAddress}
      defaultBetreff={`Mahnung ${stufe} — Rechnung ${rechnung.nr} — Twyne`}
      defaultInhalt={defaultInhalt}
      apiUrl={`/api/crm/rechnungen/${rechnung.id}/mail`}
      mailTyp={stufe === 1 ? 'MAHNUNG_1' : 'MAHNUNG_2'}
      mahnungStufe={stufe}
      onClose={onClose}
      onSent={onSent}
    />
  )
}

// ─── Create Offerte Modal ─────────────────────────────────────────────────────

function CreateOfferteModal({ projektId, onClose, onCreated }: { projektId: string; onClose: () => void; onCreated: () => void }) {
  const [datum, setDatum] = useState(todayStr())
  const [gueltigBis, setGueltigBis] = useState(in30DaysStr())
  const [notiz, setNotiz] = useState('')
  const [rows, setRows] = useState<PositionRow[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/crm/projekte/${projektId}/offerten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datum, gueltigBis, notiz: notiz || null, positionen: rowsToPayload(rows) }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Fehler')
      }
      onCreated()
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <Modal onClose={onClose} wide>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>Neue Offerte erstellen</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className={labelCls}>Datum</label>
          <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Gültig bis *</label>
          <input type="date" value={gueltigBis} onChange={(e) => setGueltigBis(e.target.value)} className={inputCls} required />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Notiz (intern)</label>
          <textarea value={notiz} onChange={(e) => setNotiz(e.target.value)} rows={2} className={inputCls + ' resize-none'} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', marginBottom: '20px' }}>
        <p className="text-xs font-semibold text-[#374151] mb-3">Positionen</p>
        <PositionenEditorKern rows={rows} onRowsChange={setRows} />
      </div>

      {error && <p style={{ fontSize: '13px', color: '#DC2626', marginBottom: '12px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button onClick={onClose} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
          Abbrechen
        </button>
        <button onClick={handleCreate} disabled={saving || !gueltigBis} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: saving ? '#A78BFA' : '#7C3AED', cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Erstelle...' : 'Offerte erstellen'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Offerte Detail Modal ─────────────────────────────────────────────────────

function OfferteDetailModal({
  offerte, emailAddress, onClose, onChanged,
}: {
  offerte: OfferteFull
  emailAddress: string
  onClose: () => void
  onChanged: () => void
}) {
  const [rows, setRows] = useState<PositionRow[]>(() => initialPositionenToRows(offerte.positionen))
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showMail, setShowMail] = useState(false)
  const [alsRechnung, setAlsRechnung] = useState(false)

  async function savePositionen() {
    setSaving(true)
    await fetch(`/api/crm/offerten/${offerte.id}/positionen`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ positionen: rowsToPayload(rows) }),
    })
    setSaving(false)
    onChanged()
  }

  async function setStatus(status: string) {
    await fetch(`/api/crm/offerten/${offerte.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    onChanged()
  }

  async function deleteOfferte() {
    setDeleting(true)
    await fetch(`/api/crm/offerten/${offerte.id}`, { method: 'DELETE' })
    setDeleting(false)
    onChanged()
  }

  async function alsRechnungUebernehmen() {
    setAlsRechnung(true)
    const res = await fetch(`/api/crm/offerten/${offerte.id}/als-rechnung`, { method: 'POST' })
    setAlsRechnung(false)
    if (res.ok) {
      onChanged()
    } else {
      alert('Fehler beim Erstellen der Rechnung')
    }
  }

  const { summen } = berechnePositionen(offerte.positionen)
  const st = offerte.status as string

  return (
    <>
      {showMail && (
        <MailSendenModal
          defaultAn={emailAddress}
          defaultBetreff={`Offerte ${offerte.nr} — Twyne`}
          defaultInhalt={`Sehr geehrte Damen und Herren,\n\nanbei senden wir Ihnen unsere Offerte ${offerte.nr}${summen.total > 0 ? ` im Betrag von ${formatChf(summen.total)}` : ''}.\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nFreundliche Grüsse\nTwyne`}
          apiUrl={`/api/crm/offerten/${offerte.id}/mail`}
          mailTyp="OFFERTE"
          onClose={() => setShowMail(false)}
          onSent={() => { setShowMail(false); onChanged() }}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          title="Offerte löschen?"
          text={`Offerte ${offerte.nr} wird unwiderruflich gelöscht.`}
          onConfirm={deleteOfferte}
          onCancel={() => setShowConfirm(false)}
          loading={deleting}
        />
      )}
      {!showConfirm && !showMail && (
        <Modal onClose={onClose} wide>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingRight: '24px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>Offerte {offerte.nr}</h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                {formatDatum(new Date(offerte.datum))} · Gültig bis {formatDatum(new Date(offerte.gueltigBis))}
              </p>
            </div>
            <OfferteStatusBadge status={offerte.status as any} />
          </div>

          {/* Status actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {st === 'ENTWURF' && (
              <button onClick={() => setStatus('VERSENDET')} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#0284C7', border: 'none', cursor: 'pointer' }}>
                <Send size={13} /> Als versendet markieren
              </button>
            )}
            {st === 'VERSENDET' && (
              <>
                <button onClick={() => setStatus('ANGENOMMEN')} type="button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#059669', border: 'none', cursor: 'pointer' }}>
                  <CheckCircle size={13} /> Angenommen
                </button>
                <button onClick={() => setStatus('ABGELEHNT')} type="button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#DC2626', border: 'none', cursor: 'pointer' }}>
                  <XCircle size={13} /> Abgelehnt
                </button>
              </>
            )}
            <button
              onClick={() => downloadPdf(`/api/crm/offerten/${offerte.id}/pdf`, `${offerte.nr}_Offerte.pdf`)}
              type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
              <Download size={13} /> PDF herunterladen
            </button>
            <button onClick={() => setShowMail(true)} type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
              <Mail size={13} /> Per Mail senden
            </button>
            {['ENTWURF', 'VERSENDET', 'ANGENOMMEN'].includes(st) && (
              <button onClick={alsRechnungUebernehmen} disabled={alsRechnung} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: alsRechnung ? '#A78BFA' : '#7C3AED', border: 'none', cursor: alsRechnung ? 'not-allowed' : 'pointer' }}>
                <RefreshCw size={13} /> Als Rechnung übernehmen
              </button>
            )}
            {st === 'ENTWURF' && (
              <button onClick={() => setShowConfirm(true)} type="button"
                style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#991B1B', background: 'white', border: '1px solid #FCA5A5', cursor: 'pointer' }}>
                <Trash2 size={13} /> Löschen
              </button>
            )}
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
            <p className="text-xs font-semibold text-[#374151] mb-3">Positionen</p>
            <PositionenEditorKern rows={rows} onRowsChange={setRows} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
            <button onClick={onClose} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
              Schliessen
            </button>
            <button onClick={savePositionen} disabled={saving} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: saving ? '#A78BFA' : '#7C3AED', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Speichert...' : 'Positionen speichern'}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

// ─── Create Rechnung Modal ────────────────────────────────────────────────────

function CreateRechnungModal({
  projektId, offerten, onClose, onCreated,
}: {
  projektId: string
  offerten: OfferteFull[]
  onClose: () => void
  onCreated: () => void
}) {
  const [datum, setDatum] = useState(todayStr())
  const [faelligBis, setFaelligBis] = useState(in30DaysStr())
  const [zahlungsreferenz, setZahlungsreferenz] = useState('')
  const [vonOfferteId, setVonOfferteId] = useState('')
  const [rows, setRows] = useState<PositionRow[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // When offerte is selected, pre-fill positions
  function handleOfferteSelect(offerteId: string) {
    setVonOfferteId(offerteId)
    if (offerteId) {
      const offerte = offerten.find((o) => o.id === offerteId)
      if (offerte) setRows(initialPositionenToRows(offerte.positionen))
    } else {
      setRows([])
    }
  }

  async function handleCreate() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/crm/projekte/${projektId}/rechnungen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datum, faelligBis,
          zahlungsreferenz: zahlungsreferenz || null,
          vonOfferteId: vonOfferteId || null,
          positionen: rowsToPayload(rows),
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Fehler')
      }
      onCreated()
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <Modal onClose={onClose} wide>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>Neue Rechnung erstellen</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className={labelCls}>Datum</label>
          <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Fällig am *</label>
          <input type="date" value={faelligBis} onChange={(e) => setFaelligBis(e.target.value)} className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>Zahlungsreferenz</label>
          <input value={zahlungsreferenz} onChange={(e) => setZahlungsreferenz(e.target.value)} className={inputCls} placeholder="Optional" />
        </div>
        {offerten.length > 0 && (
          <div>
            <label className={labelCls}>Von Offerte übernehmen</label>
            <select value={vonOfferteId} onChange={(e) => handleOfferteSelect(e.target.value)} className={inputCls}>
              <option value="">— Keine —</option>
              {offerten.map((o) => (
                <option key={o.id} value={o.id}>{o.nr} ({o.status})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px', marginBottom: '20px' }}>
        <p className="text-xs font-semibold text-[#374151] mb-3">Positionen</p>
        <PositionenEditorKern rows={rows} onRowsChange={setRows} />
      </div>

      {error && <p style={{ fontSize: '13px', color: '#DC2626', marginBottom: '12px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button onClick={onClose} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
          Abbrechen
        </button>
        <button onClick={handleCreate} disabled={saving || !faelligBis} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: saving ? '#A78BFA' : '#7C3AED', cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Erstelle...' : 'Rechnung erstellen'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Rechnung Detail Modal ────────────────────────────────────────────────────

function RechnungDetailModal({
  rechnung, emailAddress, onClose, onChanged,
}: {
  rechnung: RechnungFull
  emailAddress: string
  onClose: () => void
  onChanged: () => void
}) {
  const [rows, setRows] = useState<PositionRow[]>(() => initialPositionenToRows(rechnung.positionen))
  const [bezahltBetrag, setBezahltBetrag] = useState(rechnung.bezahltBetrag ? String(rechnung.bezahltBetrag) : '')
  const [saving, setSaving] = useState(false)
  const [savingZahlung, setSavingZahlung] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showMail, setShowMail] = useState(false)
  const [showZahlungserinnerung, setShowZahlungserinnerung] = useState(false)
  const [showMahnung, setShowMahnung] = useState(false)

  const { summen } = berechnePositionen(rechnung.positionen)

  async function savePositionen() {
    setSaving(true)
    await fetch(`/api/crm/rechnungen/${rechnung.id}/positionen`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ positionen: rowsToPayload(rows) }),
    })
    setSaving(false)
    onChanged()
  }

  async function setStatus(status: string) {
    await fetch(`/api/crm/rechnungen/${rechnung.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    onChanged()
  }

  async function saveZahlung() {
    setSavingZahlung(true)
    await fetch(`/api/crm/rechnungen/${rechnung.id}/zahlung`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bezahltBetrag: parseFloat(bezahltBetrag) || 0 }),
    })
    setSavingZahlung(false)
    onChanged()
  }

  async function deleteRechnung() {
    setDeleting(true)
    await fetch(`/api/crm/rechnungen/${rechnung.id}`, { method: 'DELETE' })
    setDeleting(false)
    onChanged()
  }

  const st = rechnung.status as string
  const isOverdue = !['BEZAHLT', 'TEILBEZAHLT'].includes(st) && new Date(rechnung.faelligBis) < new Date()

  return (
    <>
      {showMail && (
        <MailSendenModal
          defaultAn={emailAddress}
          defaultBetreff={`Rechnung ${rechnung.nr} — Twyne`}
          defaultInhalt={`Sehr geehrte Damen und Herren,\n\nanbei senden wir Ihnen die Rechnung ${rechnung.nr}${summen.total > 0 ? ` im Betrag von ${formatChf(summen.total)}` : ''}.\n\nZahlbar bis: ${new Date(rechnung.faelligBis).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}\nIBAN: CH25 8080 8004 3893 2201 6\n\nFreundliche Grüsse\nTwyne`}
          apiUrl={`/api/crm/rechnungen/${rechnung.id}/mail`}
          mailTyp="RECHNUNG"
          onClose={() => setShowMail(false)}
          onSent={() => { setShowMail(false); onChanged() }}
        />
      )}
      {showZahlungserinnerung && (
        <ZahlungserinnerungModal
          rechnung={rechnung}
          emailAddress={emailAddress}
          projektId={rechnung.projektId}
          onClose={() => setShowZahlungserinnerung(false)}
          onSent={() => { setShowZahlungserinnerung(false); onChanged() }}
        />
      )}
      {showMahnung && (
        <MahnungSendenModal
          rechnung={rechnung}
          emailAddress={emailAddress}
          onClose={() => setShowMahnung(false)}
          onSent={() => { setShowMahnung(false); onChanged() }}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          title="Rechnung löschen?"
          text={`Rechnung ${rechnung.nr} wird unwiderruflich gelöscht.`}
          onConfirm={deleteRechnung}
          onCancel={() => setShowConfirm(false)}
          loading={deleting}
        />
      )}
      {!showConfirm && !showMail && !showZahlungserinnerung && !showMahnung && (
        <Modal onClose={onClose} wide>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingRight: '24px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>Rechnung {rechnung.nr}</h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                {formatDatum(new Date(rechnung.datum))} · Fällig {formatDatum(new Date(rechnung.faelligBis))}
              </p>
            </div>
            <RechnungsStatusBadge status={rechnung.status as any} />
          </div>

          {/* Status actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {st === 'ENTWURF' && (
              <button onClick={() => setStatus('VERSENDET')} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#0284C7', border: 'none', cursor: 'pointer' }}>
                <Send size={13} /> Als versendet markieren
              </button>
            )}
            {st !== 'BEZAHLT' && (
              <button onClick={() => setStatus('BEZAHLT')} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#059669', border: 'none', cursor: 'pointer' }}>
                <CheckCircle size={13} /> Als bezahlt markieren
              </button>
            )}
            <button
              onClick={() => downloadPdf(`/api/crm/rechnungen/${rechnung.id}/pdf`, `${rechnung.nr}_Rechnung.pdf`)}
              type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
              <Download size={13} /> PDF herunterladen
            </button>
            <button onClick={() => setShowMail(true)} type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
              <Mail size={13} /> Per Mail senden
            </button>
            {st !== 'BEZAHLT' && (
              <button onClick={() => setShowZahlungserinnerung(true)} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#0284C7', background: 'rgba(2,132,199,0.06)', border: '1px solid rgba(2,132,199,0.2)', cursor: 'pointer' }}>
                <Send size={13} /> Zahlungserinnerung
              </button>
            )}
            {(isOverdue || ['MAHNUNG_1', 'MAHNUNG_2'].includes(st)) && st !== 'BEZAHLT' && (
              <button onClick={() => setShowMahnung(true)} type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#D97706', background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', cursor: 'pointer' }}>
                <AlertTriangle size={13} /> Mahnung senden
              </button>
            )}
            {['MAHNUNG_1', 'MAHNUNG_2'].includes(st) && (
              <button
                onClick={() => downloadPdf(`/api/crm/rechnungen/${rechnung.id}/pdf?typ=${st === 'MAHNUNG_1' ? 'mahnung1' : 'mahnung2'}`, `${rechnung.nr}_Mahnung${st === 'MAHNUNG_1' ? '1' : '2'}.pdf`)}
                type="button"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}>
                <Download size={13} /> Mahnung PDF
              </button>
            )}
            {st === 'ENTWURF' && (
              <button onClick={() => setShowConfirm(true)} type="button"
                style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#991B1B', background: 'white', border: '1px solid #FCA5A5', cursor: 'pointer' }}>
                <Trash2 size={13} /> Löschen
              </button>
            )}
          </div>

          {/* Zahlung */}
          {st !== 'BEZAHLT' && summen.total > 0 && (
            <div style={{ background: '#F8F9FA', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
                Zahlung erfassen — Total: {formatChf(summen.total)}
              </p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label className={labelCls}>Bezahlter Betrag (CHF)</label>
                  <input
                    type="number" min={0} step={0.01}
                    value={bezahltBetrag}
                    onChange={(e) => setBezahltBetrag(e.target.value)}
                    placeholder="0.00"
                    className={inputCls}
                  />
                </div>
                <button onClick={saveZahlung} disabled={savingZahlung} type="button"
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, color: 'white', background: savingZahlung ? '#A78BFA' : '#059669', cursor: savingZahlung ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
                  <CheckCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Speichern
                </button>
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
            <p className="text-xs font-semibold text-[#374151] mb-3">Positionen</p>
            <PositionenEditorKern rows={rows} onRowsChange={setRows} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
            <button onClick={onClose} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
              Schliessen
            </button>
            <button onClick={savePositionen} disabled={saving} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: saving ? '#A78BFA' : '#7C3AED', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Speichert...' : 'Positionen speichern'}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

// ─── Edit Projekt Modal ───────────────────────────────────────────────────────

const PROJEKT_STATI = [
  { value: 'ANGEBOT', label: 'Angebot' },
  { value: 'AKTIV', label: 'Aktiv' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'ABGESCHLOSSEN', label: 'Abgeschlossen' },
  { value: 'PAUSIERT', label: 'Pausiert' },
  { value: 'STORNIERT', label: 'Storniert' },
]

function EditProjektModal({
  projekt, onClose, onSaved,
}: {
  projekt: ProjektFull
  onClose: () => void
  onSaved: () => void
}) {
  const [name, setName] = useState(projekt.name)
  const [beschreibung, setBeschreibung] = useState(projekt.beschreibung ?? '')
  const [status, setStatus] = useState(projekt.status as string)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/crm/projekte/${projekt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, beschreibung: beschreibung || null, status }),
      })
      if (!res.ok) throw new Error('Fehler beim Speichern')
      onSaved()
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>Projekt bearbeiten</h2>
      <div className="space-y-3">
        <div>
          <label className={labelCls}>Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>Beschreibung</label>
          <textarea value={beschreibung} onChange={(e) => setBeschreibung(e.target.value)} rows={3} className={inputCls + ' resize-none'} />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
            {PROJEKT_STATI.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p style={{ fontSize: '13px', color: '#DC2626', marginTop: '12px' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button onClick={onClose} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
          Abbrechen
        </button>
        <button onClick={handleSave} disabled={saving || !name.trim()} type="button"
          style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: saving ? '#A78BFA' : '#7C3AED', cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Speichert...' : 'Speichern'}
        </button>
      </div>
    </Modal>
  )
}

// ─── Offerten Tab ─────────────────────────────────────────────────────────────

function OffertenTab({ projekt, onRefresh }: { projekt: ProjektFull; onRefresh: () => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [selected, setSelected] = useState<OfferteFull | null>(null)

  const { offerten } = projekt

  return (
    <div className="space-y-4">
      {showCreate && (
        <CreateOfferteModal
          projektId={projekt.id}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); onRefresh() }}
        />
      )}
      {selected && (
        <OfferteDetailModal
          offerte={selected}
          emailAddress={(projekt as any).kontaktEmail ?? projekt.kunde?.email ?? ''}
          onClose={() => setSelected(null)}
          onChanged={() => { setSelected(null); onRefresh() }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="text-sm font-bold text-[#111111]">Offerten ({offerten.length})</h3>
        <button
          onClick={() => setShowCreate(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#7C3AED', border: 'none', cursor: 'pointer' }}
          type="button"
        >
          <Plus size={14} /> Neue Offerte
        </button>
      </div>

      {offerten.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '14px' }}>
          Noch keine Offerten. Erstellen Sie die erste Offerte.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E8E8ED', background: '#F8F9FA' }}>
                {['Nr.', 'Datum', 'Betrag', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offerten.map((o) => {
                const { summen } = berechnePositionen(o.positionen)
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace', color: '#374151' }}>{o.nr}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>{formatDatum(new Date(o.datum))}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#111' }}>{summen.total > 0 ? formatChf(summen.total) : '—'}</td>
                    <td style={{ padding: '12px 16px' }}><OfferteStatusBadge status={o.status as any} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelected(o)}
                        style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', background: 'none', border: 'none', cursor: 'pointer' }}
                        type="button"
                      >
                        Öffnen →
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Rechnungen Tab ───────────────────────────────────────────────────────────

function RechnungenTab({ projekt, onRefresh }: { projekt: ProjektFull; onRefresh: () => void }) {
  const [showCreate, setShowCreate] = useState(false)
  const [selected, setSelected] = useState<RechnungFull | null>(null)

  const { rechnungen, offerten } = projekt

  return (
    <div className="space-y-4">
      {showCreate && (
        <CreateRechnungModal
          projektId={projekt.id}
          offerten={offerten}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); onRefresh() }}
        />
      )}
      {selected && (
        <RechnungDetailModal
          rechnung={selected}
          emailAddress={(projekt as any).kontaktEmail ?? projekt.kunde?.email ?? ''}
          onClose={() => setSelected(null)}
          onChanged={() => { setSelected(null); onRefresh() }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="text-sm font-bold text-[#111111]">Rechnungen ({rechnungen.length})</h3>
        <button
          onClick={() => setShowCreate(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#7C3AED', border: 'none', cursor: 'pointer' }}
          type="button"
        >
          <Plus size={14} /> Neue Rechnung
        </button>
      </div>

      {rechnungen.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '14px' }}>
          Noch keine Rechnungen. Erstellen Sie die erste Rechnung.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E8E8ED', background: '#F8F9FA' }}>
                {['Nr.', 'Datum', 'Fällig', 'Betrag', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rechnungen.map((r) => {
                const { summen } = berechnePositionen(r.positionen)
                const st = r.status as string
                const isBezahlt = st === 'BEZAHLT'
                const faelligDate = new Date(r.faelligBis)
                const isOverdue = !isBezahlt && faelligDate < new Date()
                const zahlungsLabel = isBezahlt ? 'Bezahlt' : isOverdue ? 'Überfällig' : 'Offen'
                const zahlungsStyle: React.CSSProperties = isBezahlt
                  ? { background: '#D1FAE5', color: '#065F46' }
                  : isOverdue
                    ? { background: '#FEE2E2', color: '#991B1B' }
                    : { background: '#F3F4F6', color: '#374151' }
                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace', color: '#374151' }}>{r.nr}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>{formatDatum(new Date(r.datum))}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontSize: '13px', color: isOverdue ? '#991B1B' : '#6B7280', marginBottom: '4px' }}>
                        {formatDatum(faelligDate)}
                      </p>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 7px', borderRadius: '99px', ...zahlungsStyle }}>
                        {zahlungsLabel}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#111' }}>{summen.total > 0 ? formatChf(summen.total) : '—'}</td>
                    <td style={{ padding: '12px 16px' }}><RechnungsStatusBadge status={r.status as any} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelected(r)}
                        style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', background: 'none', border: 'none', cursor: 'pointer' }}
                        type="button"
                      >
                        Öffnen →
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Übersicht Tab ────────────────────────────────────────────────────────────

function UebersichtTab({ projekt }: { projekt: ProjektFull }) {
  const latestOfferte = projekt.offerten[0] ?? null
  const latestRechnung = projekt.rechnungen[0] ?? null

  const offerteSumme = latestOfferte ? berechnePositionen(latestOfferte.positionen).summen.total : 0
  const rechnungSumme = latestRechnung ? berechnePositionen(latestRechnung.positionen).summen.total : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          label: 'Offerten',
          value: String(projekt.offerten.length),
          sub: latestOfferte ? `Letzte: ${latestOfferte.nr}` : 'Keine',
        },
        {
          label: 'Letzter Offertbetrag',
          value: offerteSumme > 0 ? formatChf(offerteSumme) : '—',
          sub: latestOfferte ? String(latestOfferte.status) : '—',
        },
        {
          label: 'Rechnungen',
          value: String(projekt.rechnungen.length),
          sub: latestRechnung ? `Letzte: ${latestRechnung.nr}` : 'Keine',
        },
        {
          label: 'Letzter Rechnungsbetrag',
          value: rechnungSumme > 0 ? formatChf(rechnungSumme) : '—',
          sub: latestRechnung ? String(latestRechnung.status).replace('_', ' ') : '—',
        },
      ].map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-[#E8E8ED] p-5">
          <p className="text-xs text-[#6B7280] mb-1">{card.label}</p>
          <p className="text-xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>{card.value}</p>
          <p className="text-xs text-[#9CA3AF] mt-1">{card.sub}</p>
        </div>
      ))}
      {projekt.beschreibung && (
        <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl border border-[#E8E8ED] p-5">
          <p className="text-xs font-semibold text-[#374151] mb-2">Beschreibung</p>
          <p className="text-sm text-[#6B7280] leading-relaxed">{projekt.beschreibung}</p>
        </div>
      )}
    </div>
  )
}

// ─── Mails Tab ────────────────────────────────────────────────────────────────

function MailsTab({ projekt, router }: { projekt: ProjektFull; router: ReturnType<typeof useRouter> }) {
  const defaultEmail = (projekt as any).kontaktEmail ?? projekt.kunde?.email ?? ''
  const [form, setForm] = useState({ an: defaultEmail, betreff: '', inhalt: '', typ: 'INDIVIDUELL' })
  const [sending, setSending] = useState(false)

  async function sendMail(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    const res = await fetch(`/api/crm/projekte/${projekt.id}/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ an: defaultEmail, betreff: '', inhalt: '', typ: 'INDIVIDUELL' })
      router.refresh()
    } else {
      alert('Fehler beim Senden')
    }
    setSending(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E8E8ED] p-5">
        <h3 className="text-sm font-bold text-[#111111] mb-4">Mail senden</h3>
        <form onSubmit={sendMail} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">An</label>
              <input required value={form.an} onChange={(e) => setForm({ ...form, an: e.target.value })}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">Typ</label>
              <select value={form.typ} onChange={(e) => setForm({ ...form, typ: e.target.value })}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]">
                <option value="INDIVIDUELL">Individuell</option>
                <option value="OFFERTE">Offerte</option>
                <option value="AUFTRAGSBESTAETIGUNG">Auftragsbestätigung</option>
                <option value="RECHNUNG">Rechnung</option>
                <option value="ZAHLUNGSERINNERUNG">Zahlungserinnerung</option>
                <option value="MAHNUNG_1">Mahnung 1</option>
                <option value="MAHNUNG_2">Mahnung 2</option>
                <option value="NACHFASSEN">Nachfassen</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1">Betreff</label>
            <input required value={form.betreff} onChange={(e) => setForm({ ...form, betreff: e.target.value })}
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1">Inhalt</label>
            <textarea required value={form.inhalt} onChange={(e) => setForm({ ...form, inhalt: e.target.value })}
              rows={6} className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED] resize-none font-mono" />
          </div>
          <button type="submit" disabled={sending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: '#7C3AED' }}>
            <Send size={14} />
            {sending ? 'Sende...' : 'Senden'}
          </button>
        </form>
      </div>

      {projekt.mails.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8E8ED]">
            <h3 className="text-sm font-bold text-[#111111]">Verlauf</h3>
          </div>
          <div className="divide-y divide-[#E8E8ED]">
            {projekt.mails.map((m) => (
              <div key={m.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">{m.betreff}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">An: {m.an} · {new Date(m.createdAt).toLocaleDateString('de-CH')}</p>
                  </div>
                  <span className="text-xs text-[#9CA3AF] shrink-0">{m.typ}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Notizen Tab ──────────────────────────────────────────────────────────────

function NotizenTab({ projekt, router }: { projekt: ProjektFull; router: ReturnType<typeof useRouter> }) {
  const [inhalt, setInhalt] = useState('')
  const [saving, setSaving] = useState(false)

  async function addNotiz(e: React.FormEvent) {
    e.preventDefault()
    if (!inhalt.trim()) return
    setSaving(true)
    await fetch(`/api/crm/projekte/${projekt.id}/notiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inhalt }),
    })
    setInhalt('')
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#E8E8ED] p-5">
        <form onSubmit={addNotiz} className="space-y-3">
          <textarea value={inhalt} onChange={(e) => setInhalt(e.target.value)}
            placeholder="Notiz schreiben..." rows={4}
            className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7C3AED] resize-none" />
          <button type="submit" disabled={saving || !inhalt.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: '#7C3AED' }}>
            <StickyNote size={14} />
            {saving ? 'Speichert...' : 'Notiz speichern'}
          </button>
        </form>
      </div>

      {projekt.notizen.length === 0 ? (
        <div className="text-center py-8 text-sm text-[#9CA3AF]">Noch keine Notizen.</div>
      ) : (
        <div className="space-y-3">
          {projekt.notizen.map((n) => (
            <div key={n.id} className="bg-[#FFFBEB] rounded-xl border border-[#FDE68A] p-4">
              <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{n.inhalt}</p>
              <p className="text-xs text-[#9CA3AF] mt-2">
                {new Date(n.createdAt).toLocaleDateString('de-CH', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Upload Link Modal ────────────────────────────────────────────────────────

function UploadLinkModal({
  projektId, defaultEmail, projektName, onClose, onSent,
}: {
  projektId: string
  defaultEmail: string
  projektName: string
  onClose: () => void
  onSent: () => void
}) {
  const defaultNachricht = `Guten Tag\n\nFür Ihr Projekt „${projektName}" benötigen wir Ihre Dateien (Logos, Bilder, Dokumente etc.). Bitte packen Sie alles in eine ZIP-Datei und laden Sie über folgenden Link hoch.\n\nMaximale Dateigrösse: 200 MB`
  const [an, setAn] = useState(defaultEmail)
  const [nachricht, setNachricht] = useState(defaultNachricht)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSend() {
    setSending(true)
    setError('')
    try {
      const res = await fetch(`/api/crm/projekte/${projektId}/upload-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ an, nachricht }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || 'Fehler beim Senden')
      }
      setSent(true)
      setTimeout(onSent, 1500)
    } catch (e: any) {
      setError(e.message)
      setSending(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle size={40} className="mx-auto mb-3 text-green-600" />
          <p className="font-semibold text-[#111111]">Link wurde gesendet</p>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>
            Upload-Link senden
          </h2>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>An</label>
              <input value={an} onChange={(e) => setAn(e.target.value)} className={inputCls} type="email" required />
            </div>
            <div>
              <label className={labelCls}>Nachricht</label>
              <textarea value={nachricht} onChange={(e) => setNachricht(e.target.value)} rows={7}
                className={inputCls + ' resize-none'} />
              <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                Der Upload-Link wird automatisch angehängt.
              </p>
            </div>
          </div>
          {error && <p style={{ fontSize: '13px', color: '#DC2626', marginTop: '12px' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button onClick={onClose} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 600, color: '#374151', background: 'white', cursor: 'pointer' }}>
              Abbrechen
            </button>
            <button onClick={handleSend} disabled={sending || !an || !nachricht} type="button"
              style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, color: 'white', background: sending ? '#A78BFA' : '#7C3AED', cursor: sending ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <LinkIcon size={14} />
              {sending ? 'Sende...' : 'Link senden'}
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}

// ─── Uploads Tab ──────────────────────────────────────────────────────────────

function UploadsTab({ projekt, onRefresh }: { projekt: ProjektFull; onRefresh: () => void }) {
  const [showModal, setShowModal] = useState(false)
  const emailAddress = (projekt as any).kontaktEmail ?? projekt.kunde?.email ?? ''

  const { uploads } = projekt

  return (
    <div className="space-y-4">
      {showModal && (
        <UploadLinkModal
          projektId={projekt.id}
          defaultEmail={emailAddress}
          projektName={projekt.name}
          onClose={() => setShowModal(false)}
          onSent={() => { setShowModal(false); onRefresh() }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="text-sm font-bold text-[#111111]">Uploads ({uploads.length})</h3>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'white', background: '#7C3AED', border: 'none', cursor: 'pointer' }}
          type="button"
        >
          <LinkIcon size={14} /> Upload-Link senden
        </button>
      </div>

      {uploads.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '14px' }}>
          Noch keine Uploads. Senden Sie einen Upload-Link an den Kunden.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E8E8ED', background: '#F8F9FA' }}>
                {['Datei', 'Grösse', 'Datum', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploads.map((u) => {
                const isVerfuegbar = u.status === 'HOCHGELADEN'
                const isAusstehend = u.status === 'AUSSTEHEND'
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>
                      {u.dateiname ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>
                      {u.dateigroesse ? formatFileSize(u.dateigroesse) : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6B7280' }}>
                      {new Date(u.createdAt).toLocaleDateString('de-CH')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {isVerfuegbar && (
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: '#D1FAE5', color: '#065F46' }}>
                          Verfügbar
                        </span>
                      )}
                      {isAusstehend && (
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: '#FEF3C7', color: '#92400E' }}>
                          Link gesendet
                        </span>
                      )}
                      {u.status === 'HERUNTERGELADEN' && (
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: '#F3F4F6', color: '#6B7280' }}>
                          Heruntergeladen
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      {isVerfuegbar && (
                        <a
                          href={`/api/uploads/${u.id}/download`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#7C3AED', textDecoration: 'none', padding: '5px 10px', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '6px' }}
                          onClick={onRefresh}
                        >
                          <Download size={12} /> Download
                        </a>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProjektCrmTabs({ projekt }: { projekt: ProjektFull }) {
  const [tab, setTab] = useState<Tab>('uebersicht')
  const [showEditProjekt, setShowEditProjekt] = useState(false)
  const [showDeleteProjekt, setShowDeleteProjekt] = useState(false)
  const [deletingProjekt, setDeletingProjekt] = useState(false)
  const router = useRouter()

  async function deleteProjekt() {
    setDeletingProjekt(true)
    await fetch(`/api/crm/projekte/${projekt.id}`, { method: 'DELETE' })
    router.push('/admin/projekte')
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'uebersicht', label: 'Übersicht', icon: <LayoutGrid size={15} /> },
    { key: 'offerten', label: `Offerten (${projekt.offerten.length})`, icon: <FileText size={15} /> },
    { key: 'rechnungen', label: `Rechnungen (${projekt.rechnungen.length})`, icon: <FileText size={15} /> },
    { key: 'mails', label: `Mails (${projekt.mails.length})`, icon: <Send size={15} /> },
    { key: 'notizen', label: `Notizen (${projekt.notizen.length})`, icon: <StickyNote size={15} /> },
    { key: 'uploads', label: `Uploads (${projekt.uploads.length})`, icon: <UploadIcon size={15} /> },
  ]

  return (
    <div>
      {showEditProjekt && (
        <EditProjektModal
          projekt={projekt}
          onClose={() => setShowEditProjekt(false)}
          onSaved={() => { setShowEditProjekt(false); router.refresh() }}
        />
      )}
      {showDeleteProjekt && (
        <ConfirmModal
          title="Projekt löschen?"
          text={`„${projekt.name}" und alle zugehörigen Daten werden unwiderruflich gelöscht.`}
          onConfirm={deleteProjekt}
          onCancel={() => setShowDeleteProjekt(false)}
          loading={deletingProjekt}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setShowEditProjekt(true)}
          type="button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #E5E7EB', cursor: 'pointer' }}
        >
          <Pencil size={13} /> Bearbeiten
        </button>
        <button
          onClick={() => setShowDeleteProjekt(true)}
          type="button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#991B1B', background: 'white', border: '1px solid #FCA5A5', cursor: 'pointer' }}
        >
          <Trash2 size={13} /> Löschen
        </button>
      </div>

      <div className="flex gap-1 bg-[#F4F4F6] p-1 rounded-xl mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: tab === t.key ? 'white' : 'transparent',
              color: tab === t.key ? '#7C3AED' : '#6B7280',
              boxShadow: tab === t.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'uebersicht' && <UebersichtTab projekt={projekt} />}
      {tab === 'offerten' && <OffertenTab projekt={projekt} onRefresh={() => router.refresh()} />}
      {tab === 'rechnungen' && <RechnungenTab projekt={projekt} onRefresh={() => router.refresh()} />}
      {tab === 'mails' && <MailsTab projekt={projekt} router={router} />}
      {tab === 'notizen' && <NotizenTab projekt={projekt} router={router} />}
      {tab === 'uploads' && <UploadsTab projekt={projekt} onRefresh={() => router.refresh()} />}
    </div>
  )
}
