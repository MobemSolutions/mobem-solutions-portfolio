import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VillesCatalog } from "@/components/villes-catalog"
import { REGIONS } from "@/lib/seo-data"

const totalVilles = REGIONS.reduce((acc, r) => acc + r.villes.length, 0)

export const metadata: Metadata = {
  title: "Création de site par ville – Mobem Solutions",
  description: `Mobem Solutions crée des sites web pour les PME et artisans dans ${totalVilles} villes françaises. SEO local inclus, livrés en 8 jours.`,
  openGraph: {
    title: "Création de site par ville – Mobem Solutions",
    description: `${totalVilles} villes, SEO local inclus. Livrés en 8 jours.`,
    url: "https://mobem-solutions.com/villes",
  },
}

export default function VillesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-16 lg:pb-20">
            <nav className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-foreground">Villes</span>
            </nav>
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6">
              Création de site{" "}
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">par ville.</em>
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px] text-muted-foreground">
              {totalVilles} villes couvertes, SEO local inclus. Chaque site est optimisé pour votre marché local
              avec des mots-clés géolocalisés et une structure pensée pour Google Business Profile.
            </p>
          </div>
        </section>

        {/* Stats band */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border">
          {[
            { v: String(totalVilles), l: "Villes couvertes" },
            { v: "8 j", l: "Délai moyen de mise en ligne" },
            { v: "94%", l: "Clients page 1 Google après 90j" },
            { v: "40+", l: "Métiers couverts" },
          ].map((stat, i) => (
            <div key={i} className="px-7 py-10 border-r border-border last:border-r-0">
              <div className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em] text-accent leading-[0.95]">{stat.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mt-3">{stat.l}</div>
            </div>
          ))}
        </div>

        <VillesCatalog totalVilles={totalVilles} />
      </main>
      <Footer />
    </>
  )
}
