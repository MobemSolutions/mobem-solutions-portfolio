"use client"

import { ArrowRight, ArrowUpRight, Zap, Shield, BarChart3, Accessibility, Palette, Code2 } from "lucide-react"
import Link from "next/link"

const bentoItems = [
  {
    id: "performance",
    title: "Sites ultra-rapides.",
    metric: "< 1.5s",
    metricLabel: "LCP",
    icon: Zap,
    description: "Architecture Next.js optimisee pour la performance.",
    span: "col-span-2 row-span-1",
    featured: true,
  },
  {
    id: "seo",
    title: "SEO",
    metric: "100",
    metricLabel: "/ 100",
    icon: BarChart3,
    description: "Referencement naturel optimise.",
    span: "col-span-1 row-span-1",
  },
  {
    id: "security",
    title: "Securite",
    metric: "A+",
    metricLabel: "Score",
    icon: Shield,
    description: "Headers securises, SSL, protection DDoS.",
    span: "col-span-1 row-span-1",
  },
  {
    id: "accessibility",
    title: "Accessibilite",
    metric: "AAA",
    metricLabel: "WCAG",
    icon: Accessibility,
    description: "Conforme aux standards d'accessibilite.",
    span: "col-span-1 row-span-1",
  },
  {
    id: "design",
    title: "Design & Dev",
    metric: "1",
    metricLabel: "interlocuteur",
    icon: Palette,
    description: "Un seul point de contact pour tout votre projet.",
    span: "col-span-1 row-span-1",
  },
  {
    id: "code",
    title: "Code propre.",
    metric: "0",
    metricLabel: "dette technique",
    icon: Code2,
    description: "TypeScript, tests, documentation.",
    span: "col-span-2 row-span-1",
    featured: true,
  },
]

const steps = [
  { number: "01", title: "Decouverte", duration: "J1-2", description: "Audit et brief strategique" },
  { number: "02", title: "Design", duration: "J3-5", description: "Maquettes validees avant code" },
  { number: "03", title: "Developpement", duration: "J5-9", description: "Next.js, tests, performances" },
  { number: "04", title: "Lancement", duration: "J10", description: "Live avec rapport complet" },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header - Swiss typography */}
        <div className="mb-16 lg:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Services
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight mb-6"
          >
            Chaque service
            <br />
            dans sa case.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Une case = un message. Pas de texte inutile. 
            Des resultats mesurables, pas des specs techniques.
          </p>
        </div>

        {/* Bento Grid - Swiss visible grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-20 lg:mb-32">
          {bentoItems.map((item) => (
            <div
              key={item.id}
              className={`bg-card p-6 lg:p-8 flex flex-col ${item.span} ${item.featured ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between mb-auto">
                <item.icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                {item.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    Feature
                  </span>
                )}
              </div>
              <div className="mt-8">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl lg:text-5xl font-black text-foreground">
                    {item.metric}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {item.metricLabel}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Method Timeline - Swiss horizontal */}
        <div className="border-t border-border pt-16 lg:pt-20">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
              Methode
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              De l&apos;idee au lancement
              <br />
              <span className="text-accent">en 10 jours.</span>
            </h3>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((step, index) => (
              <div key={step.number} className="bg-background p-6 lg:p-8">
                <span className="text-xs font-bold text-accent mb-4 block">
                  {step.number}
                </span>
                <h4 className="text-lg font-bold text-foreground mb-1">
                  {step.title}
                </h4>
                <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 inline-block mb-3">
                  {step.duration}
                </span>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/methode"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Notre methode en detail
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground font-medium hover:text-foreground transition-colors"
            >
              Demarrons ensemble
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
