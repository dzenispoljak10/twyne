import { prisma } from '@/lib/prisma'
import UploadClient from './UploadClient'

export const dynamic = 'force-dynamic'

export default async function UploadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const upload = await prisma.upload.findUnique({
    where: { token },
    include: { projekt: { select: { name: true } } },
  })

  if (!upload) {
    return (
      <UploadShell>
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-2xl font-bold text-[#111111] mb-3">Link nicht gültig</h1>
          <p className="text-[#6B7280] text-base">Dieser Upload-Link ist nicht gültig oder wurde nicht gefunden.</p>
        </div>
      </UploadShell>
    )
  }

  if (upload.status !== 'AUSSTEHEND') {
    return (
      <UploadShell>
        <div className="text-center py-16">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-[#111111] mb-3">Bereits hochgeladen</h1>
          <p className="text-[#6B7280] text-base">
            Diese Datei wurde bereits hochgeladen. Bitte kontaktieren Sie uns für einen neuen Link.
          </p>
        </div>
      </UploadShell>
    )
  }

  return (
    <UploadShell>
      <UploadClient token={token} projektName={upload.projekt?.name ?? 'Ihr Projekt'} />
    </UploadShell>
  )
}

function UploadShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F4F6] flex flex-col">
      <header className="bg-white border-b border-[#E8E8ED] px-6 py-4">
        <div className="max-w-lg mx-auto">
          <TwyneLogo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E8E8ED] shadow-sm p-8">
          {children}
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} Twyne — Sichere Dateiübertragung
      </footer>
    </div>
  )
}

function TwyneLogo() {
  return (
    <svg width="110" height="26" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="16" r="9" fill="none" stroke="#7C3AED" strokeWidth="2.5"/>
      <circle cx="32" cy="16" r="9" fill="none" stroke="#A78BFA" strokeWidth="2.5"/>
      <line x1="21" y1="16" x2="23" y2="16" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="3" fill="#7C3AED"/>
      <circle cx="32" cy="16" r="3" fill="#A78BFA"/>
      <text x="50" y="22" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="22" fill="#111111" letterSpacing="-1">twyne</text>
    </svg>
  )
}
