"use client"

import Link from "next/link"
<<<<<<< HEAD
import { LinkedinIcon, ArrowUpRight } from "lucide-react"

const navigation = {
  main: [
    { name: "Accueil", href: "/" },
    { name: "Methode", href: "/methode" },
    { name: "Realisations", href: "/realisations" },
    { name: "A propos", href: "/a-propos" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Mentions legales", href: "/mentions-legales" },
    { name: "CGV", href: "/cgv" },
    { name: "Confidentialite", href: "/confidentialite" },
  ],
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mobem-solutions-136816404/", icon: LinkedinIcon },
  ],
}

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-background"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-black tracking-tight text-foreground uppercase">
                  Mobem
                </span>
                <span className="text-xl font-light tracking-tight text-muted-foreground ml-2">
                  Solutions
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
                Conseil en digitalisation pour PME et ETI ambitieuses. 
                Strategie, design et ingenierie — un seul interlocuteur.
              </p>
              <div className="flex items-center gap-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    aria-label={item.name}
                  >
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2" role="list">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2" role="list">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Nantes, France</p>
                <a 
                  href="mailto:contact@mobem-solutions.com" 
                  className="block hover:text-foreground transition-colors"
                >
                  contact@mobem-solutions.com
                </a>
                <a 
                  href="tel:+33784275383" 
                  className="block hover:text-foreground transition-colors"
                >
                  07 84 27 53 83
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Swiss grid visible */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mobem Solutions. Tous droits reserves.
            </p>
            <p className="text-xs text-muted-foreground">
              SIRET: 91514447100017
            </p>
          </div>
=======

const navCabinet = [
  { name: "Accueil", href: "/" },
  { name: "Réalisations", href: "/realisations" },
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

export function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo" aria-label="Pied de page">

      {/* Top section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">

          {/* Manifesto — big type */}
          <div className="lg:col-span-7 lg:pr-10">
            <h2 className="font-bold text-[clamp(44px,6.5vw,96px)] leading-[0.90] tracking-[-0.04em]">
              Diagnostiquer<br />
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">avant</span><br />
              de prescrire.
            </h2>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-background/60 mb-1">
              Cabinet
            </span>
            {navCabinet.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13px] text-background/70 hover:text-accent hover:pl-1 transition-all duration-150"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-background/60 mb-1">
              Référencement
            </span>
            {navSeo.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13px] text-background/70 hover:text-accent hover:pl-1 transition-all duration-150"
              >
                {item.name}
              </Link>
            ))}
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-background/60 mt-4 mb-1">
              Légal
            </span>
            {navLegal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13px] text-background/70 hover:text-accent hover:pl-1 transition-all duration-150"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-1 flex flex-col gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-background/60 mb-1">
              Liens
            </span>
            <a
              href="https://www.linkedin.com/in/mobem-solutions-136816404/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-background/70 hover:text-accent hover:pl-1 transition-all duration-150"
            >
              LinkedIn ↗
            </a>
          </div>

>>>>>>> 38f194d (maj)
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-background/60">
          <span>© Mobem Solutions · {new Date().getFullYear()} · Tous droits réservés</span>
          <span className="whitespace-nowrap">SIRET&nbsp;: 91514447100017</span>
          <span>Nantes · Pays de la Loire · France</span>
        </div>
      </div>

    </footer>
  )
}
