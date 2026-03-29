'use client'
import { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, Pencil, Trash2, Eye, EyeOff, X, Check, Loader2 } from 'lucide-react'
import { kategorieMeta, kategorieOptions } from '@/lib/portfolio-meta'

interface PortfolioItem {
  id: string
  name: string
  kategorie: string
  jahr: number
  beschreibung: string
  tags: string[]
  bildUrl: string | null
  thumbnailColor: string
  technologie: string
  reihenfolge: number
  sichtbar: boolean
  createdAt: string
  updatedAt: string
}

type ModalMode = 'create' | 'edit'

interface FormData {
  name: string
  kategorie: string
  jahr: number
  beschreibung: string
  tags: string[]
  bildUrl: string
  thumbnailColor: string
  technologie: string
  sichtbar: boolean
}

const defaultForm: FormData = {
  name: '',
  kategorie: 'WEBSEITEN',
  jahr: new Date().getFullYear(),
  beschreibung: '',
  tags: [],
  bildUrl: '',
  thumbnailColor: '#1a1a2e',
  technologie: '',
  sichtbar: true,
}

function SortableRow({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: PortfolioItem
  onEdit: (item: PortfolioItem) => void
  onDelete: (item: PortfolioItem) => void
  onToggle: (item: PortfolioItem) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const meta = kategorieMeta[item.kategorie] ?? { label: item.kategorie, color: '#7C3AED' }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        background: isDragging ? '#F4F4F6' : 'white',
        borderBottom: '1px solid #F0F0F5',
        borderRadius: isDragging ? '8px' : '0',
      }}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        style={{ cursor: 'grab', color: '#9CA3AF', padding: '2px', flexShrink: 0, background: 'none', border: 'none' }}
      >
        <GripVertical size={16} />
      </button>

      {/* Thumbnail */}
      {item.bildUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.bildUrl}
          alt={item.name}
          style={{ width: '52px', height: '36px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
        />
      ) : (
        <div style={{
          width: '52px', height: '36px', borderRadius: '6px', flexShrink: 0,
          background: item.thumbnailColor || `${meta.color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.12) 0%, transparent 70%)' }} />
        </div>
      )}

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        <p style={{ fontSize: '12px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.beschreibung.slice(0, 80)}{item.beschreibung.length > 80 ? '…' : ''}
        </p>
      </div>

      {/* Kategorie badge */}
      <span style={{
        padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
        background: `${meta.color}18`, color: meta.color, flexShrink: 0, whiteSpace: 'nowrap',
      }}>
        {meta.label}
      </span>

      {/* Jahr */}
      <span style={{ fontSize: '13px', color: '#6B7280', flexShrink: 0, width: '40px', textAlign: 'right' }}>
        {item.jahr}
      </span>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        <button
          onClick={() => onToggle(item)}
          title={item.sichtbar ? 'Ausblenden' : 'Einblenden'}
          style={{
            padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            background: 'transparent', color: item.sichtbar ? '#10B981' : '#9CA3AF',
          }}
        >
          {item.sichtbar ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button
          onClick={() => onEdit(item)}
          style={{ padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#6B7280' }}
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(item)}
          style={{ padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#EF4444' }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) onChange([...tags, val])
    setInput('')
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '3px 10px', background: '#F4F4F6', border: '1px solid #E8E8ED',
            borderRadius: '100px', fontSize: '12px', color: '#374151',
          }}>
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '0', lineHeight: 1 }}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder="Tag hinzufügen + Enter"
          style={{
            flex: 1, padding: '8px 12px', border: '1px solid #E8E8ED', borderRadius: '8px',
            fontSize: '13px', outline: 'none', color: '#111111', background: 'white',
          }}
        />
        <button
          type="button"
          onClick={add}
          style={{
            padding: '8px 14px', background: '#7C3AED', color: 'white', border: 'none',
            borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Check size={14} />
        </button>
      </div>
    </div>
  )
}

export default function PortfolioManager({ initialItems }: { initialItems: PortfolioItem[] }) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems)
  const [modal, setModal] = useState<{ mode: ModalMode; item?: PortfolioItem } | null>(null)
  const [form, setForm] = useState<FormData>(defaultForm)
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const openCreate = () => {
    setForm(defaultForm)
    setError('')
    setModal({ mode: 'create' })
  }

  const openEdit = (item: PortfolioItem) => {
    setForm({
      name: item.name,
      kategorie: item.kategorie,
      jahr: item.jahr,
      beschreibung: item.beschreibung,
      tags: item.tags,
      bildUrl: item.bildUrl ?? '',
      thumbnailColor: item.thumbnailColor || '#1a1a2e',
      technologie: item.technologie || '',
      sichtbar: item.sichtbar,
    })
    setError('')
    setModal({ mode: 'edit', item })
  }

  const closeModal = () => setModal(null)

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    const reordered = arrayMove(items, oldIndex, newIndex).map((item, idx) => ({
      ...item,
      reihenfolge: idx + 1,
    }))
    setItems(reordered)

    await fetch('/api/portfolio/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: reordered.map(({ id, reihenfolge }) => ({ id, reihenfolge })) }),
    })
  }, [items])

  const handleToggle = async (item: PortfolioItem) => {
    const updated = { ...item, sichtbar: !item.sichtbar }
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)))
    await fetch(`/api/portfolio/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sichtbar: updated.sichtbar }),
    })
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setSaving(true)
    await fetch(`/api/portfolio/${deleteTarget.id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id))
    setDeleteTarget(null)
    setSaving(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.beschreibung.trim()) {
      setError('Name und Beschreibung sind Pflichtfelder.')
      return
    }
    setSaving(true)
    setError('')

    try {
      const payload = {
        name: form.name.trim(),
        kategorie: form.kategorie,
        jahr: form.jahr,
        beschreibung: form.beschreibung.trim(),
        tags: form.tags,
        bildUrl: form.bildUrl.trim() || null,
        thumbnailColor: form.thumbnailColor || '#1a1a2e',
        technologie: form.technologie.trim(),
        sichtbar: form.sichtbar,
      }

      if (modal?.mode === 'create') {
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, reihenfolge: items.length + 1 }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(`${res.status}: ${JSON.stringify(body)}`)
        }
        const created = await res.json()
        setItems((prev) => [...prev, { ...created, createdAt: created.createdAt, updatedAt: created.updatedAt }])
      } else if (modal?.mode === 'edit' && modal.item) {
        const res = await fetch(`/api/portfolio/${modal.item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(`${res.status}: ${JSON.stringify(body)}`)
        }
        const updated = await res.json()
        setItems((prev) => prev.map((i) => (i.id === modal.item!.id ? { ...updated, createdAt: updated.createdAt, updatedAt: updated.updatedAt } : i)))
      }

      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern. Bitte erneut versuchen.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Portfolio
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            {items.length} Projekt{items.length !== 1 ? 'e' : ''} · Drag & Drop zum Sortieren
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', background: '#7C3AED', color: 'white',
            border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          Neues Projekt
        </button>
      </div>

      {/* Hint */}
      {items.length > 1 && (
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>
          Ziehen Sie Projekte um die Reihenfolge auf der Website zu ändern.
        </p>
      )}

      {/* List */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E8E8ED', overflow: 'hidden' }}>
        {items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
            Noch keine Projekte. Erstelle dein erstes Portfolio-Projekt.
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  onEdit={openEdit}
                  onDelete={setDeleteTarget}
                  onToggle={handleToggle}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '20px',
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', width: '100%', maxWidth: '560px',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #E8E8ED' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>
                {modal.mode === 'create' ? 'Neues Projekt' : 'Projekt bearbeiten'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Projektname *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="z.B. Helvetia Digital Platform"
                  style={{
                    width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                    borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Kategorie + Jahr row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Kategorie *
                  </label>
                  <select
                    value={form.kategorie}
                    onChange={(e) => setForm((f) => ({ ...f, kategorie: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                      borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                      background: 'white',
                    }}
                  >
                    {kategorieOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Jahr *
                  </label>
                  <input
                    type="number"
                    value={form.jahr}
                    onChange={(e) => setForm((f) => ({ ...f, jahr: parseInt(e.target.value) || f.jahr }))}
                    min={2000}
                    max={2035}
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                      borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Beschreibung */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Beschreibung *
                </label>
                <textarea
                  value={form.beschreibung}
                  onChange={(e) => setForm((f) => ({ ...f, beschreibung: e.target.value }))}
                  placeholder="Kurzbeschreibung des Projekts..."
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                    borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Bild URL + Thumbnail Color row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Bild-URL
                  </label>
                  <input
                    value={form.bildUrl}
                    onChange={(e) => setForm((f) => ({ ...f, bildUrl: e.target.value }))}
                    placeholder="https://... (optional — sonst Farbe)"
                    type="url"
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                      borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Farbe
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={form.thumbnailColor}
                      onChange={(e) => setForm((f) => ({ ...f, thumbnailColor: e.target.value }))}
                      style={{ width: '40px', height: '40px', border: '1px solid #E8E8ED', borderRadius: '8px', cursor: 'pointer', padding: '2px' }}
                    />
                    <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{form.thumbnailColor}</span>
                  </div>
                </div>
              </div>

              {/* Technologie */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Technologie
                </label>
                <input
                  value={form.technologie}
                  onChange={(e) => setForm((f) => ({ ...f, technologie: e.target.value }))}
                  placeholder="z.B. Next.js · PostgreSQL · Resend"
                  style={{
                    width: '100%', padding: '10px 12px', border: '1px solid #E8E8ED',
                    borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#111111',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Tags */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Tags
                </label>
                <TagInput tags={form.tags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
              </div>

              {/* Sichtbar toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, sichtbar: !f.sichtbar }))}
                  style={{
                    width: '40px', height: '22px', borderRadius: '11px', border: 'none',
                    cursor: 'pointer', position: 'relative', flexShrink: 0,
                    background: form.sichtbar ? '#7C3AED' : '#D1D5DB',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: form.sichtbar ? '21px' : '3px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: 'white', transition: 'left 0.2s',
                  }} />
                </button>
                <span style={{ fontSize: '13px', color: '#374151' }}>
                  {form.sichtbar ? 'Sichtbar auf der Website' : 'Ausgeblendet'}
                </span>
              </div>

              {error && (
                <p style={{ fontSize: '13px', color: '#EF4444', background: '#FEF2F2', padding: '10px 12px', borderRadius: '8px' }}>
                  {error}
                </p>
              )}

              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1, padding: '11px', border: '1px solid #E8E8ED', borderRadius: '10px',
                    fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'white', color: '#374151',
                  }}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    flex: 1, padding: '11px', background: '#7C3AED', color: 'white',
                    border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  }}
                >
                  {saving && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                  {modal.mode === 'create' ? 'Erstellen' : 'Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '20px',
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '28px',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>
              Projekt löschen?
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.5 }}>
              <strong style={{ color: '#111111' }}>{deleteTarget.name}</strong> wird unwiderruflich gelöscht.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{
                  flex: 1, padding: '10px', border: '1px solid #E8E8ED', borderRadius: '10px',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'white', color: '#374151',
                }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                style={{
                  flex: 1, padding: '10px', background: '#EF4444', color: 'white',
                  border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                }}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
