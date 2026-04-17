'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function ProjektAktionen({ projektId, projektName }: { projektId: string; projektName: string }) {
  const [confirm, setConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDeleting(true)
    await fetch(`/api/crm/projekte/${projektId}`, { method: 'DELETE' })
    router.refresh()
  }

  if (confirm) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.preventDefault()}>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>Löschen?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}
          type="button"
        >
          {deleting ? '...' : 'Ja'}
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirm(false) }}
          style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
          type="button"
        >
          Nein
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirm(true) }}
      title={`${projektName} löschen`}
      style={{ color: '#D1D5DB', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}
      type="button"
    >
      <Trash2 size={14} />
    </button>
  )
}
