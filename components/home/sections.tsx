import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Globe, Play, ShieldCheck, Server, FileLock2, BellRing, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  TRADES,
  TRUST_POINTS,
  PRICING,
  FOUNDER,
  FAQ,
  UNDER_THE_HOOD,
  TRUST_LINE,
} from "@/lib/automation-content"
import { Container, SectionHeading, SourceCaption, FaqList } from "@/components/home/primitives"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { HeroIllustration } from "@/components/home/hero-illustration"
import { TradeCarousel } from "@/components/home/trade-carousel"
import { MethodSteps } from "@/components/home/method-steps"
import { TOOL_LOGOS, ToolLogo } from "@/components/home/tool-logos"
import { ContactButton } from "@/components/contact-form"

/* ─── Hero ────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-heading">
      <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[720px]" aria-hidden="true" />
      <Container className="relative flex flex-col items-center text-center">
        <p className="chip-dark animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both">
          <span className="rounded-[10px] bg-blue px-2 py-0.5 text-[12px]">Nouveau</span>
          Facture électronique : nous préparons vos flux pour 2027
        </p>
        <h1 id="hero-heading" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-100 type-display mt-8 max-w-[22ch] text-ink text-balance">
          Vos tâches administratives tournent toutes seules. Vous récupérez vos <span className="text-sweep">heures.</span>
        </h1>
        <p className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both delay-200 type-body mt-6 max-w-[62ch] text-charcoal">
          Relances, collecte de pièces, preuves d&apos;audit, tri des mails : nous repérons ce qui vous fait perdre du temps,
          l&apos;automatisons sur vos propres outils, et mesurons les heures gagnées.
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
        <HeroIllustration />
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
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          {TOOL_LOGOS.map((tool) => (
            <li
              key={tool.name}
              className="group flex cursor-default items-center gap-2 text-[16px] font-[550] tracking-[-0.01em] text-[#767677] transition-colors duration-200 hover:text-graphite"
              style={{ "--brand": tool.color } as React.CSSProperties}
            >
              <ToolLogo
                tool={tool}
                className="transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-[var(--brand)]"
              />
              {tool.name}
            </li>
          ))}
        </ul>
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
          text="Nous ne vendons pas un logiciel. Nous regardons comment vous travaillez, automatisons ce qui vaut la peine de l'être, puis mesurons."
        />
        <MethodSteps />
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
            <div className="rounded-[20px] bg-white/[0.06] p-6 ring-1 ring-white/10 lg:self-center" aria-labelledby="hood-heading">
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
        {/* Offre secondaire, volontairement discrète */}
        <div className="mx-auto mt-10 flex max-w-[760px] flex-col items-start gap-3 rounded-[20px] border border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-[15px] text-charcoal">
            <Globe className="h-5 w-5 shrink-0 text-graphite" aria-hidden="true" />
            <span>
              <span className="font-[550] text-graphite">Besoin aussi d&apos;un site internet ?</span> Nous réalisons des sites
              vitrines sobres et rapides, reliés à vos automatisations. Sur devis.
            </span>
          </p>
          <ContactButton className="link-arrow link-underline inline-flex shrink-0 items-center gap-1.5 type-meta text-graphite">
            Nous écrire
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ContactButton>
        </div>
      </Container>
    </section>
  )
}

/* ─── Fondateur ──────────────────────────────────── */
export function Founder() {
  return (
    <section id="fondateur" className="py-12 lg:py-16" aria-labelledby="fondateur-heading">
      <Container>
        <div className="card-lift mx-auto flex max-w-[760px] flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-secondary">
            <Image
              src={FOUNDER.photo}
              alt={`Portrait de ${FOUNDER.name}`}
              fill
              sizes="72px"
              className="object-cover object-[50%_20%] grayscale"
            />
          </div>
          <div className="flex-1">
            <h2 id="fondateur-heading" className="type-feature text-ink">{FOUNDER.name}</h2>
            <p className="type-meta text-charcoal">{FOUNDER.role}</p>
            {FOUNDER.bio.map((p) => (
              <p key={p} className="mt-2 text-[15px] leading-[1.6] text-charcoal">{p}</p>
            ))}
          </div>
          <div className="flex gap-2 sm:self-start">
            <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="icon-control" aria-label={`LinkedIn de ${FOUNDER.name}`}>
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={`mailto:${FOUNDER.email}`} className="icon-control" aria-label={`Écrire à ${FOUNDER.name}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
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
        <SectionHeading id="faq-heading" eyebrow="Questions fréquentes" title="Ce qu'on nous demande avant le diagnostic" />
        <FaqList items={FAQ} />
      </Container>
    </section>
  )
}
