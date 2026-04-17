import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ProjektStatusBadge } from '@/components/admin/StatusBadge'
import { Calendar, FolderOpen } from 'lucide-react'
import NeuesProjektButton from './NeuesProjektButton'
import ProjektAktionen from './ProjektAktionen'

export const dynamic = 'force-dynamic'

const STATUS_TABS = [
  { key: 'alle', label: 'Alle' },
  { key: 'AKTIV', label: 'Aktiv' },
  { key: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { key: 'ABGESCHLOSSEN', label: 'Abgeschlossen' },
  { key: 'STORNIERT', label: 'Storniert' },
] as const

export default async function ProjektePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const filterStatus = status && status !== 'alle' ? status : undefined

  const [projekte, kunden] = await Promise.all([
    prisma.projekt.findMany({
      where: filterStatus ? { status: filterStatus as any } : undefined,
      orderBy: { updatedAt: 'desc' },
      include: {
        kunde: { select: { id: true, firma: true, vorname: true, nachname: true } },
        anfrage: { select: { id: true } },
        offerten: {
          include: { positionen: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    }),
    prisma.kunde.findMany({
      orderBy: { firma: 'asc' },
      select: { id: true, firma: true, vorname: true, nachname: true },
    }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
            Projekte
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">{projekte.length} Projekte</p>
        </div>
        <NeuesProjektButton kunden={kunden} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#F4F4F6] p-1 rounded-xl w-fit">
        {STATUS_TABS.map((tab) => {
          const isActive = (status || 'alle') === tab.key
          return (
            <Link
              key={tab.key}
              href={`/admin/projekte?status=${tab.key}`}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: isActive ? 'white' : 'transparent',
                color: isActive ? '#7C3AED' : '#6B7280',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
        {projekte.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FolderOpen size={32} className="mx-auto mb-3 text-[#D1D5DB]" />
            <p className="text-sm text-[#6B7280]">Keine Projekte in dieser Kategorie.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F4F4F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Projekt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Kunde / Kontakt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden lg:table-cell">Aktualisiert</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8ED]">
              {projekte.map((p) => {
                const kontakt = p.kunde
                  ? `${p.kunde.firma} · ${p.kunde.vorname} ${p.kunde.nachname}`
                  : p.kontaktFirma
                    ? `${p.kontaktFirma} · ${p.kontaktVorname} ${p.kontaktNachname}`
                    : null
                const ausAnfrage = !!p.anfrage

                return (
                  <tr key={p.id} className="hover:bg-[#F4F4F6] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/projekte/${p.id}`} className="block">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#111111] hover:text-[#7C3AED] transition-colors">
                            {p.name}
                          </p>
                          {ausAnfrage && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-violet-50 text-[#7C3AED] border border-violet-200">
                              Aus Anfrage
                            </span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-sm text-[#6B7280]">{kontakt ?? '—'}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                        <Calendar size={13} />
                        {new Date(p.updatedAt).toLocaleDateString('de-CH')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ProjektStatusBadge status={p.status as any} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ProjektAktionen projektId={p.id} projektName={p.name} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
