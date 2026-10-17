import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading, FaqList } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { FlowDiagram } from "@/components/automation/flow-demo"
import { Trust, Pricing } from "@/components/home/sections"
import { FAQ, METHOD_FLOW, METHOD_STEPS } from "@/lib/automation-content"

export const metadata: Metadata = {
  title: "Méthode — Diagnostiquer avant de prescrire | Mobem Solutions",
  description:
    "Diagnostiquer, automatiser, mesurer, maintenir : la méthode Mobem pour récupérer des heures sur vos tâches administratives, sur vos propres outils.",
  alternates: { canonical: "https://mobem-solutions.com/methode" },
  openGraph: {
    title: "Méthode — Diagnostiquer avant de prescrire | Mobem Solutions",
    description: "Diagnostiquer · Automatiser · Mesurer · Maintenir.",
    url: "https://mobem-solutions.com/methode",
  },
}

const DETAILS = [
  {
    what: "Un échange de 45 minutes, en visio ou à Nantes.",
    out: "La liste de vos tâches répétitives, le temps estimé pour chacune, et nos recommandations écrites.",
  },
  {
    what: "L'installation sur vos propres comptes, avec vos outils actuels.",
    out: "Une automatisation testée avec vous, documentée, et une équipe qui sait s'en servir.",
  },
  {
    what: "Une comparaison du temps passé avant et après.",
    out: "Un chiffre en heures par mois, et la liste des oublis évités.",
  },
  {
    what: "Une surveillance continue et des ajustements quand vos outils évoluent.",
    out: "Une alerte immédiate si une automatisation échoue, et une correction rapide.",
  },
]

export default function MethodePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="methode-page-heading">
          <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[600px]" aria-hidden="true" />
          <Container className="relative flex flex-col items-center text-center">
            <p className="chip-dark">Notre méthode</p>
            <h1 id="methode-page-heading" className="type-display mt-8 max-w-[16ch] text-ink text-balance">
              Diagnostiquer avant de prescrire.
            </h1>
            <p className="type-body mt-6 max-w-[60ch] text-charcoal">
              On ne vous vend pas un logiciel. On regarde comment vous travaillez, on automatise ce qui vaut la peine de l&apos;être,
              puis on mesure les heures que vous récupérez.
            </p>
            <div className="mt-8">
              <DiagnosticButton />
            </div>
          </Container>
          <Container className="relative mt-14">
            <div className="blue-field rounded-[20px] px-5 py-10 sm:px-12 sm:py-14">
              <FlowDiagram nodes={METHOD_FLOW} className="mx-auto max-w-[760px]" />
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-24" aria-labelledby="etapes-heading">
          <Container>
            <SectionHeading id="etapes-heading" eyebrow="Étape par étape" title="Ce qui se passe, et ce que vous obtenez" />
            <ol className="mt-12 flex flex-col gap-4">
              {METHOD_STEPS.map((step, i) => (
                <li key={step.num} className="card-lift grid gap-6 p-6 sm:p-8 lg:grid-cols-[220px_1fr_1fr]">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05] type-meta text-graphite" aria-hidden="true">
                      {step.num}
                    </span>
                    <h3 className="type-feature text-ink">{step.title}</h3>
                  </div>
                  <div>
                    <p className="type-caption text-charcoal">Ce qu&apos;on fait</p>
                    <p className="mt-2 text-[16px] leading-[1.6] text-graphite">{DETAILS[i].what}</p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{step.text}</p>
                  </div>
                  <div>
                    <p className="type-caption text-charcoal">Ce que vous obtenez</p>
                    <p className="mt-2 text-[16px] leading-[1.6] text-graphite">{DETAILS[i].out}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <Trust />
        <Pricing />

        <section className="py-16 lg:py-24" aria-labelledby="methode-faq-heading">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading id="methode-faq-heading" eyebrow="Questions fréquentes" title="Avant de se lancer" />
            <FaqList items={FAQ} />
          </Container>
        </section>

        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
