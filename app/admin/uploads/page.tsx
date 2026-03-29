import { prisma } from '@/lib/prisma'
import { formatFileSize } from '@/lib/upload'
import Link from 'next/link'
import { Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function UploadsPage() {
  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      anfrage: { select: { id: true, firma: true } },
      projekt: { select: { id: true, name: true } },
    },
  })

  const verfuegbar = uploads.filter((u) => u.status === 'HOCHGELADEN').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>Uploads</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          {uploads.length} Einträge{verfuegbar > 0 ? ` · ${verfuegbar} zum Herunterladen bereit` : ''}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
        {uploads.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[#6B7280]">Keine Uploads vorhanden.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F4F4F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Datei</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Projekt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8ED]">
              {uploads.map((upload) => {
                const isVerfuegbar = upload.status === 'HOCHGELADEN'
                const isAusstehend = upload.status === 'AUSSTEHEND'
                const isHeruntergeladen = upload.status === 'HERUNTERGELADEN'
                return (
                  <tr key={upload.id} className="hover:bg-[#F4F4F6] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#111111]">
                        {upload.dateiname ?? '— Ausstehend —'}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {upload.dateigroesse ? formatFileSize(upload.dateigroesse) + ' · ' : ''}
                        {new Date(upload.createdAt).toLocaleDateString('de-CH')}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {upload.projekt ? (
                        <Link href={`/admin/projekte/${upload.projekt.id}`} className="text-sm text-[#7C3AED] hover:underline">
                          {upload.projekt.name}
                        </Link>
                      ) : upload.anfrage ? (
                        <Link href={`/admin/anfragen/${upload.anfrage.id}`} className="text-sm text-[#7C3AED] hover:underline">
                          {upload.anfrage.firma}
                        </Link>
                      ) : (
                        <span className="text-sm text-[#6B7280]">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isVerfuegbar && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                          Verfügbar
                        </span>
                      )}
                      {isAusstehend && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                          Link gesendet
                        </span>
                      )}
                      {isHeruntergeladen && (
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">
                            Heruntergeladen
                          </span>
                          {upload.heruntergeladenAm && (
                            <p className="text-xs text-[#9CA3AF] mt-1">
                              {new Date(upload.heruntergeladenAm).toLocaleDateString('de-CH')}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isVerfuegbar && (
                        <a
                          href={`/api/uploads/${upload.id}/download`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7C3AED] border border-[#7C3AED]/30 rounded-lg hover:bg-violet-50 transition-colors"
                        >
                          <Download size={13} />
                          Download
                        </a>
                      )}
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
