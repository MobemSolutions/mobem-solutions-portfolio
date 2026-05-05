import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { METIER_CATEGORIES, ALL_VILLES } from "@/lib/seo-data"

export const metadata: Metadata = {
  title: "Sites internet par métier — Création de site pour artisans & commerçants | Mobem Solutions",
  description: `Création de site internet professionnel pour ${METIER_CATEGORIES.flatMap((c) => c.metiers).length}+ métiers. Plombier, électricien, ostéopathe, salon de coiffure… chaque site est optimisé SEO local pour dominer Google dans votre ville.`,
  openGraph: {
    title: "Sites internet par métier | Mobem Solutions",
    description: "Création de site internet professionnel pour artisans, commerçants et professions libérales. SEO local inclus.",
    url: "https://mobem-solutions.com/metiers",
  },
}

const TOP_VILLES_LABELS = ALL_VILLES.slice(0, 8).map((v) => v.label)

export default function MetiersPage() {
  const allMetiers = METIER_CATEGORIES.flatMap((c) => c.metiers)

  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="pt-8 pb-4 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Nos métiers</span>
          </nav>

          {/* Hero */}
          <div className="pb-10 border-b border-border">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Création de site internet par métier
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              <strong>{allMetiers.length}+ métiers</strong> couverts dans toute la France. Chaque site inclut une{" "}
              <span className="text-accent">optimisation SEO locale</span> pour dominer Google dans votre ville.
            </p>
          </div>

          {/* Catégories */}
          <div className="space-y-16 pt-12">
            {METIER_CATEGORIES.map((cat) => (
              <section key={cat.slug}>
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{cat.label}</h2>
                  <span className="text-sm text-muted-foreground">{cat.metiers.length} métiers</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.metiers.map((metier) => (
                    <Link
                      key={metier.slug}
                      href={`/metiers/${metier.slug}`}
                      className="group block border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all bg-card"
                    >
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {metier.label}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {metier.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {TOP_VILLES_LABELS.map((ville) => (
                          <span
                            key={ville}
                            className="text-xs text-accent/80 border border-accent/20 rounded-md px-2 py-0.5"
                          >
                            {ville}
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5">
                          +{ALL_VILLES.length - TOP_VILLES_LABELS.length} villes
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl bg-secondary p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Votre métier n&apos;est pas dans la liste ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nous créons des sites pour tous les artisans, commerçants et professions libérales.
              Contactez-nous pour une étude personnalisée.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Discutons de votre projet
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
