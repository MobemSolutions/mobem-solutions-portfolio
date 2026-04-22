import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)

// ── Queries ────────────────────────────────────────────────────────────────

export const POSTS_PER_PAGE = 9

const POST_FIELDS = `
  _id,
  title,
  slug,
  mainImage { asset, alt },
  excerpt,
  publishedAt,
  "authors": authors[]->{ name, image, role, bio },
  "categories": categories[]->{ _id, title, slug },
  body
`

export async function getAllPosts(preview = false) {
  const c = preview ? previewClient : client
  return c.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${POST_FIELDS} }`,
    {},
    preview ? {} : { next: { revalidate: 60 } }
  )
}

export async function getPaginatedPosts(opts: {
  page?: number
  category?: string
  preview?: boolean
}) {
  const { page = 1, category = '', preview = false } = opts
  const c = preview ? previewClient : client
  const from = (page - 1) * POSTS_PER_PAGE
  const to = from + POSTS_PER_PAGE
  return c.fetch(
    `*[_type == "post" && defined(slug.current) && ($category == "" || $category in categories[]->slug.current)] | order(publishedAt desc) [$from...$to] { ${POST_FIELDS} }`,
    { category, from, to },
    preview ? {} : { next: { revalidate: 60 } }
  )
}

export async function getPostCount(category = '') {
  return client.fetch(
    `count(*[_type == "post" && defined(slug.current) && ($category == "" || $category in categories[]->slug.current)])`,
    { category },
    { next: { revalidate: 60 } }
  )
}

export async function searchPosts(query: string) {
  const q = `*${query}*`
  return client.fetch(
    `*[_type == "post" && defined(slug.current) && (title match $q || excerpt match $q)] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { q },
    { next: { revalidate: 60 } }
  )
}

export async function getPostBySlug(slug: string, preview = false) {
  const c = preview ? previewClient : client
  return c.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage { asset, alt },
      excerpt,
      publishedAt,
      "authors": authors[]->{ name, image, role, bio },
      "categories": categories[]->{ _id, title, slug },
      body
    }`,
    { slug },
    preview ? {} : { next: { revalidate: 60 } }
  )
}

export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getAllPostSlugs() {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getRelatedPosts(currentSlug: string, categoryIds: string[]) {
  return client.fetch(
    `*[_type == "post" && slug.current != $currentSlug && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      mainImage { asset, alt },
      excerpt,
      publishedAt,
      "author": author->{ name },
      "categories": categories[]->{ _id, title, slug },
      body
    }`,
    { currentSlug, categoryIds },
    { next: { revalidate: 60 } }
  )
}

// ── Utilities ──────────────────────────────────────────────────────────────

export function estimateReadingTime(body: unknown[]): number {
  if (!body) return 1
  const text = body
    .flatMap((block: any) =>
      block._type === 'block' && Array.isArray(block.children)
        ? block.children.map((child: any) => child.text || '')
        : []
    )
    .join(' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}
