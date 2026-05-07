"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X, ArrowRight } from "lucide-react"
import { METIER_CATEGORIES, ALL_VILLES } from "@/lib/seo-data"

const TOP_VILLES = ALL_VILLES.slice(0, 8)
const EXTRA_VILLES = ALL_VILLES.length - TOP_VILLES.length

export function MetiersCatalog() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return METIER_CATEGORIES
    const q = query.toLowerCase()
    return METIER_CATEGORIES
      .map((cat) => ({
        ...cat,
        metiers: cat.metiers.filter(
          (m) => m.label.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.metiers.length > 0)
  }, [query])

  const totalResults = filtered.reduce((acc, c) => acc + c.metiers.length, 0)

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
              placeholder="Chercher un métier… plombier, coiffeur, architecte…"
              className="w-full pl-11 pr-10 py-2.5 bg-secondary border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
              aria-label="Rechercher un métier"
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
              {totalResults} résultat{totalResults > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Catalog */}
      {filtered.length === 0 ? (
        <div className="px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-[18px] text-muted-foreground mb-4">Aucun résultat pour « {query} »</p>
          <button
            onClick={() => setQuery("")}
            className="inline-flex items-center gap-2 text-accent font-mono text-[12px] uppercase tracking-[0.06em] hover:underline"
          >
            Voir tous les métiers
          </button>
        </div>
      ) : (
        filtered.map((cat) => (
          <section key={cat.slug} className="border-t border-border">
            <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-baseline gap-4 border-b border-border">
              <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-[-0.03em] leading-none">
                {cat.label}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {cat.metiers.length} métier{cat.metiers.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Desktop: grid | Mobile: horizontal scroll */}
            <div className="overflow-x-auto lg:overflow-visible scrollbar-none">
              <div className="flex lg:grid lg:grid-cols-3 border-t border-l border-foreground/10 dark:border-foreground/15 min-w-max lg:min-w-0">
                {cat.metiers.map((metier) => (
                  <Link
                    key={metier.slug}
                    href={`/metiers/${metier.slug}`}
                    className="group bento-hover w-[280px] lg:w-auto p-7 border-r border-b border-foreground/10 dark:border-foreground/15 flex flex-col gap-3.5 min-h-[240px] transition-colors"
                    data-cursor="hover"
                    aria-label={`Création de site internet pour ${metier.label}`}
                  >
                    <h3 className="text-[20px] font-bold tracking-[-0.02em]">{metier.label}</h3>
                    <p className="text-[13px] leading-[1.55] text-muted-foreground group-hover:text-background/70 flex-1 transition-colors">
                      {metier.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 items-center" aria-hidden="true">
                      {TOP_VILLES.slice(0, 4).map((v) => (
                        <span
                          key={v.slug}
                          className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-accent tracking-[0.04em] uppercase whitespace-nowrap"
                        >
                          {v.label}
                        </span>
                      ))}
                      <span className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-muted-foreground group-hover:text-background/60 tracking-[0.04em] uppercase whitespace-nowrap transition-colors">
                        +{EXTRA_VILLES + 4} villes
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))
      )}

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
          Votre métier n&apos;est pas listé ?
        </div>
        <h2 className="mx-auto mb-8 max-w-[800px] text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
          Nous adaptons à{" "}
          <em className="font-serif font-normal italic text-accent">tous les métiers</em>.
        </h2>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-accent-foreground font-medium text-sm transition-colors cta-hover"
        >
          Parler de mon projet
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    </>
  )
}
