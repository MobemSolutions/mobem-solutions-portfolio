"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, X, ChevronDown } from "lucide-react"
import { METIER_CATEGORIES, REGIONS, ALL_METIERS, ALL_VILLES } from "@/lib/seo-data"

const PAGES_PRINCIPALES = [
  { name: "Accueil", href: "/", num: "01" },
  { name: "Réalisations", href: "/realisations", num: "02" },
  { name: "Tarifs", href: "/#pricing", num: "03" },
  { name: "Comment ça marche", href: "/methode", num: "04" },
  { name: "Blog", href: "/blog", num: "05" },
  { name: "À propos", href: "/a-propos", num: "06" },
  { name: "Mentions légales", href: "/mentions-legales", num: "07" },
  { name: "CGV", href: "/cgv", num: "08" },
  { name: "Confidentialité", href: "/confidentialite", num: "09" },
]

function ArrowDiag() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
    </svg>
  )
}

type TabId = "principales" | "metiers" | "villes" | "combinaisons"

const TABS: { id: TabId; label: string }[] = [
  { id: "principales", label: "Pages" },
  { id: "metiers", label: "Métiers" },
  { id: "villes", label: "Villes" },
  { id: "combinaisons", label: "Métier × Ville" },
]

export function PlanDuSiteCatalog() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabId>("principales")
  const [expandedMetiers, setExpandedMetiers] = useState<Set<string>>(new Set())

  const filteredMetiers = useMemo(() => {
    if (!query.trim()) return METIER_CATEGORIES
    const q = query.toLowerCase()
    return METIER_CATEGORIES
      .map((cat) => ({ ...cat, metiers: cat.metiers.filter((m) => m.label.toLowerCase().includes(q)) }))
      .filter((cat) => cat.metiers.length > 0)
  }, [query])

  const filteredVilles = useMemo(() => {
    if (!query.trim()) return REGIONS
    const q = query.toLowerCase()
    return REGIONS
      .map((r) => ({ ...r, villes: r.villes.filter((v) => v.label.toLowerCase().includes(q) || v.departement.toLowerCase().includes(q)) }))
      .filter((r) => r.villes.length > 0)
  }, [query])

  const filteredPages = useMemo(() => {
    if (!query.trim()) return PAGES_PRINCIPALES
    const q = query.toLowerCase()
    return PAGES_PRINCIPALES.filter((p) => p.name.toLowerCase().includes(q))
  }, [query])

  // Combinaisons-specific filters: searching by ville or métier independently
  const combinaisonsMetiers = useMemo(() => {
    if (!query.trim()) return ALL_METIERS
    const q = query.toLowerCase()
    const byMetier = ALL_METIERS.filter((m) => m.label.toLowerCase().includes(q))
    return byMetier.length > 0 ? byMetier : ALL_METIERS
  }, [query])

  const combinaisonsVilles = useMemo(() => {
    if (!query.trim()) return ALL_VILLES
    const q = query.toLowerCase()
    const byVille = ALL_VILLES.filter((v) => v.label.toLowerCase().includes(q))
    return byVille.length > 0 ? byVille : ALL_VILLES
  }, [query])

  const isSearching = query.trim().length > 0

  const isExpanded = (slug: string) => isSearching || expandedMetiers.has(slug)

  const toggleExpand = (slug: string) => {
    if (isSearching) return
    setExpandedMetiers((prev) => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  return (
    <>
      {/* Search + Tabs sticky bar */}
      <div className="sticky top-14 lg:top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-0">
          {/* Search */}
          <div className="relative max-w-[520px] mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une page, un métier, une ville…"
              className="w-full pl-11 pr-10 py-2.5 bg-secondary border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
              aria-label="Rechercher dans le plan du site"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Effacer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Tabs */}
          <div className="flex border-t border-border overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.06em] border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Pages principales ── */}
        {activeTab === "principales" && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Pages principales</h2>
              <span className="font-mono text-[11px] text-foreground/70">{filteredPages.length} pages</span>
            </div>
            <div className="border-t border-l border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  data-cursor="hover"
                  className="group border-r border-b border-border px-5 py-5 flex items-center justify-between gap-4 bento-hover transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-foreground/40 dark:text-foreground/65 group-hover:text-background/40 transition-colors">{page.num}</span>
                    <span className="text-[15px] font-medium">{page.name}</span>
                  </div>
                  <ArrowDiag />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Métiers ── */}
        {activeTab === "metiers" && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Sites par métier</h2>
              <Link href="/metiers" className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">Voir tous →</Link>
            </div>
            {filteredMetiers.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">Aucun résultat pour « {query} »</p>
            ) : (
              <div className="space-y-8">
                {filteredMetiers.map((cat) => (
                  <div key={cat.slug}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/70 mb-4 border-b border-border pb-3">{cat.label}</h3>
                    <div className="overflow-x-auto scrollbar-none -mx-4 sm:mx-0">
                      <div className="flex lg:grid lg:grid-cols-4 border-t border-l border-border min-w-max lg:min-w-0 px-4 sm:px-0">
                        {cat.metiers.map((metier) => (
                          <Link
                            key={metier.slug}
                            href={`/metiers/${metier.slug}`}
                            data-cursor="hover"
                            className="group border-r border-b border-border px-4 py-3.5 w-[200px] lg:w-auto flex items-center justify-between gap-3 bento-hover transition-colors"
                          >
                            <span className="font-mono text-[12px] text-accent">{metier.label}</span>
                            <ArrowDiag />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Villes ── */}
        {activeTab === "villes" && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Sites par ville</h2>
              <Link href="/villes" className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">Voir toutes →</Link>
            </div>
            {filteredVilles.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">Aucune ville pour « {query} »</p>
            ) : (
              <div className="space-y-10">
                {filteredVilles.map((region) => (
                  <div key={region.label}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/70 mb-4 border-b border-border pb-3">{region.label}</h3>
                    <div className="overflow-x-auto scrollbar-none -mx-4 sm:mx-0">
                      <div className="flex lg:grid lg:grid-cols-5 border-t border-l border-border min-w-max lg:min-w-0 px-4 sm:px-0">
                        {region.villes.map((ville) => (
                          <Link
                            key={ville.slug}
                            href={`/villes/${ville.slug}`}
                            data-cursor="hover"
                            className="group border-r border-b border-border px-4 py-3.5 w-[180px] lg:w-auto flex items-center justify-between gap-2 bento-hover transition-colors"
                          >
                            <div>
                              <span className="font-mono text-[12px] text-accent">{ville.label}</span>
                              <span className="font-mono text-[10px] text-foreground/50 dark:text-foreground/75 group-hover:text-background/50 ml-1.5 transition-colors">({ville.codePostal})</span>
                            </div>
                            <ArrowDiag />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Combinaisons métier × ville ── */}
        {activeTab === "combinaisons" && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Pages métier × ville</h2>
              <span className="font-mono text-[11px] text-foreground/70">
                {combinaisonsMetiers.length} métier{combinaisonsMetiers.length > 1 ? "s" : ""} · {combinaisonsVilles.length} ville{combinaisonsVilles.length > 1 ? "s" : ""}
              </span>
            </div>
            {combinaisonsMetiers.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">Aucun résultat pour « {query} »</p>
            ) : (
              <div className="space-y-1">
                {combinaisonsMetiers.map((metier) => {
                  const open = isExpanded(metier.slug)
                  return (
                    <div key={metier.slug} className="border border-border">
                      <button
                        type="button"
                        onClick={() => toggleExpand(metier.slug)}
                        data-cursor="hover"
                        className="w-full flex items-center justify-between px-5 py-4 bento-hover transition-colors text-left"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-background/50">→</span>
                          <span className="font-medium text-[15px]">{metier.label}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{combinaisonsVilles.length} ville{combinaisonsVilles.length > 1 ? "s" : ""}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                      </button>
                      {open && (
                        <div className="overflow-x-auto scrollbar-none">
                          <div className="border-t border-border flex lg:grid lg:grid-cols-5 border-l border-border min-w-max lg:min-w-0">
                            {combinaisonsVilles.map((ville) => (
                              <Link
                                key={ville.slug}
                                href={`/metiers/${metier.slug}/${ville.slug}`}
                                data-cursor="hover"
                                className="border-r border-b border-border px-4 py-3 w-[200px] lg:w-auto font-mono text-[11px] text-accent bento-hover transition-colors"
                              >
                                {metier.label} {ville.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}

      </div>
    </>
  )
}
