import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Play, ShieldCheck, Server, FileLock2, BellRing, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  TRADES,
  TOOLS,
  FIGURES,
  METHOD_STEPS,
  TRUST_POINTS,
  PRICING,
  FOUNDER,
  FAQ,
  UNDER_THE_HOOD,
  TRUST_LINE,
} from "@/lib/automation-content"
import { Container, SectionHeading, SourceCaption, FaqList } from "@/components/home/primitives"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { FlowDemo } from "@/components/automation/flow-demo"
import { TradeCarousel } from "@/components/home/trade-carousel"

/* ─── Hero ────────────────────────────────────────── */
export function Hero() {
  const qualiopi = TRADES[0]
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-heading">
      <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[720px]" aria-hidden="true" />
      <Container className="relative flex flex-col items-center text-center">
        <p className="chip-dark animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both">
          <span className="rounded-[10px] bg-blue px-2 py-0.5 text-[12px]">Nouveau</span>
          Facture électronique : je prépare vos flux pour 2027
        </p>
        <h1 id="hero-heading" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-100 type-display mt-8 max-w-[22ch] text-ink text-balance">
          Vos tâches administratives tournent toutes seules. Vous récupérez vos <span className="text-sweep">heures.</span>
        </h1>
        <p className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-200 type-body mt-6 max-w-[62ch] text-charcoal">
          Relances, collecte de pièces, preuves d&apos;audit, tri des mails : je repère ce qui vous fait perdre du temps,
          je l&apos;automatise sur vos propres outils, et je mesure les heures gagnées.
        </p>
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-300 mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <DiagnosticButton className="w-full sm:w-auto" />
          <Link href="#exemples" className="btn-outline w-full sm:w-auto">
            <Play className="h-4 w-4" aria-hidden="true" />
            Voir un exemple en 2 min
          </Link>
        </div>
        <p className="mt-5 type-meta text-charcoal">45 min · Sans engagement · Vos données restent chez vous</p>
      </Container>

      {/* Démo : déclencheur → étapes → résultat */}
      <Container className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-500 relative mt-16 sm:mt-24">
        <FlowDemo nodes={qualiopi.flow} result={qualiopi.beforeAfter} layout="wide" />
        <p className="mt-4 text-center type-caption text-charcoal">Organisme de formation Qualiopi : chaque inscription déclenche la suite, sans personne derrière.</p>
      </Container>
    </section>
  )
}

/* ─── Outils compatibles ─────────────────────────── */
export function ToolsStrip() {
  return (
    <section className="py-14" aria-label="Outils compatibles">
      <Container className="flex flex-col items-center gap-5 text-center">
        <p className="type-meta text-charcoal">Fonctionne avec les outils que vous utilisez déjà</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TOOLS.map((tool) => (
            <li key={tool} className="cursor-default text-[17px] font-[550] tracking-[-0.01em] text-[#767677] transition-colors duration-200 hover:text-graphite">
              {tool}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ─── Chiffres sourcés ───────────────────────────── */
export function Figures() {
  return (
    <section className="pb-16 lg:pb-24" aria-label="Chiffres clés">
      <Container>
        <dl className="grid gap-4 md:grid-cols-3">
          {FIGURES.map((f) => (
            <div key={f.value} className="card-lift card-hover flex flex-col p-6">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-ink">{f.value}</dd>
              <dd className="mt-3 text-[16px] leading-[1.5] text-graphite">{f.label}</dd>
              <dd className="mt-auto pt-5">
                <SourceCaption>Source : {f.source}</SourceCaption>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

/* ─── Lignes métiers (exemples) ──────────────────── */
export function TradeRows() {
  return (
    <section id="exemples" className="py-16 lg:py-24" aria-labelledby="exemples-heading">
      <Container>
        <SectionHeading
          id="exemples-heading"
          eyebrow="Exemples par métier"
          title="Ce qui tourne tout seul, métier par métier"
          text="Trois métiers où les mêmes tâches reviennent chaque semaine. Voici ce qui se déclenche tout seul, et le temps que ça représente."
          align="center"
        />
        <div className="mt-14 lg:mt-20">
          <TradeCarousel />
        </div>
      </Container>
    </section>
  )
}

/* ─── Méthode ─────────────────────────────────────── */
export function Method() {
  return (
    <section id="methode" className="py-16 lg:py-24" aria-labelledby="methode-heading">
      <Container>
        <SectionHeading
          id="methode-heading"
          eyebrow="La méthode"
          title="Diagnostiquer avant de prescrire."
          text="Je ne vends pas un logiciel. Je regarde comment vous travaillez, j'automatise ce qui vaut la peine de l'être, puis je mesure."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => (
            <li key={step.num} className="card-lift card-hover flex flex-col gap-3 p-6">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full type-meta",
                  i === 0 ? "bg-blue text-white shadow-blue" : "bg-black/[0.05] text-graphite"
                )}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <h3 className="type-feature text-ink">{step.title}</h3>
              <p className="text-[15px] leading-[1.6] text-charcoal">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/* ─── Confiance ───────────────────────────────────── */
const TRUST_ICONS = [ShieldCheck, FileLock2, Server, BellRing]

export function Trust() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="trust-heading">
      <Container>
        <div className="overflow-hidden rounded-[20px] bg-studio text-white">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14">
            <div>
              <p className="type-meta text-white/60">Confiance</p>
              <h2 id="trust-heading" className="type-section mt-3 max-w-[18ch] text-white text-balance">
                {TRUST_LINE}
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {TRUST_POINTS.map((p, i) => {
                  const Icon = TRUST_ICONS[i]
                  return (
                    <li key={p.title} className="flex flex-col gap-2">
                      <Icon className="h-5 w-5 text-[#7fa3ff]" aria-hidden="true" />
                      <span className="text-[16px] font-[550]">{p.title}</span>
                      <span className="text-[14px] leading-[1.5] text-white/65">{p.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="rounded-[20px] bg-white/[0.06] p-6 ring-1 ring-white/10" aria-labelledby="hood-heading">
              <p className="chip-light">Sous le capot</p>
              <h3 id="hood-heading" className="mt-4 type-feature">Pour ceux qui veulent savoir comment ça marche</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {UNDER_THE_HOOD.map((item) => (
                  <li key={item.name} className="border-t border-white/10 pt-4">
                    <span className="text-[15px] font-[550]">{item.name}</span>
                    <p className="mt-1 text-[14px] leading-[1.55] text-white/65">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Tarifs ──────────────────────────────────────── */
export function Pricing() {
  return (
    <section id="tarifs" className="py-16 lg:py-24" aria-labelledby="tarifs-heading">
      <Container>
        <SectionHeading
          id="tarifs-heading"
          eyebrow="Tarifs"
          title="On commence petit, on mesure, puis vous décidez"
          text="Le diagnostic est gratuit. Ensuite, un pilote sur une seule tâche permet de vérifier le gain avant d'aller plus loin."
          align="center"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((plan) => (
            <li
              key={plan.name}
              className={cn("card-lift card-hover flex flex-col p-6", plan.featured && "ring-2 ring-blue")}
            >
              <h3 className="type-feature text-ink">{plan.name}</h3>
              <p className="mt-4 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink">{plan.price}</p>
              <p className="type-meta text-charcoal">{plan.unit}</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-charcoal">{plan.text}</p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-graphite">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {plan.featured ? (
                  <DiagnosticButton className="w-full">Réserver mon diagnostic</DiagnosticButton>
                ) : (
                  <Link href="#diagnostic" className="btn-outline w-full">
                    En parler au diagnostic
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        <SourceCaption className="mt-6 text-center">
          Prix indicatifs hors taxes. Le devis final dépend du nombre de tâches et des outils à connecter.
        </SourceCaption>
      </Container>
    </section>
  )
}

/* ─── Fondateur ──────────────────────────────────── */
export function Founder() {
  return (
    <section id="fondateur" className="py-16 lg:py-24" aria-labelledby="fondateur-heading">
      <Container>
        <div className="card-lift grid items-center gap-8 p-4 sm:p-6 md:grid-cols-[280px_1fr] lg:gap-12 lg:p-8">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[14px] bg-secondary">
            <Image
              src={FOUNDER.photo}
              alt={`Portrait de ${FOUNDER.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <p className="type-meta text-charcoal">Votre interlocuteur</p>
            <h2 id="fondateur-heading" className="type-section mt-3 text-ink">{FOUNDER.name}</h2>
            <p className="mt-1 type-feature text-graphite">{FOUNDER.role}</p>
            {FOUNDER.bio.map((p) => (
              <p key={p} className="mt-4 max-w-[60ch] text-[16px] leading-[1.7] text-charcoal">{p}</p>
            ))}
            <div className="mt-6 flex gap-2">
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="icon-control" aria-label={`LinkedIn de ${FOUNDER.name}`}>
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`mailto:${FOUNDER.email}`} className="icon-control" aria-label={`Écrire à ${FOUNDER.name}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────────────── */
export function Faq() {
  return (
    <section id="faq" className="py-16 lg:py-24" aria-labelledby="faq-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-heading" eyebrow="Questions fréquentes" title="Ce qu'on me demande avant le diagnostic" />
        <FaqList items={FAQ} />
      </Container>
    </section>
  )
}
