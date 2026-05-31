import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Lightbulb, Target, Handshake, MapPin, Linkedin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EditorialBadge } from "@/components/ui/editorial-badge"
import { SmoothAnchorLink } from "@/components/smooth-anchor-link"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "À propos — Agence digitale nantaise | Mobem Solutions",
  description:
    "Mobem Solutions est une agence digitale nantaise fondée par trois associés complémentaires. Growth Marketing Engineering : stratégie, design et ingénierie au service des PME et ETI.",
  openGraph: {
    title: "À propos — Mobem Solutions, agence digitale à Nantes",
    description:
      "Trois associés, une philosophie GME (Growth Marketing Engineering), stratégie, design et ingénierie pour les entreprises ambitieuses.",
    url: "https://mobem-solutions.com/a-propos",
  },
}

const team = [
  {
    num: "01",
    name: "Nathan Portier",
    role: "Mandataire · Croissance & Communication",
    bio: "Stratège orienté résultats, Nathan pilote Mobem Solutions et assure la cohérence entre les objectifs business et leur exécution. Expert en communication et acquisition, il transforme chaque projet en levier de croissance mesurable.",
    expertise: ["Stratégie digitale", "Communication", "Growth Marketing", "Acquisition"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    initials: "NP",
    pole: "Growth",
  },
  {
    num: "02",
    name: "Arnaud Clavier",
    role: "Co-Mandataire · Développement Technique",
    bio: "Architecte de solutions digitales, Arnaud transforme les idées complexes en architectures robustes et évolutives. Garant technique du collectif, il s'assure que chaque livraison répond aux standards de performance et de sécurité les plus exigeants.",
    expertise: ["Next.js / React", "Architecture système", "TypeScript", "Sécurité web"],
    linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
    initials: "AC",
    pole: "Engineering",
  },
  {
    num: "03",
    name: "Antoine Clavier",
    role: "Design & UX/UI",
    bio: "Créateur d'interfaces intuitives, Antoine place l'utilisateur au centre de chaque décision. Il traduit les besoins fonctionnels en expériences visuelles marquantes, alliant esthétisme moderne et ergonomie fluide.",
    expertise: ["UX Research", "UI Design", "Design Systems", "Prototypage Figma"],
    linkedin: "https://www.linkedin.com/in/antoine-clavier-561750204/",
    initials: "AC",
    pole: "Design",
  },
]

const values = [
  {
    icon: Lightbulb,
    title: "Expertise accessible",
    tagline: "Pas de jargon, des décisions claires.",
    description:
      "On traduit la complexité technique en options concrètes. Vous restez maître de votre projet, on vous donne les clés pour décider en connaissance de cause.",
  },
  {
    icon: Target,
    title: "Engagement sur les résultats",
    tagline: "Notre succès = le vôtre.",
    description:
      "Chaque livraison est mesurable : score Lighthouse, délai respecté, objectif atteint. On s'engage sur des indicateurs réels, pas sur des promesses creuses.",
  },
  {
    icon: Handshake,
    title: "Partenariat long terme",
    tagline: "Un associé, pas un prestataire.",
    description:
      "Après le lancement, on reste disponibles. Vous avez un interlocuteur direct, joignable, qui connaît votre projet par cœur, pas un ticket de support anonyme.",
  },
]

const gmeBlocks = [
  {
    letter: "G",
    word: "Growth",
    description:
      "Chaque site est conçu pour convertir, pas juste pour exister. Acquisition, rétention, notoriété, la croissance est un critère de conception dès le brief.",
  },
  {
    letter: "M",
    word: "Marketing",
    description:
      "Le marketing n'est pas une couche ajoutée après développement. SEO technique, copywriting, positionnement, brand design : tout est pensé ensemble dès le départ.",
  },
  {
    letter: "E",
    word: "Engineering",
    description:
      "L'ingénierie de qualité n'est pas un luxe. Architecture propre, performances garanties, code maintenable : un investissement qui évite les refactorisations coûteuses.",
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
  sameAs: ["https://www.linkedin.com/company/mobem-solutions"],
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

        {/* Hero — editorial asymmetric */}
        <section className="border-t border-border relative" aria-labelledby="apropos-hero">
          {/* <div className="hidden lg:flex absolute right-0 top-0 h-full items-start pt-8 pr-6 pointer-events-none" aria-hidden="true">
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-16 bg-border" />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/25 select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Atelier · Nantes · 03 associés
              </span>
            </div>
          </div> */}

          <div className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-28 mx-auto max-w-7xl">
            <EditorialBadge className="mb-10">Qui sommes-nous</EditorialBadge>
            <h1
              data-animate=""
              id="apropos-hero"
              className="font-bold leading-[0.9] tracking-[-0.04em] text-[clamp(44px,7.5vw,120px)] mb-12 sm:mb-16 lg:mb-24"
            >
              Trois associés,<br />
              <span className="font-serif font-normal italic tracking-[-0.02em]">une seule signature</span><br />
              <span className="text-accent" aria-hidden="true">·</span> sur votre projet.
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-border pt-10 pb-14 lg:pb-20">
              <div data-animate="" data-delay="100" className="lg:col-span-7 lg:pr-10">
                <p className="text-[17px] sm:text-[18px] leading-[1.5] text-muted-foreground max-w-[62ch]">
                  Mobem Solutions est fondée par trois associés complémentaires : Growth,
                  Marketing, Engineering. Pas de sous-traitance, pas d&apos;intermédiaires. Les
                  trois experts qui signent votre devis sont ceux qui livrent votre projet.
                </p>
              </div>
              <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-border flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">Ancrage</span>
                <p className="inline-flex items-center gap-2 text-[14px] leading-relaxed text-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  Nantes, Pays de la Loire. Intervention France entière.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GME Philosophy — Swiss bento */}
        <section className="border-t border-border" aria-labelledby="gme-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="gme-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              Philosophie
            </h2>
            {/* <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Growth · Marketing · Engineering
            </span> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {gmeBlocks.map((block, i) => (
              <div
                key={block.letter}
                data-cursor="hover"
                data-animate=""
                data-delay={i > 0 ? String(i * 100) : undefined}
                className={cn(
                  "group bento-hover px-6 lg:px-10 py-12 lg:py-16 flex flex-col gap-6",
                  i < gmeBlocks.length - 1 && "border-b lg:border-b-0 lg:border-r border-border",
                )}
              >
                <div>
                  <span className="font-serif italic font-bold text-[clamp(72px,9vw,120px)] leading-none tracking-[-0.04em] text-accent group-hover:text-background transition-colors">
                    {block.letter}
                  </span>
                </div>
                <div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] mb-3">{block.word}</h3>
                  <p className="text-[14px] leading-[1.6] text-muted-foreground group-hover:text-background/70 transition-colors max-w-[36ch]">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-border" aria-labelledby="team-page-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="team-page-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              L&apos;équipe
            </h2>
            {/* <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Trois associés · interlocuteurs directs
            </span> */}
          </div>

          <div className="overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory lg:snap-none">
            <div className="flex lg:grid lg:grid-cols-[1.12fr_1fr_0.92fr] min-w-max lg:min-w-0">
              {team.map((member, i) => (
                <article
                  key={member.name}
                  data-cursor="hover"
                  data-animate=""
                  data-delay={i > 0 ? String(i * 100) : undefined}
                  className={cn(
                    "group flex flex-col w-[340px] lg:w-auto px-6 lg:px-10 py-10 lg:py-14 bento-hover border-r border-border lg:border-r-0 snap-start lg:snap-align-none",
                    i < 2 && "lg:border-r lg:border-border",
                  )}
                >
                  <div className="flex justify-end mb-8">
                    <div className="w-10 h-10 border border-current/20 flex items-center justify-center font-mono text-[11px] text-foreground/70 group-hover:text-background/70 transition-colors">
                      {member.initials}
                    </div>
                  </div>

                  <h3 className="text-[28px] lg:text-[32px] font-bold tracking-[-0.025em] leading-none mb-2">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent group-hover:text-background/80 mb-6 transition-colors">
                    {member.role}
                  </p>
                  <p className="text-[14px] leading-[1.6] text-muted-foreground group-hover:text-background/65 flex-1 mb-6 transition-colors">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-1 border border-current/25">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start pt-4 border-t border-current/15 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground group-hover:text-background/65 hover:text-accent transition-colors"
                    aria-label={`Profil LinkedIn de ${member.name}`}
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                    LinkedIn ↗
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values — Swiss table */}
        <section className="border-t border-border" aria-labelledby="values-heading">
          <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-10 border-b border-border">
            <h2 id="values-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
              ADN
            </h2>
            {/* <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Ce qui nous guide au quotidien
            </span> */}
          </div>

          <div role="list">
            {values.map((value, i) => (
              <div
                key={value.title}
                role="listitem"
                data-cursor="hover"
                data-animate=""
                className={cn(
                  "group bento-hover grid lg:grid-cols-12 gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8 py-10 lg:py-14 items-baseline",
                  i < values.length - 1 && "border-b border-border",
                )}
              >
                <div className="lg:col-span-1 flex items-baseline gap-3">
                  <value.icon className="w-5 h-5 text-accent shrink-0 group-hover:text-background transition-colors" aria-hidden="true" />
                  <span className="font-mono text-[14px] text-accent font-medium group-hover:text-background transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] mb-2 leading-tight">
                    {value.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent group-hover:text-background/80 transition-colors">
                    {value.tagline}
                  </p>
                </div>
                <div className="lg:col-span-6 lg:border-l lg:border-border lg:group-hover:border-background/15 lg:pl-8 transition-colors">
                  <p className="text-[14.5px] leading-[1.6] text-muted-foreground group-hover:text-background/70 max-w-[60ch] transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local anchor — Nantes, as inverted band */}
        {/* <section className="border-t border-border bg-inverted text-inverted-foreground" aria-labelledby="local-heading">
          <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent mb-6 block">
                Ancrage local
              </span>
              <h2 id="local-heading" className="font-bold tracking-[-0.035em] leading-[0.92] text-[clamp(40px,5.5vw,80px)]">
                Nantes,<br />
                <span className="font-serif font-normal italic">une ville qui entreprend.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-[14.5px] leading-[1.6] text-inverted-foreground/70 max-w-[40ch]">
                Basés à Nantes, en remote avec des clients dans toute la France. Notre ancrage
                local est un choix d&apos;équipe. Nous partageons cet état d&apos;esprit avec
                nos clients régionaux.
              </p>
            </div>
          </div>
        </section> */}

        {/* Final CTA */}
        <section className="border-t border-border" aria-labelledby="cta-heading">
          <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 items-end">
            <div data-animate="" className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent block mb-6">
                Travaillons ensemble
              </span>
              <h2 id="cta-heading" className="font-bold tracking-[-0.035em] leading-[0.92] text-[clamp(40px,5.5vw,80px)]">
                Décrivez votre projet,<br />
                <span className="font-serif font-normal italic">on revient sous 24 h.</span>
              </h2>
            </div>
            <div data-animate="" data-delay="100" className="lg:col-span-4 flex flex-col gap-3 items-start">
              <SmoothAnchorLink
                href="/#contact"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-accent text-accent-foreground text-[15px] font-semibold transition-colors cta-hover"
              >
                Contacter l&apos;équipe
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </SmoothAnchorLink>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                Diagnostic gratuit · 45 min · Sans engagement
              </span>
              <Link
                href="/methode"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 border border-border text-sm font-medium transition-colors hover:bg-secondary mt-2"
              >
                Voir notre méthode
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
