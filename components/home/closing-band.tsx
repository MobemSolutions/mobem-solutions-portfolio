"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { DiagnosticModal } from "@/components/diagnostic-button"
import { Container } from "@/components/home/primitives"
import { TRUST_LINE } from "@/lib/automation-content"

export function ClosingBand() {
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <section id="diagnostic" className="py-16 lg:py-24" aria-labelledby="diagnostic-heading">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] bg-studio px-6 py-14 text-white sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "var(--gradient-electric-blue-sweep)" }} aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#174ef2] opacity-40 blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative max-w-[640px]">
            <h2 id="diagnostic-heading" className="type-section text-white text-balance">
              Combien d&apos;heures pourriez-vous récupérer ?
            </h2>
            <p className="type-body mt-4 text-white/75">
              En 45 minutes, nous listons vos tâches répétitives et estimons le temps qu&apos;elles vous coûtent. Sans engagement.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                setOpen(true)
              }}
            >
              <label htmlFor="diagnostic-email" className="sr-only">
                Votre adresse e-mail professionnelle
              </label>
              <input
                id="diagnostic-email"
                type="email"
                autoComplete="email"
                placeholder="vous@entreprise.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[46px] flex-1 rounded-[16px] border border-white/25 bg-transparent px-[18px] text-[16px] text-white placeholder:text-white/50 focus-visible:border-white/60 focus-visible:outline-none"
              />
              <button type="submit" className="btn-blue">
                Réserver mon diagnostic gratuit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-4 type-caption text-white/60">{TRUST_LINE}</p>
          </div>
        </div>
      </Container>
      <DiagnosticModal open={open} onClose={() => setOpen(false)} email={email || undefined} />
    </section>
  )
}
