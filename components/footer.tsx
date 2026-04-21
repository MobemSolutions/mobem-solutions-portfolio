"use client"

import Link from "next/link"
import { Linkedin } from "lucide-react"

const navigation = {
  main: [
    { name: "Accueil", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Réalisations", href: "#realisations" },
    { name: "Équipe", href: "#equipe" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Ingénierie & Développement", href: "#services" },
    { name: "Design & Expérience", href: "#services" },
    { name: "Stratégie & Croissance", href: "#services" },
  ],
  legal: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "CGV", href: "/cgv" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
  ],
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mobem-solutions-136816404/", icon: Linkedin },
  ],
}

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer
      className="border-t border-border bg-card"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">

        {/* Mobile: brand + liens compacts */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <Link href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="inline-flex items-center">
            <img src="/mobem-logo-redimension-removebg-preview.png" alt="Logo Mobem Solutions" className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={item.name}>
                <item.icon className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: 3 colonnes de liens */}
        <div className="grid grid-cols-3 gap-4 mb-6 md:hidden">
          <div>
            <h3 className="font-semibold text-foreground text-xs mb-2 uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-1.5" role="list">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-xs mb-2 uppercase tracking-wide">Services</h3>
            <ul className="space-y-1.5" role="list">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-xs mb-2 uppercase tracking-wide">Légal</h3>
            <ul className="space-y-1.5" role="list">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop: layout original 4 colonnes */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-1">
            <Link href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="inline-flex items-center mb-4">
              <img src="/mobem-logo-redimension-removebg-preview.png" alt="Logo Mobem Solutions" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Agence digitale à Nantes. Ingénierie, Design & Stratégie pour les PME et ETI ambitieuses.
            </p>
            <div className="flex items-center gap-3">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label={item.name}>
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-4">Navigation</h3>
            <ul className="space-y-3" role="list">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-4">Services</h3>
            <ul className="space-y-3" role="list">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-4">Informations</h3>
            <ul className="space-y-3" role="list">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">Nantes, Pays de la Loire</p>
              <p className="text-xs text-muted-foreground">France</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 lg:mt-12 pt-5 lg:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mobem Solutions. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground">
              SIRET: 91514447100017
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
