import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Clock, Gauge, KeyRound } from "lucide-react"
import { Container, SectionHeading, Eyebrow } from "@/components/home/primitives"
import { BookingButton } from "@/components/booking-button"
import { ContactButton } from "@/components/contact-form"
import { ClosingBand } from "@/components/home/closing-band"
import { Founder, Trust } from "@/components/home/sections"

export const metadata: Metadata = {
  title: "À propos | Mobem Solutions",
  description:
    "Mobem Solutions automatise les tâches administratives des TPE et PME sur leurs propres outils, et mesure les heures gagnées. Basée près de Nantes.",
  alternates: { canonical: "https://mobem-solutions.com/a-propos" },
  openGraph: {
    title: "À propos — Mobem Solutions",
    description: "Un seul interlocuteur, du premier échange à la maintenance. Des heures récupérées, pas du logiciel.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const VALUES = [
  {
    Icon: Clock,
    title: "Des heures, pas du logiciel",
    text: "Ce que nous livrons, c'est du temps. Chaque automatisation est jugée sur les heures qu'elle vous rend chaque mois.",
  },
  {
    Icon: KeyRound,
    title: "Vos outils, vos comptes",
    text: "Nous travaillons avec ce que vous utilisez déjà, installé chez vous. Vous gardez la main, même si nous arrêtons de travailler ensemble.",
  },
  {
    Icon: Gauge,
    title: "Des chiffres honnêtes",
    text: "Pas de témoignage inventé, pas de promesse en l'air. Nous mesurons avant, puis après, et vous montrons l'écart.",
  },
]

export default function AProposPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="pt-28 sm:pt-36" aria-labelledby="apropos-heading">
          <Container className="flex flex-col items-center text-center">
            <Eyebrow>À propos</Eyebrow>
            <h1 id="apropos-heading" className="type-display mt-4 max-w-[18ch] text-ink text-balance">
              Rendre leurs heures aux petites entreprises.
            </h1>
            <p className="type-body mt-6 max-w-[58ch] text-charcoal">
              Mobem Solutions repère les tâches administratives qui vous font perdre du temps, les automatise sur vos propres
              outils, puis mesure les heures gagnées.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactButton className="btn-dark">Nous écrire</ContactButton>
              <BookingButton />
            </div>
          </Container>

          {/* La devise du studio, en grand et à plat */}
          <Container className="mt-14 sm:mt-20">
            <div className="art-panel flex flex-col items-center px-6 py-16 text-center sm:py-24">
              <p className="eyebrow text-[#838385]">Notre méthode</p>
              <p className="mt-4 max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-[52px]">
                Diagnostiquer avant de prescrire<span className="text-blue">.</span>
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="valeurs-heading">
          <Container>
            <SectionHeading id="valeurs-heading" eyebrow="Ce qui nous guide" title="Trois principes, sur chaque mission." />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {VALUES.map(({ Icon, title, text }) => (
                <li key={title} className="hairline flex flex-col gap-4 p-6 hover:border-[#cfcfd4] hover:bg-white sm:p-7">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-[550] leading-[1.4] text-ink">{title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{text}</p>
                  </div>
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
