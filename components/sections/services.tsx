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
    duration: "",
  },
  {
    number: "02",
    title: "Design",
    tagline: "Maquettes validées avant de coder",
    description: "Nos maquettes sont validées avec vous avant de coder une seule ligne. UX d'abord, esthétique ensuite — des interfaces qui convertissent, pas juste qui plaisent.",
    duration: "",
  },
  {
    number: "03",
    title: "Développement",
    tagline: "Next.js, propre, audité Lighthouse",
    description: "Stack moderne (Next.js, Tailwind), code propre, performances au cœur. Chaque livraison est testée sur mobile, desktop et auditée Lighthouse avant d'être présentée.",
    duration: "",
  },
  {
    number: "04",
    title: "Lancement",
    tagline: "Domaine, SSL, rapport",
    description: "Mise en ligne sur Vercel avec domaine, SSL et redirections configurés. Vous repartez avec un site live, un rapport de performance et un associé joignable.",
    duration: "",
  },
]

export function ServicesSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="methode" className="border-t border-border" aria-labelledby="services-heading">

      <h2 id="services-heading" className="sr-only">Méthode</h2>

      {/* Content */}
      <div className="flex flex-col lg:flex-row">

        {/* Left — editorial quote (sticky) */}
        <div className="lg:w-[44%] shrink-0 lg:border-r lg:border-border">
          <div className="px-4 sm:px-6 lg:px-8 py-14 lg:py-20 lg:sticky lg:top-16">
          <h3 className="font-bold text-[clamp(44px,6vw,80px)] leading-[0.92] tracking-[-0.04em] mb-6 whitespace-nowrap">
            Nos <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">méthodes.</span>
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground max-w-sm">
            Nous refusons les briefs livrés tels quels. Une bonne réponse part toujours
            d&apos;une bonne question et d&apos;un audit sans complaisance.
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
        </div>

        {/* Right — desktop: table rows / mobile: tabs */}
        <div className="flex-1">

          {/* Mobile tab selector — 2×2 grid */}
          <div className="grid grid-cols-2 lg:hidden border-b border-border">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex flex-col gap-1.5 px-5 py-4 text-left transition-colors",
                  i % 2 === 0 && "border-r border-border",
                  i < 2 && "border-b border-border",
                  activeStep === i
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                <span
                  className={cn("font-mono text-[10px] tabular-nums", activeStep === i ? "opacity-40" : "opacity-35")}
                  aria-hidden="true"
                  data-watermark={step.number}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] leading-tight">
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile: single active step */}
          <div className="lg:hidden">
            {steps.filter((_, i) => i === activeStep).map((step) => (
              <div key={step.number} className="px-4 sm:px-6 py-8">
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
                  "group bento-hover grid grid-cols-12 gap-6 px-6 lg:px-8 py-8 lg:py-10 items-baseline",
                  i < steps.length - 1 && "border-b border-border"
                )}
              >
                <div className="col-span-6">
                  <div className="text-[22px] font-bold tracking-[-0.025em] leading-none mb-2">{step.title}</div>
                  <div className="text-[13px] text-muted-foreground group-hover:text-background/60 leading-relaxed transition-colors">{step.description}</div>
                </div>
                <div className="col-span-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground group-hover:text-background transition-colors">
                  <span className="tabular-nums whitespace-nowrap">{step.duration}</span>
                </div>
                <div className="col-span-4 text-right">
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-foreground/70 group-hover:text-background/60 transition-colors">Livrable</span>
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
