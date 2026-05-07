"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
    features: [
      "Site en ligne sous 10 jours",
      "100% responsive mobile",
      "SEO local optimisé",
      "Design sur-mesure",
      "Hébergement 1 an inclus",
    ],
    proof: ["Lighthouse 90+", "Mise en ligne 10 j"],
  },
  {
    code: "S2",
    name: "Expert",
    sub: "Plateformes pensées pour convertir.",
    price: "À partir de",
    priceVal: "4 500 €",
    priceUnit: "projet",
    flagship: true,
    target: "PME & Startups",
    features: [
      "Architecture multi-pages",
      "UI/UX premium",
      "CMS autonome",
      "Intégrations (CRM, Calendly...)",
      "SEO sémantique avancé",
      "Rapport mensuel",
    ],
    proof: ["Lighthouse 96+", "WCAG AA", "Conv. ×2.4 obs."],
  },
  {
    code: "S3",
    name: "Sur mesure",
    sub: "Accompagnement long-terme, personnalisé.",
    price: "Sur devis",
    priceVal: "Custom",
    priceUnit: "selon périmètre",
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

const CAPS = [
  { k: "Performance", v: "< 1.5s", d: "LCP moyen sur mobile", proof: "Core Web Vitals" },
  { k: "Accessibilité", v: "WCAG AA", d: "Conforme RGAA", proof: "Axe audit" },
  { k: "SEO", v: "100 / 100", d: "Score Lighthouse SEO", proof: "Google PSI" },
  { k: "Sécurité", v: "A+", d: "Headers & TLS A+", proof: "Mozilla Observatory" },
]

export function PricingSection() {
  const [active, setActive] = useState("S2")

  return (
    <section id="prestations" className="border-t border-border" aria-labelledby="pricing-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <h2 id="pricing-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
          Services
        </h2>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          Trois offres · Une promesse mesurable
        </span>
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

      {/* Capacités transverses */}
      <div className="border-t border-border">
        <div className="flex justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">Capacités transverses</span>
        </div>
        <div className="overflow-x-auto sm:overflow-visible scrollbar-none">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border min-w-max sm:min-w-0">
          {CAPS.map((c) => (
            <div
              key={c.k}
              data-cursor="hover"
              className="bento-hover w-[220px] sm:w-auto border-r border-b border-border flex flex-col gap-3 p-6 min-h-[180px]"
            >
              <div className="flex justify-end items-start">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M7 17 L17 7"/><path d="M9 7 H17 V15"/>
                </svg>
              </div>
              <div className="text-[22px] font-bold tracking-[-0.02em] mt-2">{c.v}</div>
              <div className="text-[12px] text-muted-foreground">{c.d}</div>
              <div className="mt-auto text-[11px] font-semibold text-accent">● {c.proof}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

    </section>
  )
}

function OfferCard({ offer, idx }: { offer: typeof OFFERS[number]; idx: number }) {
  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex flex-col p-6 lg:p-8 min-h-[520px] transition-colors",
        offer.flagship
          ? "bg-accent text-accent-foreground cta-hover"
          : "bento-hover",
        idx < 2 && "lg:border-r lg:border-border"
      )}
    >
      <div className="flex justify-end items-start mb-8">
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
              : "border-current cta-hover"
          )}
        >
          Démarrer <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
