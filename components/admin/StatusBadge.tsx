import Badge from '@/components/ui/Badge'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'

type AnfrageStatus = 'NEU' | 'IN_BEARBEITUNG' | 'ANGENOMMEN' | 'ABGELEHNT' | 'ARCHIVIERT'
type ProjektStatusType = 'ANGEBOT' | 'AKTIV' | 'IN_BEARBEITUNG' | 'ABGESCHLOSSEN' | 'PAUSIERT' | 'STORNIERT'
type OfferteStatus = 'ENTWURF' | 'VERSENDET' | 'ANGENOMMEN' | 'ABGELEHNT'
type RechnungsStatus = 'ENTWURF' | 'VERSENDET' | 'TEILBEZAHLT' | 'BEZAHLT' | 'UEBERFAELLIG' | 'MAHNUNG_1' | 'MAHNUNG_2'
type LeadStatus = 'NEU' | 'KONTAKTIERT' | 'IN_VERHANDLUNG' | 'GEWONNEN' | 'VERLOREN'

const anfrageConfig: Record<AnfrageStatus, { label: string; variant: BadgeVariant }> = {
  NEU: { label: 'Neu', variant: 'info' },
  IN_BEARBEITUNG: { label: 'In Bearbeitung', variant: 'warning' },
  ANGENOMMEN: { label: 'Angenommen', variant: 'success' },
  ABGELEHNT: { label: 'Abgelehnt', variant: 'danger' },
  ARCHIVIERT: { label: 'Archiviert', variant: 'default' },
}

const projektConfig: Record<ProjektStatusType, { label: string; variant: BadgeVariant }> = {
  ANGEBOT: { label: 'Angebot', variant: 'purple' },
  AKTIV: { label: 'Aktiv', variant: 'success' },
  IN_BEARBEITUNG: { label: 'In Bearbeitung', variant: 'warning' },
  ABGESCHLOSSEN: { label: 'Abgeschlossen', variant: 'default' },
  PAUSIERT: { label: 'Pausiert', variant: 'info' },
  STORNIERT: { label: 'Storniert', variant: 'danger' },
}

const offerteConfig: Record<OfferteStatus, { label: string; variant: BadgeVariant }> = {
  ENTWURF: { label: 'Entwurf', variant: 'default' },
  VERSENDET: { label: 'Versendet', variant: 'info' },
  ANGENOMMEN: { label: 'Angenommen', variant: 'success' },
  ABGELEHNT: { label: 'Abgelehnt', variant: 'danger' },
}

const rechnungsConfig: Record<RechnungsStatus, { label: string; variant: BadgeVariant }> = {
  ENTWURF: { label: 'Entwurf', variant: 'default' },
  VERSENDET: { label: 'Versendet', variant: 'info' },
  TEILBEZAHLT: { label: 'Teilbezahlt', variant: 'warning' },
  BEZAHLT: { label: 'Bezahlt', variant: 'success' },
  UEBERFAELLIG: { label: 'Überfällig', variant: 'danger' },
  MAHNUNG_1: { label: 'Mahnung 1', variant: 'warning' },
  MAHNUNG_2: { label: 'Mahnung 2', variant: 'danger' },
}

const leadConfig: Record<LeadStatus, { label: string; variant: BadgeVariant }> = {
  NEU: { label: 'Neu', variant: 'info' },
  KONTAKTIERT: { label: 'Kontaktiert', variant: 'warning' },
  IN_VERHANDLUNG: { label: 'In Verhandlung', variant: 'purple' },
  GEWONNEN: { label: 'Gewonnen', variant: 'success' },
  VERLOREN: { label: 'Verloren', variant: 'danger' },
}

export function AnfrageStatusBadge({ status }: { status: AnfrageStatus }) {
  const config = anfrageConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function ProjektStatusBadge({ status }: { status: ProjektStatusType }) {
  const config = projektConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

/** @deprecated Use ProjektStatusBadge */
export function CrmProjektStatusBadge({ status }: { status: ProjektStatusType }) {
  return <ProjektStatusBadge status={status} />
}

export function OfferteStatusBadge({ status }: { status: OfferteStatus }) {
  const config = offerteConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function RechnungsStatusBadge({ status }: { status: RechnungsStatus }) {
  const config = rechnungsConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const config = leadConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
