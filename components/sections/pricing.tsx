"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Données — Offres projets ───────────────────────────────────────────────

const OFFERS = [
  {
    code: "S1",
    name: "Essentiel",
    sub: "En ligne sous 10 jours, sans compromis.",
    flagship: false,
    target: "Artisans & Indépendants",
    features: [
      "Site en ligne sous 10 jours",
      "100 % responsive mobile",
      "SEO local optimisé",
      "Design sur-mesure",
      "Hébergement 1 an inclus",
    ],
    proof: ["Lighthouse 90+", "Livraison 10 j"],
  },
  {
    code: "S2",
    name: "Expert",
    sub: "Conçu pour convertir, pas juste exister.",
    flagship: true,
    target: "PME & Startups",
    features: [
      "Architecture multi-pages",
      "UI/UX premium",
      "CMS autonome (Sanity)",
      "Intégrations (CRM, Calendly…)",
      "SEO sémantique avancé",
      "Rapport de performance",
    ],
    proof: ["Lighthouse 96+", "WCAG AA", "Conv. ×2.4 obs."],
  },
  {
    code: "S3",
    name: "Sur mesure",
    sub: "Quand aucune offre standard ne suffit.",
    flagship: false,
    target: "ETI & Grands projets",
    features: [
      "Architecture sur-mesure",
      "Intégrations API complexes",
      "Design system propriétaire",
      "Accompagnement stratégique",
      "SLA personnalisé",
      "Scalabilité garantie",
    ],
    proof: ["Roadmap trimestrielle", "WCAG AAA", "SLA 4 h"],
  },
]

// ─── Données — Abonnements ──────────────────────────────────────────────────
// TODO: ajuster les prix avec vos tarifs réels

const SUBSCRIPTIONS = [
  {
    code: "A1",
    name: "Sérénité",
    sub: "Votre site entre de bonnes mains.",
    flagship: false,
    target: "Tout client Mobem",
    price: "89",
    priceLabel: "€ HT / mois",
    commitment: "Mensuel · Résiliable",
    features: [
      "Mises à jour sécurité mensuelles",
      "Sauvegardes régulières",
      "Monitoring de disponibilité 24/7",
      "Rapport Lighthouse mensuel",
      "Bugs bloquants sous 48 h ouvrées",
    ],
    proof: ["SLA 48 h", "Rapport mensuel"],
  },
  {
    code: "A2",
    name: "Visibilité",
    sub: "Plus de trafic, plus de clients locaux.",
    flagship: false,
    target: "PME & Artisans",
    price: "149",
    priceLabel: "€ HT / mois",
    commitment: "Mensuel · Résiliable",
    features: [
      "1 article de blog / mois",
      "Suivi positionnement SEO (10 mots-clés)",
      "Optimisation Google My Business",
      "Audit SEO trimestriel",
      "Rapport SEO mensuel",
    ],
    proof: ["SEO local", "Blog pro"],
  },
  {
    code: "A3",
    name: "Croissance",
    sub: "Maintenance + visibilité + stratégie.",
    flagship: true,
    target: "Clients ambitieux",
    price: "249",
    priceLabel: "€ HT / mois",
    commitment: "Trimestriel · Sur devis annuel",
    features: [
      "Tout Sérénité inclus",
      "Tout Visibilité inclus",
      "Appel stratégique mensuel (1 h)",
      "Roadmap trimestrielle",
      "Recommandations CRO",
      "SLA prioritaire 24 h",
    ],
    proof: ["SLA 24 h", "Roadmap", "CRO"],
  },
]

// ─── Carte Offre projet ─────────────────────────────────────────────────────

function OfferCard({ offer, idx }: { offer: typeof OFFERS[number]; idx: number }) {
  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex flex-col px-8 py-10 lg:px-14 lg:py-14 lg:min-h-[600px] transition-colors overflow-hidden",
        offer.flagship
          ? "bg-accent text-accent-foreground"
          : "bento-hover",
        idx < 2 && "lg:border-r lg:border-border"
      )}
    >
      {/* Decorative background index */}
      <span
        className="absolute bottom-6 right-6 font-bold leading-none tracking-[-0.05em] select-none pointer-events-none tabular-nums text-[clamp(80px,10vw,130px)]"
        style={{ opacity: offer.flagship ? 0.07 : 0.04 }}
        aria-hidden="true"
      >
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] opacity-50">{offer.code}</span>
          {offer.flagship && (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 border border-current self-start">
              Recommandé
            </span>
          )}
        </div>
        <ArrowRight
          className="w-5 h-5 opacity-40 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 shrink-0 mt-1"
          aria-hidden="true"
        />
      </div>

      {/* Name */}
      <div className="mb-8">
        <div className="text-[clamp(48px,5.5vw,76px)] font-bold tracking-[-0.04em] leading-[0.9] mb-3">
          {offer.name}
        </div>
        <div className="text-[15px] leading-[1.45] opacity-75">{offer.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-50 mt-2">{offer.target}</div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1" role="list">
        {offer.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13.5px] leading-[1.5]">
            <span className="mt-[9px] w-2.5 h-px bg-current opacity-50 flex-shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {offer.proof.map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current opacity-50">
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-5 border-t border-current/15 flex flex-col gap-1.5">
        <div className="text-[24px] font-bold tracking-[-0.025em] leading-none">Sur devis</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-50">Devis gratuit · Réponse 24 h</div>
        <Link
          href="#contact"
          className={cn(
            "mt-5 inline-flex items-center gap-2.5 px-5 py-3 text-[13px] font-semibold transition-colors self-start border",
            offer.flagship
              ? "border-accent-foreground bg-accent-foreground text-accent hover:bg-transparent hover:text-accent-foreground"
              : "border-current cta-hover"
          )}
        >
          Démarrer un diagnostic
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ─── Carte Abonnement ───────────────────────────────────────────────────────

function SubCard({ sub, idx }: { sub: typeof SUBSCRIPTIONS[number]; idx: number }) {
  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex flex-col px-8 py-10 lg:px-12 lg:py-12 lg:min-h-[580px] transition-colors overflow-hidden",
        sub.flagship
          ? "bg-inverted text-inverted-foreground"
          : "bento-hover",
        idx < 2 && "lg:border-r lg:border-border"
      )}
    >
      {/* Decorative background index */}
      <span
        className="absolute bottom-6 right-6 font-bold leading-none tracking-[-0.05em] select-none pointer-events-none tabular-nums text-[clamp(80px,10vw,130px)]"
        style={{ opacity: sub.flagship ? 0.06 : 0.04 }}
        aria-hidden="true"
      >
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] opacity-50">{sub.code}</span>
          {sub.flagship && (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 border border-current self-start">
              Recommandé
            </span>
          )}
        </div>
        <ArrowRight
          className="w-5 h-5 opacity-40 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 shrink-0 mt-1"
          aria-hidden="true"
        />
      </div>

      {/* Name */}
      <div className="mb-8">
        <div className="text-[clamp(40px,4.5vw,64px)] font-bold tracking-[-0.04em] leading-[0.9] mb-3">
          {sub.name}
        </div>
        <div className="text-[15px] leading-[1.45] opacity-75">{sub.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-50 mt-2">{sub.target}</div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1" role="list">
        {sub.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13.5px] leading-[1.5]">
            <span className="mt-[9px] w-2.5 h-px bg-current opacity-50 flex-shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {sub.proof.map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current opacity-50">
            {p}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="pt-5 border-t border-current/15 flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-50 mb-1 block">À partir de</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.04em] leading-none">{sub.price}€</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] opacity-60 ml-1">HT / mois</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-40">{sub.commitment}</div>
        <Link
          href="#contact"
          className={cn(
            "mt-5 inline-flex items-center gap-2.5 px-5 py-3 text-[13px] font-semibold transition-colors self-start border",
            sub.flagship
              ? "border-inverted-foreground bg-inverted-foreground text-inverted hover:bg-transparent hover:text-inverted-foreground"
              : "border-current cta-hover"
          )}
        >
          Démarrer
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ─── Section principale ─────────────────────────────────────────────────────

export function PricingSection() {
  const [tab, setTab]         = useState<"offres" | "abonnements">("offres")
  const [activeOffer, setActiveOffer]   = useState("S2")
  const [activeSub, setActiveSub]       = useState("A3")

  return (
    <section id="prestations" className="border-t border-border" aria-labelledby="pricing-heading">

      {/* Section label */}
      <div className="px-4 sm:px-6 lg:px-8 py-5 lg:py-6 border-b border-border">
        <h2 id="pricing-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
          Services &amp; Abonnements
        </h2>
      </div>

      {/* Tab selector — éditorial large format */}
      <div className="grid grid-cols-2 border-b border-border" role="tablist" aria-label="Type de prestation">
        <button
          role="tab"
          data-cursor="hover"
          aria-selected={tab === "offres"}
          aria-controls="panel-offres"
          onClick={() => setTab("offres")}
          className={cn(
            "group flex flex-col gap-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 text-left border-r border-border transition-colors",
            tab === "offres"
              ? "bg-foreground text-background"
              : "hover:bg-secondary"
          )}
        >
          <span className={cn("font-mono text-[11px] uppercase tracking-[0.08em]", tab === "offres" ? "text-background/50" : "text-muted-foreground")}>
            01
          </span>
          <span className="text-[clamp(20px,2.5vw,28px)] font-bold tracking-[-0.025em] leading-none">Offres</span>
          <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em]", tab === "offres" ? "text-background/45" : "text-muted-foreground")}>
            Sites web · Projets uniques
          </span>
        </button>
        <button
          role="tab"
          data-cursor="hover"
          aria-selected={tab === "abonnements"}
          aria-controls="panel-abonnements"
          onClick={() => setTab("abonnements")}
          className={cn(
            "group flex flex-col gap-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 text-left transition-colors",
            tab === "abonnements"
              ? "bg-foreground text-background"
              : "hover:bg-secondary"
          )}
        >
          <span className={cn("font-mono text-[11px] uppercase tracking-[0.08em]", tab === "abonnements" ? "text-background/50" : "text-muted-foreground")}>
            02
          </span>
          <span className="text-[clamp(20px,2.5vw,28px)] font-bold tracking-[-0.025em] leading-none">Abonnements</span>
          <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em]", tab === "abonnements" ? "text-background/45" : "text-muted-foreground")}>
            Maintenance · SEO · Croissance
          </span>
        </button>
      </div>

      {/* ── Panel Offres ── */}
      <div id="panel-offres" role="tabpanel" hidden={tab !== "offres"}>
        {/* Mobile selector */}
        <div className="lg:hidden flex border-b border-border" role="tablist">
          {OFFERS.map((o) => (
            <button
              key={o.code}
              role="tab"
              aria-selected={activeOffer === o.code}
              onClick={() => setActiveOffer(o.code)}
              className={cn(
                "flex-1 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors border-r border-border last:border-r-0",
                activeOffer === o.code ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {o.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1fr_1.15fr_1fr]">
          {OFFERS.map((o, i) => <OfferCard key={o.code} offer={o} idx={i} />)}
        </div>
        <div className="lg:hidden">
          {OFFERS.filter((o) => o.code === activeOffer).map((o, i) => (
            <OfferCard key={o.code} offer={o} idx={i} />
          ))}
        </div>
      </div>

      {/* ── Panel Abonnements ── */}
      <div id="panel-abonnements" role="tabpanel" hidden={tab !== "abonnements"}>
        {/* Mobile selector */}
        <div className="lg:hidden flex border-b border-border" role="tablist">
          {SUBSCRIPTIONS.map((s) => (
            <button
              key={s.code}
              role="tab"
              aria-selected={activeSub === s.code}
              onClick={() => setActiveSub(s.code)}
              className={cn(
                "flex-1 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.05em] transition-colors border-r border-border last:border-r-0",
                activeSub === s.code ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1.1fr]">
          {SUBSCRIPTIONS.map((s, i) => <SubCard key={s.code} sub={s} idx={i} />)}
        </div>
        <div className="lg:hidden">
          {SUBSCRIPTIONS.filter((s) => s.code === activeSub).map((s, i) => (
            <SubCard key={s.code} sub={s} idx={i} />
          ))}
        </div>
      </div>

    </section>
  )
}
