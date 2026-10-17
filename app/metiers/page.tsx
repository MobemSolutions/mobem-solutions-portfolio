import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { FlowDiagram } from "@/components/automation/flow-demo"
import { TRADES, beforeAfterLine } from "@/lib/automation-content"

export const metadata: Metadata = {
  title: "Automatisation par métier — Formation, courtage, expertise comptable | Mobem Solutions",
  description:
    "Organismes de formation Qualiopi, courtiers en assurance, cabinets d'expertise comptable, TPE et PME : les tâches administratives que nous automatisons pour chaque métier.",
  alternates: { canonical: "https://mobem-solutions.com/metiers" },
  openGraph: {
    title: "Automatisation par métier | Mobem Solutions",
    description: "Les tâches administratives que nous automatisons pour chaque métier, sur vos propres outils.",
    url: "https://mobem-solutions.com/metiers",
  },
}

export default function MetiersPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="metiers-heading">
          <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
          <Container className="relative">
            <SectionHeading
              as="h1"
              id="metiers-heading"
              eyebrow="Métiers"
              title="Vos tâches, dans les mots de votre métier"
              text="Nous avons choisi trois métiers où les mêmes tâches administratives reviennent chaque semaine. Et pour toutes les TPE et PME de 2 à 50 personnes, le diagnostic fonctionne de la même façon."
              align="center"
            />
          </Container>
        </section>

        <section className="py-16 lg:py-20" aria-label="Métiers prioritaires">
          <Container>
            <ul className="grid gap-4 lg:grid-cols-3">
              {TRADES.map((trade) => (
                <li key={trade.slug}>
                  <Link href={trade.href} className="card-lift group flex h-full flex-col p-4">
                    <div className="blue-field rounded-[14px] px-5 py-8">
                      <FlowDiagram nodes={trade.flow} compact />
                    </div>
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                      <p className="type-meta text-charcoal">{trade.audience}</p>
                      <h2 className="type-feature mt-2 text-ink">{trade.headline}</h2>
                      <p className="mt-3 type-caption text-charcoal">{beforeAfterLine(trade.beforeAfter)}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 type-nav text-graphite">
                        Voir les automatisations
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="card-lift mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="type-feature text-ink">TPE et PME de 2 à 50 personnes</h2>
                <p className="mt-1 text-[15px] leading-[1.6] text-charcoal">
                  Relances de factures, devis à suivre, mails à trier, documents à classer : votre métier n&apos;est pas listé, la méthode est la même.
                </p>
              </div>
              <Link href="/#diagnostic" className="btn-outline shrink-0">
                Voir si c&apos;est automatisable chez moi
              </Link>
            </div>
          </Container>
        </section>

        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
