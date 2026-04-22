"use client"

import { useState, useMemo } from "react"
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { projects, COLOR_SCHEMES } from "@/lib/projects"

const categories = [
  { id: "all", label: "Tous les projets" },
  { id: "vitrine", label: "Site vitrine" },
  { id: "refonte", label: "Refonte digitale" },
  { id: "b2b", label: "Stratégie B2B" },
]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.client.sector.toLowerCase().includes(q) ||
          p.client.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [activeCategory, search])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

      {/* Page header */}
      <div className="mb-12">
        <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
          Nos réalisations
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            <span className="text-balance">
              Toutes nos{" "}
              <span className="text-accent">études de cas</span>
            </span>
          </h1>
          <p className="text-base text-muted-foreground max-w-sm lg:text-right leading-relaxed">
            Sites vitrines, refontes digitales et stratégies B2B —
            nos solutions sectorielles haute-performance.
          </p>
        </div>
      </div>

      {/* Search + Filters bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un projet, secteur, technologie…"
            className={cn(
              "w-full rounded-full border border-border bg-background pl-9 pr-9 py-2 text-sm",
              "placeholder:text-muted-foreground outline-none",
              "focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            )}
            aria-label="Rechercher dans les réalisations"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Effacer la recherche"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrer par catégorie"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeCategory !== "all") && (
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} projet{filtered.length !== 1 ? "s" : ""}
          {search ? ` pour « ${search} »` : ""}
          {activeCategory !== "all" ? ` · ${categories.find(c => c.id === activeCategory)?.label}` : ""}
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          role="tabpanel"
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6"
        >
          {filtered.map((project) => {
            const scheme = COLOR_SCHEMES[project.colorScheme as keyof typeof COLOR_SCHEMES]
            return (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className={cn(
                  "group relative bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden",
                  "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                )}
                aria-label={`Voir le projet ${project.title} — ${project.client.name}`}
              >
                {/* Visual area */}
                <div className={cn(
                  "relative aspect-[4/3] bg-gradient-to-br overflow-hidden",
                  scheme.cardGradient
                )}>
                  {project.images?.home ? (
                    <div className="absolute inset-3 md:inset-5 rounded-lg md:rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={project.images.home}
                        alt={project.title}
                        fill
                        className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-3 md:inset-5 rounded-lg md:rounded-xl bg-card shadow-lg overflow-hidden border border-border/40">
                      <div className="h-5 md:h-6 bg-muted/80 flex items-center px-2 gap-1 border-b border-border/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/40" />
                        <div className="flex-1 mx-2 h-1.5 rounded-full bg-muted" />
                      </div>
                      <div className="p-2 md:p-3 space-y-1.5 md:space-y-2">
                        <div className={cn("h-10 md:h-16 rounded-lg bg-gradient-to-br", scheme.mockupBg)} />
                        <div className="h-1.5 md:h-2 rounded-full bg-muted w-3/4" />
                        <div className="h-1.5 md:h-2 rounded-full bg-muted w-1/2" />
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-background font-medium flex items-center gap-1.5 text-xs md:text-sm">
                      Voir l'étude
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className={cn("text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full uppercase tracking-tighter", scheme.badge)}>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Metric badge */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <span className="text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full bg-foreground text-background">
                      {project.heroMetric}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-3 md:p-5">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-muted-foreground tracking-tight leading-tight">{project.client.sector}</span>
                    <span className="text-[9px] md:text-[10px] text-muted-foreground shrink-0">{project.year}</span>
                  </div>
                  <h3 className={cn(
                    "text-xs md:text-base font-bold text-foreground transition-colors leading-snug",
                    "group-hover:text-accent"
                  )}>
                    {project.title}
                  </h3>
                  <p className="hidden md:block text-xs text-muted-foreground mt-2 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="hidden md:flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
            <Search className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Aucun projet trouvé</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Essayez un autre terme ou une autre catégorie.
            </p>
          </div>
          <button
            onClick={() => { setSearch(""); setActiveCategory("all") }}
            className="text-sm text-accent hover:underline font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Bottom CTA */}
      {filtered.length > 0 && (
        <div className="text-center mt-14">
          <p className="text-sm text-muted-foreground mb-4">
            Vous avez un projet dans un autre secteur ?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
          >
            <Link href="/#contact">
              Parlons de votre projet
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
