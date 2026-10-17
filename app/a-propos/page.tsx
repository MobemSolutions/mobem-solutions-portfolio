import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { Team, Trust } from "@/components/home/sections"

export const metadata: Metadata = {
  title: "À propos — Trois associés basés à Nantes | Mobem Solutions",
  description:
    "Mobem Solutions est un collectif de trois associés basés à Nantes. On repère les tâches administratives qui font perdre du temps aux TPE et PME, on les automatise et on mesure les heures gagnées.",
  alternates: { canonical: "https://mobem-solutions.com/a-propos" },
  openGraph: {
    title: "À propos — Mobem Solutions",
    description: "Trois associés basés à Nantes. On vend des heures récupérées, pas du logiciel.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const VALUES = [
  {
    title: "Des heures, pas du logiciel",
    text: "Ce qu'on vous livre, c'est du temps. Chaque automatisation est jugée sur les heures qu'elle vous rend chaque mois.",
  },
  {
    title: "Vos outils, vos comptes",
    text: "On travaille avec ce que vous utilisez déjà, installé chez vous. Vous gardez la main, même si on arrête de travailler ensemble.",
  },
  {
    title: "Des chiffres honnêtes",
    text: "Pas de témoignage inventé, pas de promesse en l'air. On mesure avant, on mesure après, et on vous montre l'écart.",
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
              On rend leurs heures aux petites entreprises.
            </h1>
            <p className="type-body mt-6 max-w-[62ch] text-charcoal">
              Mobem Solutions est un collectif de trois associés basés à Nantes. On repère les tâches administratives qui vous font
              perdre du temps, on les automatise sur vos propres outils, puis on mesure les heures gagnées.
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

        <Team />
        <Trust />
        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
