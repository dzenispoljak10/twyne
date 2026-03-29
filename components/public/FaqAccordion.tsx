'use client'
import { useState } from 'react'

export interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: '12px',
              border: isOpen ? '1px solid rgba(124,58,237,0.2)' : '1px solid #EFEFEF',
              borderLeft: isOpen ? '3px solid #7C3AED' : '1px solid #EFEFEF',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
              }}
            >
              <span style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.4,
              }}>
                {item.question}
              </span>
              <span style={{
                flexShrink: 0,
                fontSize: '20px',
                color: '#7C3AED',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
                lineHeight: 1,
              }}>
                ↓
              </span>
            </button>
            <div style={{
              maxHeight: isOpen ? '400px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              <p style={{
                padding: '0 24px 20px',
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: 1.7,
              }}>
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
