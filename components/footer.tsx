"use client"

import Link from "next/link"
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
        </div>
      </div>
    </footer>
  )
}
