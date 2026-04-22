import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/sanity'

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
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...posts,
  ]
}
