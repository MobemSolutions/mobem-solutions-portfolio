import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { Founder, Trust } from "@/components/home/sections"

export const metadata: Metadata = {
  title: "À propos | Mobem Solutions — Automatisation des tâches administratives",
  description:
    "Mobem Solutions repère les tâches administratives qui font perdre du temps aux TPE et PME, les automatise sur leurs propres outils et mesure les heures gagnées. Basée près de Nantes.",
  alternates: { canonical: "https://mobem-solutions.com/a-propos" },
  openGraph: {
    title: "À propos — Mobem Solutions",
    description: "Un seul interlocuteur, du diagnostic à la maintenance. Des heures récupérées, pas du logiciel.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const VALUES = [
  {
    title: "Des heures, pas du logiciel",
    text: "Ce que nous livrons, c'est du temps. Chaque automatisation est jugée sur les heures qu'elle vous rend chaque mois.",
  },
  {
    title: "Vos outils, vos comptes",
    text: "Nous travaillons avec ce que vous utilisez déjà, installé chez vous. Vous gardez la main, même si nous arrêtons de travailler ensemble.",
  },
  {
    title: "Des chiffres honnêtes",
    text: "Pas de témoignage inventé, pas de promesse en l'air. Nous mesurons avant, puis après, et vous montrons l'écart.",
  },
]

export default function AProposPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="apropos-heading">
          <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
          <Container className="relative flex flex-col items-center text-center">
            <p className="chip-dark">À propos</p>
            <h1 id="apropos-heading" className="type-display mt-8 max-w-[18ch] text-ink text-balance">
              Rendre leurs heures aux petites entreprises.
            </h1>
            <p className="type-body mt-6 max-w-[62ch] text-charcoal">
              Mobem Solutions repère les tâches administratives qui vous font perdre du temps, les automatise sur vos propres
              outils, puis mesure les heures gagnées.
            </p>
          </Container>
        </section>

        <section className="py-16 lg:py-24" aria-labelledby="valeurs-heading">
          <Container>
            <SectionHeading id="valeurs-heading" eyebrow="Ce qui nous guide" title="Diagnostiquer avant de prescrire." />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {VALUES.map((v) => (
                <li key={v.title} className="card-lift card-hover p-6">
                  <h3 className="type-feature text-ink">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-charcoal">{v.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Founder />
        <Trust />
        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
