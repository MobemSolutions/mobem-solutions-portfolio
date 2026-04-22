export type Category = {
  _id: string
  title: string
  slug: { current: string }
}

export type Author = {
  name: string
  role?: string
  bio?: string
  image?: any
}

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: { asset: any; alt: string }
  excerpt?: string
  publishedAt?: string
  authors?: Author[]
  categories?: Category[]
  body?: any[]
}
