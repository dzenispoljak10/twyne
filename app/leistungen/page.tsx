import type { Metadata } from 'next'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import CtaSection from '@/components/public/CtaSection'
import { Globe, AppWindow, Code2, FileCode2, Brain, Zap, Search, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Webdesign, Webapplikationen, Softwareentwicklung, KI-Beratung und SEO — Twyne bietet alle digitalen Dienstleistungen aus einer Hand.',
}

const services = [
  {
    id: '01',
    icon: Globe,
    title: 'Webseiten & Webdesign',
    description: 'Moderne, performante Webseiten die Besucher in Kunden verwandeln. Individuelles Design, keine Templates.',
    features: [
      'Individuelles UI/UX-Design',
      'Mobile-First Entwicklung',
      'Performance-Optimierung',
      'CMS-Integration auf Wunsch',
      'SEO-optimierte Struktur',
    ],
  },
  {
    id: '02',
    icon: AppWindow,
    title: 'Webapplikationen',
    description: 'Massgeschneiderte Web-Apps für Ihr Business. Von einfachen Tools bis komplexen SaaS-Plattformen.',
    features: [
      'React, Next.js, TypeScript',
      'Skalierbare Backend-Systeme',
      'Datenbankdesign & -optimierung',
      'API-Entwicklung & -integration',
      'Authentication & Authorization',
    ],
  },
  {
    id: '03',
    icon: Code2,
    title: 'Softwareentwicklung',
    description: 'Backend-Systeme, APIs, Automatisierungen und individuelle Software-Lösungen für Ihre Prozesse.',
    features: [
      'Node.js, Python, Go',
      'Microservices & Monolithen',
      'CI/CD-Pipelines',
      'Testautomatisierung',
      'Code-Reviews & Refactoring',
    ],
  },
  {
    id: '04',
    icon: FileCode2,
    title: 'CMS-Lösungen',
    description: 'Contentful, Sanity, Strapi — wir richten das richtige CMS für Ihr Team ein und pflegen es.',
    features: [
      'Headless CMS-Setup',
      'Content-Modellierung',
      'Admin-Interface-Anpassung',
      'Migration von Legacy-CMS',
      'Team-Schulung & Dokumentation',
    ],
  },
  {
    id: '05',
    icon: Brain,
    title: 'KI-Beratung',
    description: 'KI-Integration in Ihre Prozesse: Chatbots, Automatisierungen, RAG-Systeme und LLM-Anbindungen.',
    features: [
      'KI-Strategie & Beratung',
      'RAG-Systeme & Vector-Datenbanken',
      'LLM-Integration (OpenAI, Anthropic)',
      'Automatisierungen mit AI',
      'Custom Chatbots & Assistenten',
    ],
  },
  {
    id: '06',
    icon: Zap,
    title: 'Digitale Transformation',
    description: 'Wir begleiten Ihr Unternehmen bei der Digitalisierung — von der Strategie bis zur Umsetzung.',
    features: [
      'Digitalisierungsstrategie',
      'Prozessanalyse & -optimierung',
      'Tool-Evaluation & -auswahl',
      'Change Management',
      'Schulungen & Workshops',
    ],
  },
  {
    id: '07',
    icon: Search,
    title: 'SEO & Suchmaschinenoptimierung',
    description: 'Technisches SEO, On-Page-Optimierung und Content-Strategie für nachhaltig mehr organischen Traffic.',
    features: [
      'Technisches SEO-Audit',
      'On-Page & Content-Optimierung',
      'Core Web Vitals',
      'Linkaufbau-Strategie',
      'Monatliche Reporting & Monitoring',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#111111] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#A78BFA] mb-4">
              Leistungen
            </p>
            <h1
              className="text-white font-extrabold leading-tight mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px' }}
            >
              Was wir für Sie leisten
            </h1>
            <p className="text-[#9CA3AF] text-lg max-w-xl leading-relaxed">
              Von der ersten Idee bis zum erfolgreichen Launch — und darüber hinaus.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, i) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                      i % 2 === 1 ? 'lg:direction-rtl' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-medium text-[#6B7280]">{service.id}</span>
                        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                          <Icon size={18} className="text-[#7C3AED]" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-[#111111] mb-4" style={{ letterSpacing: '-0.5px' }}>
                        {service.title}
                      </h2>
                      <p className="text-[#6B7280] leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm text-[#374151]">
                            <CheckCircle size={16} className="text-[#7C3AED] flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:pl-8">
                      <div
                        className="h-64 rounded-xl border border-[#E8E8ED] bg-[#F4F4F6] flex items-center justify-center"
                      >
                        <Icon size={64} className="text-[#E8E8ED]" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
