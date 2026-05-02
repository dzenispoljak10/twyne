/**
 * Fetches favicons / og-images from real live sites for the 5 echte Projekte
 * and generates simple SVG-based PNG logos for the 8 fiktive Projekte.
 *
 * Run: npm run projects:logos
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'
import sharp from 'sharp'
import { projects } from '../lib/projects-data'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public', 'projekte', 'logos')

const BRAND_PURPLE = '#7C3AED'

async function ensureDir(path: string) {
  if (!existsSync(path)) await mkdir(path, { recursive: true })
}

function abs(base: string, href: string): string {
  try {
    return new URL(href, base).toString()
  } catch {
    return href
  }
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`)
  return await res.text()
}

async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`)
  const ab = await res.arrayBuffer()
  return Buffer.from(ab)
}

async function findLogoUrl(siteUrl: string): Promise<string | null> {
  const html = await fetchHtml(siteUrl)
  const $ = cheerio.load(html)

  // Priority order
  const selectors = [
    'link[rel="apple-touch-icon"][sizes="180x180"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="icon"][sizes="192x192"]',
    'link[rel="icon"][sizes="512x512"]',
    'link[rel="icon"][type="image/png"]',
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'meta[property="og:image"]',
  ]

  for (const sel of selectors) {
    const el = $(sel).first()
    if (!el.length) continue
    const href = el.attr('href') || el.attr('content')
    if (!href) continue
    return abs(siteUrl, href)
  }

  return abs(siteUrl, '/favicon.ico')
}

async function downloadAndSavePng(url: string, outPath: string): Promise<void> {
  const buf = await fetchBuffer(url)
  // Convert any input (svg, ico, png, jpg) to a 512x512 PNG via sharp
  // For .ico we extract first image; sharp doesn't natively handle ico, so fall through if it errors
  try {
    await sharp(buf)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png({ quality: 90 })
      .toFile(outPath)
  } catch {
    // Fallback: write raw buffer (could be ico — Next/Image will still render but not ideal)
    await writeFile(outPath, buf)
  }
}

function initialsFor(name: string): string {
  const words = name.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

async function generateSvgLogo(name: string, outPath: string): Promise<void> {
  const initials = initialsFor(name)
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F4F0FF"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <rect x="8" y="8" width="496" height="496" rx="92" fill="none" stroke="#EDE9FE" stroke-width="2"/>
  <text x="50%" y="50%" dy="0.05em" text-anchor="middle" dominant-baseline="middle"
        font-family="Manrope, Inter, system-ui, sans-serif" font-weight="800"
        font-size="220" fill="${BRAND_PURPLE}" letter-spacing="-8">
    ${initials}
  </text>
</svg>`
  await sharp(Buffer.from(svg)).png().toFile(outPath)
}

async function processProject(project: (typeof projects)[number]): Promise<void> {
  const outPath = resolve(OUT_DIR, `${project.slug}.png`)

  if (project.status === 'live' && project.liveUrl) {
    try {
      const logoUrl = await findLogoUrl(project.liveUrl)
      if (!logoUrl) throw new Error('no logo url found')
      await downloadAndSavePng(logoUrl, outPath)
      console.log(`✓ ${project.slug}: logo from ${logoUrl} → public/projekte/logos/${project.slug}.png`)
      return
    } catch (err) {
      console.warn(
        `! ${project.slug}: live logo fetch failed (${(err as Error).message}) — falling back to generated SVG`,
      )
      try {
        await generateSvgLogo(project.name, outPath)
        console.log(`✓ ${project.slug}: fallback SVG → public/projekte/logos/${project.slug}.png`)
      } catch (svgErr) {
        console.error(`✗ ${project.slug}: SVG fallback also failed: ${(svgErr as Error).message}`)
      }
      return
    }
  }

  // Fictional projects → generated SVG
  try {
    await generateSvgLogo(project.name, outPath)
    console.log(`✓ ${project.slug}: generated SVG logo → public/projekte/logos/${project.slug}.png`)
  } catch (err) {
    console.error(`✗ ${project.slug}: SVG generation failed: ${(err as Error).message}`)
  }
}

async function main() {
  await ensureDir(OUT_DIR)
  console.log(`→ writing logos to ${OUT_DIR}\n`)

  for (const p of projects) {
    await processProject(p)
  }

  console.log('\n✓ done')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
