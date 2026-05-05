import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { METIER_CATEGORIES, REGIONS, ALL_METIERS, ALL_VILLES } from "@/lib/seo-data"

export const metadata: Metadata = {
  title: "Plan du site — Toutes nos pages | Mobem Solutions",
  description: `Retrouvez l'ensemble des ${ALL_METIERS.length * ALL_VILLES.length + ALL_METIERS.length + ALL_VILLES.length + 10} pages de notre site : pages métiers, pages villes, pages métier × ville et pages principales.`,
  robots: { index: true, follow: true },
}

const PAGES_PRINCIPALES = [
  { name: "Accueil", href: "/" },
  { name: "Portfolio", href: "/realisations" },
  { name: "Tarifs", href: "/#pricing" },
  { name: "Comment ça marche", href: "/methode" },
  { name: "Blog", href: "/blog" },
  { name: "À propos", href: "/a-propos" },
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Confidentialité", href: "/confidentialite" },
]

const totalPages =
  PAGES_PRINCIPALES.length +
  ALL_METIERS.length +
  ALL_VILLES.length +
  ALL_METIERS.length * ALL_VILLES.length

export default function PlanDuSitePage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="py-12 border-b border-border">
            <h1 className="text-4xl font-bold text-foreground mb-3">Plan du site</h1>
            <p className="text-muted-foreground text-lg">
              Retrouvez l&apos;ensemble des{" "}
              <span className="font-semibold text-foreground">{totalPages.toLocaleString("fr-FR")} pages</span>{" "}
              de notre site.
            </p>
          </div>

          <div className="space-y-16 pt-12">

            {/* Pages principales */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Pages principales</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {PAGES_PRINCIPALES.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="text-sm text-accent hover:underline"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Sites par métier */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-2">Sites par métier</h2>
              <p className="text-muted-foreground text-sm mb-8">
                <Link href="/metiers" className="text-accent hover:underline">
                  Voir tous les métiers →
                </Link>
              </p>
              <div className="space-y-10">
                {METIER_CATEGORIES.map((cat) => (
                  <div key={cat.slug}>
                    <h3 className="text-base font-semibold text-foreground mb-4">{cat.label}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {cat.metiers.map((metier) => (
                        <Link
                          key={metier.slug}
                          href={`/metiers/${metier.slug}`}
                          className="text-sm text-accent hover:underline"
                        >
                          {metier.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sites par ville */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-2">Sites par ville</h2>
              <p className="text-muted-foreground text-sm mb-8">
                <Link href="/villes" className="text-accent hover:underline">
                  Voir toutes les villes →
                </Link>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {ALL_VILLES.map((ville) => (
                  <Link
                    key={ville.slug}
                    href={`/villes/${ville.slug}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {ville.label}{" "}
                    <span className="text-muted-foreground">({ville.codePostal})</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Toutes les pages métier × ville */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Toutes les pages métier × ville
              </h2>
              <div className="space-y-4">
                {ALL_METIERS.map((metier) => (
                  <details key={metier.slug} className="group border border-border rounded-lg">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none hover:bg-muted/50 transition-colors rounded-lg">
                      <span className="font-medium text-foreground">
                        {metier.label}{" "}
                        <span className="text-muted-foreground font-normal text-sm">
                          — {ALL_VILLES.length} villes
                        </span>
                      </span>
                      <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">▶</span>
                    </summary>
                    <div className="px-5 pb-5 pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {ALL_VILLES.map((ville) => (
                        <Link
                          key={ville.slug}
                          href={`/metiers/${metier.slug}/${ville.slug}`}
                          className="text-sm text-accent hover:underline"
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
        </div>
      </main>
      <Footer />
    </>
  )
}
