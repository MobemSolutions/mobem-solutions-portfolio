import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, MapPin, Building2, Calendar, CheckCircle2, Quote } from "lucide-react"
import { LegalHeader } from "@/components/legal-header"
import { Footer } from "@/components/footer"
import { projects, getProject, getAdjacentProjects, COLOR_SCHEMES, type Project, type ColorScheme } from "@/lib/projects"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Projet non trouvé | Mobem Solutions" }
  return {
    title: `${project.title} — ${project.client.name} | Mobem Solutions`,
    description: project.description,
    robots: { index: true, follow: true },
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
  const scoreColor =
    score >= 90 ? color : score >= 70 ? "#F59E0B" : "#EF4444"

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
      <div className={cn("absolute inset-0 bg-gradient-to-br", scheme.heroBg)} />
      <div className="absolute inset-3 rounded-lg bg-background/80 shadow-inner overflow-hidden">
        {/* Browser chrome */}
        <div className="h-5 bg-muted/80 flex items-center px-2 gap-1 border-b border-border/30">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
          <div className="flex-1 mx-2 h-2 rounded-full bg-muted" />
        </div>
        {/* Skeleton content */}
        <div className="p-3 space-y-2">
          <div className={cn("rounded-md bg-gradient-to-br", scheme.mockupBg, variant === "desktop" ? "h-24" : "h-16")} />
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { next, prev } = getAdjacentProjects(slug)
  const scheme = COLOR_SCHEMES[project.colorScheme]

  return (
    <>
      <LegalHeader />
      <main className="pt-20 lg:pt-24">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className={cn("py-16 lg:py-20 bg-gradient-to-br", scheme.heroBg)}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/#realisations" className="hover:text-foreground transition-colors">Réalisations</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{project.client.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full", scheme.badge)}>
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-background/60">
                    {project.client.sector}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Hero metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {project.results.slice(0, 4).map((r) => (
                    <div key={r.label} className="bg-background/60 rounded-xl border border-border/50 p-3">
                      <p className={cn("text-xl font-bold", scheme.accentText)}>{r.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {project.year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {project.client.location}
                  </span>
                </div>
              </div>

              {/* Right: Main mockup */}
              <div className="relative">
                {project.images?.maquette ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-lg">
                    <Image
                      src={project.images.maquette}
                      alt={`Maquettage du site ${project.client.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
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
                    <div className={cn("aspect-[9/16] bg-gradient-to-b", scheme.heroBg)}>
                      <div className="h-3 bg-muted/80 flex items-center px-1.5 gap-0.5">
                        <div className="flex-1 h-1.5 rounded-full bg-muted" />
                      </div>
                      <div className="p-1.5 space-y-1">
                        <div className={cn("h-8 rounded bg-gradient-to-br", scheme.mockupBg)} />
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
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", scheme.cardGradient)}>
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
        </section>

        {/* ── APPROCHE ──────────────────────────────────────────────── */}
        <section className="py-20 border-b border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Notre méthode
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Comment on a attaqué le problème
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {project.approach.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-5 bg-card rounded-2xl border border-border p-6"
                >
                  <div className="shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2",
                      scheme.accentText,
                      "border-current bg-background"
                    )}>
                      {String(step.step).padStart(2, "0")}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVRABLES / MOCKUPS ───────────────────────────────────── */}
        <section className="py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Ce qu'on a livré
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Les livrables du projet
              </h2>
            </div>

            {/* Mockup grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="md:col-span-2">
                {project.images?.section1 ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-md">
                    <Image
                      src={project.images.section1}
                      alt={`Sections du site — ${project.client.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                ) : (
                  <ProjectMockup colorScheme={project.colorScheme} variant="desktop" label="Page services" />
                )}
              </div>
              <div>
                {project.images?.home ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-md">
                    <Image
                      src={project.images.home}
                      alt={`Page d'accueil ${project.client.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <ProjectMockup colorScheme={project.colorScheme} variant="tablet" label="Page d'accueil" />
                )}
              </div>
            </div>

            {/* Deliverables list */}
            <div className="grid sm:grid-cols-2 gap-3">
              {project.deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-card rounded-xl border border-border p-4">
                  <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", scheme.accentText)} aria-hidden="true" />
                  <p className="text-sm text-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RÉSULTATS & PERFORMANCE ───────────────────────────────── */}
        <section className={cn("py-20 border-b border-border bg-gradient-to-br", scheme.heroBg)}>
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
                  color="#3B82F6"
                />
                <PerformanceGauge
                  score={project.performance.accessibility}
                  label="Accessibilité"
                  color="#10B981"
                />
                <PerformanceGauge
                  score={project.performance.seo}
                  label="SEO"
                  color="#8B5CF6"
                />
                <PerformanceGauge
                  score={project.performance.bestPractices}
                  label="Bonnes pratiques"
                  color="#F59E0B"
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
        </section>

        {/* ── TÉMOIGNAGE ────────────────────────────────────────────── */}
        <section className="py-20 border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Ce qu'ils en disent
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-8 lg:p-12 relative">
              <Quote
                className={cn("absolute top-6 right-8 w-8 h-8 opacity-20", scheme.accentText)}
                aria-hidden="true"
              />
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed font-medium mb-6 text-balance">
                "{project.testimonial.quote}"
              </blockquote>
              <footer className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center shrink-0 text-sm font-bold text-foreground/80",
                  scheme.cardGradient
                )}>
                  {project.testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{project.testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
                </div>
              </footer>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="py-20 border-b border-border bg-muted/20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Votre projet
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Votre secteur mérite la même attention
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Chaque projet que nous menons part d'une vraie compréhension de votre métier. Pas de template. Pas de raccourcis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                Discuter de votre projet
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/#realisations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors text-sm"
              >
                Voir toutes les réalisations
              </Link>
            </div>
          </div>
        </section>

        {/* ── NAVIGATION PROJETS ────────────────────────────────────── */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Projet précédent */}
              <Link
                href={`/realisations/${prev.slug}`}
                className="group flex items-center gap-4 bg-card rounded-2xl border border-border p-5 hover:border-accent/50 transition-all"
              >
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                  <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Projet précédent</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {prev.client.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{prev.title}</p>
                </div>
              </Link>

              {/* Projet suivant */}
              <Link
                href={`/realisations/${next.slug}`}
                className="group flex items-center justify-end gap-4 bg-card rounded-2xl border border-border p-5 hover:border-accent/50 transition-all"
              >
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">Projet suivant</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {next.client.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{next.title}</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
