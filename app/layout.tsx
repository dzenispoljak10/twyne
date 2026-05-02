import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import ScrollObserver from '@/components/ScrollObserver'
import FloatingCta from '@/components/FloatingCta'
import CookieBanner from '@/components/public/CookieBanner'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#13328D',
}

export const metadata: Metadata = {
  title: {
    default: 'Twyne — Digitalagentur Schweiz | Webseiten, Apps, SEO',
    template: '%s | Twyne',
  },
  description: 'Twyne — Ihre Digitalagentur in der Schweiz. Webseiten, Webapplikationen, SEO und KI-Beratung für Schweizer KMU. Kostenlose Erstberatung.',
  keywords: ['Digitalagentur Schweiz', 'Webdesign Schweiz', 'Webentwicklung Schweiz', 'SEO Agentur Schweiz', 'KI-Beratung Schweiz', 'Webseite erstellen lassen Schweiz', 'Digitalagentur KMU'],
  authors: [{ name: 'Twyne', url: 'https://twyne.ch' }],
  creator: 'Twyne',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://twyne.ch'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://twyne.ch',
    siteName: 'Twyne',
    title: 'Twyne — Digitalagentur Schweiz',
    description: 'Webseiten, Webapplikationen, SEO und KI-Beratung für Schweizer KMU.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Twyne — Digitalagentur Schweiz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twyne — Digitalagentur Schweiz',
    description: 'Webseiten, Webapplikationen, SEO und KI-Beratung für Schweizer KMU.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Twyne',
  url: 'https://twyne.ch',
  email: 'info@twyne.ch',
  description: 'Digitalagentur für Schweizer Unternehmen — Webseiten, Webapplikationen, Software, KI-Beratung & SEO.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Galliweg 3',
    postalCode: '4852',
    addressLocality: 'Rothrist',
    addressCountry: 'CH',
  },
  areaServed: 'CH',
  serviceType: [
    'Webdesign',
    'Webentwicklung',
    'SEO',
    'KI-Beratung',
    'Softwareentwicklung',
    'Digitale Transformation',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={manrope.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <ScrollObserver />
        {children}
        <FloatingCta />
        <CookieBanner />
      </body>
    </html>
  )
}
