'use client'
import { useState } from 'react'
import { MessageSquare, FileText, Code2, Rocket } from 'lucide-react'

const steps = [
  { number: '01', icon: MessageSquare, title: 'Erstgespräch & Analyse', description: 'In einem kostenlosen Erstgespräch verstehen wir Ihre Ziele, Ihre Zielgruppe und Ihr Budget. Sie erhalten innerhalb von 24 Stunden eine detaillierte, transparente Offerte — keine versteckten Kosten.' },
  { number: '02', icon: FileText, title: 'Konzept & Planung', description: 'Wir entwickeln ein massgeschneidertes Konzept mit klaren Meilensteinen. Wireframes, Prototypen und ein Projektplan damit Sie genau wissen was Sie erwartet.' },
  { number: '03', icon: Code2, title: 'Entwicklung & Testing', description: 'Professionelle Umsetzung mit modernen Technologien. Regelmässige Reviews damit Sie jederzeit informiert sind. Ausführliche Tests auf allen Geräten und Browsern.' },
  { number: '04', icon: Rocket, title: 'Launch & Support', description: 'Go-Live mit persönlicher Begleitung. Schulung für Ihr Team. Langfristiger Support — wir sind auch nach dem Launch erreichbar.' },
]

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section style={{ background: '#111111', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }} className="animate-on-scroll">
          <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Prozess
          </span>
        </div>

        <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-2px', color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.1 }}>
          So arbeiten wir zusammen
        </h2>
        <p className="animate-on-scroll" style={{ fontSize: '16px', color: '#6B7280', marginBottom: '48px', maxWidth: '520px', lineHeight: 1.7 }}>
          Vier Schritte vom ersten Gespräch bis zum fertigen Produkt — transparent, termingerecht, ohne Überraschungen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
          {steps.map((step, i) => {
            const hovered = hoveredIndex === i
            const Icon = step.icon
            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  padding: '32px 24px',
                  borderRadius: '16px',
                  border: hovered ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  background: hovered ? 'rgba(124,58,237,0.05)' : 'transparent',
                  transition: 'all 0.3s ease',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {i < steps.length - 1 && (
                  <div style={{ display: 'none', position: 'absolute', top: '40px', left: 'calc(100% + 12px)', right: '-12px', height: '1px', borderTop: '1px dashed rgba(255,255,255,0.1)', zIndex: 0 }} className="lg:block" />
                )}
                <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1, marginBottom: '16px', color: hovered ? 'rgba(124,58,237,0.6)' : 'rgba(124,58,237,0.15)', transition: 'color 0.3s ease', userSelect: 'none' }}>
                  {step.number}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Icon size={22} style={{ color: hovered ? '#A78BFA' : '#7C3AED', transition: 'color 0.3s ease' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
