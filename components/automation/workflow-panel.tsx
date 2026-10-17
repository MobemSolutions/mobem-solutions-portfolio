"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WorkflowStep } from "@/lib/automation-content"

/** Fait avancer un index en boucle, figé sur `still` si l'utilisateur préfère moins d'animations. */
export function useCycle(length: number, interval = 1800, still = 0) {
  const [index, setIndex] = useState(still)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval)
    return () => clearInterval(id)
  }, [length, interval])
  return index
}

interface WorkflowPanelProps {
  steps: WorkflowStep[]
  title?: string
  className?: string
  /** "row" = chaîne horizontale, "auto" = verticale sur mobile puis horizontale, "stack" = grille compacte puis colonne en xl */
  layout?: "row" | "column" | "auto" | "stack"
}

export function WorkflowPanel({ steps, title, className, layout = "auto" }: WorkflowPanelProps) {
  const active = useCycle(steps.length, 1900, 2)

  return (
    <div
      className={cn(
        "rounded-[20px] bg-studio/95 p-4 text-white shadow-float ring-1 ring-white/10 backdrop-blur-xl sm:p-5",
        className
      )}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="type-meta text-white/90">{title}</span>
          <span className="inline-flex items-center gap-1.5 type-caption text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#42aef7]" aria-hidden="true" />
            Actif
          </span>
        </div>
      )}
      <ol
        className={cn(
          "flex gap-2",
          layout === "row" && "flex-row items-stretch",
          layout === "column" && "flex-col",
          layout === "auto" && "flex-col sm:flex-row sm:items-stretch",
          layout === "stack" && "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1"
        )}
        aria-label={title ?? "Étapes de l'automatisation"}
      >
        {steps.map((step, i) => {
          const done = i < active
          const isActive = i === active
          return (
            <li key={step.label} className="flex min-w-0 flex-1 items-stretch">
              <div
                className={cn(
                  "flex w-full flex-col gap-2 rounded-[14px] border px-3 py-2.5 transition-colors duration-500",
                  isActive ? "step-active" : done ? "border-white/15 bg-white/[0.08]" : "border-white/10 bg-white/[0.03]"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    isActive ? "bg-white text-blue" : done ? "bg-white/80 text-studio" : "bg-white/10 text-white/60"
                  )}
                  aria-hidden="true"
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                {step.badge && (
                  <span className="chip-light !px-2 !py-0.5 !text-[11px] whitespace-nowrap">{step.badge}</span>
                )}
                </span>
                <span className={cn("text-[13px] font-[550] leading-[1.25]", isActive || done ? "text-white" : "text-white/65")}>
                  {step.label}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
