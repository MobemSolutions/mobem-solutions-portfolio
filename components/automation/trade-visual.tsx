import { cn } from "@/lib/utils"
import type { Trade } from "@/lib/automation-content"
import { FlowDiagram } from "@/components/automation/flow-demo"
import { TradeIllustration } from "@/components/automation/trade-illustration"

/** Visuel d'un métier : illustration à plat sur fond gris clair, puis la frise d'automatisation dessous. */
export function TradeVisual({ trade, className, strip = true }: { trade: Trade; className?: string; strip?: boolean }) {
  return (
    <figure className={cn("art-panel relative overflow-hidden", className)}>
      <TradeIllustration slug={trade.slug} className={cn("px-6 pt-6 sm:px-10 sm:pt-8", !strip && "pb-6 sm:pb-8")} />
      {strip && (
        <div className="relative mx-5 mt-2 border-t border-[#e1e3e8] px-1 pb-6 pt-6 sm:mx-8 sm:pb-8">
          <FlowDiagram nodes={trade.flow} mini />
        </div>
      )}
    </figure>
  )
}
