"use client"

import { Check, Mail, Paperclip, Send, Clock, FileText, Inbox } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCycle } from "@/components/automation/workflow-panel"
import type { BeforeAfter } from "@/lib/automation-content"

function PaneChrome({ title, icon, children, className }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[20px] bg-white shadow-card", className)}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </span>
        <span className="ml-2 inline-flex items-center gap-1.5 type-meta text-graphite">
          {icon}
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/* Tableau de preuves Qualiopi qui se remplit */
const PROOF_ROWS = [
  { session: "Excel avancé — 12/03", proof: "Émargements" },
  { session: "Excel avancé — 12/03", proof: "Questionnaire à chaud" },
  { session: "Management — 19/03", proof: "Convocations" },
  { session: "Management — 19/03", proof: "Attestations" },
  { session: "Sécurité — 26/03", proof: "Questionnaire à froid" },
]

export function ProofPane({ className }: { className?: string }) {
  const filled = useCycle(PROOF_ROWS.length + 2, 1300, PROOF_ROWS.length - 1)
  return (
    <PaneChrome title="Preuves d'audit — mars" icon={<FileText className="h-4 w-4" aria-hidden="true" />} className={className}>
      <ul className="divide-y divide-border" aria-label="Exemple de tableau de preuves Qualiopi tenu à jour automatiquement">
        {PROOF_ROWS.map((row, i) => {
          const ok = i < filled
          return (
            <li key={row.session + row.proof} className="flex items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-[550] text-graphite">{row.proof}</span>
                <span className="block truncate text-[12px] text-charcoal">{row.session}</span>
              </span>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-[10px] px-2 py-0.5 text-[12px] font-[550] transition-colors duration-500",
                  ok ? "bg-blue/10 text-blue" : "bg-black/[0.04] text-charcoal"
                )}
              >
                {ok ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /> : <Clock className="h-3 w-3" aria-hidden="true" />}
                {ok ? "Classée" : "En attente"}
              </span>
            </li>
          )
        })}
      </ul>
    </PaneChrome>
  )
}

/* Relances qui partent à l'heure */
const REMINDERS = [
  { to: "SARL Durand", subject: "Votre contrat habitation arrive à échéance", when: "J-30" },
  { to: "M. Lefèvre", subject: "Pièce manquante : relevé d'information", when: "J+5" },
  { to: "Garage Moreau", subject: "Renouvellement flotte automobile", when: "J-30" },
  { to: "Mme Bernard", subject: "Merci, votre dossier est complet", when: "Reçu" },
]

export function RemindersPane({ className }: { className?: string }) {
  const sent = useCycle(REMINDERS.length + 2, 1300, REMINDERS.length - 1)
  return (
    <PaneChrome title="Relances programmées" icon={<Send className="h-4 w-4" aria-hidden="true" />} className={className}>
      <ul className="divide-y divide-border">
        {REMINDERS.map((r, i) => {
          const done = i < sent
          return (
            <li key={r.to} className="flex items-center gap-3 px-4 py-3">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                  done ? "bg-blue text-white" : "bg-black/[0.05] text-charcoal"
                )}
                aria-hidden="true"
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Mail className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-[550] text-graphite">{r.to}</span>
                <span className="block truncate text-[12px] text-charcoal">{r.subject}</span>
              </span>
              <span className="shrink-0 text-right text-[12px] font-[550] text-charcoal">
                {done ? <span className="text-blue">Envoyée</span> : r.when}
              </span>
            </li>
          )
        })}
      </ul>
    </PaneChrome>
  )
}

/* Boîte mail qui se trie */
const MAILS = [
  { from: "Boulangerie Petit", subject: "Facture fournisseur mars", tag: "Facture" },
  { from: "Cabinet Roux", subject: "Relevé bancaire février", tag: "Relevé" },
  { from: "SAS Atelier 9", subject: "Question sur la TVA", tag: "Question" },
  { from: "EURL Navarro", subject: "Note de frais + justificatifs", tag: "Facture" },
]

export function InboxPane({ className }: { className?: string }) {
  const sorted = useCycle(MAILS.length + 2, 1300, MAILS.length - 1)
  return (
    <PaneChrome title="Boîte de réception" icon={<Inbox className="h-4 w-4" aria-hidden="true" />} className={className}>
      <ul className="divide-y divide-border">
        {MAILS.map((m, i) => {
          const done = i < sorted
          return (
            <li key={m.from} className="flex items-center gap-3 px-4 py-3">
              <Paperclip className="h-4 w-4 shrink-0 text-charcoal" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-[550] text-graphite">{m.from}</span>
                <span className="block truncate text-[12px] text-charcoal">{m.subject}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-[10px] px-2 py-0.5 text-[12px] font-[550] transition-all duration-500",
                  done ? "bg-studio text-white" : "bg-black/[0.04] text-charcoal"
                )}
              >
                {done ? `Classé · ${m.tag}` : "Non trié"}
              </span>
            </li>
          )
        })}
      </ul>
    </PaneChrome>
  )
}

export function BeforeAfterCard({ data, className }: { data: BeforeAfter; className?: string }) {
  return (
    <div className={cn("rounded-[20px] bg-white p-4 shadow-card", className)}>
      <div className="flex items-stretch gap-4">
        <div className="flex-1">
          <p className="type-caption text-charcoal">Avant</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-charcoal line-through decoration-1">{data.before}</p>
        </div>
        <div className="w-px bg-border" aria-hidden="true" />
        <div className="flex-1">
          <p className="type-caption text-charcoal">Après</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-ink">{data.after}</p>
        </div>
      </div>
      <p className="mt-3 type-caption text-charcoal">Exemple type, avant mesure chez vous.</p>
    </div>
  )
}
