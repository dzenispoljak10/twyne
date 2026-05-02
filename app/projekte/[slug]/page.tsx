import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  Code2,
  Globe,
  Lightbulb,
  Quote,
  Target,
  TrendingUp,
} from 'lucide-react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import ProjektCard from '@/components/public/ProjektCard'
import { projects, getProjectBySlug, getRelatedProjects } from '@/lib/projects-data'
import { groupTechByCategory } from '@/lib/tech-meta'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const ogImage =
    project.status === 'live' && project.screenshotPath ? project.screenshotPath : project.logoPath

  return {
    title: `${project.name} – Projekt | Twyne`,
    description: project.tagline,
    alternates: { canonical: `https://twyne.ch/projekte/${project.slug}` },
    openGraph: {
      title: `${project.name} – Projekt | Twyne`,
      description: project.tagline,
      url: `https://twyne.ch/projekte/${project.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.name }],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = getRelatedProjects(project.slug, 3)
  const showScreenshot = project.status === 'live' && !!project.screenshotPath
  const isLive = project.status === 'live'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.tagline,
    creator: { '@type': 'Organization', name: 'Twyne', url: 'https://twyne.ch' },
    dateCreated: String(project.year),
    url: `https://twyne.ch/projekte/${project.slug}`,
    image: showScreenshot ? `https://twyne.ch${project.screenshotPath}` : `https://twyne.ch${project.logoPath}`,
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <main>
        {/* a) Sticky top sub-nav */}
        <div
          style={{
            position: 'sticky',
            top: '68px',
            zIndex: 40,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #F0F0F0',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ padding: '12px 24px' }}>
            <Link
              href="/projekte"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B7280',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={14} /> Alle Projekte
            </Link>
          </div>
        </div>

        {/* b) Hero */}
        <section
          style={{
            background: 'linear-gradient(180deg, #FAFAFA 0%, #F4F0FF 100%)',
            padding: '64px 0 96px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '-200px',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
            <div className="hero-grid">
              <style>{`
                .hero-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 48px;
                  align-items: center;
                }
                @media (min-width: 1024px) {
                  .hero-grid { grid-template-columns: 1fr 1.1fr; gap: 64px; }
                }
                .browser-frame {
                  background: white;
                  border-radius: 14px;
                  overflow: hidden;
                  box-shadow: 0 30px 60px rgba(17,17,17,0.15), 0 0 0 1px rgba(0,0,0,0.04);
                }
                .browser-bar {
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  padding: 10px 14px;
                  background: #F4F4F6;
                  border-bottom: 1px solid #E5E7EB;
                }
                .browser-dot { width: 10px; height: 10px; border-radius: 50%; }
              `}</style>

              {/* Left: Info */}
              <div>
                <Image
                  src={project.logoPath}
                  alt={`${project.name} Logo`}
                  width={160}
                  height={160}
                  style={{
                    width: 'auto',
                    height: '64px',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    marginBottom: '24px',
                  }}
                />
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: '#7C3AED',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    marginBottom: '20px',
                  }}
                >
                  {project.branche}
                </span>
                <h1
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontWeight: 800,
                    letterSpacing: '-2.5px',
                    lineHeight: 1.05,
                    color: '#111111',
                    margin: '0 0 16px',
                  }}
                >
                  {project.name}
                </h1>
                <p
                  style={{
                    fontSize: '20px',
                    color: '#6B7280',
                    lineHeight: 1.55,
                    margin: '0 0 28px',
                    maxWidth: '520px',
                  }}
                >
                  {project.tagline}
                </p>

                {/* Status */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                  {isLive && project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '100px',
                        background: '#10B981',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                      Live ansehen <ArrowUpRight size={14} />
                    </a>
                  ) : isLive ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '100px',
                        background: '#10B981',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                      Live
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '100px',
                        background: '#7C3AED',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                      Konzeptprojekt
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500 }}>
                  {project.year} · {project.category}
                </div>
              </div>

              {/* Right: Visual */}
              <div>
                {showScreenshot ? (
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <span className="browser-dot" style={{ background: '#FF5F57' }} />
                      <span className="browser-dot" style={{ background: '#FEBC2E' }} />
                      <span className="browser-dot" style={{ background: '#28C840' }} />
                      <span
                        style={{
                          marginLeft: '12px',
                          fontSize: '11px',
                          color: '#9CA3AF',
                          fontWeight: 500,
                          fontFamily: 'ui-monospace, monospace',
                        }}
                      >
                        {project.liveUrl?.replace(/^https?:\/\//, '') ?? project.name.toLowerCase()}
                      </span>
                    </div>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: '#fff' }}>
                      <Image
                        src={project.screenshotPath as string}
                        alt={`${project.name} Screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F0FF 100%)',
                      borderRadius: '20px',
                      border: '1px solid #EDE9FE',
                      padding: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '16 / 10',
                      boxShadow: '0 30px 60px rgba(124,58,237,0.12)',
                    }}
                  >
                    <Image
                      src={project.logoPath}
                      alt={`${project.name} Logo`}
                      width={280}
                      height={280}
                      style={{
                        width: 'auto',
                        height: '60%',
                        maxWidth: '60%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* c) Quick Facts */}
        <section style={{ padding: '64px 0', background: 'white' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <style>{`
              .quick-facts {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
              }
              @media (min-width: 768px) {
                .quick-facts { grid-template-columns: repeat(4, 1fr); }
              }
            `}</style>
            <div className="quick-facts">
              {[
                { Icon: Briefcase, label: 'Branche', value: project.branche },
                { Icon: Globe, label: 'Kategorie', value: project.category },
                { Icon: Code2, label: 'Tech-Stack', value: `${project.techStack.length} Technologien` },
                { Icon: Calendar, label: 'Jahr', value: String(project.year) },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '20px',
                  }}
                >
                  <f.Icon size={20} style={{ color: '#7C3AED', marginBottom: '12px' }} />
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#9CA3AF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      margin: '0 0 4px',
                    }}
                  >
                    {f.label}
                  </p>
                  <p style={{ fontSize: '14px', color: '#111111', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* d) Story */}
        <section style={{ padding: '64px 0', background: '#FAFAFA' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <style>{`
              .story-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 32px;
              }
              @media (min-width: 1024px) {
                .story-grid { grid-template-columns: repeat(3, 1fr); gap: 32px; }
              }
            `}</style>
            <div className="story-grid">
              {[
                { Icon: Target, title: 'Die Herausforderung', body: project.challenge },
                { Icon: Lightbulb, title: 'Unsere Lösung', body: project.solution },
                { Icon: TrendingUp, title: 'Das Ergebnis', body: project.result },
              ].map((s) => (
                <div
                  key={s.title}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid #EFEFEF',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: '#F4F0FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <s.Icon size={26} style={{ color: '#7C3AED' }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.5px',
                      margin: '0 0 12px',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* e) Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section style={{ background: '#111111', padding: '72px 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <style>{`
                .metrics-row {
                  display: flex;
                  gap: 16px;
                  overflow-x: auto;
                  padding-bottom: 8px;
                }
                @media (min-width: 768px) {
                  .metrics-row {
                    display: grid;
                    grid-template-columns: repeat(${project.metrics.length}, 1fr);
                    overflow: visible;
                    padding-bottom: 0;
                  }
                }
              `}</style>
              <div className="metrics-row">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      flexShrink: 0,
                      minWidth: '200px',
                      padding: '24px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(36px, 5vw, 56px)',
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-1.5px',
                        lineHeight: 1,
                        margin: '0 0 8px',
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.55)',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* f) Tech Stack */}
        <section style={{ padding: '96px 0', background: 'white' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div style={{ marginBottom: '48px', maxWidth: '720px' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#7C3AED',
                  margin: '0 0 14px',
                }}
              >
                Tech-Stack
              </p>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 800,
                  color: '#111111',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  margin: '0 0 16px',
                }}
              >
                Verwendete Technologien
              </h2>
              <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                {project.techStack.length} Technologien — bewusst gewählt für Performance, Wartbarkeit und
                klare Verantwortung im Stack.
              </p>
            </div>

            <style>{`
              .tech-categories {
                display: grid;
                grid-template-columns: 1fr;
                gap: 28px;
              }
              @media (min-width: 1024px) {
                .tech-categories { grid-template-columns: 280px 1fr; gap: 48px; align-items: start; }
              }
              .tech-cat-block {
                display: grid;
                grid-template-columns: 1fr;
                gap: 28px;
              }
              .tech-items {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
              }
              @media (min-width: 640px) {
                .tech-items { grid-template-columns: repeat(2, 1fr); }
              }
            `}</style>

            {groupTechByCategory(project.techStack).map((group) => (
              <div
                key={group.category}
                className="tech-categories"
                style={{
                  paddingTop: '28px',
                  paddingBottom: '28px',
                  borderTop: '1px solid #EFEFEF',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#7C3AED',
                      margin: '0 0 8px',
                    }}
                  >
                    Layer
                  </p>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.5px',
                      margin: 0,
                    }}
                  >
                    {group.category}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#9CA3AF',
                      margin: '8px 0 0',
                      fontWeight: 500,
                    }}
                  >
                    {group.items.length} {group.items.length === 1 ? 'Technologie' : 'Technologien'}
                  </p>
                </div>

                <div className="tech-items">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        background: 'white',
                        border: '1px solid #EFEFEF',
                        borderRadius: '14px',
                        padding: '20px',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: '#F4F0FF',
                            color: '#7C3AED',
                            fontSize: '13px',
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {item.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()}
                        </span>
                        <span
                          style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#111111',
                            letterSpacing: '-0.2px',
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '13px',
                          color: '#6B7280',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* g) Features */}
        <section style={{ padding: '72px 0', background: '#FAFAFA' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800,
                color: '#111111',
                letterSpacing: '-1px',
                margin: '0 0 32px',
              }}
            >
              Was wir gebaut haben
            </h2>
            <style>{`
              .features-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 16px;
              }
              @media (min-width: 768px) {
                .features-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
              }
            `}</style>
            <div className="features-grid">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '18px 20px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #EFEFEF',
                  }}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#7C3AED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Check size={14} color="white" strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: '15px', color: '#111111', fontWeight: 500, lineHeight: 1.5 }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* h) Testimonial */}
        {project.testimonial && (
          <section
            style={{
              padding: '96px 0',
              background: 'linear-gradient(135deg, #F4F0FF 0%, #FFFFFF 100%)',
            }}
          >
            <div className="max-w-3xl mx-auto px-6 lg:px-8" style={{ textAlign: 'center' }}>
              <Quote size={48} style={{ color: '#7C3AED', margin: '0 auto 24px' }} />
              <p
                style={{
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.4,
                  margin: '0 0 24px',
                }}
              >
                «{project.testimonial.quote}»
              </p>
              <p style={{ fontSize: '15px', fontWeight: 700, color: '#111111', margin: '0 0 4px' }}>
                {project.testimonial.author}
              </p>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                {project.testimonial.role}
              </p>
            </div>
          </section>
        )}

        {/* i) CTA */}
        <section
          style={{
            background: '#7C3AED',
            padding: '96px 0',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '700px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="max-w-3xl mx-auto px-6 lg:px-8" style={{ position: 'relative' }}>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                lineHeight: 1.1,
                margin: '0 0 16px',
              }}
            >
              Ähnliches Projekt im Kopf?
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                margin: '0 0 32px',
              }}
            >
              Lass uns sprechen — wir antworten innerhalb von 24h.
            </p>
            <Link
              href="/anfrage"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                color: '#7C3AED',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Anfrage starten <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* j) Related */}
        {related.length > 0 && (
          <section style={{ padding: '96px 0', background: 'white' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#111111',
                  letterSpacing: '-1px',
                  margin: '0 0 32px',
                }}
              >
                Weitere Projekte
              </h2>
              <style>{`
                .related-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 24px;
                }
                @media (min-width: 640px) {
                  .related-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (min-width: 1024px) {
                  .related-grid { grid-template-columns: repeat(3, 1fr); }
                }
              `}</style>
              <div className="related-grid">
                {related.map((p) => (
                  <ProjektCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
