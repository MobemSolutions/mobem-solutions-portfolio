"use client"

import { useState } from "react"
import { Zap, Sparkles, Shield, Check, ArrowRight, BadgeCheck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const MONTHLY = 149
const ANNUAL_MONTHLY = Math.round(MONTHLY * 0.8)

type Pack = {
  id: string
  icon: React.ElementType
  name: string
  tagline: string
  target: string
  price?: string
  priceDetail?: string
  cta: string
  highlighted: boolean
  badge: string | null
  lighthouseGuarantee: boolean
  features: string[]
}

const packs: Pack[] = [
  {
    id: "essentiel",
    icon: Zap,
    name: "Essentiel",
    tagline: "Le starter",
    target: "Artisans & Indépendants",
    price: "À partir de 1 500 €",
    priceDetail: "Tarif unique · pas d'abonnement",
    cta: "Démarrer mon projet",
    highlighted: false,
    badge: null,
    lighthouseGuarantee: true,
    features: [
      "Votre site en ligne sous 10 jours",
      "100 % lisible sur mobile & tablette",
      "Trouvé par vos clients locaux (SEO local)",
      "Design professionnel sur-mesure",
      "Hébergement inclus la 1ère année",
    ],
  },
  {
    id: "expert",
    icon: Sparkles,
    name: "Expert",
    tagline: "Le fleuron",
    target: "PME & Startups",
    price: "À partir de 4 500 €",
    priceDetail: "Tarif unique · livraison clé en main",
    cta: "Construire ma solution",
    highlighted: true,
    badge: "Recommandé",
    lighthouseGuarantee: true,
    features: [
      "Architecture multi-pages évolutive",
      "UI/UX premium qui convertit",
      "Gestion de contenu en autonomie",
      "Connexion à vos outils (CRM, Calendly…)",
      "SEO sémantique avancé",
      "Rapport de performance mensuel",
    ],
  },
  {
    id: "serenite",
    icon: Shield,
    name: "Sérénité",
    tagline: "Le récurrent",
    target: "Maintenance & Croissance",
    cta: "Activer ma maintenance",
    highlighted: false,
    badge: null,
    lighthouseGuarantee: false,
    features: [
      "Hébergement Vercel haute disponibilité",
      "Sauvegardes quotidiennes automatiques",
      "Modifications illimitées (petits ajustements)",
      "Rapport mensuel de performance",
      "Support dédié sous 24h/48h",
    ],
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [activePack, setActivePack] = useState("expert")

  const serenitePrice = isAnnual ? ANNUAL_MONTHLY : MONTHLY

  const renderCard = (pack: Pack) => {
    const hl = pack.highlighted
    return (
      <article
        key={pack.id}
        className={cn(
          "relative rounded-2xl border flex flex-col p-6 lg:p-8 transition-all duration-300",
          hl
            ? "bg-card border-accent shadow-2xl shadow-accent/10 ring-1 ring-accent lg:scale-105 lg:-translate-y-2"
            : "bg-card border-border"
        )}
      >
        {pack.badge && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              {pack.badge}
            </span>
          </div>
        )}

        <div className={cn(
          "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4",
          hl ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"
        )}>
          <pack.icon className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg lg:text-xl font-bold text-foreground">{pack.name}</h3>
            <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5 whitespace-nowrap">
              {pack.tagline}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Pour les <span className="font-medium text-foreground">{pack.target}</span>
          </p>
        </div>

        <div className="mb-5 pb-5 border-b border-border">
          {pack.id === "serenite" ? (
            <>
              <div
                className="flex items-center gap-3 mb-3"
                role="group"
                aria-label="Fréquence de facturation"
              >
                <span
                  className={cn(
                    "text-sm font-medium transition-colors cursor-pointer select-none",
                    !isAnnual ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsAnnual(false)}
                >
                  Mensuel
                </span>
                <button
                  role="switch"
                  aria-checked={isAnnual}
                  aria-label="Basculer vers facturation annuelle"
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    isAnnual ? "bg-accent" : "bg-border"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200",
                      isAnnual ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors cursor-pointer select-none flex items-center gap-1.5",
                    isAnnual ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsAnnual(true)}
                >
                  Annuel
                  <span className="text-xs bg-accent/15 text-accent px-1.5 py-0.5 rounded-full font-semibold">
                    −20 %
                  </span>
                </span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-foreground">{serenitePrice} €</span>
                <span className="text-muted-foreground mb-1.5 ml-1">/mois</span>
              </div>
              {isAnnual && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  Facturé {serenitePrice * 12} €/an ·{" "}
                  <span className="text-accent font-medium">2 mois offerts</span>
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{pack.price}</p>
              <p className="text-sm text-muted-foreground">{pack.priceDetail}</p>
            </>
          )}
        </div>

        <ul className="space-y-2.5 mb-5 flex-1" role="list">
          {pack.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <Check
                className={cn("w-4 h-4 mt-0.5 flex-shrink-0", hl ? "text-accent" : "text-muted-foreground")}
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {pack.lighthouseGuarantee && (
          <div className="flex items-center gap-2.5 mb-5 p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
            <BadgeCheck className="w-4 h-4 text-chart-4 flex-shrink-0" aria-hidden="true" />
            <p className="text-xs text-chart-4 font-medium">Performance Lighthouse garantie (score vert)</p>
          </div>
        )}

        <Button
          asChild
          size="lg"
          className={cn(
            "w-full font-semibold mt-auto",
            hl
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "bg-secondary text-foreground hover:bg-muted border border-border"
          )}
        >
          <Link href="#contact">
            {pack.cta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </article>
    )
  }

  return (
    <section id="prestations" className="py-14 lg:py-32" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8 lg:mb-20">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
            Offres & Tarifs
          </span>
          <h2 id="pricing-heading" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="text-balance">
              Des packs conçus pour{" "}
              <span className="text-accent">chaque étape de votre croissance</span>
            </span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pas d&apos;abonnements cachés, pas de mauvaises surprises. Des offres claires,
            des résultats mesurables.
          </p>
        </div>

        {/* Mobile + tablettes: tab switcher + single card */}
        <div className="xl:hidden">
          <div
            className="flex bg-secondary rounded-2xl p-1 gap-1 mb-6"
            role="tablist"
            aria-label="Choisir un pack"
          >
            {packs.map((pack) => (
              <button
                key={pack.id}
                role="tab"
                aria-selected={activePack === pack.id}
                onClick={() => setActivePack(pack.id)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  activePack === pack.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pack.name}
                {pack.badge && (
                  <span className="ml-1 text-accent">✦</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-6">
            {packs.filter((p) => p.id === activePack).map(renderCard)}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-8 items-start">
          {packs.map(renderCard)}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 lg:mt-12">
          Tous les tarifs sont{" "}
          <strong className="text-foreground font-semibold">HT</strong>.
          {" "}Devis sur-mesure disponible —{" "}
          <Link href="#contact" className="text-accent hover:underline">
            parlons de votre projet
          </Link>.
        </p>
      </div>
    </section>
  )
}
