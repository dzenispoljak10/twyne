import { prisma } from '@/lib/prisma'
import { Inbox, FolderOpen, Package, Images, Users, FileText, AlertTriangle } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import { AnfrageStatusBadge, ProjektStatusBadge } from '@/components/admin/StatusBadge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const [
    neueAnfragen,
    aktiveProjekte,
    ausstehendUploads,
    portfolioAnzahl,
    letzteAnfragen,
    letzteProjekte,
    kundenAnzahl,
    offeneRechnungen,
    ueberfaelligeRechnungen,
  ] = await Promise.all([
    prisma.anfrage.count({ where: { createdAt: { gte: oneWeekAgo } } }),
    prisma.projekt.count({ where: { status: 'AKTIV' } }),
    prisma.upload.count({ where: { status: 'HOCHGELADEN' } }),
    prisma.portfolio.count({ where: { sichtbar: true } }),
    prisma.anfrage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, vorname: true, nachname: true, firma: true, status: true, createdAt: true, dienstleistung: true },
    }),
    prisma.projekt.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, name: true, status: true, kontaktFirma: true, updatedAt: true, kunde: { select: { firma: true } } },
    }),
    prisma.kunde.count(),
    prisma.rechnung.count({
      where: { status: { in: ['VERSENDET', 'UEBERFAELLIG', 'MAHNUNG_1', 'MAHNUNG_2'] } },
    }),
    prisma.rechnung.count({
      where: { status: { in: ['UEBERFAELLIG', 'MAHNUNG_1', 'MAHNUNG_2'] } },
    }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>
          Dashboard
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">Willkommen zurück — hier ist eine Übersicht.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Neue Anfragen"
          value={neueAnfragen}
          icon={Inbox}
          description="Diese Woche"
          color="#7C3AED"
        />
        <StatsCard
          title="Aktive Projekte"
          value={aktiveProjekte}
          icon={FolderOpen}
          description="Laufend"
          color="#0F766E"
        />
        <StatsCard
          title="Ausstehende Uploads"
          value={ausstehendUploads}
          icon={Package}
          description="Nicht heruntergeladen"
          color="#B45309"
        />
        <StatsCard
          title="Portfolio"
          value={portfolioAnzahl}
          icon={Images}
          description="Sichtbare Projekte"
          color="#0369A1"
        />
      </div>

      {/* CRM Stats */}
      <div>
        <h2 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-3">CRM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="Kunden"
            value={kundenAnzahl}
            icon={Users}
            description="Aktive Kundschaft"
            color="#7C3AED"
          />
          <StatsCard
            title="Offene Rechnungen"
            value={offeneRechnungen}
            icon={FileText}
            description="Versendet / ausstehend"
            color="#0284C7"
          />
          <StatsCard
            title="Überfällig"
            value={ueberfaelligeRechnungen}
            icon={AlertTriangle}
            description="Mahnungen ausstehend"
            color={ueberfaelligeRechnungen > 0 ? '#DC2626' : '#6B7280'}
          />
        </div>
      </div>

      {/* Überfällige Rechnungen warning */}
      {ueberfaelligeRechnungen > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-[#DC2626] shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#991B1B]">
              {ueberfaelligeRechnungen} überfällige Rechnung{ueberfaelligeRechnungen > 1 ? 'en' : ''}
            </p>
            <p className="text-xs text-[#B91C1C]">Mahnungen versenden oder Zahlungseingang prüfen.</p>
          </div>
          <Link
            href="/admin/projekte?status=AKTIV"
            className="text-xs font-semibold text-[#DC2626] hover:underline shrink-0"
          >
            Anzeigen →
          </Link>
        </div>
      )}

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Letzte Anfragen */}
        <div className="bg-white rounded-xl border border-[#E8E8ED]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8ED]">
            <h2 className="text-base font-bold text-[#111111]">Letzte Anfragen</h2>
            <Link href="/admin/anfragen" className="text-xs font-medium text-[#7C3AED] hover:underline">
              Alle anzeigen
            </Link>
          </div>
          <div className="divide-y divide-[#E8E8ED]">
            {letzteAnfragen.length === 0 ? (
              <p className="px-6 py-8 text-sm text-[#6B7280] text-center">Keine Anfragen vorhanden</p>
            ) : (
              letzteAnfragen.map((anfrage) => (
                <Link
                  key={anfrage.id}
                  href={`/admin/anfragen/${anfrage.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F4F4F6] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{anfrage.firma}</p>
                    <p className="text-xs text-[#6B7280]">
                      {anfrage.vorname} {anfrage.nachname} · {anfrage.dienstleistung[0]}
                      {anfrage.dienstleistung.length > 1 && ` +${anfrage.dienstleistung.length - 1}`}
                    </p>
                  </div>
                  <AnfrageStatusBadge status={anfrage.status as any} />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Letzte Projekte */}
        <div className="bg-white rounded-xl border border-[#E8E8ED]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8ED]">
            <h2 className="text-base font-bold text-[#111111]">Letzte Projekte</h2>
            <Link href="/admin/projekte" className="text-xs font-medium text-[#7C3AED] hover:underline">
              Alle anzeigen
            </Link>
          </div>
          <div className="divide-y divide-[#E8E8ED]">
            {letzteProjekte.length === 0 ? (
              <p className="px-6 py-8 text-sm text-[#6B7280] text-center">Keine Projekte vorhanden</p>
            ) : (
              letzteProjekte.map((projekt) => (
                <Link
                  key={projekt.id}
                  href={`/admin/projekte/${projekt.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F4F4F6] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{projekt.name}</p>
                    <p className="text-xs text-[#6B7280]">
                      {projekt.kunde?.firma ?? projekt.kontaktFirma ?? '—'}
                    </p>
                  </div>
                  <ProjektStatusBadge status={projekt.status as any} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
