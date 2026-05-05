import type { Metadata } from "next"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { REGIONS, ALL_VILLES, TOP_METIERS } from "@/lib/seo-data"

export const metadata: Metadata = {
  title: "Création de site internet par ville — 30 villes en France | Mobem Solutions",
  description: `Création de site internet professionnel dans ${ALL_VILLES.length} villes de France. SEO local inclus pour dominer Google dans votre ville. Paris, Lyon, Marseille, Bordeaux…`,
  openGraph: {
    title: "Sites internet par ville | Mobem Solutions",
    description: `Création de site internet dans ${ALL_VILLES.length} villes de France avec SEO local inclus.`,
    url: "https://mobem-solutions.com/villes",
  },
}

const PREVIEW_METIERS = TOP_METIERS.slice(0, 8).map((m) => m.label)

export default function VillesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="pt-8 pb-4 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Nos villes</span>
          </nav>

          {/* Hero */}
          <div className="pb-10 border-b border-border">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Création de site internet par ville
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              <strong>{ALL_VILLES.length} villes</strong> couvertes dans toute la France. Chaque site inclut une{" "}
              <span className="text-accent">optimisation SEO locale</span> pour dominer Google dans votre ville.
            </p>
          </div>

          {/* Régions */}
          <div className="space-y-16 pt-12">
            {REGIONS.map((region) => (
              <section key={region.label}>
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{region.label}</h2>
                  <span className="text-sm text-muted-foreground">{region.villes.length} ville{region.villes.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {region.villes.map((ville) => (
                    <Link
                      key={ville.slug}
                      href={`/villes/${ville.slug}`}
                      className="group block border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all bg-card"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {ville.label}
                        </h3>
                      </div>
                      <p className="text-sm text-accent/70 mb-4">
                        {ville.departement} ({ville.codePostal}) — {ville.population}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {PREVIEW_METIERS.slice(0, 6).map((metier) => (
                          <span
                            key={metier}
                            className="text-xs text-accent/80 border border-accent/20 rounded-md px-2 py-0.5"
                          >
                            {metier}
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5">
                          +40 métiers
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
              Votre ville n&apos;est pas dans la liste ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nous intervenons dans toute la France, même dans les villes non listées.
              Contactez-nous pour discuter de votre projet.
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
