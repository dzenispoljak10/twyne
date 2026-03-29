export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Shield, Zap, TrendingUp } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Hero from '@/components/public/Hero'
import FeatureRows from '@/components/public/FeatureRows'
import Services from '@/components/public/Services'
import ProductsSection from '@/components/public/ProductsSection'
import Portfolio from '@/components/public/Portfolio'
import Process from '@/components/public/Process'
import Faq from '@/components/public/Faq'
import CtaSection from '@/components/public/CtaSection'
import Footer from '@/components/public/Footer'

export const metadata: Metadata = {
  title: 'Twyne — Digitalagentur Schweiz | Webdesign, Apps & KI-Beratung',
  description: 'Twyne ist Ihre Digitalagentur in der Schweiz. Webseiten, Webapplikationen, Software, KI-Beratung & SEO für Schweizer KMU — präzise gebaut, messbar wirksam.',
  alternates: {
    canonical: 'https://twyne.ch',
  },
}

const swissItems = [
  {
    icon: Shield,
    title: '100% Swiss-Made',
    text: 'Twyne hat seinen Sitz in der Schweiz. Wir entwickeln, hosten und betreuen alles in der Schweiz — für maximale Datensicherheit, DSGVO-Konformität und kurze Kommunikationswege. Kein Outsourcing ins Ausland, kein Qualitätsverlust.',
  },
  {
    icon: Zap,
    title: 'Alles aus einer Hand',
    text: 'Von der ersten Idee bis zur fertigen Lösung — und darüber hinaus. Webdesign, Entwicklung, SEO und KI-Beratung unter einem Dach. Ein Ansprechpartner, keine Reibungsverluste zwischen Agenturen, keine doppelten Kosten.',
  },
  {
    icon: TrendingUp,
    title: 'Messbare Resultate',
    text: 'Wir bauen keine digitalen Visitenkarten. Wir bauen Systeme die Kunden bringen, Prozesse automatisieren und Umsatz steigern. Jedes Projekt wird an klaren KPIs gemessen — Traffic, Leads, Conversions.',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureRows />
        <Services />
        <ProductsSection />
        <Portfolio />
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111111', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}>
                Ihre Digitalagentur. Ihr Schweizer Partner.
              </h2>
              <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                Twyne steht für digitale Lösungen die funktionieren — nicht für schöne Präsentationen die in der Schublade verschwinden.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {swissItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} style={{ background: '#FAFAFA', borderRadius: '20px', padding: '40px', border: '1px solid #EFEFEF' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <Icon size={32} style={{ color: '#7C3AED' }} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111111', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <Process />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
