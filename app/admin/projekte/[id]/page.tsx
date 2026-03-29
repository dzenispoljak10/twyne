import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProjektStatusBadge } from '@/components/admin/StatusBadge'
import ProjektCrmTabs from '@/app/admin/crm/projekte/[id]/ProjektCrmTabs'

export const dynamic = 'force-dynamic'

export default async function ProjektDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projekt = await prisma.projekt.findUnique({
    where: { id },
    include: {
      kunde: true,
      anfrage: { select: { id: true, firma: true, vorname: true, nachname: true } },
      offerten: {
        include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      },
      rechnungen: {
        include: { positionen: { orderBy: { reihenfolge: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      },
      mails: { orderBy: { createdAt: 'desc' } },
      notizen: { orderBy: { createdAt: 'desc' } },
      uploads: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!projekt) notFound()

  // Prisma Decimal objects can't cross the server→client boundary — serialize to plain JS
  const projektSerialized = JSON.parse(JSON.stringify(projekt))

  const ausAnfrage = !!projekt.anfrage

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/projekte"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#7C3AED] mb-3 transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück zu Projekten
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
                {projekt.name}
              </h1>
              <ProjektStatusBadge status={projekt.status as any} />
              {ausAnfrage && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-[#7C3AED] border border-violet-200">
                  Aus Anfrage
                </span>
              )}
            </div>
            {projekt.kunde ? (
              <Link
                href={`/admin/kunden/${projekt.kunde.id}`}
                className="text-sm text-[#7C3AED] hover:underline mt-0.5 inline-block"
              >
                {projekt.kunde.firma} — {projekt.kunde.vorname} {projekt.kunde.nachname}
              </Link>
            ) : projekt.kontaktFirma ? (
              <p className="text-sm text-[#6B7280] mt-0.5">
                {projekt.kontaktFirma} — {projekt.kontaktVorname} {projekt.kontaktNachname}
              </p>
            ) : null}
            {ausAnfrage && (
              <Link
                href={`/admin/anfragen/${projekt.anfrage!.id}`}
                className="text-xs text-[#9CA3AF] hover:text-[#7C3AED] mt-0.5 inline-block transition-colors"
              >
                → Ursprüngliche Anfrage anzeigen
              </Link>
            )}
          </div>
        </div>
      </div>

      <ProjektCrmTabs projekt={projektSerialized} />
    </div>
  )
}
