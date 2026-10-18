"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BeforeAfter, FlowNode } from "@/lib/automation-content"
import { FLOW_ICONS } from "@/components/automation/flow-icons"


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

interface FlowDiagramProps {
  nodes: FlowNode[]
  /** Masque les libellés (lus par les lecteurs d'écran) et réduit les pastilles */
  compact?: boolean
  /** Toujours vertical (sinon vertical sur mobile, horizontal dès sm) */
  vertical?: boolean
  /** Petite frise horizontale, à toutes les tailles d'écran (posée sur une illustration) */
  mini?: boolean
  className?: string
}

/**
 * Schéma explicatif : pastilles d'icônes reliées par des traits épais qui s'arrêtent
 * avant chaque pastille et se remplissent d'une étape à l'autre, comme une animation de présentation.
 */
export function FlowDiagram({ nodes, compact, vertical, mini, className }: FlowDiagramProps) {
  // Une pause en fin de boucle : tout le schéma reste allumé un instant.
  const tick = useCycle(nodes.length + 1, 1150, nodes.length)
  const row = !vertical

  if (mini) {
    return (
      <ol className={cn("flex items-start", className)} aria-label={nodes.map((n) => n.label).join(", puis ")}>
        {nodes.map((node, i) => {
          const Icon = FLOW_ICONS[node.icon]
          const reached = i <= tick
          const active = i === tick
          return (
            <li key={node.label} className="relative flex min-w-0 flex-1 flex-col items-center gap-2">
              {i < nodes.length - 1 && (
                <span
                  className="absolute left-[calc(50%+26px)] top-[16.5px] h-[3px] w-[calc(100%-52px)] overflow-hidden rounded-full bg-[#dcdee3]"
                  aria-hidden="true"
                >
                  <span className={cn("flow-fill absolute inset-0 origin-left rounded-full bg-blue", i < tick ? "scale-x-100" : "scale-x-0")} />
                </span>
              )}
              <span
                className={cn(
                  "flow-node relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  reached ? "bg-blue text-white" : "bg-white text-graphite ring-[1.5px] ring-inset ring-[#161618]",
                  active && "scale-[1.08]"
                )}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className={cn("flow-label max-w-[11ch] text-center text-[11.5px] font-[550] leading-[1.2] max-sm:sr-only", reached ? "text-ink" : "text-[#838385]")}>
                {node.label}
              </span>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol
      className={cn("relative flex flex-col", row && "sm:flex-row sm:items-start", className)}
      aria-label={nodes.map((n) => n.label).join(", puis ")}
    >
      {nodes.map((node, i) => {
        const Icon = FLOW_ICONS[node.icon]
        const reached = i <= tick
        const active = i === tick
        const last = i === nodes.length - 1
        return (
          <li
            key={node.label}
            className={cn(
              "relative flex items-center gap-4",
              compact ? "py-4" : "py-5",
              row && "sm:flex-1 sm:flex-col sm:gap-3 sm:py-0"
            )}
          >
            {/* Trait vers l'étape suivante, interrompu autour des pastilles */}
            {!last && (
              <span
                className={cn(
                  "absolute w-[3px] overflow-hidden rounded-full bg-[#dcdee3]",
                  compact
                    ? "left-[20.5px] top-[calc(50%+31px)] h-[calc(100%-62px)]"
                    : "left-[26.5px] top-[calc(50%+38px)] h-[calc(100%-76px)]",
                  row &&
                    (compact
                      ? "sm:left-[calc(50%+31px)] sm:top-[20.5px] sm:h-[3px] sm:w-[calc(100%-62px)]"
                      : "sm:left-[calc(50%+38px)] sm:top-[26.5px] sm:h-[3px] sm:w-[calc(100%-76px)]")
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "flow-fill absolute inset-0 rounded-full bg-blue",
                    row ? "origin-top sm:origin-left" : "origin-top",
                    i < tick ? "scale-x-100 scale-y-100" : row ? "scale-y-0 sm:scale-x-0 sm:scale-y-100" : "scale-y-0"
                  )}
                />
              </span>
            )}

            <span
              className={cn(
                "flow-node relative z-10 flex shrink-0 items-center justify-center rounded-full",
                compact ? "h-11 w-11" : "h-14 w-14",
                reached ? "bg-blue text-white" : "bg-white text-graphite ring-[1.5px] ring-inset ring-[#161618]",
                active && "scale-[1.08]"
              )}
              aria-hidden="true"
            >
              <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} strokeWidth={2.25} />
            </span>

            <span
              className={cn(
                "flow-label text-[14px] font-[550] leading-[1.25]",
                row && "sm:max-w-[12ch] sm:text-center",
                reached ? "text-ink" : "text-[#838385]",
                compact && "sr-only"
              )}
            >
              {node.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function ResultCard({ data, className }: { data: BeforeAfter; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-card", className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue text-white shadow-blue" aria-hidden="true">
        <Clock className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span>
        <span className="block text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">{data.after}</span>
        <span className="mt-1.5 block text-[15px] font-[550] text-graphite">au lieu de {data.before}</span>
        <span className="mt-1 block type-caption text-charcoal">Exemple type</span>
      </span>
    </div>
  )
}

/** Démo complète dans son champ bleu : le schéma, puis le temps gagné. */
export function FlowDemo({
  nodes,
  result,
  layout = "stacked",
  className,
}: {
  nodes: FlowNode[]
  result?: BeforeAfter
  /** "wide" : schéma et résultat côte à côte en grand écran (hero) */
  layout?: "stacked" | "wide"
  className?: string
}) {
  const wide = layout === "wide"
  return (
    <figure className={cn("blue-field relative overflow-hidden rounded-[20px] px-5 py-6 sm:px-8 sm:py-8", className)}>
      <div className={cn("flex flex-col gap-5", wide && "lg:flex-row lg:items-center lg:gap-6")}>
        <FlowDiagram
          nodes={nodes}
          vertical={!wide}
          className={cn(wide ? "lg:flex-1" : "mx-auto w-fit min-w-[220px]")}
        />
        {result && (
          <>
            {wide && <ArrowRight className="hidden h-7 w-7 shrink-0 text-white/70 lg:block" strokeWidth={2.5} aria-hidden="true" />}
            <ResultCard data={result} className={cn(wide ? "lg:w-[270px] lg:shrink-0" : "mx-auto w-full max-w-[300px]")} />
          </>
        )}
      </div>
    </figure>
  )
}
