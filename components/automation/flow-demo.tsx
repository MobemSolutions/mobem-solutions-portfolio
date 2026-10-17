"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CircleCheckBig,
  ClipboardCheck,
  Clock,
  FileUp,
  FolderCheck,
  Gauge,
  Mail,
  PenLine,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Tags,
  UserPlus,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { BeforeAfter, FlowIcon, FlowNode } from "@/lib/automation-content"

const ICONS: Record<FlowIcon, LucideIcon> = {
  "user-plus": UserPlus,
  send: Send,
  pen: PenLine,
  clipboard: ClipboardCheck,
  "folder-check": FolderCheck,
  calendar: CalendarClock,
  bell: Bell,
  "file-up": FileUp,
  shield: ShieldCheck,
  mail: Mail,
  tags: Tags,
  receipt: Receipt,
  check: CircleCheckBig,
  search: Search,
  zap: Zap,
  gauge: Gauge,
  wrench: Wrench,
}

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
  className?: string
}

/**
 * Schéma explicatif : grosses pastilles d'icônes reliées par des traits épais
 * qui se remplissent d'une étape à l'autre, comme une animation de présentation.
 */
export function FlowDiagram({ nodes, compact, vertical, className }: FlowDiagramProps) {
  // Une pause en fin de boucle : tout le schéma reste allumé un instant.
  const tick = useCycle(nodes.length + 1, 1300, nodes.length)
  const row = !vertical

  return (
    <ol
      className={cn("relative flex flex-col", row && "sm:flex-row sm:items-start", className)}
      aria-label={nodes.map((n) => n.label).join(", puis ")}
    >
      {nodes.map((node, i) => {
        const Icon = ICONS[node.icon]
        const reached = i <= tick
        const active = i === tick
        const last = i === nodes.length - 1
        return (
          <li
            key={node.label}
            className={cn(
              "relative flex items-center gap-4",
              compact ? "py-2" : "py-3",
              row && "sm:flex-1 sm:flex-col sm:gap-4 sm:py-0"
            )}
          >
            {/* Trait vers l'étape suivante */}
            {!last && (
              <span
                className={cn(
                  "absolute h-full w-1 overflow-hidden rounded-full bg-white/20",
                  compact ? "left-[22px] top-1/2" : "left-[30px] top-1/2",
                  row && "sm:left-1/2 sm:h-1 sm:w-full",
                  row && (compact ? "sm:top-[22px]" : "sm:top-[30px]")
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-white transition-transform duration-700 ease-out",
                    row ? "origin-top sm:origin-left" : "origin-top",
                    i < tick ? "scale-x-100 scale-y-100" : row ? "scale-y-0 sm:scale-x-0 sm:scale-y-100" : "scale-y-0"
                  )}
                />
              </span>
            )}

            <span
              className={cn(
                "relative z-10 flex shrink-0 items-center justify-center rounded-full transition-all duration-500",
                compact ? "h-12 w-12" : "h-16 w-16",
                reached ? "bg-white text-blue" : "bg-white/15 text-white/85 ring-1 ring-white/30",
                active && "scale-110 shadow-[0_0_0_8px_rgba(255,255,255,0.18),0_12px_32px_rgba(4,24,85,0.45)]"
              )}
              aria-hidden="true"
            >
              <Icon className={compact ? "h-5 w-5" : "h-7 w-7"} strokeWidth={2.25} />
            </span>

            <span
              className={cn(
                "text-[15px] font-[550] leading-[1.25] transition-colors duration-500",
                row && "sm:max-w-[11ch] sm:text-center",
                reached ? "text-white" : "text-white/85",
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
    <div className={cn("flex items-center gap-4 rounded-[20px] bg-white p-5 shadow-card", className)}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue text-white shadow-blue" aria-hidden="true">
        <Clock className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <span>
        <span className="block text-[30px] font-semibold leading-none tracking-[-0.02em] text-ink">{data.after}</span>
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
    <figure className={cn("blue-field relative overflow-hidden rounded-[20px] px-6 py-10 sm:px-10 sm:py-14", className)}>
      <div className={cn("flex flex-col gap-10", wide && "lg:flex-row lg:items-center lg:gap-8")}>
        <FlowDiagram
          nodes={nodes}
          vertical={!wide}
          className={cn(wide ? "lg:flex-1" : "mx-auto w-fit min-w-[220px]")}
        />
        {result && (
          <>
            {wide && <ArrowRight className="hidden h-8 w-8 shrink-0 text-white/70 lg:block" strokeWidth={2.5} aria-hidden="true" />}
            <ResultCard data={result} className={cn(wide ? "lg:w-[300px] lg:shrink-0" : "mx-auto w-full max-w-[320px]")} />
          </>
        )}
      </div>
    </figure>
  )
}
