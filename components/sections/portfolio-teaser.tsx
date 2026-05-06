"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
<<<<<<< HEAD
import { projects, COLOR_SCHEMES } from "@/lib/projects"
=======
import { projects } from "@/lib/projects"
>>>>>>> 38f194d (maj)

const teaserProjects = projects.filter((p) => p.featured).slice(0, 4)

const HOVER_COLORS = [
  "bg-accent",
  "bg-[#00C9A7]",
  "bg-[#A78BFA]",
  "bg-accent/70",
]

export function PortfolioTeaser() {
  return (
<<<<<<< HEAD
    <section
      id="realisations"
      className="py-20 lg:py-32 bg-secondary/30"
      aria-labelledby="portfolio-teaser-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header - Swiss typography */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Realisations
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="portfolio-teaser-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
            >
              Nos solutions
              <br />
              <span className="text-accent">sectorielles.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-sm lg:text-right">
              Architectures haute-performance et solutions metier sur mesure.
            </p>
=======
    <section id="realisations" className="border-t border-border" aria-labelledby="portfolio-teaser-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-5">
          <h2 id="portfolio-teaser-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
            Réalisations
          </h2>
        </div>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          Sélection 2025 / 2026
        </span>
      </div>

      {/* Project rows */}
      {teaserProjects.map((project, i) => (
        <Link
          key={project.id}
          href={`/realisations/${project.slug}`}
          aria-label={`Voir le projet ${project.title}`}
          className="group relative flex items-center gap-4 lg:grid lg:grid-cols-12 px-4 sm:px-6 lg:px-8 py-7 lg:py-9 border-b border-border overflow-hidden bento-hover"
        >
          {/* Hover circle */}
          <div
            className={cn(
              "absolute right-16 lg:right-24 top-1/2 -translate-y-1/2 w-20 h-20 lg:w-28 lg:h-28 rounded-full pointer-events-none",
              "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out",
              HOVER_COLORS[i % HOVER_COLORS.length]
            )}
            aria-hidden="true"
          />

          <span className="shrink-0 lg:col-span-1 font-mono text-[11px] text-foreground/60 transition-colors">
            0{i + 1}
          </span>

          <div className="flex-1 lg:col-span-5 text-[24px] sm:text-[30px] lg:text-[36px] font-bold tracking-[-0.025em] leading-none">
            {project.client.name}
>>>>>>> 38f194d (maj)
          </div>

<<<<<<< HEAD
        {/* Projects Grid - Swiss bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {teaserProjects.map((project) => {
            const scheme = COLOR_SCHEMES[project.colorScheme as keyof typeof COLOR_SCHEMES]
            return (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className="group bg-card flex flex-col"
                aria-label={`Voir le projet ${project.title}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                  {project.images?.home ? (
                    <Image
                      src={project.images.home}
                      alt={project.title}
                      fill
                      className="object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-muted-foreground/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/80 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-background font-semibold flex items-center gap-2 text-sm">
                      Voir l&apos;etude
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-1">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Metric Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-white px-2 py-1">
                      {project.heroMetric}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {project.client.sector}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] text-muted-foreground border border-border px-2 py-0.5"
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

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            Voir toutes nos realisations
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-semibold hover:border-foreground transition-colors"
          >
            Parlons de votre projet
          </Link>
        </div>
=======
          <div className="hidden lg:block lg:col-span-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors">
            {project.client.sector}
          </div>

          <div className="hidden lg:block lg:col-span-2 text-[13px] text-foreground/60 transition-colors">
            {project.tags[0]}
          </div>

          <div className="hidden lg:flex lg:col-span-1 items-center">
            <span className="text-[13px] font-semibold text-accent">
              {project.heroMetric}
            </span>
          </div>

          <div className="shrink-0 lg:col-span-1 flex justify-end">
            <ArrowRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </div>
        </Link>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Toutes les réalisations
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          {projects.filter((p) => p.featured).length} projets
        </span>
>>>>>>> 38f194d (maj)
      </div>
    </section>
  )
}
