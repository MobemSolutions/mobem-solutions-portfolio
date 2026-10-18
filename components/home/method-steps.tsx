"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Gauge, Search, Wrench, Zap } from "lucide-react"
import { METHOD_STEPS } from "@/lib/automation-content"

const ICONS = [Search, Zap, Gauge, Wrench]

/**
 * Les quatre étapes de la méthode : l'étape active (icône bleue, contour lumineux qui fait le tour
 * de la carte) passe d'une carte à l'autre. Le survol (ou le focus) prend la main sur le défilement.
 */
export function MethodSteps() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (hovered !== null) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % METHOD_STEPS.length), 2600)
    return () => clearInterval(id)
  }, [hovered])

  const current = hovered ?? active

  return (
    <ol className="mt-8 grid sm:mt-12 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METHOD_STEPS.map((step, i) => {
        const on = i === current
        const Icon = ICONS[i]
        return (
          <li
            key={step.num}
            tabIndex={0}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => {
              setHovered(null)
              setActive(i)
            }}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-current={on ? "step" : undefined}
            className={cn(
              "hairline relative flex flex-col gap-2 p-5 outline-none transition-colors duration-500 focus-visible:border-blue sm:p-6",
              on && "border-blue bg-white"
            )}
          >
            <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-500",
                  on ? "bg-blue text-white" : "bg-[#e6edff] text-blue"
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="type-caption text-charcoal sm:mt-1">Étape {i + 1}</p>
                <h3 className="type-feature text-ink">{step.title}</h3>
              </div>
            </div>
            <p className="text-[15px] leading-[1.6] text-charcoal">{step.text}</p>
          </li>
        )
      })}
    </ol>
  )
}
