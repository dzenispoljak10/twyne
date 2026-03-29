-- CRM v2 migration: Offerte/Rechnung as separate models

-- 1. Drop old positionen table (linked to projekt)
DROP TABLE IF EXISTS "positionen" CASCADE;

-- 2. Remove old offerte/rechnung fields from projekte
ALTER TABLE "projekte"
  DROP COLUMN IF EXISTS "offerteNr",
  DROP COLUMN IF EXISTS "offerteDatum",
  DROP COLUMN IF EXISTS "offerteStatus",
  DROP COLUMN IF EXISTS "rechnungsNr",
  DROP COLUMN IF EXISTS "rechnungsDatum",
  DROP COLUMN IF EXISTS "rechnungsStatus",
  DROP COLUMN IF EXISTS "bezahltAm";

-- 3. Drop old RechnungsStatus enum values and add new ones
-- PostgreSQL requires renaming and recreating enums
ALTER TYPE "RechnungsStatus" RENAME TO "RechnungsStatus_old";
CREATE TYPE "RechnungsStatus" AS ENUM (
  'ENTWURF',
  'VERSENDET',
  'TEILBEZAHLT',
  'BEZAHLT',
  'UEBERFAELLIG',
  'MAHNUNG_1',
  'MAHNUNG_2'
);
DROP TYPE "RechnungsStatus_old";

-- 4. Create offerten table
CREATE TABLE IF NOT EXISTS "offerten" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid(),
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "nr"         TEXT NOT NULL,
  "datum"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "gueltigBis" TIMESTAMP(3) NOT NULL,
  "status"     "OfferteStatus" NOT NULL DEFAULT 'ENTWURF',
  "notiz"      TEXT,
  "mwst"       BOOLEAN NOT NULL DEFAULT true,
  "projektId"  TEXT NOT NULL,
  CONSTRAINT "offerten_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "offerten_nr_key" UNIQUE ("nr"),
  CONSTRAINT "offerten_projektId_fkey" FOREIGN KEY ("projektId") REFERENCES "projekte"("id") ON DELETE CASCADE
);

-- 5. Create rechnungen table
CREATE TABLE IF NOT EXISTS "rechnungen" (
  "id"               TEXT NOT NULL DEFAULT gen_random_uuid(),
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "nr"               TEXT NOT NULL,
  "datum"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "faelligBis"       TIMESTAMP(3) NOT NULL,
  "status"           "RechnungsStatus" NOT NULL DEFAULT 'ENTWURF',
  "zahlungsreferenz" TEXT,
  "bezahltBetrag"    DECIMAL(10,2),
  "projektId"        TEXT NOT NULL,
  CONSTRAINT "rechnungen_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "rechnungen_nr_key" UNIQUE ("nr"),
  CONSTRAINT "rechnungen_projektId_fkey" FOREIGN KEY ("projektId") REFERENCES "projekte"("id") ON DELETE CASCADE
);

-- 6. Create new positionen table (offerte-linked)
CREATE TABLE IF NOT EXISTS "positionen" (
  "id"           TEXT NOT NULL DEFAULT gen_random_uuid(),
  "beschreibung" TEXT NOT NULL,
  "menge"        DECIMAL(10,2) NOT NULL DEFAULT 1,
  "einheit"      TEXT NOT NULL DEFAULT 'Std.',
  "einzelpreis"  DECIMAL(10,2) NOT NULL,
  "reihenfolge"  INTEGER NOT NULL DEFAULT 0,
  "offerteId"    TEXT NOT NULL,
  CONSTRAINT "positionen_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "positionen_offerteId_fkey" FOREIGN KEY ("offerteId") REFERENCES "offerten"("id") ON DELETE CASCADE
);

-- 7. Create rechnungs_positionen table
CREATE TABLE IF NOT EXISTS "rechnungs_positionen" (
  "id"           TEXT NOT NULL DEFAULT gen_random_uuid(),
  "beschreibung" TEXT NOT NULL,
  "menge"        DECIMAL(10,2) NOT NULL DEFAULT 1,
  "einheit"      TEXT NOT NULL DEFAULT 'Std.',
  "einzelpreis"  DECIMAL(10,2) NOT NULL,
  "reihenfolge"  INTEGER NOT NULL DEFAULT 0,
  "rechnungId"   TEXT NOT NULL,
  CONSTRAINT "rechnungs_positionen_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "rechnungs_positionen_rechnungId_fkey" FOREIGN KEY ("rechnungId") REFERENCES "rechnungen"("id") ON DELETE CASCADE
);
