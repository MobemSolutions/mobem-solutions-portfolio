import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, CheckCircle2, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ALL_VILLES,
  getVilleBySlug,
  METIER_CATEGORIES,
} from "@/lib/seo-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_VILLES.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) return {}
  return {
    title: `Création de site internet à ${ville.label} | Mobem Solutions`,
    description: `Création de site internet professionnel à ${ville.label} (${ville.codePostal}). Plombier, électricien, salon de coiffure… SEO local inclus pour tous les métiers à ${ville.label}.`,
    openGraph: {
      title: `Site internet à ${ville.label} | Mobem Solutions`,
      description: `Création de site internet pour artisans et commerçants à ${ville.label}. SEO local, en ligne en 72h.`,
      url: `https://mobem-solutions.com/villes/${slug}`,
    },
  }
}

export default async function VillePage({ params }: Props) {
  const { slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) notFound()

  const autresVilles = ALL_VILLES.filter((v) => v.slug !== slug).slice(0, 8)

  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="pt-8 pb-4 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/villes" className="hover:text-foreground transition-colors">Nos villes</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{ville.label}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12 pt-4">

            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  {ville.departement} ({ville.codePostal}) · {ville.region} · {ville.population}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                Création de site internet à {ville.label}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">
                À {ville.label}, les artisans, commerçants et professions libérales qui ne sont pas
                visibles sur Google perdent chaque jour des clients au profit de concurrents mieux
                référencés. Avec un site Mobem Solutions optimisé pour {ville.label}, votre entreprise
                apparaît en tête des résultats locaux, votre numéro de téléphone est mis en évidence
                et vous recevez des demandes qualifiées 24h/24. En ligne en 72h, 50 €/mois tout inclus,
                sans engagement.
              </p>

              {/* Badge prix */}
              <div className="inline-flex items-center gap-3 border border-accent/30 bg-accent/5 rounded-xl px-5 py-3 mb-10">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">50 €/mois — tout inclus</p>
                  <p className="text-xs text-muted-foreground">Sans engagement · En ligne en 72h</p>
                </div>
              </div>

              {/* Métiers par catégorie */}
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Sites internet par métier à {ville.label}
              </h2>

              <div className="space-y-8 mb-10">
                {METIER_CATEGORIES.map((cat) => (
                  <div key={cat.slug}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.metiers.map((metier) => (
                        <Link
                          key={metier.slug}
                          href={`/metiers/${metier.slug}/${slug}`}
                          className="text-sm text-accent border border-accent/20 rounded-lg px-3 py-1.5 hover:bg-accent/5 transition-colors"
                        >
                          {metier.label} à {ville.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Autres villes */}
              <div className="border-t border-border pt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Autres villes</h2>
                <div className="flex flex-wrap gap-2">
                  {autresVilles.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/villes/${v.slug}`}
                      className="text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-secondary transition-colors"
                    >
                      {v.label}
                    </Link>
                  ))}
                  <Link
                    href="/villes"
                    className="text-sm text-accent border border-accent/20 rounded-lg px-3 py-1.5 hover:bg-accent/5 transition-colors"
                  >
                    Toutes les villes →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 border border-border rounded-2xl p-6 bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Lancez votre site à {ville.label}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  En ligne en 72h. Premier mois offert. Sans engagement.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-medium px-5 py-3 rounded-lg hover:bg-accent/90 transition-colors text-sm"
                  >
                    Démarrer mon projet
                  </Link>
                  <a
                    href="tel:+33000000000"
                    className="flex items-center justify-center gap-2 w-full border border-border text-foreground font-medium px-5 py-3 rounded-lg hover:bg-secondary transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler directement
                  </a>
                </div>
                <div className="mt-5 pt-5 border-t border-border space-y-2">
                  {["50 €/mois tout inclus", "En ligne en 72h", "Sans engagement", "SEO local inclus"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
