import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Globe, Phone, Building2, MessageSquare } from 'lucide-react'
import { AnfrageStatusBadge } from '@/components/admin/StatusBadge'
import AnfrageActions from './AnfrageActions'

export const dynamic = 'force-dynamic'

export default async function AnfrageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anfrage = await prisma.anfrage.findUnique({
    where: { id },
    include: {
      mails: { orderBy: { createdAt: 'desc' } },
      uploads: { orderBy: { createdAt: 'desc' } },
      projekt: true,
    },
  })

  if (!anfrage) notFound()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/admin/anfragen"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#7C3AED] mb-3 transition-colors"
          >
            <ArrowLeft size={16} />
            Zurück
          </Link>
          <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
            {anfrage.firma}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {anfrage.vorname} {anfrage.nachname} · Eingegangen am{' '}
            {new Date(anfrage.createdAt).toLocaleDateString('de-CH', {
              day: '2-digit', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <AnfrageStatusBadge status={anfrage.status as 'NEU' | 'IN_BEARBEITUNG' | 'ANGENOMMEN' | 'ABGELEHNT' | 'ARCHIVIERT'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kontaktdaten */}
          <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
            <h2 className="text-base font-bold text-[#111111] mb-4">Kontaktdaten</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 size={16} className="text-[#6B7280] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">Firma</p>
                  <p className="font-medium text-[#111111]">{anfrage.firma}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail size={16} className="text-[#6B7280] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">E-Mail</p>
                  <a href={`mailto:${anfrage.email}`} className="font-medium text-[#7C3AED] hover:underline">
                    {anfrage.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone size={16} className="text-[#6B7280] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#6B7280]">Telefon</p>
                  <p className="font-medium text-[#111111]">{anfrage.telefon}</p>
                </div>
              </div>
              {anfrage.website && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Globe size={16} className="text-[#6B7280] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Website</p>
                    <a href={anfrage.website} target="_blank" rel="noopener noreferrer" className="font-medium text-[#7C3AED] hover:underline">
                      {anfrage.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dienstleistungen + Budget */}
          <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
            <h2 className="text-base font-bold text-[#111111] mb-4">Anfrage-Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#6B7280] mb-2">Gewünschte Dienstleistungen</p>
                <div className="flex flex-wrap gap-2">
                  {anfrage.dienstleistung.map((d: string) => (
                    <span
                      key={d}
                      className="px-3 py-1 bg-violet-50 text-[#7C3AED] text-xs font-medium rounded-full border border-violet-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              {anfrage.budget && (
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Budget</p>
                  <p className="text-sm font-medium text-[#111111]">{anfrage.budget}</p>
                </div>
              )}
            </div>
          </div>

          {/* Nachricht */}
          <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-[#6B7280]" />
              <h2 className="text-base font-bold text-[#111111]">Nachricht</h2>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{anfrage.nachricht}</p>
          </div>

          {/* Mail-Historie */}
          {anfrage.mails.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
              <h2 className="text-base font-bold text-[#111111] mb-4">Mail-Historie</h2>
              <div className="space-y-3">
                {anfrage.mails.map((mail: { id: string; betreff: string; createdAt: Date; an: string }) => (
                  <div key={mail.id} className="p-4 bg-[#F4F4F6] rounded-lg border border-[#E8E8ED]">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-[#111111]">{mail.betreff}</p>
                      <p className="text-xs text-[#6B7280]">
                        {new Date(mail.createdAt).toLocaleDateString('de-CH')}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7280]">An: {mail.an}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions sidebar */}
        <div className="space-y-4">
          <AnfrageActions
            anfrageId={anfrage.id}
            status={anfrage.status}
            email={anfrage.email}
            vorname={anfrage.vorname}
            nachname={anfrage.nachname}
            projektId={anfrage.projekt?.id}
          />
        </div>
      </div>
    </div>
  )
}
