"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
<<<<<<< HEAD
import { CalendlyButton } from "@/components/calendly-button"
=======
import { cn } from "@/lib/utils"

const kpis = [
  { key: "Diagnostic", value: "90 min", desc: "Audit gratuit, sans engagement" },
  { key: "Livraison", value: "10 j", desc: "Sites essentiels en production" },
  { key: "Lighthouse", value: "90+", desc: "Performance garantie au contrat" },
  { key: "Support", value: "24 h", desc: "SLA réponse inclus" },
]
>>>>>>> 38f194d (maj)

export function HeroSection() {
  const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
<<<<<<< HEAD
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Swiss Grid Background - subtle */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        
        {/* Swiss Typography Hero */}
        <div className="max-w-5xl">
          
          {/* Tagline - Small caps */}
          <div className="mb-8 animate-fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Conseil en digitalisation — Nantes
            </span>
          </div>

          {/* Main Headline - Massive Typography */}
          <h1 
            id="hero-heading" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-foreground leading-[0.95] mb-8 animate-fade-up animation-delay-100"
          >
            <span className="block">Transformez votre</span>
            <span className="block">presence digitale</span>
            <span className="block text-accent">en levier de</span>
            <span className="block text-accent">croissance.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-fade-up animation-delay-200">
            On commence par diagnostiquer avant de prescrire. 
            Strategie, design, ingenierie — trois expertises complementaires 
            pour des resultats business mesurables.
          </p>

          {/* CTA Group - Swiss minimal */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <Link 
              href="#contact" 
              onClick={handleScrollToContact}
              className="group inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-base font-semibold hover:bg-foreground/90 transition-colors"
            >
              Lancer mon projet
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <CalendlyButton 
              text="Prendre rendez-vous" 
              variant="outline" 
              size="lg" 
              className="border-border hover:border-foreground hover:bg-transparent px-8 py-4 text-base font-semibold" 
            />
=======
    <section id="hero" className="pt-14 lg:pt-16 border-t border-border" aria-labelledby="hero-heading">

      {/* Main content */}
      <div className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20 mx-auto max-w-7xl">

        {/* H1 — massive editorial */}
        <h1
          id="hero-heading"
          className="font-bold leading-[0.88] tracking-[-0.045em] text-[clamp(52px,10vw,168px)] mb-10 sm:mb-14 lg:mb-20"
        >
          La précision<br />
          <span className="text-accent" aria-hidden="true">·</span> digitale,<br />
          <span className="font-serif font-normal italic tracking-[-0.02em]">
            à l&apos;échelle humaine<span className="caret" aria-hidden="true" />
          </span>
        </h1>

        {/* Sub-row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-border pt-8 pb-10 lg:pb-14">
          <div className="hidden lg:flex lg:col-span-1 items-start pt-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">01</span>
          </div>
          <div className="lg:col-span-5 lg:pr-10">
            <p className="text-[17px] sm:text-[18px] leading-[1.5] text-muted-foreground">
              On ne livre pas un site. On diagnostique, on prescrit, on exécute — pour que chaque clic,
              chaque page, chaque ligne de code serve la croissance de votre entreprise.
            </p>
          </div>
          <div className="lg:col-span-3 lg:px-8 lg:border-l lg:border-border flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">Engagement</span>
            <p className="text-[14px] leading-relaxed text-foreground">
              Roadmap trimestrielle. Tarification à la valeur. Un seul interlocuteur, trois associés.
            </p>
          </div>
          <div className="lg:col-span-3 lg:px-8 lg:border-l lg:border-border flex flex-col gap-3 items-start">
            <Link
              href="#contact"
              onClick={handleScrollTo("#contact")}
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-accent text-accent-foreground text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Démarrer un diagnostic
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="#services"
              onClick={handleScrollTo("#services")}
              className="inline-flex items-center gap-2.5 px-5 py-3 border border-border text-sm font-medium transition-colors hover:bg-secondary"
            >
              Voir les services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
>>>>>>> 38f194d (maj)
          </div>
        </div>

        {/* Stats Strip - Swiss Bento style */}
        <div className="mt-20 lg:mt-32 border-t border-border pt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { value: "10j", label: "Delai moyen de livraison" },
              { value: "90+", label: "Score Lighthouse garanti" },
              { value: "3", label: "Associes complementaires" },
              { value: "24h", label: "Delai de reponse" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-background p-6 lg:p-8 text-center animate-fade-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <span className="block text-3xl lg:text-4xl font-black text-foreground mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border">
        {kpis.map(({ key, value, desc }, i) => (
          <div
            key={key}
            className={cn(
              "px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col gap-2",
              i < 3 && "lg:border-r lg:border-border",
              i % 2 === 0 && "border-r border-border lg:border-r-0",
              i < 2 && "border-b border-border lg:border-b-0",
            )}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
              0{i + 1} · {key}
            </span>
            <div className="text-[36px] sm:text-[44px] font-bold tracking-[-0.03em] leading-none">{value}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
        ))}
      </div>

    </section>
  )
}
