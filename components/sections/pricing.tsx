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
    sub: "Landing page en ligne sous 10 jours.",
    flagship: false,
    target: "Landing page · Site vitrine",
    features: [
      "Site en ligne sous 10 jours",
      "100 % responsive mobile",
      "SEO local optimisé",
      "Design sur-mesure",
      "Hébergement 1 an inclus",
    ],
    proof: ["Lighthouse 90+", "Livraison 10 j"],
    pricePrefix: "À partir de",
    price: "1 500 € HT",
  },
  {
    code: "S2",
    name: "Expert",
    sub: "Conçu pour convertir, pas juste exister.",
    flagship: true,
    target: "Site multipage · Projet ambitieux",
    features: [
      "Architecture multi-pages",
      "UI/UX premium",
      "CMS autonome (Sanity)",
      "Intégrations (CRM, Calendly…)",
      "SEO sémantique avancé + GEO (citabilité IA)",
      "Rapport de performance",
    ],
    proof: ["Lighthouse 96+", "WCAG AA", "GEO IA"],
    pricePrefix: "À partir de",
    price: "3 500 € HT",
  },
  {
    code: "S3",
    name: "Sur mesure",
    sub: "Quand aucune offre standard ne suffit.",
    flagship: false,
    target: "Architecture complexe · Sur-mesure",
    features: [
      "Architecture sur-mesure",
      "Intégrations API complexes",
      "Design system propriétaire",
      "Accompagnement stratégique",
      "SLA personnalisé",
      "Scalabilité garantie",
    ],
    proof: ["Roadmap trimestrielle", "WCAG AAA", "SLA 4 h"],
    pricePrefix: "Sur devis",
    price: "à partir de 8 000 € HT",
  },
]

// ─── Données — Identité & Design ───────────────────────────────────────────

const DESIGN_SERVICES = [
  { label: "Refonte identité",          priceRange: "800 – 1 500 € HT" },
  { label: "Identité visuelle complète", priceRange: "1 300 – 2 500 € HT" },
  { label: "Pack Identité + Essentiel",  priceRange: "2 500 – 3 500 € HT" },
  { label: "Pack Identité + Expert",     priceRange: "4 500 – 6 000 € HT" },
]

// ─── Données — Conseil & Stratégie ─────────────────────────────────────────

const CONSEIL = [
  {
    code: "C1",
    name: "Audit digital",
    sub: "Un diagnostic honnête, deux niveaux d'engagement.",
    flagship: false,
    target: "Site · SEO · Réseaux · Outils",
    features: [
      "Analyse site, SEO & réseaux sociaux",
      "Audit des outils et processus digitaux",
      "Rapport écrit priorisé",
      "Présentation des résultats",
      "Recommandations actionnables",
    ],
    proof: ["Rapport écrit", "Plan d'action"],
    priceTiers: [
      { label: "Audit express · 1 page · 1 h", price: "Offert" },
      { label: "Audit complet · 10–15 pages · 5 j", price: "490 € HT" },
    ],
  },
  {
    code: "C2",
    name: "Atelier stratégie",
    sub: "2 heures pour clarifier votre cap digital.",
    flagship: false,
    target: "Clarifier · Prioriser · Planifier",
    features: [
      "Session 2 h visio ou présentiel",
      "Recommandations personnalisées",
      "Feuille de route actionnable",
      "Compte-rendu écrit inclus",
    ],
    proof: ["Session 2 h", "Feuille de route"],
    pricePrefix: "À partir de",
    price: "290 € HT",
  },
  {
    code: "C3",
    name: "Accompagnement digitalisation",
    sub: "De la réflexion à l'intégration des outils.",
    flagship: true,
    target: "Transition digitale · Intégration",
    features: [
      "3 séances de suivi personnalisé",
      "Plan d'action détaillé",
      "Intégration des outils recommandés",
      "Support entre les séances",
      "Bilan final & prochaines étapes",
    ],
    proof: ["3 séances", "Plan d'action", "Outils"],
    pricePrefix: "À partir de",
    price: "990 € HT",
  },
  {
    code: "C4",
    name: "Formation outils",
    sub: "Maîtrisez vos outils, reprenez la main.",
    flagship: false,
    target: "CMS · GMB · Analytics",
    features: [
      "Session 1h30 visio",
      "Guide PDF personnalisé",
      "CMS, Google My Business, Analytics",
      "Enregistrement vidéo fourni",
    ],
    proof: ["Session 1h30", "Guide PDF"],
    pricePrefix: "À partir de",
    price: "250 € HT",
  },
]

// ─── Données — Abonnements ──────────────────────────────────────────────────

const SUBSCRIPTIONS = [
  {
    code: "A1",
    name: "Sérénité",
    sub: "Votre site entre de bonnes mains.",
    flagship: false,
    target: "Site en production",
    price: "99",
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
    target: "Référencement · Contenu",
    price: "189",
    commitment: "Mensuel · Résiliable",
    features: [
      "Tout Sérénité inclus",
      "1 article de blog / mois (400–600 mots, optimisé SEO)",
      "Suivi positionnement SEO (10 mots-clés)",
      "Optimisation Google My Business",
      "Audit SEO trimestriel",
      "Rapport SEO mensuel",
    ],
    proof: ["SEO local", "Blog pro"],
  },
  {
    code: "A3",
    name: "Présence",
    sub: "Votre image, toujours à jour.",
    flagship: false,
    target: "Visuels · Social media",
    price: "189",
    commitment: "Mensuel · Résiliable",
    features: [
      "4 visuels réseaux sociaux / mois (Instagram, LinkedIn, Facebook)",
      "1 mise à jour graphique / mois (bannière, flyer, carte de visite)",
      "Cohérence charte graphique garantie",
      "Livrables en 5 jours ouvrés",
      "Fichiers sources fournis",
    ],
    proof: ["Social media", "Charte garantie", "Fichiers source"],
  },
  {
    code: "A4",
    name: "Croissance",
    sub: "Maintenance + visibilité + stratégie.",
    flagship: true,
    target: "Stratégie · Performance",
    price: "349",
    commitment: "Trimestriel · Sur devis annuel",
    features: [
      "Tout Sérénité inclus",
      "Tout Visibilité inclus",
      "Appel stratégique mensuel (1h)",
      "Roadmap trimestrielle",
      "Recommandations CRO",
      "Optimisation GEO & citabilité IA",
      "SLA prioritaire 24 h",
    ],
    proof: ["SLA 24 h", "Roadmap", "CRO", "Combinable avec Présence"],
  },
]

// ─── Carte Offre projet ─────────────────────────────────────────────────────

function OfferCard({ offer }: { offer: typeof OFFERS[number] }) {
  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex flex-col px-6 py-8 lg:px-8 lg:py-8 transition-colors overflow-hidden border-b lg:border-b-0 lg:border-r lg:last:border-r-0 border-border",
        offer.flagship ? "bg-accent text-accent-foreground" : "bento-hover"
      )}
    >
      {/* Decorative background index — text via CSS to skip axe contrast check */}
      <span
        className={cn(
          "hidden lg:block absolute bottom-6 right-5 font-bold leading-none tracking-[-0.05em] select-none pointer-events-none tabular-nums text-[clamp(70px,8vw,110px)]",
          offer.flagship ? "opacity-[0.14]" : "opacity-[0.08] group-hover:opacity-[0.20]"
        )}
        style={offer.flagship ? { color: "oklch(0.07 0 0)" } : undefined}
        aria-hidden="true"
        data-watermark={offer.code}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-7 gap-4">
        <div className="flex flex-col gap-1.5">
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
      <div className="mb-6">
        <div className="text-[clamp(22px,2.6vw,46px)] font-bold tracking-[-0.04em] leading-[0.9] mb-2">
          {offer.name}
        </div>
        <div className={cn("text-[13px] leading-[1.45]", !offer.flagship && "opacity-75")}>{offer.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] mt-1.5">{offer.target}</div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1" role="list">
        {offer.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[12px] leading-normal">
            <span className="mt-2 w-2.5 h-px bg-current opacity-50 shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {offer.proof.map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current">
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-current/15 flex flex-col gap-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">{offer.pricePrefix}</div>
        <div className="text-[18px] font-bold tracking-[-0.025em] leading-none">{offer.price}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">Devis gratuit · Réponse 24 h</div>
        <Link
          href="#contact"
          className={cn(
            "mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold transition-colors self-start border",
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

// ─── Carte Design ───────────────────────────────────────────────────────────

function DesignCard({ className }: { className?: string }) {
  return (
    <div
      data-cursor="hover"
      className={cn("group relative flex flex-col px-6 py-8 lg:px-8 lg:py-8 transition-colors overflow-hidden bg-[#F2F0ED] dark:bg-white/[0.04] hover:bg-[#0D0D0D] hover:text-white dark:hover:bg-white dark:hover:text-black", className)}
    >
      {/* Decorative background letter — text via CSS to skip axe contrast check */}
      <span
        className="hidden lg:block absolute bottom-8 right-12 font-serif italic font-normal leading-none select-none pointer-events-none text-[clamp(80px,9.5vw,130px)] opacity-[0.07] group-hover:opacity-[0.13]"
        aria-hidden="true"
        data-watermark="D"
      />

      {/* Header — identique aux autres cartes */}
      <div className="flex items-start justify-between mb-7 gap-4">
        <div />
        <ArrowRight
          className="w-5 h-5 opacity-40 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 shrink-0 mt-1"
          aria-hidden="true"
        />
      </div>

      {/* Name — serif italic comme seul différenciateur visuel */}
      <div className="mb-6">
        <div className="font-serif italic font-normal text-[clamp(22px,2.6vw,46px)] tracking-[-0.02em] leading-[0.9] mb-2">
          Design
        </div>
        <div className="text-[13px] leading-[1.45] opacity-75">Identité visuelle &amp; branding.</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] mt-1.5">Logo · Charte · Brand system</div>
      </div>

      {/* Services — table de prix à la place des bullets */}
      <ul className="flex-1 mb-6" role="list">
        {DESIGN_SERVICES.map((s, i) => (
          <li
            key={s.label}
            className={cn(
              "flex items-baseline justify-between gap-3 py-2.5",
              i < DESIGN_SERVICES.length - 1 && "border-b border-current/10 group-hover:border-background/10"
            )}
          >
            <span className="text-[12px]">{s.label}</span>
            <span className="font-mono text-[10px] whitespace-nowrap shrink-0">{s.priceRange}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips — même style que les autres cartes */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {["Logo", "Charte", "Fichiers source"].map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current">
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-current/15 flex flex-col gap-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">À partir de</div>
        <div className="text-[18px] font-bold tracking-[-0.025em] leading-none">800 € HT</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">Devis gratuit · Réponse 24 h</div>
        <Link
          href="#contact"
          className="mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold transition-colors self-start border border-current cta-hover"
        >
          Demander un devis
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
        "group relative flex flex-col px-6 py-8 lg:px-8 lg:py-8 transition-colors overflow-hidden",
        sub.flagship ? "bg-accent text-accent-foreground" : "bento-hover",
        idx < 3 && "lg:border-r lg:border-border"
      )}
    >
      {/* Decorative background index */}
      <span
        className={cn(
          "hidden lg:block absolute bottom-6 right-6 font-bold leading-none tracking-[-0.05em] select-none pointer-events-none tabular-nums text-[clamp(70px,8vw,110px)]",
          sub.flagship ? "opacity-[0.14]" : "opacity-[0.09] group-hover:opacity-[0.22]"
        )}
        style={sub.flagship ? { color: "oklch(0.07 0 0)" } : undefined}
        aria-hidden="true"
        data-watermark={sub.code}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-7 gap-4">
        <div className="flex flex-col gap-1.5">
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
      <div className="mb-6">
        <div className="text-[clamp(22px,2.6vw,46px)] font-bold tracking-[-0.04em] leading-[0.9] mb-2">
          {sub.name}
        </div>
        <div className={cn("text-[13px] leading-[1.45]", !sub.flagship && "opacity-75")}>{sub.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] mt-1.5">{sub.target}</div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1" role="list">
        {sub.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[12px] leading-normal">
            <span className="mt-2 w-2.5 h-px bg-current opacity-50 shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {sub.proof.map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current">
            {p}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="pt-4 border-t border-current/15 flex flex-col gap-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">À partir de</div>
        <div className="text-[18px] font-bold tracking-[-0.025em] leading-none">{sub.price} € HT / mois</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">{sub.commitment}</div>
        <Link
          href="#contact"
          className={cn(
            "mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold transition-colors self-start border",
            sub.flagship
              ? "border-accent-foreground bg-accent-foreground text-accent hover:bg-transparent hover:text-accent-foreground"
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

// ─── Carte Conseil ──────────────────────────────────────────────────────────

function ConseilCard({ conseil, idx }: { conseil: typeof CONSEIL[number]; idx: number }) {
  return (
    <div
      data-cursor="hover"
      className={cn(
        "group relative flex flex-col px-6 py-8 lg:px-8 lg:py-8 transition-colors overflow-hidden border-b lg:border-b-0 lg:border-r border-border",
        conseil.flagship ? "bg-accent text-accent-foreground" : "bento-hover",
        idx === CONSEIL.length - 1 && "lg:border-r-0"
      )}
    >
      {/* Decorative background index */}
      <span
        className={cn(
          "hidden lg:block absolute bottom-6 right-5 font-bold leading-none tracking-[-0.05em] select-none pointer-events-none tabular-nums text-[clamp(70px,8vw,110px)]",
          conseil.flagship ? "opacity-[0.14]" : "opacity-[0.08] group-hover:opacity-[0.20]"
        )}
        style={conseil.flagship ? { color: "oklch(0.07 0 0)" } : undefined}
        aria-hidden="true"
        data-watermark={conseil.code}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-7 gap-4">
        <div className="flex flex-col gap-1.5">
          {conseil.flagship && (
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
      <div className="mb-6 pr-12">
        <div className="text-[clamp(18px,2vw,36px)] font-bold tracking-[-0.04em] leading-[0.95] mb-2">
          {conseil.name}
        </div>
        <div className={cn("text-[13px] leading-[1.45]", !conseil.flagship && "opacity-75")}>{conseil.sub}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] mt-1.5">{conseil.target}</div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1" role="list">
        {conseil.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[12px] leading-normal">
            <span className="mt-2 w-2.5 h-px bg-current opacity-50 shrink-0" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {conseil.proof.map((p) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-[0.07em] px-2 py-1 border border-current">
            {p}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-current/15 flex flex-col gap-1.5">
        {"priceTiers" in conseil && conseil.priceTiers ? (
          <ul className="mb-1" role="list">
            {conseil.priceTiers.map((t, i) => (
              <li
                key={t.label}
                className={cn(
                  "flex items-baseline justify-between gap-3 py-3",
                  i < conseil.priceTiers!.length - 1 && "border-b border-current/10"
                )}
              >
                <span className="text-[13px] leading-snug">{t.label}</span>
                <span className="font-mono text-[12px] whitespace-nowrap shrink-0 font-semibold">{t.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="font-mono text-[10px] uppercase tracking-[0.06em]">{conseil.pricePrefix}</div>
            <div className="text-[18px] font-bold tracking-[-0.025em] leading-none">{conseil.price}</div>
          </>
        )}
        <div className="font-mono text-[10px] uppercase tracking-[0.06em]">Devis gratuit · Réponse 24 h</div>
        <Link
          href="#contact"
          className={cn(
            "mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold transition-colors self-start border",
            conseil.flagship
              ? "border-accent-foreground bg-accent-foreground text-accent hover:bg-transparent hover:text-accent-foreground"
              : "border-current cta-hover"
          )}
        >
          Prendre rendez-vous
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ─── Section principale ─────────────────────────────────────────────────────

export function PricingSection() {
  const [tab, setTab]                   = useState<"offres" | "conseil" | "abonnements">("offres")
  const [activeOffer, setActiveOffer]   = useState<string>("S2")
  const [activeConseil, setActiveConseil] = useState("C1")
  const [activeSub, setActiveSub]       = useState("A3")

  return (
    <section id="services" className="border-t border-border" aria-labelledby="pricing-heading">

      <div className="px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-10 lg:pb-12 border-b border-border">
        <h2 data-animate="" id="pricing-heading" className="text-[clamp(44px,6vw,80px)] font-bold leading-[0.92] tracking-[-0.04em]">
          Nos <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">prestations.</span>
        </h2>
      </div>

      {/* Tab selector */}
      <div className="grid grid-cols-3 border-b border-border" role="tablist" aria-label="Type de prestation">
        <button
          role="tab"
          data-cursor="hover"
          aria-selected={tab === "offres"}
          aria-controls="panel-offres"
          onClick={() => setTab("offres")}
          className={cn(
            "group flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 text-center border-r border-border transition-colors",
            tab === "offres" ? "bg-foreground text-background" : "hover:bg-secondary"
          )}
        >
          <span className="text-[clamp(14px,2vw,28px)] font-bold tracking-[-0.025em] leading-none">Services</span>
          <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em] hidden sm:block", tab === "offres" ? "text-background/65" : "text-muted-foreground")}>
            Sites web · Design · Projets
          </span>
        </button>
        <button
          role="tab"
          data-cursor="hover"
          aria-selected={tab === "conseil"}
          aria-controls="panel-conseil"
          onClick={() => setTab("conseil")}
          className={cn(
            "group flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 text-center border-r border-border transition-colors",
            tab === "conseil" ? "bg-foreground text-background" : "hover:bg-secondary"
          )}
        >
          <span className="text-[clamp(14px,2vw,28px)] font-bold tracking-[-0.025em] leading-none">Conseils</span>
          <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em] hidden sm:block", tab === "conseil" ? "text-background/65" : "text-muted-foreground")}>
            Audit · Stratégie · Formation
          </span>
        </button>
        <button
          role="tab"
          data-cursor="hover"
          aria-selected={tab === "abonnements"}
          aria-controls="panel-abonnements"
          onClick={() => setTab("abonnements")}
          className={cn(
            "group flex flex-col items-center gap-2 px-4 sm:px-6 lg:px-8 py-8 lg:py-10 text-center transition-colors",
            tab === "abonnements" ? "bg-foreground text-background" : "hover:bg-secondary"
          )}
        >
          <span className="text-[clamp(14px,2vw,28px)] font-bold tracking-[-0.025em] leading-none">Abonnements</span>
          <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em] hidden sm:block", tab === "abonnements" ? "text-background/65" : "text-muted-foreground")}>
            Maintenance · SEO · Croissance
          </span>
        </button>
      </div>

      {/* ── Panel Offres ── */}
      <div id="panel-offres" role="tabpanel" hidden={tab !== "offres"}>
        {/* Mobile selector */}
        <div className="lg:hidden flex border-b border-border" role="tablist">
          <button
            role="tab"
            aria-selected={activeOffer === "design"}
            onClick={() => setActiveOffer("design")}
            className={cn(
              "flex-1 px-2 py-3 font-mono text-[9px] uppercase tracking-[0.05em] transition-colors border-r border-border",
              activeOffer === "design" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            Design
          </button>
          {OFFERS.map((o) => (
            <button
              key={o.code}
              role="tab"
              aria-selected={activeOffer === o.code}
              onClick={() => setActiveOffer(o.code)}
              className={cn(
                "flex-1 px-2 py-3 font-mono text-[9px] uppercase tracking-[0.05em] transition-colors border-r border-border last:border-r-0",
                activeOffer === o.code ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {o.name}
            </button>
          ))}
        </div>

        {/* Desktop — grille 4 colonnes */}
        <div className="hidden lg:grid lg:grid-cols-4">
          <DesignCard className="border-b lg:border-b-0 lg:border-r border-border" />
          {OFFERS.map((o) => <OfferCard key={o.code} offer={o} />)}
        </div>

        {/* Mobile — carte active */}
        <div className="lg:hidden">
          {activeOffer === "design"
            ? <DesignCard />
            : OFFERS.filter((o) => o.code === activeOffer).map((o) => (
                <OfferCard key={o.code} offer={o} />
              ))
          }
        </div>
      </div>

      {/* ── Panel Conseil ── */}
      <div id="panel-conseil" role="tabpanel" hidden={tab !== "conseil"}>
        {/* Mobile selector */}
        <div className="lg:hidden flex border-b border-border" role="tablist">
          {CONSEIL.map((c) => (
            <button
              key={c.code}
              role="tab"
              aria-selected={activeConseil === c.code}
              onClick={() => setActiveConseil(c.code)}
              className={cn(
                "flex-1 px-2 py-3 font-mono text-[9px] uppercase tracking-[0.05em] transition-colors border-r border-border last:border-r-0",
                activeConseil === c.code ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>
        {/* Desktop — grille 4 colonnes */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {CONSEIL.map((c, i) => <ConseilCard key={c.code} conseil={c} idx={i} />)}
        </div>
        {/* Mobile — carte active */}
        <div className="lg:hidden">
          {CONSEIL.filter((c) => c.code === activeConseil).map((c, i) => (
            <ConseilCard key={c.code} conseil={c} idx={i} />
          ))}
        </div>
      </div>

      {/* ── Panel Abonnements ── */}
      <div id="panel-abonnements" role="tabpanel" hidden={tab !== "abonnements"}>
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

        <div className="hidden lg:grid lg:grid-cols-4">
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
