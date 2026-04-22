"use client"

import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découverte",
    tagline: "Brief stratégique, zéro template.",
    description:
      "On commence par comprendre votre métier, vos utilisateurs et vos objectifs. Pas de template préfabriqué — chaque projet démarre par un audit et un brief stratégique.",
    duration: "Jour 1–2",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    tagline: "Maquettes validées avant de coder.",
    description:
      "Nos maquettes sont validées avec vous avant de coder une seule ligne. UX d'abord, esthétique ensuite — des interfaces qui convertissent, pas juste qui plaisent.",
    duration: "Jour 3–5",
  },
  {
    number: "03",
    icon: Code2,
    title: "Développement",
    tagline: "Next.js, propre, audité Lighthouse.",
    description:
      "Stack moderne (Next.js, Tailwind), code propre, performances au cœur. Chaque livraison est testée sur mobile, desktop et auditée Lighthouse avant d'être présentée.",
    duration: "Jour 5–9",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement",
    tagline: "Live en J10 — domaine, SSL, rapport.",
    description:
      "Mise en ligne sur Vercel avec domaine, SSL et redirections configurés. Vous repartez avec un site live, un rapport de performance et un associé joignable.",
    duration: "Jour 10",
  },
]

const stats = [
  { value: "10 j", label: "Délai moyen de livraison" },
  { value: "90+", label: "Score Lighthouse garanti" },
  { value: "3", label: "Associés complémentaires" },
  { value: "24h", label: "Délai de réponse support" },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-14 lg:py-32 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 lg:mb-20">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
            Notre méthode
          </span>
          <h2
            id="services-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3"
          >
            <span className="text-balance">
              De l&apos;idée au lancement{" "}
              <span className="text-accent">en 10 jours chrono</span>
            </span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un processus court, itératif et transparent. Vous validez chaque étape,
            on livre à la date prévue.
          </p>
        </div>

        {/* Steps — mobile: vertical stack / desktop: grid */}
        <div className="relative">

          {/* Mobile: 2×2 grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3" role="list">
            {steps.map((step) => (
              <div
                key={step.number}
                role="listitem"
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent mb-0.5">{step.number}</p>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{step.duration}</p>
                  <p className="text-xs text-muted-foreground/80 mt-2 leading-snug">{step.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block relative">
            <div
              className="absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-border"
              aria-hidden="true"
            />
            <div className="grid lg:grid-cols-4 gap-6" role="list">
              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center" role="listitem">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <span
                    className="absolute -top-2 left-[calc(50%+8px)] text-xs font-bold text-accent bg-secondary px-1.5 rounded"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                  <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">
                    {step.duration}
                  </span>
                  <p className="text-xs text-muted-foreground/80 mt-3 whitespace-nowrap">{step.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-8 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card px-4 py-4 lg:px-8 lg:py-6 flex flex-col items-center text-center"
            >
              <span className="text-2xl lg:text-4xl font-bold text-accent mb-0.5">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 lg:mt-12">
          <p className="text-muted-foreground mb-5">
            Vous voulez voir la méthode appliquée à votre projet ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/methode"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
            >
              Notre méthode en détail
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground font-medium hover:text-foreground transition-all duration-200"
            >
              Démarrons ensemble
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
