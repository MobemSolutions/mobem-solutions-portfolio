"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
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

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="realisations"
      className="py-24 lg:py-32"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Nos réalisations
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            >
              <span className="text-balance">
                Nos solutions{" "}
                <span className="text-accent">sectorielles</span>
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-sm lg:text-right leading-relaxed">
              Découvrez comment nous résolvons les problématiques métier complexes à travers nos études de cas sectorielles et nos architectures haute-performance.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filtrer les réalisations par catégorie"
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

        {/* Projects Grid */}
        <div
          role="tabpanel"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {filteredProjects.map((project) => {
            const scheme = COLOR_SCHEMES[project.colorScheme as keyof typeof COLOR_SCHEMES]
            return (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className={cn(
                  "group relative bg-card rounded-2xl border border-border overflow-hidden",
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
                    /* Vraie image — pas de chrome navigateur */
                    <div className="absolute inset-5 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={project.images.home}
                        alt={project.title}
                        fill
                        className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    /* Mockup skeleton pour les projets sans image */
                    <div className="absolute inset-5 rounded-xl bg-card shadow-lg overflow-hidden border border-border/40">
                      <div className="h-6 bg-muted/80 flex items-center px-2.5 gap-1 border-b border-border/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/40" />
                        <div className="flex-1 mx-2 h-2 rounded-full bg-muted" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className={cn("h-16 rounded-lg bg-gradient-to-br", scheme.mockupBg)} />
                        <div className="h-2 rounded-full bg-muted w-3/4" />
                        <div className="h-2 rounded-full bg-muted w-1/2" />
                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          <div className="h-8 rounded bg-muted/50" />
                          <div className="h-8 rounded bg-muted/50" />
                          <div className="h-8 rounded bg-muted/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-background font-medium flex items-center gap-2 text-sm">
                      Voir l'étude de cas
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter", scheme.badge)}>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Metric badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-foreground text-background">
                      {project.heroMetric}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tight">{project.client.sector}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{project.year}</span>
                  </div>

                  <h3 className={cn(
                    "text-base font-bold text-foreground mb-2 transition-colors",
                    "group-hover:text-accent"
                  )}>
                    {project.title}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-sm text-muted-foreground mb-4">
            Vous avez un projet dans un autre secteur ?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
          >
            <Link href="#contact">
              Parlons de votre projet
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}