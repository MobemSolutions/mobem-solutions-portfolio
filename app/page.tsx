import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { LogoMarquee } from "@/components/sections/logo-marquee"
import { PricingSection } from "@/components/sections/pricing"
import { ServicesSection } from "@/components/sections/services"
import { FinderSection } from "@/components/sections/finder"
import { ProofSection } from "@/components/sections/proof"
import { TeamSection } from "@/components/sections/team"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

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
      "Sites web professionnels pour PME & artisans. Livrés en 10 jours, SEO local inclus, Lighthouse 90+. Diagnostic gratuit.",
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
            price: "1500",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Site web Expert",
            description: "Plateforme sur-mesure pensée pour convertir",
            price: "4500",
            priceCurrency: "EUR",
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
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-accent focus-visible:text-accent-foreground"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <LogoMarquee />
        <ServicesSection />
        <FinderSection />
        <PricingSection />
        <ProofSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
