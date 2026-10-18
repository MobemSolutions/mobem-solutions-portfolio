import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Hero,
  ToolsStrip,
  TradeRows,
  Method,
  Trust,
  Pricing,
  Faq,
} from "@/components/home/sections"
import { ClosingBand } from "@/components/home/closing-band"
import { FiguresSection } from "@/components/home/figures"
import { FAQ, PRICING } from "@/lib/automation-content"

const TITLE = "Mobem Solutions"
const SHARE_TITLE = "Mobem Solutions — Vos tâches administratives tournent toutes seules"
const DESCRIPTION =
  "Mobem Solutions automatise vos tâches administratives (relances, pièces, mails) sur vos propres outils et mesure les heures gagnées. Diagnostic gratuit."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "automatisation tâches administratives",
    "automatisation PME",
    "automatisation Qualiopi",
    "organisme de formation automatisation",
    "courtier assurance relance échéances",
    "cabinet comptable relance pièces manquantes",
    "Nantes",
  ],
  alternates: { canonical: "https://mobem-solutions.com" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mobem-solutions.com",
    siteName: "Mobem Solutions",
    title: SHARE_TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mobem Solutions — studio d'automatisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Nom du site affiché par Google au-dessus du lien
      "@type": "WebSite",
      "@id": "https://mobem-solutions.com/#website",
      name: "Mobem Solutions",
      alternateName: ["Mobem", "mobem-solutions.com"],
      url: "https://mobem-solutions.com",
      inLanguage: "fr-FR",
      publisher: { "@id": "https://mobem-solutions.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://mobem-solutions.com/#organization",
      name: "Mobem Solutions",
      url: "https://mobem-solutions.com",
      logo: { "@type": "ImageObject", url: "https://mobem-solutions.com/logo.png" },
      sameAs: ["https://www.linkedin.com/company/mobem-solutions"],
      description: "Automatisation des tâches administratives pour TPE et PME, près de Nantes.",
      founder: { "@type": "Person", name: "Arnaud Clavier", jobTitle: "Concepteur-développeur en automatisation" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://mobem-solutions.com/#localbusiness",
      name: "Mobem Solutions",
      image: "https://mobem-solutions.com/logo.png",
      logo: "https://mobem-solutions.com/logo.png",
      url: "https://mobem-solutions.com",
      description: DESCRIPTION,
      priceRange: "€€",
      parentOrganization: { "@id": "https://mobem-solutions.com/#organization" },
      email: "contact@mobem-solutions.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nantes",
        addressRegion: "Pays de la Loire",
        postalCode: "44000",
        addressCountry: "FR",
      },
      areaServed: "FR",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automatisation des tâches administratives",
        itemListElement: PRICING.map((p) => ({ "@type": "Offer", name: p.name, description: p.text })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-[14px] focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:shadow-card"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <ToolsStrip />
        <FiguresSection />
        <TradeRows />
        <Pricing />
        <Method />
        <Trust />
        <Faq />
        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
