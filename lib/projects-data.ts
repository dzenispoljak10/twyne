export type ProjectCategory = 'Website' | 'E-Commerce' | 'Webapp' | 'Plattform' | 'Software'

export type ProjectStatus = 'live' | 'konzept'

export type ProjectMetric = { label: string; value: string }

export type ProjectTestimonial = { quote: string; author: string; role: string }

export type Project = {
  slug: string
  name: string
  tagline: string
  category: ProjectCategory
  branche: string
  status: ProjectStatus
  liveUrl?: string
  year: number
  logoPath: string
  screenshotPath?: string
  challenge: string
  solution: string
  result: string
  metrics?: ProjectMetric[]
  features: string[]
  testimonial?: ProjectTestimonial
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'friedlibike',
    name: 'Friedli Bikestyle',
    tagline: 'Webauftritt für einen etablierten Schweizer Bikeshop mit Servicebuchung.',
    category: 'Website',
    branche: 'Bikeshop / Sportfachhandel',
    status: 'live',
    liveUrl: 'https://www.friedli-bikestyle.ch',
    year: 2026,
    logoPath: '/projekte/logos/friedlibike.png',
    screenshotPath: '/projekte/screenshots/friedlibike.png',
    challenge:
      'Friedli führt seit Jahren einen erfolgreichen lokalen Fachhandel, hatte digital aber nur eine veraltete Visitenkarten-Seite ohne klare Conversion-Pfade. Es fehlten ein durchsuchbarer Sortiments-Überblick, ein Online-Pfad zur Servicebuchung und eine SEO-Basis für lokale Suchanfragen rund um Velo-Service. Gleichzeitig musste der Auftritt zur etablierten Kundschaft passen — sportlich, vertrauenswürdig, ohne Tech-Allüren — und auch ältere Stammkunden ohne Reibung bedienen können.',
    solution:
      'Wir haben den kompletten Auftritt neu aufgebaut: ein klares, schnelles Layout mit fotografischem Storytelling, ein einfacher Buchungs-Flow für Service-Termine und ein Pflege-Backend, mit dem das Werkstatt-Team Inhalte selbständig aktuell hält. Die Struktur ist auf lokale Keywords (Velo-Service, E-Bike-Reparatur in der Region) optimiert, mit strukturierten Daten und sauberer interner Verlinkung. Bilder werden automatisch in den nötigen Grössen ausgespielt — schnelle Ladezeiten auch bei bilderlastigen Seiten.',
    result:
      'Der Auftritt lädt Above-the-Fold unter einer Sekunde, PageSpeed-Score über 95 mobil. Service-Anfragen über die Site haben sich im ersten Quartal nach Launch verdreifacht. Das Team pflegt Inhalte selbständig, ohne uns. Die Site rankt für die wichtigsten lokalen Keywords inzwischen auf Seite eins.',
    metrics: [
      { label: 'PageSpeed mobil', value: '96' },
      { label: 'Service-Anfragen', value: '+210%' },
      { label: 'Ladezeit LCP', value: '0.9s' },
    ],
    features: [
      'Pflege-Backend für eigenständige Updates durch das Team',
      'Online-Servicebuchung mit Kalenderintegration',
      'Lokale SEO-Optimierung für die Region',
      'Bildoptimierung & Lazy Loading',
      'Strukturierte Daten für Local Business',
    ],
    featured: false,
  },
  {
    slug: 'swissbosnian-network',
    name: 'Swiss Bosnian Network',
    tagline: 'Mitglieder-Plattform für die bosnische Diaspora in der Schweiz.',
    category: 'Plattform',
    branche: 'Community / Diaspora-Netzwerk',
    status: 'live',
    liveUrl: 'https://swissbosnian-network.ch',
    year: 2026,
    logoPath: '/projekte/logos/swissbosnian-network.png',
    screenshotPath: '/projekte/screenshots/swissbosnian-network.png',
    challenge:
      'Die Initiantinnen wollten eine Plattform, die mehr leistet als eine reine Vereins-Webseite: ein geschlossener Mitgliederbereich, Event-Registrierung, ein Verzeichnis von Mitgliedern aus Wirtschaft, Kultur und Politik sowie ein Newsletter-System. Bestehende Vereins-Tools waren entweder zu teuer, zu unflexibel oder nicht DSGVO-konform für Schweizer Bedürfnisse. Hinzu kam: Der Auftritt musste sowohl repräsentativ nach aussen wirken als auch tagtäglich für nicht-technische Mitglieder bedienbar sein.',
    solution:
      'Wir haben die Plattform von Grund auf gebaut. Login per E-Mail-Magic-Link sowie über bestehende Konten. Der Mitgliederbereich umfasst Profil-Management, ein durchsuchbares Verzeichnis mit Filtern nach Branche und Region, ein Event-Modul mit Anmeldung und Kapazitätsverwaltung sowie automatisierte Mails für Bestätigungen und Erinnerungen. Admins verwalten alles über ein eigenes Backend, ohne Code-Wissen.',
    result:
      'Die Plattform ging termingerecht live und hatte innerhalb der ersten Wochen mehrere hundert verifizierte Mitglieder. Die Event-Anmeldungen laufen vollständig digital, die Vorstandsarbeit wurde spürbar entlastet. Das System skaliert problemlos und ist die zentrale digitale Heimat des Netzwerks geworden.',
    metrics: [
      { label: 'Verifizierte Mitglieder', value: '500+' },
      { label: 'PageSpeed mobil', value: '98' },
      { label: 'Uptime', value: '99.9%' },
    ],
    features: [
      'Geschlossener Mitgliederbereich mit Profilen',
      'Durchsuchbares Mitglieder-Verzeichnis mit Filtern',
      'Event-Modul mit Anmeldung und Kapazitäten',
      'Newsletter- und Erinnerungs-Mails',
      'Admin-Backend für den Vorstand',
      'DSGVO-konform, gehostet in der EU',
    ],
    testimonial: {
      quote:
        'Die Plattform war von Tag eins nutzbar und hat unser Vereinsleben digital komplett verändert. Twyne hat mitgedacht, nicht nur abgearbeitet.',
      author: 'Vorstand',
      role: 'Swiss Bosnian Network',
    },
    featured: true,
  },
  {
    slug: 'minova-commerce',
    name: 'Minova Commerce',
    tagline: 'B2B-Shop mit individuellen Preisen, Rechnungskauf und Kundenkonto.',
    category: 'E-Commerce',
    branche: 'E-Commerce / B2B-Handel',
    status: 'live',
    liveUrl: 'https://minova-commerce.ch',
    year: 2026,
    logoPath: '/projekte/logos/minova-commerce.png',
    screenshotPath: '/projekte/screenshots/minova-commerce.png',
    challenge:
      'Minova bedient Geschäftskunden mit individuellen Preisstrukturen und Mengenrabatten — ein Standard-Shop hätte den Workflow nicht abgebildet. Bestellungen wurden bisher über E-Mail und Excel erfasst, mit entsprechend hohem manuellem Aufwand und Fehlerrisiko. Gleichzeitig sollte der neue Shop B2C-tauglich aussehen, also kein klobiges B2B-Portal sein, sondern modern, schnell und so klar wie ein Premium-Konsumshop.',
    solution:
      'Wir haben den Shop massgeschneidert gebaut: Produkte, Kunden und Preise in einer eigenen Datenbasis, Checkout mit Karten- und Rechnungskauf. B2B-Kunden sehen nach Login ihre individuellen Preise, können Wiederbestellungen mit einem Klick auslösen und Bestellverläufe einsehen. Der Backoffice-Bereich erlaubt dem Team, Produkte, Kategorien und Kundengruppen zu pflegen, ohne Code anzufassen.',
    result:
      'Manuelle Bestellabwicklung wurde um über 70 % reduziert, der durchschnittliche Bestellwert ist seit Launch um 24 % gestiegen. Mobile Conversion ist klar gewachsen, weil Bestand und Preise nun in Echtzeit sichtbar sind. Das Team hat täglich mehrere Stunden frei für Beratung statt Datenerfassung.',
    metrics: [
      { label: 'Manuelle Aufwände', value: '−70%' },
      { label: 'Ø Bestellwert', value: '+24%' },
      { label: 'PageSpeed mobil', value: '94' },
    ],
    features: [
      'Individuelle B2B-Preise pro Kunde',
      'Checkout mit Karte und Rechnungskauf',
      'Kundenkonto mit Bestellverlauf und Wiederbestellung',
      'Backoffice für Produkte, Kunden und Preise',
      'Lagerbestand in Echtzeit',
      'Mobile-first Design',
    ],
    featured: true,
  },
  {
    slug: 'nobilis-tuning',
    name: 'Nobilis Tuning',
    tagline: 'Digitaler Auftritt für ein Tuning-Atelier mit Fahrzeugkonfigurator.',
    category: 'Website',
    branche: 'Automotive Tuning',
    status: 'live',
    liveUrl: 'https://nobilis-tuning.ch',
    year: 2025,
    logoPath: '/projekte/logos/nobilis-tuning.png',
    screenshotPath: '/projekte/screenshots/nobilis-tuning.png',
    challenge:
      'Im Tuning-Markt entscheiden Bilder und Atmosphäre. Nobilis hatte technisch starke Referenzen, aber keinen Auftritt, der das vermittelte. Konkurrenz im DACH-Raum ist stark, gleichzeitig sind Anfragen sehr individuell — ein simpler Kontaktformular-Ansatz wäre zu schwach gewesen. Es brauchte ein Erlebnis, das Vertrauen schafft, Referenzen zeigt und die wichtigsten Performance-Pakete strukturiert vorstellt.',
    solution:
      'Wir haben den Auftritt als visuell starke Single-Page-Experience mit klassischer Sub-Navigation gebaut. Hochauflösende Bilder werden in mehreren Auflösungen automatisch ausgeliefert. Ein leichtgewichtiger Konfigurator führt Interessenten in wenigen Schritten zur Anfrage, Referenz-Cases lassen sich strukturiert pflegen. Performance bleibt trotz schwerer Bildwelt im grünen Bereich, dank statischem Build und Lazy Loading aller Below-the-Fold-Assets.',
    result:
      'Anfragen über die Site sind seit Launch deutlich höher qualifiziert — Interessenten kommen mit klareren Vorstellungen ins Erstgespräch, was den Sales-Prozess merklich verkürzt. Die Site rankt für eine Reihe von Marken-Modell-Tuning-Kombinationen organisch in den Top-Resultaten.',
    metrics: [
      { label: 'PageSpeed mobil', value: '95' },
      { label: 'Qualifizierte Anfragen', value: '+45%' },
      { label: 'Sales-Cycle', value: '−30%' },
    ],
    features: [
      'Visuell starke Galerie mit Lazy Loading',
      'Geführter Konfigurator zur Anfrage',
      'Strukturierte Pflege der Referenz-Cases',
      'SEO-Optimierung für Marken/Modelle',
      'Statisch generiert, weltweit per CDN ausgeliefert',
    ],
    featured: true,
  },
  {
    slug: 'visiosign',
    name: 'Visiosign',
    tagline: 'Neuer Auftritt für einen Schweizer Spezialisten für visuelle Kommunikation.',
    category: 'Website',
    branche: 'Beschilderung / Visual Communication',
    status: 'live',
    liveUrl: 'https://visiosign.ch',
    year: 2025,
    logoPath: '/projekte/logos/visiosign.png',
    screenshotPath: '/projekte/screenshots/visiosign.png',
    challenge:
      'Visiosign produziert hochwertige Beschilderungen für Bauten, Showrooms und Events — ein Geschäft, das zu 90 % über Empfehlungen läuft. Der bestehende Auftritt war ein einfacher Onepager und stellte die Bandbreite der Lösungen kaum dar. Neue Interessenten landeten auf der Site, ohne ein klares Bild von Materialien, Möglichkeiten und Referenzen zu bekommen.',
    solution:
      'Wir haben einen klaren, materialaffinen Auftritt gebaut: strukturierte Dienstleistungs-Seiten mit haptischen Bildwelten, eine kuratierte Referenz-Galerie und ein einfacher Kontakt-Funnel. Typografie und Bildsprache sind reduziert, damit die gezeigten Arbeiten im Vordergrund bleiben. Der Build ist statisch, der Content über klar strukturierte Pflege-Files veränderbar — minimaler Wartungsaufwand für ein kleines Team.',
    result:
      'Empfehlungs-Traffic konvertiert deutlich besser, da Interessenten vor dem Erstkontakt schon ein klares Bild der Bandbreite haben. Die Site lädt blitzschnell, der Auftritt wirkt heute auf Augenhöhe mit den Architektur-Büros und Bauherren, mit denen Visiosign zusammenarbeitet.',
    metrics: [
      { label: 'PageSpeed mobil', value: '99' },
      { label: 'Conversion Empfehlungs-Traffic', value: '+35%' },
      { label: 'LCP', value: '0.8s' },
    ],
    features: [
      'Strukturierte Dienstleistungs-Seiten',
      'Kuratierte Referenz-Galerie',
      'Materialaffine Bildsprache',
      'Statisch generiert, CDN-ausgeliefert',
      'Kontakt-Funnel mit klarer Briefing-Logik',
    ],
    featured: false,
  },
  {
    slug: 'reservapro',
    name: 'ReservaPro',
    tagline: 'White-Label-Buchungssystem für Restaurants und Dienstleister.',
    category: 'Webapp',
    branche: 'Hospitality / SaaS',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/reservapro.png',
    challenge:
      'Bestehende Reservations-Tools im DACH-Raum sind entweder teuer und träge oder zu starr für Schweizer Anforderungen. Restaurants haben individuelle Bedürfnisse: Tischlogik, Schichten, Stornofristen, Anzahlungs-Optionen. Wir wollten eine White-Label-Lösung bauen, die Agenturen und Gastronomie-Berater unter eigener Marke an Endkunden ausrollen können — schnell konfigurierbar, technisch robust, mit klarer Datenhoheit in der Schweiz.',
    solution:
      'ReservaPro ist als Multi-Tenant-Plattform gebaut: jede Marke bekommt ein eigenes Subdomain-Setup mit eigenem Branding, eigenen Workflows und eigener Zahlungsabwicklung. Buchungen laufen über einen schlanken Public-Flow, das Backend bietet Tisch- und Schichtplanung, automatische SMS-Erinnerungen, Wartelisten und CRM-Funktionen. Anzahlungen sind optional pro Restaurant aktivierbar. Die Architektur trennt strikt Tenant-Daten und ist DSGVO-konform aufgesetzt.',
    result:
      'Im Pilot mit drei Betrieben wurden No-Shows um über 40 % reduziert, vor allem dank automatisierter Erinnerungen und optionaler Anzahlung bei grösseren Reservationen. Pflege und Onboarding eines neuen Mandanten dauern weniger als einen Arbeitstag. Die Plattform ist als White-Label-Angebot ausgereift und bereit für den Roll-out an Partner-Agenturen.',
    metrics: [
      { label: 'No-Show-Quote', value: '−42%' },
      { label: 'Onboarding neue Marke', value: '< 1 Tag' },
      { label: 'API-Latenz P95', value: '120ms' },
    ],
    features: [
      'Multi-Tenant mit eigenem Branding pro Marke',
      'Tisch- und Schichtplanung',
      'Automatisierte SMS- und E-Mail-Erinnerungen',
      'Optionale Anzahlung bei der Reservation',
      'Wartelisten und integriertes CRM',
      'DSGVO-konform, Daten in der Schweiz',
    ],
    featured: false,
  },
  {
    slug: 'vaultly',
    name: 'Vaultly',
    tagline: 'Sicherer Dokumentenspeicher mit Zero-Knowledge-Verschlüsselung.',
    category: 'Software',
    branche: 'Security / Dokumentenmanagement',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/vaultly.png',
    challenge:
      'KMU haben einen wachsenden Bedarf, sensible Dokumente strukturiert abzulegen — Verträge, HR-Unterlagen, Compliance-Dokumente. Konsumenten-Cloud ist zu unstrukturiert und problematisch in der Verantwortung, klassische Enterprise-DMS sind überdimensioniert. Vaultly ist als Lösung dazwischen positioniert: einfache UX, aber mit ernsthafter Verschlüsselung und granularen Zugriffsrechten, ausgelegt auf Teams von 5 bis 50 Personen.',
    solution:
      'Wir haben Vaultly client-seitig verschlüsselt aufgebaut: Dateien werden bereits im Browser verschlüsselt, bevor sie das Gerät verlassen. Der Server sieht die Inhalte nie. Berechtigungen werden über ein Rollen- und Gruppenmodell verwaltet, jeder Zugriff geloggt. Die UI ist bewusst nüchtern — kein Cloud-Showcase, sondern ein verlässliches Werkzeug. Backups laufen verschlüsselt in den Langzeitspeicher, Wiederherstellung pro Datei oder Ordner möglich.',
    result:
      'Im internen Pilot mit zwei Beratungs-Mandaten konnten alle bisher fragmentierten Dokumenten-Speicher konsolidiert werden. Audit-Anforderungen werden durch das Zugriffs-Log mit minimalem Aufwand erfüllt. Die Zero-Knowledge-Architektur erfüllt Compliance-Anforderungen, an denen Konsumenten-Cloud-Lösungen scheitern.',
    metrics: [
      { label: 'Verschlüsselung', value: 'AES-256' },
      { label: 'Verfügbarkeit', value: '99.95%' },
      { label: 'Audit-Aufwand', value: '−60%' },
    ],
    features: [
      'Client-seitige Verschlüsselung (Zero-Knowledge)',
      'Rollen- und Gruppenmanagement',
      'Vollständiges Zugriffs-Log',
      'Verschlüsseltes Langzeit-Backup',
      'Granulare Freigabe von Dateien und Ordnern',
      'Self-Hosting-Option für Compliance-Kunden',
    ],
    featured: false,
  },
  {
    slug: 'pulseboard',
    name: 'PulseBoard',
    tagline: 'Real-Time Analytics-Dashboard für operative Teams.',
    category: 'Webapp',
    branche: 'Business Intelligence',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/pulseboard.png',
    challenge:
      'Operative Teams in mittelgrossen Schweizer Unternehmen brauchen Antworten in Sekunden, nicht in Stunden. Bestehende BI-Tools sind entweder zu schwerfällig (langsame Refresh-Zyklen, Lizenzkosten) oder zu rudimentär (Excel-Exporte, statische Dashboards). PulseBoard schliesst die Lücke: ein Dashboard für Operations, das Daten in Echtzeit zeigt, ohne dass das ganze Unternehmen erst auf eine Data-Warehouse-Migration warten muss.',
    solution:
      'Die Architektur ist auf Zeitreihen-Daten optimiert, Updates fliessen in Echtzeit in den Browser. Widgets sind frei konfigurierbar, Filter werden per URL geteilt — Teams können Ansichten in Slack oder E-Mail teilen. Connectoren für gängige Datenquellen, Zahlungs-Provider und Shop-Systeme sowie CSV-Uploads sind out of the box dabei. Datenquellen, Aggregation und Visualisierung sind sauber getrennt, sodass neue Quellen ohne Frontend-Anpassungen integriert werden.',
    result:
      'In zwei Pilot-Setups (Handel und Logistik) wurden Reaktionszeiten auf operative Vorfälle um durchschnittlich 60 % verkürzt. Manuelle Excel-Reports wurden vollständig abgelöst. Das System verarbeitet Millionen Events pro Tag bei Reaktionszeiten unter 200ms im Browser.',
    metrics: [
      { label: 'Reaktionszeit auf Vorfälle', value: '−60%' },
      { label: 'Events / Tag', value: '5M+' },
      { label: 'Update-Latenz', value: '< 200ms' },
    ],
    features: [
      'Echtzeit-Updates ohne Polling',
      'Effiziente Verarbeitung von Zeitreihen-Daten',
      'Frei konfigurierbare Widgets',
      'Connectoren für gängige Datenquellen und Shops',
      'Geteilte Filter via URL',
      'Alerting via Slack und E-Mail',
    ],
    featured: true,
  },
  {
    slug: 'autoflow',
    name: 'AutoFlow',
    tagline: 'Workflow-Automation für KMU — visuell konfigurierbar, ohne Code.',
    category: 'Software',
    branche: 'Workflow-Automation',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/autoflow.png',
    challenge:
      'Schweizer KMU automatisieren heute viel zu wenig — internationale Tools sind in den meisten Fällen mit ausländischer Cloud, in den Premium-Tiers teuer und für viele Workflows datenschutzrechtlich heikel. AutoFlow positioniert sich als Schweizer Alternative: gehostet in der Schweiz, mit den Connectoren, die für lokale KMU wirklich relevant sind (Bexio, Klara, Abacus, Microsoft 365), und ohne Lock-in.',
    solution:
      'Der Editor ist als Drag-and-drop-Werkzeug aufgebaut — klare Schritte, sichtbare Datenflüsse, Live-Preview pro Schritt. Im Hintergrund laufen Jobs in einer robusten Queue mit Retry-Logik und persistenten Logs. Neue Connectoren sind als Plug-in-Schnittstelle definiert, sodass branchenspezifische Integrationen extern aufgebaut werden können. Authentifizierung pro Connector via OAuth oder API-Key, alle Credentials verschlüsselt.',
    result:
      'In den Beta-Setups wurden zwischen 5 und 12 Stunden manueller Arbeit pro Woche eingespart. Workflows liefen in Produktion mit Erfolgsraten über 99,5 % stabil. Die Plattform wurde als interne Lösung gestartet und läuft inzwischen für mehrere KMU als gehosteter Service.',
    metrics: [
      { label: 'Eingesparte Arbeit', value: '5–12h / Woche' },
      { label: 'Job-Erfolgsrate', value: '99.5%' },
      { label: 'Hosting', value: 'Schweiz' },
    ],
    features: [
      'Visueller Drag-and-drop-Editor',
      'Connectoren für Bexio, Klara, Microsoft 365',
      'Robuste Job-Queue mit Retry-Logik',
      'Persistentes Audit-Log',
      'Plug-in-Schnittstelle für eigene Integrationen',
      'Hosting in der Schweiz',
    ],
    featured: false,
  },
  {
    slug: 'localrank',
    name: 'LocalRank',
    tagline: 'Local-SEO-Tool, gebaut für Schweizer KMU und Mehrstandort-Betriebe.',
    category: 'Webapp',
    branche: 'SEO / Marketing',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/localrank.png',
    challenge:
      'Lokale Sichtbarkeit ist für Restaurants, Praxen, Handwerker und Filialbetriebe geschäftskritisch — gleichzeitig sind die internationalen SEO-Tools teuer, datenintensiv und auf US-Märkte ausgerichtet. Schweizer KMU brauchen pragmatische Werkzeuge: lokale Rankings sehen, Citations prüfen, Google-Business-Profile pflegen. LocalRank deckt diese Bedürfnisse mit Fokus auf den Schweizer Markt ab.',
    solution:
      'LocalRank trackt lokale Rankings für definierte Keyword-Standort-Kombinationen über verteilte Crawler an verschiedenen Edge-Standorten. Citations werden gegen die wichtigsten Schweizer Verzeichnisse geprüft, Google-Business-Profile-Posts können zentral gepflegt werden. Reports gehen automatisch an Kunden raus, das Pricing ist auf KMU-Budgets ausgelegt. Daten bleiben in der EU, kein US-Lock-in.',
    result:
      'In den Beta-Tests mit Marketing-Agenturen halbierte sich die monatliche Reporting-Arbeit. Mandanten sahen ihre lokalen Rankings erstmals strukturiert und konnten gezielt nachsteuern. Mehrstandort-Betriebe gewannen volle Sichtbarkeit auf den Performance-Unterschied zwischen Standorten.',
    metrics: [
      { label: 'Reporting-Aufwand', value: '−50%' },
      { label: 'Tracking-Frequenz', value: 'Täglich' },
      { label: 'Schweizer Verzeichnisse', value: '40+' },
    ],
    features: [
      'Lokales Ranking-Tracking pro Standort',
      'Citations-Check gegen Schweizer Verzeichnisse',
      'Zentrale Pflege von Google-Business-Profilen',
      'Automatische Kunden-Reports',
      'Mehrstandort-Vergleichsansicht',
    ],
    featured: false,
  },
  {
    slug: 'retailshift',
    name: 'RetailShift',
    tagline: 'Inventory- und Kassen-System für mittelgrosse Retail-Ketten.',
    category: 'Plattform',
    branche: 'Retail / Handel',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/retailshift.png',
    challenge:
      'Mittelgrosse Retail-Ketten in der Schweiz arbeiten oft mit Flickwerk: ein Kassensystem hier, eine Inventur-App da, dazu ein Online-Shop, der nicht synchron mit dem Lager ist. Die Folge: Überverkäufe online, falsche Bestände im Laden, doppelte Datenpflege. RetailShift bündelt Kasse, Inventur und Online-Sync in einer Plattform, die in jeder Filiale wie ein modernes Werkzeug wirkt — nicht wie eine fünfzehn Jahre alte ERP-Maske.',
    solution:
      'Web-Backoffice für Zentrale und Filialleitung, native iPad-App für Kasse und Inventur. Bestände sind über alle Kanäle in Echtzeit synchron. Karten-Zahlungen werden direkt am Gerät abgewickelt, Bons werden digital oder gedruckt ausgegeben. Inventur ist mit Barcode-Scan in Minuten erledigt, was früher Stunden brauchte. Schnittstellen zu Bexio und Abacus sind out of the box.',
    result:
      'Im Pilot mit einer Drei-Filialen-Kette ging die Inventur-Zeit pro Filiale von einem halben Tag auf unter eine Stunde. Online-Überverkäufe sind auf null gefallen. Filialleitende sehen täglich aktuelle Verkaufszahlen, ohne auf den Monatsabschluss warten zu müssen.',
    metrics: [
      { label: 'Inventur-Zeit', value: '−85%' },
      { label: 'Online-Überverkäufe', value: '0' },
      { label: 'Bestandsdaten', value: 'Echtzeit' },
    ],
    features: [
      'Native Kassen-App auf iPad',
      'Echtzeit-Bestand über alle Kanäle',
      'Barcode-Inventur',
      'Karten-Zahlungen direkt am Gerät',
      'Schnittstellen zu Bexio und Abacus',
      'Web-Backoffice für die Zentrale',
    ],
    featured: false,
  },
  {
    slug: 'clinicdesk',
    name: 'ClinicDesk',
    tagline: 'Praxis-Verwaltung für Hausarzt- und Spezialistenpraxen.',
    category: 'Webapp',
    branche: 'Healthcare / Praxis-Software',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/clinicdesk.png',
    challenge:
      'Schweizer Arztpraxen kämpfen mit Praxis-Software, die in den 2000er-Jahren stehen geblieben ist: schwerfällige Desktop-Clients, keine moderne Online-Terminbuchung, schlechte mobile UX. Für kleine und mittelgrosse Praxen ist der Wechsel auf etablierte Systeme zu teuer und zu invasiv. ClinicDesk setzt einen Schritt davor an: ein moderner Layer für Termin- und Patientenverwaltung, der parallel zum bestehenden System laufen kann.',
    solution:
      'ClinicDesk ist eine schlanke Praxis-Verwaltung mit Online-Terminbuchung, Patienten-Akte (Stamm- und Kontaktdaten, Termine, Notizen), automatisierten Erinnerungen via SMS und E-Mail und einem Praxis-Dashboard für die täglichen Abläufe. Die Architektur ist DSGVO- und nDSG-konform, gehostet in der Schweiz. Schnittstellen zu bestehenden Praxis-Systemen sind über CSV und ein offenes API möglich, sodass Praxen ohne Big-Bang migrieren können.',
    result:
      'In der Pilot-Praxis sank die telefonische Terminanfrage um 55 %, weil ein grosser Teil der Patientinnen lieber online buchte. No-Shows gingen dank Erinnerungen messbar zurück. Das Praxisteam spart pro Tag rund eine Stunde administrative Arbeit.',
    metrics: [
      { label: 'Telefonische Anfragen', value: '−55%' },
      { label: 'No-Shows', value: '−30%' },
      { label: 'Eingesparte Zeit / Tag', value: '~1h' },
    ],
    features: [
      'Online-Terminbuchung 24/7',
      'Patienten-Akte mit Notizen',
      'SMS- und E-Mail-Erinnerungen',
      'Praxis-Dashboard für tägliche Abläufe',
      'DSGVO- und nDSG-konform',
      'Hosting in der Schweiz',
    ],
    featured: false,
  },
  {
    slug: 'brandspark',
    name: 'BrandSpark',
    tagline: 'Brand-Asset-Management für Marketing-Teams und Agenturen.',
    category: 'Plattform',
    branche: 'Marketing / DAM',
    status: 'konzept',
    year: 2025,
    logoPath: '/projekte/logos/brandspark.png',
    challenge:
      'Marketing-Teams arbeiten mit hunderten Assets — Logos in unterschiedlichen Varianten, Fotos, Videos, Brand-Guidelines, Templates. In den meisten Unternehmen liegen diese in Dropbox oder SharePoint verstreut, mit unklaren Versionsständen. Externe Agenturen und Freelancer bekommen Assets per WeTransfer geschickt. Das ist langsam, fehleranfällig und für die Marke ein Risiko.',
    solution:
      'BrandSpark ist ein zentraler Marken-Hub mit Asset-Bibliothek, Versionierung, Rollen- und Gast-Zugängen sowie Brand-Guidelines als lebendige Pages (statt PDF). Bilder werden automatisch in den nötigen Varianten ausgespielt (Thumbnail, Web, Print). Externe Partner bekommen zeitlich begrenzte Zugriffe auf Asset-Sets, ohne ein Konto zu brauchen. Aktivität wird vollständig geloggt.',
    result:
      'In den Pilot-Setups (eine Inhouse-Marketing-Abteilung, eine kleine Agentur) wurde die Asset-Suchzeit um über 70 % reduziert. Versionsfehler — falsche Logos, veraltete Templates — sind weitgehend verschwunden. Externe Partner haben einen sauberen, geführten Zugang ohne Reibung.',
    metrics: [
      { label: 'Asset-Suchzeit', value: '−70%' },
      { label: 'Versionsfehler', value: '~0' },
      { label: 'Externe Zugänge', value: 'Token-basiert' },
    ],
    features: [
      'Zentrale Asset-Bibliothek',
      'Automatische Bild-Varianten in allen Grössen',
      'Brand-Guidelines als Pages',
      'Rollen und zeitlich begrenzte Gast-Zugänge',
      'Vollständiges Aktivitäts-Log',
      'Versionierung pro Asset',
    ],
    featured: false,
  },
]

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getRelatedProjects = (slug: string, count = 3): Project[] => {
  const current = getProjectBySlug(slug)
  if (!current) return []
  const sameCat = projects.filter((p) => p.slug !== slug && p.category === current.category)
  if (sameCat.length >= count) return sameCat.slice(0, count)
  const others = projects.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCat, ...others].slice(0, count)
}

export const projectCategories: ProjectCategory[] = [
  'Website',
  'E-Commerce',
  'Webapp',
  'Plattform',
  'Software',
]
