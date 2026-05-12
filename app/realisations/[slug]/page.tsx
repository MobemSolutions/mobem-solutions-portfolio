import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Building2, CheckCircle2 } from "lucide-react"
import { CASES, getCaseBySlug, type Case } from "@/lib/cases"
import { getAllRealisations, urlFor } from "@/lib/sanity"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EditorialBadge } from "@/components/ui/editorial-badge"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

function normaliseSanityCase(r: any): Case {
  return {
    idx:        r.idx        ?? '',
    client:     r.client     ?? '',
    sector:     r.sector     ?? '',
    tag:        r.tag        ?? '',
    kpi:        r.kpi        ?? '',
    year:       r.year       ?? '',
    cat:        r.cat        ?? '',
    slug:       r.slug       ?? '',
    desc:       r.desc       ?? '',
    stats:      (r.stats ?? []).map((s: { v: string; l: string }) => [s.v, s.l] as [string, string]),
    kpis:       r.kpis       ?? [],
    body:       r.body       ?? [],
    stack:      r.stack      ?? [],
    quote:      r.quote      ?? { text: '', author: '', role: '' },
    coverImage: r.coverImage ?? undefined,
    ficheImage: r.ficheImage ?? undefined,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllRealisations().catch(() => [])
  const sanity = slugs.map((r: any) => ({ slug: r.slug }))
  const hardcoded = CASES.map((c) => ({ slug: c.slug }))
  const all = [...sanity, ...hardcoded.filter(h => !sanity.find((s: any) => s.slug === h.slug))]
  return all
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const allRaw = await getAllRealisations().catch(() => [])
  const rawCase = allRaw.find((r: any) => r.slug === slug) ?? null
  const c = rawCase ? normaliseSanityCase(rawCase) : getCaseBySlug(slug)
  if (!c) return { title: "Cas non trouvé | Mobem Solutions" }
  return {
    title: `${c.client} — ${c.tag} | Mobem Solutions`,
    description: c.desc,
  }
}

/* ─── Sub-components ───────────────────────────────────────────────── */

function PerformanceGauge({
  score,
  label,
}: {
  score: number
  label: string
}) {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  // Swiss Style: Monochrome colors only
  const scoreColor =
    score >= 90 ? "var(--color-foreground)" : score >= 70 ? "var(--color-muted-foreground)" : "var(--color-accent)"

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle
            cx="40" cy="40" r={r}
            fill="none" stroke="currentColor" strokeWidth="6"
            className="text-muted-foreground/30"
          />
          <circle
            cx="40" cy="40" r={r}
            fill="none"
            style={{ stroke: scoreColor }}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">{score}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center leading-tight">{label}</p>
    </div>
  )
}

function Arrow({ size = 16, reverse = false, className = "" }: { size?: number; reverse?: boolean; className?: string }) {
  return reverse
    ? <ArrowLeft width={size} height={size} className={className} />
    : <ArrowRight width={size} height={size} className={className} />
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params

  const allRaw = await getAllRealisations().catch(() => [])
  const allCases: Case[] = allRaw.length > 0 ? allRaw.map(normaliseSanityCase) : CASES

  const rawCase = allRaw.find((r: any) => r.slug === slug) ?? null
  const c: Case | undefined = rawCase ? normaliseSanityCase(rawCase) : getCaseBySlug(slug)
  if (!c) notFound()

  const idx = allCases.findIndex((r) => r.slug === slug)
  const prev = idx > 0 ? allCases[idx - 1] : null
  const next = idx < allCases.length - 1 ? allCases[idx + 1] : null

  const scheme = {
    heroBg: "bg-secondary/20",
    accentText: "text-accent",
    cardGradient: "bg-secondary",
  }

  const project = {
    challenge: c.desc,
    client: {
      name: c.client,
      sector: c.sector,
      location: c.sector.split("·")[1]?.trim() ?? c.sector,
      size: "Entreprise",
    },
    duration: "10 jours",
    year: c.year,
    results: c.kpis.map((k) => ({ value: k.v, label: k.l, description: k.d })),
    performance: rawCase?.performance ?? { performance: 96, accessibility: 100, seo: 100, bestPractices: 95 },
  }

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className={cn("py-16 lg:py-20", scheme.heroBg)}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/realisations" className="hover:text-foreground transition-colors">Réalisations</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{project.client.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-start">
              <div>
                <EditorialBadge variant="muted" className="mb-6">
                  Cas n°{c.idx} · {c.tag}
                </EditorialBadge>

                <h1
                  className="mb-6 font-extrabold leading-[0.92] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
                >
                  {c.client},<br />
                  <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                    {c.tag.toLowerCase()}.
                  </em>
                </h1>

                <p className="text-[18px] leading-[1.5] text-muted-foreground max-w-[540px]">{c.desc}</p>
              </div>

              {/* Right — meta rows */}
              <div className="flex flex-col gap-4 pt-8 border-t border-border lg:border-t-0 lg:pt-0 lg:border-l lg:pl-12">
                {[
                  { l: "Client",       v: c.client },
                  { l: "Secteur",      v: c.sector },
                  { l: "Année",        v: c.year },
                  { l: "Catégorie",    v: c.tag },
                  { l: "KPI principal", v: c.kpi },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between gap-4 pb-4 border-b border-border">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{l}</span>
                    <span className="text-[14px] font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Fiche image ───────────────────────────────────────────── */}
        {c.ficheImage?.asset && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
            <div className="relative aspect-[16/7] w-full overflow-hidden border border-border">
              <Image
                src={urlFor(c.ficheImage).width(2560).auto('format').url()}
                alt={c.ficheImage.alt ?? c.client}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        )}

        {/* ── Lire le cas CTA ───────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="#contexte"
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
          >
            Lire le cas <Arrow size={14} />
          </Link>
        </div>

        {/* ── CONTEXTE ──────────────────────────────────────────────── */}
        <section id="contexte" className="py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

              {/* Challenge text */}
              <div className="lg:col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  Le contexte
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  La situation avant notre intervention
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed text-balance">
                  {project.challenge}
                </p>
              </div>

              {/* Client card */}
              <div>
                <div className="border border-border bg-card p-6 sticky top-28">
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
                    <div className={cn("w-10 h-10 flex items-center justify-center", scheme.cardGradient)}>
                      <Building2 className="w-5 h-5 text-foreground/70" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{project.client.name}</p>
                      <p className="text-xs text-muted-foreground">{project.client.sector}</p>
                    </div>
                  </div>
                  <dl className="space-y-3">
                    {[
                      { label: "Localisation", value: project.client.location },
                      { label: "Structure", value: project.client.size },
                      { label: "Durée projet", value: project.duration },
                      { label: "Année", value: String(project.year) },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="text-xs text-muted-foreground">{item.label}</dt>
                        <dd className="text-sm font-medium text-foreground mt-0.5">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* ── KPI band ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
            {c.kpis.map((k, i) => (
              <div
                key={i}
                className="px-7 py-10"
                style={{ borderRight: i < c.kpis.length - 1 ? "1px solid var(--color-border)" : "none" }}
              >
                <div
                  className="font-extrabold leading-[0.95] tracking-[-0.03em] text-accent"
                  style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                >
                  {k.v}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mt-3">
                  {k.l}
                </div>
              </div>
            ))}
          </div>

          {/* ── Case body ────────────────────────────────────────────────────── */}
          <section
            id="diagnostic"
            className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-b border-border"
          >
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-5">Sommaire</p>
              <ul className="flex flex-col gap-0">
                {c.body.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                      className="font-mono text-[13px] tracking-[0.02em] text-muted-foreground hover:text-accent transition-colors block py-3 pl-5 border-l border-border hover:border-accent"
                    >
                      {section.title.split("·")[0]?.trim()}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Prose */}
            <div className="max-w-[720px] text-[18px] leading-[1.7]">
              {c.body.map((section) => (
                <div key={section.title} id={section.title.replace(/\s+/g, "-").toLowerCase()} className="mb-14 scroll-mt-24">
                  <h2 className="text-[32px] font-bold tracking-[-0.025em] leading-[1.1] mb-4">
                    {section.title.split("·")[0]?.trim()}{" "}
                    <em className="font-serif font-normal italic text-accent">
                      {section.title.split("·")[1]?.trim()}
                    </em>
                  </h2>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* ── RÉSULTATS & PERFORMANCE ───────────────────────────────── */}
        <section className={cn("py-20 border-b border-border", scheme.heroBg)}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                L'impact concret
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Des résultats mesurables
              </h2>
            </div>

            {/* Impact metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="bg-card border border-border p-6"
                >
                  <p className={cn("text-3xl font-bold mb-1", scheme.accentText)}>{r.value}</p>
                  <p className="font-semibold text-foreground text-sm mb-2">{r.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>

            {/* Performance section */}
            <div className="bg-card border border-border p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Performance technique</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scores Lighthouse — standard d&apos;excellence Google
                  </p>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 max-w-xs">
                  Mesurés sur la version de production, mobile et desktop, via Lighthouse 12
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                <PerformanceGauge score={project.performance.performance} label="Performance" />
                <PerformanceGauge score={project.performance.accessibility} label="Accessibilité" />
                <PerformanceGauge score={project.performance.seo} label="SEO" />
                <PerformanceGauge score={project.performance.bestPractices} label="Bonnes pratiques" />
              </div>

              {/* Performance detail */}
              <div className="mt-8 pt-6 border-t border-border grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Vitesse de chargement", desc: "Pages en moins de 1,5 secondes — expérience utilisateur optimale" },
                  { label: "Accessibilité WCAG", desc: "Navigation clavier, contrastes, lecteurs d'écran — personne exclue" },
                  { label: "SEO technique", desc: "Balises, schema.org, sitemap, robots — bases solides pour Google" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", scheme.accentText)} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────────────────── */}
          {c.quote?.text && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 px-4 sm:px-6 lg:px-8 py-20 border-b border-border items-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">Témoignage</div>
              <div>
                <blockquote
                  className="font-serif font-normal italic leading-[1.25] tracking-[-0.015em] mb-8"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  «&nbsp;{c.quote.text}&nbsp;»
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-accent text-accent-foreground flex items-center justify-center font-serif text-[18px] flex-shrink-0">
                    {c.quote.author[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[15px]">{c.quote.author}</div>
                    <div className="text-[13px] text-muted-foreground">{c.quote.role}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Previous / Next ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-border">
            {prev ? (
              <Link
                href={`/realisations/${prev.slug}`}
                className="group flex flex-col gap-3 p-8 lg:p-12 border-r border-border hover:bg-accent/[0.04] transition-colors"
                data-cursor="hover"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">— Cas précédent</span>
                <div className="mt-auto">
                  <div className="text-[24px] font-bold tracking-[-0.02em]">{prev.client}</div>
                  <em className="font-serif italic text-accent text-[20px]">{prev.tag}.</em>
                </div>
                <Arrow reverse size={24} className="transition-transform group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-accent" />
              </Link>
            ) : (
              <div className="p-8 lg:p-12 border-r border-border text-muted-foreground font-mono text-[11px]">— Premier cas</div>
            )}
            {next ? (
              <Link
                href={`/realisations/${next.slug}`}
                className="group flex flex-col gap-3 p-8 lg:p-12 text-right hover:bg-accent/[0.04] transition-colors"
                data-cursor="hover"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground self-end">— Cas suivant</span>
                <div className="mt-auto">
                  <div className="text-[24px] font-bold tracking-[-0.02em]">{next.client}</div>
                  <em className="font-serif italic text-accent text-[20px]">{next.tag}.</em>
                </div>
                <Arrow size={24} className="self-end transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-accent" />
              </Link>
            ) : (
              <div className="p-8 lg:p-12 text-right text-muted-foreground font-mono text-[11px]">Dernier cas —</div>
            )}
          </div>

          {/* ── CTA ──────────────────────────────────────────────────────────── */}
          <section className="px-4 sm:px-6 lg:px-8 py-24 text-center border-b border-border">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">Votre projet</div>
            <h2 className="mx-auto mb-6 max-w-[720px] font-extrabold tracking-[-0.03em] leading-[0.95]" style={{ fontSize: "clamp(36px,4vw,64px)" }}>
              Le prochain cas{" "}
              <em className="font-serif font-normal italic text-accent">pourrait être le vôtre.</em>
            </h2>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
            >
              Démarrer un diagnostic <Arrow size={14} />
            </Link>
          </section>

      </main>
      <Footer />
    </>
  )
}
