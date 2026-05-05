import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, TrendingUp, MapPin, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ALL_METIERS,
  ALL_VILLES,
  getMetierBySlug,
  getVilleBySlug,
  REGIONS,
} from "@/lib/seo-data"

interface Props {
  params: Promise<{ slug: string; ville: string }>
}

export async function generateStaticParams() {
  return ALL_METIERS.flatMap((m) =>
    ALL_VILLES.map((v) => ({ slug: m.slug, ville: v.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, ville: villeSlug } = await params
  const metier = getMetierBySlug(slug)
  const ville = getVilleBySlug(villeSlug)
  if (!metier || !ville) return {}
  return {
    title: `Création de site internet pour ${metier.label} à ${ville.label} | Mobem Solutions`,
    description: `Site internet professionnel pour ${metier.label} à ${ville.label} (${ville.codePostal}). SEO local, mise en ligne en 72h, 50 €/mois tout inclus. Dominez Google à ${ville.label}.`,
    openGraph: {
      title: `Site internet ${metier.label} à ${ville.label} | Mobem Solutions`,
      description: `Création de site internet pour ${metier.label} à ${ville.label}. Optimisé SEO local, en ligne en 72h.`,
      url: `https://mobem-solutions.com/metiers/${metier.slug}/${ville.slug}`,
    },
  }
}

const AVANTAGES = [
  "Site live en 72h — sans engagement",
  "SEO local optimisé pour votre ville",
  "Hébergement, maintenance et mises à jour inclus",
  "Prise de contact en ligne 24h/24",
  "Fiche Google My Business optimisée",
  "Rapport de performance mensuel",
]

export default async function MetierVillePage({ params }: Props) {
  const { slug, ville: villeSlug } = await params
  const metier = getMetierBySlug(slug)
  const ville = getVilleBySlug(villeSlug)
  if (!metier || !ville) notFound()

  const autresVilles = ALL_VILLES.filter((v) => v.slug !== villeSlug).slice(0, 6)

  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="pt-8 pb-4 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/metiers" className="hover:text-foreground transition-colors">Nos métiers</Link>
            <span className="mx-2">&gt;</span>
            <Link href={`/metiers/${slug}`} className="hover:text-foreground transition-colors">
              Site {metier.label}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-foreground">{ville.label}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12 pt-4">

            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  {ville.departement} ({ville.codePostal}) — {ville.population}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                Création de site internet pour {metier.label.toLowerCase()} à {ville.label}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {metier.description.replace(/dans sa ville/g, `à ${ville.label}`)} À {ville.label},
                {" "}{ville.population.replace(" hab.", "")} habitants cherchent régulièrement un
                {" "}{metier.label.toLowerCase()} en ligne. Sans site internet, vous passez à côté de
                dizaines de clients potentiels chaque mois. Avec un site Mobem Solutions optimisé,
                votre numéro de téléphone apparaît en évidence, votre zone d&apos;intervention à
                {" "}{ville.label} est claire, et vos avis clients rassurent immédiatement.
              </p>

              {/* Badge prix */}
              <div className="inline-flex items-center gap-3 border border-accent/30 bg-accent/5 rounded-xl px-5 py-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">50 €/mois — tout inclus</p>
                  <p className="text-xs text-muted-foreground">Sans engagement · En ligne en 72h</p>
                </div>
              </div>

              {/* Stat SEO */}
              <div className="border border-border rounded-xl p-5 mb-10 bg-secondary/50">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">76 % des personnes</strong> qui effectuent une recherche
                    locale sur leur smartphone à {ville.label} se rendent dans un commerce ou contactent un professionnel
                    dans les 24 heures{" "}
                    <span className="text-xs">(source : Google, Think with Google 2023).</span>
                  </p>
                </div>
              </div>

              {/* Ce qu'on inclut */}
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Votre site {metier.label.toLowerCase()} à {ville.label} en détail
              </h2>
              <ul className="space-y-3 mb-10">
                {AVANTAGES.map((avantage) => (
                  <li key={avantage} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{avantage}</span>
                  </li>
                ))}
              </ul>

              {/* Autres villes */}
              <div className="border-t border-border pt-8 mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Site {metier.label} dans d&apos;autres villes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {autresVilles.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/metiers/${slug}/${v.slug}`}
                      className="text-sm text-accent border border-accent/20 rounded-lg px-3 py-1.5 hover:bg-accent/5 transition-colors"
                    >
                      {metier.label} {v.label}
                    </Link>
                  ))}
                  <Link
                    href={`/metiers/${slug}`}
                    className="text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-secondary transition-colors"
                  >
                    Voir toutes les villes →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 border border-border rounded-2xl p-6 bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Votre site {metier.label.toLowerCase()} à {ville.label}
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
