import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, urlFor, estimateReadingTime } from "@/lib/sanity"
import type { Category, Author } from "@/types/blog"
import { extractToc } from "@/lib/toc"
import { richTextComponents } from "@/components/blog/RichTextComponents"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import { DraftBanner } from "@/components/blog/DraftBanner"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { NewsletterInline } from "@/components/blog/NewsletterInline"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { ShareButtons } from "@/components/blog/ShareButtons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ slug }: { slug: string }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title: `${post.title} – Blog Mobem Solutions`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://mobem-solutions.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const post = await getPostBySlug(slug, preview)
  if (!post) notFound()

  const readingTime = estimateReadingTime(post.body || [])
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null

  const tocItems = extractToc(post.body || [])
  const categoryIds = post.categories?.map((c: { _id: string }) => c._id) ?? []
  const relatedPosts = await getRelatedPosts(slug, categoryIds)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.authors && post.authors.length > 0
      ? post.authors.map((a: Author) => ({ "@type": "Person", name: a.name }))
      : { "@type": "Organization", name: "Mobem Solutions" },
    publisher: {
      "@type": "Organization",
      name: "Mobem Solutions",
      url: "https://mobem-solutions.com",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://mobem-solutions.com/blog/${slug}` },
    image: post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {preview && <DraftBanner />}
      <ReadingProgress />
      <Header />

      <main className="min-h-screen pt-16 lg:pt-20">

        {/* Cover */}
        {post.mainImage?.asset && (
          <div className="relative w-full aspect-[21/9] max-h-[520px] overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1600).height(686).quality(90).url()}
              alt={post.mainImage.alt || post.title}
              fill
              priority
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
        )}

        {/* Article layout */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">

            {/* Main content */}
            <article className="py-10 lg:py-12 max-w-3xl">

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour au blog
              </Link>

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat: Category) => (
                    <Link
                      key={cat._id}
                      href={`/blog?categorie=${cat.slug?.current}`}
                      className="text-xs font-semibold bg-accent/15 text-accent px-3 py-1 rounded-full hover:bg-accent/25 transition-colors"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 mb-8 border-b border-border">
                {post.authors && post.authors.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" aria-hidden="true" />
                    {post.authors.map((a: Author) => a.name).join(' & ')}
                    {post.authors.length === 1 && post.authors[0].role && (
                      <span className="text-xs">· {post.authors[0].role}</span>
                    )}
                  </span>
                )}
                {publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {publishedDate}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {readingTime} min de lecture
                </span>
              </div>

              {post.body && (
                <div className="prose-article">
                  <PortableText value={post.body} components={richTextComponents} />
                </div>
              )}

              <ShareButtons title={post.title} slug={slug} />

              <NewsletterInline />

              {post.authors && post.authors.length > 0 && (
                <div className="mt-4 pt-8 border-t border-border space-y-6">
                  {post.authors.map((author: Author, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      {author.image?.asset && (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={urlFor(author.image).width(112).height(112).url()}
                            alt={author.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{author.name}</p>
                        {author.role && <p className="text-xs text-accent mb-1">{author.role}</p>}
                        {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="lg:hidden mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <p className="font-bold text-foreground text-base mb-2">Vous avez un projet ?</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Obtenez un audit gratuit de votre présence digitale en 15 minutes.
                </p>
                <Link
                  href="/#contact"
                  className="block text-center bg-accent text-accent-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
                >
                  Prendre rendez-vous →
                </Link>
              </div>

            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block py-12">
              <div className="sticky top-24 space-y-8">

                {tocItems.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <TableOfContents items={tocItems} />
                  </div>
                )}

                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <p className="font-bold text-foreground text-base mb-2">Vous avez un projet ?</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Obtenez un audit gratuit de votre présence digitale en 15 minutes.
                  </p>
                  <Link
                    href="/#contact"
                    className="block text-center bg-accent text-accent-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
                  >
                    Prendre rendez-vous →
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>

        <RelatedPosts posts={relatedPosts} />

        {/* Bottom CTA */}
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Passons à l'action</h2>
            <p className="text-muted-foreground mb-6">
              Cet article vous a inspiré ? Discutons de comment appliquer ces stratégies à votre business.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
            >
              Lancer mon projet →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
