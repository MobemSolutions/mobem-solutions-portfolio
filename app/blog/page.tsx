import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { draftMode } from "next/headers"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPaginatedPosts, getPostCount, getAllCategories, searchPosts, POSTS_PER_PAGE } from "@/lib/sanity"
import { PostCard } from "@/components/blog/PostCard"
import { BlogSearch } from "@/components/blog/BlogSearch"
import { DraftBanner } from "@/components/blog/DraftBanner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Post, Category } from "@/types/blog"
import { cn } from "@/lib/utils"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog – Mobem Solutions",
  description: "Conseils, stratégies et analyses digitales pour les PME et ETI ambitieuses. Par l'équipe Mobem Solutions à Nantes.",
  openGraph: {
    title: "Blog – Mobem Solutions",
    description: "Conseils, stratégies et analyses digitales pour les PME et ETI ambitieuses.",
    url: "https://mobem-solutions.com/blog",
  },
}

interface BlogPageProps {
  searchParams: Promise<{ categorie?: string; page?: string; q?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const { isEnabled: preview } = await draftMode()

  const activeCategory = params.categorie || ""
  const page = Math.max(1, parseInt(params.page || "1", 10))
  const query = params.q?.trim() || ""

  const isSearching = query.length > 0

  const [posts, categories, total] = await Promise.all([
    isSearching
      ? searchPosts(query)
      : getPaginatedPosts({ page, category: activeCategory, preview }),
    getAllCategories(),
    isSearching ? Promise.resolve(0) : getPostCount(activeCategory),
  ])

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)
  const featured = !isSearching && page === 1 && posts.length >= 3 ? posts[0] : null
  const rest: Post[] = featured ? posts.slice(1) : posts

  function pageHref(p: number) {
    const params = new URLSearchParams()
    if (activeCategory) params.set("categorie", activeCategory)
    if (p > 1) params.set("page", String(p))
    const qs = params.toString()
    return `/blog${qs ? `?${qs}` : ""}`
  }

  return (
    <>
      {preview && <DraftBanner />}
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">

        {/* Hero */}
        <section className="py-14 lg:py-20 border-b border-border bg-gradient-to-b from-secondary/40 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
              Le Blog Mobem
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
              Stratégie, Design &{" "}
              <span className="text-accent">Performance digitale</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos analyses, retours d'expérience et conseils concrets pour accélérer votre croissance en ligne.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

          {/* Search */}
          <Suspense>
            <BlogSearch />
          </Suspense>

          {isSearching ? (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                {posts.length} résultat{posts.length !== 1 ? "s" : ""} pour{" "}
                <span className="font-semibold text-foreground">«{query}»</span>
              </p>
              {posts.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  Aucun article ne correspond à votre recherche.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post: Post) => <PostCard key={post._id} post={post} />)}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Category filter */}
              <nav className="flex gap-2 flex-wrap mb-10" aria-label="Filtrer par catégorie">
                <Link
                  href="/blog"
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                    !activeCategory
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Tous les articles
                </Link>
                {categories.map((cat: Category) => (
                  <Link
                    key={cat._id}
                    href={`/blog?categorie=${cat.slug?.current}`}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                      activeCategory === cat.slug?.current
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {cat.title}
                  </Link>
                ))}
              </nav>

              {posts.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  Aucun article dans cette catégorie pour le moment.
                </div>
              ) : (
                <>
                  {featured && (
                    <div className="mb-8">
                      <PostCard post={featured} featured />
                    </div>
                  )}
                  {rest.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rest.map((post: Post) => <PostCard key={post._id} post={post} />)}
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-14">
                  <Link
                    href={pageHref(page - 1)}
                    aria-disabled={page <= 1}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                      page <= 1
                        ? "pointer-events-none opacity-40 border-border text-muted-foreground"
                        : "border-border text-foreground hover:bg-secondary hover:border-accent/40"
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" /> Précédent
                  </Link>

                  <span className="text-sm text-muted-foreground px-2">
                    Page {page} / {totalPages}
                  </span>

                  <Link
                    href={pageHref(page + 1)}
                    aria-disabled={page >= totalPages}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                      page >= totalPages
                        ? "pointer-events-none opacity-40 border-border text-muted-foreground"
                        : "border-border text-foreground hover:bg-secondary hover:border-accent/40"
                    )}
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
