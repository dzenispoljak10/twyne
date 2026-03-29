'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'

interface Notiz {
  id: string
  createdAt: Date
  inhalt: string
}

interface NotizenEditorProps {
  projektId: string
  initialNotizen: Notiz[]
}

export default function NotizenEditor({ projektId, initialNotizen }: NotizenEditorProps) {
  const [notizen, setNotizen] = useState(initialNotizen)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function addNotiz() {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/projekte/${projektId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notiz: text }),
      })
      if (res.ok) {
        const data = await res.json()
        setNotizen(data.notizen || [])
        setText('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Notiz hinzufügen..."
          className="w-full px-4 py-3 rounded-lg border border-[#E8E8ED] text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
        />
        <div className="mt-2 flex justify-end">
          <Button size="sm" onClick={addNotiz} loading={loading} disabled={!text.trim()}>
            Notiz speichern
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notizen.length === 0 && (
          <p className="text-sm text-[#6B7280] text-center py-4">Noch keine Notizen</p>
        )}
        {notizen.map((notiz) => (
          <div key={notiz.id} className="bg-[#F4F4F6] rounded-lg p-4 border border-[#E8E8ED]">
            <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{notiz.inhalt}</p>
            <p className="text-xs text-[#6B7280] mt-2">
              {formatDistanceToNow(new Date(notiz.createdAt), { addSuffix: true, locale: de })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
