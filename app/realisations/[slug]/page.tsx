import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CASES, getCaseBySlug, getAdjacentCases } from "@/lib/cases"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getCaseBySlug(slug)
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
  color,
}: {
  score: number
  label: string
  color: string
}) {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  // Swiss Style: Monochrome colors only
  const scoreColor =
    score >= 90 ? "#0D0D0D" : score >= 70 ? "#888888" : "#E63030"

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle
            cx="40" cy="40" r={r}
            fill="none" stroke="currentColor" strokeWidth="6"
            className="text-muted/20"
          />
          <circle
            cx="40" cy="40" r={r}
            fill="none"
            stroke={scoreColor}
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

function ProjectMockup({
  colorScheme,
  variant = "desktop",
  label,
}: {
  colorScheme: ColorScheme
  variant?: "desktop" | "tablet" | "detail"
  label: string
}) {
  const scheme = COLOR_SCHEMES[colorScheme]
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card",
        variant === "desktop" ? "aspect-[16/9]" : variant === "tablet" ? "aspect-[4/3]" : "aspect-[3/4]"
      )}
      aria-label={label}
    >
      <div className={cn("absolute inset-0", scheme.heroBg)} />
      <div className="absolute inset-3 rounded-lg bg-background/80 shadow-inner overflow-hidden">
        {/* Browser chrome */}
        <div className="h-5 bg-muted/80 flex items-center px-2 gap-1 border-b border-border/30">
<span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
          <div className="flex-1 mx-2 h-2 rounded-full bg-muted" />
        </div>
        {/* Skeleton content */}
        <div className="p-3 space-y-2">
          <div className={cn("rounded-md", scheme.mockupBg, variant === "desktop" ? "h-24" : "h-16")} />
          <div className="h-2 rounded-full bg-muted w-3/4" />
          <div className="h-2 rounded-full bg-muted w-2/3" />
          {variant !== "detail" && (
            <div className="grid grid-cols-3 gap-1.5 pt-2">
              <div className="h-8 rounded bg-muted/40" />
              <div className="h-8 rounded bg-muted/40" />
              <div className="h-8 rounded bg-muted/40" />
            </div>
          )}
          {variant === "detail" && (
            <div className="space-y-1.5 pt-1">
              <div className="h-2 rounded-full bg-muted w-full" />
              <div className="h-2 rounded-full bg-muted w-5/6" />
              <div className="h-2 rounded-full bg-muted w-4/6" />
            </div>
          )}
        </div>
      </div>
      {/* Image replacement label */}
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/70 text-[10px] text-muted-foreground border border-border/40">
        {label}
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) notFound()

  const { prev, next } = getAdjacentCases(slug)

  return (
    <>
      <LegalHeader />
      <main className="pt-20 lg:pt-24">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className={cn("py-16 lg:py-20", scheme.heroBg)}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/#realisations" className="hover:text-foreground transition-colors">Réalisations</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{project.client.name}</span>
            </nav>

                <span className="inline-flex items-center gap-2 mb-6 px-2.5 py-1.5 border border-border font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  Cas n°{c.idx} · {c.tag}
                </span>

                <h1
                  className="mb-6 font-extrabold leading-[0.92] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
                >
                  {c.client},<br />
                  <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                    {c.tag.toLowerCase()}.
                  </em>
                </h1>

                <p className="text-[18px] leading-[1.5] text-muted-foreground max-w-[540px] mb-8">{c.desc}</p>

                <Link
                  href="#diagnostic"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent text-accent-foreground font-medium text-[14px] hover:bg-foreground hover:text-background transition-colors"
                >
                  Lire le cas <Arrow size={14} />
                </Link>
              </div>

              {/* Right — meta rows */}
              <div className="flex flex-col gap-4 pt-8 border-t border-border lg:border-t-0 lg:pt-0 lg:border-l lg:pl-12">
                {[
                  { l: "Client",      v: c.client },
                  { l: "Secteur",     v: c.sector },
                  { l: "Année",       v: c.year },
                  { l: "Catégorie",   v: c.tag },
                  { l: "KPI principal", v: c.kpi },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between gap-4 pb-4 border-b border-border">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{l}</span>
                    <span className="text-[14px] font-medium text-right">{v}</span>
                  </div>
                ) : (
                  <ProjectMockup
                    colorScheme={project.colorScheme}
                    variant="desktop"
                    label="Remplacer par capture homepage"
                  />
                )}
                {/* Floating mobile */}
                <div className="absolute -bottom-6 -right-4 w-28 shadow-2xl rounded-xl overflow-hidden border border-border">
                  {project.images?.mobile ? (
                    <div className="relative aspect-[9/16]">
                      <Image
                        src={project.images.mobile}
                        alt={`Vue mobile ${project.client.name}`}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  ) : (
                    <div className={cn("aspect-[9/16]", scheme.heroBg)}>
                      <div className="h-3 bg-muted/80 flex items-center px-1.5 gap-0.5">
                        <div className="flex-1 h-1.5 rounded-full bg-muted" />
                      </div>
                      <div className="p-1.5 space-y-1">
                        <div className={cn("h-8 rounded", scheme.mockupBg)} />
                        <div className="h-1 rounded-full bg-muted w-3/4" />
                        <div className="h-1 rounded-full bg-muted w-1/2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEXTE ──────────────────────────────────────────────── */}
        <section className="py-20 border-b border-border">
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
                <div className="rounded-2xl border border-border bg-card p-6 sticky top-28">
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", scheme.cardGradient)}>
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
                      className="font-mono text-[13px] tracking-[0.02em] text-muted-foreground hover:text-accent transition-colors block py-3 pl-5 border-l-2 border-border hover:border-accent"
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
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="bg-background/70 rounded-2xl border border-border/50 p-6 backdrop-blur-sm"
                >
                  <p className={cn("text-3xl font-bold mb-1", scheme.accentText)}>{r.value}</p>
                  <p className="font-semibold text-foreground text-sm mb-2">{r.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>

            {/* Performance section */}
            <div className="bg-background/70 rounded-2xl border border-border/50 p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Performance technique</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scores Lighthouse — standard d'excellence Google
                  </p>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 max-w-xs">
                  Mesurés sur la version de production, mobile et desktop, via Lighthouse 12
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                <PerformanceGauge
                  score={project.performance.performance}
                  label="Performance"
                  color="#0D0D0D"
                />
                <PerformanceGauge
                  score={project.performance.accessibility}
                  label="Accessibilité"
                  color="#0D0D0D"
                />
                <PerformanceGauge
                  score={project.performance.seo}
                  label="SEO"
                  color="#0D0D0D"
                />
                <PerformanceGauge
                  score={project.performance.bestPractices}
                  label="Bonnes pratiques"
                  color="#0D0D0D"
                />
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

          {/* ── Testimonial ──────────────────────────────────────────────────── */}
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

          {/* ── Previous / Next ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-border">
            {prev ? (
              <Link
                href={`/realisations/${prev.slug}`}
                className="group flex flex-col gap-3 p-8 lg:p-12 border-r border-border hover:bg-[rgba(230,48,48,0.04)] transition-colors"
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
                className="group flex flex-col gap-3 p-8 lg:p-12 text-right hover:bg-[rgba(230,48,48,0.04)] transition-colors"
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
              className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] hover:bg-foreground hover:text-background transition-colors"
            >
              Démarrer un diagnostic <Arrow size={14} />
            </Link>
          </section>

        </article>
      </main>
      <Footer />
    </>
  )
}
