'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, X, Check, AlertCircle, Pencil } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PositionRow {
  _key: string
  id: string | null
  beschreibung: string
  menge: number | string
  einheit: string
  einzelpreis: number | string
  reihenfolge: number
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESET_GROUPS = [
  {
    label: 'Webseiten & Design',
    items: [
      'Webdesign & Konzeption',
      'Frontend-Entwicklung',
      'Backend-Entwicklung',
      'CMS-Integration',
      'Responsive Optimierung',
      'Logo & Branding',
    ],
  },
  {
    label: 'SEO',
    items: [
      'SEO-Audit',
      'Keyword-Recherche',
      'On-Page Optimierung',
      'Content-Erstellung (pro Artikel)',
      'Google Business Optimierung',
      'Monatliche SEO-Betreuung',
    ],
  },
  {
    label: 'Webapplikationen',
    items: [
      'Anforderungsanalyse',
      'UI/UX Design',
      'Datenbankentwicklung',
      'API-Entwicklung',
      'Testing & QA',
      'Deployment & Setup',
    ],
  },
  {
    label: 'Software',
    items: [
      'Softwareentwicklung',
      'Installation & Konfiguration',
      'Schulung & Einführung',
      'Support & Wartung (pro Monat)',
    ],
  },
  {
    label: 'KI & Beratung',
    items: [
      'KI-Beratung & Analyse',
      'KI-Integration',
      'Strategieberatung',
      'Workshop (pro Tag)',
    ],
  },
  {
    label: 'Allgemein',
    items: [
      'Projektmanagement',
      'Dokumentation',
      'Spesen & Reisekosten',
      'Hosting (pro Monat)',
      'Domain (pro Jahr)',
      'Support-Pauschale',
    ],
  },
]

const EINHEITEN = ['Std.', 'Tage', 'Pauschal', 'Stk.', '%']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return 'CHF ' + new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

function toNum(v: { toNumber?: () => number } | number | string): number {
  if (typeof v === 'object' && v !== null && typeof v.toNumber === 'function') return v.toNumber()
  const n = typeof v === 'string' ? parseFloat(v) : (v as number)
  return isNaN(n) ? 0 : n
}

function safeNum(v: number | string): number {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return isNaN(n) ? 0 : n
}

export function initialPositionenToRows(
  positionen: Array<{
    id: string
    beschreibung: string
    menge: { toNumber?: () => number } | number | string
    einheit: string
    einzelpreis: { toNumber?: () => number } | number | string
    reihenfolge: number
  }>
): PositionRow[] {
  return positionen.map((p) => ({
    _key: p.id,
    id: p.id,
    beschreibung: p.beschreibung,
    menge: toNum(p.menge),
    einheit: p.einheit,
    einzelpreis: toNum(p.einzelpreis),
    reihenfolge: p.reihenfolge,
  }))
}

// ─── Sortable Row ─────────────────────────────────────────────────────────────

function SortableRow({
  row,
  onChange,
  onDelete,
}: {
  row: PositionRow
  onChange: (key: string, field: keyof PositionRow, value: string | number) => void
  onDelete: (key: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row._key })

  const gesamt = safeNum(row.menge) * safeNum(row.einzelpreis)

  const rowStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: 'grid',
    gridTemplateColumns: '28px 1fr 70px 90px 110px 90px 28px',
    gap: '8px',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #F3F4F6',
    background: isDragging ? '#FAFBFF' : 'transparent',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    padding: '5px 8px',
    fontSize: '13px',
    color: '#111',
    background: 'white',
    outline: 'none',
  }

  return (
    <div ref={setNodeRef} style={rowStyle}>
      <button
        {...attributes}
        {...listeners}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', color: '#D1D5DB', padding: '2px', display: 'flex', alignItems: 'center' }}
        type="button"
        tabIndex={-1}
      >
        <GripVertical size={16} />
      </button>

      <input
        value={row.beschreibung}
        onChange={(e) => onChange(row._key, 'beschreibung', e.target.value)}
        placeholder="Beschreibung"
        style={inputStyle}
      />

      <input
        type="number"
        min={0}
        step={0.5}
        value={row.menge === '' ? '' : row.menge}
        onChange={(e) => onChange(row._key, 'menge', e.target.value === '' ? '' : parseFloat(e.target.value))}
        style={{ ...inputStyle, textAlign: 'right' }}
      />

      <select
        value={row.einheit}
        onChange={(e) => onChange(row._key, 'einheit', e.target.value)}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {EINHEITEN.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      <input
        type="number"
        min={0}
        step={0.01}
        value={row.einzelpreis === '' ? '' : row.einzelpreis}
        onChange={(e) => onChange(row._key, 'einzelpreis', e.target.value === '' ? '' : parseFloat(e.target.value))}
        placeholder="0.00"
        style={{ ...inputStyle, textAlign: 'right' }}
      />

      <div style={{ fontSize: '13px', color: '#374151', fontWeight: 600, textAlign: 'right', paddingRight: '4px' }}>
        {fmt(gesamt)}
      </div>

      <button
        type="button"
        onClick={() => onDelete(row._key)}
        style={{ color: '#D1D5DB', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '2px' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#D1D5DB')}
      >
        <X size={15} />
      </button>
    </div>
  )
}

// ─── Presets Dropdown ─────────────────────────────────────────────────────────

function PresetsDropdown({ onSelect, onCustom }: { onSelect: (b: string) => void; onCustom: () => void }) {
  const groupLabelStyle: React.CSSProperties = {
    padding: '8px 16px 4px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    background: '#F8F9FA',
  }
  const itemStyle: React.CSSProperties = {
    padding: '10px 16px',
    fontSize: '13px',
    color: '#111',
    cursor: 'pointer',
    transition: 'background 0.1s',
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 0,
        zIndex: 50,
        background: 'white',
        border: '1px solid #EFEFEF',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        maxHeight: '340px',
        overflowY: 'auto',
        minWidth: '280px',
      }}
    >
      {PRESET_GROUPS.map((group) => (
        <div key={group.label}>
          <div style={groupLabelStyle}>{group.label}</div>
          {group.items.map((item) => (
            <div
              key={item}
              style={itemStyle}
              onClick={() => onSelect(item)}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F9FA')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
      <div style={{ borderTop: '1px solid #EFEFEF' }}>
        <div style={groupLabelStyle}>Freie Eingabe</div>
        <div
          style={{ ...itemStyle, color: '#7C3AED', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={onCustom}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F9FA')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Pencil size={13} />
          Eigene Position eingeben
        </div>
      </div>
    </div>
  )
}

// ─── Totals Block ─────────────────────────────────────────────────────────────

function TotalsBlock({ rows }: { rows: PositionRow[] }) {
  const totals = useMemo(() => {
    const netto = rows.reduce((s, r) => s + safeNum(r.menge) * safeNum(r.einzelpreis), 0)
    const mwst = netto * 0.081
    return { netto, mwst, total: netto + mwst }
  }, [rows])

  if (rows.length === 0) return null

  return (
    <div style={{ maxWidth: '320px', marginLeft: 'auto', borderTop: '2px solid #F0F0F0', paddingTop: '16px', marginTop: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: '#6B7280', fontSize: '14px' }}>Nettobetrag</span>
        <span style={{ color: '#111', fontSize: '14px' }}>{fmt(totals.netto)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: '#6B7280', fontSize: '14px' }}>MWST 8.1%</span>
        <span style={{ color: '#111', fontSize: '14px' }}>{fmt(totals.mwst)}</span>
      </div>
      <div style={{ borderTop: '1px solid #E8E8ED', margin: '8px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#111', fontSize: '16px', fontWeight: 700 }}>Total</span>
        <span style={{ color: '#111', fontSize: '20px', fontWeight: 800 }}>{fmt(totals.total)}</span>
      </div>
    </div>
  )
}

// ─── Shared table header ──────────────────────────────────────────────────────

function TableHeader() {
  const thStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr 70px 90px 110px 90px 28px',
        gap: '8px',
        padding: '8px 0',
        borderBottom: '1px solid #E5E7EB',
        marginBottom: '2px',
      }}
    >
      <div />
      <div style={thStyle}>Beschreibung</div>
      <div style={{ ...thStyle, textAlign: 'right' }}>Menge</div>
      <div style={{ ...thStyle, textAlign: 'center' }}>Einheit</div>
      <div style={{ ...thStyle, textAlign: 'right' }}>EP CHF</div>
      <div style={{ ...thStyle, textAlign: 'right' }}>Gesamt CHF</div>
      <div />
    </div>
  )
}

// ─── Shared DnD + row logic ───────────────────────────────────────────────────

function PositionenTable({
  rows,
  onRowsChange,
}: {
  rows: PositionRow[]
  onRowsChange: (rows: PositionRow[]) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )
  const keyCounterRef = useRef(Date.now())

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      onRowsChange(
        (() => {
          const oldIdx = rows.findIndex((i) => i._key === active.id)
          const newIdx = rows.findIndex((i) => i._key === over.id)
          return arrayMove(rows, oldIdx, newIdx)
        })()
      )
    }
  }

  function updateRow(key: string, field: keyof PositionRow, value: string | number) {
    onRowsChange(rows.map((r) => (r._key === key ? { ...r, [field]: value } : r)))
  }

  function deleteRow(key: string) {
    onRowsChange(rows.filter((r) => r._key !== key))
  }

  function addRow(beschreibung: string) {
    const key = String(++keyCounterRef.current)
    onRowsChange([
      ...rows,
      { _key: key, id: null, beschreibung, menge: 1, einheit: 'Std.', einzelpreis: 0, reihenfolge: rows.length },
    ])
  }

  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div>
      <TableHeader />

      {rows.length === 0 ? (
        <div style={{ padding: '24px 0', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
          Noch keine Positionen. Fügen Sie Positionen hinzu.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows.map((r) => r._key)} strategy={verticalListSortingStrategy}>
            {rows.map((row) => (
              <SortableRow key={row._key} row={row} onChange={updateRow} onDelete={deleteRow} />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', marginTop: '12px' }}>
        <button
          type="button"
          onClick={() => setShowDropdown((v) => !v)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            border: '1px dashed #D1D5DB',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#7C3AED',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#7C3AED')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#D1D5DB')}
        >
          <Plus size={14} />
          Position hinzufügen
        </button>
        {showDropdown && (
          <PresetsDropdown
            onSelect={(b) => { addRow(b); setShowDropdown(false) }}
            onCustom={() => { addRow(''); setShowDropdown(false) }}
          />
        )}
      </div>

      {rows.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <TotalsBlock rows={rows} />
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── PositionenEditorKern (controlled, no save button) ────────────────────────

export function PositionenEditorKern({
  rows,
  onRowsChange,
}: {
  rows: PositionRow[]
  onRowsChange: (rows: PositionRow[]) => void
}) {
  return <PositionenTable rows={rows} onRowsChange={onRowsChange} />
}

// ─── PositionenEditor (standalone with save) ──────────────────────────────────

interface EditorProps {
  apiPath: string
  initialPositionen: Array<{
    id: string
    beschreibung: string
    menge: { toNumber?: () => number } | number | string
    einheit: string
    einzelpreis: { toNumber?: () => number } | number | string
    reihenfolge: number
  }>
  onSaved?: () => void
}

export default function PositionenEditor({ apiPath, initialPositionen, onSaved }: EditorProps) {
  const [rows, setRows] = useState<PositionRow[]>(() => initialPositionenToRows(initialPositionen))
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null)

  async function handleSave() {
    setSaving(true)
    setSaveStatus(null)
    try {
      const res = await fetch(apiPath, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positionen: rows.map((r, i) => ({
            beschreibung: r.beschreibung,
            menge: safeNum(r.menge) || 1,
            einheit: r.einheit,
            einzelpreis: safeNum(r.einzelpreis),
            reihenfolge: i,
          })),
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setRows(
        data.positionen.map((p: any) => ({
          _key: p.id,
          id: p.id,
          beschreibung: p.beschreibung,
          menge: Number(p.menge),
          einheit: p.einheit,
          einzelpreis: Number(p.einzelpreis),
          reihenfolge: p.reihenfolge,
        }))
      )
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 2500)
      onSaved?.()
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PositionenTable rows={rows} onRowsChange={setRows} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || rows.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            background: saving ? '#A78BFA' : '#7C3AED',
            border: 'none',
            cursor: saving || rows.length === 0 ? 'not-allowed' : 'pointer',
            opacity: rows.length === 0 ? 0.4 : 1,
          }}
        >
          {saving ? (
            <>
              <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              Speichert...
            </>
          ) : (
            'Speichern'
          )}
        </button>

        {saveStatus === 'success' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: 600 }}>
            <Check size={15} />
            Gespeichert ✓
          </div>
        )}
        {saveStatus === 'error' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontSize: '13px', fontWeight: 600 }}>
            <AlertCircle size={15} />
            Fehler beim Speichern
          </div>
        )}
      </div>
    </div>
  )
}
