import { cn } from "@/lib/utils"
import type { Trade } from "@/lib/automation-content"
import { WorkflowPanel } from "@/components/automation/workflow-panel"
import { ProofPane, RemindersPane, InboxPane } from "@/components/automation/panes"

const PANES = { proof: ProofPane, reminders: RemindersPane, inbox: InboxPane }

/** Composition média : champ bleu, volet d'outil client, panneau de workflow flottant. */
export function TradeVisual({ trade, className }: { trade: Trade; className?: string }) {
  const Pane = PANES[trade.pane]
  return (
    <div className={cn("blue-field relative overflow-hidden rounded-[20px] p-4 sm:p-8", className)}>
      <div className="relative grid gap-4 xl:grid-cols-[1fr_minmax(0,200px)] xl:items-center">
        <Pane className="row-in" />
        <WorkflowPanel steps={trade.steps} title="Automatisation" layout="stack" />
      </div>
    </div>
  )
}
