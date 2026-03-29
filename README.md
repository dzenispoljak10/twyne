# Twyne

Digitalagentur Schweiz — twyne.ch

## Setup
1. npm install
2. cp .env.production.example .env.local
3. npm run db:push
4. npm run dev

## Deploy
Vercel + Neon PostgreSQL

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **ORM**: Prisma
- **Datenbank**: PostgreSQL (Neon)
- **Auth**: NextAuth.js v5
- **E-Mail**: Resend
- **Formulare**: React Hook Form + Zod
- **Icons**: Lucide React
- **Fonts**: Manrope (Google Fonts)

## Installation

### 1. Repository klonen und Abhängigkeiten installieren

```bash
git clone <repository-url>
cd twyne
npm install
```

### 2. Umgebungsvariablen konfigurieren

```bash
cp .env.local.example .env.local
```

Dann `.env.local` befüllen (siehe unten).

### 3. Datenbank einrichten

```bash
npm run db:generate  # Prisma Client generieren
npm run db:push      # Schema in Datenbank pushen
npm run db:seed      # (Optional) Beispieldaten
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

- **Website**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

## Umgebungsvariablen

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL Connection String (Neon) | `postgresql://user:pass@host/db?sslmode=require` |
| `DIRECT_URL` | Direkte DB-Verbindung für Prisma Migrations | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Zufälliger Secret für NextAuth | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App-URL für NextAuth | `https://twyne.ch` |
| `ADMIN_EMAIL` | Admin Login E-Mail | `admin@twyne.ch` |
| `ADMIN_PASSWORD` | Admin Login Passwort | Sicheres Passwort wählen |
| `RESEND_API_KEY` | API Key von resend.com | `re_xxxxx` |
| `RESEND_FROM_EMAIL` | Absender E-Mail | `info@twyne.ch` |
| `ADMIN_NOTIFY_EMAIL` | E-Mail für Admin-Benachrichtigungen | `info@twyne.ch` |
| `CRON_SECRET` | Secret für Cron-Job Authentifizierung | Zufälliger String |
| `NEXT_PUBLIC_APP_URL` | Öffentliche App-URL | `https://twyne.ch` |
| `NEXT_PUBLIC_SITE_NAME` | Seiten-Name | `Twyne` |

## Deployment (Vercel + Neon)

### Datenbank (Neon)
1. Account auf [neon.tech](https://neon.tech) erstellen
2. Neues Projekt anlegen
3. Connection String kopieren → `DATABASE_URL` und `DIRECT_URL`

### Deployment (Vercel)
1. Repository auf GitHub pushen
2. Neues Projekt auf [vercel.com](https://vercel.com) erstellen
3. Repository verbinden
4. Alle Umgebungsvariablen in Vercel eintragen
5. Deploy!

Der Cron-Job (`/api/cron/cleanup`) läuft täglich um 02:00 Uhr und löscht nicht heruntergeladene Uploads nach 48h.

## Favicon-Generierung

Das SVG-Favicon (`public/favicon.svg`) funktioniert direkt in modernen Browsern.

Für PNG-Varianten:

```bash
node public/generate-favicons.js
```

Oder mit Sharp installiert:

```bash
npm install sharp
node public/generate-favicons.js
```

## Admin-Zugang

- URL: `/admin/login`
- E-Mail: Aus `ADMIN_EMAIL` ENV-Variable
- Passwort: Aus `ADMIN_PASSWORD` ENV-Variable

### Admin-Funktionen
- **Dashboard**: Statistiken, letzte Anfragen & Projekte
- **Anfragen**: Neue Kontaktanfragen bearbeiten, annehmen oder ablehnen
- **Projekte**: Projekte verwalten, Mails senden, Uploads, Notizen
- **Uploads**: ZIP-Dateien von Kunden empfangen und herunterladen
- **Blog**: Artikel verwalten (via Prisma Studio oder direkt in DB)
- **Einstellungen**: Systemstatus und Konfiguration

## Entwicklung

```bash
npm run dev       # Entwicklungsserver
npm run build     # Production Build
npm run lint      # ESLint
npm run db:studio # Prisma Studio (DB-Browser)
```

## Architektur

```
twyne/
├── app/                   # Next.js App Router
│   ├── (public pages)     # /, /leistungen, /portfolio, /blog, /kontakt
│   ├── admin/             # Admin Dashboard (auth-geschützt)
│   └── api/               # API Routes
├── components/
│   ├── public/            # Öffentliche Website-Komponenten
│   ├── admin/             # Admin Dashboard-Komponenten
│   ├── logo/              # Logo-Varianten (hell/dunkel)
│   └── ui/                # Wiederverwendbare UI-Komponenten
├── lib/                   # Hilfsfunktionen (auth, mail, prisma, etc.)
├── prisma/                # Datenbankschema & Migrations
└── public/                # Statische Dateien
```
