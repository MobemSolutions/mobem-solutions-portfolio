import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  urlFor,
  estimateReadingTime,
} from "@/lib/sanity"
import type { Category, Author } from "@/types/blog"
import { extractToc } from "@/lib/toc"
import { richTextComponents } from "@/components/blog/RichTextComponents"
import { DraftBanner } from "@/components/blog/DraftBanner"
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
    title: `${post.title} – Mobem Solutions`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://mobem-solutions.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

// ── Arrow SVG ──────────────────────────────────────────────────────────────

function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M9 7 H17 V15" />
    </svg>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const post = await getPostBySlug(slug, preview)
  if (!post) notFound()

  const readingTime = estimateReadingTime(post.body || [])
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  const tocItems = extractToc(post.body || [])
  const categoryIds = post.categories?.map((c: { _id: string }) => c._id) ?? []
  const relatedPosts = await getRelatedPosts(slug, categoryIds)

  const authorInitial = post.authors?.[0]?.name?.charAt(0)?.toUpperCase() ?? "M"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author:
      post.authors && post.authors.length > 0
        ? post.authors.map((a: Author) => ({ "@type": "Person", name: a.name }))
        : { "@type": "Organization", name: "Mobem Solutions" },
    publisher: {
      "@type": "Organization",
      name: "Mobem Solutions",
      url: "https://mobem-solutions.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mobem-solutions.com/blog/${slug}`,
    },
    image: post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {preview && <DraftBanner />}
      <Header />

      <article>
        {/* ── Art hero ────────────────────────────────────────────────────── */}
        <div className="pt-14 lg:pt-16 border-t border-border">
          <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-border">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
              aria-label="Fil d'Ariane"
            >
              <Link href="/" className="hover:text-accent transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-accent transition-colors"
              >
                Journal
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">
                {post.title}
              </span>
            </nav>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.categories && post.categories.length > 0 && (
                <Link
                  href={`/blog?categorie=${post.categories[0].slug?.current}`}
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent hover:underline"
                >
                  {post.categories[0].title}
                </Link>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                {readingTime} min de lecture
              </span>
              {publishedDate && (
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  {publishedDate}
                </span>
              )}
            </div>

            {/* H1 */}
            <h1 className="font-bold leading-[0.98] tracking-[-0.035em] text-[clamp(40px,5vw,72px)] mb-6">
              {post.title}
            </h1>

            {/* Lede */}
            {post.excerpt && (
              <p className="text-[22px] leading-[1.45] text-muted-foreground mb-10">
                {post.excerpt}
              </p>
            )}

            {/* Author row */}
            {post.authors && post.authors.length > 0 && (
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-serif text-xl flex-shrink-0">
                  {authorInitial}
                </div>
                <div>
                  <p className="font-semibold text-[15px] tracking-[-0.01em]">
                    {post.authors[0].name}
                  </p>
                  {post.authors[0].role && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {post.authors[0].role}
                    </p>
                  )}
                </div>
                <Link
                  href="/#contact"
                  className="ml-auto inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  Contacter
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Art cover ─────────────────────────────────────────────────────── */}
        <div className="aspect-[16/9] bg-secondary border-b border-border max-h-[520px] overflow-hidden">
          {post.mainImage?.asset && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(post.mainImage).width(1600).height(900).quality(90).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* ── Art body ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-12 px-4 sm:px-6 lg:px-8 py-16 max-w-[1280px] mx-auto">
          {/* TOC aside */}
          {tocItems.length > 0 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24 self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground mb-4">
                  Sommaire
                </p>
                <nav aria-label="Table des matières">
                  <ul className="space-y-2 border-l border-border pl-4">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block font-mono text-[11px] uppercase tracking-[0.04em] transition-colors hover:text-accent ${
                            item.level === 3 ? "pl-3 text-[10px]" : ""
                          } text-muted-foreground`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}

          {/* Prose */}
          <div className="prose-article max-w-[680px] text-[18px] leading-[1.7]">
            {post.body && (
              <PortableText value={post.body} components={richTextComponents} />
            )}

            {/* Author bio at end */}
            {post.authors && post.authors.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                {post.authors.map((author: Author, i: number) => (
                  <div key={i} className="flex gap-4 items-start mb-6 last:mb-0">
                    <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-serif text-xl flex-shrink-0">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-[15px]">
                        {author.name}
                      </p>
                      {author.role && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent mb-1">
                          {author.role}
                        </p>
                      )}
                      {author.bio && (
                        <p className="text-[14px] text-muted-foreground leading-[1.55]">
                          {author.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground mb-4">
                Partager
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mobem-solutions.com/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground hover:text-accent transition-colors"
                >
                  LinkedIn →
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://mobem-solutions.com/blog/${slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground hover:text-accent transition-colors"
                >
                  Twitter →
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <Link
                  href="/#contact"
                  className="block font-mono text-[10px] uppercase tracking-[0.08em] text-accent hover:underline"
                >
                  Démarrer un projet →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* ── Related posts ───────────────────────────────────────────────────── */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
                Lire aussi
              </span>
            </div>
            <Link
              href="/blog"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-accent transition-colors"
            >
              Tous les articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-border">
            {relatedPosts.map((rpost: typeof post) => {
              const rcat = rpost.categories?.[0]?.title ?? "Article"
              const rauthor = rpost.authors?.[0]?.name ?? "Mobem Solutions"
              const rmins = estimateReadingTime(rpost.body || [])
              return (
                <Link
                  key={rpost._id}
                  href={`/blog/${rpost.slug?.current}`}
                  className="group bento-hover p-7 border-r border-b border-border flex flex-col gap-4 transition-colors"
                  data-cursor="hover"
                >
                  <div className="aspect-[4/3] bg-secondary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                    {rcat}
                  </span>
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em] leading-[1.2]">
                    {rpost.title}
                  </h3>
                  <div className="flex justify-between font-mono text-[11px] text-muted-foreground mt-auto">
                    <span>{rauthor}</span>
                    <span>{rmins} min</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Newsletter ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-background/50 mb-3">
              Newsletter mensuelle
            </div>
            <h2 className="text-[clamp(24px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.03em] mb-2">
              Un article par mois,{" "}
              <em className="font-serif font-normal italic text-accent">sans bruit.</em>
            </h2>
            <p className="text-[15px] leading-[1.55] text-background/60 max-w-[480px]">
              Rejoignez les dirigeants qui lisent notre bulletin mensuel : trois constats terrain, deux outils, une question.
            </p>
          </div>
          <Link
            href="/blog#newsletter"
            className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground font-medium text-[14px] hover:bg-background hover:text-foreground transition-colors whitespace-nowrap"
            data-cursor="hover"
          >
            S&apos;abonner{" "}
            <ArrowDiag />
          </Link>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
          Passons à l&apos;action
        </div>
        <h2 className="mx-auto mb-6 max-w-[720px] text-[clamp(36px,4vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
          Cet article vous a{" "}
          <em className="font-serif font-normal italic text-accent">
            inspiré ?
          </em>
        </h2>
        <p className="mx-auto mb-8 max-w-[480px] text-[18px] leading-[1.55] text-muted-foreground">
          Discutons de comment appliquer ces stratégies à votre activité.
          Diagnostic gratuit, sans engagement.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] hover:bg-foreground hover:text-background transition-colors"
        >
          Lancer mon projet{" "}
          <ArrowDiag />
        </Link>
      </section>

      <Footer />
    </>
  )
}
