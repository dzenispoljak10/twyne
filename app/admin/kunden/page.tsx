import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Building2, Plus, Mail, FolderOpen } from 'lucide-react'
import NeuerKundeButton from './NeuerKundeButton'

export const dynamic = 'force-dynamic'

export default async function KundenPage() {
  const kunden = await prisma.kunde.findMany({
    orderBy: { firma: 'asc' },
    include: {
      _count: { select: { projekte: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
            Kunden
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">{kunden.length} Kunden</p>
        </div>
        <NeuerKundeButton />
      </div>

      <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
        {kunden.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Building2 size={32} className="mx-auto mb-3 text-[#D1D5DB]" />
            <p className="text-sm font-medium text-[#374151]">Noch keine Kunden</p>
            <p className="text-xs text-[#6B7280] mt-1">
              Erstellen Sie einen neuen Kunden oder konvertieren Sie einen Lead.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F4F4F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Kunde</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Kontakt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Projekte</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8ED]">
              {kunden.map((k) => (
                <tr key={k.id} className="hover:bg-[#F4F4F6] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/kunden/${k.id}`} className="block">
                      <p className="text-sm font-semibold text-[#111111] hover:text-[#7C3AED] transition-colors">
                        {k.firma}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {k.vorname} {k.nachname}
                      </p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Mail size={12} />
                      {k.email}
                    </div>
                    {k.website && (
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{k.website}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-[#374151]">
                      <FolderOpen size={14} className="text-[#7C3AED]" />
                      {k._count.projekte}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/kunden/${k.id}`}
                      className="text-xs text-[#7C3AED] hover:underline font-medium"
                    >
                      Öffnen →
                    </Link>
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
