import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { draftMode } from "next/headers"
import {
  getPaginatedPosts,
  getPostCount,
  getAllCategories,
  estimateReadingTime,
  urlFor,
  projectId,
} from "@/lib/sanity"
import { DraftBanner } from "@/components/blog/DraftBanner"
import { NewsletterWidget } from "@/components/blog/NewsletterWidget"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Post, Category } from "@/types/blog"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Le Journal – Mobem Solutions",
  description:
    "Conseils, stratégies et analyses digitales pour les PME et ETI ambitieuses. Par l'équipe Mobem Solutions à Nantes.",
  openGraph: {
    title: "Le Journal – Mobem Solutions",
    description:
      "Conseils, stratégies et analyses digitales pour les PME et ETI ambitieuses.",
    url: "https://mobem-solutions.com/blog",
  },
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

// ── Article row ────────────────────────────────────────────────────────────

function ArticleRow({ post }: { post: Post }) {
  const readTime = estimateReadingTime(post.body || [])
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""
  const shortDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : ""

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="group bento-hover grid grid-cols-[1fr_40px] sm:grid-cols-[1fr_120px_40px] items-center gap-4 sm:gap-6 px-4 sm:px-6 py-5 border-b border-border transition-colors"
      data-cursor="hover"
    >
      <div className="min-w-0">
        <span className="text-[10px] uppercase tracking-[0.08em] text-accent">
          {post.categories?.[0]?.title ?? "Article"} · {readTime} min
        </span>
        <h3 className="mt-1 text-[17px] sm:text-[20px] font-semibold tracking-[-0.02em] leading-[1.2] truncate sm:whitespace-normal">
          {post.title}
        </h3>
        <p className="mt-0.5 text-[12px] sm:text-[13px] text-muted-foreground group-hover:text-background/60 transition-colors">
          {post.authors?.[0]?.name ?? "Mobem Solutions"} · {date}
        </p>
      </div>
      <span className="text-[11px] text-foreground/60 group-hover:text-background/60 hidden sm:block transition-colors">
        {shortDate}
      </span>
      <div className="flex justify-end">
        <ArrowDiag className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all" />
      </div>
    </Link>
  )
}

// ── Article grid card ──────────────────────────────────────────────────────

function ArticleCard({ post }: { post: Post }) {
  const readTime = estimateReadingTime(post.body || [])
  const cat = post.categories?.[0]?.title ?? "Article"
  const author = post.authors?.[0]?.name ?? "Mobem Solutions"
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : ""

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="group bento-hover border-r border-b border-border flex flex-col gap-4 p-8 transition-colors"
      data-cursor="hover"
    >
      <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
        {projectId && post.mainImage?.asset && (
          <Image
            src={urlFor(post.mainImage).width(600).height(450).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
          {cat}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60 transition-colors">
          {readTime} min
        </span>
      </div>
      <h3 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.2]">
        {post.title}
      </h3>
      <p className="text-[13px] leading-[1.55] text-muted-foreground group-hover:text-background/60 flex-1 transition-colors">
        {post.excerpt}
      </p>
      <div className="font-mono text-[11px] text-muted-foreground group-hover:text-background/60 pt-3 border-t border-border flex justify-between mt-auto transition-colors">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </Link>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

interface BlogPageProps {
  searchParams: Promise<{ categorie?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const { isEnabled: preview } = await draftMode()

  const activeCategory = params.categorie || ""
  const page = Math.max(1, parseInt(params.page || "1", 10))

  const [posts, categories] = await Promise.all([
    getPaginatedPosts({ page, category: activeCategory, preview }),
    getAllCategories(),
  ])

  const featured: Post | null =
    !activeCategory && page === 1 && posts.length > 0 ? posts[0] : null
  const topList: Post[] = posts.slice(1, 5)
  const gridArticles: Post[] = posts

  return (
    <>
      {preview && <DraftBanner />}
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
            <nav
              className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
              aria-label="Fil d'Ariane"
            >
              <Link href="/" className="hover:text-accent transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-foreground">Journal</span>
            </nav>
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6">
              Le journal{" "}
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                du cabinet.
              </em>
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px] text-muted-foreground">
              Analyses terrain, retours d&apos;expérience et stratégies concrètes pour
              les PME et ETI ambitieuses. Rédigé par nos consultants.
            </p>
          </div>
        </section>

        {/* ── Filters ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-wrap px-4 sm:px-6 lg:px-8 py-5 border-t border-b border-border overflow-x-auto">
          <Link
            href="/blog"
            className={`font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2 border border-border transition-colors whitespace-nowrap ${
              !activeCategory
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            Tous
          </Link>
          {(categories as Category[]).map((cat) => (
            <Link
              key={cat._id}
              href={`/blog?categorie=${cat.slug?.current}`}
              className={`font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2 border border-border transition-colors whitespace-nowrap ${
                activeCategory === cat.slug?.current
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground hover:text-foreground hover:border-foreground"
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="px-4 sm:px-6 lg:px-8 py-24 text-center text-muted-foreground font-mono text-[13px] uppercase tracking-[0.08em]">
            Aucun article pour le moment.
          </div>
        ) : (
          <>
            {/* ── Section head 01 ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
              <div className="flex items-baseline gap-6">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">
                  À la une
                </h2>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
                Édition 04 · 2026
              </span>
            </div>

            {/* ── Featured + top list ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] border-b border-border">
              {/* Featured article */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug?.current}`}
                  className="group flex flex-col gap-6 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border hover:bg-[rgba(230,48,48,0.04)] transition-colors"
                  data-cursor="hover"
                >
                  <div className="aspect-[16/9] bg-secondary relative overflow-hidden">
                    {projectId && featured.mainImage?.asset && (
                      <Image
                        src={urlFor(featured.mainImage).width(900).height(506).url()}
                        alt={featured.mainImage.alt || featured.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                      />
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                      {featured.categories?.[0]?.title ?? "À la une"} ·{" "}
                      {estimateReadingTime(featured.body || [])} min
                    </span>
                    <h2 className="mt-3 text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.05] tracking-[-0.03em]">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-3 text-[15px] leading-[1.55] text-muted-foreground max-w-[560px]">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-4 text-[13px] text-muted-foreground">
                      <span>
                        {featured.authors?.[0]?.name ?? "Mobem Solutions"}
                      </span>
                      {featured.publishedAt && (
                        <>
                          <span>·</span>
                          <span>
                            {new Date(featured.publishedAt).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {/* Top list */}
              <div className="flex flex-col">
                {topList.map((post, i) => (
                  <ArticleRow
                    key={post._id}
                    post={post}
                  />
                ))}
                {topList.length === 0 && featured && (
                  <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground font-mono text-[11px] uppercase tracking-[0.08em]">
                    Plus d&apos;articles à venir
                  </div>
                )}
              </div>
            </div>

            {/* ── Section head 02 ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
              <div className="flex items-baseline gap-6">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">
                  Tous les articles
                </h2>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
                {posts.length} article{posts.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* ── Grid articles ────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
              {gridArticles.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}

        {/* ── Newsletter ───────────────────────────────────────────────────── */}
        <section id="newsletter" className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
              Newsletter
            </div>
            <h2 className="mb-4 text-[clamp(36px,4vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
              Nos articles,{" "}
              <em className="font-serif font-normal italic text-accent">
                chez vous.
              </em>
            </h2>
            <p className="text-[16px] leading-[1.55] text-muted-foreground max-w-[480px]">
              Chaque mois, nos nouveaux articles directement dans votre boîte
              mail. Zéro spam, désabonnement en un clic.
            </p>
          </div>
          <NewsletterWidget />
        </section>
      </main>
      <Footer />
    </>
  )
}
