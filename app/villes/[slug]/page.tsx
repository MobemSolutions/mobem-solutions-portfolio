import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ALL_VILLES,
  getVilleBySlug,
  TOP_METIERS,
  METIER_CATEGORIES,
} from "@/lib/seo-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EditorialBadge } from "@/components/ui/editorial-badge"

interface PageProps {
  params: Promise<{ slug: string }>
}

// ── Static params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_VILLES.map((v) => ({ slug: v.slug }))
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) return {}
  return {
    title: `Création de site internet à ${ville.label} — Mobem Solutions | Livré en 10 jours`,
    description: `Agence web à ${ville.label} — sites professionnels pour PME & artisans livrés en 10 jours. SEO local, Lighthouse 90+, audit gratuit. Mobem Solutions.`,
    keywords: [
      `création site internet ${ville.label}`,
      `agence web ${ville.label}`,
      `site vitrine ${ville.label}`,
      `référencement local ${ville.label}`,
      `développement web ${ville.label}`,
    ],
    alternates: {
      canonical: `https://mobem-solutions.com/villes/${slug}`,
    },
    openGraph: {
      title: `Création de site internet à ${ville.label} — Mobem Solutions`,
      description: `Sites web professionnels à ${ville.label}. Livrés en 10 jours, SEO local inclus, Lighthouse 90+. Diagnostic gratuit.`,
      url: `https://mobem-solutions.com/villes/${slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Création de site internet à ${ville.label} — Mobem Solutions`,
      description: `Sites web professionnels à ${ville.label}. Livrés en 10 jours, SEO local inclus.`,
    },
  }
}

// ── SVG helpers ────────────────────────────────────────────────────────────

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className || "text-accent flex-shrink-0"}
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

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
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

// ── Static data ────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    title: "Présence locale, pas distante",
    desc: "Nous connaissons les dynamiques économiques de votre territoire. Pas besoin de vous expliquer deux fois votre marché.",
  },
  {
    title: "Livrés en 8 jours",
    desc: "Un processus rodé en 4 étapes pour un site opérationnel en moins de deux semaines, sans sacrifier la qualité.",
  },
  {
    title: "SEO local dès le départ",
    desc: "Chaque page est optimisée pour les recherches géolocalisées. Votre fiche Google Business Profile est intégrée à notre stratégie.",
  },
  {
    title: "Résultats mesurables",
    desc: "Tableau de bord de performance, rapports mensuels, alertes de positionnement. Vous savez exactement ce que produit votre site.",
  },
]

function getQuartiers(villeLabel: string): Array<{ name: string; code: string }> {
  return [
    { name: "Centre-ville", code: "Zone A" },
    { name: "Nord", code: "Zone B" },
    { name: "Est", code: "Zone C" },
    { name: "Ouest", code: "Zone D" },
    { name: "Sud", code: "Zone E" },
    { name: "Périphérie", code: "Zone F" },
  ]
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function VilleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) notFound()

  const quartiers = getQuartiers(ville.label)
  const allMetiersFlat = METIER_CATEGORIES.flatMap((cat) => cat.metiers)
  const metierCount = allMetiersFlat.length

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end border-b border-border">
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                aria-label="Fil d'Ariane"
              >
                <Link href="/" className="hover:text-accent transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link
                  href="/villes"
                  className="hover:text-accent transition-colors"
                >
                  Villes
                </Link>
                <span>/</span>
                <span className="text-foreground">{ville.label}</span>
              </nav>

              {/* Chip */}
              <EditorialBadge variant="muted" className="mb-8">
                {ville.region}
              </EditorialBadge>

              {/* H1 */}
              <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(48px,7vw,112px)] mb-6">
                Création de site à{" "}
                <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                  {ville.label}.
                </em>
              </h1>

              <p className="text-[19px] leading-[1.5] text-muted-foreground mb-7 max-w-[540px]">
                Cabinet de conseil digital présent à {ville.label}. Un site livré en 8 jours, optimisé pour le
                SEO local et conçu pour convertir.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-accent-foreground font-medium text-sm cta-hover transition-colors"
                >
                  Diagnostic gratuit <ArrowRight />
                </Link>
                <a
                  href="#realisations"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
                >
                  Voir les cas {ville.label}
                </a>
              </div>
            </div>

            {/* City card */}
            <div className="lg:col-span-5">
              <div className="border border-border flex flex-col gap-4 p-8">
                <div className="flex items-center gap-3">
                  <PinIcon />
                  <h3 className="text-[28px] font-bold tracking-[-0.025em]">
                    {ville.label}
                  </h3>
                </div>
                <div className="flex flex-col gap-0 mt-2">
                  {[
                    ["Région", ville.region],
                    [
                      "Département",
                      `${ville.departement} (${ville.codePostal})`,
                    ],
                    ["Population", ville.population],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2.5 border-b border-border last:border-0 text-[13px]"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {[
            { v: "11", l: `Sites livrés\nà ${ville.label}` },
            { v: "94%", l: "Clients page 1\nGoogle après 90j" },
            { v: "8 j", l: "Délai moyen\nde mise en ligne" },
            { v: "×3.1", l: "Demandes entrantes\nvs avant refonte" },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-7 py-10 border-r border-border last:border-r-0"
            >
              <div className="text-[clamp(36px,4.5vw,56px)] font-bold tracking-[-0.03em] text-accent leading-[0.95]">
                {stat.v}
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mt-3"
                style={{ whiteSpace: "pre-line" }}
              >
                {stat.l}
              </div>
            </div>
          ))}
        </section>

        {/* ── Area band ────────────────────────────────────────────────────── */}
        <section
          id="realisations"
          className="px-4 sm:px-6 lg:px-8 py-16 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-4">
              Zone d&apos;intervention
            </div>
            <h2 className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none mb-4">
              {ville.label} et sa{" "}
              <em className="font-serif font-normal italic text-accent">
                métropole.
              </em>
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted-foreground mb-8 max-w-[420px]">
              Nous intervenons dans {ville.label} et toute son aire urbaine.
              Chaque quartier a ses spécificités, nous les connaissons et les
              intégrons dans votre stratégie de référencement local.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:underline"
            >
              Prendre RDV à {ville.label} →
            </a>
          </div>
          <div className="lg:col-span-7 grid grid-cols-3 border-t border-l border-border self-start">
            {quartiers.map((q) => (
              <div
                key={q.name}
                data-cursor="hover"
                className="group bento-hover px-5 py-5 border-r border-b border-border flex flex-col gap-1.5 transition-colors"
              >
                <span className="font-semibold text-[16px] tracking-[-0.01em]">
                  {q.name}
                </span>
                <span className="font-mono text-[10px] tracking-[0.08em] text-foreground/55 group-hover:text-background/65 transition-colors">
                  {q.code}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Métiers band ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-border">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-4">
            Métiers couverts à {ville.label}
          </div>
          <h2 className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none mb-8">
            Tous les{" "}
            <em className="font-serif font-normal italic text-accent">
              métiers,
            </em>{" "}
            tous les quartiers.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
            {allMetiersFlat.map((metier) => (
              <Link
                key={metier.slug}
                href={`/metiers/${metier.slug}/${ville.slug}`}
                className="group bento-hover px-5 py-5 border-r border-b border-border flex justify-between items-center gap-3 transition-colors"
                data-cursor="hover"
              >
                <span className="font-semibold text-[15px] tracking-[-0.01em]">
                  {metier.label}
                </span>
                <ArrowDiag className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
              </Link>
            ))}
          </div>
          <div className="mt-6 text-right">
            <Link
              href="/metiers"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:underline"
            >
              Voir les {metierCount} métiers couverts →
            </Link>
          </div>
        </section>

        {/* ── Why band ─────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground mb-4">
              Pourquoi Mobem à {ville.label}
            </div>
            <h2 className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none mb-4">
              Un cabinet{" "}
              <em className="font-serif font-normal italic text-accent">
                local,
              </em>{" "}
              pas une agence parisienne.
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted-foreground max-w-[420px]">
              Nous construisons des relations durables avec les entrepreneurs
              locaux. Pas de contrat longue durée imposé, pas de frais cachés.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border self-start">
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                data-cursor="hover"
                className="group bento-hover px-7 py-7 border-r border-b border-border flex flex-col gap-3 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                  0{i + 1}
                </span>
                <h3 className="text-[19px] font-bold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-foreground/60 group-hover:text-background/70 leading-[1.55] transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Top métiers quick links ───────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-border">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
              Démarrages rapides
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TOP_METIERS.map((m) => (
              <Link
                key={m.slug}
                href={`/metiers/${m.slug}/${ville.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                data-cursor="hover"
              >
                {m.label} · {ville.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
            Démarrer votre projet
          </div>
          <h2 className="mx-auto mb-6 max-w-[980px] text-[clamp(40px,5.5vw,88px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
            Donnez à votre activité{" "}
            <em className="font-serif font-normal italic text-accent">
              {ville.label}
            </em>{" "}
            le site qu&apos;elle mérite.
          </h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[18px] leading-[1.55] text-muted-foreground">
            Un café, 30 minutes pour qualifier votre projet. C&apos;est gratuit,
            sans engagement.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
          >
            Réserver un diagnostic à {ville.label} <ArrowRight />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
