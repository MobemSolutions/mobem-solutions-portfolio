import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, BellRing, Building2, Check, FileLock2, FileText, Globe, KeyRound, Linkedin, Mail, Play, Server } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  TRADES,
  TRUST_POINTS,
  PRICING,
  type Plan,
  FOUNDER,
  FAQ,
  HOSTING_OPTIONS,
} from "@/lib/automation-content"
import { Container, SectionHeading, SourceCaption, FaqList, Eyebrow } from "@/components/home/primitives"
import { DemoButton, DiagnosticButton } from "@/components/diagnostic-button"
import { PricingIcon } from "@/components/home/pricing-icons"
import { HeroArtwork } from "@/components/home/hero-artwork"
import { TradeCards } from "@/components/home/trade-cards"
import { MethodSteps } from "@/components/home/method-steps"
import { TOOL_LOGOS, ToolLogo } from "@/components/home/tool-logos"
import { ContactButton } from "@/components/contact-form"
import { MobemMark } from "@/components/ui/mobem-logo"

/* ─── Hero ────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-[#e5e5e8] bg-[#fcfcfc] py-1.5 pl-1.5 pr-3.5 text-[13px] font-[550] text-graphite">
            <span className="rounded-full bg-[#e6edff] px-2.5 py-0.5 text-blue">Nouveau</span>
            {/* Version courte sur mobile pour tenir sur une ligne */}
            <span className="sm:hidden">Facture électronique 2027</span>
            <span className="max-sm:hidden">Facture électronique : nous préparons vos flux pour 2027</span>
          </p>
          <h1 id="hero-heading" className="type-display mt-7 max-w-[16ch] text-ink text-balance">
            Vos tâches administratives tournent toutes seules.
          </h1>
          <p className="type-body mt-6 max-w-[50ch] text-charcoal">
            Relances, collecte de pièces, preuves d&apos;audit, tri des mails : nous repérons ce qui vous fait perdre du temps,
            l&apos;automatisons sur vos propres outils, et mesurons les heures que vous récupérez.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DemoButton variant="dark">Voir une démo · 20 min</DemoButton>
            <DiagnosticButton />
          </div>
          <p className="mt-5 text-[14px] text-[#838385]">45 min · Sans engagement · Hébergé en Europe</p>
        </div>

        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 fill-mode-both delay-200">
          <HeroArtwork />
        </div>
      </Container>
    </section>
  )
}

/* ─── Outils compatibles ─────────────────────────── */
export function ToolsStrip() {
  return (
    <section className="py-14" aria-label="Outils compatibles">
      <Container className="flex flex-col items-center gap-5 text-center">
        <Eyebrow>Fonctionne avec vos outils actuels</Eyebrow>
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
    <section id="exemples" className="py-12 sm:py-16 lg:py-24" aria-labelledby="exemples-heading">
      <Container>
        <SectionHeading
          id="exemples-heading"
          eyebrow="Exemples par métier"
          title="Ce qui tourne tout seul, métier par métier"
          text="Trois métiers où les mêmes tâches reviennent chaque semaine. Voici ce qui se déclenche tout seul, et le temps que ça représente."
          align="center"
        />
        <TradeCards />
      </Container>
    </section>
  )
}

/* ─── Démo ────────────────────────────────────────── */
const DEMO_NICHES = ["Organismes de formation", "Courtiers en assurance", "Cabinets comptables", "Votre cas"]

/** Lignes de l'écran de démo : chacune passe de « En attente » à fait, l'une après l'autre (exemples fictifs). */
const DEMO_ROWS = [
  { who: "Cabinet Martin", what: "Pièce manquante", done: "Relance envoyée", initials: "CM", delay: "0.6s" },
  { who: "Session du 14 mars", what: "8 stagiaires", done: "Convoqués", initials: "SF", delay: "1.8s" },
  { who: "Contrat habitation", what: "Échéance le 30 juin", done: "Rappel prêt", initials: "CH", delay: "3s" },
  { who: "Facture fournisseur", what: "Reçue ce matin", done: "Classée", initials: "FF", delay: "4.2s" },
]

/** Écran d'ordinateur sobre, façon fiche produit : bord sombre, écran net, pied fin. */
function DemoDevice() {
  return (
    <div className="mx-auto w-full max-w-[720px] transition-[translate] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-3">
      <div className="rounded-[24px] bg-studio p-2.5 shadow-card transition-shadow duration-700 group-hover:shadow-[var(--shadow-card),0_40px_70px_-30px_rgba(22,22,24,0.35)] sm:p-3">
        <div className="overflow-hidden rounded-[16px] bg-white text-left">
          {/* Barre de l'application */}
          <div className="flex items-center justify-between border-b border-[#ececef] px-4 py-3 sm:px-6">
            <span className="flex items-center gap-2 text-[13px] font-[650] text-ink sm:text-[14px]">
              <MobemMark className="h-4 w-4" />
              Relances et suivis
            </span>
            <span className="flex items-center gap-1.5 text-[12px] font-[600] text-blue">
              <span className="live-dot h-2 w-2 rounded-full bg-blue" aria-hidden="true" />
              En direct
            </span>
          </div>
          <ul>
            {DEMO_ROWS.map((row) => (
              <li key={row.who} className="flex items-center gap-3 border-b border-[#f2f2f4] px-4 py-3 last:border-b-0 sm:gap-4 sm:px-6 sm:py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f3f5] text-[12px] font-[650] text-graphite">
                  {row.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-[550] text-ink">{row.who}</span>
                  <span className="block truncate type-caption text-charcoal">{row.what}</span>
                </span>
                {/* Les deux états occupent la même case : la place réservée est celle du plus large */}
                <span className="grid shrink-0 justify-items-end">
                  <span className="col-start-1 row-start-1 inline-flex items-center rounded-full bg-[#f2f2f4] px-3 py-1 text-[12px] font-[600] text-charcoal">
                    En attente
                  </span>
                  <span
                    className="hero-pop col-start-1 row-start-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-blue px-3 py-1 text-[12px] font-[600] text-white"
                    style={{ animationDuration: "8s", animationDelay: row.delay }}
                  >
                    <Check className="h-3 w-3 max-sm:hidden" strokeWidth={3.5} aria-hidden="true" />
                    {row.done}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/** Encart « démo gratuite » : composition centrée façon apple.com, aux styles de titre du site. */
export function DemoBand() {
  return (
    <section className="group py-12 sm:py-16 lg:py-24" aria-labelledby="demo-heading">
      <Container>
        <SectionHeading
          id="demo-heading"
          eyebrow="Démo gratuite · 20 minutes"
          title="Voyez-le tourner, avant de décider."
          text="En visio, nous faisons tourner devant vous des relances et des suivis automatisés, sur votre métier. Vous posez toutes vos questions."
          align="center"
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
          <DemoButton>Réserver ma démo</DemoButton>
          <a href="#exemples" className="group/link link-underline inline-flex items-center gap-0.5 type-nav text-blue">
            Voir les exemples
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <ul className="mx-auto mt-6 flex max-w-[560px] flex-wrap justify-center gap-2" aria-label="Démos possibles">
          {DEMO_NICHES.map((niche) => (
            <li
              key={niche}
              className="cursor-default rounded-full border border-border bg-white px-3.5 py-1.5 type-meta text-graphite transition-[background-color,color,border-color,translate] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
            >
              {niche}
            </li>
          ))}
        </ul>
        <div className="mt-12 sm:mt-16" aria-hidden="true">
          <DemoDevice />
        </div>
      </Container>
    </section>
  )
}

/* ─── Méthode ─────────────────────────────────────── */
export function Method() {
  return (
    <section id="methode" className="py-12 sm:py-16 lg:py-24" aria-labelledby="methode-heading">
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
const TRUST_ICONS = [FileText, FileLock2, KeyRound, BellRing]
const HOSTING_ICONS = [Server, Building2]

export function Trust() {
  return (
    <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="trust-heading">
      <Container>
        <SectionHeading
          id="trust-heading"
          eyebrow="Confiance"
          title="Vos outils restent les vôtres."
          text="Votre automatisation est hébergée en Europe, chez nous ou chez vous : c'est vous qui choisissez."
          align="center"
        />

        {/* Les deux façons d'héberger */}
        <ul className="mx-auto mt-12 grid max-w-[960px] gap-4 md:grid-cols-2 lg:mt-14">
          {HOSTING_OPTIONS.map((option, i) => {
            const Icon = HOSTING_ICONS[i]
            const main = i === 0
            return (
              <li key={option.name} className={cn("hairline flex flex-col p-6 sm:p-7", main ? "border-blue bg-white" : "hover:border-[#cfcfd4]")}>
                <div className="flex items-center justify-between gap-3">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[12px] font-[550]",
                      main ? "bg-[#e6edff] text-blue" : "bg-[#f0f0f2] text-graphite"
                    )}
                  >
                    {option.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-[20px] font-[600] tracking-[-0.01em] text-ink">{option.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{option.text}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-[#ececef] pt-5">
                  {option.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-graphite">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>

        {/* Ce qui vaut dans les deux cas */}
        <ul className="mx-auto mt-12 grid max-w-[960px] gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRUST_POINTS.map((p, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <li key={p.title} className="flex flex-col gap-2">
                <Icon className="h-5 w-5 text-blue" strokeWidth={2} aria-hidden="true" />
                <span className="mt-1 text-[15px] font-[600] text-ink">{p.title}</span>
                <span className="text-[14px] leading-[1.55] text-charcoal">{p.text}</span>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/* ─── Tarifs ──────────────────────────────────────── */
/**
 * Carte d'une formule : contour noir franc, bandeau en tête (bleu pour le diagnostic).
 * Au survol, la carte se soulève avec une ombre nette décalée, l'icône bascule et le bandeau s'éclaire.
 */
export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-[14px] border-2 border-ink bg-white transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-[translate] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#161618]">
      <div
        className={cn(
          "flex items-center justify-between border-b-2 border-ink px-6 py-3 transition-colors duration-300",
          plan.featured ? "bg-blue text-white" : "bg-[#f3f4f6] text-ink group-hover:bg-[#e6edff]"
        )}
      >
        <h3 className="text-[15px] font-[650]">{plan.name}</h3>
        <ArrowUpRight
          className="h-4 w-4 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <PricingIcon
          name={plan.icon}
          className="h-14 w-14 origin-bottom-left transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-rotate-6 group-hover:scale-110"
        />
        <p className="mt-5 whitespace-nowrap text-[32px] font-bold leading-none tracking-[-0.03em] text-ink">{plan.price}</p>
        <p className="mt-2 text-[14px] text-[#838385]">{plan.unit}</p>
        <p className="mt-4 text-[15px] leading-[1.6] text-charcoal">{plan.text}</p>
        <ul className="mt-5 flex flex-col gap-2.5 border-t-2 border-dashed border-[#d9dbe0] pt-5">
          {plan.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] text-graphite">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={3} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-7">
          {plan.featured && <DiagnosticButton className="w-full">Réserver mon diagnostic</DiagnosticButton>}
          <Link
            href={plan.href}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-[15px] font-[600] transition-colors duration-200",
              plan.featured
                ? "text-ink hover:text-blue"
                : "border-2 border-ink bg-white text-ink hover:bg-ink hover:text-white"
            )}
          >
            Voir le détail
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="tarifs" className="py-12 sm:py-16 lg:py-24" aria-labelledby="tarifs-heading">
      <Container>
        <SectionHeading
          id="tarifs-heading"
          eyebrow="Tarifs"
          title="On commence petit, on mesure, puis vous décidez"
          text="Le diagnostic est gratuit. Ensuite, un pilote sur une seule tâche permet de vérifier le gain avant d'aller plus loin."
          align="center"
        />
        {/* Mobile : cartes côte à côte qu'on fait glisser ; dès sm : grille */}
        <ul className="scrollbar-none -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {PRICING.map((plan) => (
            <li key={plan.name} className="flex w-[84%] shrink-0 snap-center sm:w-auto">
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
        <SourceCaption className="mt-4 text-center sm:mt-6">
          <span className="sm:hidden">Faites glisser pour voir les 4 formules. </span>
          Prix indicatifs hors taxes. Le devis final dépend du nombre de tâches et des outils à connecter.
        </SourceCaption>
        {/* Offre secondaire, volontairement discrète */}
        <div className="hairline mx-auto mt-8 flex max-w-[760px] sm:mt-10 flex-col items-start gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
    <section id="faq" className="py-12 sm:py-16 lg:py-24" aria-labelledby="faq-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-heading" eyebrow="Questions fréquentes" title="Ce qu'on nous demande avant le diagnostic" />
        <FaqList items={FAQ} />
      </Container>
    </section>
  )
}
