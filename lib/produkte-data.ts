export interface ProduktFeature {
  icon: string
  title: string
  text: string
}

export interface ProduktPricing {
  label: string
  preis: string
  einheit: string
  beschreibung: string
  features: string[]
  highlight?: boolean
}

export interface ProduktFaq {
  question: string
  answer: string
}

export interface ProduktData {
  slug: string
  meta: {
    title: string
    description: string
  }
  hero: {
    badge: string
    h1: string
    h1Purple: string
    description: string
    tagline: string
  }
  features: ProduktFeature[]
  stats: Array<{ value: string; label: string }>
  splitHighlight: {
    icon: string
    quote: string
    h3: string
    text: string
    checks: string[]
  }
  pricing: ProduktPricing[]
  faq: ProduktFaq[]
  ctaTitle: string
  produktEnum: 'CLUB' | 'TABLE' | 'DESK' | 'FLOW'
  color: string
}

export const produkteData: Record<string, ProduktData> = {
  club: {
    slug: 'club',
    meta: {
      title: 'Twyne Club — Vereinssoftware Schweiz | Mitglieder, Sponsoren & Events',
      description: 'Die moderne Vereinsverwaltung für Schweizer Vereine. Mitglieder, Sponsoren, Events, eigene Website. Swiss-Made. Demo anfragen.',
    },
    hero: {
      badge: 'Webapplikation · Twyne Club',
      h1: 'Vereinsverwaltung die Spass macht —',
      h1Purple: 'für Schweizer Vereine',
      description: 'Twyne Club digitalisiert Ihren Verein — Mitgliederverwaltung, Sponsoren-Portal, Events und eigene Vereinswebsite. Alles in einem System, im Browser, auf jedem Gerät.',
      tagline: 'Keine Installation · Jedes Gerät · Swiss-Made',
    },
    features: [
      { icon: 'Users', title: 'Mitgliederverwaltung', text: 'Mitglieder erfassen, Beiträge verwalten, Eintritte und Austritte bearbeiten. Automatische Mahnungen, Jahresübersichten, Export-Funktionen. Was früher Stunden dauerte, geht jetzt in Minuten.' },
      { icon: 'Star', title: 'Sponsoren-Portal', text: 'Sponsoren direkt im System einladen. Logos verwalten, Berichte automatisch erstellen, Dankesschreiben versenden. Sponsoring wird professionell — und Sponsoren bleiben länger.' },
      { icon: 'Calendar', title: 'Event-Kalender', text: 'Veranstaltungen erstellen, Anmeldungen online sammeln, Erinnerungen automatisch versenden. Kein Telefonieren, kein Suchen wer angemeldet ist.' },
      { icon: 'Globe', title: 'Eigene Vereinswebsite', text: 'Inklusive moderner Website mit Ihrem Vereinsnamen. News, Team, Galerie, Kontakt — alles selbst pflegbar, immer aktuell.' },
      { icon: 'Mail', title: 'Kommunikation', text: 'Newsletter und Benachrichtigungen direkt an alle Mitglieder oder ausgewählte Gruppen. Ohne externe Mail-Tools, ohne Datenschutz-Probleme.' },
      { icon: 'Shield', title: 'Swiss-Made & Datenschutz', text: 'Alle Daten werden ausschliesslich in der Schweiz gespeichert. DSGVO-konform, nDSG-konform, nur für Ihren Verein zugänglich.' },
    ],
    stats: [
      { value: '100k+', label: 'Vereine in der Schweiz' },
      { value: '48h', label: 'bis zum Live-Gang' },
      { value: '0', label: 'Installation nötig' },
      { value: '100%', label: 'im Browser' },
    ],
    splitHighlight: {
      icon: 'Users',
      quote: 'Schluss mit Excel-Listen.',
      h3: 'Vereinsverwaltung ohne Aufwand',
      text: 'Die meisten Schweizer Vereine verwalten Mitglieder noch in Excel-Tabellen, Beiträge per Banküberweisung und Events per WhatsApp. Twyne Club bringt alles in ein System — einfach, modern, professionell.',
      checks: [
        'Mitglieder, Beiträge & Events in einem System',
        'Automatische Mahnungen & Jahresabrechnungen',
        'Sponsoren-Portal für professionelles Sponsoring',
      ],
    },
    pricing: [
      {
        label: 'Starter',
        preis: 'CHF 49',
        einheit: '/ Monat',
        beschreibung: 'Für kleine Vereine bis 100 Mitglieder',
        features: ['Bis 100 Mitglieder', '3 Administratoren', 'Veranstaltungsverwaltung', 'E-Mail-Kommunikation', 'Support per E-Mail'],
      },
      {
        label: 'Professional',
        preis: 'CHF 129',
        einheit: '/ Monat',
        beschreibung: 'Für wachsende Clubs bis 500 Mitglieder',
        features: ['Bis 500 Mitglieder', 'Unbegrenzte Admins', 'Sponsoren-Portal', 'API-Zugang', 'Priority Support'],
        highlight: true,
      },
      {
        label: 'Enterprise',
        preis: 'Auf Anfrage',
        einheit: '',
        beschreibung: 'Für grosse Organisationen & Verbände',
        features: ['Unbegrenzte Mitglieder', 'White-Label möglich', 'Individuelle Integrationen', 'SLA-Garantie', 'Dedicated Support'],
      },
    ],
    faq: [
      { question: 'Müssen unsere Mitglieder technische Kenntnisse haben?', answer: 'Nein. Twyne Club funktioniert wie eine E-Mail — intuitiv, ohne Einführung. Auf Computer, Tablet und Smartphone.' },
      { question: 'Können wir bestehende Mitgliederdaten importieren?', answer: 'Ja — wir importieren Ihre bestehende Excel- oder CSV-Liste kostenlos beim Setup.' },
      { question: 'Wo werden unsere Daten gespeichert?', answer: 'In der Schweiz. Ausschliesslich für Ihren Verein zugänglich. DSGVO-konform.' },
      { question: 'Gibt es einen Mindestvertrag?', answer: 'Nein. Monatlich kündbar, keine versteckten Kosten.' },
    ],
    ctaTitle: 'Bereit für einen modernen Verein?',
    produktEnum: 'CLUB',
    color: '#7C3AED',
  },

  table: {
    slug: 'table',
    meta: {
      title: 'Twyne Table — QR-Speisekarte & Reservation für Restaurants Schweiz',
      description: 'Digitale Speisekarte, Tischreservierung und Take-away für Schweizer Restaurants. 0% Kommission. Keine App für Gäste. Demo anfragen.',
    },
    hero: {
      badge: 'Webapplikation · Twyne Table',
      h1: 'Twyne Table — Ihr Restaurant digital.',
      h1Purple: 'Ohne Kommission.',
      description: 'QR-Speisekarte, Online-Tischreservierung und Take-away — direkt, ohne Mittelsmann, ohne Kommission. Ihre Gäste scannen, Sie verdienen.',
      tagline: '0% Kommission · Keine App für Gäste · In 48h live',
    },
    features: [
      { icon: 'Smartphone', title: 'QR-Speisekarte', text: 'Gäste scannen den QR-Code am Tisch. Keine App, kein Konto, kein Passwort. Die aktuelle Speisekarte erscheint sofort — mit Fotos, Allergenen, Preisen.' },
      { icon: 'Calendar', title: 'Online-Tischreservierung', text: '24/7 buchbar, automatische Bestätigung per E-Mail. Keine Telefonanrufe mehr, keine manuellen Listen — alle Reservierungen an einem Ort.' },
      { icon: 'ShoppingBag', title: 'Take-away Bestellungen', text: 'Online bestellen, vor Ort abholen. 0% Kommission — alles bleibt in Ihrem Restaurant. Keine Abhängigkeit von Drittplattformen.' },
      { icon: 'Zap', title: 'Echtzeit-Änderungen', text: 'Speisekarte in Minuten aktualisieren. Mittagsmenü ausblenden, Tagesangebot hinzufügen, Preise anpassen — sofort sichtbar für alle Gäste.' },
      { icon: 'Shield', title: 'Allergen-Management', text: 'LMIV-konforme Allergen-Angaben automatisch dargestellt. Keine manuelle Pflege, kein Risiko vergessener Aktualisierungen.' },
      { icon: 'BarChart2', title: 'Analytics', text: 'Welche Gerichte werden am häufigsten angesehen? Wann kommen die meisten Reservierungen? Daten die Ihnen helfen besser zu planen.' },
    ],
    stats: [
      { value: '0%', label: 'Kommission' },
      { value: '48h', label: 'bis live' },
      { value: 'QR', label: 'kein App-Download' },
      { value: '∞', label: 'Änderungen kostenlos' },
    ],
    splitHighlight: {
      icon: 'UtensilsCrossed',
      quote: '30% Kommission? Das muss nicht sein.',
      h3: 'QR-Speisekarte ohne Abo-Falle',
      text: 'Viele digitale Speisekarten-Lösungen kassieren Provision auf jede Bestellung oder hohe monatliche Gebühren. Twyne Table ist anders: einmal einrichten, unbegrenzt nutzen, 0% Kommission — egal wie viele Bestellungen.',
      checks: [
        '0% Kommission auf alle Bestellungen',
        'Keine App nötig — direkt im Browser',
        'Speisekarte in Minuten aktualisieren',
      ],
    },
    pricing: [
      {
        label: 'Basic',
        preis: 'CHF 39',
        einheit: '/ Monat',
        beschreibung: 'Für kleine Gastrobetriebe',
        features: ['QR-Speisekarte', 'Online-Reservierungen', 'Automatische E-Mails', 'Echtzeit-Updates', 'E-Mail Support'],
      },
      {
        label: 'Restaurant',
        preis: 'CHF 89',
        einheit: '/ Monat',
        beschreibung: 'Für Restaurants mit vollem Betrieb',
        features: ['Alles aus Basic', 'Take-away Bestellungen', 'Allergen-Management', 'Analytics & Reports', 'Telefon & Chat Support'],
        highlight: true,
      },
      {
        label: 'Gruppe',
        preis: 'Auf Anfrage',
        einheit: '',
        beschreibung: 'Für Restaurant-Gruppen & Ketten',
        features: ['Mehrere Standorte', 'Zentrale Verwaltung', 'Eigenes Branding', 'API-Integration', 'Dedicated Support'],
      },
    ],
    faq: [
      { question: 'Müssen Gäste eine App herunterladen?', answer: 'Nein. QR-Code scannen reicht — der Browser öffnet sich automatisch. Keine App, kein Konto, keine Hürde.' },
      { question: 'Funktioniert das für Cafés und Bars?', answer: 'Ja — für alle Gastrobetriebe, egal ob Restaurant, Café, Bar oder Foodtruck.' },
      { question: 'Wie schnell sind wir live?', answer: 'In der Regel 48 Stunden nach Auftragserteilung. Wir richten alles ein, Sie müssen nur die QR-Codes ausdrucken.' },
      { question: 'Kann ich die Speisekarte selbst ändern?', answer: 'Ja — jederzeit, sofort, ohne technische Kenntnisse. Änderungen sind innerhalb von Sekunden für alle Gäste sichtbar.' },
    ],
    ctaTitle: 'Weniger Telefon, mehr Gäste.',
    produktEnum: 'TABLE',
    color: '#059669',
  },

  desk: {
    slug: 'desk',
    meta: {
      title: 'Twyne Desk — CRM Software für KMU Schweiz | Windows & Mac',
      description: 'Einfache CRM-Software für Schweizer KMU. Kunden, Offerten, Rechnungen für Windows & Mac. Offline nutzbar. Swiss-Made. Demo anfragen.',
    },
    hero: {
      badge: 'Desktop-Software · Twyne Desk',
      h1: 'Twyne Desk — CRM-Software für Schweizer KMU',
      h1Purple: 'die wirklich funktioniert',
      description: 'Kunden verwalten, Offerten erstellen, Rechnungen versenden — in einer Desktop-Anwendung für Windows und Mac. Einfach, schnell, auch offline.',
      tagline: 'Windows & Mac · Offline nutzbar · Daten bleiben bei Ihnen',
    },
    features: [
      { icon: 'Users', title: 'Kundenverwaltung', text: 'Kontakte, Firmen, Notizen, Dokumente und Kommunikationshistorie zentral verwalten. Alles auf einen Blick — kein Suchen in E-Mails oder Excel.' },
      { icon: 'FileText', title: 'Offerten als PDF', text: 'Professionelle Offerten in Minuten erstellen und als PDF versenden. Corporate Design, automatische Nummerierung, digitale Unterschrift.' },
      { icon: 'CreditCard', title: 'Rechnungen & Mahnungen', text: 'Rechnungen erstellen, versenden und verfolgen. Automatische Mahnungen, CHF-optimiert, MWST-konform. Zahlungsstatus auf einen Blick.' },
      { icon: 'Bell', title: 'Aufgaben & Wiedervorlagen', text: 'Nichts vergessen, alles terminiert. Wiedervorlagen für Angebote, Nachfass-Aktionen und Kundengeburtstage. Ihr persönlicher Assistent.' },
      { icon: 'Shield', title: 'Offline-Nutzung', text: 'Kein Internet nötig — Twyne Desk funktioniert vollständig offline. Wenn Sie wieder online sind, synchronisiert sich alles automatisch.' },
      { icon: 'Server', title: 'Datensicherung', text: 'Automatische lokale Sicherung oder verschlüsselte Cloud-Sicherung in der Schweiz. Ihre Daten sind immer geschützt.' },
    ],
    stats: [
      { value: '5 Min', label: 'Installation' },
      { value: 'Offline', label: 'nutzbar' },
      { value: 'CHF', label: 'optimiert' },
      { value: 'Swiss', label: 'Made' },
    ],
    splitHighlight: {
      icon: 'LayoutDashboard',
      quote: 'Salesforce zu teuer. Excel zu umständlich.',
      h3: 'CRM für Schweizer KMU — einfach und bezahlbar',
      text: 'Grosse CRM-Systeme sind für KMU oft überdimensioniert und zu teuer. Twyne Desk ist speziell für Schweizer KMU entwickelt — einfach zu bedienen, läuft offline, und kostet einen Bruchteil von Salesforce oder HubSpot.',
      checks: [
        'Läuft auf Windows & Mac, auch offline',
        'Einmalige Lizenz — keine monatlichen Kosten',
        'In 5 Minuten installiert und einsatzbereit',
      ],
    },
    pricing: [
      {
        label: 'Solo',
        preis: 'CHF 29',
        einheit: '/ Monat',
        beschreibung: 'Für Einzelpersonen & Freelancer',
        features: ['1 Nutzer', 'Unbegrenzte Kunden', 'Offerten & Rechnungen', 'Lokale Datensicherung', 'E-Mail Support'],
      },
      {
        label: 'Team',
        preis: 'CHF 79',
        einheit: '/ Monat',
        beschreibung: 'Für KMU-Teams bis 5 Nutzer',
        features: ['5 Nutzer', 'Cloud-Synchronisation', 'Team-Aufgaben', 'API-Zugang', 'Priority Support'],
        highlight: true,
      },
      {
        label: 'Business',
        preis: 'Auf Anfrage',
        einheit: '',
        beschreibung: 'Für grosse Teams & individuelle Anforderungen',
        features: ['Unbegrenzte Nutzer', 'Custom Felder', 'Integrationen', 'SLA-Garantie', 'Dedicated Support'],
      },
    ],
    faq: [
      { question: 'Funktioniert Twyne Desk ohne Internet?', answer: 'Ja — vollständig offline nutzbar. Wenn Sie wieder online sind, synchronisiert sich alles automatisch.' },
      { question: 'Sind Daten DSGVO-konform?', answer: 'Ja — Daten werden lokal gespeichert oder verschlüsselt in der Schweiz. Kein Zugriff durch Dritte.' },
      { question: 'Wie lange dauert die Installation?', answer: '5 Minuten. Download, installieren, loslegen. Keine Konfiguration nötig.' },
      { question: 'Gibt es eine Testphase?', answer: 'Ja — 14 Tage kostenlos, keine Kreditkarte nötig.' },
    ],
    ctaTitle: 'CRM-Software die wirklich funktioniert.',
    produktEnum: 'DESK',
    color: '#0EA5E9',
  },

  flow: {
    slug: 'flow',
    meta: {
      title: 'Twyne Flow — Event Software Schweiz | Ticketing & QR Check-in',
      description: 'Professionelle Event-Software für Schweizer Veranstalter. Ticketing, Anmeldungen, QR-Check-in. Windows & Mac, auch offline. Demo anfragen.',
    },
    hero: {
      badge: 'Desktop-Software · Twyne Flow',
      h1: 'Twyne Flow — Events professionell verwalten,',
      h1Purple: 'Tickets verkaufen',
      description: 'Ticketing, Anmeldungen, QR-Check-in und Teilnehmer-Kommunikation — alles in einer Desktop-Software für Windows und Mac. Auch offline vor Ort nutzbar.',
      tagline: 'Windows & Mac · Offline Check-in · 0% Kommission',
    },
    features: [
      { icon: 'CreditCard', title: 'Online-Ticketing', text: 'Tickets verkaufen, Zahlungen abwickeln — direkt, ohne Mittelsmann, ohne Kommission. Kreditkarte, TWINT, Überweisung. Der gesamte Erlös bleibt bei Ihnen.' },
      { icon: 'Smartphone', title: 'QR-Check-in', text: 'Gäste einchecken per QR-Code-Scanner — auch offline. Für zuverlässigen Einlass ohne Internetabhängigkeit. Sync nach dem Event automatisch.' },
      { icon: 'FileText', title: 'Anmelde-Formulare', text: 'Massgeschneiderte Formulare pro Event. Fragen, Kleidergrössenwahl, Ernährungspräferenzen, T-Shirt-Bestellung — alles in einem Schritt.' },
      { icon: 'Mail', title: 'Automatische Mails', text: 'Buchungsbestätigung, Erinnerung 48h vorher, Dankes-E-Mail nach dem Event. Alles automatisch, alles personalisiert.' },
      { icon: 'Users', title: 'Teilnehmerlisten', text: 'Exportierbar als Excel oder PDF. Filterbar nach Status, Zahlungsart, Ticketkategorie. Druckbereit für den Check-in vor Ort.' },
      { icon: 'Globe', title: 'Event-Landingpage', text: 'Für jeden Event eine eigene Landingpage — inklusive, professionell, mit Ihrem Branding. Direkt verlinkt mit dem Ticketing.' },
    ],
    stats: [
      { value: '0%', label: 'Kommission' },
      { value: 'Offline', label: 'Check-in möglich' },
      { value: 'QR', label: 'Scanner inklusive' },
      { value: '50–5000', label: 'Teilnehmer' },
    ],
    splitHighlight: {
      icon: 'Ticket',
      quote: 'Events ohne Stress.',
      h3: 'Event-Software die einfach funktioniert',
      text: 'Twyne Flow übernimmt die komplette Event-Logistik: Tickets verkaufen, Anmeldungen verwalten, QR-Codes erstellen, Check-in durchführen. Alles in einem System, ohne Provision, ohne App-Zwang.',
      checks: [
        'Ticketverkauf & Online-Anmeldung integriert',
        'QR-Code Check-in — auch offline',
        '0% Kommission auf Ticketverkäufe',
      ],
    },
    pricing: [
      {
        label: 'Basic',
        preis: 'CHF 59',
        einheit: '/ Event',
        beschreibung: 'Für Events bis 200 Teilnehmer',
        features: ['Bis 200 Teilnehmer', 'Online-Ticketing', 'QR-Check-in', 'Automatische Mails', 'E-Mail Support'],
      },
      {
        label: 'Professional',
        preis: 'CHF 149',
        einheit: '/ Event',
        beschreibung: 'Für Events bis 1000 Teilnehmer',
        features: ['Bis 1000 Teilnehmer', 'Mehrere Ticketkategorien', 'Custom Formulare', 'Analytics', 'Priority Support'],
        highlight: true,
      },
      {
        label: 'Enterprise',
        preis: 'Auf Anfrage',
        einheit: '',
        beschreibung: 'Für Grossevents & Veranstalter',
        features: ['Unbegrenzte Teilnehmer', 'Mehrere Events gleichzeitig', 'White-Label', 'API-Integration', 'Dedicated Support'],
      },
    ],
    faq: [
      { question: 'Funktioniert der Check-in ohne Internet?', answer: 'Ja — der QR-Scanner arbeitet vollständig offline. Sync findet automatisch statt wenn eine Verbindung verfügbar ist.' },
      { question: 'Welche Zahlungsmethoden werden unterstützt?', answer: 'Kreditkarte (Visa, Mastercard), TWINT und Banküberweisung. Weitere auf Anfrage.' },
      { question: 'Für welche Events ist Twyne Flow geeignet?', answer: 'Sport, Kultur, Seminare, Firmenevents, Konzerte — alles von 50 bis 5000 Teilnehmer.' },
      { question: 'Gibt es eine Testphase?', answer: 'Ja — Demo-Zugang kostenlos, kein Kreditkarte nötig. Zeigen Sie uns Ihr Event und wir richten einen Testaccount ein.' },
    ],
    ctaTitle: 'Professionelle Events. Null Kommission.',
    produktEnum: 'FLOW',
    color: '#F59E0B',
  },
}

export const produkteSlugs = Object.keys(produkteData)
