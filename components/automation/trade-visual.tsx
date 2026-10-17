import { cn } from "@/lib/utils"
import type { Trade } from "@/lib/automation-content"
import { FlowDiagram } from "@/components/automation/flow-demo"
import { TradeIllustration } from "@/components/automation/trade-illustration"

/** Visuel d'un métier : illustration sur champ bleu, frise d'automatisation sur un bandeau sombre flottant. */
export function TradeVisual({ trade, className, strip = true }: { trade: Trade; className?: string; strip?: boolean }) {
  return (
    <figure className={cn("blue-field relative overflow-hidden rounded-[20px]", className)}>
      <TradeIllustration slug={trade.slug} className={cn("px-6 pt-6 sm:px-10 sm:pt-8", !strip && "pb-6 sm:pb-8")} />
      {strip && (
        <div className="relative mx-3 mb-3 rounded-[16px] bg-studio/80 px-3 py-4 backdrop-blur-md sm:mx-4 sm:mb-4">
          <FlowDiagram nodes={trade.flow} mini />
        </div>
      )}
    </figure>
  )
}
