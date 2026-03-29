import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

function CodeEditorSvg() {
  return (
    <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}>
      <rect width="440" height="300" rx="16" fill="#1E1E2E"/>
      <rect width="440" height="44" rx="16" fill="#2D2D3F"/>
      <rect y="28" width="440" height="16" fill="#2D2D3F"/>
      <circle cx="22" cy="22" r="6" fill="#FF5F57"/>
      <circle cx="42" cy="22" r="6" fill="#FFBD2E"/>
      <circle cx="62" cy="22" r="6" fill="#28C840"/>
      <rect x="88" y="14" width="120" height="16" rx="8" fill="#1E1E2E"/>
      {/* Line numbers */}
      <rect x="16" y="60" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="78" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="96" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="114" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="132" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="150" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="168" width="12" height="4" rx="2" fill="#4B5563"/>
      <rect x="16" y="186" width="12" height="4" rx="2" fill="#4B5563"/>
      {/* Code line 1 */}
      <rect x="44" y="58" width="44" height="8" rx="3" fill="#FF79C6"/>
      <rect x="96" y="58" width="28" height="8" rx="3" fill="#F8F8F2"/>
      <rect x="132" y="58" width="16" height="8" rx="3" fill="#F8F8F2"/>
      <rect x="156" y="58" width="60" height="8" rx="3" fill="#50FA7B"/>
      {/* Code line 2 */}
      <rect x="60" y="76" width="36" height="8" rx="3" fill="#8BE9FD"/>
      <rect x="104" y="76" width="20" height="8" rx="3" fill="#F8F8F2"/>
      <rect x="132" y="76" width="80" height="8" rx="3" fill="#FFB86C"/>
      {/* Code line 3 */}
      <rect x="60" y="94" width="24" height="8" rx="3" fill="#8BE9FD"/>
      <rect x="92" y="94" width="16" height="8" rx="3" fill="#F8F8F2"/>
      <rect x="116" y="94" width="100" height="8" rx="3" fill="#F1FA8C"/>
      {/* Code line 4 */}
      <rect x="44" y="112" width="20" height="8" rx="3" fill="#FF79C6"/>
      <rect x="72" y="112" width="16" height="8" rx="3" fill="#F8F8F2"/>
      {/* Code line 5 */}
      <rect x="60" y="130" width="32" height="8" rx="3" fill="#6272A4"/>
      <rect x="100" y="130" width="60" height="8" rx="3" fill="#50FA7B"/>
      <rect x="168" y="130" width="40" height="8" rx="3" fill="#F8F8F2"/>
      {/* Code line 6 — highlighted */}
      <rect x="44" y="146" width="360" height="20" rx="4" fill="#44475A"/>
      <rect x="60" y="150" width="28" height="8" rx="3" fill="#8BE9FD"/>
      <rect x="96" y="150" width="16" height="8" rx="3" fill="#F8F8F2"/>
      <rect x="120" y="150" width="120" height="8" rx="3" fill="#FFB86C"/>
      {/* Code line 7 */}
      <rect x="60" y="184" width="20" height="8" rx="3" fill="#FF79C6"/>
      <rect x="88" y="184" width="40" height="8" rx="3" fill="#F8F8F2"/>
      {/* Code line 8 */}
      <rect x="44" y="184" width="16" height="8" rx="3" fill="#FF79C6"/>
      {/* Status bar */}
      <rect y="268" width="440" height="32" fill="#2D2D3F"/>
      <rect x="16" y="278" width="60" height="8" rx="3" fill="#50FA7B"/>
      <rect x="90" y="278" width="80" height="8" rx="3" fill="#6272A4"/>
      <rect x="340" y="278" width="80" height="8" rx="3" fill="#6272A4"/>
    </svg>
  )
}

function NeuralNetworkSvg() {
  return (
    <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(124,58,237,0.1))' }}>
      <rect width="440" height="300" rx="16" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
      {/* Connections */}
      <line x1="80" y1="90" x2="220" y2="70" stroke="#EDE9FE" strokeWidth="1.5"/>
      <line x1="80" y1="90" x2="220" y2="120" stroke="#EDE9FE" strokeWidth="1.5"/>
      <line x1="80" y1="90" x2="220" y2="180" stroke="#DDD6FE" strokeWidth="1"/>
      <line x1="80" y1="150" x2="220" y2="70" stroke="#DDD6FE" strokeWidth="1"/>
      <line x1="80" y1="150" x2="220" y2="120" stroke="#EDE9FE" strokeWidth="1.5"/>
      <line x1="80" y1="150" x2="220" y2="180" stroke="#EDE9FE" strokeWidth="1.5"/>
      <line x1="80" y1="210" x2="220" y2="120" stroke="#DDD6FE" strokeWidth="1"/>
      <line x1="80" y1="210" x2="220" y2="180" stroke="#EDE9FE" strokeWidth="1.5"/>
      <line x1="220" y1="70" x2="360" y2="100" stroke="#C4B5FD" strokeWidth="2"/>
      <line x1="220" y1="70" x2="360" y2="200" stroke="#EDE9FE" strokeWidth="1"/>
      <line x1="220" y1="120" x2="360" y2="100" stroke="#A78BFA" strokeWidth="2"/>
      <line x1="220" y1="120" x2="360" y2="200" stroke="#C4B5FD" strokeWidth="1.5"/>
      <line x1="220" y1="180" x2="360" y2="100" stroke="#EDE9FE" strokeWidth="1"/>
      <line x1="220" y1="180" x2="360" y2="200" stroke="#A78BFA" strokeWidth="2"/>
      {/* Layer 1 */}
      <circle cx="80" cy="90" r="20" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="2"/>
      <circle cx="80" cy="90" r="8" fill="#7C3AED"/>
      <circle cx="80" cy="150" r="20" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="2"/>
      <circle cx="80" cy="150" r="8" fill="#7C3AED"/>
      <circle cx="80" cy="210" r="20" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="2"/>
      <circle cx="80" cy="210" r="8" fill="#7C3AED"/>
      {/* Layer 2 */}
      <circle cx="220" cy="70" r="20" fill="#DDD6FE" stroke="#A78BFA" strokeWidth="2"/>
      <circle cx="220" cy="70" r="8" fill="#6D28D9"/>
      <circle cx="220" cy="120" r="24" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2.5"/>
      <circle cx="220" cy="120" r="10" fill="#7C3AED"/>
      <circle cx="220" cy="180" r="20" fill="#DDD6FE" stroke="#A78BFA" strokeWidth="2"/>
      <circle cx="220" cy="180" r="8" fill="#6D28D9"/>
      {/* Layer 3 */}
      <circle cx="360" cy="100" r="24" fill="#7C3AED" stroke="#5B21B6" strokeWidth="2"/>
      <circle cx="360" cy="100" r="10" fill="white"/>
      <circle cx="360" cy="200" r="20" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="360" cy="200" r="8" fill="white"/>
      {/* Labels */}
      <rect x="48" y="240" width="64" height="20" rx="6" fill="#F4F4F6"/>
      <rect x="57" y="247" width="46" height="6" rx="3" fill="#9CA3AF"/>
      <rect x="188" y="240" width="64" height="20" rx="6" fill="#F4F4F6"/>
      <rect x="197" y="247" width="46" height="6" rx="3" fill="#9CA3AF"/>
      <rect x="328" y="240" width="64" height="20" rx="6" fill="#EDE9FE"/>
      <rect x="337" y="247" width="46" height="6" rx="3" fill="#7C3AED"/>
    </svg>
  )
}

function AnalyticsSvg() {
  return (
    <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}>
      <rect width="440" height="300" rx="16" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
      {/* Title */}
      <rect x="24" y="24" width="100" height="8" rx="4" fill="#111111"/>
      <rect x="24" y="40" width="60" height="6" rx="3" fill="#D1D5DB"/>
      {/* Badges */}
      <rect x="336" y="20" width="80" height="28" rx="8" fill="#DCFCE7"/>
      <rect x="348" y="30" width="56" height="8" rx="4" fill="#16A34A"/>
      {/* Grid lines */}
      <line x1="48" y1="80" x2="416" y2="80" stroke="#F4F4F6" strokeWidth="1"/>
      <line x1="48" y1="120" x2="416" y2="120" stroke="#F4F4F6" strokeWidth="1"/>
      <line x1="48" y1="160" x2="416" y2="160" stroke="#F4F4F6" strokeWidth="1"/>
      <line x1="48" y1="200" x2="416" y2="200" stroke="#F4F4F6" strokeWidth="1"/>
      <line x1="48" y1="240" x2="416" y2="240" stroke="#F0F0F0" strokeWidth="1"/>
      {/* Area fill */}
      <path d="M 48 220 L 110 200 L 170 190 L 230 165 L 290 130 L 350 100 L 416 70 L 416 240 L 48 240 Z" fill="url(#purpleGrad)" opacity="0.15"/>
      {/* Line */}
      <path d="M 48 220 L 110 200 L 170 190 L 230 165 L 290 130 L 350 100 L 416 70" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      {/* Data points */}
      <circle cx="110" cy="200" r="5" fill="white" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="170" cy="190" r="5" fill="white" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="230" cy="165" r="5" fill="white" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="290" cy="130" r="5" fill="white" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="350" cy="100" r="7" fill="#7C3AED"/>
      <circle cx="416" cy="70" r="7" fill="#7C3AED"/>
      {/* Tooltip */}
      <rect x="326" y="44" width="90" height="48" rx="8" fill="#111111"/>
      <rect x="338" y="54" width="40" height="5" rx="2.5" fill="#9CA3AF"/>
      <rect x="338" y="64" width="60" height="8" rx="4" fill="white"/>
      <polygon points="371,92 365,102 377,102" fill="#111111"/>
      {/* X axis labels */}
      <rect x="84" y="252" width="28" height="5" rx="2.5" fill="#D1D5DB"/>
      <rect x="156" y="252" width="28" height="5" rx="2.5" fill="#D1D5DB"/>
      <rect x="224" y="252" width="28" height="5" rx="2.5" fill="#D1D5DB"/>
      <rect x="284" y="252" width="28" height="5" rx="2.5" fill="#D1D5DB"/>
      <rect x="344" y="252" width="28" height="5" rx="2.5" fill="#D1D5DB"/>
      <rect x="400" y="252" width="28" height="5" rx="2.5" fill="#9CA3AF"/>
      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function RoadmapSvg() {
  return (
    <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}>
      <rect width="440" height="300" rx="16" fill="white" stroke="#EFEFEF" strokeWidth="1"/>
      <rect x="24" y="24" width="120" height="8" rx="4" fill="#111111"/>
      <rect x="24" y="40" width="80" height="6" rx="3" fill="#D1D5DB"/>
      {/* Horizontal line */}
      <line x1="60" y1="130" x2="380" y2="130" stroke="#E8E8ED" strokeWidth="2" strokeDasharray="6 4"/>
      {/* Step 1 */}
      <circle cx="60" cy="130" r="20" fill="#7C3AED"/>
      <rect x="44" y="124" width="32" height="12" rx="4" fill="#7C3AED"/>
      <rect x="50" y="127" width="20" height="6" rx="3" fill="white"/>
      <rect x="24" y="162" width="72" height="60" rx="10" fill="#F4F4F6"/>
      <rect x="32" y="172" width="56" height="6" rx="3" fill="#111111"/>
      <rect x="32" y="184" width="40" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="32" y="194" width="48" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="32" y="204" width="32" height="4" rx="2" fill="#9CA3AF"/>
      {/* Step 2 */}
      <circle cx="167" cy="130" r="20" fill="#A78BFA"/>
      <rect x="151" y="124" width="32" height="12" rx="4" fill="#A78BFA"/>
      <rect x="157" y="127" width="20" height="6" rx="3" fill="white"/>
      <rect x="131" y="162" width="72" height="60" rx="10" fill="#F4F4F6"/>
      <rect x="139" y="172" width="56" height="6" rx="3" fill="#111111"/>
      <rect x="139" y="184" width="40" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="139" y="194" width="48" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="139" y="204" width="32" height="4" rx="2" fill="#9CA3AF"/>
      {/* Step 3 */}
      <circle cx="273" cy="130" r="20" fill="#C4B5FD"/>
      <rect x="257" y="124" width="32" height="12" rx="4" fill="#C4B5FD"/>
      <rect x="263" y="127" width="20" height="6" rx="3" fill="white"/>
      <rect x="237" y="162" width="72" height="60" rx="10" fill="#F4F4F6"/>
      <rect x="245" y="172" width="56" height="6" rx="3" fill="#111111"/>
      <rect x="245" y="184" width="40" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="245" y="194" width="48" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="245" y="204" width="32" height="4" rx="2" fill="#9CA3AF"/>
      {/* Step 4 */}
      <circle cx="380" cy="130" r="20" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="4 2"/>
      <rect x="364" y="124" width="32" height="12" rx="4" fill="#EDE9FE"/>
      <rect x="370" y="127" width="20" height="6" rx="3" fill="#C4B5FD"/>
      <rect x="344" y="162" width="72" height="60" rx="10" fill="#F8F9FA" stroke="#EFEFEF" strokeWidth="1"/>
      <rect x="352" y="172" width="56" height="6" rx="3" fill="#D1D5DB"/>
      <rect x="352" y="184" width="40" height="4" rx="2" fill="#E8E8ED"/>
      <rect x="352" y="194" width="48" height="4" rx="2" fill="#E8E8ED"/>
      {/* Step labels */}
      <rect x="32" y="96" width="56" height="16" rx="6" fill="#EDE9FE"/>
      <rect x="40" y="102" width="40" height="4" rx="2" fill="#7C3AED"/>
      <rect x="139" y="96" width="56" height="16" rx="6" fill="#EDE9FE"/>
      <rect x="147" y="102" width="40" height="4" rx="2" fill="#7C3AED"/>
      <rect x="245" y="96" width="56" height="16" rx="6" fill="#EDE9FE"/>
      <rect x="253" y="102" width="40" height="4" rx="2" fill="#A78BFA"/>
      <rect x="352" y="96" width="56" height="16" rx="6" fill="#F4F4F6"/>
      <rect x="360" y="102" width="40" height="4" rx="2" fill="#D1D5DB"/>
    </svg>
  )
}

const features = [
  {
    id: 1,
    reverse: false,
    svg: <CodeEditorSvg />,
    tag: 'Webentwicklung',
    h3: 'Websites & Webapplikationen die begeistern',
    text: 'Eine professionelle Website ist heute mehr als eine digitale Visitenkarte — sie ist Ihr wichtigster Verkäufer. Twyne entwickelt Websites und Webapplikationen die schnell laden, auf allen Geräten perfekt aussehen und bei Google gefunden werden. Wir kombinieren durchdachtes Design mit technischer Exzellenz — damit Besucher zu Kunden werden.',
    checks: ['Mobile-First Design — perfekt auf Smartphone, Tablet & Desktop', 'Blitzschnell — Lighthouse Score über 90, Core Web Vitals bestanden', 'SEO-optimiert von Anfang an — nicht als Nachgedanke'],
    link: '/leistungen/webseiten',
    linkText: 'Mehr über Webentwicklung',
  },
  {
    id: 2,
    reverse: true,
    svg: <NeuralNetworkSvg />,
    tag: 'KI-Beratung',
    h3: 'KI-Integration die wirklich funktioniert',
    text: 'Künstliche Intelligenz ist kein Zukunftsthema mehr — sie ist heute einsetzbar und bringt konkreten Nutzen für Schweizer KMU. Twyne hilft Ihnen dabei, KI pragmatisch in Ihre bestehenden Prozesse zu integrieren. Kein Marketing-Hype, keine leeren Versprechen — sondern messbare Zeitersparnis und neue Möglichkeiten.',
    checks: ['ChatGPT & Claude Integration in bestehende Systeme', 'Automatisierung repetitiver Prozesse', 'DSGVO-konform — auf Wunsch mit lokalen KI-Modellen'],
    link: '/leistungen/ki-beratung',
    linkText: 'Mehr über KI-Beratung',
  },
  {
    id: 3,
    reverse: false,
    svg: <AnalyticsSvg />,
    tag: 'SEO',
    h3: 'SEO der Sie auf Google Seite 1 bringt',
    text: '91% aller Schweizer suchen Dienstleistungen zuerst bei Google. Wer auf Seite 1 steht gewinnt — wer auf Seite 2 steht wird kaum gefunden. Twyne entwickelt nachhaltige SEO-Strategien für Schweizer KMU: technisch einwandfrei, inhaltlich überzeugend, lokal relevant. Keine kurzfristigen Tricks — Sichtbarkeit die bleibt.',
    checks: ['Technisches SEO & Core Web Vitals Optimierung', 'Keyword-Strategie speziell für den Schweizer Markt', 'Monatliche Reports — transparent & verständlich'],
    link: '/leistungen/seo',
    linkText: 'Mehr über SEO',
  },
  {
    id: 4,
    reverse: true,
    svg: <RoadmapSvg />,
    tag: 'Digitale Transformation',
    h3: 'Digitale Transformation die Ihr Team mitnimmt',
    text: 'Digitalisierung scheitert selten an der Technologie — sie scheitert an der Umsetzung. Twyne begleitet Schweizer KMU von der Strategie bis zum produktiven Einsatz. Pragmatisch, schrittweise, ohne Disruption des laufenden Betriebs. Wir nehmen Ihr Team mit und sorgen dafür dass die Investition Früchte trägt.',
    checks: ['Ist-Analyse & massgeschneiderte Roadmap', 'Schrittweise Implementierung ohne Betriebsunterbrechung', 'Schulung & Change Management inklusive'],
    link: '/leistungen/digitale-transformation',
    linkText: 'Mehr über Transformation',
  },
]

export default function FeatureRows() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Was wir leisten</span>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111111', lineHeight: 1.1 }}>
            Vier Kernkompetenzen. Messbarer Erfolg.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {features.map((f) => (
            <div key={f.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-on-scroll ${f.reverse ? 'lg:[direction:rtl]' : ''}`}>
              {/* Visual */}
              <div style={{ direction: 'ltr' }}>
                {f.svg}
              </div>
              {/* Text */}
              <div style={{ direction: 'ltr' }}>
                <span style={{ display: 'inline-block', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', color: '#7C3AED', borderRadius: '100px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.05em' }}>
                  {f.tag}
                </span>
                <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: '#111111', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
                  {f.h3}
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, marginBottom: '24px' }}>
                  {f.text}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {f.checks.map((c) => (
                    <li key={c} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                      <CheckCircle size={16} style={{ color: '#7C3AED', flexShrink: 0 }} />
                      {c}
                    </li>
                  ))}
                </ul>
                <Link href={f.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#7C3AED', textDecoration: 'none', borderBottom: '1px solid rgba(124,58,237,0.3)', paddingBottom: '2px' }}>
                  {f.linkText} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
