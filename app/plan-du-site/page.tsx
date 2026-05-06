import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { METIER_CATEGORIES, REGIONS, ALL_METIERS, ALL_VILLES } from "@/lib/seo-data"

export const metadata: Metadata = {
  title: "Plan du site — Toutes nos pages | Mobem Solutions",
  description: `Retrouvez l'ensemble des pages de notre site : pages métiers, pages villes, pages métier × ville et pages principales.`,
  robots: { index: true, follow: true },
}

const PAGES_PRINCIPALES = [
  { name: "Accueil", href: "/", num: "01" },
  { name: "Portfolio", href: "/realisations", num: "02" },
  { name: "Tarifs", href: "/#pricing", num: "03" },
  { name: "Comment ça marche", href: "/methode", num: "04" },
  { name: "Blog", href: "/blog", num: "05" },
  { name: "À propos", href: "/a-propos", num: "06" },
  { name: "Mentions légales", href: "/mentions-legales", num: "07" },
  { name: "CGV", href: "/cgv", num: "08" },
  { name: "Confidentialité", href: "/confidentialite", num: "09" },
]

const totalPages =
  PAGES_PRINCIPALES.length +
  ALL_METIERS.length +
  ALL_VILLES.length +
  ALL_METIERS.length * ALL_VILLES.length

function ArrowDiag() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
    </svg>
  )
}

export default function PlanDuSitePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-0 border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="pb-12">
              <nav className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground" aria-label="Fil d'Ariane">
                <Link href="/" className="hover:text-accent transition-colors" data-cursor="hover">Accueil</Link>
                <span>/</span>
                <span className="text-foreground">Plan du site</span>
              </nav>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">Navigation complète</div>
              <h1 className="font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(40px,6vw,88px)] mb-4">
                Plan du <em className="font-serif font-normal italic text-accent">site.</em>
              </h1>
              <p className="text-[16px] leading-[1.55] text-muted-foreground max-w-[560px]">
                Index complet de toutes les pages — principales, métiers, villes et combinaisons.
              </p>
            </div>
            {/* Big counter */}
            <div className="hidden lg:flex flex-col pb-12 pr-2 text-right">
              <span className="text-[clamp(80px,10vw,140px)] font-extrabold leading-none tracking-[-0.05em] text-accent tabular-nums">
                {totalPages.toLocaleString("fr-FR")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-1">pages indexées</span>
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {[
            { v: String(PAGES_PRINCIPALES.length), l: "Pages principales" },
            { v: String(ALL_METIERS.length), l: "Pages métiers" },
            { v: String(ALL_VILLES.length), l: "Pages villes" },
            { v: (ALL_METIERS.length * ALL_VILLES.length).toLocaleString("fr-FR"), l: "Pages métier × ville" },
          ].map((stat, i) => (
            <div key={i} className="px-4 sm:px-6 lg:px-8 py-6 border-r border-border last:border-r-0">
              <div className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.03em] text-accent leading-none">{stat.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground/70 mt-2">{stat.l}</div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 lg:px-8">

          {/* ── Pages principales ────────────────────────────────────────────── */}
          <section className="border-b border-border py-12">
            <div className="flex items-baseline justify-between mb-8">
              <div className="flex items-baseline gap-5">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Pages principales</h2>
              </div>
              <span className="font-mono text-[11px] text-foreground/70">{PAGES_PRINCIPALES.length} pages</span>
            </div>
            <div className="border-t border-l border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {PAGES_PRINCIPALES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  data-cursor="hover"
                  className="group border-r border-b border-border px-5 py-5 flex items-center justify-between gap-4 bento-hover transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-foreground/40 dark:text-foreground/65 group-hover:text-background/40 transition-colors">{page.num}</span>
                    <span className="text-[15px] font-medium">{page.name}</span>
                  </div>
                  <ArrowDiag />
                </Link>
              ))}
            </div>
          </section>

          {/* ── Sites par métier ──────────────────────────────────────────────── */}
          <section className="border-b border-border py-12">
            <div className="flex items-baseline justify-between mb-8">
              <div className="flex items-baseline gap-5">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Sites par métier</h2>
              </div>
              <Link href="/metiers" data-cursor="hover" className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">
                Voir tous →
              </Link>
            </div>
            <div className="space-y-8">
              {METIER_CATEGORIES.map((cat) => (
                <div key={cat.slug}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/70 mb-4 border-b border-border pb-3">{cat.label}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-0 border-t border-l border-border">
                    {cat.metiers.map((metier) => (
                      <Link
                        key={metier.slug}
                        href={`/metiers/${metier.slug}`}
                        data-cursor="hover"
                        className="group border-r border-b border-border px-4 py-3.5 flex items-center justify-between gap-3 bento-hover transition-colors"
                      >
                        <span className="font-mono text-[12px] text-accent">{metier.label}</span>
                        <ArrowDiag />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Sites par ville ───────────────────────────────────────────────── */}
          <section className="border-b border-border py-12">
            <div className="flex items-baseline justify-between mb-8">
              <div className="flex items-baseline gap-5">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Sites par ville</h2>
              </div>
              <Link href="/villes" data-cursor="hover" className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">
                Voir toutes →
              </Link>
            </div>
            <div className="space-y-10">
              {REGIONS.map((region) => (
                <div key={region.label}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/70 mb-4 border-b border-border pb-3">{region.label}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-border">
                    {region.villes.map((ville) => (
                      <Link
                        key={ville.slug}
                        href={`/villes/${ville.slug}`}
                        data-cursor="hover"
                        className="group border-r border-b border-border px-4 py-3.5 flex items-center justify-between gap-2 bento-hover transition-colors"
                      >
                        <div>
                          <span className="font-mono text-[12px] text-accent">{ville.label}</span>
                          <span className="font-mono text-[10px] text-foreground/50 dark:text-foreground/75 group-hover:text-background/50 ml-1.5 transition-colors">({ville.codePostal})</span>
                        </div>
                        <ArrowDiag />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Toutes les pages métier × ville ──────────────────────────────── */}
          <section className="border-b border-border py-12">
            <div className="flex items-baseline justify-between mb-8">
              <div className="flex items-baseline gap-5">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Pages métier × ville</h2>
              </div>
              <span className="font-mono text-[11px] text-foreground/70">
                {(ALL_METIERS.length * ALL_VILLES.length).toLocaleString("fr-FR")} combinaisons
              </span>
            </div>
            <div className="space-y-1">
              {ALL_METIERS.map((metier) => (
                <details key={metier.slug} className="group faq-details border border-border">
                  <summary
                    data-cursor="hover"
                    className="group flex items-center justify-between px-5 py-4 select-none bento-hover transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-background/50">→</span>
                      <span className="font-medium text-foreground text-[15px] group-hover:text-background">{metier.label}</span>
                      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60">{ALL_VILLES.length} villes</span>
                    </div>
                  </summary>
                  <div className="border-t border-border grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-l border-border">
                    {ALL_VILLES.map((ville) => (
                      <Link
                        key={ville.slug}
                        href={`/metiers/${metier.slug}/${ville.slug}`}
                        data-cursor="hover"
                        className="border-r border-b border-border px-4 py-3 font-mono text-[11px] text-accent bento-hover transition-colors"
                      >
                        {metier.label} {ville.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
