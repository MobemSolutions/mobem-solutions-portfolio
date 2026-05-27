"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const navCabinet = [
  { name: "Accueil", href: "/" },
  { name: "Méthodes", href: "/methode" },
  { name: "Réalisations", href: "/realisations" },
  { name: "À propos", href: "/a-propos" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
]

const navSeo = [
  { name: "Sites par métier", href: "/metiers" },
  { name: "Sites par ville", href: "/villes" },
  { name: "Plan du site", href: "/plan-du-site" },
]

const navLegal = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Confidentialité", href: "/confidentialite" },
]

const LINK = "inline-block text-[13px] text-inverted-foreground/65 hover:text-accent hover:translate-x-1 transition-[color,transform] duration-150"
const HEAD = "text-[11px] font-semibold text-inverted-foreground/55 mb-2"

export function Footer() {
  return (
    <footer className="bg-inverted text-inverted-foreground" role="contentinfo" aria-label="Pied de page">

      {/* Top section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">

          {/* Manifeste — grand titre */}
          <div className="lg:col-span-6 lg:pr-12">
            <h2 className="font-extrabold text-[clamp(40px,6vw,88px)] leading-[0.90] tracking-[-0.04em]">
              Diagnostiquer<br />
              <em className="font-serif font-normal italic tracking-[-0.02em] text-accent not-italic" style={{ fontStyle: "italic" }}>avant</em><br />
              de prescrire.
            </h2>
            <p className="mt-6 text-[14px] text-inverted-foreground/55 leading-relaxed max-w-sm">
              Agence digitale nantaise. Ingénierie, design et stratégie pour PME et ETI ambitieuses.
            </p>
          </div>

          {/* Nav columns — 2-col sur mobile, transparent sur desktop */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:contents">

            {/* Cabinet */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <span className={HEAD}>Cabinet</span>
              {navCabinet.map((item) => (
                <Link key={item.name} href={item.href} className={LINK}>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Référencement + Légal */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <span className={HEAD}>Référencement</span>
              {navSeo.map((item) => (
                <Link key={item.name} href={item.href} className={LINK}>
                  {item.name}
                </Link>
              ))}
              <span className={`${HEAD} mt-5`}>Légal</span>
              {navLegal.map((item) => (
                <Link key={item.name} href={item.href} className={LINK}>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Liens */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <span className={HEAD}>Liens</span>
              <a
                href="https://www.linkedin.com/in/mobem-solutions-136816404/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                LinkedIn <ArrowUpRight className="inline w-3 h-3 mb-0.5" aria-hidden="true" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-inverted-foreground/10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] uppercase tracking-[0.06em] text-inverted-foreground/45 font-medium">
          <span>© Mobem Solutions · {new Date().getFullYear()} · Tous droits réservés</span>
          {/* <span className="whitespace-nowrap">SIRET&nbsp;: 91514447100017</span> */}
          <span>Nantes · Pays de la Loire · France</span>
        </div>
      </div>

    </footer>
  )
}
