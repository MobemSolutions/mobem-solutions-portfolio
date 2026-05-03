"use client"

import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { CalendlyButton } from "@/components/calendly-button"

export function HeroSection() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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
    </section>
  )
}
