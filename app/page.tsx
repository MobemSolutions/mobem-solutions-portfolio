import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { PortfolioTeaser } from "@/components/sections/portfolio-teaser"
import { TeamSection } from "@/components/sections/team"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { PricingSection } from "@/components/sections/pricing"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:rounded-lg"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioTeaser />
        {/* <TestimonialsSection /> */}
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
