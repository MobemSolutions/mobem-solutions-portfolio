import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CASES } from "@/lib/cases"

export const metadata: Metadata = {
  title: "Réalisations — Mobem Solutions",
  description: "Projets livrés en France — refontes, sites essentiels, plateformes sur mesure. Chaque cas est un diagnostic, une prescription, une exécution mesurée.",
  openGraph: {
    title: "Réalisations — Mobem Solutions",
    description: "Sites vitrines, refontes digitales, plateformes sur mesure pour PME et ETI.",
    url: "https://mobem-solutions.com/realisations",
  },
}

const FILTERS = [
  { id: "all",       label: "Tous",             count: CASES.length },
  { id: "refonte",   label: "Refontes",          count: CASES.filter(c => c.cat === "refonte").length },
  { id: "essentiel", label: "Sites essentiels",  count: CASES.filter(c => c.cat === "essentiel").length },
  { id: "plateforme",label: "Plateformes",       count: CASES.filter(c => c.cat === "plateforme").length },
  { id: "seo",       label: "SEO local",         count: CASES.filter(c => c.cat === "seo").length },
]

// ── Arrow SVG ──────────────────────────────────────────────────────────────

function Arrow({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className={className} aria-hidden="true"
    >
      <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
    </svg>
  )
}

// ── Case row ───────────────────────────────────────────────────────────────

function CaseRow({ c }: { c: typeof CASES[number] }) {
  return (
    <Link
      href={`/realisations/${c.slug}`}
      className="group bento-hover flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-6 border-b border-border transition-colors lg:grid lg:items-center lg:gap-6 lg:[grid-template-columns:70px_2fr_1.2fr_1fr_1fr_48px]"
      data-cursor="hover"
    >
      <span className="hidden lg:block text-[11px] text-foreground/50 group-hover:text-background/50 transition-colors">{c.idx}</span>
      <div className="flex-1 lg:flex-none min-w-0">
        <div className="text-[clamp(20px,2.5vw,36px)] font-bold tracking-[-0.025em] leading-none truncate">{c.client}</div>
        <div className="lg:hidden mt-1 text-[12px] text-foreground/55 group-hover:text-background/55 transition-colors truncate">
          {c.tag}{c.kpi ? <span className="text-accent font-semibold ml-2">{c.kpi}</span> : null}
        </div>
      </div>
      <div className="hidden lg:block text-[11px] uppercase tracking-[0.04em] text-foreground/60 group-hover:text-background/60 transition-colors">{c.sector}</div>
      <div className="hidden md:block text-[13.5px]">{c.tag}</div>
      <div className="hidden sm:block text-[14px] font-semibold text-accent">{c.kpi}</div>
      <div className="flex justify-end ml-auto lg:ml-0 shrink-0">
        <Arrow className="transition-transform duration-280 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
      </div>
    </Link>
  )
}

// ── Case card ──────────────────────────────────────────────────────────────

function CaseCard({ c }: { c: typeof CASES[number] }) {
  return (
    <Link
      href={`/realisations/${c.slug}`}
      className="group bento-hover w-[320px] sm:w-auto border-r border-b border-border flex flex-col gap-4 p-8 transition-colors"
      data-cursor="hover"
    >
      <div className="aspect-[4/3] bg-foreground/[.06] group-hover:bg-background/10 transition-colors flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/30 dark:text-foreground/60 group-hover:text-background/40">
        [ capture · {c.client.toLowerCase()} ]
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground/50 dark:text-foreground/75 group-hover:text-background/50 transition-colors">{c.idx} · {c.year}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">{c.tag}</span>
      </div>
      <h3 className="text-[28px] font-bold tracking-[-0.025em] leading-none mt-1">{c.client}</h3>
      <p className="text-[13.5px] leading-[1.55] text-foreground/60 group-hover:text-background/70 transition-colors">{c.desc}</p>
      <div className="flex gap-8 pt-4 border-t border-foreground/10 group-hover:border-background/10 mt-auto transition-colors">
        {c.stats.map(([v, l], i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[22px] font-bold tracking-[-0.02em] text-accent leading-none">{v}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground/50 dark:text-foreground/75 group-hover:text-background/50 transition-colors">{l}</div>
          </div>
        ))}
      </div>
    </Link>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{ filtre?: string }>
}

export default async function RealisationsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeFilter = params.filtre || "all"

  const filteredCases = activeFilter === "all"
    ? CASES
    : CASES.filter(c => c.cat === activeFilter)

  const selectionCases = activeFilter === "all"
    ? CASES.slice(0, 6)
    : filteredCases

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
            <nav
              className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
              aria-label="Fil d'Ariane"
            >
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-foreground">Réalisations</span>
            </nav>
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6">
              Réalisations<br />
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                2024 — 2026.
              </em>
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px] text-muted-foreground">
              <strong>47 projets livrés</strong> en France — refontes, sites essentiels,
              plateformes sur mesure. Chaque cas est un diagnostic, une prescription, une exécution mesurée.
            </p>
          </div>
        </section>

        {/* ── Filters ──────────────────────────────────────────────────────── */}
        <div className="flex items-center flex-wrap border-t border-b border-border overflow-x-auto">
          {FILTERS.map((f) => (
            <Link
              key={f.id}
              href={f.id === "all" ? "/realisations" : `/realisations?filtre=${f.id}`}
              data-cursor="hover"
              className={`font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-4 border-r border-border whitespace-nowrap transition-colors ${
                activeFilter === f.id
                  ? "text-foreground border-b-2 border-b-accent -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label} · {f.count}
            </Link>
          ))}
        </div>

        {/* ── Sélection éditoriale ─────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
          <div className="flex items-baseline gap-5">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Sélection éditoriale</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">Vue liste</span>
        </div>

        <div>
          {selectionCases.map((c) => (
            <CaseRow key={c.idx} c={c} />
          ))}
        </div>

        {/* ── Galerie complète ────────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-t border-b border-border">
          <div className="flex items-baseline gap-5">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Galerie complète</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">{filteredCases.length} projet{filteredCases.length > 1 ? "s" : ""}</span>
        </div>

        <div className="overflow-x-auto sm:overflow-visible scrollbar-none">
          <div className="flex sm:grid sm:grid-cols-2 border-t border-l border-border min-w-max sm:min-w-0">
            {filteredCases.map((c) => (
              <CaseCard key={c.idx} c={c} />
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
            Votre projet
          </div>
          <h2 className="mx-auto mb-6 max-w-[720px] text-[clamp(36px,4vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
            Le prochain cas{" "}
            <em className="font-serif font-normal italic text-accent">
              pourrait être le vôtre.
            </em>
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
          >
            Démarrer un diagnostic
            <Arrow size={14} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
