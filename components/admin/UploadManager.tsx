'use client'
import { useState, useRef } from 'react'
import { Upload, CheckCircle, AlertCircle, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatFileSize } from '@/lib/upload-utils'

interface UploadItem {
  id: string
  dateiname: string
  dateigroesse: number
  createdAt: Date
  heruntergeladen: boolean
  heruntergeladenAm: Date | null
}

interface UploadManagerProps {
  uploads: UploadItem[]
  projektId?: string
  anfrageId?: string
}

export default function UploadManager({ uploads: initialUploads, projektId, anfrageId }: UploadManagerProps) {
  const [uploads, setUploads] = useState(initialUploads)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    if (!file.name.endsWith('.zip')) {
      setError('Nur ZIP-Dateien erlaubt.')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      setError('Datei zu gross. Maximum: 500 MB.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (projektId) formData.append('projektId', projektId)
      if (anfrageId) formData.append('anfrageId', anfrageId)
      const res = await fetch('/api/uploads', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload fehlgeschlagen')
      const data = await res.json()
      setUploads((prev) => [data.upload, ...prev])
    } catch {
      setError('Upload fehlgeschlagen. Bitte erneut versuchen.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-[#E8E8ED] rounded-xl p-8 text-center hover:border-[#7C3AED]/40 hover:bg-violet-50/30 transition-all cursor-pointer"
      >
        <Upload size={28} className="mx-auto text-[#6B7280] mb-3" />
        <p className="text-sm font-medium text-[#374151]">ZIP-Datei hochladen</p>
        <p className="text-xs text-[#6B7280] mt-1">Klicken oder Datei hierher ziehen · Max. 500 MB</p>
        <input
          ref={fileRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        />
      </div>

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-[#7C3AED]">
          <div className="w-4 h-4 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          Datei wird hochgeladen...
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {uploads.length === 0 && (
          <p className="text-sm text-[#6B7280] text-center py-4">Noch keine Dateien</p>
        )}
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#E8E8ED]"
          >
            <div className="flex items-center gap-3">
              {upload.heruntergeladen ? (
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
              ) : (
                <div className="w-4.5 h-4.5 rounded-full border-2 border-[#6B7280] flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-[#111111]">{upload.dateiname}</p>
                <p className="text-xs text-[#6B7280]">{formatFileSize(upload.dateigroesse)}</p>
              </div>
            </div>
            <a
              href={`/api/uploads/${upload.id}/download`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7C3AED] border border-[#7C3AED]/30 rounded-lg hover:bg-violet-50 transition-colors"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
