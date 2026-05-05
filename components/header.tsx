"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { METIER_CATEGORIES, REGIONS } from "@/lib/seo-data"

const navigation = [
  { name: "Accueil", href: "#hero" },
  { name: "Methode", href: "/methode", external: true },
  { name: "Realisations", href: "/realisations", external: true },
  { name: "Blog", href: "/blog", external: true },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMetierDropdownOpen, setIsMetierDropdownOpen] = useState(false)
  const [isVilleDropdownOpen, setIsVilleDropdownOpen] = useState(false)
  const [isMobileMetierOpen, setIsMobileMetierOpen] = useState(false)
  const [isMobileVilleOpen, setIsMobileVilleOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const metierRef = useRef<HTMLDivElement>(null)
  const villeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (metierRef.current && !metierRef.current.contains(e.target as Node)) {
        setIsMetierDropdownOpen(false)
      }
      if (villeRef.current && !villeRef.current.contains(e.target as Node)) {
        setIsVilleDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-background border-b border-border"
          : "bg-background/95 border-b border-transparent"
      )}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="flex h-14 items-center justify-between lg:h-16">
          {/* Logo - Swiss typographic style */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-2 transition-opacity hover:opacity-70"
            aria-label="Mobem Solutions - Retour a l'accueil"
          >
            <span className="text-lg font-black tracking-tight text-foreground uppercase">
              Mobem
            </span>
            <span className="hidden sm:inline text-lg font-light tracking-tight text-muted-foreground">
              Solutions
            </span>
          </Link>

          {/* Desktop Navigation - Minimal Swiss style */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}

            {/* Dropdown Sites par métier */}
            <div className="relative" ref={metierRef}>
              <button
                onClick={() => { setIsMetierDropdownOpen((v) => !v); setIsVilleDropdownOpen(false) }}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-expanded={isMetierDropdownOpen}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Sites par métier
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isMetierDropdownOpen && "rotate-180")} />
              </button>

              {isMetierDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] rounded-2xl border border-border bg-card shadow-xl z-50 flex flex-col max-h-[min(560px,calc(100vh-5rem))]">
                  <div className="overflow-y-auto p-5 flex-1">
                    <div className="grid grid-cols-3 gap-6">
                      {METIER_CATEGORIES.map((cat) => (
                        <div key={cat.slug}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{cat.label}</p>
                          <ul className="space-y-1.5">
                            {cat.metiers.slice(0, 5).map((m) => (
                              <li key={m.slug}>
                                <Link
                                  href={`/metiers/${m.slug}`}
                                  onClick={() => setIsMetierDropdownOpen(false)}
                                  className="text-sm text-foreground hover:text-accent transition-colors"
                                >
                                  {m.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 px-5 py-3 border-t border-border flex justify-between items-center bg-card rounded-b-2xl">
                    <span className="text-xs text-muted-foreground">
                      {METIER_CATEGORIES.reduce((acc, c) => acc + c.metiers.length, 0)} métiers disponibles
                    </span>
                    <Link
                      href="/metiers"
                      onClick={() => setIsMetierDropdownOpen(false)}
                      className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      Voir tous les métiers →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Nos villes */}
            <div className="relative" ref={villeRef}>
              <button
                onClick={() => { setIsVilleDropdownOpen((v) => !v); setIsMetierDropdownOpen(false) }}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-expanded={isVilleDropdownOpen}
              >
                <MapPin className="w-3.5 h-3.5" />
                Nos villes
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isVilleDropdownOpen && "rotate-180")} />
              </button>

              {isVilleDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-[480px] rounded-2xl border border-border bg-card shadow-xl z-50 flex flex-col max-h-[min(520px,calc(100vh-5rem))]">
                  <div className="overflow-y-auto p-5 flex-1 scrollbar-thin">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {REGIONS.map((region) => (
                        <div key={region.label}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{region.label}</p>
                          <ul className="space-y-1">
                            {region.villes.map((v) => (
                              <li key={v.slug}>
                                <Link
                                  href={`/villes/${v.slug}`}
                                  onClick={() => setIsVilleDropdownOpen(false)}
                                  className="text-sm text-foreground hover:text-accent transition-colors"
                                >
                                  {v.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 px-5 py-3 border-t border-border flex justify-end bg-card rounded-b-2xl">
                    <Link
                      href="/villes"
                      onClick={() => setIsVilleDropdownOpen(false)}
                      className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      Voir toutes les villes →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <Link
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile — boutons thème + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="w-9 h-9 flex items-center justify-center text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Swiss grid style */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-200",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="border-t border-border py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.external ? () => setIsMobileMenuOpen(false) : (e) => handleNavClick(e, item.href)}
                  className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-border">
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2.5 text-sm font-semibold w-full justify-center hover:bg-foreground/90 transition-colors"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Contact
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
