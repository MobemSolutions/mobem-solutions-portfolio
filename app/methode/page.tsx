import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MethodeFaq } from "@/components/methode-faq"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Notre méthode — De l'idée au site live en 10 jours | Mobem Solutions",
  description:
    "Découvrez le processus Mobem : Brief, Design, Développement, Lancement. Un cycle court de 10 jours qui garantit un site performant, accessible et référencé dès le premier jour.",
  openGraph: {
    title: "Notre méthode — De l'idée au site live en 10 jours",
    description: "Un processus court, transparent et itératif pour livrer des sites haute-performance en 10 jours.",
    url: "https://mobem-solutions.com/methode",
  },
}

const steps = [
  {
    number: "01",
    title: "Découverte & Brief",
    duration: "Jour 1–2",
    summary: "On ne code pas une ligne avant de comprendre votre business.",
    details: [
      "Audit de l'existant : site actuel, positionnement SEO, concurrents directs.",
      "Définition des personas et des parcours utilisateur cibles.",
      "Brief stratégique co-construit : objectifs mesurables, KPIs, contraintes techniques.",
      "Choix de l'architecture technique adaptée (SSG, SSR, SPA, hybride).",
    ],
    output: "Cahier des charges validé + architecture technique définie",
  },
  {
    number: "02",
    title: "Design & Maquettage",
    duration: "Jour 3–5",
    summary: "Des interfaces validées avant de coder, UX d'abord, esthétique ensuite.",
    details: [
      "Wireframes basse fidélité pour valider les parcours utilisateur.",
      "Design haute fidélité sous Figma : typographie, couleurs, composants.",
      "Responsive design natif : mobile-first, tablet, desktop.",
      "Validation client à chaque itération, pas de surprise en fin de projet.",
    ],
    output: "Maquettes validées + Design System livré",
  },
  {
    number: "03",
    title: "Développement",
    duration: "Jour 5–9",
    summary: "Stack moderne, code propre, performances dans l'ADN.",
    details: [
      "Next.js App Router + TypeScript strict pour la fiabilité et le SEO.",
      "Tailwind CSS pour un design system cohérent et maintenable.",
      "Intégration CMS headless (Sanity) pour l'autonomie éditoriale.",
      "Audit Lighthouse > 90 à chaque livraison partielle.",
    ],
    output: "Site fonctionnel en staging + rapport de performance",
  },
  {
    number: "04",
    title: "Lancement & Transfert",
    duration: "Jour 10",
    summary: "Mise en ligne sans friction, vous repartez avec les clés.",
    details: [
      "Déploiement sur Vercel : CDN mondial, SSL, domaine custom configuré.",
      "Redirections 301 et sitemap XML soumis à Google Search Console.",
      "Rapport de performance final (Lighthouse, Core Web Vitals).",
      "Formation de 30 min pour gérer le CMS en autonomie.",
    ],
    output: "Site live + accès complets transmis + documentation",
  },
]

const guarantees = [
  { k: "Lighthouse", v: "90+", d: "Garanti sur les 4 critères : Performance, Accessibilité, SEO, Bonnes pratiques. Mesuré et livré avec rapport." },
  { k: "Livraison", v: "10 j", d: "Un délai court et tenu. Chaque jalon est fixé en début de projet et respecté, pas d'effet tunnel." },
  { k: "Réactivité", v: "24 h", d: "Un associé joignable, pas un ticket de support anonyme. Réponse garantie sous 24h ouvrées post-lancement." },
  { k: "Core Web Vitals", v: "AA", d: "LCP < 2,5s, INP < 200ms, CLS < 0,1. Les métriques Google qui font la différence sur le référencement." },
]

const stack = [
  { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"] },
  { category: "CMS", items: ["Sanity v5", "Portable Text", "GROQ", "Live Preview"] },
  { category: "Infra", items: ["Vercel", "CDN Edge", "SSL auto", "CI/CD intégré"] },
  { category: "Outils", items: ["Figma", "Resend", "Lighthouse", "Search Console"] },
]

const faqs = [
  {
    question: "Combien de temps faut-il pour créer un site avec Mobem Solutions ?",
    answer:
      "Notre processus standard est de 10 jours ouvrés, du brief à la mise en ligne. Ce délai couvre la découverte, le design, le développement et le lancement. Pour des projets plus complexes (e-commerce, application SaaS), le délai est défini lors du brief.",
  },
  {
    question: "Quelles technologies utilisez-vous pour développer les sites ?",
    answer:
      "Next.js (App Router), React 19, TypeScript et Tailwind CSS pour le frontend. Pour le CMS, nous recommandons Sanity v5. L'hébergement se fait sur Vercel, avec CDN mondial et certificat SSL inclus.",
  },
  {
    question: "Pouvez-vous garantir les performances du site ?",
    answer:
      "Oui. Score Lighthouse supérieur à 90 sur les 4 critères (Performance, Accessibilité, SEO, Bonnes pratiques) et Core Web Vitals conformes aux recommandations Google. Un rapport est fourni à la livraison.",
  },
  {
    question: "Que se passe-t-il après le lancement ?",
    answer:
      "Vous repartez avec les accès complets, une formation CMS de 30 minutes et un rapport de performance. Nous restons disponibles pour toute question. Des contrats de maintenance sont disponibles sur demande.",
  },
  {
    question: "Travaillez-vous uniquement avec des clients à Nantes ?",
    answer:
      "Non. Nous travaillons à distance avec des clients dans toute la France. Les réunions se font en visioconférence. Notre ancrage à Nantes est un choix d'équipe, pas une contrainte géographique pour nos clients.",
  },
  {
    question: "Puis-je modifier le site moi-même après livraison ?",
    answer:
      "Oui, c'est un critère de conception. Nous intégrons Sanity CMS (interface intuitive, sans code) et nous vous formons dessus à la livraison. Vous pouvez publier des articles, modifier des textes et ajouter des images en autonomie.",
  },
  {
    question: "Quelle est votre approche pour le référencement naturel (SEO) ?",
    answer:
      "Le SEO est intégré dès la phase de développement : structure HTML sémantique, métadonnées Open Graph, sitemap XML, données structurées JSON-LD, Core Web Vitals optimisés. Pas une option ajoutée, une exigence de base.",
  },
  {
    question: "Quelle est la différence avec une agence web classique ?",
    answer:
      "Trois associés complémentaires (Growth, Design, Engineering) qui interviennent directement sur votre projet, sans sous-traitance. Un interlocuteur unique, un process transparent, des résultats mesurables. Et 10 jours, pas 3 mois.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site web en 10 jours",
  description:
    "Processus de création de site web en 10 jours ouvrés : Brief, Design, Développement, Lancement. Score Lighthouse > 90 garanti.",
  provider: {
    "@type": "Organization",
    name: "Mobem Solutions",
    url: "https://mobem-solutions.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nantes",
      addressRegion: "Pays de la Loire",
      addressCountry: "FR",
    },
  },
  areaServed: "FR",
  serviceType: "Développement web",
  offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
}

export default function MethodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Header />

      <main id="main-content" className="pt-14 lg:pt-16">

        {/* Hero — editorial asymmetric */}
        <section className="border-t border-border relative" aria-labelledby="methode-hero">
          <div className="hidden lg:flex absolute right-0 top-0 h-full items-start pt-8 pr-6 pointer-events-none" aria-hidden="true">
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-16 bg-border" />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/25 select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Méthode · 10 jours · 04 étapes
              </span>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-28 mx-auto max-w-7xl">
            <h1
              id="methode-hero"
              className="font-bold leading-[0.92] tracking-[-0.04em] text-[clamp(44px,7.5vw,120px)] mb-12 sm:mb-16 lg:mb-24"
            >
              De l&apos;idée<br />
              <span className="text-accent" aria-hidden="true">·</span> au site live,<br />
              <span className="font-serif font-normal italic tracking-[-0.02em]">en 10 jours.</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-border pt-10 pb-14 lg:pb-20">
              <div className="hidden lg:flex lg:col-span-1 items-start pt-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">00</span>
              </div>
              <div className="lg:col-span-6 lg:pr-10">
                <p className="text-[17px] sm:text-[18px] leading-[1.5] text-muted-foreground max-w-[58ch]">
                  Un processus court, itératif et transparent. Quatre étapes claires,
                  des jalons validés ensemble, un résultat mesurable. Pas d&apos;effet tunnel,
                  pas de mauvaise surprise.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-border flex flex-col gap-2 items-start">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-accent text-accent-foreground text-[15px] font-semibold transition-colors cta-hover"
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  Diagnostic gratuit · 45 min · Sans engagement
                </span>
                <Link
                  href="/realisations"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 border border-border text-sm font-medium transition-colors hover:bg-secondary mt-2"
                >
                  Voir nos réalisations
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process steps — Swiss table */}
        <section className="border-t border-border" aria-labelledby="process-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="process-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              Processus
            </h2>
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Quatre étapes · validation à chaque jalon
            </span>
          </div>

          <div role="list">
            {steps.map((step, i) => (
              <article
                key={step.number}
                role="listitem"
                data-cursor="hover"
                className={cn(
                  "group bento-hover grid lg:grid-cols-12 gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8 py-10 lg:py-14",
                  i < steps.length - 1 && "border-b border-border",
                )}
              >
                <div className="lg:col-span-1">
                  <span className="font-mono text-[14px] text-accent font-medium">{step.number}</span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] leading-[1.1] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground lg:group-hover:text-background/65 mb-5 transition-colors max-w-[60ch]">
                    {step.summary}
                  </p>
                  <ul className="space-y-2.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[13.5px] leading-[1.55] text-foreground/85 lg:group-hover:text-background/80 transition-colors">
                        <span className="mt-[10px] w-2.5 h-px bg-current opacity-60 flex-shrink-0" aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2 lg:border-l lg:border-border lg:group-hover:border-accent/30 lg:pl-6 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground lg:group-hover:text-background/55 transition-colors block mb-2">
                    Durée
                  </span>
                  <span className="font-mono text-[14px] tabular-nums">{step.duration}</span>
                </div>
                <div className="lg:col-span-3 lg:border-l lg:border-border lg:group-hover:border-accent/30 lg:pl-6 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent lg:group-hover:text-background/55 block mb-2 transition-colors">
                    Livrable
                  </span>
                  <p className="text-[14px] leading-[1.5] font-medium">{step.output}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Guarantees — Swiss KPI strip */}
        <section className="border-t border-border" aria-labelledby="guarantees-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="guarantees-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              Engagements
            </h2>
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Ce qu&apos;on garantit par écrit
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {guarantees.map(({ k, v, d }, i) => (
              <div
                key={k}
                className={cn(
                  "px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col gap-3",
                  i < 3 && "lg:border-r lg:border-border",
                  i % 2 === 0 && "border-r border-border lg:border-r-0",
                  i < 2 && "border-b border-border lg:border-b-0",
                )}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
                  0{i + 1} · {k}
                </span>
                <div className="text-[40px] sm:text-[52px] font-bold tracking-[-0.03em] leading-none">{v}</div>
                <div className="text-[12.5px] leading-[1.5] text-muted-foreground max-w-[28ch]">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack — bento grid */}
        <section className="border-t border-border" aria-labelledby="stack-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="stack-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              Stack
            </h2>
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Les outils qui font la différence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s, i) => (
              <div
                key={s.category}
                className={cn(
                  "px-4 sm:px-6 lg:px-8 py-10 lg:py-12 flex flex-col gap-5",
                  i < stack.length - 1 && "lg:border-r lg:border-border",
                  i % 2 === 0 && "sm:border-r sm:border-border lg:border-r-0",
                  i < 2 && "border-b border-border sm:border-b lg:border-b-0",
                  i === 0 || i === 1 ? "sm:border-b sm:border-border" : "",
                )}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                  {s.category}
                </span>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px]">
                      <span className="w-1.5 h-1.5 bg-accent shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — editorial accordion */}
        <section className="border-t border-border" aria-labelledby="faq-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="faq-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              FAQ
            </h2>
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Questions fréquentes
            </span>
          </div>

          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <MethodeFaq items={faqs} />
          </div>
        </section>

        {/* Final CTA — editorial closing */}
        <section className="border-t border-border bg-inverted text-inverted-foreground" aria-labelledby="cta-heading">
          <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent block mb-6">
                Prochaine étape
              </span>
              <h2 id="cta-heading" className="font-bold tracking-[-0.035em] leading-[0.92] text-[clamp(40px,5.5vw,80px)]">
                Diagnostic gratuit,<br />
                <span className="font-serif font-normal italic">45 minutes,</span> sans engagement.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 items-start">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-accent text-accent-foreground text-[15px] font-semibold transition-colors cta-hover"
              >
                Démarrer maintenant
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-inverted-foreground/55">
                Réponse sous 24 h ouvrées
              </span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
