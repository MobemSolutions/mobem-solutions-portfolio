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
        <LogoMarquee />
        <ServicesSection />
        {/* Section "À propos" redesign - éditorial avec fond sombre */}
        <section className="bg-inverted text-inverted-foreground py-16 lg:py-24" aria-labelledby="about-us-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">
              <div className="lg:max-w-[52%]">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent block mb-4">
                  Qui sommes-nous ?
                </span>
                <h2 id="about-us-heading" className="font-bold tracking-[-0.03em] leading-[0.95] text-[clamp(34px,3.5vw,54px)]">
                  Notre équipe, <em className="font-serif font-normal italic">notre histoire.</em>
                </h2>
              </div>
              <div className="flex flex-col items-start gap-8 lg:max-w-[42%]">
                <p className="text-[17px] leading-[1.6] text-inverted-foreground/75">
                  Découvrez les valeurs qui nous animent, les experts qui composent Mobem Solutions, et notre vision pour accompagner les PME et ETI.
                </p>
                <a href="/a-propos" className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-medium text-[14px] cta-hover cta-hover-on-dark transition-colors">
                  En savoir plus sur nous
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" />
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
