export interface BrancheChallenge {
  icon: string
  title: string
  text: string
}

export interface BrancheLeistung {
  icon: string
  title: string
  text: string
}

export interface BrancheProjekt {
  name: string
  kategoriLabel: string
  beschreibung: string
  thumbnailColor: string
}

export interface BranchenFaq {
  question: string
  answer: string
}

export interface BrancheData {
  meta: { title: string; description: string }
  hero: { badge: string; h1: string; subtext: string }
  herausforderungen: BrancheChallenge[]
  leistungen: BrancheLeistung[]
  projekte: BrancheProjekt[]
  faq: BranchenFaq[]
  ctaTitle: string
}

export const branchenData: Record<string, BrancheData> = {
  restaurants: {
    meta: {
      title: 'Website für Restaurant Schweiz | Twyne',
      description: 'Professionelle Websites und Online-Buchungssysteme für Schweizer Restaurants. Mit TWINT-Integration und automatischer Tischreservierung.',
    },
    hero: {
      badge: 'Branchen · Restaurants & Gastronomie',
      h1: 'Website & digitale Lösungen für Restaurants in der Schweiz',
      subtext: 'Mehr Gäste, weniger Aufwand — mit einer professionellen Restaurant-Website und einem Buchungssystem das rund um die Uhr arbeitet, auch wenn Sie es nicht können.',
    },
    herausforderungen: [
      {
        icon: 'Phone',
        title: 'Reservierungen per Telefon kosten Zeit',
        text: 'Jedes Telefonat während des Mittagsservice kostet Ihnen Energie und Aufmerksamkeit. Fehlbuchungen, Doppelbelegungen und verpasste Anrufe führen zu Frust — bei Ihnen und Ihren Gästen.',
      },
      {
        icon: 'Search',
        title: 'Lokale Konkurrenz ist sichtbarer',
        text: 'Wenn potenzielle Gäste "Restaurant [Ihre Stadt]" googeln, erscheinen Sie nicht auf Seite 1. Die Konkurrenz mit professionellem Google-Profil und optimierter Website bekommt die Besucher stattdessen.',
      },
      {
        icon: 'Globe',
        title: 'Website wirkt veraltet oder fehlt',
        text: 'Eine veraltete Website ohne Mobile-Optimierung, ohne aktuelle Speisekarte und ohne klare Kontaktinformationen signalisiert potenziellen Gästen: hier stimmt etwas nicht.',
      },
    ],
    leistungen: [
      { icon: 'Calendar', title: 'Online-Reservierungssystem', text: 'Gäste buchen direkt auf Ihrer Website — 24/7, ohne Telefonanruf. Automatische Bestätigungs-E-Mails, Erinnerungen und Kapazitätsverwaltung.' },
      { icon: 'Globe', title: 'Professionelle Restaurant-Website', text: 'Modernes Design mit Speisekarte, Bildergalerie, Öffnungszeiten und Kontakt. Perfekt auf Smartphone optimiert.' },
      { icon: 'MapPin', title: 'Lokales SEO & Google Maps', text: 'Google Business Profil optimiert, lokale Keywords und strukturierte Daten — damit Hungrige in Ihrer Nähe Sie finden.' },
      { icon: 'CreditCard', title: 'TWINT & Online-Zahlung', text: 'Integrierte Zahlungsmöglichkeiten für Gutscheine, Vorausbuchungen oder Takeaway-Bestellungen.' },
    ],
    projekte: [
      {
        name: 'ReservaPro',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Cloudbasiertes Buchungssystem für Restaurants mit automatischen Erinnerungen und Kapazitätsverwaltung.',
        thumbnailColor: '#2d1b69',
      },
      {
        name: 'LocalRank',
        kategoriLabel: 'SEO',
        beschreibung: 'Lokales SEO für einen Gewerbebetrieb — organischer Traffic um 200% gesteigert in drei Monaten.',
        thumbnailColor: '#1a3a1a',
      },
    ],
    faq: [
      { question: 'Was kostet ein Online-Reservierungssystem für Restaurants?', answer: "Eine einfache Reservierungslösung startet ab CHF 3'500. Ein vollständiges System mit Kapazitätsverwaltung, SMS-Erinnerungen und Dashboard kostet CHF 6'000–12'000. Monatliche Betriebskosten sind minimal." },
      { question: 'Kann ich die Speisekarte selbst aktualisieren?', answer: 'Ja — wir integrieren ein einfaches CMS damit Sie Speisekarte, Preise, Bilder und Öffnungszeiten jederzeit selbst anpassen können. Ohne technische Kenntnisse, auch vom Handy.' },
      { question: 'Wie lange dauert die Umsetzung?', answer: 'Eine Restaurant-Website ist in 2–3 Wochen fertig. Mit vollständigem Reservierungssystem rechnen wir 4–6 Wochen. Wir halten uns an vereinbarte Deadlines.' },
      { question: 'Ist das System DSGVO-konform?', answer: 'Ja. Alle Daten werden in der Schweiz gespeichert, die Datenschutzbestimmungen sind auf Schweizer Recht ausgerichtet und Gästdaten werden nur für den vereinbarten Zweck verwendet.' },
    ],
    ctaTitle: 'Mehr Gäste mit weniger Aufwand?',
  },

  kmu: {
    meta: {
      title: 'Digitalagentur für KMU Schweiz | Twyne',
      description: 'Webseiten, Software und digitale Lösungen für Schweizer KMU. Faire Preise, persönliche Betreuung, Schweizer Qualität.',
    },
    hero: {
      badge: 'Branchen · KMU & Gewerbebetriebe',
      h1: 'Digitalagentur für KMU in der Schweiz',
      subtext: 'Wir verstehen die Realität von Schweizer KMU: begrenzte Zeit, knappes Budget, grosse Ziele. Twyne liefert digitale Lösungen die wirken — ohne unnötigen Aufwand, ohne übertriebene Kosten.',
    },
    herausforderungen: [
      {
        icon: 'Clock',
        title: 'Keine Zeit für digitale Themen',
        text: 'Als KMU-Inhaber stecken Sie im operativen Alltag. Für Website-Updates, SEO-Optimierungen oder digitale Strategien bleibt keine Zeit — und die Konkurrenz zieht online vorbei.',
      },
      {
        icon: 'TrendingDown',
        title: 'Veraltete Software bremst das Wachstum',
        text: 'Excel-Tabellen, manuelle Prozesse, fehlende Vernetzung von Systemen — das kostet täglich Stunden und macht Skalierung unmöglich.',
      },
      {
        icon: 'Users',
        title: 'Kunden finden die Konkurrenz zuerst',
        text: 'Wenn Ihre Website nicht professionell wirkt oder bei Google nicht gefunden wird, verlieren Sie potenzielle Kunden noch bevor die erste Kontaktaufnahme stattfindet.',
      },
    ],
    leistungen: [
      { icon: 'Globe', title: 'Professionelle KMU-Website', text: 'Sauberes Design, schnelle Ladezeiten, SEO-optimiert von Anfang an. Ihr digitaler Auftritt der Kunden gewinnt.' },
      { icon: 'Code2', title: 'Individuelle Software', text: 'Massgeschneiderte Tools die genau Ihre Prozesse abbilden — kein teures Standard-System das nicht passt.' },
      { icon: 'BarChart2', title: 'Dashboards & Reporting', text: 'Echtzeitüberblick über Umsatz, Aufträge und KPIs — statt fünf Excel-Tabellen.' },
      { icon: 'Sparkles', title: 'KI-Automatisierung', text: 'Repetitive Aufgaben automatisieren, Chatbots für häufige Kundenanfragen — mehr Effizienz mit weniger Aufwand.' },
    ],
    projekte: [
      {
        name: 'PulseBoard',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'KPI-Dashboard für ein Handelsunternehmen — ersetzt fünf Excel-Tabellen.',
        thumbnailColor: '#1a2e2a',
      },
      {
        name: 'Vaultly',
        kategoriLabel: 'Software',
        beschreibung: 'Desktop-Dokumentenverwaltung für KMUs — sicher, ohne Cloud-Zwang.',
        thumbnailColor: '#1a2744',
      },
    ],
    faq: [
      { question: 'Was kostet eine KMU-Website?', answer: "Einfache Unternehmenswebsites starten ab CHF 3'500. Vollständige Websites mit CMS kosten CHF 6'000–15'000. Wir erstellen eine transparente Offerte — ohne versteckte Kosten." },
      { question: 'Müssen wir langfristige Verträge abschliessen?', answer: 'Nein. Wir arbeiten auf Projekthonorarbasis. Für laufende Betreuung gibt es monatlich kündbare Wartungspakete — kein Vendor-Lock-in.' },
      { question: 'Arbeiten Sie auch mit kleinen KMU?', answer: 'Ja — wir arbeiten gerne mit kleinen Betrieben. Grösse spielt keine Rolle. Was zählt ist das Vorhaben und die Zusammenarbeit.' },
      { question: 'Wie schnell können wir starten?', answer: 'In der Regel sind wir innerhalb von 1–2 Wochen einsatzbereit. Kontaktieren Sie uns — wir melden uns innerhalb von 24 Stunden.' },
    ],
    ctaTitle: 'Digitalisierung die für KMU funktioniert?',
  },

  vereine: {
    meta: {
      title: 'Vereinswebsite Schweiz | Twyne',
      description: 'Professionelle Websites für Schweizer Vereine. Einfach zu verwalten, mit Mitgliederbereich und Event-Verwaltung.',
    },
    hero: {
      badge: 'Branchen · Vereine & Verbände',
      h1: 'Vereinswebsite erstellen lassen in der Schweiz',
      subtext: 'Eine professionelle Vereinswebsite die Ihr Engagement nach aussen zeigt, neue Mitglieder gewinnt und Ihren Vorstand entlastet — einfach zu verwalten, auch ohne technisches Know-how.',
    },
    herausforderungen: [
      {
        icon: 'Users',
        title: 'Mitgliederverwaltung ist aufwändig',
        text: 'Eintritte, Austritte, Adressänderungen per E-Mail koordinieren — das kostet den Vorstand Stunden. Ohne digitales System gehen Informationen verloren und die Mitgliederliste ist nie aktuell.',
      },
      {
        icon: 'Calendar',
        title: 'Events schlecht kommuniziert',
        text: 'Veranstaltungen werden per E-Mail und auf Facebook angekündigt — aber nicht zentral gesammelt. Mitglieder verpassen Events, Anmeldungen müssen manuell verwaltet werden.',
      },
      {
        icon: 'Globe',
        title: 'Veraltete oder keine Website',
        text: 'Eine veraltete Website die seit Jahren nicht aktualisiert wurde wirkt unprofessionell und schreckt potenzielle neue Mitglieder ab.',
      },
    ],
    leistungen: [
      { icon: 'Globe', title: 'Professionelle Vereinswebsite', text: 'Modernes Design mit Vereinsvorstellung, Vorstandsseite, News und Kontakt. Einfach zu verwalten ohne technische Kenntnisse.' },
      { icon: 'Users', title: 'Mitgliederbereich', text: 'Geschützter Bereich für Mitglieder mit Dokumenten, Protokollen und internen Informationen.' },
      { icon: 'Calendar', title: 'Event-Verwaltung', text: 'Events anlegen, publizieren und Anmeldungen digital verwalten — für Generalversammlungen, Turniere und Ausflüge.' },
      { icon: 'Mail', title: 'Newsletter & Kommunikation', text: 'Mitglieder per Newsletter informieren — automatisch und professionell.' },
    ],
    projekte: [
      {
        name: 'ReservaPro',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Buchungs- und Verwaltungssystem für Dienstleister — anpassbar für Vereins-Events.',
        thumbnailColor: '#2d1b69',
      },
      {
        name: 'ClinicDesk',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Digitale Formulare und automatische Kommunikation — Konzept übertragbar auf Vereinsbetrieb.',
        thumbnailColor: '#1a2a3a',
      },
    ],
    faq: [
      { question: 'Was kostet eine Vereinswebsite?', answer: "Eine einfache Vereinswebsite startet ab CHF 1'800. Mit Mitgliederbereich und Event-Verwaltung CHF 3'500–6'000. Für Vereine mit kleinem Budget haben wir massgeschneiderte Lösungen." },
      { question: 'Kann der Vorstand die Website selbst pflegen?', answer: 'Ja — das ist unser Ziel. Wir integrieren ein einfaches CMS und schulen Sie nach dem Launch ein. News, Events und Bilder können ohne technische Kenntnisse aktualisiert werden.' },
      { question: 'Ist ein Mitgliederbereich wirklich notwendig?', answer: 'Das hängt von Ihrem Verein ab. Für Vereine mit internen Dokumenten, Protokollen oder exklusiven Inhalten lohnt es sich sehr. Wir beraten Sie kostenlos.' },
      { question: 'Wie lange dauert die Umsetzung?', answer: 'Eine einfache Vereinswebsite: 2–3 Wochen. Mit Mitgliederbereich: 4–6 Wochen. Wir planen gerne rechtzeitig vor Ihrer Saisonvorbereitung.' },
    ],
    ctaTitle: 'Mehr Mitglieder, weniger Verwaltungsaufwand?',
  },

  startups: {
    meta: {
      title: 'Webentwicklung Startup Schweiz | Twyne',
      description: 'MVP, Landing Pages und skalierbare Webapplikationen für Schweizer Startups. Schnell, modern, investorenreif.',
    },
    hero: {
      badge: 'Branchen · Startups & Scale-ups',
      h1: 'Webentwicklung und MVP für Startups in der Schweiz',
      subtext: 'Vom ersten Prototypen bis zur skalierbaren Plattform — Twyne entwickelt Ihre digitale Grundlage schnell, technisch sauber und investorenreif.',
    },
    herausforderungen: [
      {
        icon: 'Zap',
        title: 'Time-to-Market ist entscheidend',
        text: 'Jede Woche ohne Produkt ist verlorene Zeit. Die Idee muss schnell als funktionierendes MVP in den Markt — bevor das Budget ausgeht oder die Konkurrenz zuvorkommt.',
      },
      {
        icon: 'TrendingUp',
        title: 'Technische Schulden von Anfang an',
        text: 'Schnell gebaute MVPs die keine skalierbare Architektur haben, werden zum Problem beim Wachstum. Refactoring kostet später mehr als einmaliges sauberes Bauen.',
      },
      {
        icon: 'DollarSign',
        title: 'Budget ist begrenzt',
        text: 'Investoren wollen Resultate sehen, nicht endlose Entwicklungsbudgets. Eine schlanke, fokussierte Entwicklung die Kernfunktionen zuerst liefert ist entscheidend.',
      },
    ],
    leistungen: [
      { icon: 'Zap', title: 'MVP-Entwicklung', text: 'Fokussiertes Minimum Viable Product in 4–8 Wochen — funktional, testbar, pitchbereit.' },
      { icon: 'Globe', title: 'Landing Pages & Investoren-Decks', text: 'Professionelle Präsentation Ihrer Idee — für Kunden, Investoren und Partner.' },
      { icon: 'Layers', title: 'Skalierbare Architektur', text: 'Von 10 auf 10\'000 Nutzer ohne technische Neubauten — moderne Stack-Auswahl von Anfang an.' },
      { icon: 'Code2', title: 'Technisches Mentoring', text: 'Wir begleiten Ihr internes Team, reviewen Code und helfen bei Architekturentscheidungen.' },
    ],
    projekte: [
      {
        name: 'ReservaPro',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'SaaS-Buchungsplattform von der Idee bis zum Launch — skalierbar, cloudbasiert.',
        thumbnailColor: '#2d1b69',
      },
      {
        name: 'PulseBoard',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Echtzeit-Dashboard mit moderner Tech-Architektur — erweiterbar und investorenreif.',
        thumbnailColor: '#1a2e2a',
      },
    ],
    faq: [
      { question: 'Wie schnell ist ein MVP fertig?', answer: 'Ein fokussiertes MVP ist in 4–8 Wochen launchbar. Voraussetzung: klare Anforderungen und schnelle Feedback-Loops. Wir arbeiten agil und zeigen laufend Fortschritte.' },
      { question: 'Bekommen wir den Quellcode?', answer: 'Ja, vollständig. Sie erhalten den kompletten Quellcode, Dokumentation und alle Zugänge. Kein Vendor-Lock-in.' },
      { question: 'Können wir später das Team intern aufbauen?', answer: 'Absolut. Viele unserer Startup-Kunden bauen nach dem MVP ein internes Entwicklerteam auf. Wir unterstützen bei der Übergabe und bleiben als Berater verfügbar.' },
      { question: 'Unterstützen Sie auch bei der technischen Due Diligence?', answer: 'Ja. Wir bereiten Dokumentation und Architektur-Übersichten vor die Investoren bei der Due Diligence verlangen.' },
    ],
    ctaTitle: 'Bereit für Ihr MVP?',
  },

  handwerker: {
    meta: {
      title: 'Website Handwerker Schweiz | Twyne',
      description: 'Professionelle Websites für Handwerker und Gewerbebetriebe. Mit Online-Offerten, Kundenbewertungen und lokalem SEO.',
    },
    hero: {
      badge: 'Branchen · Handwerk & Gewerbe',
      h1: 'Website für Handwerker und Gewerbebetriebe in der Schweiz',
      subtext: 'Während Sie arbeiten, arbeitet Ihre Website für Sie — gewinnt Aufträge, zeigt Referenzen und beantwortet häufige Fragen, rund um die Uhr.',
    },
    herausforderungen: [
      {
        icon: 'Phone',
        title: 'Anfragen kommen zur falschen Zeit',
        text: 'Auf der Baustelle klingelt das Handy — potenzielle Kunden die eine Offerte wollen. Ein Online-Anfrageformular filtert ernsthafte Anfragen und spart Ihnen Zeit.',
      },
      {
        icon: 'MapPin',
        title: 'Lokale Konkurrenz ist online besser aufgestellt',
        text: 'Wenn jemand "Maler Bern" oder "Elektriker Olten" sucht und Sie nicht in den ersten drei Ergebnissen erscheinen, verlieren Sie den Auftrag — noch bevor Sie wissen dass er existiert.',
      },
      {
        icon: 'Star',
        title: 'Referenzen und Bewertungen fehlen',
        text: 'Kunden vertrauen Handwerkern die Referenzprojekte zeigen und echte Bewertungen haben. Eine professionelle Website ist Ihr digitales Referenzportfolio.',
      },
    ],
    leistungen: [
      { icon: 'Globe', title: 'Handwerker-Website', text: 'Klares Design mit Leistungsübersicht, Referenzprojekten, Kundenbewertungen und Kontaktformular.' },
      { icon: 'FileText', title: 'Online-Offerten-Anfragen', text: 'Interessenten beschreiben ihr Projekt digital — Sie erhalten strukturierte Anfragen statt unvollständiger Telefongespräche.' },
      { icon: 'MapPin', title: 'Lokales SEO', text: 'Sichtbarkeit für Suchanfragen in Ihrer Region. Google My Business Optimierung und lokale Keyword-Strategie.' },
      { icon: 'Star', title: 'Bewertungs-Integration', text: 'Google-Bewertungen auf der Website einbinden und Kunden zur Bewertung einladen — automatisch nach Auftragsabschluss.' },
    ],
    projekte: [
      {
        name: 'Nobilis Tuning',
        kategoriLabel: 'Webseite',
        beschreibung: 'Professioneller Webauftritt für ein Gewerbeunternehmen mit Online-Konfigurator und SEO.',
        thumbnailColor: '#1a1a2e',
      },
      {
        name: 'LocalRank',
        kategoriLabel: 'SEO',
        beschreibung: 'Lokales SEO für einen Gewerbebetrieb — organischer Traffic um über 200% gesteigert.',
        thumbnailColor: '#1a3a1a',
      },
    ],
    faq: [
      { question: 'Brauche ich als Handwerker wirklich eine Website?', answer: 'Ja. Über 80% der Schweizer suchen Handwerker zuerst online. Wer keine professionelle Website hat, verliert Aufträge an Konkurrenten die online besser aufgestellt sind.' },
      { question: 'Was kostet eine Handwerker-Website?', answer: "Eine professionelle Website startet ab CHF 2'500. Mit Online-Offerten-System und lokalem SEO CHF 4'500–8'000. Investition die sich in der Regel nach wenigen Aufträgen amortisiert." },
      { question: 'Muss ich selbst Texte schreiben?', answer: 'Nein — wir übernehmen das Texten basierend auf einem Gespräch mit Ihnen. Sie kennen Ihr Handwerk, wir formulieren es für Ihre Kunden und für Google.' },
      { question: 'Kann ich Fotos von meinen Projekten selbst hochladen?', answer: 'Ja. Wir integrieren ein einfaches CMS damit Sie jederzeit neue Referenzprojekte, Fotos und News hinzufügen können — auch vom Smartphone.' },
    ],
    ctaTitle: 'Mehr Aufträge durch bessere Online-Sichtbarkeit?',
  },

  arztpraxen: {
    meta: {
      title: 'Website Arztpraxis Schweiz | Twyne',
      description: 'DSGVO-konforme Websites für Arztpraxen und Gesundheitsbetriebe. Mit Online-Terminbuchung und sicherer Datenverwaltung.',
    },
    hero: {
      badge: 'Branchen · Arztpraxen & Gesundheit',
      h1: 'Website für Arztpraxen und Gesundheitsbetriebe in der Schweiz',
      subtext: 'Weniger Telefonanrufe, mehr zufriedene Patienten — mit einer professionellen Praxiswebsite und einem sicheren Online-Terminbuchungssystem nach Schweizer Datenschutzstandards.',
    },
    herausforderungen: [
      {
        icon: 'Phone',
        title: 'Telefonanrufe überlasten das Praxisteam',
        text: 'Terminanfragen, Rezeptbestellungen, allgemeine Fragen — das Telefon klingelt ununterbrochen. Das bindet wertvolle Zeit die Ihr Team für die Patientenbetreuung braucht.',
      },
      {
        icon: 'Shield',
        title: 'Datenschutz ist nicht verhandelbar',
        text: 'Gesundheitsdaten unterliegen höchsten Datenschutzanforderungen. Nicht konforme Lösungen aus dem Ausland oder veraltete Formulare stellen ein rechtliches und reputationales Risiko dar.',
      },
      {
        icon: 'Users',
        title: 'Neue Patienten finden die Praxis nicht',
        text: 'Ohne optimiertes Google-Profil und professionelle Website bleiben viele Arztpraxen für Neupatienten unsichtbar — selbst wenn Kapazitäten vorhanden wären.',
      },
    ],
    leistungen: [
      { icon: 'Calendar', title: 'Online-Terminbuchung', text: 'Patienten buchen rund um die Uhr — mit automatischer Bestätigung, Erinnerung und einfacher Stornierung. DSGVO-konform, in der Schweiz gehostet.' },
      { icon: 'Globe', title: 'Professionelle Praxiswebsite', text: 'Übersichtliche Website mit Team, Leistungen, Anfahrt und FAQ. Mobile-optimiert, schnell und vertrauenswürdig.' },
      { icon: 'Shield', title: 'DSGVO-konforme Formulare', text: 'Anmeldeformulare, Befragungen und Dokumentenupload — sicher, verschlüsselt, rechtskonform nach Schweizer nDSG.' },
      { icon: 'Search', title: 'Lokales SEO', text: 'Gefunden werden wenn Patienten in Ihrer Region nach Ihrer Fachrichtung suchen. Google My Business Optimierung inklusive.' },
    ],
    projekte: [
      {
        name: 'ClinicDesk',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Patientenportal mit Online-Terminbuchung — telefonische Anfragen um 60% reduziert.',
        thumbnailColor: '#1a2a3a',
      },
      {
        name: 'ReservaPro',
        kategoriLabel: 'Webapplikation',
        beschreibung: 'Buchungssystem mit automatischen Erinnerungen und Kapazitätsverwaltung.',
        thumbnailColor: '#2d1b69',
      },
    ],
    faq: [
      { question: 'Ist die Online-Terminbuchung DSGVO- und nDSG-konform?', answer: 'Ja. Alle Daten werden in der Schweiz auf zertifizierten Servern gespeichert. Die Lösung entspricht dem Schweizer Datenschutzgesetz (nDSG) und der DSGVO. Keine Daten fliessen ins Ausland.' },
      { question: 'Kann ich die Terminbuchung mit meiner Praxis-Software verbinden?', answer: 'In vielen Fällen ja. Wir prüfen im Erstgespräch welche Integration möglich ist. Gängige Praxis-Systeme wie Doctolib oder eigene Lösungen können angebunden werden.' },
      { question: 'Was kostet die Praxiswebsite mit Terminbuchung?', answer: "Eine Praxiswebsite ab CHF 3'500. Mit integriertem Buchungssystem ab CHF 8'000. Wir erstellen eine transparente Offerte ohne versteckte Kosten." },
      { question: 'Können Patienten auch Dokumente hochladen?', answer: 'Ja — sichere Datei-Uploads für Krankenversicherungskarten, Überweisungen oder Befunde sind möglich. Alles verschlüsselt und DSGVO-konform.' },
    ],
    ctaTitle: 'Mehr Zeit für Ihre Patienten?',
  },
}

export const branchenMeta: Record<string, { label: string; icon: string; desc: string }> = {
  restaurants: { label: 'Restaurants', icon: 'Utensils', desc: 'Online-Reservierung & digitaler Auftritt' },
  kmu: { label: 'KMU & Gewerbe', icon: 'Briefcase', desc: 'Webseiten, Software & Automatisierung' },
  vereine: { label: 'Vereine', icon: 'Users', desc: 'Mitgliederverwaltung & Events' },
  startups: { label: 'Startups', icon: 'Rocket', desc: 'MVP, Landing Pages & skalierbare Apps' },
  handwerker: { label: 'Handwerker', icon: 'Wrench', desc: 'Online-Auftritte für Gewerbebetriebe' },
  arztpraxen: { label: 'Arztpraxen', icon: 'Heart', desc: 'DSGVO-konforme Praxislösungen' },
}
