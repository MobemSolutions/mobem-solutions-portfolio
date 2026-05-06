import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ALL_METIERS,
  ALL_VILLES,
  getMetierBySlug,
  getVilleBySlug,
  METIER_CATEGORIES,
} from "@/lib/seo-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

  const label = metier.labelPluriel ?? metier.label

  return {
    title: `Création de site pour ${label} à ${ville.label} — Mobem Solutions`,
    description: `Mobem Solutions crée des sites internet professionnels pour les ${label.toLowerCase()} à ${ville.label} (${ville.codePostal}). SEO local inclus, livré en 10 jours, Lighthouse 90+. Diagnostic gratuit.`,
    keywords: [
      `site internet ${metier.label.toLowerCase()} ${ville.label}`,
      `création site ${metier.label.toLowerCase()} ${ville.label}`,
      `${metier.label.toLowerCase()} ${ville.label} site web`,
      `agence web ${ville.label}`,
    ],
    alternates: {
      canonical: `https://mobem-solutions.com/metiers/${slug}/${villeSlug}`,
    },
    openGraph: {
      title: `Site internet pour ${label} à ${ville.label} — Mobem Solutions`,
      description: `Sites web professionnels pour ${label.toLowerCase()} à ${ville.label}. Livrés en 10 jours, SEO local, Lighthouse 90+.`,
      url: `https://mobem-solutions.com/metiers/${slug}/${villeSlug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  }
}

function ArrowDiag({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const DELIVERABLES = [
  "Design sur-mesure adapté à votre secteur",
  "SEO local optimisé pour votre ville",
  "Lighthouse 90+ garanti à la livraison",
  "Formulaire de contact & prise de RDV",
  "Version mobile optimisée",
  "Mise en ligne en 10 jours ouvrés",
]

const WHY_ITEMS = [
  { v: "10 j", l: "Délai de livraison moyen" },
  { v: "90+", l: "Score Lighthouse garanti" },
  { v: "94%", l: "Clients page 1 Google (90j)" },
  { v: "0 €", l: "Diagnostic initial" },
]

export default async function MetierVillePage({ params }: Props) {
  const { slug, ville: villeSlug } = await params
  const metier = getMetierBySlug(slug)
  const ville = getVilleBySlug(villeSlug)

  if (!metier || !ville) notFound()

  const label = metier.labelPluriel ?? metier.label
  const labelSingulier = metier.label

  const autresVilles = ALL_VILLES
    .filter((v) => v.slug !== villeSlug)
    .slice(0, 5)

  const autresMetiersCat = METIER_CATEGORIES
    .find((c) => c.metiers.some((m) => m.slug === slug))

  const autresMetiers = autresMetiersCat?.metiers
    .filter((m) => m.slug !== slug)
    .slice(0, 4) ?? []

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 border-b border-border grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-16">
            <div>
              <nav
                className="flex items-center flex-wrap gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                aria-label="Fil d'Ariane"
              >
                <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/metiers" className="hover:text-accent transition-colors">Métiers</Link>
                <span>/</span>
                <Link href={`/metiers/${slug}`} className="hover:text-accent transition-colors">{labelSingulier}</Link>
                <span>/</span>
                <span className="text-foreground">{ville.label}</span>
              </nav>

              <div className="inline-block mb-6 border-l-2 border-accent pl-3 pr-4 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                SEO local · {ville.departement}
              </div>

              <h1 className="font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(36px,5.5vw,80px)] mb-6">
                Site internet pour{" "}
                <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                  {label.toLowerCase()}
                </em>{" "}
                à {ville.label}
              </h1>

              <p className="text-[18px] leading-[1.55] text-muted-foreground max-w-[580px] mb-8">
                {metier.description}
              </p>

              <Link
                href="/#contact"
                data-cursor="hover"
                className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground font-medium text-[15px] hover:bg-foreground hover:text-background transition-colors"
              >
                Diagnostic gratuit — {ville.label}
                <ArrowDiag />
              </Link>
            </div>

            {/* Meta sidebar */}
            <div className="flex flex-col gap-0 border-t border-border lg:border-t-0 lg:border-l lg:pl-12 pt-8 lg:pt-0">
              {[
                { l: "Métier", v: labelSingulier },
                { l: "Ville", v: ville.label },
                { l: "Département", v: `${ville.departement} (${ville.codePostal})` },
                { l: "Population", v: ville.population },
                { l: "Délai livraison", v: "10 jours ouvrés" },
                { l: "Diagnostic", v: "Gratuit · Sans engagement" },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between gap-4 py-4 border-b border-border last:border-b-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{l}</span>
                  <span className="text-[13px] font-medium text-right max-w-[200px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="group bento-hover px-7 py-10 border-r border-border last:border-r-0 transition-colors"
              data-cursor="hover"
            >
              <div className="text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.03em] text-accent leading-[0.95]">
                {item.v}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground group-hover:text-background/60 mt-3 transition-colors">
                {item.l}
              </div>
            </div>
          ))}
        </div>

        {/* ── Deliverables ─────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 py-16 border-b lg:border-b-0 lg:border-r border-border">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">Ce qui est inclus</div>
            <h2 className="text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.03em] leading-[1.05] mb-10">
              Site livré clé en main,{" "}
              <em className="font-serif font-normal italic text-accent">sans surprise.</em>
            </h2>
            <ul className="space-y-4">
              {DELIVERABLES.map((item, i) => (
                <li
                  key={i}
                  className="group bento-hover flex items-start gap-4 px-5 py-4 border border-border transition-colors"
                  data-cursor="hover"
                >
                  <span className="text-accent mt-0.5 flex-shrink-0 group-hover:text-accent"><CheckIcon /></span>
                  <span className="text-[15px] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">Pourquoi Mobem</div>
            <h2 className="text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.03em] leading-[1.05] mb-10">
              Local, rapide,{" "}
              <em className="font-serif font-normal italic text-accent">mesurable.</em>
            </h2>
            <div className="space-y-6 text-[15px] leading-[1.65] text-muted-foreground">
              <p>
                Les {label.toLowerCase()} à {ville.label} font face à une concurrence accrue sur Google. Sans site optimisé, vous perdez des clients chaque jour au profit de concurrents mieux référencés.
              </p>
              <p>
                Mobem conçoit des sites pensés pour le SEO local : structure technique, contenu géolocalisé, Google Business Profile, balisage schema.org.
              </p>
              <p>
                Livraison en 10 jours ouvrés, avec un score Lighthouse 90+ garanti.
              </p>
            </div>
            <Link
              href={`/metiers/${slug}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 mt-10 font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:underline transition-colors"
            >
              Voir la page {labelSingulier} <ArrowDiag className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ── Autres villes ────────────────────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 py-6 flex items-baseline justify-between border-b border-border">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">{labelSingulier} dans d&apos;autres villes</h2>
            <Link href={`/metiers/${slug}`} className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">Voir tout →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-border">
            {autresVilles.map((v) => (
              <Link
                key={v.slug}
                href={`/metiers/${slug}/${v.slug}`}
                data-cursor="hover"
                className="group bento-hover border-r border-b border-border px-6 py-6 flex flex-col gap-2 transition-colors"
              >
                <span className="text-[17px] font-semibold tracking-[-0.01em]">{v.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent">{v.departement}</span>
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60 transition-colors mt-auto">{labelSingulier} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Autres métiers ────────────────────────────────────────────────── */}
        {autresMetiers.length > 0 && (
          <section className="border-b border-border">
            <div className="px-4 sm:px-6 lg:px-8 py-6 flex items-baseline justify-between border-b border-border">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Autres métiers à {ville.label}</h2>
              <Link href={`/villes/${villeSlug}`} className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent hover:underline">Voir la ville →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
              {autresMetiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/metiers/${m.slug}/${villeSlug}`}
                  data-cursor="hover"
                  className="group bento-hover border-r border-b border-border px-6 py-6 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="text-[16px] font-semibold">{m.label}</span>
                  <ArrowDiag className="flex-shrink-0 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 border-b border-border text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">Démarrer maintenant</div>
          <h2 className="mx-auto mb-6 max-w-[860px] text-[clamp(36px,5vw,80px)] font-extrabold tracking-[-0.04em] leading-[0.95]">
            Prêt à être le {labelSingulier.toLowerCase()} de référence{" "}
            <em className="font-serif font-normal italic text-accent">à {ville.label}&nbsp;?</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[560px] text-[18px] leading-[1.55] text-muted-foreground">
            Diagnostic gratuit en 15 minutes. On regarde votre situation actuelle et on vous dit honnêtement ce qu&apos;on peut faire.
          </p>
          <Link
            href="/#contact"
            data-cursor="hover"
            className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[15px] hover:bg-foreground hover:text-background transition-colors"
          >
            Diagnostic gratuit — {ville.label}
            <ArrowDiag />
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
