/**
 * Captures above-the-fold screenshots (1440x900 @2x) for the live projects
 * via Puppeteer, then downscales to max 2880px wide PNG via sharp.
 *
 * Run: npm run projects:screenshots
 */
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { projects } from '../lib/projects-data'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public', 'projekte', 'screenshots')

async function ensureDir(path: string) {
  if (!existsSync(path)) await mkdir(path, { recursive: true })
}

async function main() {
  await ensureDir(OUT_DIR)
  console.log(`→ writing screenshots to ${OUT_DIR}\n`)

  const liveProjects = projects.filter((p) => p.status === 'live' && p.liveUrl)
  if (liveProjects.length === 0) {
    console.log('No live projects to screenshot.')
    return
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const summary: { slug: string; ok: boolean; note?: string }[] = []

  try {
    for (const p of liveProjects) {
      const tmpPath = resolve(OUT_DIR, `${p.slug}.tmp.png`)
      const finalPath = resolve(OUT_DIR, `${p.slug}.png`)

      console.log(`→ ${p.slug}: opening ${p.liveUrl}`)
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
      )

      try {
        await page.goto(p.liveUrl as string, { waitUntil: 'networkidle2', timeout: 45000 })
        // Give animations/lazy-load a moment
        await new Promise((r) => setTimeout(r, 3000))
        await page.screenshot({ path: tmpPath, type: 'png', fullPage: false })

        const raw = await readFile(tmpPath)
        await sharp(raw)
          .resize({ width: 2880, withoutEnlargement: true })
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(finalPath)
        await unlink(tmpPath).catch(() => {})

        console.log(`✓ ${p.slug}: screenshot → public/projekte/screenshots/${p.slug}.png`)
        summary.push({ slug: p.slug, ok: true })
      } catch (err) {
        console.error(`✗ ${p.slug}: ${(err as Error).message}`)
        summary.push({ slug: p.slug, ok: false, note: (err as Error).message })
        // Cleanup any tmp file
        await unlink(tmpPath).catch(() => {})
      } finally {
        await page.close().catch(() => {})
      }
    }
  } finally {
    await browser.close()
  }

  console.log('\n— summary —')
  for (const s of summary) {
    console.log(`${s.ok ? '✓' : '✗'} ${s.slug}${s.note ? ` (${s.note})` : ''}`)
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
