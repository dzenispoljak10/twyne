import { z } from 'zod'

export const anfrageSchema = z.object({
  vorname: z.string().min(2, 'Vorname ist zu kurz'),
  nachname: z.string().min(2, 'Nachname ist zu kurz'),
  firma: z.string().min(2, 'Firmenname ist zu kurz'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  telefon: z.string().min(8, 'Telefonnummer ist zu kurz'),
  website: z.string().optional(),
  budget: z.string().optional(),
  dienstleistung: z.array(z.string()).min(1, 'Bitte wählen Sie mindestens eine Dienstleistung'),
  nachricht: z.string().min(20, 'Nachricht muss mindestens 20 Zeichen haben'),
  datenschutz: z.boolean().refine(val => val === true, 'Bitte akzeptieren Sie die Datenschutzerklärung'),
})

export type AnfrageFormData = z.infer<typeof anfrageSchema>

export const mailSchema = z.object({
  an: z.string().email(),
  betreff: z.string().min(1),
  inhalt: z.string().min(1),
  typ: z.enum(['BESTAETIGUNG', 'ANNAHME', 'ABLEHNUNG', 'UPLOAD_ANFRAGE', 'OFFERTE', 'STATUSUPDATE', 'INDIVIDUELL']),
})

export const projektUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  beschreibung: z.string().optional(),
  status: z.enum(['AKTIV', 'IN_BEARBEITUNG', 'ABGESCHLOSSEN', 'PAUSIERT', 'STORNIERT']).optional(),
  offerteBetrag: z.number().optional(),
  rechnungsNr: z.string().optional(),
  rechnungsBetrag: z.number().optional(),
})
