import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlanDuSiteCatalog } from "@/components/plan-du-site-catalog"
import { ALL_METIERS, ALL_VILLES } from "@/lib/seo-data"

const PAGES_COUNT = 9
const totalPages = PAGES_COUNT + ALL_METIERS.length + ALL_VILLES.length + ALL_METIERS.length * ALL_VILLES.length

export const metadata: Metadata = {
  title: "Plan du site — Toutes nos pages | Mobem Solutions",
  description: `Retrouvez l'ensemble des ${totalPages.toLocaleString("fr-FR")} pages de notre site : pages métiers, pages villes, pages métier × ville et pages principales.`,
  robots: { index: true, follow: true },
}

export default function PlanDuSitePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-0 border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="pb-12">
              <nav className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground" aria-label="Fil d'Ariane">
                <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
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
            <div className="hidden lg:flex flex-col pb-12 pr-2 text-right">
              <span className="text-[clamp(80px,10vw,140px)] font-extrabold leading-none tracking-[-0.05em] text-accent tabular-nums">
                {totalPages.toLocaleString("fr-FR")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-1">pages indexées</span>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {[
            { v: String(PAGES_COUNT), l: "Pages principales" },
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

        <PlanDuSiteCatalog />

      </main>
      <Footer />
    </>
  )
}
