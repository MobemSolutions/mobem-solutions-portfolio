import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/studio/', '/opengraph-image'],
      },
    ],
    sitemap: 'https://mobem-solutions.com/sitemap.xml',
    host: 'https://mobem-solutions.com',
  }
}
