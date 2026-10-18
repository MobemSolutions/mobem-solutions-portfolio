"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { TRADES } from "@/lib/automation-content"
import { TradeVisual } from "@/components/automation/trade-visual"

interface TradeCarouselProps {
  autoPlayInterval?: number
}

/**
 * Carrousel des métiers : défilement automatique piloté par la barre de progression
 * de l'onglet actif (fin d'animation = slide suivante), flèches et onglets cliquables.
 */
/** Position d'une slide par rapport à la slide active : 0 au centre, -1 à gauche, +1 à droite. */
function relativePosition(i: number, index: number, count: number) {
  const rel = (i - index + count) % count
  return rel > count / 2 ? rel - count : rel
}

export function TradeCarousel({ autoPlayInterval = 7000 }: TradeCarouselProps) {
  // Index affiché, index précédent et sens du passage (1 = vers la gauche, -1 = vers la droite)
  const [{ index, prev, dir }, setSlide] = useState({ index: 0, prev: -1, dir: 1 })
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
  const go = (i: number, direction?: number) =>
    setSlide((s) => {
      const next = (i + count) % count
      if (next === s.index) return s
      return { index: next, prev: s.index, dir: direction ?? (i > s.index ? 1 : -1) }
    })

  return (
    <div
      className="flex flex-col gap-6"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Exemples d'automatisation par métier"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1, 1)
        if (e.key === "ArrowLeft") go(index - 1, -1)
      }}
    >
      {/* Rotation pleine largeur : chaque métier est une carte ; les voisines attendent de part et d'autre,
          réduites et estompées, au-delà du conteneur. Les slides restent toujours en position -1, 0 ou +1. */}
      <div className="grid">
        {TRADES.map((trade, i) => {
          const active = i === index
          const pos = relativePosition(i, index, count)
          // La carte qui passe d'un bord à l'autre (bouclage) se téléporte sans traverser l'écran, puis réapparaît en fondu.
          const jumping = prev >= 0 && Math.abs(pos - relativePosition(i, prev, count)) > 1
          return (
            <article
              key={trade.slug}
              className={cn(
                "carousel-slide card-lift col-start-1 row-start-1 grid items-start gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-8",
                jumping && "carousel-slide-jump",
                !active && "pointer-events-none"
              )}
              style={{
                opacity: active ? 1 : 0.35,
                zIndex: active ? 2 : 1,
                transform: `translateX(calc(${pos} * (100% + 40px))) scale(${active ? 1 : 0.9})`,
              }}
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count} : ${trade.audience}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className="flex flex-col lg:pt-2">
                <p className="chip-dark self-start">{trade.audience}</p>
                <h3 className="mt-5 type-section text-ink text-balance">{trade.headline}</h3>
                <p className="mt-3 line-clamp-3 max-w-[52ch] text-[15px] leading-[1.65] text-charcoal">{trade.intro}</p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border pt-5">
                  <span className="whitespace-nowrap text-[28px] font-semibold leading-none tracking-[-0.03em] text-blue sm:text-[34px]">{trade.beforeAfter.after}</span>
                  <span className="text-[15px] font-[550] text-charcoal">au lieu de {trade.beforeAfter.before} · exemple type</span>
                </div>
                <Link
                  href={trade.href}
                  className="link-arrow link-underline mt-6 inline-flex items-center gap-2 self-start type-nav text-graphite"
                >
                  Voir la page {trade.navLabel.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <TradeVisual trade={trade} />
            </article>
          )
        })}
      </div>

      {/* Contrôles façon apple.com : pilule givrée (chevrons + points), bouton lecture/pause rond */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-black/[0.05] p-1 backdrop-blur-xl">
          <button type="button" onClick={() => go(index - 1, -1)} className="carousel-chevron" aria-label="Métier précédent">
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-0.5 px-1" role="tablist" aria-label="Choisir un métier">
            {TRADES.map((trade, i) => {
              const active = i === index
              return (
                <button
                  key={trade.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={trade.navLabel}
                  title={trade.navLabel}
                  onClick={() => go(i)}
                  className="group flex h-6 min-w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]",
                      active ? "w-12 bg-black/[0.14]" : "w-2 bg-black/25 group-hover:bg-black/45"
                    )}
                    aria-hidden="true"
                  >
                    {active && (
                      <span
                        key={`${index}-${autoplay}`}
                        className={cn("absolute inset-y-0 left-0 block rounded-full bg-graphite", autoplay ? "carousel-progress" : "w-full")}
                        style={autoplay ? { animationDuration: `${autoPlayInterval}ms` } : undefined}
                        onAnimationEnd={() => go(index + 1, 1)}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          <button type="button" onClick={() => go(index + 1, 1)} className="carousel-chevron" aria-label="Métier suivant">
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="carousel-chevron h-10 w-10 bg-black/[0.05] backdrop-blur-xl"
            aria-label={paused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
          >
            {paused ? (
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
