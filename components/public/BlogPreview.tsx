import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

const posts = [
  {
    slug: 'ki-beratung-kmu-schweiz',
    datum: '15. März 2025',
    kategorie: 'KI-Beratung',
    titel: 'KI für KMU: Welche Tools sich für Schweizer Unternehmen wirklich lohnen',
    excerpt: 'Künstliche Intelligenz ist kein Zukunftsthema mehr. Wir zeigen, welche KI-Tools für kleine und mittlere Unternehmen in der Schweiz sofort eingesetzt werden können.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format',
    alt: 'Künstliche Intelligenz und digitale Transformation',
  },
  {
    slug: 'next-js-vs-wordpress-2025',
    datum: '28. Februar 2025',
    kategorie: 'Webentwicklung',
    titel: 'Next.js vs. WordPress 2025: Was ist die richtige Wahl für Ihr Projekt?',
    excerpt: 'WordPress oder modernes JavaScript-Framework? Wir analysieren die Vor- und Nachteile für verschiedene Anwendungsfälle und Unternehmenstypen.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop&auto=format',
    alt: 'Code auf einem Bildschirm',
  },
  {
    slug: 'seo-technische-grundlagen',
    datum: '10. Februar 2025',
    kategorie: 'SEO',
    titel: 'Technisches SEO 2025: Die Grundlagen die jede Webseite braucht',
    excerpt: 'Core Web Vitals, strukturierte Daten, Crawlability — was sind die technischen SEO-Faktoren, die 2025 den Unterschied machen.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
    alt: 'Business Strategie und Analyse',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-28 bg-[#F4F4F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#7C3AED] mb-3">
              Blog
            </p>
            <h2
              className="font-bold"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-1px', color: '#111111' }}
            >
              Einblicke & Wissen
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-[#7C3AED] hover:gap-3 transition-all duration-200"
          >
            Alle Artikel
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl border border-[#E8E8ED] overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm text-white border border-white/20"
                    style={{ background: 'rgba(124,58,237,0.75)' }}
                  >
                    {post.kategorie}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-base font-bold mt-1 mb-2.5 leading-snug group-hover:text-[#7C3AED] transition-colors"
                  style={{ color: '#111111' }}
                >
                  {post.titel}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#6B7280' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: '#6B7280' }}>
                  <Calendar size={12} />
                  {post.datum}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
