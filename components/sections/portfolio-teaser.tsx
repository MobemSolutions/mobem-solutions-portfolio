"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/projects"

const teaserProjects = projects.filter((p) => p.featured).slice(0, 4)

const HOVER_COLORS = [
  "bg-accent",
  "bg-[#00C9A7]",
  "bg-[#A78BFA]",
  "bg-accent/70",
]

export function PortfolioTeaser() {
  return (
    <section id="realisations" className="border-t border-border" aria-labelledby="portfolio-teaser-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-7 border-b border-border">
        <div className="flex items-baseline gap-5">
          <h2 id="portfolio-teaser-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
            Réalisations
          </h2>
          <span className="hidden lg:block w-8 h-px bg-accent self-center" aria-hidden="true" />
        </div>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          Sélection 2025&thinsp;/&thinsp;2026
        </span>
      </div>

      {/* Project rows */}
      {teaserProjects.map((project, i) => (
        <Link
          key={project.id}
          href={`/realisations/${project.slug}`}
          aria-label={`Voir le projet ${project.title}`}
          className="group relative flex items-center gap-4 lg:grid lg:grid-cols-12 px-4 sm:px-6 lg:px-8 py-9 lg:py-11 border-b border-border overflow-hidden bento-hover"
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
          </div>

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
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-7">
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
      </div>
    </section>
  )
}
