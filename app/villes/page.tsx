import type { Metadata } from "next"
import Link from "next/link"
import { REGIONS, TOP_METIERS } from "@/lib/seo-data"
import type { Ville } from "@/lib/seo-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Création de site par ville – Mobem Solutions",
  description:
    "Mobem Solutions crée des sites web pour les PME et artisans dans 30 villes françaises. SEO local inclus, livrés en 8 jours.",
  openGraph: {
    title: "Création de site par ville – Mobem Solutions",
    description: "30 villes, SEO local inclus. Livrés en 8 jours.",
    url: "https://mobem-solutions.com/villes",
  },
}

// ── Pin SVG ────────────────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg
      className="text-accent flex-shrink-0"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 19s6-7.5 6-12A6 6 0 1 0 2 7c0 4.5 6 12 6 12z" />
      <circle cx="8" cy="7" r="2" />
    </svg>
  )
}

// ── Arrow SVG ──────────────────────────────────────────────────────────────

function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M9 7 H17 V15" />
    </svg>
  )
}

// ── Ville card ─────────────────────────────────────────────────────────────

function VilleCard({ ville }: { ville: Ville }) {
  return (
    <Link
      href={`/villes/${ville.slug}`}
      className="group bento-hover flex flex-col gap-3.5 p-7 border-r border-b border-foreground/10 dark:border-foreground/15 min-h-[240px] transition-colors"
      data-cursor="hover"
    >
      <div className="flex items-center gap-2.5">
        <PinIcon />
        <h3 className="text-[24px] font-bold tracking-[-0.025em]">{ville.label}</h3>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-accent">
        {ville.departement} — {ville.population}
      </div>
      <div className="flex flex-wrap gap-1.5 items-center mt-auto">
        {TOP_METIERS.slice(0, 6).map((m) => (
          <span
            key={m.slug}
            className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-accent tracking-[0.04em] uppercase whitespace-nowrap"
          >
            {m.label}
          </span>
        ))}
        <span className="px-[9px] py-1 border border-current/20 font-mono text-[10px] text-muted-foreground group-hover:text-background/60 tracking-[0.04em] uppercase whitespace-nowrap transition-colors">
          +36 métiers
        </span>
      </div>
    </Link>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function VillesPage() {
  const totalVilles = REGIONS.reduce((acc, r) => acc + r.villes.length, 0)

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16">
            <nav
              className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
              aria-label="Fil d'Ariane"
            >
              <Link href="/" className="hover:text-accent transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-foreground">Villes</span>
            </nav>
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(56px,8vw,128px)] mb-6">
              Création de site{" "}
              <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                par ville.
              </em>
            </h1>
            <p className="text-xl leading-[1.5] max-w-[720px] text-muted-foreground">
              {totalVilles} villes couvertes, SEO local inclus. Chaque site est
              optimisé pour votre marché local avec des mots-clés géolocalisés
              et une structure pensée pour Google Business Profile.
            </p>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border">
          {[
            { v: String(totalVilles), l: "Villes couvertes" },
            { v: "8 j", l: "Délai moyen de mise en ligne" },
            { v: "94%", l: "Clients page 1 Google après 90j" },
            { v: "40+", l: "Métiers couverts" },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-7 py-10 border-r border-border last:border-r-0"
            >
              <div className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em] text-accent leading-[0.95]">
                {stat.v}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mt-3">
                {stat.l}
              </div>
            </div>
          ))}
        </div>

        {/* ── Regions ──────────────────────────────────────────────────────── */}
        {REGIONS.map((region) => (
          <section key={region.label} className="border-t border-border">
            <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-baseline gap-4 border-b border-border">
              <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold tracking-[-0.03em] leading-none">
                {region.label}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {region.villes.length} ville
                {region.villes.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/10 dark:border-foreground/15">
              {region.villes.map((ville) => (
                <VilleCard key={ville.slug} ville={ville} />
              ))}
            </div>
          </section>
        ))}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
            Votre ville n&apos;est pas listée ?
          </div>
          <h2 className="mx-auto mb-6 max-w-[720px] text-[clamp(36px,4vw,64px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
            Nous intervenons{" "}
            <em className="font-serif font-normal italic text-accent">
              partout en France.
            </em>
          </h2>
          <p className="mx-auto mb-8 max-w-[480px] text-[18px] leading-[1.55] text-muted-foreground">
            Notre offre s&apos;adapte à chaque territoire. Contactez-nous pour un
            diagnostic de votre marché local.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] hover:bg-foreground hover:text-background transition-colors"
          >
            Demander un diagnostic gratuit{" "}
            <ArrowDiag />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
