import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortfolioGrid } from "@/components/sections/portfolio-grid"

export const metadata: Metadata = {
  title: "Nos réalisations — Mobem Solutions",
  description:
    "Découvrez nos études de cas sectorielles : sites vitrines, refontes digitales et stratégies B2B pour PME et ETI.",
}

export default function RealisationsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-14 lg:pt-16 min-h-screen">
        <PortfolioGrid />
      </main>
      <Footer />
    </>
  )
}
