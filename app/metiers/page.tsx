import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { METIER_CATEGORIES, ALL_VILLES } from "@/lib/seo-data"

const ALL_METIERS_FLAT = METIER_CATEGORIES.flatMap((c) => c.metiers)
const TOP_VILLES = ALL_VILLES.slice(0, 8)
const EXTRA_VILLES = ALL_VILLES.length - TOP_VILLES.length

export const metadata: Metadata = {
  title: "Sites internet par métier — Création de site pour artisans & commerçants | Mobem Solutions",
  description: `Création de site internet professionnel pour ${ALL_METIERS_FLAT.length}+ métiers. Plombier, électricien, ostéopathe, salon de coiffure… chaque site est optimisé SEO local pour dominer Google dans votre ville.`,
  openGraph: {
    title: "Sites internet par métier | Mobem Solutions",
    description: "Création de site internet professionnel pour artisans, commerçants et professions libérales. SEO local inclus.",
    url: "https://mobem-solutions.com/metiers",
  },
}

export default function MetiersPage() {
  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="pt-14 lg:pt-16 border-t border-border" aria-labelledby="metiers-heading">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
            <nav
              className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
              aria-label="Fil d'Ariane"
            >
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">Sites par métier</span>
            </nav>
            <h1
              id="metiers-heading"
              className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6"
            >
              Création de site<br />
              par{" "}
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                métier
              </em>.
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px]">
              <strong className="font-semibold text-accent">{ALL_METIERS_FLAT.length} métiers couverts</strong>{" "}
              partout en France. Chaque site inclut une optimisation SEO locale pour dominer Google dans votre ville.
            </p>
          </div>
        </section>

        {/* Catalog */}
        {METIER_CATEGORIES.map((cat) => (
          <section key={cat.slug} className="border-t border-border">
            <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-baseline gap-4 border-b border-border">
              <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-0.03em] leading-none">
                {cat.label}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {cat.metiers.length} métiers
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/10 dark:border-foreground/15">
              {cat.metiers.map((metier) => (
                <Link
                  key={metier.slug}
                  href={`/metiers/${metier.slug}`}
                  className="group bento-hover p-7 border-r border-b border-foreground/10 dark:border-foreground/15 flex flex-col gap-3.5 min-h-[260px] transition-colors"
                  data-cursor="hover"
                  aria-label={`Création de site internet pour ${metier.label}`}
                >
                  <h3 className="text-[22px] font-bold tracking-[-0.02em]">{metier.label}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-muted-foreground group-hover:text-background/70 flex-1 transition-colors">
                    {metier.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 items-center" aria-hidden="true">
                    {TOP_VILLES.map((v) => (
                      <span
                        key={v.slug}
                        className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-accent tracking-[0.04em] uppercase whitespace-nowrap"
                      >
                        {v.label}
                      </span>
                    ))}
                    <span className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-muted-foreground group-hover:text-background/60 tracking-[0.04em] uppercase whitespace-nowrap transition-colors">
                      +{EXTRA_VILLES} villes
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
            Votre métier n&apos;est pas listé ?
          </div>
          <h2 className="mx-auto mb-8 max-w-[800px] text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
            Nous adaptons à{" "}
            <em className="font-serif font-normal italic text-accent">
              tous les métiers
            </em>.
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-accent-foreground font-medium text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            Parler de mon projet
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
