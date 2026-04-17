import type { MetadataRoute } from 'next'

const BASE = 'https://twyne.ch'

const now = new Date()

const staticRoutes: MetadataRoute.Sitemap = [
  // Core
  { url: BASE,                                   lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/anfrage`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/ueber-uns`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/kontakt`,                      lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },

  // Leistungen
  { url: `${BASE}/leistungen`,                             lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/leistungen/webseiten`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/webapplikationen`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/software`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/cms`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/ki-beratung`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/digitale-transformation`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/seo`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/leistungen/lokales-seo`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/technisches-seo`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/seo-audit`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/email-marketing`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/google-ads`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/social-media`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/leistungen/content-marketing`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

  // Branchen
  { url: `${BASE}/branchen`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/branchen/restaurants`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/branchen/kmu`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/branchen/vereine`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/branchen/startups`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/branchen/handwerker`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/branchen/arztpraxen`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

  // Produkte
  { url: `${BASE}/produkte`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/produkte/club`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/produkte/table`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/produkte/desk`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/produkte/flow`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

  // Blog & Portfolio
  { url: `${BASE}/blog`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE}/portfolio`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/kurse`,             lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

  // Blog posts (statisch)
  { url: `${BASE}/blog/ki-beratung-kmu-schweiz`,      lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE}/blog/next-js-vs-wordpress-2025`,    lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE}/blog/seo-technische-grundlagen`,    lastModified: now, changeFrequency: 'yearly', priority: 0.5 },

  // Legal
  { url: `${BASE}/impressum`,    lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE}/datenschutz`,  lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return staticRoutes
}
