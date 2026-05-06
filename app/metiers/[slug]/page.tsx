import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ALL_METIERS,
  ALL_VILLES,
  getMetierBySlug,
  getMetierCategory,
} from "@/lib/seo-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_METIERS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const metier = getMetierBySlug(slug)
  if (!metier) return {}
  return {
    title: `Site internet pour ${metier.label} — Mobem Solutions | Livré en 10 jours`,
    description: `Création de site web professionnel pour ${metier.label}. SEO local, Lighthouse 90+, livré en 10 jours. Mobem Solutions — agence web Nantes. Audit gratuit.`,
    keywords: [
      `site internet ${metier.label}`,
      `création site web ${metier.label}`,
      `référencement ${metier.label}`,
      `agence web artisan`,
      `site vitrine PME`,
    ],
    alternates: {
      canonical: `https://mobem-solutions.com/metiers/${metier.slug}`,
    },
    openGraph: {
      title: `Site internet pour ${metier.label} — Mobem Solutions`,
      description: metier.description,
      url: `https://mobem-solutions.com/metiers/${metier.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Site internet pour ${metier.label} — Mobem Solutions`,
      description: metier.description,
    },
  }
}

function pluralize(label: string): string {
  const lower = label.toLowerCase()
  if (lower.endsWith("s") || lower.endsWith("x")) return lower
  return lower + "s"
}

const PAIN_POINTS = [
  {
    num: "01",
    title: "Invisible sur Google local",
    text: "Sans pages dédiées par ville et par prestation, vous laissez chaque jour des clients potentiels à vos concurrents mieux référencés.",
  },
  {
    num: "02",
    title: "Aucune prise de contact automatisée",
    text: "Vos prospects cherchent en ligne 24h/24. Sans formulaire ni prise de RDV en ligne, vous perdez des contacts chaque nuit.",
  },
  {
    num: "03",
    title: "Site inexistant ou trop lent",
    text: "72% des recherches locales viennent du mobile. Au-delà de 3 secondes de chargement, le client appelle la concurrence.",
  },
]

const FEATURES = [
  { num: "01", title: "Pages métier dédiées", text: "Chaque prestation a sa page SEO optimisée par mot-clé local. Votre zone d'intervention, vos services, vos tarifs — bien structurés pour Google." },
  { num: "02", title: "Numéro click-to-call", text: "Bouton d'appel mis en avant en sticky mobile. Tracking précis pour mesurer chaque conversion." },
  { num: "03", title: "Devis express en 3 étapes", text: "Formulaire qualifié pour filtrer les demandes sérieuses. Notifications email instantanées." },
  { num: "04", title: "Fiche Google optimisée", text: "Configuration complète, schémas LocalBusiness, photos métier, gestion des avis — formation incluse." },
  { num: "05", title: "Pages par ville d'intervention", text: "Une page SEO par commune que vous couvrez. Mots-clés ciblés pour dominer le pack local." },
  { num: "06", title: "Galerie photos & réalisations", text: "Section avant/après pour rassurer. Format optimisé pour partage Instagram et Google." },
  { num: "07", title: "Hébergement & maintenance", text: "Inclus 12 mois. Mises à jour, sauvegardes, surveillance LCP, support email sous 24h." },
  { num: "08", title: "Conformité RGPD complète", text: "Mentions légales, CGV, cookies, politique de confidentialité — tout est livré conforme et à jour." },
]

const PRICING = [
  {
    code: "S1",
    label: "— Formule Essentiel",
    name: "Site Vitrine",
    from: "À partir de",
    amount: "1 490 €",
    sub: "Site en ligne en 8 jours. Idéal pour démarrer votre présence locale rapidement.",
    features: ["5 pages essentielles", "3 villes d'intervention", "Fiche Google optimisée", "Hébergement 12 mois"],
    cta: "Choisir Vitrine",
    flagship: false,
  },
  {
    code: "S2",
    label: "— Formule Croissance · ●",
    name: "Site + SEO Local",
    from: "À partir de",
    amount: "2 890 €",
    sub: "La formule la plus choisie. Pour dominer Google sur votre ville et générer du flux entrant continu.",
    features: ["12 pages incluses", "12 villes d'intervention", "SEO local 90 jours", "Suivi mensuel positions"],
    cta: "Choisir Croissance",
    flagship: true,
  },
  {
    code: "S3",
    label: "— Formule Stratégique",
    name: "Sur mesure",
    from: "Sur devis",
    amount: "—",
    sub: "Pour les entreprises multi-sites avec équipe commerciale et volume important.",
    features: ["Pages illimitées", "CRM & devis automatisés", "Multi-sites & multi-villes", "Accompagnement dédié"],
    cta: "Demander un devis",
    flagship: false,
  },
]

const FAQ_ITEMS = [
  {
    q: "Combien de temps pour mettre en ligne mon site ?",
    a: "Comptez 8 jours pour la formule Vitrine et 3 semaines pour la formule Croissance, à partir de la réception de vos contenus (logo, photos, textes guidés). Nous fournissons un planning détaillé dès la signature.",
  },
  {
    q: "Comment fonctionne le SEO local ?",
    a: "Nous créons une page dédiée pour chaque ville où vous intervenez, avec un contenu unique optimisé sur les mots-clés ciblés. Couplé à une fiche Google professionnellement configurée, cela vous fait apparaître dans le pack local Google sous 60 à 90 jours.",
  },
  {
    q: "Que se passe-t-il après les 12 mois d'hébergement inclus ?",
    a: "Vous restez propriétaire du site et de votre nom de domaine. L'hébergement + maintenance se renouvelle à 29 €/mois sans engagement. Vous pouvez aussi héberger ailleurs — nous fournissons les fichiers.",
  },
  {
    q: "Puis-je modifier le site moi-même ensuite ?",
    a: "Oui. Le site est livré avec un panneau d'administration simple où vous pouvez modifier textes, photos et horaires. Une formation vidéo de 30 min vous est livrée.",
  },
  {
    q: "Garantissez-vous des résultats sur Google ?",
    a: "Nous garantissons l'apparition dans le pack local Google sous 90 jours pour 90 % de nos clients. Si le résultat n'est pas atteint, nous travaillons gratuitement jusqu'à atteindre l'objectif.",
  },
]

const HERO_STATS = [
  { value: "+86%", label: "Appels reçus\nmoyenne sur 12 mois" },
  { value: "8 jours", label: "Délai de livraison\ndu site complet" },
  { value: "#1", sub: " Google local", label: "Position moyenne\naprès 90 jours" },
]

export default async function MetierPage({ params }: Props) {
  const { slug } = await params
  const metier = getMetierBySlug(slug)
  if (!metier) notFound()

  const category = getMetierCategory(slug)
  const labelPluriel = pluralize(metier.label)

  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">

            {/* Left — 7/12 */}
            <div className="lg:col-span-7">
              <nav
                className="flex items-center gap-2.5 mb-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                aria-label="Fil d'Ariane"
              >
                <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
                <span aria-hidden="true">/</span>
                <Link href="/metiers" className="hover:text-accent transition-colors">Sites par métier</Link>
                <span aria-hidden="true">/</span>
                <span className="text-foreground">{metier.label}</span>
              </nav>
              {category && (
                <span className="inline-block border-l-2 border-accent pl-3 pr-4 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-6">
                  {category.label}
                </span>
              )}
              <h1 className="font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(56px,7vw,112px)] mb-6">
                Création de site<br />pour{" "}
                <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">
                  {labelPluriel}
                </em>.
              </h1>
              <p className="text-[19px] leading-[1.5] text-muted-foreground mb-8 max-w-[540px]">
                {metier.description}{" "}
                <strong className="font-semibold text-foreground">Site en ligne en 8 jours</strong>,{" "}
                optimisé SEO local pour dominer Google dans votre ville.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#tarifs"
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-accent text-accent-foreground text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                >
                  Voir les tarifs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3 border border-border text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Diagnostic 15 min
                </Link>
              </div>
            </div>

            {/* Right — 5/12 stats */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.value} className="px-6 py-5 border border-border">
                  <div className="text-[40px] font-bold tracking-[-0.03em] leading-[0.95] text-accent">
                    {stat.value}
                    {stat.sub && (
                      <span className="text-muted-foreground" style={{ fontSize: "0.5em" }}>{stat.sub}</span>
                    )}
                  </div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mt-2"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Pain band */}
        <section className="border-t border-border" aria-labelledby="pain-heading">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
              Le constat
            </div>
            <h2 id="pain-heading" className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none mb-10 max-w-[880px]">
              Pourquoi 9 {labelPluriel} sur 10<br />
              perdent des{" "}
              <em className="font-serif font-normal italic text-accent">contrats</em>{" "}
              en ligne.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-border">
            {PAIN_POINTS.map((pain) => (
              <div
                key={pain.num}
                className="px-8 py-8 border-r border-b border-border flex flex-col gap-3.5 min-h-[240px]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{pain.num}</span>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] leading-[1.15]">{pain.title}</h3>
                <p className="text-[14px] leading-[1.55] text-muted-foreground">{pain.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features band */}
        <section className="border-t border-border grid grid-cols-1 lg:grid-cols-12" aria-labelledby="features-heading">
          <div className="lg:col-span-5 px-4 sm:px-6 lg:px-8 py-16 lg:border-r lg:border-border">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
              Inclus dans chaque site
            </div>
            <h2 id="features-heading" className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none mb-4">
              Tout ce dont vous<br />avez{" "}
              <em className="font-serif font-normal italic text-accent">besoin</em>.
            </h2>
            <p className="text-[16px] leading-[1.55] text-muted-foreground mb-6 max-w-[480px]">
              Un site complet, conçu pour transformer chaque visiteur en demande de devis ou en appel direct. Pas de fonctionnalités superflues.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-5 py-3 border border-border text-sm font-medium transition-colors hover:bg-secondary"
            >
              Voir une démo
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-7 px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col">
              {FEATURES.map((feat, i) => (
                <div
                  key={feat.num}
                  data-cursor="hover"
                  className={`group bento-hover grid grid-cols-[50px_1fr_24px] gap-6 py-5 px-3 items-baseline border-t border-border transition-colors${
                    i === FEATURES.length - 1 ? " border-b border-border" : ""
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground/50 dark:text-foreground/75 group-hover:text-background/50 transition-colors">{feat.num}</span>
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.015em] mb-1.5">{feat.title}</h3>
                    <p className="text-[14px] leading-[1.55] text-foreground/60 group-hover:text-background/70 transition-colors">{feat.text}</p>
                  </div>
                  <span className="text-accent font-bold" aria-hidden="true">✓</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="tarifs" className="border-t border-border border-l border-border grid grid-cols-1 lg:grid-cols-3" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="sr-only">Tarifs</h2>
          {PRICING.map((plan) => (
            <div
              key={plan.code}
              data-cursor="hover"
              className={`px-7 py-9 border-r border-b lg:border-b-0 border-border flex flex-col gap-4${
                plan.flagship ? " bg-foreground text-background" : ""
              }`}
            >
              <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${plan.flagship ? "opacity-55" : "text-muted-foreground"}`}>
                {plan.label}
              </span>
              <h3 className="text-[28px] font-bold tracking-[-0.025em]">{plan.name}</h3>
              <div>
                <span className={`block font-mono text-[11px] uppercase tracking-[0.08em] mb-2 ${plan.flagship ? "opacity-55" : "text-muted-foreground"}`}>
                  {plan.from}
                </span>
                <span className="text-[48px] font-bold tracking-[-0.03em] leading-none">{plan.amount}</span>
              </div>
              <p className={`text-[13.5px] leading-relaxed ${plan.flagship ? "opacity-70" : "text-muted-foreground"}`}>
                {plan.sub}
              </p>
              <ul className="space-y-2.5 text-[14px] flex-1" role="list">
                {plan.features.map((f) => (
                  <li key={f} className="pl-5 relative">
                    <span className="absolute left-0 text-accent font-bold" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className={`mt-auto inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border${
                  plan.flagship
                    ? " border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-background"
                    : " border-current hover:bg-foreground hover:text-background"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </section>

        {/* Villes pills */}
        <section className="px-4 sm:px-6 lg:px-8 py-14 border-t border-border" aria-labelledby="villes-heading">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
            Disponible partout en France
          </div>
          <h2 id="villes-heading" className="text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.025em] mb-8">
            {metier.label} dans{" "}
            <em className="font-serif font-normal italic text-accent">votre ville</em>.
          </h2>
          <div className="flex flex-wrap gap-2">
            {ALL_VILLES.map((v) => (
              <Link
                key={v.slug}
                href={`/metiers/${metier.slug}/${v.slug}`}
                className="px-4 py-2.5 border border-border text-[13px] font-medium transition-all duration-[180ms] hover:border-accent hover:bg-accent hover:text-accent-foreground"
                data-cursor="hover"
              >
                {metier.label} à {v.label}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border grid grid-cols-1 lg:grid-cols-12" aria-labelledby="faq-heading">
          <div className="lg:col-span-5 px-4 sm:px-6 lg:px-8 py-16 lg:border-r lg:border-border">
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
              Questions fréquentes
            </div>
            <h2 id="faq-heading" className="text-[clamp(36px,4.5vw,64px)] font-extrabold tracking-[-0.03em] leading-none">
              Vos{" "}
              <em className="font-serif font-normal italic text-accent">questions</em>.
            </h2>
          </div>
          <div className="lg:col-span-7 px-4 sm:px-6 lg:px-8 py-16">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="faq-details bento-hover group py-5 border-t border-border last:border-b last:border-border"
                open={i === 0}
              >
                <summary className="list-none flex justify-between items-center text-[18px] font-semibold tracking-[-0.01em] gap-4" data-cursor="hover">
                  {item.q}
                </summary>
                <p className="mt-3.5 text-muted-foreground group-hover:text-background/60 leading-[1.6] max-w-[640px] text-[15px]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 text-center border-t border-border">
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-6">
            Démarrer maintenant
          </div>
          <h2 className="mx-auto mb-6 max-w-[980px] text-[clamp(40px,5.5vw,88px)] font-extrabold tracking-[-0.03em] leading-[0.95]">
            Prêt à devenir le{" "}
            <em className="font-serif font-normal italic text-accent">
              {metier.label.toLowerCase()} de référence
            </em>{" "}
            de votre ville&nbsp;?
          </h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[18px] leading-[1.55] text-muted-foreground">
            Diagnostic gratuit en 15 minutes. Nous regardons votre situation actuelle et vous disons honnêtement si nous pouvons vous aider.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            Réserver mon créneau
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
