"use client"

<<<<<<< HEAD
import { ArrowRight, ArrowUpRight, Zap, Shield, BarChart3, Accessibility, Palette, Code2 } from "lucide-react"
=======
import { ArrowRight } from "lucide-react"
>>>>>>> 38f194d (maj)
import Link from "next/link"

const bentoItems = [
  {
<<<<<<< HEAD
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
=======
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

const stats = [
  { value: "10 j", label: "Délai moyen de livraison" },
  { value: "90+", label: "Score Lighthouse garanti" },
  { value: "3",   label: "Associés complémentaires" },
  { value: "24h", label: "Délai de réponse support" },
>>>>>>> 38f194d (maj)
]

export function ServicesSection() {
  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> 38f194d (maj)
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

<<<<<<< HEAD
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
=======
        {/* Right — steps as table rows */}
        <div className="flex-1" role="list">
          {steps.map((step, i) => (
            <div
              key={step.number}
              role="listitem"
              data-cursor="hover"
              className={cn(
                "group bento-hover grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 px-4 sm:px-6 lg:px-8 py-6 lg:py-7 items-baseline",
                i < steps.length - 1 && "border-b border-border"
              )}
            >
              <span className="sm:col-span-1 font-mono text-[14px] text-accent font-medium">{step.number}</span>
              <div className="sm:col-span-5">
                <div className="text-[20px] sm:text-[22px] font-bold tracking-[-0.025em] leading-none mb-2">
                  {step.title}
                </div>
                <div className="text-[13px] text-muted-foreground group-hover:text-background/60 leading-relaxed transition-colors">
                  {step.description}
                </div>
              </div>
              <div className="sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground group-hover:text-background transition-colors">
                <span className="tabular-nums whitespace-nowrap">{step.duration}</span>
              </div>
              <div className="sm:col-span-4 sm:text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-foreground/70 group-hover:text-background/60 transition-colors">
                  Livrable —
                </span>
                <br />
                <span className="text-[13px] mt-1 inline-block">{step.tagline}</span>
>>>>>>> 38f194d (maj)
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD

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

=======
>>>>>>> 38f194d (maj)
      </div>


    </section>
  )
}
