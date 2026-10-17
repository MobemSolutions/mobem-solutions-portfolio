"use client"

import { useEffect, useState } from "react"
import { Check, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Démo du hero : une semaine de travail encombrée de tâches manuelles qui s'automatisent une à une.
 * Chaque bloc se replie en pastille « Automatique », la place se libère, le compteur d'heures grimpe
 * et un fil de notifications montre ce qui vient de partir. Exemple type, pas un résultat client.
 */

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"]

const TASKS = [
  { day: 0, label: "Relances clients", minutes: 75, done: "Relance J+5 envoyée" },
  { day: 0, label: "Tri des mails", minutes: 45, done: "34 mails classés" },
  { day: 1, label: "Pièces manquantes", minutes: 60, done: "Pièces demandées à 8 clients" },
  { day: 1, label: "Saisie", minutes: 35, done: "Saisie synchronisée" },
  { day: 2, label: "Factures reçues", minutes: 50, done: "12 factures classées" },
  { day: 2, label: "Tri des mails", minutes: 30, done: "21 mails classés" },
  { day: 3, label: "Émargements", minutes: 40, done: "Émargements archivés" },
  { day: 3, label: "Factures reçues", minutes: 45, done: "9 factures classées" },
  { day: 4, label: "Reporting", minutes: 55, done: "Tableau de suivi à jour" },
  { day: 4, label: "Relances clients", minutes: 40, done: "Relance J+30 envoyée" },
]

// Ordre d'automatisation (mélangé pour que l'œil parcoure toute la semaine)
const ORDER = [0, 4, 8, 2, 6, 1, 9, 3, 7, 5]
const STEP_MS = 1000
const HOLD_STEPS = 3

function formatHours(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h} h ${String(m).padStart(2, "0")}`
}

export function HeroWeek() {
  // tick = nombre de tâches déjà automatisées (avec une pause en fin de boucle)
  const [tick, setTick] = useState(ORDER.length)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setTick(0)
    const id = setInterval(() => setTick((t) => (t + 1) % (ORDER.length + HOLD_STEPS + 1)), STEP_MS)
    return () => clearInterval(id)
  }, [])

  const doneCount = Math.min(tick, ORDER.length)
  const automated = new Set(ORDER.slice(0, doneCount))
  const recovered = ORDER.slice(0, doneCount).reduce((sum, i) => sum + TASKS[i].minutes, 0)
  const total = TASKS.reduce((sum, t) => sum + t.minutes, 0)
  const feed = ORDER.slice(0, doneCount).slice(-3).reverse()

  return (
    <figure
      className="blue-field relative overflow-hidden rounded-[20px] p-4 sm:p-8 lg:p-10"
      aria-label={`Exemple type : sur une semaine, ${formatHours(total)} de tâches manuelles s'automatisent une à une.`}
    >
      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
        {/* La semaine */}
        <div className="rounded-[20px] bg-white p-4 shadow-card sm:p-5" aria-hidden="true">
          <div className="mb-4 flex items-center justify-between">
            <span className="type-meta text-graphite">Votre semaine</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-[12px] font-[550] text-blue">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {doneCount} / {TASKS.length} automatisées
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {DAYS.map((d, day) => (
              <div key={d} className="flex min-w-0 flex-col gap-2">
                <span className="text-center text-[12px] font-[550] text-charcoal">{d}</span>
                <div className="flex h-[230px] flex-col gap-2 rounded-[14px] bg-[#f6f7fa] p-1.5 sm:h-[250px] sm:p-2">
                  {TASKS.map((t, i) =>
                    t.day !== day ? null : (
                      <div
                        key={i}
                        className={cn(
                          "week-block flex min-w-0 flex-col justify-center overflow-hidden rounded-[10px] px-1 sm:px-2",
                          automated.has(i) ? "week-block-auto" : "week-block-manual"
                        )}
                        style={{ height: automated.has(i) ? 26 : Math.round(t.minutes * 1.5) }}
                      >
                        {automated.has(i) ? (
                          <span className="flex items-center justify-center gap-1 truncate text-[10.5px] font-[550] text-white sm:justify-start">
                            <Zap className="h-3 w-3 shrink-0" aria-hidden="true" />
                            <span className="hidden truncate sm:inline">Auto</span>
                          </span>
                        ) : (
                          <>
                            <span className="hidden truncate text-[12px] font-[550] leading-tight text-graphite sm:block">{t.label}</span>
                            <span className="whitespace-nowrap text-center text-[11px] font-[550] text-charcoal sm:text-left sm:text-[10.5px] sm:font-normal">
                              <span className="sm:hidden">{t.minutes}′</span>
                              <span className="hidden sm:inline">{t.minutes} min</span>
                            </span>
                          </>
                        )}
                      </div>
                    )
                  )}
                  <span
                    className={cn(
                      "mt-auto flex flex-1 items-end justify-center pb-1 text-[11px] font-[550] text-blue transition-opacity duration-700",
                      TASKS.every((t, i) => t.day !== day || automated.has(i)) ? "opacity-100" : "opacity-0"
                    )}
                  >
                    Libre
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compteur et fil d'activité */}
        <div className="flex flex-col gap-4 rounded-[20px] bg-studio/85 p-5 text-white backdrop-blur-md sm:p-6">
          <div>
            <p className="inline-flex items-center gap-2 text-[13px] font-[550] text-white/70">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Heures récupérées cette semaine
            </p>
            <p className="mt-2 text-[44px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[52px]">
              {formatHours(recovered)}
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gradient-to-r from-[#42aef7] to-white transition-[width] duration-700 ease-out" style={{ width: `${(recovered / total) * 100}%` }} />
            </div>
          </div>
          <ul className="flex min-h-[148px] flex-1 flex-col gap-2" aria-hidden="true">
            {feed.length === 0 && <li className="text-[13px] text-white/50">Les automatisations démarrent…</li>}
            {feed.map((i, k) => (
              <li
                key={i}
                className={cn(
                  "flex items-center gap-2.5 rounded-[12px] bg-white/[0.07] px-3 py-2.5 text-[13px] animate-in fade-in-0 slide-in-from-top-2 duration-500",
                  k > 0 && "opacity-60"
                )}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-blue">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="truncate">{TASKS[i].done}</span>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-white/55">Exemple type sur une semaine</p>
        </div>
      </div>
    </figure>
  )
}
