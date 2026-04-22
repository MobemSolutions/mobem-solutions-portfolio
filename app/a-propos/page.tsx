import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Lightbulb, Target, Handshake, MapPin, LinkedinIcon } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "À propos — Agence digitale nantaise | Mobem Solutions",
  description:
    "Mobem Solutions est une agence digitale nantaise fondée par trois associés complémentaires. Growth Marketing Engineering : stratégie, design et ingénierie au service des PME et ETI.",
  openGraph: {
    title: "À propos — Mobem Solutions, agence digitale à Nantes",
    description:
      "Trois associés, une philosophie GME (Growth Marketing Engineering) — stratégie, design et ingénierie pour les entreprises ambitieuses.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const team = [
  {
    name: "Nathan Portier",
    role: "Mandataire — Responsable Croissance & Communication",
    bio: "Stratège orienté résultats, Nathan pilote Mobem Solutions et assure la cohérence entre les objectifs business et leur exécution. Expert en communication et acquisition, il transforme chaque projet en levier de croissance mesurable.",
    expertise: ["Stratégie digitale", "Communication", "Growth Marketing", "Acquisition"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    initials: "NP",
    pole: "Growth",
    color: "accent" as const,
  },
  {
    name: "Arnaud Clavier",
    role: "Co-Mandataire — Responsable Développement Technique",
    bio: "Architecte de solutions digitales, Arnaud transforme les idées complexes en architectures robustes et évolutives. Garant technique du collectif, il s'assure que chaque livraison répond aux standards de performance et de sécurité les plus exigeants.",
    expertise: ["Next.js / React", "Architecture système", "TypeScript", "Sécurité web"],
    linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
    initials: "AC",
    pole: "Engineering",
    color: "chart-2" as const,
  },
  {
    name: "Antoine Clavier",
    role: "Responsable Design & Expérience Utilisateur (UX/UI)",
    bio: "Créateur d'interfaces intuitives, Antoine place l'utilisateur au centre de chaque décision. Il traduit les besoins fonctionnels en expériences visuelles marquantes — alliant esthétisme moderne et ergonomie fluide.",
    expertise: ["UX Research", "UI Design", "Design Systems", "Prototypage Figma"],
    linkedin: "https://www.linkedin.com/in/antoine-clavier-561750204/",
    initials: "AC",
    pole: "Marketing",
    color: "chart-4" as const,
  },
]

const values = [
  {
    icon: Lightbulb,
    title: "Expertise accessible",
    tagline: "Pas de jargon — des décisions claires",
    description:
      "On traduit la complexité technique en options concrètes. Vous restez maître de votre projet, on vous donne les clés pour décider en connaissance de cause.",
    color: "accent" as const,
  },
  {
    icon: Target,
    title: "Engagement sur les résultats",
    tagline: "Notre succès = le vôtre",
    description:
      "Chaque livraison est mesurable : score Lighthouse, délai respecté, objectif atteint. On s'engage sur des indicateurs réels, pas sur des promesses creuses.",
    color: "chart-2" as const,
  },
  {
    icon: Handshake,
    title: "Partenariat long terme",
    tagline: "Un associé, pas un prestataire",
    description:
      "Après le lancement, on reste disponibles. Vous avez un interlocuteur direct, joignable, qui connaît votre projet par cœur — pas un ticket de support anonyme.",
    color: "chart-4" as const,
  },
]

const gmeBlocks = [
  {
    letter: "G",
    word: "Growth",
    color: "accent",
    description:
      "Chaque site est conçu pour convertir, pas juste pour exister. Acquisition, rétention, notoriété — la croissance est un critère de conception dès le brief.",
  },
  {
    letter: "M",
    word: "Marketing",
    color: "chart-4",
    description:
      "Le marketing n'est pas une couche ajoutée après développement. SEO technique, copywriting, positionnement, brand design — tout est pensé ensemble dès le départ.",
  },
  {
    letter: "E",
    word: "Engineering",
    color: "chart-2",
    description:
      "L'ingénierie de qualité n'est pas un luxe. Architecture propre, performances garanties, code maintenable — un investissement qui évite les refactorisations coûteuses.",
  },
]

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mobem Solutions",
  url: "https://mobem-solutions.com",
  logo: "https://mobem-solutions.com/mobem-logo-redimension-removebg-preview.png",
  description:
    "Agence digitale nantaise spécialisée en création de sites web haute-performance, UX/UI design et stratégie digitale pour PME et ETI.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nantes",
    addressRegion: "Pays de la Loire",
    postalCode: "44000",
    addressCountry: "FR",
  },
  areaServed: "FR",
  sameAs: [
    "https://www.linkedin.com/company/mobem-solutions",
  ],
  employee: team.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    sameAs: m.linkedin,
    worksFor: { "@type": "Organization", name: "Mobem Solutions" },
  })),
}

export default function AProposPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Header />

      <main id="main-content" className="pt-14 lg:pt-16">

        {/* Hero */}
        <section className="py-20 lg:py-32 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Qui sommes-nous
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Une agence digitale{" "}
                <span className="text-accent">nantaise</span>{" "}
                qui s'engage sur les résultats
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Mobem Solutions est fondée par trois associés complémentaires — Growth, Marketing,
                Engineering. Pas de sous-traitance, pas d'intermédiaires : les trois experts
                qui signent votre devis sont ceux qui livrent votre projet.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>Nantes, Pays de la Loire — intervention dans toute la France</span>
              </div>
            </div>
          </div>
        </section>

        {/* GME Philosophy */}
        <section className="py-24 lg:py-32" aria-labelledby="gme-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div>
                <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                  Notre philosophie
                </span>
                <h2 id="gme-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                  Growth · Marketing · Engineering
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm lg:text-right">
                Trois disciplines réunies dans un seul collectif — parce que les projets
                qui réussissent ne cloisonnent pas les expertises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {gmeBlocks.map((block) => (
                <div key={block.letter} className="bg-card border border-border rounded-2xl p-8">
                  <div className={cn(
                    "text-6xl font-black mb-4 leading-none",
                    block.color === "accent" && "text-accent",
                    block.color === "chart-2" && "text-chart-2",
                    block.color === "chart-4" && "text-chart-4",
                  )}>
                    {block.letter}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{block.word}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{block.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-secondary/30" aria-labelledby="team-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                L'équipe
              </span>
              <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Trois associés, une vision commune
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Chaque associé est expert dans son domaine et intervient directement sur vos projets.
                Vous ne parlez jamais à un chef de projet qui délègue à des développeurs anonymes.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="bg-card border border-border rounded-2xl p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold",
                      member.color === "accent" && "bg-accent/10 text-accent",
                      member.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                      member.color === "chart-4" && "bg-chart-4/10 text-chart-4",
                    )}>
                      {member.initials}
                    </div>
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full",
                      member.color === "accent" && "bg-accent/10 text-accent",
                      member.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                      member.color === "chart-4" && "bg-chart-4/10 text-chart-4",
                    )}>
                      {member.pole}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className={cn(
                    "text-sm font-medium mb-4",
                    member.color === "accent" && "text-accent",
                    member.color === "chart-2" && "text-chart-2",
                    member.color === "chart-4" && "text-chart-4",
                  )}>
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{member.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Profil LinkedIn de ${member.name}`}
                  >
                    <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 lg:py-32" aria-labelledby="values-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Notre ADN
              </span>
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                Ce qui nous guide au quotidien
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    value.color === "accent" && "bg-accent/10 text-accent",
                    value.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                    value.color === "chart-4" && "bg-chart-4/10 text-chart-4",
                  )}>
                    <value.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={cn(
                      "text-xs font-semibold uppercase tracking-wider mb-1",
                      value.color === "accent" && "text-accent",
                      value.color === "chart-2" && "text-chart-2",
                      value.color === "chart-4" && "text-chart-4",
                    )}>
                      {value.tagline}
                    </p>
                    <h3 className="text-base font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local anchor — Nantes */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <MapPin className="w-8 h-8 text-accent mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Nantes, Pays de la Loire
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nous sommes basés à Nantes et travaillons en remote avec des clients dans toute
              la France. Notre ancrage local est un choix d'équipe — Nantes est une ville
              qui entreprend, et nous partageons cet état d'esprit avec nos clients régionaux.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              On travaille ensemble ?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Décrivez votre projet en quelques lignes — on revient vers vous sous 24h
              avec une première analyse gratuite.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
              >
                Contacter l'équipe
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/methode"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/70 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
              >
                Notre méthode
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
