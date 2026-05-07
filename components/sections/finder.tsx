"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import { METIER_CATEGORIES, ALL_VILLES } from "@/lib/seo-data"
import { cn } from "@/lib/utils"

const QUICK_METIERS = METIER_CATEGORIES.flatMap((c) => c.metiers).slice(0, 8)
const QUICK_VILLES = ALL_VILLES.slice(0, 8)

export function FinderSection() {
  const router = useRouter()
  const [metier, setMetier] = useState("")
  const [ville, setVille] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (metier && ville) {
      const metierObj = METIER_CATEGORIES.flatMap((c) => c.metiers).find(
        (m) => m.label.toLowerCase() === metier.toLowerCase() || m.slug === metier.toLowerCase().replace(/\s+/g, "-")
      )
      const villeObj = ALL_VILLES.find(
        (v) => v.label.toLowerCase() === ville.toLowerCase() || v.slug === ville.toLowerCase().replace(/\s+/g, "-")
      )
      if (metierObj && villeObj) {
        router.push(`/metiers/${metierObj.slug}/${villeObj.slug}`)
        return
      }
      if (metierObj) { router.push(`/metiers/${metierObj.slug}`); return }
      if (villeObj) { router.push(`/villes/${villeObj.slug}`); return }
    }
    if (metier) {
      router.push(`/metiers?q=${encodeURIComponent(metier)}`)
    } else if (ville) {
      router.push(`/villes?q=${encodeURIComponent(ville)}`)
    } else {
      router.push("/metiers")
    }
  }

  return (
    <section
      className="border-t border-border bg-foreground text-background"
      aria-labelledby="finder-heading"
    >
      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-background/10">
        <h2 id="finder-heading" className="text-[13px] font-medium uppercase tracking-[0.02em] text-background/70">
          Trouver mon site
        </h2>
        <span className="hidden sm:block text-[11px] uppercase tracking-[0.06em] text-background/40">
          Métier × Ville
        </span>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row">

        {/* Left — édito */}
        <div className="lg:w-[36%] px-4 sm:px-6 lg:px-8 py-6 lg:py-14 lg:border-r lg:border-background/10 shrink-0">
          <h3 className="font-extrabold leading-[0.92] tracking-[-0.035em] text-[clamp(26px,3.2vw,50px)] mb-3">
            Quel site vous{" "}
            <em className="font-serif font-normal italic text-accent">faut-il ?</em>
          </h3>
          <p className="text-[13px] leading-relaxed text-background/55 max-w-xs">
            Votre métier + votre ville = une page dédiée, SEO local inclus, livrée en 10 jours.
          </p>
        </div>

        {/* Right — formulaire */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-14">

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-background/35" aria-hidden="true" />
              <input
                type="text"
                value={metier}
                onChange={(e) => setMetier(e.target.value)}
                placeholder="Votre métier…"
                list="metier-suggestions"
                className="w-full pl-10 pr-4 py-3 bg-background/8 border border-background/15 text-[13px] text-background placeholder:text-background/35 focus:outline-none focus:border-accent transition-colors"
                aria-label="Votre métier"
              />
              <datalist id="metier-suggestions">
                {METIER_CATEGORIES.flatMap((c) => c.metiers).map((m) => (
                  <option key={m.slug} value={m.label} />
                ))}
              </datalist>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-background/35" aria-hidden="true" />
              <input
                type="text"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                placeholder="Votre ville…"
                list="ville-suggestions"
                className="w-full pl-10 pr-4 py-3 bg-background/8 border border-background/15 text-[13px] text-background placeholder:text-background/35 focus:outline-none focus:border-accent transition-colors"
                aria-label="Votre ville"
              />
              <datalist id="ville-suggestions">
                {ALL_VILLES.map((v) => (
                  <option key={v.slug} value={v.label} />
                ))}
              </datalist>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-accent text-accent-foreground font-medium text-[13px] hover:bg-background hover:text-foreground transition-colors whitespace-nowrap shrink-0"
            >
              Chercher <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>

          {/* Quick tags */}
          <div className="flex flex-col gap-2.5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.07em] text-background/35 block mb-2">Métiers</span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_METIERS.map((m) => (
                  <button
                    key={m.slug}
                    onClick={() => setMetier(m.label)}
                    className={cn(
                      "px-2.5 py-1 border text-[11px] transition-colors",
                      metier === m.label
                        ? "bg-accent border-accent text-accent-foreground"
                        : "border-background/15 text-background/50 hover:border-background/40 hover:text-background/80"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.07em] text-background/35 block mb-2">Villes</span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_VILLES.map((v) => (
                  <button
                    key={v.slug}
                    onClick={() => setVille(v.label)}
                    className={cn(
                      "px-2.5 py-1 border text-[11px] transition-colors",
                      ville === v.label
                        ? "bg-accent border-accent text-accent-foreground"
                        : "border-background/15 text-background/50 hover:border-background/40 hover:text-background/80"
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
