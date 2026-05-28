import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"

const LogoMarquee = dynamic(() => import("@/components/sections/logo-marquee").then(m => ({ default: m.LogoMarquee })))
const ServicesSection = dynamic(() => import("@/components/sections/services").then(m => ({ default: m.ServicesSection })))
const ProofSection = dynamic(() => import("@/components/sections/proof").then(m => ({ default: m.ProofSection })))
const PricingSection = dynamic(() => import("@/components/sections/pricing").then(m => ({ default: m.PricingSection })))
const TeamSection = dynamic(() => import("@/components/sections/team").then(m => ({ default: m.TeamSection })))
const ContactSection = dynamic(() => import("@/components/sections/contact").then(m => ({ default: m.ContactSection })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export const metadata: Metadata = {
  title: "Mobem Solutions — Agence Web Nantes | Sites pro livrés en 10 jours",
  description:
    "Agence web à Nantes spécialisée PME & artisans. Sites professionnels livrés en 10 jours, SEO local inclus, Lighthouse 90+ garanti. Diagnostic gratuit sans engagement.",
  keywords: [
    "agence web Nantes",
    "création site internet Nantes",
    "site web PME",
    "site artisan",
    "SEO local Nantes",
    "développement web",
    "agence digitale Nantes",
    "site vitrine",
  ],
  alternates: {
    canonical: "https://mobem-solutions.com",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mobem-solutions.com",
    siteName: "Mobem Solutions",
    title: "Mobem Solutions — Agence Web Nantes | Sites pro livrés en 10 jours",
    description:
      "Sites pros en 10 jours · SEO local · Lighthouse 90+ · Diagnostic gratuit.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mobem Solutions — Agence Web Nantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobem Solutions — Agence Web Nantes | Sites pro livrés en 10 jours",
    description:
      "Sites web professionnels pour PME & artisans. Livrés en 10 jours, SEO local inclus, Lighthouse 90+.",
    images: ["/opengraph-image"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mobem-solutions.com/#organization",
      name: "Mobem Solutions",
      url: "https://mobem-solutions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://mobem-solutions.com/mobem-logo-redimension-removebg-preview.png",
      },
      sameAs: ["https://www.linkedin.com/company/mobem-solutions"],
      description:
        "Agence web à Nantes spécialisée dans la création de sites internet pour PME et artisans.",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://mobem-solutions.com/#localbusiness",
      name: "Mobem Solutions",
      image: "https://mobem-solutions.com/mobem-logo-redimension-removebg-preview.png",
      url: "https://mobem-solutions.com",
      telephone: "+33-contact-mobem-solutions",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nantes",
        addressRegion: "Pays de la Loire",
        postalCode: "44000",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.2184,
        longitude: -1.5536,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de création de sites web",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Site web Essentiel",
            description: "Site vitrine professionnel livré en 10 jours",
          },
          {
            "@type": "Offer",
            name: "Site web Expert",
            description: "Plateforme sur-mesure pensée pour convertir",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mobem-solutions.com/#website",
      url: "https://mobem-solutions.com",
      name: "Mobem Solutions",
      publisher: { "@id": "https://mobem-solutions.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://mobem-solutions.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-accent focus-visible:text-accent-foreground"
      >
        Aller au contenu principal
      </a> */}
      <Header />
      <main id="main-content">
        <HeroSection />
        <div className="-mt-6 mb-6 overflow-hidden">
          <LogoMarquee />
        </div>
        <ServicesSection />
        {/* Section À propos — Swiss editorial */}
        <section className="relative bg-inverted text-inverted-foreground overflow-hidden" aria-labelledby="about-us-heading">

          {/* Typographie oversized décorative — "histoire." déborde à droite */}
          <span
            className="hidden lg:block absolute bottom-0 right-0 font-serif italic font-normal leading-[0.82] tracking-[-0.04em] whitespace-nowrap select-none pointer-events-none text-inverted-foreground/[0.06]"
            style={{ fontSize: "clamp(120px, 18vw, 260px)", transform: "translateX(12%)" }}
            aria-hidden="true"
          >
            histoire.
          </span>

          {/* Contenu */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-24 lg:pb-32 mx-auto max-w-7xl">

            {/* Label */}
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent block mb-8">
              Qui sommes-nous ?
            </span>

            {/* Layout asymétrique : titre large à gauche, bloc droit décalé vers le bas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">

              {/* Titre — 7 cols, très grand */}
              <div className="lg:col-span-7">
                <h2 id="about-us-heading" className="font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(44px,6vw,88px)]">
                  Notre équipe,<br />
                  <em className="font-serif font-normal italic text-inverted-foreground/80">notre histoire.</em>
                </h2>
              </div>

              {/* Bloc texte + CTA — 4 cols, poussé à droite et décalé vers le bas */}
              <div className="lg:col-span-4 lg:col-start-9 lg:pt-16 flex flex-col gap-8">
                <p className="text-[16px] leading-[1.65] text-inverted-foreground/60">
                  Découvrez les valeurs qui nous animent, les experts qui composent Mobem Solutions, et notre vision pour accompagner les PME et ETI.
                </p>
                <a href="/a-propos" className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-accent-foreground font-semibold text-[13px] self-start cta-hover cta-hover-on-dark transition-colors">
                  En savoir plus sur nous
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>
        <ProofSection />
        <PricingSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
