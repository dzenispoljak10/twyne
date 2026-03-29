export type FaqItem = { question: string; answer: string }
export type ProcessStep = { num: string; title: string; description: string }
export type Benefit = { iconName: string; title: string; text: string }
export type Differentiator = { title: string; text: string }

export interface LeistungData {
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    breadcrumb: string
    badge: string
    h1: string
    h1Purple: string
    description: string
    imageUrl: string
    imageAlt: string
  }
  introTitle?: string
  intro?: string[]
  stats: Array<{ value: string; label: string }>
  introChecks?: string[]
  splitHighlight: {
    icon: string
    quote: string
    h3: string
    text: string
    checks: string[]
  }
  benefits: Benefit[]
  process: ProcessStep[]
  differentiators: Differentiator[]
  faq: FaqItem[]
  ctaTitle: string
  dienstleistungEnum: 'WEBSEITEN' | 'WEBAPPLIKATIONEN' | 'SOFTWARE' | 'CMS' | 'KI_BERATUNG' | 'DIGITALE_TRANSFORMATION' | 'SEO' | 'MARKETING'
}

export const leistungenData: Record<string, LeistungData> = {
  webseiten: {
    meta: {
      title: 'Webseite erstellen lassen Schweiz | Professionelles Webdesign | Twyne',
      description: "Professionelle Webseiten für Schweizer KMU ab CHF 2'500. Modern, schnell, SEO-optimiert. Schweizer Webagentur — Offerte in 24h. Jetzt anfragen.",
      keywords: ['webseite erstellen lassen schweiz', 'webdesign schweiz', 'website agentur aargau', 'homepage erstellen schweiz', 'webentwicklung kmu'],
    },
    hero: {
      breadcrumb: 'Webseiten & Webdesign',
      badge: 'Leistung · Webseiten & Webdesign',
      h1: 'Professionelle Webseite erstellen lassen — für',
      h1Purple: 'Schweizer KMU',
      description: 'Ihre Website ist Ihr wichtigster Verkäufer — 24 Stunden täglich, 365 Tage im Jahr. Twyne entwickelt Webseiten die nicht nur gut aussehen, sondern auch bei Google gefunden werden und Besucher in Kunden verwandeln.',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Professionelles Webdesign für Schweizer KMU',
    },
    introTitle: 'Warum eine professionelle Website für Ihr KMU unverzichtbar ist',
    intro: [
      'Über 90% aller Schweizerinnen und Schweizer suchen Produkte und Dienstleistungen zuerst online — bevor sie ein Geschäft betreten, eine Empfehlung einholen oder einen Anruf tätigen. Eine professionelle, schnelle und gut gefundene Website ist heute keine Option mehr, sondern eine Notwendigkeit für jedes Unternehmen das wachsen will.',
      'Das Problem: Die meisten Websites scheitern an einem der drei entscheidenden Faktoren. Entweder sehen sie nicht professionell aus, laden zu langsam, oder werden von Google schlicht nicht gefunden. Eine schöne Website die niemand findet bringt keinen einzigen Kunden. Eine gut gefundene Website die unprofessionell wirkt verliert das Vertrauen sofort.',
      'Twyne entwickelt Webseiten die alle drei Faktoren vereinen: professionelles Design das Vertrauen schafft, technische Exzellenz die für schnelle Ladezeiten sorgt, und SEO-Optimierung von Anfang an — damit Google Ihre Website versteht, vertraut und empfiehlt. Als Schweizer Digitalagentur kennen wir den Schweizer Markt und wissen was Ihre Kunden erwarten.',
    ],
    stats: [
      { value: '60%+', label: 'Besuche via Mobile' },
      { value: '90+', label: 'Lighthouse Score' },
      { value: '24h', label: 'Offerte' },
      { value: '100%', label: 'Schweizer Hosting' },
    ],
    introChecks: [
      'Professionelles Design das Vertrauen schafft',
      'Lighthouse Score über 90 — blitzschnell',
      'SEO von Anfang an eingebaut',
      'CMS zur einfachen Inhaltspflege',
      'Swiss Hosting & DSGVO-konform',
    ],
    splitHighlight: {
      icon: 'Globe',
      quote: 'Ihre Website. Ihr wichtigster Verkäufer.',
      h3: 'Mobile-First — weil Ihre Kunden mobil sind',
      text: 'Über 60% aller Website-Besuche kommen vom Smartphone. Eine Website die auf dem Desktop schön aussieht, aber auf dem Handy unbrauchbar ist, verliert täglich potenzielle Kunden. Twyne entwickelt jede Website von Anfang an mobile-optimiert — Design, Navigation, Ladezeiten.',
      checks: [
        'Perfekte Darstellung auf Smartphone, Tablet & Desktop',
        'Touch-optimierte Navigation und Buttons',
        'Schnelle Ladezeiten auch im Mobilnetz',
      ],
    },
    benefits: [
      { iconName: 'Smartphone', title: 'Mobile-First Design', text: 'Über 60% aller Website-Besuche kommen heute vom Smartphone. Jede Twyne-Website ist von Grund auf mobile-optimiert — nicht als Nachgedanke, sondern als Ausgangspunkt. Perfekte Darstellung auf Smartphone, Tablet und Desktop.' },
      { iconName: 'Zap', title: 'Blitzschnelle Ladezeiten', text: 'Google bestraft langsame Websites im Ranking. Twyne-Websites erreichen regelmässig Lighthouse-Scores über 90 — durch optimierten Code, komprimierte Bilder und modernes Hosting. Ihre Besucher warten nicht, sie handeln.' },
      { iconName: 'Search', title: 'SEO von Anfang an', text: 'SEO ist kein Add-on, das man nachträglich aufschraubt — es ist ein fundamentaler Teil der Entwicklung. Wir optimieren URL-Struktur, Meta-Tags, Überschriften, Ladezeiten und interne Verlinkung bereits beim Aufbau Ihrer Website.' },
      { iconName: 'Pencil', title: 'Inhalte selbst pflegen', text: 'Mit dem integrierten CMS können Sie Texte, Bilder, News und Inhalte jederzeit selbst aktualisieren — ohne technische Kenntnisse, ohne auf uns warten zu müssen. Wir schulen Sie nach dem Launch persönlich ein.' },
      { iconName: 'Shield', title: 'Sicherheit & SSL', text: 'Alle Twyne-Websites sind mit SSL-Zertifikat gesichert, werden täglich gesichert und durch eine Firewall geschützt. Ihre Website und die Daten Ihrer Besucher sind jederzeit sicher.' },
      { iconName: 'Server', title: 'Swiss Hosting', text: 'Ihre Website wird in der Schweiz gehostet — für maximale Performance, 99.9% Uptime und vollständige DSGVO-Konformität. Keine Daten verlassen die Schweiz ohne Ihre Zustimmung.' },
    ],
    process: [
      { num: '01', title: 'Erstgespräch & Offerte', description: 'In einem kostenlosen, unverbindlichen Erstgespräch klären wir Ihre Ziele, Zielgruppe, Anforderungen und Budget. Sie erhalten innerhalb von 24 Stunden eine detaillierte Offerte mit transparenten Preisen. Kein Kleingedrucktes, keine Nachzahlungen.' },
      { num: '02', title: 'Design & Konzept', description: 'Wir entwickeln ein massgeschneidertes Design das zu Ihrer Marke und Zielgruppe passt. Mit Wireframes und einem Prototypen sehen Sie das Ergebnis bereits bevor eine Zeile Code geschrieben wird. Ihr Feedback fliesst direkt ein.' },
      { num: '03', title: 'Entwicklung & Testing', description: 'Professionelle Entwicklung mit modernen Technologien — Next.js für maximale Performance oder WordPress für einfache Inhaltspflege. Ausführliche Tests auf allen Geräten und in allen gängigen Browsern vor dem Launch.' },
      { num: '04', title: 'Launch & Begleitung', description: 'Go-Live mit persönlicher Begleitung. Wir stellen sicher dass alles reibungslos läuft — Domain, Hosting, SSL, Google Analytics. Danach schulen wir Sie ein und bleiben als langfristiger Partner an Ihrer Seite.' },
    ],
    differentiators: [
      { title: 'Schweizer Qualität', text: 'Wir liefern das, was wir versprechen — pünktlich und innerhalb des Budgets.' },
      { title: 'Langfristige Partnerschaft', text: 'Wir sind nach dem Launch für Updates, Wartung und Erweiterungen da.' },
      { title: 'Transparente Preise', text: 'Keine versteckten Kosten. Sie wissen von Anfang an, was Sie bezahlen.' },
      { title: 'Volle Code-Kontrolle', text: 'Sie erhalten den vollständigen Quellcode und volle Kontrolle über Ihre Website.' },
    ],
    faq: [
      { question: "Was kostet eine professionelle Website in der Schweiz?", answer: "Einfache Websites starten ab CHF 2'500, vollständige Unternehmenswebsites kosten CHF 5'000–15'000. Der genaue Preis hängt von Umfang, Funktionen und Design-Komplexität ab. Wir erstellen immer eine transparente Offerte — keine versteckten Kosten." },
      { question: 'Wie lange dauert die Erstellung meiner Website?', answer: 'Eine einfache Landing Page: 1–2 Wochen. Eine vollständige Website: 3–6 Wochen. Wir halten uns strikt an vereinbarte Deadlines — das ist unser Versprechen.' },
      { question: 'Kann ich meine Website selbst bearbeiten?', answer: 'Ja — wir integrieren ein CMS damit Sie Texte, Bilder und Inhalte selbst aktualisieren können. Ohne technische Kenntnisse, von überall. Wir schulen Sie persönlich ein.' },
      { question: 'Übernehmen Sie auch das Hosting?', answer: 'Ja. Wir bieten Hosting in der Schweiz an — mit 99.9% Uptime, täglichen Backups, SSL-Zertifikat und Firewall. Auf Wunsch betreuen wir Ihre Website langfristig.' },
      { question: 'Was passiert wenn meine Website nach dem Launch Probleme hat?', answer: 'Wir sind erreichbar. Bei technischen Problemen reagieren wir innerhalb von 24 Stunden — meistens deutlich schneller. Alle Pakete beinhalten mindestens 3 Monate Support nach dem Launch.' },
    ],
    ctaTitle: 'Bereit für Ihre neue Website?',
    dienstleistungEnum: 'WEBSEITEN',
  },

  webapplikationen: {
    meta: {
      title: 'Webapplikation entwickeln lassen Schweiz | SaaS & Web Apps | Twyne',
      description: 'Massgeschneiderte Webapplikationen für Schweizer Unternehmen. React, Next.js, TypeScript. Von der Idee bis zur fertigen Plattform. Twyne Schweizer Digitalagentur.',
      keywords: ['webapplikation entwickeln schweiz', 'saas entwicklung schweiz', 'react entwicklung aargau', 'next.js agentur schweiz', 'webanwendung kmu'],
    },
    hero: {
      breadcrumb: 'Webapplikationen',
      badge: 'Leistung · Webapplikationen & SaaS',
      h1: 'Webapplikationen entwickeln lassen — massgeschneidert für',
      h1Purple: 'Ihr Business',
      description: 'Wenn eine Website nicht reicht — wenn Sie ein Kundenportal, eine interne Plattform oder eine SaaS-Lösung brauchen. Twyne entwickelt Webapplikationen die exakt Ihren Anforderungen entsprechen.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Webapplikation Dashboard Entwicklung',
    },
    introTitle: 'Wann brauchen Sie eine Webapplikation statt einer Website?',
    intro: [
      'Eine Website informiert — eine Webapplikation handelt. Wenn Ihre Nutzer nicht nur lesen, sondern sich einloggen, Daten eingeben, Prozesse auslösen oder miteinander interagieren sollen, dann brauchen Sie eine Webapplikation. Der Unterschied liegt nicht im Aussehen, sondern in der Funktionalität.',
      'Typische Szenarien: Sie wollen Ihren Kunden ein Portal anbieten wo sie Bestellungen verwalten, Rechnungen einsehen oder Supporttickets erstellen können. Oder Sie brauchen intern ein Tool das Ihre Prozesse abbildet — CRM, Projektmanagement, Reporting. Oder Sie haben eine Geschäftsidee die als SaaS-Produkt anderen Unternehmen angeboten werden soll.',
      'Twyne entwickelt skalierbare Webapplikationen mit modernen Technologien — React und Next.js für das Frontend, Node.js für das Backend, PostgreSQL als Datenbank. Sauber architektiert, gut dokumentiert, langfristig wartbar. Und hosted in der Schweiz.',
    ],
    stats: [
      { value: '100%', label: 'massgeschneidert' },
      { value: 'Swiss', label: 'Hosting' },
      { value: 'Agil', label: 'entwickelt' },
      { value: '∞', label: 'erweiterbar' },
    ],
    introChecks: [
      'Massgeschneidert für Ihre Anforderungen',
      'Skalierbar mit Ihrem Unternehmen',
      'Swiss Hosting & DSGVO-konform',
      'Voller Quellcode-Zugriff',
      'Agile Entwicklung mit regelmässigen Reviews',
    ],
    splitHighlight: {
      icon: 'Code2',
      quote: 'Von der Idee zur fertigen Plattform.',
      h3: 'Webapplikationen die mit Ihnen wachsen',
      text: 'Ihr Business wächst — Ihre Software sollte mitwachsen. Twyne entwickelt Webapplikationen auf einer modernen, skalierbaren Architektur. Ob 10 oder 10\'000 Nutzer: Ihre Plattform läuft stabil, sicher und schnell.',
      checks: [
        'React & Next.js für maximale Performance',
        'API-First Architektur — offen für Integrationen',
        'Automatische Backups & 99.9% Uptime',
      ],
    },
    benefits: [
      { iconName: 'Globe', title: 'Kundenportale & Self-Service', text: 'Portale wo Ihre Kunden selbständig Informationen abrufen, Bestellungen verwalten oder Support anfragen können. 24/7 verfügbar, ohne Personalaufwand.' },
      { iconName: 'Layers', title: 'CRM & Verwaltungssysteme', text: 'Massgeschneiderte CRM-Systeme die exakt Ihren Workflows entsprechen — nicht umgekehrt. Kontakte, Angebote, Aufträge, Rechnungen — alles verknüpft.' },
      { iconName: 'Code2', title: 'SaaS-Plattformen', text: 'Sie haben eine Geschäftsidee die als Software-Produkt anderen Unternehmen verkauft werden soll. Twyne entwickelt die technische Plattform — von der Idee bis zum Launch.' },
      { iconName: 'Zap', title: 'Interne Tools & Automatisierung', text: 'Interne Werkzeuge die repetitive Prozesse automatisieren, Daten aus verschiedenen Quellen zusammenführen oder Ihrem Team die Arbeit erleichtern.' },
      { iconName: 'BarChart2', title: 'E-Commerce & Online-Shops', text: 'Individuelle Shop-Lösungen die über Standard-Systeme hinausgehen — mit spezifischen Bestellprozessen, Kundenverwaltung und Integrationen.' },
      { iconName: 'Shield', title: 'API-Integrationen & Schnittstellen', text: 'Verbindungen zwischen verschiedenen Systemen — CRM, ERP, Buchhaltung, Logistik. Daten fliessen automatisch, manuelle Übertragungen entfallen.' },
    ],
    process: [
      { num: '01', title: 'Anforderungsanalyse', description: 'Wir verstehen Ihr Business, Ihre Nutzer und Ihre Prozesse im Detail. Was soll die Applikation können? Wer nutzt sie? Welche Daten werden verarbeitet?' },
      { num: '02', title: 'Architektur & Design', description: 'Technische Architektur planen, Datenmodell entwerfen, UX-Konzept entwickeln. Alles bevor eine Zeile Code geschrieben wird.' },
      { num: '03', title: 'Agile Entwicklung', description: 'Wir entwickeln in kurzen Iterationen mit regelmässigen Reviews. Sie sehen laufend Fortschritte und können Feedback einbringen. Kein Blackbox-Entwickeln.' },
      { num: '04', title: 'Testing, Launch & Betrieb', description: 'Ausführliche Tests — manuell und automatisiert. Launch auf skalierbarer Infrastruktur. Dokumentation und Schulung inklusive. Langfristiger Betrieb durch Twyne.' },
    ],
    differentiators: [
      { title: 'Technische Tiefe', text: 'Wir kennen die Fallstricke — von N+1-Queries bis zu Race Conditions.' },
      { title: 'Vollständige Dokumentation', text: 'API-Docs, Architektur-Diagramme, Onboarding-Guide für Ihr Team.' },
      { title: 'Migrations-Support', text: 'Bestehende Legacy-Systeme migrieren wir strukturiert und sicher.' },
      { title: 'DevOps inklusive', text: 'CI/CD, Monitoring, Alerting — alles aufgesetzt und übergeben.' },
    ],
    faq: [
      { question: 'Wie lange dauert die Entwicklung einer Webapplikation?', answer: 'Einfache Applikationen: 4–8 Wochen. Mittlere Komplexität: 2–4 Monate. Komplexe Systeme: 4–12 Monate. Wir arbeiten agil mit regelmässigen Reviews — Sie behalten jederzeit den Überblick.' },
      { question: 'Was kostet eine Webapplikation?', answer: "Einfache Applikationen starten ab CHF 10'000. Mittlere Projekte kosten CHF 25'000–80'000. Enterprise-Lösungen auf Anfrage. Nach dem Erstgespräch erhalten Sie eine detaillierte Offerte." },
      { question: 'Wer hostet und betreibt die Applikation?', answer: 'Wir. Hosting, Monitoring, Updates, Backups und Support sind bei Twyne inklusive. Ihre Applikation läuft zuverlässig — ohne dass Sie sich um Technik kümmern müssen.' },
      { question: 'Kann die Applikation später erweitert werden?', answer: 'Ja — das ist unser Anspruch. Wir bauen von Anfang an für Erweiterbarkeit. Neue Features, neue Nutzergruppen, neue Integrationen können jederzeit hinzugefügt werden.' },
    ],
    ctaTitle: 'Bereit für Ihre Webapplikation?',
    dienstleistungEnum: 'WEBAPPLIKATIONEN',
  },

  software: {
    meta: {
      title: 'Softwareentwicklung Schweiz | Individuelle Software für KMU | Twyne',
      description: 'Individuelle Softwareentwicklung für Schweizer KMU. Windows & Mac Desktop-Software, massgeschneidert auf Ihre Prozesse. Swiss-Made. Twyne Digitalagentur.',
      keywords: ['softwareentwicklung schweiz', 'individuelle software kmu schweiz', 'desktop software entwicklung', 'backend entwicklung aargau', 'api entwicklung schweiz'],
    },
    hero: {
      breadcrumb: 'Softwareentwicklung',
      badge: 'Leistung · Individuelle Software',
      h1: 'Individuelle Softwareentwicklung für',
      h1Purple: 'Schweizer Unternehmen',
      description: 'Wenn keine Standard-Software Ihren Anforderungen entspricht — dann entwickeln wir sie. Massgeschneidert, wartbar, Swiss-Made.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Individuelle Softwareentwicklung Schweiz',
    },
    introTitle: 'Warum individuelle Software oft die bessere Wahl ist',
    intro: [
      'Standard-Software ist ein Kompromiss. Sie passen Ihre Prozesse der Software an — nicht umgekehrt. Das kostet Zeit, Effizienz und Motivation. Individuelle Software hingegen passt sich Ihren Prozessen an — exakt, ohne Kompromisse.',
      'Twyne entwickelt Desktop-Software für Windows und Mac die genau das tut was Sie brauchen. Ob Produktionsverwaltung, Lagerhaltung, Zeiterfassung, Rechnungsstellung oder branchenspezifische Speziallösungen — wir entwickeln Software die Ihr Team gerne benutzt.',
      'Als Schweizer Softwareentwickler kennen wir die lokalen Anforderungen: Schweizer Datenschutzrecht, CHF-Unterstützung, MWST-Abrechnung, Deutsch als Primärsprache. Und wir sind nach dem Launch erreichbar — für Updates, neue Features und Support.',
    ],
    stats: [
      { value: 'Windows', label: '& Mac' },
      { value: 'Offline', label: 'nutzbar' },
      { value: 'Swiss', label: 'Made' },
      { value: '0', label: 'Kompromisse' },
    ],
    introChecks: [
      'Läuft auf Windows & Mac',
      'Auch ohne Internet nutzbar',
      'Einmalig kaufen — keine Abo-Falle',
      'Exakt auf Ihre Prozesse zugeschnitten',
      'Kostenlose Updates im ersten Jahr',
    ],
    splitHighlight: {
      icon: 'Monitor',
      quote: 'Software die zu Ihnen passt — nicht umgekehrt.',
      h3: 'Individuelle Software statt Kompromiss-Lösungen',
      text: 'Standardsoftware deckt 80% der Anforderungen ab — die fehlenden 20% kosten täglich Zeit und Nerven. Twyne entwickelt Software die exakt zu Ihren Prozessen passt. Kein Workaround, keine Notlösungen, keine monatlichen Lizenzgebühren.',
      checks: [
        'Windows & Mac — ohne zusätzliche Lizenzkosten',
        'Offline-fähig für Zuverlässigkeit ohne Internet',
        'Einmalige Investition statt ewige Abo-Kosten',
      ],
    },
    benefits: [
      { iconName: 'Code2', title: 'Massgeschneidert', text: '100% auf Ihre Prozesse zugeschnitten — kein Feature zu viel, keines zu wenig. Keine Kompromisse mit Standardsoftware die 80% Ihrer Anforderungen erfüllt.' },
      { iconName: 'BarChart2', title: 'Skalierbar', text: 'Wächst mit Ihrem Unternehmen. Neue Nutzer, neue Standorte, neue Anforderungen — die Software passt sich an ohne alles neu bauen zu müssen.' },
      { iconName: 'Layers', title: 'Integrierbar', text: 'Verbindung mit bestehender Software, ERP, Buchhaltung, Kassensystemen. Daten fliessen automatisch — keine doppelte Eingabe mehr.' },
      { iconName: 'FileText', title: 'Wartbar & dokumentiert', text: 'Sauberer Code, klare Dokumentation — auch nach Jahren noch erweiterbar. Sie sind nicht von uns abhängig: Der Code gehört Ihnen.' },
      { iconName: 'Shield', title: 'Datensicherheit', text: 'Daten bleiben wo Sie sollen — auf Ihren Geräten oder in der Schweiz. Vollständige DSGVO-Konformität, keine Daten verlassen das Land ohne Ihre Zustimmung.' },
      { iconName: 'Globe', title: 'Schweizer Support', text: 'Persönlicher Ansprechpartner, erreichbar auf Deutsch, verständlich ohne Fachjargon. Wir sind nach dem Launch genauso erreichbar wie davor.' },
    ],
    process: [
      { num: '01', title: 'Prozessanalyse', description: 'Wir verstehen Ihre Arbeitsabläufe und identifizieren was wirklich gebraucht wird. Was kostet am meisten Zeit? Wo passieren die meisten Fehler? Was würde wirklich helfen?' },
      { num: '02', title: 'Design & Prototyp', description: 'Mockups und ein klickbarer Prototyp bevor eine Zeile Code geschrieben wird. Sie sehen das Ergebnis und können Feedback einbringen — ohne Entwicklungskosten zu riskieren.' },
      { num: '03', title: 'Entwicklung & Testing', description: 'Agile Entwicklung mit regelmässigen Reviews. Ausführliche Tests auf allen Zielsystemen. Sie sehen Fortschritte und können jederzeit Feedback geben.' },
      { num: '04', title: 'Schulung & Rollout', description: 'Rollout mit persönlicher Begleitung. Ihr Team wird eingeführt und geschult. Wir bleiben erreichbar — für Updates, neue Features und den täglichen Support.' },
    ],
    differentiators: [
      { title: 'Erfahrung mit KMU', text: 'Wir kennen die Realität von kleinen und mittleren Unternehmen in der Schweiz.' },
      { title: 'Keine Vendor Lock-in', text: 'Offene Standards, klarer Code-Ownership — keine Abhängigkeit von uns.' },
      { title: 'Integration-Expertise', text: 'ERP, CRM, E-Mail, APIs — wir verbinden, was verbunden werden muss.' },
      { title: 'Langfristiger Support', text: 'Software lebt. Wir sind für Updates und Erweiterungen langfristig da.' },
    ],
    faq: [
      { question: 'Was kostet individuelle Software?', answer: "Einfache Desktop-Anwendungen starten ab CHF 8'000. Komplexere Systeme je nach Umfang. Wir erstellen immer eine transparente Offerte nach dem Erstgespräch." },
      { question: 'Wie lange dauert die Entwicklung?', answer: 'Einfache Software: 4–8 Wochen. Komplexere Systeme: 3–6 Monate. Wir halten vereinbarte Deadlines ein — das ist unser Versprechen.' },
      { question: 'Wer betreut die Software nach dem Launch?', answer: 'Twyne. Updates, neue Features, Bugfixes — wir sind langfristiger Partner. Die meisten unserer Kunden arbeiten seit Jahren mit uns.' },
      { question: 'Kann bestehende Software integriert werden?', answer: 'Ja — wir entwickeln Schnittstellen zu bestehenden Systemen. Kein Datenverlust, kein Neustart von vorne.' },
    ],
    ctaTitle: 'Bereit für Ihre individuelle Software?',
    dienstleistungEnum: 'SOFTWARE',
  },

  cms: {
    meta: {
      title: 'CMS Website Schweiz | WordPress & Headless CMS | Twyne',
      description: 'CMS-Lösungen für Schweizer Unternehmen. WordPress, Headless CMS, massgeschneiderte Admin-Systeme. Inhalte selbst pflegen — einfach und ohne Vorkenntnisse.',
      keywords: ['cms schweiz', 'wordpress agentur schweiz', 'headless cms entwicklung', 'website cms selbst bearbeiten', 'sanity contentful schweiz'],
    },
    hero: {
      breadcrumb: 'CMS-Lösungen',
      badge: 'Leistung · Content Management',
      h1: 'CMS-Lösungen — Inhalte selbst verwalten,',
      h1Purple: 'ohne technische Kenntnisse',
      description: 'Ihre Website gehört Ihnen. Mit dem richtigen CMS können Sie Inhalte jederzeit selbst aktualisieren — ohne auf die Agentur warten zu müssen.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Content Management System Schweiz',
    },
    introTitle: 'Warum das richtige CMS den Unterschied macht',
    intro: [
      'Ein Content-Management-System (CMS) ist die Schaltzentrale Ihrer Website — das Backend wo Sie Texte, Bilder, News und Inhalte verwalten. Das richtige CMS gibt Ihnen volle Kontrolle über Ihre Website, ohne dass Sie Programmierkenntnisse benötigen.',
      'Aber nicht jedes CMS passt zu jedem Unternehmen. WordPress ist perfekt für viele Fälle — aber für eine performance-kritische Plattform oder eine komplexe Webanwendung braucht es andere Ansätze. Twyne analysiert Ihre Anforderungen und empfiehlt die CMS-Lösung die wirklich zu Ihnen passt.',
    ],
    stats: [
      { value: '5 Min', label: 'Inhalte aktualisieren' },
      { value: '0', label: 'Programmierkenntnisse nötig' },
      { value: '3', label: 'CMS-Optionen' },
      { value: '100%', label: 'Kontrolle' },
    ],
    introChecks: [
      'Inhalte in 5 Minuten aktualisieren',
      'Keine technischen Kenntnisse nötig',
      'Von überall erreichbar — Browser genügt',
      'Zugriffsverwaltung für Ihr Team',
      'Regelmässige Backups inklusive',
    ],
    splitHighlight: {
      icon: 'Pencil',
      quote: 'Ihre Website. Ihre Kontrolle.',
      h3: 'Nie wieder auf die Agentur warten',
      text: 'Wer für jede kleine Textänderung die Agentur anrufen muss, verliert Zeit und zahlt unnötig. Mit einem professionell eingerichteten CMS pflegen Sie Ihre Inhalte selbst — schnell, einfach, ohne technisches Wissen.',
      checks: [
        'Texte, Bilder & News selbst aktualisieren',
        'Klare Benutzeroberfläche ohne technische Hürden',
        'Schulung durch Twyne nach dem Launch',
      ],
    },
    benefits: [
      { iconName: 'Globe', title: 'WordPress', text: 'Das weltweit meistgenutzte CMS — und aus gutem Grund. Intuitive Oberfläche, riesige Plugin-Bibliothek, grosse Community. Ideal für Unternehmenswebsites, Blogs und KMU-Auftritte. Twyne konfiguriert WordPress sicher, schnell und wartbar.' },
      { iconName: 'Layers', title: 'Headless CMS (Sanity, Strapi)', text: 'Das moderne Konzept für performance-kritische Websites. Inhalte werden im CMS verwaltet und über eine API an die Website geliefert — blitzschnell, maximal flexibel. Ideal für grosse Websites, Multi-Channel und höchste Performance-Anforderungen.' },
      { iconName: 'Settings', title: 'Massgeschneiderte Admin-Oberfläche', text: 'Für spezifische Anforderungen entwickeln wir eigene Admin-Oberflächen — exakt auf Ihre Workflows zugeschnitten. Kein Feature zu viel, keine Ablenkung. Ihre Redakteure sehen nur was sie brauchen.' },
      { iconName: 'FileText', title: 'Einfach bedienbar', text: 'Das beste CMS ist das, das tatsächlich genutzt wird. Wir konfigurieren und schulen so, dass Ihr Team ohne IT-Kenntnisse produktiv arbeiten kann.' },
      { iconName: 'Zap', title: 'Schnell & performant', text: 'Kein schwerfälliger Plugin-Bloat. Twyne-CMS-Installationen sind schlank, schnell und für gute Lighthouse-Scores optimiert.' },
      { iconName: 'Shield', title: 'Sicher & aktuell', text: 'Regelmässige Updates, Sicherheits-Plugins, Firewall-Konfiguration. Ihre CMS-Website ist keine offene Tür für Angreifer.' },
    ],
    process: [
      { num: '01', title: 'Content-Analyse', description: 'Welche Inhaltstypen brauchen Sie? Wie arbeitet Ihr Redaktionsteam? Welche Abläufe sollen abgebildet werden? Wir analysieren bevor wir empfehlen.' },
      { num: '02', title: 'CMS-Auswahl & Konzept', description: 'Basierend auf Ihrer Analyse empfehlen wir das passende System — WordPress, Headless oder massgeschneidert. Mit konkreter Begründung.' },
      { num: '03', title: 'Setup & Migration', description: 'CMS einrichten, Content-Modell konfigurieren, bestehende Inhalte migrieren. Sauber, vollständig, ohne SEO-Verluste.' },
      { num: '04', title: 'Schulung & Übergabe', description: 'Ihr Team wird geschult bis es selbständig arbeiten kann. Dokumentation, Videoanleitungen, persönliche Einführung.' },
    ],
    differentiators: [
      { title: 'CMS-unabhängig', text: 'Wir empfehlen das beste System für Ihren Fall — nicht das, das uns am meisten nutzt.' },
      { title: 'Redaktions-Training', text: 'Ihr Team kann nach dem Launch selbständig arbeiten.' },
      { title: 'Migration inklusive', text: 'Bestehende Inhalte von WordPress oder anderen Systemen migrieren wir sauber.' },
      { title: 'API-first', text: 'Headless-Ansatz erlaubt Inhalte auf Website, App und anderen Kanälen.' },
    ],
    faq: [
      { question: 'Welches CMS ist das richtige für mein Unternehmen?', answer: 'Das hängt von Ihren Anforderungen ab. Für klassische Websites empfehlen wir WordPress. Für performante, moderne Websites ein Headless CMS. Für komplexe Anforderungen eine massgeschneiderte Lösung. Wir beraten Sie kostenlos.' },
      { question: 'Kann ich von einem bestehenden CMS wechseln?', answer: 'Ja — wir migrieren bestehende Inhalte, Links und SEO-Daten auf das neue System. Kein Datenverlust, keine Google-Abstrafungen.' },
      { question: 'Ist WordPress sicher?', answer: 'WordPress selbst ist sicher — wenn es richtig konfiguriert und regelmässig aktualisiert wird. Twyne richtet WordPress mit Sicherheits-Plugins, Firewall und automatischen Updates ein.' },
      { question: 'Wie lange dauert die Schulung?', answer: 'Für eine Standard-WordPress-Website brauchen die meisten Nutzer 30–60 Minuten. Wir erklären alles Schritt für Schritt und stehen danach für Fragen zur Verfügung.' },
    ],
    ctaTitle: 'Bereit für Ihr neues CMS?',
    dienstleistungEnum: 'CMS',
  },

  'ki-beratung': {
    meta: {
      title: 'KI Beratung Schweiz | Künstliche Intelligenz für KMU | Twyne',
      description: 'Pragmatische KI-Beratung für Schweizer KMU. ChatGPT, Claude Integration, KI-Automatisierung, DSGVO-konform. Twyne Schweizer Digitalagentur.',
      keywords: ['ki beratung schweiz', 'chatgpt integration kmu', 'ai automatisierung schweiz', 'künstliche intelligenz kmu aargau', 'ki beratung dsgvo'],
    },
    hero: {
      breadcrumb: 'KI-Beratung',
      badge: 'Leistung · Künstliche Intelligenz',
      h1: 'KI-Beratung für Schweizer KMU — pragmatisch,',
      h1Purple: 'messbar, ohne Buzzwords',
      description: 'Künstliche Intelligenz ist kein Zukunftsthema — sie ist heute einsetzbar. Twyne hilft Ihnen dabei, KI sinnvoll zu nutzen: dort wo sie wirklich Mehrwert schafft, datenschutzkonform und ohne unnötige Komplexität.',
      imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'KI Beratung Schweiz Künstliche Intelligenz',
    },
    introTitle: 'KI für KMU — was heute schon möglich ist',
    intro: [
      'Künstliche Intelligenz hat in den letzten zwei Jahren einen Quantensprung gemacht. ChatGPT, Claude und andere KI-Systeme sind heute so leistungsfähig, dass sie reale Aufgaben in Unternehmen übernehmen können — und das zu Kosten die auch für KMU erschwinglich sind.',
      'Aber zwischen Marketing-Versprechen und echtem Nutzen liegt oft ein grosser Unterschied. Twyne berät Schweizer KMU pragmatisch: Wir schauen uns Ihre konkreten Prozesse an, identifizieren wo KI Zeit spart oder Qualität steigert — und implementieren Lösungen die tatsächlich funktionieren.',
      'Datenschutz ist dabei keine Nebensache. Wir implementieren ausschliesslich DSGVO-konforme Lösungen. Auf Wunsch mit lokalen KI-Modellen die keine Daten in die Cloud senden. Swiss-Made, Swiss-Hosted.',
    ],
    stats: [
      { value: '2×', label: 'schnellere Prozesse' },
      { value: '24/7', label: 'KI-Verfügbarkeit' },
      { value: 'DSGVO', label: 'konform' },
      { value: '2–4 Wo', label: 'erste Ergebnisse' },
    ],
    introChecks: [
      'Zeitersparnis durch automatisierte Prozesse',
      '24/7 verfügbar — auch ausserhalb der Bürozeiten',
      'DSGVO-konform und datensicher',
      'Messbare Resultate statt leerer Versprechen',
      'Auf Wunsch mit lokalen KI-Modellen',
    ],
    splitHighlight: {
      icon: 'Brain',
      quote: 'KI die wirklich funktioniert — ohne Hype.',
      h3: 'KI-Integration für Schweizer KMU',
      text: 'Viele KI-Projekte scheitern nicht an der Technologie — sie scheitern daran, dass niemand weiss wie man anfangen soll. Twyne analysiert Ihre Prozesse, identifiziert die grössten Hebel und implementiert KI-Lösungen die sofort Wirkung zeigen.',
      checks: [
        'Prozessanalyse & Potenzial-Assessment zuerst',
        'ChatGPT, Claude & Open-Source-Modelle verfügbar',
        'Pilot-Projekt in 2–4 Wochen umsetzbar',
      ],
    },
    benefits: [
      { iconName: 'Brain', title: 'KI-Chatbot & Kundenservice', text: 'Automatische Beantwortung häufiger Kundenanfragen — 24/7, auf Deutsch, Französisch und Englisch. Ihr Support-Team konzentriert sich auf komplexe Fälle, die KI übernimmt den Rest.' },
      { iconName: 'FileText', title: 'Dokument-Automatisierung', text: 'Rechnungen, Lieferscheine, Verträge und Formulare automatisch erkennen, klassifizieren und verarbeiten. Manuelle Dateneingabe wird zur Ausnahme.' },
      { iconName: 'Layers', title: 'Content-Erstellung & Marketing', text: 'KI-gestützte Texterstellung für Newsletter, Produktbeschreibungen, Social-Media-Posts und Blog-Artikel. Mehr Inhalt, weniger Zeit — mit menschlicher Kontrolle.' },
      { iconName: 'BarChart2', title: 'Datenanalyse & Business Intelligence', text: 'Aus rohen Daten werden automatisch aussagekräftige Berichte und Handlungsempfehlungen. Entscheidungen basieren auf Fakten, nicht auf Bauchgefühl.' },
      { iconName: 'Zap', title: 'Prozessautomatisierung', text: 'Repetitive, regelbasierte Aufgaben werden automatisiert: E-Mail-Klassifizierung, Terminplanung, Datensynchronisation, Reporting. Ihr Team fokussiert auf das Wesentliche.' },
      { iconName: 'Code2', title: 'KI-Integration in bestehende Software', text: 'ChatGPT, Claude oder spezialisierte KI-Modelle in Ihre CRM, ERP oder eigene Software integrieren. KI als Copilot für Ihre bestehenden Systeme.' },
    ],
    process: [
      { num: '01', title: 'KI-Audit & Analyse', description: 'Wir analysieren Ihre Prozesse und identifizieren konkrete Bereiche wo KI Zeit spart, Kosten senkt oder Qualität steigert. Ehrliche Einschätzung: Was macht Sinn, was nicht.' },
      { num: '02', title: 'Konzept & ROI-Analyse', description: 'Wir entwickeln ein konkretes Konzept mit Kosten-Nutzen-Analyse. Welche KI-Lösung passt zu Ihrer Situation? Welcher ROI ist realistisch?' },
      { num: '03', title: 'Pilotprojekt', description: 'Wir starten mit einem überschaubaren Piloten — schnell implementiert, messbarer Nutzen. So sehen Sie schnell ob und wie KI für Sie funktioniert.' },
      { num: '04', title: 'Rollout & Schulung', description: 'Erfolgreiche Piloten werden ausgerollt. Wir schulen Ihr Team und bleiben als Ansprechpartner erreichbar.' },
    ],
    differentiators: [
      { title: 'Technische Umsetzung', text: 'Wir bauen nicht nur die Strategie — wir implementieren sie auch.' },
      { title: 'Kein Hype', text: 'Wir sagen Ihnen ehrlich, wo KI hilft und wo nicht.' },
      { title: 'Schweizer Datenschutz', text: 'Vollständige Compliance mit CH-DSG und DSGVO.' },
      { title: 'Alle LLMs', text: 'OpenAI, Anthropic, Mistral, Llama — wir wählen das beste Modell für Ihren Fall.' },
    ],
    faq: [
      { question: 'Ist KI auch für kleine Unternehmen sinnvoll?', answer: 'Ja — gerade für KMU mit begrenzten Ressourcen kann KI einen grossen Unterschied machen. Schon einfache Automatisierungen sparen mehrere Stunden pro Woche.' },
      { question: 'Sind KI-Lösungen DSGVO-konform?', answer: 'Wir implementieren ausschliesslich datenschutzkonforme Lösungen. Auf Wunsch mit lokalen KI-Modellen die keine Daten in externe Clouds senden.' },
      { question: 'Was kostet KI-Beratung bei Twyne?', answer: 'Wir erstellen eine individuelle Offerte nach dem Erstgespräch. Der Aufwand hängt von Ihren Anforderungen ab.' },
      { question: 'Wie schnell sieht man Resultate?', answer: 'Einfache Automatisierungen sind in 2–4 Wochen produktiv. Komplexere Systeme in 2–3 Monaten.' },
    ],
    ctaTitle: 'Bereit für KI in Ihrem Unternehmen?',
    dienstleistungEnum: 'KI_BERATUNG',
  },

  'digitale-transformation': {
    meta: {
      title: 'Digitale Transformation Schweiz | Digitalisierung KMU | Twyne',
      description: 'Strategische Digitalisierung für Schweizer KMU. Von der Ist-Analyse bis zur Umsetzung — pragmatisch, messbar. Twyne Schweizer Digitalagentur.',
      keywords: ['digitale transformation schweiz', 'digitalisierung kmu schweiz', 'digitalisierungsberatung aargau', 'digital strategy kmu', 'digitalisierung begleitung'],
    },
    hero: {
      breadcrumb: 'Digitale Transformation',
      badge: 'Leistung · Digitale Transformation',
      h1: 'Digitale Transformation für Schweizer KMU —',
      h1Purple: 'Strategie trifft Umsetzung',
      description: 'Digitalisierung scheitert selten an der Technologie. Sie scheitert an der Umsetzung. Twyne begleitet Sie von der ersten Analyse bis zum produktiven Einsatz — pragmatisch, schrittweise, ohne Disruption.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Digitale Transformation Schweizer KMU',
    },
    introTitle: 'Was digitale Transformation wirklich bedeutet',
    intro: [
      'Digitale Transformation ist kein Projekt das man abschliesst — es ist ein kontinuierlicher Prozess. Es geht nicht darum, möglichst viel neue Technologie einzuführen. Es geht darum, die richtigen Werkzeuge einzusetzen um effizienter zu arbeiten, bessere Entscheidungen zu treffen und neue Möglichkeiten zu erschliessen.',
      'Für Schweizer KMU bedeutet das oft: Papier durch digitale Prozesse ersetzen. Daten die in verschiedenen Systemen stecken zusammenführen. Manuelle, repetitive Aufgaben automatisieren. Und dabei das Team mitnehmen — denn die beste Software nützt nichts wenn sie nicht genutzt wird.',
    ],
    stats: [
      { value: '70%', label: 'Digitalisierungen scheitern' },
      { value: 'Nicht', label: 'bei Twyne' },
      { value: '4', label: 'Phasen' },
      { value: 'Messbar', label: 'Ergebnis' },
    ],
    introChecks: [
      'Schrittweise — kein Big Bang',
      'Ihr Team wird mitgenommen',
      'Messbare Ergebnisse in jeder Phase',
      'Laufender Betrieb bleibt störungsfrei',
      'ROI bereits nach wenigen Monaten sichtbar',
    ],
    splitHighlight: {
      icon: 'TrendingUp',
      quote: 'Digitalisierung die Ihr Team mitnimmt.',
      h3: 'Warum 70% aller Digitalisierungen scheitern',
      text: 'Digitale Transformation scheitert selten an der Technologie — sie scheitert an mangelnder Einbindung des Teams, unrealistischen Zeitplänen und fehlender Messung. Twyne begleitet Sie durch alle Phasen: von der Analyse bis zum produktiven Einsatz.',
      checks: [
        'Change Management & Team-Schulungen inklusive',
        'Klare Meilensteine & Erfolgsmessung',
        'Schrittweise Einführung ohne Betriebsunterbrechung',
      ],
    },
    benefits: [
      { iconName: 'Layers', title: 'Papierlose Prozesse', text: 'Formulare, Genehmigungen, Lieferscheine — digital und automatisch. Kein Suchen in Akten, kein manuelles Tippen, kein Informationsverlust.' },
      { iconName: 'Globe', title: 'System-Integration', text: 'CRM, ERP, Buchhaltung, Webshop — alle Systeme sprechen miteinander. Keine doppelte Datenpflege mehr, keine Übertragungsfehler.' },
      { iconName: 'BarChart2', title: 'Reporting & Analytics', text: 'Aus Rohdaten werden automatisch aussagekräftige Berichte. Entscheidungen auf Basis von Fakten — nicht auf Bauchgefühl.' },
      { iconName: 'Brain', title: 'KI & Automatisierung', text: 'Repetitive Aufgaben werden automatisiert, KI übernimmt regelbasierte Entscheidungen. Ihr Team fokussiert auf das was wirklich Wert schafft.' },
      { iconName: 'Globe', title: 'Kundenportal', text: 'Ihre Kunden verwalten Bestellungen, Rechnungen und Anfragen selbständig. 24/7, ohne Telefonanrufe, ohne Personalaufwand.' },
      { iconName: 'Zap', title: 'Schnelle Quick Wins', text: 'Wir starten mit Massnahmen die schnell Wirkung zeigen — damit Ihr Team den Mehrwert sofort erlebt und die Veränderung akzeptiert.' },
    ],
    process: [
      { num: '01', title: 'Ist-Analyse', description: 'Wir verstehen Ihre aktuellen Prozesse, Systeme und Schmerzpunkte. Wo verlieren Sie Zeit? Wo passieren Fehler? Wo schlummert ungenutztes Potenzial?' },
      { num: '02', title: 'Roadmap', description: 'Wir entwickeln eine priorisierte Roadmap: Was bringt den grössten Nutzen mit dem geringsten Aufwand? Welche Schritte bauen aufeinander auf? Realistisches Timing und Budget.' },
      { num: '03', title: 'Implementierung', description: 'Schrittweise Umsetzung — ohne den laufenden Betrieb zu stören. Pilotprojekte, Tests, Feedback-Schleifen. Wir setzen um, was vereinbart wurde.' },
      { num: '04', title: 'Messung & Optimierung', description: 'Digitalisierung muss Resultate bringen. Wir messen den Erfolg anhand konkreter KPIs und optimieren laufend.' },
    ],
    differentiators: [
      { title: 'Keine Beratung auf Papier', text: 'Wir setzen um was wir empfehlen. Keine PowerPoint-Strategie ohne Folgen.' },
      { title: 'KMU-Expertise', text: 'Wir kennen die Ressourcen und Realitäten von Schweizer KMUs.' },
      { title: 'Tool-unabhängig', text: 'Wir empfehlen das Beste für Ihren Fall, nicht das Teuerste.' },
      { title: 'Nachhaltig', text: 'Ihr Team soll nach dem Projekt selbständig sein — nicht von uns abhängig.' },
    ],
    faq: [
      { question: 'Wie lange dauert eine digitale Transformation?', answer: 'Das hängt vom Umfang ab. Einzelne Prozesse können in Wochen digitalisiert werden. Eine umfassende Transformation dauert 6–24 Monate. Wichtig: Schrittweise, nicht alles auf einmal.' },
      { question: 'Was kostet digitale Transformation?', answer: 'Wir erstellen eine transparente Offerte nach dem Erstgespräch. Der Aufwand hängt von Ihren Anforderungen ab.' },
      { question: 'Was wenn unser Team die neuen Tools nicht nutzt?', answer: 'Change Management ist ein zentraler Teil unseres Ansatzes. Wir schulen, begleiten und holen das Team aktiv ab — denn die beste Software nützt nichts wenn sie nicht genutzt wird.' },
    ],
    ctaTitle: 'Bereit für Ihre digitale Transformation?',
    dienstleistungEnum: 'DIGITALE_TRANSFORMATION',
  },

  seo: {
    meta: {
      title: 'SEO Agentur Schweiz | Suchmaschinenoptimierung für KMU | Twyne',
      description: 'SEO-Agentur aus der Schweiz. Google Seite 1, technisches SEO, Content-Strategie, lokales SEO für Schweizer KMU. Transparente Preise. Jetzt anfragen.',
      keywords: ['seo agentur schweiz', 'suchmaschinenoptimierung schweiz', 'lokales seo schweiz', 'google seite 1 schweiz', 'seo kmu aargau'],
    },
    hero: {
      breadcrumb: 'SEO & Suchmaschinenoptimierung',
      badge: 'Leistung · Suchmaschinenoptimierung',
      h1: 'SEO Agentur Schweiz — auf Google Seite 1',
      h1Purple: 'für Ihr Business',
      description: '91% aller Schweizer suchen online bevor sie kaufen. Twyne bringt Ihr Unternehmen auf die erste Google-Seite — nachhaltig, messbar, ohne kurzfristige Tricks.',
      imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'SEO Agentur Schweiz Analytics',
    },
    introTitle: 'Warum SEO für Schweizer KMU entscheidend ist',
    intro: [
      '91% aller Schweizer Internet-Nutzer verwenden Google als erste Anlaufstelle — bei der Suche nach einem Restaurant, einem Handwerker, einem Anwalt oder einem Software-Entwickler. Wer auf Seite 1 steht gewinnt. Wer auf Seite 2 oder tiefer rangiert, wird von der grossen Mehrheit der potenziellen Kunden schlicht nicht wahrgenommen.',
      'SEO — Suchmaschinenoptimierung — ist die Disziplin, mit der Sie Ihre Sichtbarkeit bei Google systematisch verbessern. Es geht nicht darum, Google zu überlisten. Es geht darum, Google zu helfen zu verstehen, dass Ihre Website die beste Antwort auf die Fragen Ihrer Zielkunden ist. Das erreicht man durch technische Exzellenz, relevante Inhalte und einen guten Ruf im Internet.',
      'Twyne ist Ihre Schweizer SEO-Agentur mit einem klaren Fokus auf nachhaltige Resultate für Schweizer KMU. Wir kennen den lokalen Markt, die relevanten Suchbegriffe in Ihrer Branche und die Konkurrenz in Ihrer Region. Und wir liefern monatliche Reports damit Sie genau sehen was Ihre Investition bringt.',
    ],
    stats: [
      { value: '91%', label: 'Schweizer nutzen Google täglich' },
      { value: '3–6', label: 'Monate bis signifikante Rankings' },
      { value: '0', label: 'versteckte Kosten bei Twyne' },
      { value: '100%', label: 'transparentes monatliches Reporting' },
    ],
    introChecks: [
      'Mehr Besucher ohne Werbekosten',
      'Kunden die aktiv nach Ihnen suchen',
      'Langfristige Sichtbarkeit die bleibt',
      'Messbare Resultate jeden Monat',
    ],
    splitHighlight: {
      icon: 'TrendingUp',
      quote: 'Von Seite 3 auf Seite 1 — nachhaltig.',
      h3: 'Lokales SEO für Schweizer KMU',
      text: 'Über 80% aller lokalen Suchanfragen führen zu einem Ladenbesuch oder Kauf innerhalb von 24 Stunden. Wer bei lokalen Suchen nach oben kommt, gewinnt echte Kunden. Twyne optimiert Ihr lokales SEO gezielt für den Schweizer Markt.',
      checks: [
        'Google Business Profile Optimierung',
        'Lokale Keywords (Schweiz, Region, Stadt)',
        'Einträge in local.ch, search.ch, directories',
      ],
    },
    benefits: [
      { iconName: 'Settings', title: 'Technisches SEO', text: 'Das Fundament. Wir optimieren Ladezeiten, Core Web Vitals, Mobile-Usability, Crawling und Indexierung. Ohne technisches Fundament helfen die besten Inhalte nichts — Google muss Ihre Seite lesen können.' },
      { iconName: 'Search', title: 'Keyword-Recherche & Strategie', text: 'Wir identifizieren die Suchbegriffe die Ihre Zielkunden tatsächlich verwenden — mit echten Suchvolumina und realistischem Ranking-Potenzial. Für den Schweizer Markt, in Deutsch, Französisch und Englisch.' },
      { iconName: 'FileText', title: 'On-Page Optimierung', text: 'Titel, Meta-Descriptions, Überschriften, interne Verlinkung, Alt-Texte — wir optimieren jeden Baustein Ihrer Website damit Google Ihre Seite korrekt versteht und einordnet.' },
      { iconName: 'MapPin', title: 'Lokales SEO', text: 'Für Schweizer KMU: Google Business Profile Optimierung, lokale Keywords, Einträge in Schweizer Verzeichnissen (local.ch, search.ch) und Aufbau lokaler Signale. Wer regional sucht soll Sie finden.' },
      { iconName: 'Pencil', title: 'Content-Strategie & SEO-Texte', text: 'Hochwertige Inhalte die Ihre Expertise zeigen und für relevante Keywords ranken. Wir entwickeln eine Content-Strategie und erstellen Texte die Google und Ihre Kunden gleichermassen überzeugen.' },
      { iconName: 'BarChart2', title: 'Monatliches Reporting', text: 'Transparenz ist kein Buzzword — es ist unsere Grundhaltung. Sie erhalten jeden Monat einen verständlichen Report über Rankings, organischen Traffic, Leads und Fortschritte. Kein Fachchinesisch.' },
    ],
    process: [
      { num: '01', title: 'SEO-Audit', description: 'Wir analysieren den aktuellen Stand Ihrer Website: technische Probleme, Keyword-Abdeckung, Backlink-Profil und Konkurrenz-Situation. Sie erhalten einen detaillierten Audit-Bericht.' },
      { num: '02', title: 'Strategie', description: 'Auf Basis des Audits entwickeln wir eine massgeschneiderte SEO-Strategie mit klaren Prioritäten. Was bringt den schnellsten Effekt? Was ist langfristig aufzubauen?' },
      { num: '03', title: 'Umsetzung', description: 'Wir setzen die Massnahmen um — technische Fixes, Content-Erstellung, On-Page Optimierung, Backlink-Aufbau. Monatlich, strukturiert, messbar.' },
      { num: '04', title: 'Reporting & Optimierung', description: 'Monatlicher Report mit klaren Zahlen. Laufende Anpassung der Strategie basierend auf Daten. SEO ist kein Sprint — es ist ein Marathon den wir gemeinsam laufen.' },
    ],
    differentiators: [
      { title: 'Schweizer Fokus', text: 'Lokale Keyword-Strategie für CH, DE und AT. Google.ch Optimierung.' },
      { title: 'Keine Black-Hat Tricks', text: 'Nachhaltige Methoden die Google auch in 2 Jahren noch belohnt.' },
      { title: 'Technisch & strategisch', text: 'Wir decken beide Seiten ab — der Code und der Content.' },
      { title: 'Eigene Entwickler', text: 'Technische SEO-Fixes werden von uns direkt umgesetzt, kein Warten auf externe Teams.' },
    ],
    faq: [
      { question: 'Wie lange dauert es bis SEO Resultate zeigt?', answer: 'Erste messbare Verbesserungen sieht man nach 4–8 Wochen. Signifikante Rankings nach 3–6 Monaten. SEO ist eine langfristige Investition — aber die einzige die langfristig bezahlbaren Traffic liefert.' },
      { question: 'Ist SEO für lokale Unternehmen sinnvoll?', answer: "Absolut — lokales SEO ist oft der effektivste Kanal für KMU. 'Zahnarzt Aarau', 'Schreiner Olten', 'Restaurant Rothrist' — wer lokal sucht soll Sie finden. Google priorisiert lokale Ergebnisse stark." },
      { question: 'Was unterscheidet SEO von Google Ads?', answer: 'Google Ads bringt sofortigen Traffic — aber nur solange Sie zahlen. SEO bringt organischen Traffic ohne Klickkosten — langfristig und nachhaltig. Ideal ist die Kombination: Ads für sofortige Resultate, SEO für langfristige Sichtbarkeit.' },
      { question: 'Können Sie Rankings garantieren?', answer: 'Nein — und seien Sie vorsichtig bei Agenturen die das tun. Niemand kann Google-Rankings garantieren. Was wir garantieren: nachweisbare Fortschritte, transparentes Reporting und eine Strategie die nachhaltig wirkt.' },
      { question: 'Was kostet SEO bei Twyne?', answer: 'Wir erstellen eine ehrliche Einschätzung was in Ihrer Situation realistisch ist — kostenlos im Erstgespräch.' },
    ],
    ctaTitle: 'Bereit für mehr Sichtbarkeit auf Google?',
    dienstleistungEnum: 'SEO',
  },

  'email-marketing': {
    meta: {
      title: 'E-Mail Marketing Schweiz | Newsletter & Automatisierung | Twyne',
      description: 'Professionelles E-Mail Marketing für Schweizer Unternehmen. Newsletter, automatisierte Kampagnen und Lead-Nurturing — messbar, DSGVO-konform, effektiv.',
      keywords: ['e-mail marketing schweiz', 'newsletter marketing', 'e-mail kampagnen', 'marketing automation', 'lead nurturing'],
    },
    hero: {
      breadcrumb: 'Marketing · E-Mail Marketing',
      badge: 'Leistung · E-Mail Marketing',
      h1: 'E-Mail Marketing das',
      h1Purple: 'wirklich konvertiert',
      description: 'E-Mail ist der direkteste Kanal zu Ihren Kunden. Wir entwickeln Newsletter und automatisierte Kampagnen die öffnen, klicken und kaufen — messbar und DSGVO-konform.',
      imageUrl: '',
      imageAlt: 'E-Mail Marketing Dashboard',
    },
    stats: [
      { value: '42×', label: 'ROI gegenüber anderen Kanälen' },
      { value: '4–8%', label: 'Ø Öffnungsrate E-Mail vs. 0.1% Social' },
      { value: '24h', label: 'Erste Kampagne live' },
    ],
    splitHighlight: {
      icon: 'Mail',
      quote: 'E-Mail erreicht den Empfänger — nicht der Algorithmus',
      h3: 'Direkter Kontakt, keine Streuverluste',
      text: 'Social Media Algorithmen entscheiden, wer Ihren Post sieht. E-Mail landet direkt im Posteingang. Wir bauen Ihre Liste auf und schreiben Inhalte die geöffnet werden.',
      checks: ['DSGVO-konforme Listenverwaltung', 'A/B-Tests für Betreffzeilen', 'Automatisierte Willkommens-Sequenzen', 'Detailliertes Reporting je Kampagne'],
    },
    benefits: [
      { iconName: 'Mail', title: 'Newsletter-System', text: 'Professionelle Newsletter-Vorlagen, die zu Ihrer Marke passen und auf allen Geräten perfekt aussehen.' },
      { iconName: 'Zap', title: 'Marketing Automation', text: 'Automatische E-Mails bei Anmeldung, Kauf oder Inaktivität — immer zum richtigen Zeitpunkt.' },
      { iconName: 'BarChart2', title: 'Kampagnen-Reporting', text: 'Öffnungsraten, Klicks, Konversionen — klare Zahlen statt Bauchgefühl.' },
      { iconName: 'Users', title: 'Listensegmentierung', text: 'Zielgruppengerechte Inhalte durch smarte Segmentierung nach Verhalten und Interessen.' },
    ],
    process: [
      { num: '01', title: 'Analyse & Strategie', description: 'Wir analysieren Ihre Zielgruppe und Ziele und entwickeln eine Kampagnenstrategie.' },
      { num: '02', title: 'Setup & Templates', description: 'Wir richten Ihr E-Mail-Tool ein und erstellen professionelle Vorlagen nach Ihrem CI.' },
      { num: '03', title: 'Content & Versand', description: 'Wir erstellen die Inhalte, testen und versenden — mit optimalen Versandzeitpunkten.' },
      { num: '04', title: 'Messen & Optimieren', description: 'Laufende Auswertung und Optimierung für kontinuierlich bessere Resultate.' },
    ],
    differentiators: [
      { title: 'Text & Design aus einer Hand', text: 'Wir schreiben und gestalten — kein Koordinationsaufwand zwischen verschiedenen Dienstleistern.' },
      { title: 'Keine Lock-ins', text: 'Wir empfehlen das Tool das zu Ihnen passt — Mailchimp, Brevo, Klaviyo oder andere.' },
    ],
    faq: [
      { question: 'Welches E-Mail-Tool empfehlen Sie?', answer: 'Das hängt von Ihren Anforderungen ab. Für KMU empfehlen wir oft Brevo (ehemals Sendinblue) wegen des guten Preis-Leistungs-Verhältnisses und DSGVO-konformen Servern in der EU.' },
      { question: 'Wie baut man eine E-Mail-Liste auf?', answer: 'Mit einem klaren Mehrwert für Abonnenten — Lead-Magnets, exklusive Inhalte oder Rabattcodes. Wir entwickeln gemeinsam eine Strategie die zu Ihrem Angebot passt.' },
      { question: 'Ist E-Mail Marketing noch zeitgemäss?', answer: 'Definitiv. E-Mail hat den höchsten ROI aller Marketingkanäle (42× laut DMA) und ist unabhängig von Algorithmen. Solange die Inhalte relevant sind, funktioniert E-Mail.' },
      { question: 'Was kostet E-Mail Marketing bei Twyne?', answer: 'Einmalige Einrichtung inkl. Templates ab CHF 990, laufende Kampagnenbetreuung auf Anfrage. Im Erstgespräch klären wir, was sinnvoll ist.' },
    ],
    ctaTitle: 'Bereit für E-Mails die geöffnet werden?',
    dienstleistungEnum: 'MARKETING',
  },

  'google-ads': {
    meta: {
      title: 'Google Ads Agentur Schweiz | SEA Kampagnen | Twyne',
      description: 'Google Ads Kampagnen für Schweizer KMU. Bezahlte Suchanzeigen, Display und Shopping — sofortige Sichtbarkeit, messbare Ergebnisse, kein Budget verschwenden.',
      keywords: ['google ads schweiz', 'sea agentur', 'google adwords', 'suchmaschinenwerbung', 'ppc kampagnen schweiz'],
    },
    hero: {
      breadcrumb: 'Marketing · Google Ads',
      badge: 'Leistung · Google Ads & SEA',
      h1: 'Google Ads die',
      h1Purple: 'Kunden bringen',
      description: 'Sofortige Sichtbarkeit auf Google — für die Suchanfragen die zählen. Wir erstellen und optimieren Ihre Kampagnen damit jeder Franken Budget maximale Wirkung hat.',
      imageUrl: '',
      imageAlt: 'Google Ads Dashboard',
    },
    stats: [
      { value: 'Sofort', label: 'Sichtbar bei Google' },
      { value: '3–5×', label: 'Typischer ROAS bei optimierten Kampagnen' },
      { value: '100%', label: 'Transparentes Reporting' },
    ],
    splitHighlight: {
      icon: 'TrendingUp',
      quote: 'Sie zahlen nur wenn jemand klickt — nicht für Sichtbarkeit ohne Interesse',
      h3: 'Budget-Kontrolle von Anfang an',
      text: 'Google Ads ist der schnellste Weg zur Sichtbarkeit. Wir sorgen dafür, dass Ihr Budget effizient eingesetzt wird — mit negativen Keywords, präzisen Zielgruppen und laufender Optimierung.',
      checks: ['Keyword-Recherche & Wettbewerberanalyse', 'Anzeigentexte die klicken', 'Conversion-Tracking einrichten', 'Wöchentliche Optimierungen'],
    },
    benefits: [
      { iconName: 'Search', title: 'Search Kampagnen', text: 'Erscheinen Sie bei den Suchanfragen die Ihre Kunden stellen — mit präzisen Anzeigen die konvertieren.' },
      { iconName: 'Monitor', title: 'Display & Remarketing', text: 'Interessenten die Ihre Website besucht haben erneut ansprechen — mit gezielten Anzeigen im Google Netzwerk.' },
      { iconName: 'ShoppingCart', title: 'Shopping Ads', text: 'Produktanzeigen direkt in den Suchergebnissen — ideal für Onlineshops mit physischen Produkten.' },
      { iconName: 'BarChart2', title: 'Performance-Reporting', text: 'Klare Zahlen: Impressionen, Klicks, Kosten, Konversionen — transparent und verständlich aufbereitet.' },
    ],
    process: [
      { num: '01', title: 'Audit & Strategie', description: 'Analyse Ihrer Ziele, Zielgruppe und Wettbewerber — daraus entsteht die Kampagnenstrategie.' },
      { num: '02', title: 'Kampagnen-Setup', description: 'Keyword-Recherche, Anzeigenerstellung, Conversion-Tracking und Budget-Planung.' },
      { num: '03', title: 'Launch & Monitoring', description: 'Live-Schaltung mit engem Monitoring in den ersten Tagen für schnelle Korrekturen.' },
      { num: '04', title: 'Laufende Optimierung', description: 'Wöchentliche Anpassungen an Keywords, Geboten und Anzeigentexten für kontinuierliche Verbesserung.' },
    ],
    differentiators: [
      { title: 'Kein Minimum-Budget', text: 'Wir arbeiten auch mit kleineren Budgets effizient — keine versteckten Mindestanforderungen.' },
      { title: 'Transparente Abrechnung', text: 'Ihr Werbebudget geht direkt zu Google — wir verrechnen nur unser Management-Fee, keine Aufschläge.' },
    ],
    faq: [
      { question: 'Wie viel Budget brauche ich für Google Ads?', answer: 'In der Schweiz sind CHF 500–1\'500/Monat Werbebudget ein realistischer Einstieg für die meisten KMU. Dazu kommt unser Management-Fee. Im Erstgespräch schätzen wir gemeinsam, was in Ihrer Branche sinnvoll ist.' },
      { question: 'Wie schnell sehe ich Resultate?', answer: 'Erste Klicks und Leads bereits am ersten Tag. Verlässliche Daten für Optimierungen nach 2–4 Wochen. Google Ads ist der schnellste Kanal — im Gegensatz zu SEO.' },
      { question: 'Was ist der Unterschied zu SEO?', answer: 'Google Ads bringt sofortigen bezahlten Traffic — ideal für schnelle Resultate oder saisonale Aktionen. SEO bringt langfristig kostenlosen Traffic. Die Kombination ist am wirkungsvollsten.' },
      { question: 'Übernehmen Sie bestehende Kampagnen?', answer: 'Ja — wir machen zuerst einen kostenlosen Audit und zeigen Ihnen konkret was optimiert werden kann.' },
    ],
    ctaTitle: 'Bereit für Google Ads die wirklich liefern?',
    dienstleistungEnum: 'MARKETING',
  },

  'social-media': {
    meta: {
      title: 'Social Media Marketing Schweiz | Instagram, LinkedIn | Twyne',
      description: 'Social Media Marketing für Schweizer Unternehmen. Content-Strategie, professionelle Posts und Community Management für Instagram, LinkedIn und Facebook.',
      keywords: ['social media marketing schweiz', 'instagram marketing', 'linkedin marketing', 'social media agentur', 'content creation schweiz'],
    },
    hero: {
      breadcrumb: 'Marketing · Social Media',
      badge: 'Leistung · Social Media Marketing',
      h1: 'Social Media der',
      h1Purple: 'Ihr Unternehmen zeigt',
      description: 'Professionelles Social Media Marketing das Vertrauen aufbaut und Kunden gewinnt — nicht nur Likes. Wir entwickeln Strategie, Content und Posting-Plan für Ihre Kanäle.',
      imageUrl: '',
      imageAlt: 'Social Media Marketing',
    },
    stats: [
      { value: '4.9 Mio', label: 'Social-Media-Nutzer in der Schweiz' },
      { value: '78%', label: 'Kaufentscheide mit Social-Media-Einfluss' },
      { value: '30 Tage', label: 'Bis zum ersten professionellen Content-Plan' },
    ],
    splitHighlight: {
      icon: 'Users',
      quote: 'Guter Content ist kein Zufall — er hat eine Strategie dahinter',
      h3: 'Strategie statt Aktionismus',
      text: 'Viele Unternehmen posten unregelmässig, ohne klares Konzept. Wir entwickeln eine Content-Strategie die zu Ihrem Angebot passt und konsequent umsetzt.',
      checks: ['Kanal-Analyse & Plattform-Empfehlung', 'Monats-Contentplan mit Themen', 'Professionelle Bild- und Textgestaltung', 'Community Management auf Anfrage'],
    },
    benefits: [
      { iconName: 'Palette', title: 'Content Creation', text: 'Posts, Stories, Reels — visuell und textuell professionell umgesetzt nach Ihrem Corporate Design.' },
      { iconName: 'Globe', title: 'Kanal-Management', text: 'Instagram, LinkedIn, Facebook — wir verwalten Ihre Kanäle und sorgen für Konsistenz und Aktualität.' },
      { iconName: 'TrendingUp', title: 'Paid Social', text: 'Bezahlte Anzeigen auf Instagram und Facebook für schnelle Reichweite und gezielte Neukunden-Ansprache.' },
      { iconName: 'BarChart2', title: 'Analytics & Reporting', text: 'Monatlicher Report mit Reichweite, Engagement und Wachstum — damit Sie wissen was funktioniert.' },
    ],
    process: [
      { num: '01', title: 'Audit & Strategie', description: 'Analyse Ihrer aktuellen Präsenz, Zielgruppe und Wettbewerber. Daraus entsteht Ihre Social-Media-Strategie.' },
      { num: '02', title: 'Content-Konzept', description: 'Themenplan, Ton, Bildsprache und Posting-Frequenz — alles abgestimmt auf Ihre Marke.' },
      { num: '03', title: 'Produktion & Planung', description: 'Wir erstellen den Monats-Content und planen den Versand automatisiert.' },
      { num: '04', title: 'Analyse & Optimierung', description: 'Monatliche Auswertung und Anpassung der Strategie basierend auf Echtzeitdaten.' },
    ],
    differentiators: [
      { title: 'Swiss-made Content', text: 'Kein generischer Massencontent — alles wird für Ihr Unternehmen und Ihre Schweizer Zielgruppe erstellt.' },
      { title: 'Kein langfristiger Vertrag', text: 'Wir arbeiten monatsweise — Sie können jederzeit pausieren oder stoppen.' },
    ],
    faq: [
      { question: 'Welche Plattform ist die richtige für mein Unternehmen?', answer: 'Das hängt von Ihrer Zielgruppe ab. B2C-Unternehmen profitieren meist von Instagram, B2B von LinkedIn. Im Erstgespräch empfehlen wir die Plattform die Ihnen den meisten Return bringt.' },
      { question: 'Wie viele Posts pro Monat sind sinnvoll?', answer: 'Qualität vor Quantität. 3–5 hochwertige Posts pro Woche sind besser als täglich oberflächliche Inhalte. Wir empfehlen einen realistischen Plan den wir auch durchhalten können.' },
      { question: 'Können Sie unsere bestehenden Kanäle übernehmen?', answer: 'Ja — wir machen zunächst einen Audit und geben Empfehlungen, dann setzen wir gemeinsam die Strategie um.' },
      { question: 'Was kostet Social Media Management?', answer: 'Einstieg ab CHF 490/Monat für einen Kanal mit 8 Posts. Details im kostenlosen Erstgespräch.' },
    ],
    ctaTitle: 'Bereit für Social Media das Kunden bringt?',
    dienstleistungEnum: 'MARKETING',
  },

  'content-marketing': {
    meta: {
      title: 'Content Marketing Schweiz | Blog & Inhalte | Twyne',
      description: 'Content Marketing für Schweizer Unternehmen. Blog-Artikel, Whitepapers und Content-Strategie die Vertrauen aufbaut, SEO stärkt und Kunden anzieht.',
      keywords: ['content marketing schweiz', 'content strategie', 'blog artikel erstellen', 'seo content', 'inbound marketing schweiz'],
    },
    hero: {
      breadcrumb: 'Marketing · Content Marketing',
      badge: 'Leistung · Content Marketing',
      h1: 'Inhalte die',
      h1Purple: 'Vertrauen schaffen',
      description: 'Guter Content zieht Kunden an — bevor sie überhaupt wissen, dass sie Ihr Produkt brauchen. Wir entwickeln eine Content-Strategie und produzieren Inhalte die ranken, teilen und konvertieren.',
      imageUrl: '',
      imageAlt: 'Content Marketing',
    },
    stats: [
      { value: '3×', label: 'Mehr Leads durch Content vs. Outbound' },
      { value: '62%', label: 'Günstiger als traditionelles Marketing' },
      { value: '6 Mt.', label: 'Typisch bis erste SEO-Erfolge sichtbar' },
    ],
    splitHighlight: {
      icon: 'FileText',
      quote: 'Wer hilfreich ist, wird gefunden — das ist die Essenz von Content Marketing',
      h3: 'Strategie vor Produktion',
      text: 'Inhalte ohne Strategie sind Zeitverschwendung. Wir beginnen mit Keyword-Recherche und Zielgruppenanalyse — dann produzieren wir Inhalte die gezielt Traffic und Leads generieren.',
      checks: ['Keyword-Recherche & Content-Planung', 'SEO-optimierte Blog-Artikel', 'Whitepapers & Leitfäden', 'Content-Kalender & Redaktionsplan'],
    },
    benefits: [
      { iconName: 'FileText', title: 'Blog-Artikel & SEO-Content', text: 'Professionell geschriebene, SEO-optimierte Artikel die langfristig Besucher anziehen.' },
      { iconName: 'Layers', title: 'Whitepapers & Guides', text: 'Tiefgehende Inhalte die Expertise demonstrieren und als Lead-Magnet dienen.' },
      { iconName: 'Globe', title: 'Landingpages & Web-Texte', text: 'Überzeugende Texte für Ihre Website die Besucher zu Kunden machen.' },
      { iconName: 'BarChart2', title: 'Content-Performance', text: 'Tracking von Rankings, Traffic und Leads — damit der Content-Output messbar ist.' },
    ],
    process: [
      { num: '01', title: 'Keyword & Themen-Recherche', description: 'Wir finden die Themen nach denen Ihre Zielgruppe wirklich sucht — mit Volumen und Wettbewerbsanalyse.' },
      { num: '02', title: 'Content-Strategie', description: 'Redaktionsplan, Tonalität, Format-Mix und Publishing-Frequenz — alles schriftlich festgehalten.' },
      { num: '03', title: 'Produktion', description: 'Recherche, Schreiben, SEO-Optimierung und interne Verlinkung — jeder Artikel wird sorgfältig erstellt.' },
      { num: '04', title: 'Verbreitung & Reporting', description: 'Distribution über Social Media und Newsletter, monatliches Ranking- und Traffic-Reporting.' },
    ],
    differentiators: [
      { title: 'Schreiben & SEO kombiniert', text: 'Content der gut klingt und bei Google rankt — selten, aber unser Standard.' },
      { title: 'Branchenkenntnis', text: 'Wir schreiben für Schweizer KMU in diversen Branchen und kennen die Terminologie und Fragen Ihrer Kunden.' },
    ],
    faq: [
      { question: 'Wie lange dauert es bis Content Resultate zeigt?', answer: 'Blog-Artikel brauchen 3–6 Monate um in den Rankings aufzusteigen. Content Marketing ist eine langfristige Strategie — aber der Traffic der dann kommt, kostet nichts mehr.' },
      { question: 'Wer schreibt die Artikel?', answer: 'Unser Team schreibt auf Basis Ihrer Informationen und Expertise. Bei spezialisierten Themen machen wir ein kurzes Briefing-Gespräch mit Ihnen.' },
      { question: 'Können Sie auch bestehenden Content optimieren?', answer: 'Ja — oft bringt das Überarbeiten bestehender Artikel schnellere Resultate als neue zu erstellen. Wir prüfen Ihren Content-Bestand und priorisieren.' },
      { question: 'Was kostet Content Marketing bei Twyne?', answer: 'Ein SEO-Artikel ab CHF 250, Content-Strategie ab CHF 890. Monatliche Pakete auf Anfrage.' },
    ],
    ctaTitle: 'Bereit für Content der Ihre Kunden findet?',
    dienstleistungEnum: 'MARKETING',
  },

  'lokales-seo': {
    meta: {
      title: 'Lokales SEO Schweiz | Google Maps Optimierung | Twyne',
      description: 'Lokales SEO für Schweizer Unternehmen. Google Business Profil, lokale Keywords und strukturierte Daten — damit Kunden in Ihrer Nähe Sie finden.',
      keywords: ['lokales seo schweiz', 'google maps optimierung', 'google business profil', 'local seo', 'seo für lokale unternehmen'],
    },
    hero: {
      breadcrumb: 'SEO · Lokales SEO',
      badge: 'Leistung · Lokales SEO',
      h1: 'Lokales SEO für',
      h1Purple: 'mehr Laufkundschaft',
      description: 'Wenn jemand "Coiffeur Olten" oder "Restaurant Luzern" googelt — erscheinen Sie dann? Mit gezieltem lokalem SEO sorgen wir dafür, dass Sie gefunden werden wenn es darauf ankommt.',
      imageUrl: '',
      imageAlt: 'Lokales SEO Google Maps',
    },
    stats: [
      { value: '46%', label: 'Aller Google-Suchen lokal' },
      { value: '76%', label: 'Lokale Suche → Besuch innert 24h' },
      { value: 'Top 3', label: 'Google Maps Local Pack — unser Ziel' },
    ],
    splitHighlight: {
      icon: 'MapPin',
      quote: '"Zahnarzt in meiner Nähe" — 3.2 Milliarden solche Suchen jährlich',
      h3: 'Gefunden werden wo Ihre Kunden suchen',
      text: 'Lokales SEO ist für Unternehmen mit physischem Standort oft der effektivste Kanal überhaupt. Wir optimieren Ihr Google Business Profil, bauen lokale Verlinkungen auf und sorgen für konsistente NAP-Daten.',
      checks: ['Google Business Profil optimieren', 'Lokale Keyword-Strategie', 'NAP-Konsistenz (Name, Adresse, Telefon)', 'Aufbau lokaler Backlinks & Einträge'],
    },
    benefits: [
      { iconName: 'MapPin', title: 'Google Business Profil', text: 'Vollständig optimiertes Profil mit korrekten Öffnungszeiten, Fotos, Kategorien und regelmässigen Posts.' },
      { iconName: 'Search', title: 'Lokale Keywords', text: 'Recherche und Implementierung der Suchbegriffe die Kunden in Ihrer Region wirklich verwenden.' },
      { iconName: 'Shield', title: 'NAP-Konsistenz', text: 'Name, Adresse und Telefon auf allen Verzeichnissen einheitlich — ein wichtiges Ranking-Signal.' },
      { iconName: 'TrendingUp', title: 'Lokale Backlinks', text: 'Einträge in relevanten Schweizer Verzeichnissen und lokale Verlinkungsstrategien.' },
    ],
    process: [
      { num: '01', title: 'Lokaler SEO-Audit', description: 'Analyse Ihres Google Business Profils, lokaler Rankings und Wettbewerber in Ihrer Region.' },
      { num: '02', title: 'Optimierung', description: 'Profil-Optimierung, Keyword-Implementierung auf der Website und NAP-Bereinigung.' },
      { num: '03', title: 'Listing-Aufbau', description: 'Einträge in relevanten Schweizer und lokalen Verzeichnissen (local.ch, search.ch, etc.).' },
      { num: '04', title: 'Monitoring', description: 'Monatliches Ranking-Tracking für lokale Keywords und Google Maps Pack-Position.' },
    ],
    differentiators: [
      { title: 'Schweiz-Fokus', text: 'Wir kennen die relevanten Schweizer Verzeichnisse und lokalen Rankingfaktoren im DACH-Raum.' },
      { title: 'Technisch & strategisch', text: 'Schema-Markup, strukturierte Daten und Google Business — alles aus einer Hand.' },
    ],
    faq: [
      { question: 'Wie lange dauert lokales SEO?', answer: 'Erste Verbesserungen im Google Maps Pack nach 4–8 Wochen. Für wettbewerbsintensive Begriffe 3–6 Monate.' },
      { question: 'Brauche ich eine eigene Website für lokales SEO?', answer: 'Eine Website hilft erheblich — aber auch ohne Website kann ein optimiertes Google Business Profil lokal sehr gut ranken.' },
      { question: 'Was ist der Unterschied zwischen lokalem und nationalem SEO?', answer: 'Lokales SEO zielt auf Suchen mit Ortsangabe oder standortbezogene Suchen ab. Es ist oft schneller und günstiger als nationale Rankings — und für Unternehmen mit lokalem Einzugsgebiet meist relevanter.' },
      { question: 'Wie viel kostet lokales SEO?', answer: 'Einmaliges Setup ab CHF 690, laufende Betreuung ab CHF 290/Monat. Im Erstgespräch klären wir, was Ihr Potenzial ist.' },
    ],
    ctaTitle: 'Bereit, lokal auf Google zu dominieren?',
    dienstleistungEnum: 'SEO',
  },

  'technisches-seo': {
    meta: {
      title: 'Technisches SEO Schweiz | Core Web Vitals & Crawling | Twyne',
      description: 'Technisches SEO Audit und Optimierung für Schweizer Unternehmen. Core Web Vitals, strukturierte Daten, Crawlability — das Fundament für nachhaltige Rankings.',
      keywords: ['technisches seo', 'core web vitals', 'seo audit', 'crawlability', 'strukturierte daten', 'technisches seo schweiz'],
    },
    hero: {
      breadcrumb: 'SEO · Technisches SEO',
      badge: 'Leistung · Technisches SEO',
      h1: 'Technisches SEO —',
      h1Purple: 'das Fundament',
      description: 'Guter Content bringt nichts, wenn Google Ihre Website nicht richtig lesen kann. Wir diagnostizieren technische SEO-Probleme und beheben sie direkt — ohne externe Entwickler.',
      imageUrl: '',
      imageAlt: 'Technisches SEO Audit',
    },
    stats: [
      { value: '53%', label: 'Absprünge bei >3s Ladezeit' },
      { value: '200+', label: 'Google Rankingfaktoren' },
      { value: '1–3 Wo.', label: 'Bis fixes indiziert sind' },
    ],
    splitHighlight: {
      icon: 'Code2',
      quote: 'Technisches SEO ist das Fundament — ohne es baut alles andere auf Sand',
      h3: 'Wir beheben, was andere nur benennen',
      text: 'Die meisten SEO-Agenturen liefern einen Bericht mit Problemen — und überlassen die Umsetzung Ihren Entwicklern. Wir haben eigene Entwickler und setzen die Fixes selbst um.',
      checks: ['Core Web Vitals optimieren', 'Crawl-Fehler beheben', 'Structured Data implementieren', 'Duplicate Content bereinigen'],
    },
    benefits: [
      { iconName: 'Zap', title: 'Core Web Vitals', text: 'LCP, CLS, INP — wir messen, analysieren und optimieren Ihre Ladezeiten und Nutzer-Experience.' },
      { iconName: 'Search', title: 'Crawlability & Indexierung', text: 'Sitemap, robots.txt, Canonicals und Crawl-Budget — alles damit Google Ihre Seiten richtig indiziert.' },
      { iconName: 'Code2', title: 'Strukturierte Daten', text: 'Schema-Markup für Rich Snippets — mehr Klicks durch bessere Darstellung in den Suchergebnissen.' },
      { iconName: 'Shield', title: 'Duplicate Content', text: 'Erkennung und Bereinigung von dupliziertem Content der Ihre Rankings kannibalisiert.' },
    ],
    process: [
      { num: '01', title: 'Technischer Audit', description: 'Vollständige Analyse mit professionellen Tools: Screaming Frog, Google Search Console, PageSpeed Insights.' },
      { num: '02', title: 'Priorisierung', description: 'Probleme nach Impact und Aufwand priorisiert — wir starten mit dem was am meisten bringt.' },
      { num: '03', title: 'Umsetzung', description: 'Direkte Behebung durch unser Entwicklerteam — kein Weitergeben an externe Dienstleister.' },
      { num: '04', title: 'Verifizierung', description: 'Prüfung ob Google die Fixes erkannt hat, Monitoring in der Search Console.' },
    ],
    differentiators: [
      { title: 'Agentur und Entwickler in einem', text: 'Technische SEO-Fixes direkt umgesetzt — keine Kommunikationskette zwischen Agentur und Entwickler.' },
      { title: 'Google Search Console Experten', text: 'Wir arbeiten direkt mit Ihren Daten aus der Search Console — keine Spekulation.' },
    ],
    faq: [
      { question: 'Was ist ein technischer SEO-Audit?', answer: 'Eine systematische Analyse aller technischen Faktoren die Google bei der Bewertung Ihrer Website berücksichtigt — Ladezeiten, Crawling, Indexierung, strukturierte Daten und mehr.' },
      { question: 'Wie lange dauert ein Audit?', answer: 'Ein vollständiger Audit dauert 3–5 Werktage. Die Behebung der Probleme je nach Umfang 1–4 Wochen.' },
      { question: 'Brauche ich technisches SEO wenn meine Website schon gut rankt?', answer: 'Ja — technische SEO-Probleme können sich über Zeit aufbauen, zum Beispiel nach Website-Updates. Ein jährlicher Audit ist empfehlenswert.' },
      { question: 'Was kostet ein technischer SEO-Audit?', answer: 'Ab CHF 890 für ein vollständiges Audit mit Handlungsempfehlungen. Umsetzung nach Aufwand.' },
    ],
    ctaTitle: 'Bereit für technisch sauberes SEO?',
    dienstleistungEnum: 'SEO',
  },

  'seo-audit': {
    meta: {
      title: 'SEO Audit Schweiz | Vollständige Website-Analyse | Twyne',
      description: 'Professioneller SEO Audit für Schweizer Websites. Vollständige Analyse von Technik, Content, Backlinks und Wettbewerb mit konkreten Handlungsempfehlungen.',
      keywords: ['seo audit schweiz', 'website analyse', 'seo check', 'seo analyse', 'seo bericht'],
    },
    hero: {
      breadcrumb: 'SEO · SEO Audit',
      badge: 'Leistung · SEO Audit',
      h1: 'SEO Audit —',
      h1Purple: 'klare Diagnose',
      description: 'Sie wissen, dass Ihre Website besser ranken sollte — aber nicht warum sie es nicht tut. Unser SEO Audit liefert klare Antworten und konkrete Massnahmen, keine vagen Empfehlungen.',
      imageUrl: '',
      imageAlt: 'SEO Audit Report',
    },
    stats: [
      { value: '100+', label: 'Prüfpunkte im Audit' },
      { value: '5 Tage', label: 'Lieferzeit vollständiger Audit' },
      { value: '100%', label: 'Konkrete Handlungsempfehlungen' },
    ],
    splitHighlight: {
      icon: 'Search',
      quote: 'Ein SEO Audit ohne Handlungsempfehlungen ist nur ein Problembericht',
      h3: 'Diagnose und Massnahmenplan in einem',
      text: 'Unser Audit deckt alle vier Bereiche ab: Technik, On-Page, Off-Page und Wettbewerber. Jedes Problem kommt mit einer Priorität, einem geschätzten Impact und einer konkreten Lösung.',
      checks: ['Technische SEO-Analyse', 'Content & On-Page Audit', 'Backlink-Profil Analyse', 'Wettbewerber-Benchmarking'],
    },
    benefits: [
      { iconName: 'Search', title: 'Technische Analyse', text: 'Crawling, Indexierung, Ladezeiten, Core Web Vitals — alle technischen Faktoren unter der Lupe.' },
      { iconName: 'FileText', title: 'Content Audit', text: 'Keyword-Abdeckung, Content-Qualität, Duplicate Content und interne Verlinkungsstruktur.' },
      { iconName: 'TrendingUp', title: 'Backlink-Analyse', text: 'Qualität und Quantität Ihrer Backlinks, toxic Links und Lücken gegenüber der Konkurrenz.' },
      { iconName: 'BarChart2', title: 'Wettbewerber-Benchmarking', text: 'Was ranken Ihre Konkurrenten, wofür — und wie können Sie aufholen oder übertreffen.' },
    ],
    process: [
      { num: '01', title: 'Briefing', description: 'Kurzes Gespräch über Ihre Ziele, Zielgruppe und aktuelle Situation.' },
      { num: '02', title: 'Analyse', description: 'Vollständiger Scan mit professionellen Tools: Ahrefs, Screaming Frog, Google Search Console, PageSpeed.' },
      { num: '03', title: 'Auswertung', description: 'Priorisierung aller Massnahmen nach Impact (hoch/mittel/niedrig) und Aufwand.' },
      { num: '04', title: 'Übergabe & Q&A', description: 'Präsentation des Audit-Reports und Beantwortung Ihrer Fragen — verständlich erklärt.' },
    ],
    differentiators: [
      { title: 'Massnahmen mit Impact-Einschätzung', text: 'Jede Empfehlung kommt mit einer realistischen Einschätzung was sie bringt — keine endlosen Checklisten.' },
      { title: 'Umsetzung möglich', text: 'Wir können alle empfohlenen Massnahmen direkt umsetzen — kein Weitersuchen nach einem Entwickler.' },
    ],
    faq: [
      { question: 'Was ist im SEO Audit enthalten?', answer: 'Technisches SEO (Crawling, Indexierung, Ladezeiten), On-Page-Analyse (Content, Keywords, Meta-Daten), Backlink-Profil und Wettbewerber-Vergleich. Alles mit konkreten Handlungsempfehlungen.' },
      { question: 'Wie lange dauert ein Audit?', answer: '5 Werktage ab Auftragserteilung. Bei grossen Websites mit vielen Seiten bis zu 2 Wochen.' },
      { question: 'Muss ich danach auch die Umsetzung bei Twyne buchen?', answer: 'Nein — der Audit ist eigenständig buchbar. Sie bekommen einen umsetzbaren Report und können selbst oder mit einem anderen Dienstleister arbeiten. Natürlich setzen wir gerne um.' },
      { question: 'Was kostet ein SEO Audit?', answer: 'Ab CHF 890 für kleine bis mittelgrosse Websites (bis 100 Seiten). Grössere Projekte auf Anfrage.' },
    ],
    ctaTitle: 'Bereit für Klarheit über Ihre SEO-Situation?',
    dienstleistungEnum: 'SEO',
  },
}
