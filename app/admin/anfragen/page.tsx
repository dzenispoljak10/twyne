import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { AnfrageStatusBadge } from '@/components/admin/StatusBadge'
import { Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

type StatusFilter = 'alle' | 'NEU' | 'IN_BEARBEITUNG' | 'ANGENOMMEN' | 'ABGELEHNT'

const TABS: { value: StatusFilter; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'NEU', label: 'Neu' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'ANGENOMMEN', label: 'Angenommen' },
  { value: 'ABGELEHNT', label: 'Abgelehnt' },
]

export default async function AnfragenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const statusFilter = (params.status || 'alle') as StatusFilter

  const anfragen = await prisma.anfrage.findMany({
    where: statusFilter !== 'alle' ? { status: statusFilter as 'NEU' | 'IN_BEARBEITUNG' | 'ANGENOMMEN' | 'ABGELEHNT' } : undefined,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
          Anfragen
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">{anfragen.length} Anfragen</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-[#F4F4F6] rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/anfragen${tab.value !== 'alle' ? `?status=${tab.value}` : ''}`}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              statusFilter === tab.value
                ? 'bg-white text-[#111111] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
        {anfragen.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[#6B7280]">Keine Anfragen gefunden.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F4F4F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Firma / Person</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Dienstleistung</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden lg:table-cell">Datum</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8ED]">
              {anfragen.map((a) => (
                <tr key={a.id} className="hover:bg-[#F4F4F6] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/anfragen/${a.id}`} className="block">
                      <p className="text-sm font-semibold text-[#111111] hover:text-[#7C3AED] transition-colors">
                        {a.firma}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {a.vorname} {a.nachname} · {a.email}
                      </p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-[#374151]">
                      {a.dienstleistung[0]}
                      {a.dienstleistung.length > 1 && (
                        <span className="text-[#6B7280]"> +{a.dienstleistung.length - 1}</span>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                      <Calendar size={13} />
                      {new Date(a.createdAt).toLocaleDateString('de-CH')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <AnfrageStatusBadge status={a.status as 'NEU' | 'IN_BEARBEITUNG' | 'ANGENOMMEN' | 'ABGELEHNT' | 'ARCHIVIERT'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
