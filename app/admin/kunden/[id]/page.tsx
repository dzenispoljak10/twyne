import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Globe, MapPin, FolderOpen, Plus } from 'lucide-react'
import { CrmProjektStatusBadge } from '@/components/admin/StatusBadge'
import { formatChf } from '@/lib/crm-helpers'
import NeuesProjektButton from './NeuesProjektButton'
import KundeEditForm from './KundeEditForm'

export const dynamic = 'force-dynamic'

export default async function KundeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const kunde = await prisma.kunde.findUnique({
    where: { id },
    include: {
      projekte: {
        orderBy: { updatedAt: 'desc' },
        include: {
          rechnungen: { include: { positionen: true } },
          offerten: { select: { nr: true }, orderBy: { createdAt: 'desc' }, take: 1 },
        },
      },
      mails: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  })
  if (!kunde) notFound()

  const totalUmsatz = kunde.projekte.reduce((sum, p) => {
    const bezahlt = p.rechnungen.filter((r) => r.status === 'BEZAHLT')
    return sum + bezahlt.reduce((s, r) => {
      return s + r.positionen.reduce((ps, pos) => ps + Number(pos.menge) * Number(pos.einzelpreis), 0)
    }, 0)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/admin/kunden"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#7C3AED] mb-3 transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
              {kunde.firma}
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              {kunde.vorname} {kunde.nachname}
            </p>
          </div>
          <NeuesProjektButton kundeId={kunde.id} kundeName={kunde.firma} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Kontakt + Stats */}
        <div className="space-y-4">
          {/* Kontakt */}
          <div className="bg-white rounded-xl border border-[#E8E8ED] p-5">
            <h2 className="text-sm font-bold text-[#111111] mb-4">Kontaktdaten</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-[#9CA3AF] shrink-0" />
                <a href={`mailto:${kunde.email}`} className="text-[#7C3AED] hover:underline truncate">
                  {kunde.email}
                </a>
              </div>
              {kunde.telefon && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-[#9CA3AF] shrink-0" />
                  <span className="text-[#374151]">{kunde.telefon}</span>
                </div>
              )}
              {kunde.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={14} className="text-[#9CA3AF] shrink-0" />
                  <a
                    href={kunde.website.startsWith('http') ? kunde.website : `https://${kunde.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] hover:underline truncate"
                  >
                    {kunde.website}
                  </a>
                </div>
              )}
              {kunde.adresse && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span className="text-[#374151] whitespace-pre-line">{kunde.adresse}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-[#E8E8ED] p-5">
            <h2 className="text-sm font-bold text-[#111111] mb-4">Übersicht</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Projekte gesamt</span>
                <span className="font-semibold text-[#111111]">{kunde.projekte.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Aktive Projekte</span>
                <span className="font-semibold text-[#111111]">
                  {kunde.projekte.filter((p) => p.status === 'AKTIV').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Umsatz (bezahlt)</span>
                <span className="font-semibold text-[#7C3AED]">{formatChf(totalUmsatz)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Kunde seit</span>
                <span className="text-[#374151]">
                  {new Date(kunde.createdAt).toLocaleDateString('de-CH')}
                </span>
              </div>
            </div>
          </div>

          {/* Notiz */}
          {kunde.notiz && (
            <div className="bg-[#FFFBEB] rounded-xl border border-[#FDE68A] p-4">
              <p className="text-xs font-semibold text-[#92400E] mb-1">Notiz</p>
              <p className="text-sm text-[#78350F] leading-relaxed">{kunde.notiz}</p>
            </div>
          )}

          {/* Bearbeiten */}
          <KundeEditForm kunde={kunde} />
        </div>

        {/* Right: Projekte */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E8ED] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#111111] flex items-center gap-2">
                <FolderOpen size={15} className="text-[#7C3AED]" />
                Projekte ({kunde.projekte.length})
              </h2>
            </div>
            {kunde.projekte.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-[#6B7280]">Noch keine Projekte.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E8ED]">
                {kunde.projekte.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/projekte/${p.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#F4F4F6] transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111111] hover:text-[#7C3AED] transition-colors">
                        {p.name}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {p.offerten[0] ? `Offerte: ${p.offerten[0].nr}` : 'Noch keine Offerte'}
                        {p.rechnungen.length > 0 ? ` · ${p.rechnungen.length} Rechnung${p.rechnungen.length > 1 ? 'en' : ''}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CrmProjektStatusBadge status={p.status as 'ANGEBOT' | 'AKTIV' | 'ABGESCHLOSSEN' | 'PAUSIERT' | 'STORNIERT'} />
                      <span className="text-xs text-[#9CA3AF]">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mails */}
          {kunde.mails.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8E8ED]">
                <h2 className="text-sm font-bold text-[#111111]">Letzte Mails</h2>
              </div>
              <div className="divide-y divide-[#E8E8ED]">
                {kunde.mails.map((m) => (
                  <div key={m.id} className="px-5 py-3">
                    <p className="text-sm font-medium text-[#374151]">{m.betreff}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      {new Date(m.createdAt).toLocaleDateString('de-CH')} · {m.an}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
