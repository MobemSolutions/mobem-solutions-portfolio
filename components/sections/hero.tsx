import { ArrowRight } from "lucide-react"
import Link from "next/link"

const kpis = [
  { key: "Diagnostic", value: "45 min", desc: "Audit gratuit, sans engagement" },
  { key: "Livraison", value: "10 j", desc: "Sites essentiels en production" },
  { key: "Lighthouse", value: "90+", desc: "Performance garantie au contrat" },
  { key: "Support", value: "24 h", desc: "SLA réponse inclus" },
]

export function HeroSection() {
  return (
    <section id="hero" className="pt-14 lg:pt-16 border-t border-border relative" aria-labelledby="hero-heading">

      {/* Vertical editorial label — right margin */}
      <div className="hidden lg:flex absolute right-0 top-0 h-full items-start pt-8 pr-6 pointer-events-none" aria-hidden="true">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-border" />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/25 select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Nantes · France · 2026
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-28 mx-auto max-w-7xl">

        <h1
          id="hero-heading"
          className="font-bold leading-[0.88] tracking-[-0.045em] text-[clamp(32px,8.5vw,136px)] mb-12 sm:mb-16 lg:mb-24"
        >
          La précision<br />
          <span className="text-accent" aria-hidden="true">·</span> digitale,<br />
          <span className="font-serif font-normal italic tracking-[-0.02em] lg:ml-[0.16em] whitespace-nowrap">
            à l&apos;échelle humaine<span className="caret" aria-hidden="true" />
          </span>
        </h1>

        {/* Sub-row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-border pt-10 pb-14 lg:pb-20">
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
          <div className="lg:col-span-3 lg:px-8 lg:border-l lg:border-border flex flex-col gap-2 items-start">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-accent text-accent-foreground text-[15px] font-semibold transition-colors cta-hover"
            >
              Démarrer un diagnostic
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              Sans engagement · 45 min · Réponse 24 h
            </span>
            <Link
              href="#services"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 border border-border text-sm font-medium transition-colors hover:bg-secondary mt-2"
            >
              Voir les services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
