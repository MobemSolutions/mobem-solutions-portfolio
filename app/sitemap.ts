import type { MetadataRoute } from 'next'
import { TRADES } from '@/lib/automation-content'

const BASE_URL = 'https://mobem-solutions.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/methode`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/metiers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...TRADES.map((t) => ({ url: `${BASE_URL}${t.href}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 })),
  ]
}
