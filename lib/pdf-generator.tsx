import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer'
import type { Kunde, Projekt, Offerte, Rechnung, Position, RechnungsPosition } from '@prisma/client'
import { berechnePositionen, formatChf, formatDatum } from './crm-helpers'
import { FIRMA, FIRMA_FUSSZEILE } from './firma-config'

// ─── Bankdaten ────────────────────────────────────────────────────────────────

const BANK_DETAILS = {
  iban: 'CH25 8080 8004 3893 2201 6',
  kontoinhaber: 'Twyne',
  adresse: ['c/o Visiosign Poljak', 'Galliweg 3', '4852 Rothrist'],
  zahlungsfrist: 30, // Tage
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 48,
    paddingBottom: 72,
    paddingHorizontal: 56,
    color: '#111111',
  },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 36 },
  headerLeft: { flexDirection: 'column', gap: 1 },
  firmaName: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#111111' },
  firmaAdresse: { fontSize: 10, color: '#374151', lineHeight: 1.5, marginTop: 4 },
  headerRight: { alignItems: 'flex-end' },
  docTyp: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#111111', letterSpacing: -0.5 },
  metaReihe: { flexDirection: 'row', gap: 24, marginTop: 6 },
  metaCol: { flexDirection: 'column', gap: 2, alignItems: 'flex-end' },
  metaLabel: { fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 },
  metaValue: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#374151' },

  // Empfänger
  empfaenger: { marginBottom: 32, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  empfaengerLabel: { fontSize: 8, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  empfaengerText: { fontSize: 10, color: '#374151', lineHeight: 1.6 },
  betreff: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 16 },

  // Tabelle
  tableHeader: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1.5, borderBottomColor: '#E5E7EB' },
  tableHeaderText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#6B7280', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tableCell: { fontSize: 9, color: '#374151' },
  tableCellBold: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111111' },
  colDesc: { flex: 1 },
  colMenge: { width: 44, textAlign: 'right' },
  colEinheit: { width: 40, textAlign: 'center', color: '#6B7280' },
  colEP: { width: 72, textAlign: 'right' },
  colTotal: { width: 80, textAlign: 'right' },

  // Summen
  summenOuter: { marginTop: 16, alignItems: 'flex-end' },
  summenContainer: { width: 260 },
  summenZeile: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  summenLabel: { fontSize: 9, color: '#6B7280' },
  summenValue: { fontSize: 9, color: '#374151' },
  summenDivider: { borderTopWidth: 1, borderTopColor: '#E5E7EB', marginVertical: 6 },
  totalLabel: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#111111' },
  totalValue: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#7C3AED' },

  // Hinweis
  hinweis: { fontSize: 9, color: '#6B7280', lineHeight: 1.6, marginTop: 28 },

  // Zahlungsinformationen
  zahlungSection: { marginTop: 32 },
  zahlungDivider: { borderTopWidth: 1, borderTopColor: '#D1D5DB', marginVertical: 8 },
  zahlungTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#374151', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  zahlungRow: { flexDirection: 'row', marginBottom: 5 },
  zahlungLabel: { width: 120, fontSize: 9, color: '#6B7280' },
  zahlungValue: { flex: 1, fontSize: 9, color: '#111111' },
  zahlungValueBold: { flex: 1, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111111' },
  zahlungHinweis: { fontSize: 8, color: '#9CA3AF', lineHeight: 1.5, marginTop: 6 },

  // Warning Box
  warningBox: { backgroundColor: '#FEF3C7', borderRadius: 6, padding: 10, marginBottom: 20 },
  warningText: { fontSize: 9, color: '#92400E', lineHeight: 1.6 },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 56,
    right: 56,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: { fontSize: 8, color: '#9CA3AF' },
})

// ─── Components ───────────────────────────────────────────────────────────────

function PdfHeader({
  docTyp,
  nr,
  datum,
  extra,
}: {
  docTyp: string
  nr: string
  datum: string
  extra?: { label: string; value: string }
}) {
  return (
    <View style={S.header}>
      <View style={S.headerLeft}>
        <Text style={S.firmaName}>{FIRMA.name}</Text>
        <Text style={S.firmaAdresse}>{FIRMA.strasse}{'\n'}{FIRMA.plz} {FIRMA.ort} · {FIRMA.land}</Text>
      </View>
      <View style={S.headerRight}>
        <Text style={S.docTyp}>{docTyp}</Text>
        <View style={S.metaReihe}>
          <View style={S.metaCol}>
            <Text style={S.metaLabel}>Nr.</Text>
            <Text style={S.metaValue}>{nr}</Text>
          </View>
          <View style={S.metaCol}>
            <Text style={S.metaLabel}>Datum</Text>
            <Text style={S.metaValue}>{datum}</Text>
          </View>
          {extra && (
            <View style={S.metaCol}>
              <Text style={S.metaLabel}>{extra.label}</Text>
              <Text style={S.metaValue}>{extra.value}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

function PdfFooter() {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerText}>{FIRMA_FUSSZEILE}</Text>
      <Text style={S.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  )
}

interface EmpfaengerData {
  firma: string | null
  vorname: string | null
  nachname: string | null
  adresse: string | null
}

function getEmpfaenger(projekt: Projekt & { kunde: Kunde | null }): EmpfaengerData {
  if (projekt.kunde) {
    return { firma: projekt.kunde.firma, vorname: projekt.kunde.vorname, nachname: projekt.kunde.nachname, adresse: projekt.kunde.adresse ?? null }
  }
  return { firma: projekt.kontaktFirma ?? null, vorname: projekt.kontaktVorname ?? null, nachname: projekt.kontaktNachname ?? null, adresse: null }
}

function getZahlbarDurch(projekt: Projekt & { kunde: Kunde | null }): string {
  const firma = projekt.kunde?.firma || projekt.kontaktFirma
  if (firma) return firma
  const vorname = projekt.kunde?.vorname || projekt.kontaktVorname || ''
  const nachname = projekt.kunde?.nachname || projekt.kontaktNachname || ''
  return `${vorname} ${nachname}`.trim()
}

function Empfaenger({ data }: { data: EmpfaengerData }) {
  const zeilen = [
    data.firma,
    data.vorname && data.nachname ? `${data.vorname} ${data.nachname}` : null,
    data.adresse,
  ].filter(Boolean).join('\n')
  return (
    <View style={S.empfaenger}>
      <Text style={S.empfaengerLabel}>An</Text>
      <Text style={S.empfaengerText}>{zeilen}</Text>
    </View>
  )
}

function ZahlungsinfoSection({ rechnung, zahlbarDurch }: { rechnung: { nr: string; faelligBis: Date | string }; zahlbarDurch: string }) {
  return (
    <View style={S.zahlungSection}>
      <View style={S.zahlungDivider} />
      <Text style={S.zahlungTitle}>Zahlungsinformationen</Text>
      <View style={S.zahlungRow}>
        <Text style={S.zahlungLabel}>Zahlbar bis</Text>
        <Text style={S.zahlungValueBold}>{formatDatum(new Date(rechnung.faelligBis))}</Text>
      </View>
      <View style={S.zahlungRow}>
        <Text style={S.zahlungLabel}>Zahlbar durch</Text>
        <Text style={S.zahlungValue}>{zahlbarDurch}</Text>
      </View>
      <View style={S.zahlungRow}>
        <Text style={S.zahlungLabel}>IBAN</Text>
        <Text style={S.zahlungValueBold}>{BANK_DETAILS.iban}</Text>
      </View>
      <View style={S.zahlungRow}>
        <Text style={S.zahlungLabel}>Kontoinhaber</Text>
        <View style={{ flex: 1 }}>
          <Text style={S.zahlungValue}>{BANK_DETAILS.kontoinhaber}</Text>
          {BANK_DETAILS.adresse.map((z, i) => (
            <Text key={i} style={S.zahlungValue}>{z}</Text>
          ))}
        </View>
      </View>
      <View style={S.zahlungRow}>
        <Text style={S.zahlungLabel}>Verwendungszweck</Text>
        <Text style={S.zahlungValue}>Rechnung Nr. {rechnung.nr}</Text>
      </View>
      <View style={S.zahlungDivider} />
      <Text style={S.zahlungHinweis}>
        Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen von 5% p.a.
      </Text>
    </View>
  )
}

type PosLike = { id: string; beschreibung: string; menge: any; einheit: string; einzelpreis: any; reihenfolge: number }

function PositionenTabelle({ positionen }: { positionen: PosLike[] }) {
  const { zeilen, summen } = berechnePositionen(positionen)
  return (
    <View>
      <View style={S.tableHeader}>
        <Text style={[S.tableHeaderText, S.colDesc]}>Beschreibung</Text>
        <Text style={[S.tableHeaderText, S.colMenge]}>Menge</Text>
        <Text style={[S.tableHeaderText, S.colEinheit]}>Einh.</Text>
        <Text style={[S.tableHeaderText, S.colEP]}>EP CHF</Text>
        <Text style={[S.tableHeaderText, S.colTotal]}>Total CHF</Text>
      </View>

      {zeilen.map((z) => (
        <View key={z.id} style={S.tableRow}>
          <Text style={[S.tableCell, S.colDesc]}>{z.beschreibung}</Text>
          <Text style={[S.tableCell, S.colMenge]}>{z.menge}</Text>
          <Text style={[S.tableCell, S.colEinheit, { color: '#6B7280' }]}>{z.einheit}</Text>
          <Text style={[S.tableCell, S.colEP]}>{formatChf(z.einzelpreis)}</Text>
          <Text style={[S.tableCellBold, S.colTotal]}>{formatChf(z.netto)}</Text>
        </View>
      ))}

      <View style={S.summenOuter}>
        <View style={S.summenContainer}>
          <View style={S.summenZeile}>
            <Text style={S.summenLabel}>Nettobetrag</Text>
            <Text style={S.summenValue}>{formatChf(summen.subtotal)}</Text>
          </View>
          <View style={S.summenZeile}>
            <Text style={S.summenLabel}>MWST 8.1%</Text>
            <Text style={S.summenValue}>{formatChf(summen.mwst)}</Text>
          </View>
          <View style={S.summenDivider} />
          <View style={S.summenZeile}>
            <Text style={S.totalLabel}>Total</Text>
            <Text style={S.totalValue}>{formatChf(summen.total)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// ─── Types ─────────────────────────────────────────────────────────────────

type ProjektMitKunde = Projekt & { kunde: Kunde | null }
export type OfferteFull = Offerte & { positionen: Position[]; projekt: ProjektMitKunde }
export type RechnungFull = Rechnung & { positionen: RechnungsPosition[]; projekt: ProjektMitKunde }

// ─── Offerte ──────────────────────────────────────────────────────────────────

function OffertePdf({ offerte }: { offerte: OfferteFull }) {
  const empfaenger = getEmpfaenger(offerte.projekt)
  const anrede = empfaenger.vorname && empfaenger.nachname
    ? `Sehr geehrte/r ${empfaenger.vorname} ${empfaenger.nachname}`
    : empfaenger.firma
      ? `Sehr geehrte Damen und Herren`
      : 'Guten Tag'
  return (
    <Document>
      <Page size="A4" style={S.page}>
        <PdfHeader
          docTyp="OFFERTE"
          nr={offerte.nr}
          datum={formatDatum(new Date(offerte.datum))}
          extra={{ label: 'Gültig bis', value: formatDatum(new Date(offerte.gueltigBis)) }}
        />
        <Empfaenger data={empfaenger} />
        <Text style={S.betreff}>Betreff: {offerte.projekt.name}</Text>
        <Text style={{ fontSize: 10, color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
          {`${anrede}\n\nVielen Dank für Ihr Interesse. Wir freuen uns, Ihnen folgende Offerte zu unterbreiten:`}
        </Text>
        <PositionenTabelle positionen={offerte.positionen} />
        {offerte.notiz && (
          <Text style={S.hinweis}>{offerte.notiz}</Text>
        )}
        <Text style={S.hinweis}>
          {`Alle Preise in CHF inkl. 8.1% MWST. Gültig bis ${formatDatum(new Date(offerte.gueltigBis))}.\nBei Fragen: ${FIRMA.email} | ${FIRMA.web}`}
        </Text>
        <PdfFooter />
      </Page>
    </Document>
  )
}

// ─── Rechnung ─────────────────────────────────────────────────────────────────

function RechnungPdf({ rechnung }: { rechnung: RechnungFull }) {
  const empfaenger = getEmpfaenger(rechnung.projekt)
  const zahlbarDurch = getZahlbarDurch(rechnung.projekt)
  return (
    <Document>
      <Page size="A4" style={S.page}>
        <PdfHeader
          docTyp="RECHNUNG"
          nr={rechnung.nr}
          datum={formatDatum(new Date(rechnung.datum))}
          extra={{ label: 'Zahlbar bis', value: formatDatum(new Date(rechnung.faelligBis)) }}
        />
        <Empfaenger data={empfaenger} />
        <Text style={S.betreff}>Betreff: {rechnung.projekt.name}</Text>
        <PositionenTabelle positionen={rechnung.positionen} />
        <ZahlungsinfoSection rechnung={rechnung} zahlbarDurch={zahlbarDurch} />
        <Text style={S.hinweis}>
          {`Bei Fragen: ${FIRMA.email} | ${FIRMA.web}`}
        </Text>
        <PdfFooter />
      </Page>
    </Document>
  )
}

// ─── Mahnungen ────────────────────────────────────────────────────────────────

function MahnungPdf({ rechnung, stufe }: { rechnung: RechnungFull; stufe: 1 | 2 }) {
  const empfaenger = getEmpfaenger(rechnung.projekt)
  const zahlbarDurch = getZahlbarDurch(rechnung.projekt)
  const { summen } = berechnePositionen(rechnung.positionen)
  const mahnFaelligBis = formatDatum(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000))
  const gebuehr = stufe === 2 ? 50 : 0
  const total = summen.total + gebuehr
  const docTyp = stufe === 1 ? '1. MAHNUNG' : '2. MAHNUNG'

  const anrede = empfaenger.vorname && empfaenger.nachname
    ? `Sehr geehrte/r ${empfaenger.vorname} ${empfaenger.nachname}`
    : 'Sehr geehrte Damen und Herren'

  const text =
    stufe === 1
      ? `${anrede},\n\nwir stellen fest, dass die Rechnung ${rechnung.nr} noch nicht beglichen wurde. Bitte überweisen Sie den offenen Betrag bis zum ${mahnFaelligBis}.`
      : `${anrede},\n\ntrotz unserer ersten Mahnung ist der Betrag aus Rechnung ${rechnung.nr} weiterhin ausstehend. Dies ist unsere letzte Zahlungsaufforderung. Bei weiterer Nichtbezahlung sehen wir uns gezwungen, rechtliche Schritte einzuleiten.`

  // Mahnung-Rechnung mit angepasstem Fälligkeitsdatum
  const mahnRechnung = { ...rechnung, faelligBis: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }

  return (
    <Document>
      <Page size="A4" style={S.page}>
        <PdfHeader docTyp={docTyp} nr={rechnung.nr} datum={formatDatum(new Date())} extra={{ label: 'Zahlbar bis', value: mahnFaelligBis }} />
        <Empfaenger data={empfaenger} />

        {stufe === 2 && (
          <View style={S.warningBox}>
            <Text style={S.warningText}>Letzte Mahnung — bei weiterer Nichtbezahlung erfolgen rechtliche Schritte.</Text>
          </View>
        )}

        <Text style={{ fontSize: 10, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>{text}</Text>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ width: 260 }}>
            <View style={S.summenZeile}>
              <Text style={S.summenLabel}>Offener Betrag</Text>
              <Text style={S.summenValue}>{formatChf(summen.total)}</Text>
            </View>
            {gebuehr > 0 && (
              <View style={S.summenZeile}>
                <Text style={S.summenLabel}>Mahngebühr</Text>
                <Text style={S.summenValue}>{formatChf(gebuehr)}</Text>
              </View>
            )}
            <View style={S.summenDivider} />
            <View style={S.summenZeile}>
              <Text style={S.totalLabel}>Zu bezahlen</Text>
              <Text style={S.totalValue}>{formatChf(total)}</Text>
            </View>
          </View>
        </View>

        <ZahlungsinfoSection rechnung={mahnRechnung} zahlbarDurch={zahlbarDurch} />

        <PdfFooter />
      </Page>
    </Document>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export async function generateOffertePdf(offerte: OfferteFull): Promise<Buffer> {
  return renderToBuffer(<OffertePdf offerte={offerte} />) as unknown as Promise<Buffer>
}

export async function generateRechnungPdf(rechnung: RechnungFull): Promise<Buffer> {
  return renderToBuffer(<RechnungPdf rechnung={rechnung} />) as unknown as Promise<Buffer>
}

export async function generateMahnungPdf(rechnung: RechnungFull, stufe: 1 | 2): Promise<Buffer> {
  return renderToBuffer(<MahnungPdf rechnung={rechnung} stufe={stufe} />) as unknown as Promise<Buffer>
}
