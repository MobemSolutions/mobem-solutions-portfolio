import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { PortfolioSection } from "@/components/sections/portfolio"
import { TeamSection } from "@/components/sections/team"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        {/* <TestimonialsSection /> */}
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
