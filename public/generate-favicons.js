/**
 * Twyne Favicon Generator
 *
 * This script generates PNG favicons from the SVG favicon.
 *
 * Prerequisites:
 *   npm install -g sharp-cli
 *   or: npm install sharp
 *
 * Usage:
 *   node public/generate-favicons.js
 *
 * This will generate:
 *   - public/favicon.ico (32x32)
 *   - public/apple-touch-icon.png (180x180)
 *   - public/og-image.png (placeholder 1200x630)
 */

const fs = require('fs')
const path = require('path')

console.log('Twyne Favicon Generator')
console.log('=======================')
console.log('')
console.log('To generate PNG favicons from favicon.svg, use one of these methods:')
console.log('')
console.log('Option 1 — Using sharp (Node.js):')
console.log('  npm install sharp')
console.log('  Then run this script with sharp installed')
console.log('')
console.log('Option 2 — Using Inkscape (CLI):')
console.log('  inkscape public/favicon.svg --export-png=public/favicon-32.png --export-width=32')
console.log('  inkscape public/favicon.svg --export-png=public/apple-touch-icon.png --export-width=180')
console.log('')
console.log('Option 3 — Online converter:')
console.log('  1. Open public/favicon.svg in a browser')
console.log('  2. Use https://convertio.co/svg-ico/ to convert to ICO')
console.log('  3. Use https://svgtopng.com/ for PNG variants')
console.log('')
console.log('The favicon.svg is already configured in app/layout.tsx and will work in modern browsers.')

// Check if sharp is available
try {
  const sharp = require('sharp')
  console.log('')
  console.log('sharp is installed — generating favicons...')

  const svgPath = path.join(__dirname, 'favicon.svg')
  const svgContent = fs.readFileSync(svgPath)

  // Generate favicon-32x32.png
  sharp(svgContent)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, 'favicon-32x32.png'))
    .then(() => console.log('✓ favicon-32x32.png generated'))

  // Generate apple-touch-icon.png (180x180)
  sharp(svgContent)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, 'apple-touch-icon.png'))
    .then(() => console.log('✓ apple-touch-icon.png generated'))

  // Generate og-image placeholder
  sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 17, g: 17, b: 17, alpha: 1 }
    }
  })
    .png()
    .toFile(path.join(__dirname, 'og-image.png'))
    .then(() => console.log('✓ og-image.png generated (placeholder — replace with real design)'))

} catch {
  console.log('(sharp not installed — see instructions above)')
}
