"use client"

import { useState } from "react"
<<<<<<< HEAD
import { ArrowRight, Check } from "lucide-react"
=======
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
>>>>>>> 38f194d (maj)
import Link from "next/link"
import { cn } from "@/lib/utils"

<<<<<<< HEAD
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
=======
const OFFERS = [
  {
    code: "S1",
    name: "Essentiel",
    sub: "Sites en production sous 10 jours.",
    price: "À partir de",
    priceVal: "1 500 €",
    priceUnit: "forfait",
    flagship: false,
    target: "Artisans & Indépendants",
>>>>>>> 38f194d (maj)
    features: [
      "Site en ligne sous 10 jours",
      "100% responsive mobile",
      "SEO local optimise",
      "Design sur-mesure",
      "Hebergement 1 an inclus",
    ],
    proof: ["Lighthouse 90+", "Mise en ligne 10 j"],
  },
  {
<<<<<<< HEAD
    id: "expert",
=======
    code: "S2",
>>>>>>> 38f194d (maj)
    name: "Expert",
    sub: "Plateformes pensées pour convertir.",
    price: "À partir de",
    priceVal: "4 500 €",
    priceUnit: "projet",
    flagship: true,
    target: "PME & Startups",
<<<<<<< HEAD
    price: "A partir de 4 500 €",
    priceDetail: "Cle en main",
    highlighted: true,
=======
>>>>>>> 38f194d (maj)
    features: [
      "Architecture multi-pages",
      "UI/UX premium",
      "CMS autonome",
      "Integrations (CRM, Calendly...)",
      "SEO semantique avance",
      "Rapport mensuel",
    ],
    proof: ["Lighthouse 96+", "WCAG AA", "Conv. ×2.4 obs."],
  },
  {
<<<<<<< HEAD
    id: "surmesure",
=======
    code: "S3",
>>>>>>> 38f194d (maj)
    name: "Sur mesure",
    sub: "Accompagnement long-terme, personnalisé.",
    price: "Sur devis",
<<<<<<< HEAD
    priceDetail: "Selon perimetre",
    highlighted: false,
=======
    priceVal: "Custom",
    priceUnit: "selon périmètre",
    flagship: false,
    target: "ETI & Grands projets",
>>>>>>> 38f194d (maj)
    features: [
      "Architecture sur-mesure",
      "Integrations API complexes",
      "Design system proprietaire",
      "Accompagnement strategique",
      "SLA personnalise",
      "Scalabilite garantie",
    ],
<<<<<<< HEAD
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
=======
    proof: ["Roadmap trimestrielle", "WCAG AAA", "SLA 4 h"],
>>>>>>> 38f194d (maj)
  },
]

export function PricingSection() {
<<<<<<< HEAD
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
=======
  const [active, setActive] = useState("S2")

  return (
    <section id="prestations" className="border-t border-border" aria-labelledby="pricing-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">// 03</span>
          <h2 id="pricing-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
            Services — Le Bento
          </h2>
        </div>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          Trois offres · Une promesse mesurable
        </span>
>>>>>>> 38f194d (maj)
      </div>

      {/* Mobile tab selector */}
      <div className="lg:hidden flex border-b border-border">
        {OFFERS.map((o) => (
          <button
            key={o.code}
            onClick={() => setActive(o.code)}
            className={cn(
              "flex-1 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors border-r border-border last:border-r-0",
              active === o.code
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            {o.code} · {o.name}
          </button>
        ))}
      </div>

      {/* Cards — desktop: 3 cols / mobile: active one */}
      <div className="hidden lg:grid lg:grid-cols-3">
        {OFFERS.map((o, i) => <OfferCard key={o.code} offer={o} idx={i} />)}
      </div>
      <div className="lg:hidden">
        {OFFERS.filter((o) => o.code === active).map((o, i) => (
          <OfferCard key={o.code} offer={o} idx={i} />
        ))}
      </div>

      <p className="px-4 sm:px-6 lg:px-8 py-4 border-t border-border font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
        Tous les tarifs sont HT ·{" "}
        <Link href="#contact" className="text-accent hover:underline">
          Devis sur-mesure disponible
        </Link>
      </p>
    </section>
  )
}

function OfferCard({ offer, idx }: { offer: typeof OFFERS[number]; idx: number }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col p-6 lg:p-8 min-h-[520px] transition-colors",
        offer.flagship
          ? "bg-accent text-accent-foreground hover:bg-foreground hover:text-background"
          : "bento-hover",
        idx < 2 && "lg:border-r lg:border-border"
      )}
    >
      {/* Hover badge */}
      <span className="absolute top-[4.5rem] left-6 font-mono text-[9.5px] uppercase tracking-[0.06em] px-2 py-1 border border-current opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 delay-75 pointer-events-none">
        Offre {offer.code}
      </span>

      <div className="flex justify-between items-start mb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-70">// {offer.code}</span>
        <ArrowRight className="w-5 h-5 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
      </div>

      <div className="mb-6">
        <div className="text-[40px] sm:text-[48px] font-bold tracking-[-0.035em] leading-none mb-2">{offer.name}</div>
        <div className="text-[15px] opacity-80 leading-[1.4]">{offer.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-60 mt-2">{offer.target}</div>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1" role="list">
        {offer.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13.5px] leading-[1.45]">
            <span className="mt-[9px] w-2.5 h-px bg-current opacity-60 flex-shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {offer.proof.map((p) => (
          <span
            key={p}
            className="font-mono text-[9.5px] uppercase tracking-[0.06em] px-2 py-1 border border-current opacity-70"
          >
            {p}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-current/20 flex flex-col gap-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-60">{offer.price}</div>
        <div className="text-[26px] font-bold tracking-[-0.02em] leading-none">{offer.priceVal}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-60">/ {offer.priceUnit}</div>
        <Link
          href="#contact"
          className={cn(
            "mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors self-start border",
            offer.flagship
              ? "border-accent-foreground bg-accent-foreground text-accent hover:bg-transparent hover:text-accent-foreground"
              : "border-current hover:bg-foreground hover:text-background hover:border-foreground"
          )}
        >
          Démarrer <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
