import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalendarCheck, Gauge, KeyRound, MapPin, UserRound } from "lucide-react"
import { Container, SectionHeading, AppWindow, Eyebrow } from "@/components/home/primitives"
import { DiagnosticButton } from "@/components/diagnostic-button"
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
    description: "Un seul interlocuteur, du diagnostic à la maintenance. Des heures récupérées, pas du logiciel.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const FACTS = [
  { Icon: MapPin, label: "Basée", value: "Près de Nantes, partout en France" },
  { Icon: UserRound, label: "Interlocuteur", value: "Un seul, du diagnostic à la maintenance" },
  { Icon: KeyRound, label: "Vos données", value: "Sur vos comptes, jamais chez nous" },
  { Icon: CalendarCheck, label: "Premier pas", value: "Diagnostic gratuit de 45 min" },
  { Icon: Gauge, label: "Résultat", value: "Heures mesurées avant et après" },
]

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
          <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>À propos</Eyebrow>
              <h1 id="apropos-heading" className="type-display mt-4 max-w-[16ch] text-ink text-balance">
                Rendre leurs heures aux petites entreprises.
              </h1>
              <p className="type-body mt-6 max-w-[54ch] text-charcoal">
                Mobem Solutions repère les tâches administratives qui vous font perdre du temps, les automatise sur vos propres
                outils, puis mesure les heures gagnées.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DiagnosticButton />
                <ContactButton className="btn-outline">Nous écrire</ContactButton>
              </div>
            </div>

            {/* Fiche d'identité du studio, en maquette de fenêtre */}
            <AppWindow title="Mobem Solutions · en bref">
              <dl className="divide-y divide-[#ececef]">
                {FACTS.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f2] text-graphite" aria-hidden="true">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
                      <dt className="shrink-0 text-[13px] text-charcoal sm:w-32">{label}</dt>
                      <dd className="text-[15px] font-[550] text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-3 border-t border-[#ececef] bg-[#f7f7f8] px-5 py-3 sm:px-6">
                <span className="halo-dot h-2.5 w-2.5 rounded-full bg-blue" aria-hidden="true" />
                <span className="text-[13px] font-[550] text-graphite">Disponible pour de nouveaux diagnostics</span>
              </div>
            </AppWindow>
          </Container>
        </section>

        <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="valeurs-heading">
          <Container>
            <SectionHeading id="valeurs-heading" eyebrow="Ce qui nous guide" title="Diagnostiquer avant de prescrire." />
            <ul className="hairline mt-12 grid overflow-hidden md:grid-cols-3">
              {VALUES.map((v, i) => (
                <li
                  key={v.title}
                  className="flex flex-col gap-3 border-[#e6e6e8] p-6 transition-colors duration-300 hover:bg-white max-md:[&:not(:first-child)]:border-t sm:p-8 md:[&:not(:first-child)]:border-l"
                >
                  <span className="eyebrow text-blue">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="type-feature text-ink">{v.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-charcoal">{v.text}</p>
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
