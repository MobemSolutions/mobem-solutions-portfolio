"use client"

import { useEffect, useState } from "react"
import { Check, UserPlus, CalendarClock, Mail, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BeforeAfter, FlowTrigger, WorkflowStep } from "@/lib/automation-content"

const TRIGGER_ICONS = { inscription: UserPlus, echeance: CalendarClock, mail: Mail }

/** Fait avancer un index en boucle ; figé sur `still` si l'utilisateur préfère moins d'animations. */
export function useCycle(length: number, interval = 1800, still = length - 1) {
  const [index, setIndex] = useState(still)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval)
    return () => clearInterval(id)
  }, [length, interval])
  return index
}

/* ─── Panneau sombre : une étape à la fois ─────────── */
export function FlowSteps({
  steps,
  orientation = "vertical",
  className,
}: {
  steps: WorkflowStep[]
  orientation?: "vertical" | "horizontal"
  className?: string
}) {
  // Un temps de pause en fin de cycle : toutes les étapes restent validées un instant.
  const tick = useCycle(steps.length + 1, 1600, steps.length)
  const horizontal = orientation === "horizontal"

  return (
    <div className={cn("rounded-[20px] bg-studio p-5 text-white shadow-float ring-1 ring-white/10 sm:p-6", className)}>
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 type-meta text-white/90">
          <Zap className="h-4 w-4 text-[#7fa3ff]" aria-hidden="true" />
          Automatique
        </span>
        <span className="inline-flex items-center gap-1.5 type-caption text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[#42aef7]" aria-hidden="true" />
          Actif
        </span>
      </div>
      <ol className={cn("relative flex", horizontal ? "flex-col gap-4 lg:flex-row lg:gap-2" : "flex-col gap-1")}>
        {steps.map((step, i) => {
          const done = i < tick
          const active = i === tick
          return (
            <li
              key={step.label}
              className={cn(
                "flex items-center gap-3 rounded-[14px] px-3 py-3 transition-colors duration-500",
                horizontal && "lg:flex-1 lg:flex-col lg:items-start lg:gap-4 lg:px-4 lg:py-4",
                active ? "step-active" : "bg-transparent"
              )}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors duration-500",
                  active ? "bg-white text-blue" : done ? "bg-white text-studio" : "bg-white/10 text-white/50"
                )}
                aria-hidden="true"
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("flex min-w-0 flex-1 items-center justify-between gap-3", horizontal && "lg:w-full lg:flex-col lg:items-start lg:gap-1")}>
                <span className={cn("text-[15px] font-[550] leading-[1.3] transition-colors duration-500", done || active ? "text-white" : "text-white/50")}>
                  {step.label}
                </span>
                {step.when && (
                  <span className={cn("shrink-0 text-[12px] font-[550]", active ? "text-white/85" : "text-white/60")}>{step.when}</span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ─── Cartes blanches : déclencheur et résultat ─────── */
function TriggerCard({ trigger, className }: { trigger: FlowTrigger; className?: string }) {
  const Icon = TRIGGER_ICONS[trigger.icon]
  return (
    <div className={cn("flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-card", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-[550] text-graphite">{trigger.title}</span>
        <span className="block truncate text-[13px] text-charcoal">{trigger.detail}</span>
      </span>
    </div>
  )
}

function ResultCard({ data, className }: { data: BeforeAfter; className?: string }) {
  return (
    <div className={cn("rounded-[20px] bg-white p-5 shadow-card", className)}>
      <p className="type-caption text-charcoal">Temps passé chaque mois</p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[18px] font-[550] text-charcoal line-through decoration-1">{data.before}</span>
        <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink">{data.after}</span>
      </p>
      <p className="mt-3 type-caption text-charcoal">Exemple type</p>
    </div>
  )
}

function Connector({ horizontal }: { horizontal?: boolean }) {
  return (
    <span
      className={cn(
        "mx-auto block h-8 w-px bg-white/50",
        horizontal && "lg:mx-0 lg:h-px lg:w-10 lg:self-center"
      )}
      aria-hidden="true"
    />
  )
}

/* ─── Démo complète : déclencheur → étapes → résultat ── */
export function FlowDemo({
  trigger,
  steps,
  result,
  orientation = "vertical",
  className,
}: {
  trigger: FlowTrigger
  steps: WorkflowStep[]
  result: BeforeAfter
  orientation?: "vertical" | "horizontal"
  className?: string
}) {
  const horizontal = orientation === "horizontal"
  return (
    <figure
      className={cn("blue-field relative overflow-hidden rounded-[20px] px-5 py-10 sm:px-10 sm:py-14", className)}
      aria-label={`Exemple : ${trigger.title}, puis ${steps.map((s) => s.label.toLowerCase()).join(", ")}`}
    >
      <div
        className={cn(
          "relative mx-auto flex flex-col",
          horizontal ? "max-w-[440px] lg:max-w-none lg:flex-row lg:items-center" : "max-w-[400px]"
        )}
      >
        <TriggerCard trigger={trigger} className={cn(horizontal && "lg:w-[290px] lg:shrink-0")} />
        <Connector horizontal={horizontal} />
        <FlowSteps steps={steps} orientation={horizontal ? "horizontal" : "vertical"} className={cn(horizontal && "lg:flex-1")} />
        <Connector horizontal={horizontal} />
        <ResultCard data={result} className={cn(horizontal && "lg:w-[220px] lg:shrink-0")} />
      </div>
    </figure>
  )
}
