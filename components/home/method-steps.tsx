"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { METHOD_STEPS } from "@/lib/automation-content"

/**
 * Les quatre étapes de la méthode : la pastille bleue passe d'une carte à l'autre,
 * comme une démonstration pas à pas. Le survol (ou le focus) prend la main sur le défilement.
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
    <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METHOD_STEPS.map((step, i) => {
        const on = i === current
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
              "card-lift method-step relative flex flex-col gap-3 p-6 outline-none",
              on && "method-step-on"
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-meta transition-colors duration-700",
                on ? "bg-blue text-white shadow-blue" : "bg-black/[0.05] text-graphite"
              )}
              aria-hidden="true"
            >
              {step.num}
            </span>
            <h3 className="type-feature text-ink">{step.title}</h3>
            <p className="text-[15px] leading-[1.6] text-charcoal">{step.text}</p>
            {/* Barre de progression de l'étape active */}
            <span className="absolute inset-x-6 bottom-0 h-[3px] overflow-hidden rounded-full" aria-hidden="true">
              <span
                key={on ? `${current}-${hovered === null}` : "off"}
                className={cn("block h-full rounded-full bg-blue", on ? (hovered === null ? "method-progress" : "w-full") : "w-0")}
              />
            </span>
          </li>
        )
      })}
    </ol>
  )
}
