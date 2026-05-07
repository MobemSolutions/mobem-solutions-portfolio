"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X, ArrowRight } from "lucide-react"
import { REGIONS, TOP_METIERS } from "@/lib/seo-data"
import type { Ville } from "@/lib/seo-data"

function PinIcon() {
  return (
    <svg className="text-accent flex-shrink-0" width="14" height="18" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 19s6-7.5 6-12A6 6 0 1 0 2 7c0 4.5 6 12 6 12z" />
      <circle cx="8" cy="7" r="2" />
    </svg>
  )
}

function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
    </svg>
  )
}

function VilleCard({ ville }: { ville: Ville }) {
  return (
    <Link
      href={`/villes/${ville.slug}`}
      className="group bento-hover w-[260px] lg:w-auto flex flex-col gap-3.5 p-7 border-r border-b border-foreground/10 dark:border-foreground/15 min-h-[220px] transition-colors"
      data-cursor="hover"
    >
      <div className="flex items-center gap-2.5">
        <PinIcon />
        <h3 className="text-[20px] font-bold tracking-[-0.025em]">{ville.label}</h3>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-accent">
        {ville.departement} — {ville.population}
      </div>
      <div className="flex flex-wrap gap-1.5 items-center mt-auto" aria-hidden="true">
        {TOP_METIERS.slice(0, 5).map((m) => (
          <span key={m.slug} className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-accent tracking-[0.04em] uppercase whitespace-nowrap">
            {m.label}
          </span>
        ))}
        <span className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-muted-foreground group-hover:text-background/60 tracking-[0.04em] uppercase whitespace-nowrap transition-colors">
          +36 métiers
        </span>
      </div>
    </Link>
  )
}

export function VillesCatalog({ totalVilles }: { totalVilles: number }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return REGIONS
    const q = query.toLowerCase()
    return REGIONS
      .map((r) => ({
        ...r,
        villes: r.villes.filter((v) =>
          v.label.toLowerCase().includes(q) ||
          v.departement.toLowerCase().includes(q) ||
          v.codePostal.includes(q)
        ),
      }))
      .filter((r) => r.villes.length > 0)
  }, [query])

  const totalResults = filtered.reduce((acc, r) => acc + r.villes.length, 0)

  return (
    <>
      {/* Search bar */}
      <div className="sticky top-14 lg:top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher une ville… Paris, Lyon, Nantes…"
              className="w-full pl-11 pr-10 py-2.5 bg-secondary border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
              aria-label="Rechercher une ville"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {query && (
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground whitespace-nowrap">
              {totalResults} ville{totalResults > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Regions */}
      {filtered.length === 0 ? (
        <div className="px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-[18px] text-muted-foreground mb-4">Aucune ville pour « {query} »</p>
          <button onClick={() => setQuery("")} className="text-accent font-mono text-[12px] uppercase tracking-[0.06em] hover:underline">
            Voir toutes les villes
          </button>
        </div>
      ) : (
        filtered.map((region) => (
          <section key={region.label} className="border-t border-border">
            <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-baseline gap-4 border-b border-border">
              <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-[-0.03em] leading-none">
                {region.label}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {region.villes.length} ville{region.villes.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Desktop: grid | Mobile: horizontal scroll */}
            <div className="overflow-x-auto lg:overflow-visible scrollbar-none">
              <div className="flex lg:grid lg:grid-cols-3 border-t border-l border-foreground/10 dark:border-foreground/15 min-w-max lg:min-w-0">
                {region.villes.map((ville) => (
                  <VilleCard key={ville.slug} ville={ville} />
                ))}
              </div>
            </div>
          </section>
        ))
      )}

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
          Votre ville n&apos;est pas listée ?
        </div>
        <h2 className="mx-auto mb-6 max-w-[720px] text-[clamp(36px,4vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
          Nous intervenons{" "}
          <em className="font-serif font-normal italic text-accent">partout en France.</em>
        </h2>
        <p className="mx-auto mb-8 max-w-[480px] text-[18px] leading-[1.55] text-muted-foreground">
          Notre offre s&apos;adapte à chaque territoire. Contactez-nous pour un diagnostic de votre marché local.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
        >
          Demander un diagnostic gratuit <ArrowDiag />
        </Link>
      </section>
    </>
  )
}
