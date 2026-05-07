import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MetiersCatalog } from "@/components/metiers-catalog"
import { METIER_CATEGORIES } from "@/lib/seo-data"

const ALL_METIERS_FLAT = METIER_CATEGORIES.flatMap((c) => c.metiers)

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
            <nav className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">Sites par métier</span>
            </nav>
            <h1 id="metiers-heading" className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6">
              Création de site<br />
              par{" "}
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">métier</em>.
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px]">
              <strong className="font-semibold text-accent">{ALL_METIERS_FLAT.length} métiers couverts</strong>{" "}
              partout en France. Chaque site inclut une optimisation SEO locale pour dominer Google dans votre ville.
            </p>
          </div>
        </section>

        <MetiersCatalog />
      </main>
      <Footer />
    </>
  )
}
