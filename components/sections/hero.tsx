"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid xl:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Content (Gauche) */}
          <div className="text-center xl:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Agence digitale à Nantes
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up animation-delay-100">
              <span className="text-balance">
                La précision digitale,{" "}
                <span className="text-accent">à l&apos;échelle humaine</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up animation-delay-200 leading-relaxed">
              Mobem Solutions accompagne les PME et ETI ambitieuses dans leur transformation digitale. Ingénierie, Design, Stratégie — trois expertises complémentaires pour des résultats concrets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start animate-fade-up animation-delay-300">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium text-base px-8">
                <Link href="#contact" onClick={handleScrollToContact}>
                  Lancer mon projet
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <CalendlyButton text="Prendre rendez-vous" variant="outline" size="lg" className="font-medium text-base px-8 border-border hover:bg-secondary" />
            </div>
          </div>

          {/* Visual Element (Droite) - TON NOUVEAU VISUEL */}
          <div className="relative animate-fade-up animation-delay-200" aria-hidden="true">
            <div className="relative aspect-square max-w-lg mx-auto">
              
              {/* Conteneur de l'image avec un léger effet de flottement */}
              <div className="absolute inset-4 sm:inset-8 bg-transparent rounded-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/home-section-main-illustration-removebg-preview.png" 
                  alt="Schéma technique et créatif Mobem Solutions"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Éléments flottants conservés pour le relief
              <div className="absolute top-0 right-0 bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Sur-mesure</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Atelier digital</div>
                  </div>
                </div>
              </div> */}

              {/* <div className="absolute bottom-0 left-0 bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">Pensé • Dessiné • Codé</div>
                </div>
              </div> */}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}