import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BellRing, Building2, Check, FileLock2, FileText, Globe, KeyRound, Linkedin, Mail, Play, Server } from "lucide-react"
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

/** Écran de démo dessiné à plat (contours noirs, aplats), dans le style du visuel d'accueil. */
function DemoScreen() {
  const rows = [
    { y: 74, w: 128, delay: "0.4s" },
    { y: 112, w: 104, delay: "1.4s" },
    { y: 150, w: 118, delay: "2.4s" },
  ]
  return (
    <svg
      viewBox="0 0 360 240"
      className="block h-auto w-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-hover:-rotate-1"
      aria-hidden="true"
      focusable="false"
    >
      {/* Écran */}
      <rect x="40" y="16" width="280" height="180" rx="12" fill="#fff" stroke="#161618" strokeWidth="4" />
      {/* Bandeau « en direct » */}
      <rect x="60" y="34" width="104" height="22" rx="11" fill="#e6edff" />
      <circle cx="74" cy="45" r="4.5" fill="#0d44e8" className="live-dot" />
      <text x="85" y="49.5" fontSize="12" fontWeight="650" fill="#0d44e8" fontFamily="inherit">
        Démo en direct
      </text>
      {rows.map(({ y, w, delay }) => (
        <g key={y}>
          <rect x="60" y={y} width="26" height="26" rx="7" fill="#e6edff" />
          <rect x="98" y={y + 5} width={w} height="7" rx="3.5" fill="#d9dbe0" />
          <rect x="98" y={y + 16} width={w - 44} height="6" rx="3" fill="#ececef" />
          <circle cx="292" cy={y + 13} r="11" fill="none" stroke="#d9dbe0" strokeWidth="2.5" />
          <g className="hero-pop" style={{ animationDuration: "6s", animationDelay: delay }}>
            <circle cx="292" cy={y + 13} r="11" fill="#0d44e8" />
            <path d={`M286.5 ${y + 13.5}l3.8 3.8 7-7.6`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      ))}
      {/* Pied de l'ordinateur */}
      <path d="M16 200h328l-14 20H30z" fill="#fff" stroke="#161618" strokeWidth="4" strokeLinejoin="round" />
      <rect x="156" y="200" width="48" height="6" rx="3" fill="#161618" />
    </svg>
  )
}

/** Encart « démo gratuite » : voir une automatisation tourner avant de se décider. */
export function DemoBand() {
  return (
    <section className="py-6 sm:py-8" aria-labelledby="demo-heading">
      <Container>
        <div className="card-lift grid items-stretch gap-6 p-3 transition-shadow duration-500 hover:shadow-[var(--shadow-card),0_30px_60px_-30px_rgba(22,22,24,0.25)] sm:p-4 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="flex flex-col justify-center px-3 py-5 sm:px-6 sm:py-8 lg:pl-8">
            <p className="chip-dark self-start">
              <span className="rounded-[10px] bg-blue px-2 py-0.5 text-[12px]">Gratuit</span>
              Démo de 20 minutes
            </p>
            <h2 id="demo-heading" className="type-section mt-6 max-w-[16ch] text-ink text-balance">
              Plutôt voir que lire&nbsp;? On vous montre.
            </h2>
            <p className="type-body mt-4 max-w-[46ch] text-charcoal">
              En visio, nous faisons tourner devant vous des relances et des suivis administratifs automatisés, sur votre
              métier. Vous posez toutes vos questions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DemoButton className="group">
                Réserver ma démo gratuite
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </DemoButton>
              <span className="type-meta text-charcoal">En visio · Sans engagement</span>
            </div>
          </div>

          {/* Écran de démo, à plat : les tâches se cochent en direct. Cliquer ouvre l'agenda de la démo. */}
          <div className="flex flex-col items-center justify-center gap-6 rounded-[16px] bg-blue px-5 py-9 sm:px-8">
            <DiagnosticButton kind="demo" variant="bare" className="group relative w-full max-w-[400px] cursor-pointer">
              <span className="sr-only">Réserver ma démo gratuite</span>
              <DemoScreen />
              <span className="pointer-events-none absolute left-1/2 top-[42%] inline-flex -translate-x-1/2 -translate-y-1/2 translate-y-2 items-center gap-2 rounded-full bg-ink px-4 py-2 text-[14px] font-[600] text-white opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Réserver la démo
              </span>
            </DiagnosticButton>
            <ul className="flex max-w-[420px] flex-wrap justify-center gap-2" aria-label="Démos possibles">
              {DEMO_NICHES.map((niche) => (
                <li
                  key={niche}
                  className="cursor-default rounded-full bg-white px-3.5 py-1.5 text-[13px] font-[550] text-ink transition-[background-color,color,translate] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-ink hover:text-white"
                >
                  {niche}
                </li>
              ))}
            </ul>
          </div>
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
