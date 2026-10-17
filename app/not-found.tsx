import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/home/primitives"

export const metadata: Metadata = {
  title: "Page introuvable | Mobem Solutions",
  robots: { index: false },
}

const LINKS = [
  { label: "Accueil", href: "/", desc: "Vos tâches administratives tournent toutes seules" },
  { label: "Métiers", href: "/metiers", desc: "Formation, courtage, expertise comptable" },
  { label: "Méthode", href: "/methode", desc: "Diagnostiquer avant de prescrire" },
  { label: "Tarifs", href: "/#tarifs", desc: "Du diagnostic gratuit à la maintenance" },
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
        <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
        <Container className="relative flex flex-col items-center text-center">
          <p className="chip-dark">Erreur 404</p>
          <h1 className="type-display mt-8 max-w-[18ch] text-ink text-balance">Cette page n&apos;existe pas, ou plus.</h1>
          <p className="type-body mt-6 max-w-[56ch] text-charcoal">
            Le lien que vous avez suivi est peut-être ancien. Voici où reprendre.
          </p>
          <ul className="mt-12 grid w-full max-w-[760px] gap-4 text-left sm:grid-cols-2">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="card-lift group flex items-center justify-between gap-4 p-5 transition-transform hover:-translate-y-0.5">
                  <span>
                    <span className="block type-feature text-ink">{item.label}</span>
                    <span className="mt-1 block text-[14px] text-charcoal">{item.desc}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-graphite transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  )
}
