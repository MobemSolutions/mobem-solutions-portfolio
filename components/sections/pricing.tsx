"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Offre = {
  id: string
  name: string
  tagline: string
  target: string
  price: string
  priceDetail: string
  highlighted: boolean
  features: string[]
}

type Formule = {
  id: string
  name: string
  tagline: string
  target: string
  monthlyPrice: number
  highlighted: boolean
  features: string[]
}

const offres: Offre[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Le starter",
    target: "Artisans & Independants",
    price: "A partir de 1 500 €",
    priceDetail: "Tarif unique",
    highlighted: false,
    features: [
      "Site en ligne sous 10 jours",
      "100% responsive mobile",
      "SEO local optimise",
      "Design sur-mesure",
      "Hebergement 1 an inclus",
    ],
  },
  {
    id: "expert",
    name: "Expert",
    tagline: "Le fleuron",
    target: "PME & Startups",
    price: "A partir de 4 500 €",
    priceDetail: "Cle en main",
    highlighted: true,
    features: [
      "Architecture multi-pages",
      "UI/UX premium",
      "CMS autonome",
      "Integrations (CRM, Calendly...)",
      "SEO semantique avance",
      "Rapport mensuel",
    ],
  },
  {
    id: "surmesure",
    name: "Sur mesure",
    tagline: "L'unique",
    target: "Grands projets & ETI",
    price: "Sur devis",
    priceDetail: "Selon perimetre",
    highlighted: false,
    features: [
      "Architecture sur-mesure",
      "Integrations API complexes",
      "Design system proprietaire",
      "Accompagnement strategique",
      "SLA personnalise",
      "Scalabilite garantie",
    ],
  },
]

const formules: Formule[] = [
  {
    id: "serenite",
    name: "Serenite",
    tagline: "La maintenance",
    target: "Tous les sites Mobem",
    monthlyPrice: 149,
    highlighted: false,
    features: [
      "Hebergement haute disponibilite",
      "Sauvegardes quotidiennes",
      "Modifications illimitees",
      "Rapport mensuel",
      "Support 24h/48h",
    ],
  },
  {
    id: "acceleration",
    name: "Acceleration",
    tagline: "La croissance",
    target: "Sites actifs",
    monthlyPrice: 299,
    highlighted: true,
    features: [
      "Tout Serenite inclus",
      "Audit SEO mensuel",
      "2 pages/mois",
      "Analytics & heatmaps",
      "Tests A/B",
      "Google Ads",
    ],
  },
]

export function PricingSection() {
  const [activeSection, setActiveSection] = useState<"offres" | "formules">("offres")
  const [isAnnual, setIsAnnual] = useState(false)

  const annualPrice = (monthly: number) => Math.round(monthly * 0.8)

  return (
    <section id="prestations" className="py-20 lg:py-32 bg-secondary/30" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header - Swiss typography */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Tarifs
          </span>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4">
            Des packs clairs,
            <br />
            <span className="text-accent">des resultats mesurables.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Pas d&apos;abonnements caches, pas de surprises.
          </p>
        </div>

        {/* Section Tabs - Swiss minimal */}
        <div className="flex gap-px bg-border mb-12 max-w-xs" role="tablist">
          <button
            role="tab"
            aria-selected={activeSection === "offres"}
            onClick={() => setActiveSection("offres")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-semibold transition-colors",
              activeSection === "offres"
                ? "bg-foreground text-background"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            Projets
          </button>
          <button
            role="tab"
            aria-selected={activeSection === "formules"}
            onClick={() => setActiveSection("formules")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-semibold transition-colors",
              activeSection === "formules"
                ? "bg-foreground text-background"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            Mensuels
          </button>
        </div>

        {/* Offres Grid */}
        {activeSection === "offres" && (
          <div className="grid lg:grid-cols-3 gap-px bg-border">
            {offres.map((offre) => (
              <article
                key={offre.id}
                className={cn(
                  "bg-card p-8 flex flex-col",
                  offre.highlighted && "bg-foreground text-background"
                )}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      offre.highlighted ? "text-accent" : "text-muted-foreground"
                    )}>
                      {offre.tagline}
                    </span>
                    {offre.highlighted && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent px-2 py-0.5">
                        Recommande
                      </span>
                    )}
                  </div>
                  <h3 className={cn(
                    "text-2xl font-black mb-1",
                    offre.highlighted ? "text-background" : "text-foreground"
                  )}>
                    {offre.name}
                  </h3>
                  <p className={cn(
                    "text-sm",
                    offre.highlighted ? "text-background/70" : "text-muted-foreground"
                  )}>
                    Pour les {offre.target}
                  </p>
                </div>

                {/* Price */}
                <div className={cn(
                  "pb-8 mb-8 border-b",
                  offre.highlighted ? "border-background/20" : "border-border"
                )}>
                  <p className={cn(
                    "text-2xl font-black mb-1",
                    offre.highlighted ? "text-background" : "text-foreground"
                  )}>
                    {offre.price}
                  </p>
                  <p className={cn(
                    "text-sm",
                    offre.highlighted ? "text-background/70" : "text-muted-foreground"
                  )}>
                    {offre.priceDetail}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1" role="list">
                  {offre.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        offre.highlighted ? "text-accent" : "text-muted-foreground"
                      )} aria-hidden="true" />
                      <span className={offre.highlighted ? "text-background/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold transition-colors w-full",
                    offre.highlighted
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  Choisir {offre.name}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Formules Grid */}
        {activeSection === "formules" && (
          <>
            {/* Billing Toggle */}
            <div className="flex items-center gap-4 mb-8">
              <span className={cn(
                "text-sm font-medium cursor-pointer",
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              )} onClick={() => setIsAnnual(false)}>
                Mensuel
              </span>
              <button
                role="switch"
                aria-checked={isAnnual}
                onClick={() => setIsAnnual(!isAnnual)}
                className={cn(
                  "relative w-12 h-6 transition-colors",
                  isAnnual ? "bg-accent" : "bg-border"
                )}
              >
                <span className={cn(
                  "absolute top-1 w-4 h-4 bg-background transition-transform",
                  isAnnual ? "translate-x-7" : "translate-x-1"
                )} />
              </button>
              <span className={cn(
                "text-sm font-medium cursor-pointer flex items-center gap-2",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )} onClick={() => setIsAnnual(true)}>
                Annuel
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent px-1.5 py-0.5">
                  -20%
                </span>
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-px bg-border max-w-3xl">
              {formules.map((formule) => {
                const price = isAnnual ? annualPrice(formule.monthlyPrice) : formule.monthlyPrice
                return (
                  <article
                    key={formule.id}
                    className={cn(
                      "bg-card p-8 flex flex-col",
                      formule.highlighted && "bg-foreground text-background"
                    )}
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-wider",
                          formule.highlighted ? "text-accent" : "text-muted-foreground"
                        )}>
                          {formule.tagline}
                        </span>
                        {formule.highlighted && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent px-2 py-0.5">
                            Populaire
                          </span>
                        )}
                      </div>
                      <h3 className={cn(
                        "text-2xl font-black mb-1",
                        formule.highlighted ? "text-background" : "text-foreground"
                      )}>
                        {formule.name}
                      </h3>
                      <p className={cn(
                        "text-sm",
                        formule.highlighted ? "text-background/70" : "text-muted-foreground"
                      )}>
                        Pour les {formule.target}
                      </p>
                    </div>

                    {/* Price */}
                    <div className={cn(
                      "pb-8 mb-8 border-b",
                      formule.highlighted ? "border-background/20" : "border-border"
                    )}>
                      <div className="flex items-baseline gap-1">
                        <span className={cn(
                          "text-4xl font-black",
                          formule.highlighted ? "text-background" : "text-foreground"
                        )}>
                          {price} €
                        </span>
                        <span className={cn(
                          "text-sm",
                          formule.highlighted ? "text-background/70" : "text-muted-foreground"
                        )}>
                          /mois
                        </span>
                      </div>
                      {isAnnual && (
                        <p className={cn(
                          "text-sm mt-1",
                          formule.highlighted ? "text-background/70" : "text-muted-foreground"
                        )}>
                          Facture {price * 12} €/an
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1" role="list">
                      {formule.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className={cn(
                            "w-4 h-4 mt-0.5 flex-shrink-0",
                            formule.highlighted ? "text-accent" : "text-muted-foreground"
                          )} aria-hidden="true" />
                          <span className={formule.highlighted ? "text-background/90" : "text-muted-foreground"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="#contact"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold transition-colors w-full",
                        formule.highlighted
                          ? "bg-accent text-white hover:bg-accent/90"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      )}
                    >
                      Choisir {formule.name}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </article>
                )
              })}
            </div>
          </>
        )}

        {/* Footer note */}
        <p className="text-sm text-muted-foreground mt-12">
          Tous les tarifs sont <strong className="text-foreground font-semibold">HT</strong>.
          {" "}Devis sur-mesure disponible —{" "}
          <Link href="#contact" className="text-accent hover:underline">
            parlons de votre projet
          </Link>.
        </p>
      </div>
    </section>
  )
}
