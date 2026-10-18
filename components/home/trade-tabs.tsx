"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Calculator, GraduationCap, Umbrella } from "lucide-react"
import { TRADES } from "@/lib/automation-content"
import { TradeVisual } from "@/components/automation/trade-visual"
import { AppWindow, Eyebrow } from "@/components/home/primitives"

/** Libellé court et icône de chaque métier, pour tenir dans le contrôle segmenté. */
const SEGMENTS: Record<string, { short: string; Icon: typeof GraduationCap }> = {
  "organismes-de-formation": { short: "Formation", Icon: GraduationCap },
  "courtiers-assurance": { short: "Courtage", Icon: Umbrella },
  "cabinets-comptables": { short: "Comptabilité", Icon: Calculator },
}

/**
 * Exemples par métier : un contrôle segmenté choisit le métier, le panneau en dessous montre
 * le texte et la maquette. Défilement automatique tant que personne n'a choisi soi-même.
 */
export function TradeTabs({ interval = 8000 }: { interval?: number }) {
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    // Défilement automatique seulement si l'utilisateur accepte les animations
    setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const trade = TRADES[index]
  const choose = (i: number) => {
    setAuto(false)
    setIndex(i)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="segmented w-full sm:w-auto"
        role="tablist"
        aria-label="Choisir un métier"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") choose((index + 1) % TRADES.length)
          if (e.key === "ArrowLeft") choose((index - 1 + TRADES.length) % TRADES.length)
        }}
      >
        {TRADES.map((t, i) => {
          const { short, Icon } = SEGMENTS[t.slug]
          const active = i === index
          return (
            <button
              key={t.slug}
              type="button"
              role="tab"
              id={`tab-${t.slug}`}
              aria-selected={active}
              aria-controls="trade-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => choose(i)}
              className="segment max-sm:flex-1 max-sm:justify-center max-sm:px-2 max-sm:text-[13px]"
            >
              <Icon className="h-4 w-4 shrink-0 max-[400px]:hidden" strokeWidth={2} aria-hidden="true" />
              {short}
              {active && auto && (
                <span className="segment-progress" aria-hidden="true">
                  <span
                    key={index}
                    style={{ animationDuration: `${interval}ms` }}
                    onAnimationEnd={() => setIndex((i) => (i + 1) % TRADES.length)}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div
        id="trade-panel"
        role="tabpanel"
        aria-labelledby={`tab-${trade.slug}`}
        key={trade.slug}
        className="animate-in fade-in-0 slide-in-from-bottom-2 mt-10 grid w-full items-center gap-10 duration-500 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
      >
        <div className="flex flex-col">
          <Eyebrow>{trade.audience}</Eyebrow>
          <h3 className="mt-4 type-section text-ink text-balance">{trade.headline}</h3>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-charcoal">{trade.intro}</p>
          <div className="hairline mt-7 flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[13px] text-charcoal">Exemple type, chaque mois</p>
              <p className="mt-1 text-[15px] font-[550] text-charcoal line-through decoration-[#c2c2c4]">{trade.beforeAfter.before}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#c2c2c4]" aria-hidden="true" />
            <p className="whitespace-nowrap text-[30px] font-semibold leading-none tracking-[-0.03em] text-blue">
              {trade.beforeAfter.after}
            </p>
          </div>
          <Link
            href={trade.href}
            className="link-arrow link-underline mt-6 inline-flex items-center gap-2 self-start type-nav text-graphite"
          >
            Voir la page {trade.navLabel.toLowerCase()}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <AppWindow title={`${SEGMENTS[trade.slug].short} · automatisations`} bodyClassName="p-2 sm:p-3">
          <TradeVisual trade={trade} className="rounded-[10px]" />
        </AppWindow>
      </div>
    </div>
  )
}
