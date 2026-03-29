import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Download, GraduationCap } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function KursInteressePage() {
  const items = await prisma.kursInteresse.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Kurs-Interesse
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            {items.length} Person{items.length !== 1 ? 'en haben' : ' hat'} sich für die Twyne Academy vorgemerkt.
          </p>
        </div>
        <Link
          href="/api/kurs-interesse?format=csv"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 16px', background: 'white', color: '#374151',
            border: '1px solid #E8E8ED', borderRadius: '10px',
            fontSize: '13px', fontWeight: 600, textDecoration: 'none',
          }}
        >
          <Download size={15} />
          Als CSV exportieren
        </Link>
      </div>

      {items.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E8E8ED', padding: '60px', textAlign: 'center' }}>
          <GraduationCap size={40} style={{ color: '#E8E8ED', margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: '15px', color: '#6B7280' }}>Noch keine Einträge vorhanden.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E8E8ED', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E8E8ED' }}>
                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  E-Mail
                </th>
                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Datum
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: idx < items.length - 1 ? '1px solid #F0F0F5' : 'none' }}
                >
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: '#111111', fontWeight: 500 }}>
                    <a href={`mailto:${item.email}`} style={{ color: '#7C3AED', textDecoration: 'none' }}>
                      {item.email}
                    </a>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6B7280', textAlign: 'right' }}>
                    {item.createdAt.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
