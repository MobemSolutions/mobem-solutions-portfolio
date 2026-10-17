"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { TRADES } from "@/lib/automation-content"
import { FlowDemo } from "@/components/automation/flow-demo"

interface TradeCarouselProps {
  autoPlayInterval?: number
}

/**
 * Carrousel des métiers : défilement automatique piloté par la barre de progression
 * de l'onglet actif (fin d'animation = slide suivante), flèches et onglets cliquables.
 */
export function TradeCarousel({ autoPlayInterval = 7000 }: TradeCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const count = TRADES.length

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const autoplay = !paused && !reducedMotion
  const go = (i: number) => setIndex((i + count) % count)

  return (
    <div
      className="flex flex-col gap-6"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Exemples d'automatisation par métier"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1)
        if (e.key === "ArrowLeft") go(index - 1)
      }}
    >
      {/* Slides empilées dans la même cellule de grille : fondu sans saut de hauteur */}
      <div className="card-lift grid overflow-hidden">
        {TRADES.map((trade, i) => {
          const active = i === index
          return (
            <article
              key={trade.slug}
              className={cn(
                "col-start-1 row-start-1 grid items-center gap-10 p-5 transition-[opacity,transform] duration-500 ease-out sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-10",
                active ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              )}
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count} : ${trade.audience}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className="flex flex-col">
                <p className="chip-dark self-start">{trade.audience}</p>
                <p className="mt-8 type-caption text-charcoal">Temps passé chaque mois — exemple type</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[56px]">
                    {trade.beforeAfter.after}
                  </span>
                  <span className="text-[18px] font-[550] text-charcoal">au lieu de {trade.beforeAfter.before}</span>
                </p>
                <h3 className="mt-8 type-feature text-ink sm:text-[24px] sm:leading-[1.3]">{trade.headline}</h3>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.65] text-charcoal">{trade.intro}</p>
                <Link
                  href={trade.href}
                  className="link-arrow link-underline mt-8 inline-flex items-center gap-2 self-start type-nav text-graphite"
                >
                  Voir la page {trade.navLabel.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <FlowDemo nodes={trade.flow} />
            </article>
          )
        })}
      </div>

      {/* Onglets reliés + contrôles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="grid flex-1 grid-cols-3 gap-2" role="tablist" aria-label="Choisir un métier">
          {TRADES.map((trade, i) => {
            const active = i === index
            return (
              <button
                key={trade.slug}
                type="button"
                role="tab"
                data-ripple
                aria-selected={active}
                onClick={() => go(i)}
                className={cn(
                  "group flex flex-col gap-2.5 rounded-[14px] px-3 py-3 text-left transition-colors hover:bg-black/[0.04] hover:text-graphite",
                  active ? "text-graphite" : "text-charcoal"
                )}
              >
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-black/[0.08] transition-[height] duration-200 group-hover:h-[5px]" aria-hidden="true">
                  <span
                    key={active ? `${index}-${autoplay}` : "idle"}
                    className={cn("block h-full rounded-full bg-blue", active ? (autoplay ? "carousel-progress" : "w-full") : "w-0")}
                    style={active && autoplay ? { animationDuration: `${autoPlayInterval}ms` } : undefined}
                    onAnimationEnd={() => go(index + 1)}
                  />
                </span>
                <span className="truncate text-[14px] font-[550] sm:text-[15px]">{trade.navLabel}</span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="icon-control"
              aria-label={paused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
            >
              {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
          <button type="button" onClick={() => go(index - 1)} className="icon-control" aria-label="Métier précédent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(index + 1)} className="icon-control" aria-label="Métier suivant">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
