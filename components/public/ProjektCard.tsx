'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projects-data'

export default function ProjektCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const showScreenshot = project.status === 'live' && !!project.screenshotPath

  return (
    <Link
      href={`/projekte/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '20px',
        border: `1px solid ${hovered ? '#A78BFA' : '#EFEFEF'}`,
        overflow: 'hidden',
        boxShadow: hovered ? '0 24px 48px rgba(124,58,237,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Visual */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          background: showScreenshot ? '#111' : 'linear-gradient(135deg, #FAFAFA 0%, #F4F0FF 100%)',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showScreenshot ? (
          <Image
            src={project.screenshotPath as string}
            alt={`${project.name} Screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <Image
            src={project.logoPath}
            alt={`${project.name} Logo`}
            width={140}
            height={140}
            style={{
              width: 'auto',
              height: '90px',
              maxWidth: '60%',
              objectFit: 'contain',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
        )}

        {/* Status badge */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            background: project.status === 'live' ? 'rgba(16,185,129,0.95)' : 'rgba(124,58,237,0.95)',
            color: 'white',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'white',
            }}
          />
          {project.status === 'live' ? 'Live' : 'Konzept'}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#7C3AED',
            margin: '0 0 8px',
          }}
        >
          {project.branche}
        </p>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            margin: '0 0 8px',
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: 1.6,
            margin: '0 0 16px',
            flex: 1,
          }}
        >
          {project.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                padding: '3px 9px',
                background: '#F8F9FA',
                color: '#374151',
                fontSize: '11px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid #EFEFEF',
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span
              style={{
                padding: '3px 9px',
                color: '#9CA3AF',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid #F4F4F6',
          }}
        >
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
            {project.category} · {project.year}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#7C3AED',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
              transition: 'all 0.25s ease',
            }}
          >
            Mehr <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
