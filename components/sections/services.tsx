"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Découverte",
    tagline: "Brief stratégique, zéro template",
    description: "On commence par comprendre votre métier, vos utilisateurs et vos objectifs. Pas de template préfabriqué — chaque projet démarre par un audit et un brief stratégique.",
    duration: "Jour 1–2",
  },
  {
    number: "02",
    title: "Design",
    tagline: "Maquettes validées avant de coder",
    description: "Nos maquettes sont validées avec vous avant de coder une seule ligne. UX d'abord, esthétique ensuite — des interfaces qui convertissent, pas juste qui plaisent.",
    duration: "Jour 3–5",
  },
  {
    number: "03",
    title: "Développement",
    tagline: "Next.js, propre, audité Lighthouse",
    description: "Stack moderne (Next.js, Tailwind), code propre, performances au cœur. Chaque livraison est testée sur mobile, desktop et auditée Lighthouse avant d'être présentée.",
    duration: "Jour 5–9",
  },
  {
    number: "04",
    title: "Lancement",
    tagline: "Live en J10 — domaine, SSL, rapport",
    description: "Mise en ligne sur Vercel avec domaine, SSL et redirections configurés. Vous repartez avec un site live, un rapport de performance et un associé joignable.",
    duration: "Jour 10",
  },
]

export function ServicesSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="services" className="border-t border-border" aria-labelledby="services-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <h2 id="services-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
          Méthode
        </h2>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          Diagnostiquer avant de prescrire
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row">

        {/* Left — editorial quote */}
        <div className="lg:w-[34%] px-4 sm:px-6 lg:px-8 py-10 lg:py-14 lg:border-r lg:border-border shrink-0">
          <h3 className="font-serif font-normal text-[clamp(36px,4.5vw,56px)] leading-[0.95] tracking-[-0.02em] mb-6 italic">
            On commence par{" "}
            <em className="text-accent not-italic font-serif">écouter.</em>
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground max-w-sm">
            Nous refusons les briefs livrés tels quels. Une bonne réponse part toujours
            d&apos;une bonne question — et d&apos;un audit sans complaisance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/methode"
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary self-start"
            >
              Notre méthode en détail
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right — desktop: table rows / mobile: tabs */}
        <div className="flex-1">

          {/* Mobile tab selector */}
          <div className="flex lg:hidden border-b border-border">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex-1 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors border-r border-border last:border-r-0",
                  activeStep === i
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                {step.number}
              </button>
            ))}
          </div>

          {/* Mobile: single active step */}
          <div className="lg:hidden">
            {steps.filter((_, i) => i === activeStep).map((step) => (
              <div key={step.number} className="px-4 sm:px-6 py-8">
                <div className="font-mono text-[14px] text-accent font-medium mb-3">{step.number}</div>
                <div className="text-[24px] font-bold tracking-[-0.025em] leading-none mb-3">{step.title}</div>
                <div className="text-[13px] text-muted-foreground leading-relaxed mb-4">{step.description}</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">{step.duration}</span>
                  <span className="text-[13px] text-foreground/70">{step.tagline}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table rows */}
          <div className="hidden lg:block" role="list">
            {steps.map((step, i) => (
              <div
                key={step.number}
                role="listitem"
                data-cursor="hover"
                className={cn(
                  "group bento-hover grid grid-cols-12 gap-6 px-6 lg:px-8 py-6 lg:py-7 items-baseline",
                  i < steps.length - 1 && "border-b border-border"
                )}
              >
                <span className="col-span-1 font-mono text-[14px] text-accent font-medium">{step.number}</span>
                <div className="col-span-5">
                  <div className="text-[22px] font-bold tracking-[-0.025em] leading-none mb-2">{step.title}</div>
                  <div className="text-[13px] text-muted-foreground group-hover:text-background/60 leading-relaxed transition-colors">{step.description}</div>
                </div>
                <div className="col-span-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground group-hover:text-background transition-colors">
                  <span className="tabular-nums whitespace-nowrap">{step.duration}</span>
                </div>
                <div className="col-span-4 text-right">
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-foreground/70 group-hover:text-background/60 transition-colors">Livrable —</span>
                  <br />
                  <span className="text-[13px] mt-1 inline-block">{step.tagline}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
