import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search, PenTool, Code2, Rocket, CheckCircle2, Zap, Shield, Clock, Gauge } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Notre méthode — De l'idée au site live en 10 jours | Mobem Solutions",
  description:
    "Découvrez le processus Mobem : Brief, Design, Développement, Lancement — un cycle court de 10 jours qui garantit un site performant, accessible et référencé dès le premier jour.",
  openGraph: {
    title: "Notre méthode — De l'idée au site live en 10 jours",
    description: "Un processus court, transparent et itératif pour livrer des sites haute-performance en 10 jours.",
    url: "https://mobem-solutions.com/methode",
  },
}

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découverte & Brief",
    duration: "Jour 1–2",
    color: "accent",
    summary: "On ne code pas une ligne avant de comprendre votre business.",
    details: [
      "Audit de l'existant : site actuel, positionnement SEO, concurrents directs",
      "Définition des personas et des parcours utilisateur cibles",
      "Brief stratégique co-construit : objectifs mesurables, KPIs, contraintes techniques",
      "Choix de l'architecture technique adaptée (SSG, SSR, SPA, hybride)",
    ],
    output: "Cahier des charges validé + architecture technique définie",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design & Maquettage",
    duration: "Jour 3–5",
    color: "chart-2",
    summary: "Des interfaces validées avant de coder — UX d'abord, esthétique ensuite.",
    details: [
      "Wireframes basse fidélité pour valider les parcours utilisateur",
      "Design haute fidélité sous Figma : typographie, couleurs, composants",
      "Responsive design natif : mobile-first, tablet, desktop",
      "Validation client à chaque itération — pas de surprise en fin de projet",
    ],
    output: "Maquettes validées + Design System livré",
  },
  {
    number: "03",
    icon: Code2,
    title: "Développement",
    duration: "Jour 5–9",
    color: "chart-4",
    summary: "Stack moderne, code propre, performances dans l'ADN.",
    details: [
      "Next.js App Router + TypeScript strict pour la fiabilité et le SEO",
      "Tailwind CSS pour un design system cohérent et maintenable",
      "Intégration CMS headless (Sanity) pour l'autonomie éditoriale",
      "Audit Lighthouse > 90 à chaque livraison partielle",
    ],
    output: "Site fonctionnel en staging + rapport de performance",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lancement & Transfert",
    duration: "Jour 10",
    color: "accent",
    summary: "Mise en ligne sans friction — vous repartez avec les clés.",
    details: [
      "Déploiement sur Vercel : CDN mondial, SSL, domaine custom configuré",
      "Redirections 301 et sitemap XML soumis à Google Search Console",
      "Rapport de performance final (Lighthouse, Core Web Vitals)",
      "Formation de 30 min pour gérer le CMS en autonomie",
    ],
    output: "Site live + accès complets transmis + documentation",
  },
]

const guarantees = [
  {
    icon: Gauge,
    title: "Score Lighthouse > 90",
    description: "Garanti sur les 4 critères : Performance, Accessibilité, SEO, Bonnes pratiques. Mesuré et livré avec rapport.",
  },
  {
    icon: Clock,
    title: "Livraison en 10 jours ouvrés",
    description: "Un délai court et tenu. Chaque jalon est fixé en début de projet et respecté — pas d'effet tunnel.",
  },
  {
    icon: Shield,
    title: "Réactivité 24h",
    description: "Un associé joignable, pas un ticket de support anonyme. Réponse garantie sous 24h ouvrées post-lancement.",
  },
  {
    icon: Zap,
    title: "Core Web Vitals validés",
    description: "LCP < 2,5s, INP < 200ms, CLS < 0,1 — les métriques Google qui font la différence sur le référencement.",
  },
]

const stack = [
  { category: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"] },
  { category: "CMS", items: ["Sanity v5", "Portable Text", "GROQ", "Live Preview"] },
  { category: "Infra", items: ["Vercel", "CDN Edge", "SSL auto", "CI/CD intégré"] },
  { category: "Outils", items: ["Figma", "Resend", "Lighthouse", "Google Search Console"] },
]

const faqs = [
  {
    question: "Combien de temps faut-il pour créer un site web avec Mobem Solutions ?",
    answer:
      "Notre processus standard est de 10 jours ouvrés, du brief à la mise en ligne. Ce délai couvre la découverte, le design, le développement et le lancement. Pour des projets plus complexes (e-commerce, application SaaS), le délai est défini lors du brief.",
  },
  {
    question: "Quelles technologies utilisez-vous pour développer les sites ?",
    answer:
      "Nous utilisons Next.js (App Router), React 19, TypeScript et Tailwind CSS pour le frontend. Pour le CMS, nous recommandons Sanity v5. L'hébergement se fait sur Vercel, avec CDN mondial et certificat SSL inclus.",
  },
  {
    question: "Pouvez-vous garantir les performances du site ?",
    answer:
      "Oui. Nous garantissons un score Lighthouse supérieur à 90 sur les 4 critères (Performance, Accessibilité, SEO, Bonnes pratiques) et des Core Web Vitals conformes aux recommandations Google. Un rapport est fourni à la livraison.",
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
      "Oui, c'est un critère de conception. Nous intégrons Sanity CMS (interface intuitive, sans code) et nous vous formons dessus à la livraison. Vous pouvez publier des articles, modifier des textes et ajouter des images en totale autonomie.",
  },
  {
    question: "Quelle est votre approche pour le référencement naturel (SEO) ?",
    answer:
      "Le SEO est intégré dès la phase de développement : structure HTML sémantique, métadonnées Open Graph, sitemap XML, données structurées JSON-LD, Core Web Vitals optimisés. Nous ne traitons pas le SEO comme une option — c'est une exigence de base.",
  },
  {
    question: "Quelle est la différence entre Mobem Solutions et une agence web classique ?",
    answer:
      "Trois associés complémentaires (Growth, Design, Engineering) qui interviennent directement sur votre projet — sans sous-traitance. Un interlocuteur unique, un process transparent, des résultats mesurables. Et 10 jours, pas 3 mois.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
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
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
}

export default function MethodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Header />

      <main id="main-content" className="pt-14 lg:pt-16">

        {/* Hero */}
        <section className="py-20 lg:py-32 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Notre méthode
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                De l'idée au site live{" "}
                <span className="text-accent">en 10 jours</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Un processus court, itératif et transparent. Quatre étapes claires,
                des jalons validés ensemble, un résultat mesurable. Pas d'effet tunnel,
                pas de mauvaise surprise.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-secondary/70 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process steps */}
        <section className="py-24 lg:py-32" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Les 4 étapes du processus
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Chaque étape a un livrable précis. Vous validez avant qu'on avance.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="bg-card border border-border rounded-2xl p-8 lg:p-10 grid lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-12 items-start"
                >
                  {/* Number + icon */}
                  <div className="flex lg:flex-col items-center lg:items-start gap-4">
                    <span className="text-5xl font-bold text-accent/20 leading-none tabular-nums">
                      {step.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{step.summary}</p>
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Output */}
                  <div className="bg-accent/5 border border-accent/15 rounded-xl p-5">
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Livrable</p>
                    <p className="text-sm text-foreground font-medium">{step.output}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-24 bg-secondary/30" aria-labelledby="guarantees-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Nos engagements
              </span>
              <h2 id="guarantees-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                Ce qu'on garantit, par écrit
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((g) => (
                <div key={g.title} className="bg-card border border-border rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <g.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="py-24 lg:py-32" aria-labelledby="stack-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                  Stack technique
                </span>
                <h2 id="stack-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                  Les outils qui font la différence
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm lg:text-right">
                Pas de page builder, pas de WordPress mal sécurisé. Des technologies
                modernes qui tiennent leurs promesses de performance.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stack.map((s) => (
                <div key={s.category} className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4">{s.category}</p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-secondary/30" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                FAQ
              </span>
              <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                Questions fréquentes
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-foreground hover:text-accent transition-colors">
                    {faq.question}
                    <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Répondez à quelques questions sur votre projet, on revient vers vous sous 24h
              avec une proposition adaptée.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
            >
              Démarrer maintenant
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
