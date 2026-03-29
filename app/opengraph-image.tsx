import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            gap: '0px',
          }}
        >
          {/* Logo wordmark */}
          <div
            style={{
              fontSize: '96px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-4px',
              lineHeight: 1,
              marginBottom: '12px',
            }}
          >
            twyne
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              color: '#A78BFA',
              fontWeight: 600,
              marginBottom: '32px',
              letterSpacing: '-0.5px',
            }}
          >
            Digitalagentur Schweiz
          </div>

          {/* Services */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            {['Webseiten', 'Webapplikationen', 'SEO', 'KI-Beratung'].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#4B5563',
                    }}
                  />
                )}
                <div
                  style={{
                    fontSize: '18px',
                    color: '#9CA3AF',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#7C3AED',
            }}
          />
          <div style={{ fontSize: '16px', color: '#6B7280', fontWeight: 500 }}>twyne.ch</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
