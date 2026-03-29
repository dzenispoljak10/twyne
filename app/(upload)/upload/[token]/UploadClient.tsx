'use client'
import { useState, useRef, useCallback } from 'react'
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, formatFileSize } from '@/lib/upload-utils'
import { Upload, CheckCircle, AlertCircle, FileArchive } from 'lucide-react'

type State = 'idle' | 'uploading' | 'success' | 'error'

export default function UploadClient({ token, projektName }: { token: string; projektName: string }) {
  const [state, setState] = useState<State>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function validateFile(file: File): string | null {
    if (!file.name.toLowerCase().endsWith('.zip')) return 'Nur ZIP-Dateien erlaubt (.zip)'
    if (file.size > MAX_FILE_SIZE_BYTES) return `Datei zu gross (max. ${MAX_FILE_SIZE_MB} MB)`
    return null
  }

  function handleFileSelect(file: File) {
    const err = validateFile(file)
    if (err) { setErrorMsg(err); return }
    setErrorMsg('')
    setSelectedFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  async function handleUpload() {
    if (!selectedFile) return
    setState('uploading')
    setProgress(0)
    setErrorMsg('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100))
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        setState('success')
      } else {
        let msg = 'Upload fehlgeschlagen'
        try { msg = JSON.parse(xhr.responseText).message || msg } catch {}
        setErrorMsg(msg)
        setState('error')
      }
    })

    xhr.addEventListener('error', () => {
      setErrorMsg('Netzwerkfehler — bitte versuchen Sie es erneut')
      setState('error')
    })

    xhr.open('POST', `/api/upload/${token}`)
    xhr.send(formData)
  }

  if (state === 'success') {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="34" fill="none" stroke="#D1FAE5" strokeWidth="4" />
            <circle cx="36" cy="36" r="34" fill="none" stroke="#059669" strokeWidth="4"
              strokeDasharray="213.6" strokeDashoffset="0"
              style={{ animation: 'dash 0.6s ease-in-out forwards' }} />
            <polyline points="22,36 32,46 50,28" fill="none" stroke="#059669" strokeWidth="4"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="40" strokeDashoffset="0"
              style={{ animation: 'check 0.3s 0.5s ease-in-out forwards' }} />
            <style>{`
              @keyframes dash { from { stroke-dashoffset: 213.6; } to { stroke-dashoffset: 0; } }
              @keyframes check { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
            `}</style>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#111111] mb-3">Erfolgreich hochgeladen!</h2>
        <p className="text-[#6B7280] leading-relaxed">
          Ihre Dateien wurden sicher übermittelt.<br />
          Wir melden uns in Kürze bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-[#111111] mb-1">Dateien hochladen</h1>
      <p className="text-sm text-[#6B7280] mb-6">Für Projekt: <span className="font-semibold text-[#374151]">{projektName}</span></p>

      {/* Drop zone */}
      <div
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer"
        style={{
          borderColor: isDragging ? '#7C3AED' : selectedFile ? '#059669' : '#D1D5DB',
          background: isDragging ? 'rgba(124,58,237,0.04)' : selectedFile ? 'rgba(5,150,105,0.04)' : '#FAFAFA',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleInputChange}
        />
        {selectedFile ? (
          <>
            <FileArchive size={40} className="mx-auto mb-3 text-green-600" />
            <p className="font-semibold text-[#111111] mb-1">{selectedFile.name}</p>
            <p className="text-sm text-[#6B7280]">{formatFileSize(selectedFile.size)}</p>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setErrorMsg('') }}
              className="mt-3 text-xs text-[#9CA3AF] hover:text-red-500 transition-colors"
              type="button"
            >
              Andere Datei wählen
            </button>
          </>
        ) : (
          <>
            <Upload size={40} className="mx-auto mb-3 text-[#9CA3AF]" />
            <p className="font-semibold text-[#374151] mb-1">ZIP-Datei hier ablegen oder klicken zum Auswählen</p>
            <p className="text-xs text-[#9CA3AF]">Maximale Dateigrösse: {MAX_FILE_SIZE_MB} MB · Nur .zip Dateien</p>
          </>
        )}
      </div>

      {/* Progress bar */}
      {state === 'uploading' && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-[#6B7280] mb-1">
            <span>Hochladen…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7C3AED] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle size={16} className="shrink-0" />
          {errorMsg}
          {state === 'error' && (
            <button onClick={() => { setState('idle'); setErrorMsg('') }} className="ml-auto text-xs underline">
              Erneut versuchen
            </button>
          )}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || state === 'uploading'}
        className="mt-5 w-full py-3 rounded-xl font-semibold text-white text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: '#7C3AED' }}
        type="button"
      >
        <CheckCircle size={16} />
        {state === 'uploading' ? 'Wird hochgeladen…' : 'Hochladen'}
      </button>
    </div>
  )
}
