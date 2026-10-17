import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/sanity'
import { TRADES } from '@/lib/automation-content'

const BASE_URL = 'https://mobem-solutions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs()

  const posts: MetadataRoute.Sitemap = slugs.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/methode`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/metiers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...TRADES.map((t) => ({ url: `${BASE_URL}${t.href}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.95 })),
    ...posts,
  ]
}
