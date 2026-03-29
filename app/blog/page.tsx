import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Einblicke, Wissen und Tipps rund um Webentwicklung, KI, SEO und digitale Strategie von Twyne.',
}

const posts = [
  {
    slug: 'ki-beratung-kmu-schweiz',
    datum: '15. März 2025',
    kategorie: 'KI-Beratung',
    titel: 'KI für KMU: Welche Tools sich für Schweizer Unternehmen wirklich lohnen',
    excerpt: 'Künstliche Intelligenz ist kein Zukunftsthema mehr. Wir zeigen, welche KI-Tools für kleine und mittlere Unternehmen in der Schweiz sofort eingesetzt werden können — ohne riesiges Budget.',
    lesezeit: '8 min',
  },
  {
    slug: 'next-js-vs-wordpress-2025',
    datum: '28. Februar 2025',
    kategorie: 'Webentwicklung',
    titel: 'Next.js vs. WordPress 2025: Was ist die richtige Wahl für Ihr Projekt?',
    excerpt: 'WordPress oder modernes JavaScript-Framework? Wir analysieren die Vor- und Nachteile für verschiedene Anwendungsfälle und Unternehmenstypen.',
    lesezeit: '6 min',
  },
  {
    slug: 'seo-technische-grundlagen',
    datum: '10. Februar 2025',
    kategorie: 'SEO',
    titel: 'Technisches SEO 2025: Die Grundlagen die jede Webseite braucht',
    excerpt: 'Core Web Vitals, strukturierte Daten, Crawlability — was sind die technischen SEO-Faktoren, die 2025 den Unterschied machen.',
    lesezeit: '10 min',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-[#111111] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#A78BFA] mb-4">
              Blog
            </p>
            <h1
              className="text-white font-extrabold leading-tight mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px' }}
            >
              Einblicke & Wissen
            </h1>
            <p className="text-[#9CA3AF] text-lg max-w-xl leading-relaxed">
              Praxiswissen rund um Webentwicklung, KI, SEO und digitale Strategie.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl border border-[#E8E8ED] p-8 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium uppercase tracking-widest text-[#7C3AED]">
                      {post.kategorie}
                    </span>
                    <span className="text-[#E8E8ED]">·</span>
                    <span className="text-xs text-[#6B7280]">{post.lesezeit} Lesezeit</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#111111] mb-3 leading-snug group-hover:text-[#7C3AED] transition-colors">
                    {post.titel}
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Calendar size={12} />
                      {post.datum}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-[#7C3AED] group-hover:gap-2 transition-all">
                      Lesen <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
