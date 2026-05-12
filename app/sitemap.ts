import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllRealisationSlugs } from '@/lib/sanity'
import { ALL_METIERS, ALL_VILLES } from '@/lib/seo-data'

const BASE_URL = 'https://mobem-solutions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, realisationSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllRealisationSlugs(),
  ])

  const posts: MetadataRoute.Sitemap = slugs.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const metierPages: MetadataRoute.Sitemap = ALL_METIERS.map((m) => ({
    url: `${BASE_URL}/metiers/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const villePages: MetadataRoute.Sitemap = ALL_VILLES.map((v) => ({
    url: `${BASE_URL}/villes/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const metierVillePages: MetadataRoute.Sitemap = ALL_METIERS.flatMap((m) =>
    ALL_VILLES.map((v) => ({
      url: `${BASE_URL}/metiers/${m.slug}/${v.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  const realisationPages: MetadataRoute.Sitemap = realisationSlugs.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/realisations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/methode`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/realisations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/metiers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/villes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/plan-du-site`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    ...metierPages,
    ...villePages,
    ...posts,
    ...realisationPages,
    ...metierVillePages,
  ]
}
