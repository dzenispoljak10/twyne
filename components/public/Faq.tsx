import FaqAccordion from './FaqAccordion'

const homepageFaq = [
  {
    question: 'Wie lange dauert die Umsetzung eines Projekts?',
    answer: 'Eine Landing Page dauert 1–2 Wochen. Eine vollständige Website 3–6 Wochen. Webapplikationen 2–6 Monate je nach Komplexität. Wir halten uns an vereinbarte Deadlines — das ist für uns keine Selbstverständlichkeit, sondern ein Versprechen.',
  },
  {
    question: 'Arbeitet Twyne nur mit grossen Unternehmen?',
    answer: 'Nein — wir arbeiten mit KMU, Startups, Vereinen und Einzelpersonen. Die Projektgrösse spielt keine Rolle. Was zählt ist das Vorhaben und die Chemie zwischen uns.',
  },
  {
    question: 'Bieten Sie auch Support und Wartung nach dem Launch?',
    answer: 'Ja. Wir bieten Wartungspakete, Updates und langfristigen Support. Viele unserer Kunden arbeiten seit Jahren mit uns zusammen — das ist der beste Beweis dass wir liefern was wir versprechen.',
  },
  {
    question: 'Kann ich meine Website nach dem Launch selbst bearbeiten?',
    answer: 'Ja — wir integrieren ein benutzerfreundliches CMS damit Sie Texte, Bilder und Inhalte selbst aktualisieren können. Ohne technische Kenntnisse, von überall.',
  },
  {
    question: 'Arbeitet Twyne auch mit Kunden aus anderen Regionen?',
    answer: 'Ja. Wir arbeiten mit Kunden aus der ganzen Schweiz sowie aus Deutschland und Österreich. Meetings finden auf Wunsch remote oder bei Ihnen vor Ort statt.',
  },
]

export default function Faq() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 0' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FAQ</span>
            <div style={{ width: '40px', height: '1px', background: '#7C3AED' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111111', lineHeight: 1.1, marginBottom: '12px' }}>
            Häufige Fragen
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7 }}>
            Antworten auf die wichtigsten Fragen — ehrlich und direkt.
          </p>
        </div>
        <div className="animate-on-scroll">
          <FaqAccordion items={homepageFaq} />
        </div>
      </div>
    </section>
  )
}
