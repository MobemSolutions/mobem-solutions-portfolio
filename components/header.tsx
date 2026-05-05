"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, ChevronDown, MapPin, Briefcase } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { METIER_CATEGORIES, REGIONS } from "@/lib/seo-data"

const navigation = [
  { name: "Accueil", href: "#hero" },
  { name: "Réalisations", href: "/realisations", external: true },
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
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/${href}`
    }
    setIsMobileMenuOpen(false)
  }

  const closeMobile = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/95 border-b border-border lg:bg-transparent lg:border-transparent"
      )}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="flex h-14 items-center justify-between lg:h-16">

          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group relative flex items-center transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Mobem Solutions - Retour à l'accueil"
          >
            <img
              src="/mobem-logo-redimension-removebg-preview.png"
              alt="Logo Mobem Solutions"
              className="h-12 w-auto sm:h-14 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-95 dark:hidden"
            />
            <img
              src="/mobem-logo-redimension-removebg-preview.png"
              alt="Logo Mobem Solutions"
              className="h-12 w-auto sm:h-14 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-95 hidden dark:block"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
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

          {/* Desktop CTA + thème */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="text-muted-foreground hover:text-foreground"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
              <Link href="#contact">Discutons de votre projet</Link>
            </Button>
          </div>

          {/* Mobile — boutons thème + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="text-muted-foreground hover:text-foreground"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu — scrollable */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-[calc(100vh-3.5rem)] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="space-y-1 pb-6 pt-2">

            {/* Liens simples */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.external ? closeMobile : (e) => handleNavClick(e, item.href)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.name}
              </Link>
            ))}

            {/* Accordéon Sites par métier */}
            <button
              onClick={() => setIsMobileMetierOpen((v) => !v)}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Sites par métier
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileMetierOpen && "rotate-180")} />
            </button>

            {isMobileMetierOpen && (
              <div className="mx-3 mb-2 rounded-xl border border-border bg-secondary/40 p-4 space-y-4">
                {METIER_CATEGORIES.map((cat) => (
                  <div key={cat.slug}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{cat.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.metiers.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/metiers/${m.slug}`}
                          onClick={closeMobile}
                          className="text-xs text-accent border border-accent/20 rounded-md px-2 py-1 hover:bg-accent/5 transition-colors"
                          tabIndex={isMobileMenuOpen ? 0 : -1}
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  href="/metiers"
                  onClick={closeMobile}
                  className="block text-sm font-medium text-accent pt-1"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Voir tous les métiers →
                </Link>
              </div>
            )}

            {/* Accordéon Nos villes */}
            <button
              onClick={() => setIsMobileVilleOpen((v) => !v)}
              className="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Nos villes
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileVilleOpen && "rotate-180")} />
            </button>

            {isMobileVilleOpen && (
              <div className="mx-3 mb-2 rounded-xl border border-border bg-secondary/40 p-4 space-y-4">
                {REGIONS.map((region) => (
                  <div key={region.label}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{region.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {region.villes.map((v) => (
                        <Link
                          key={v.slug}
                          href={`/villes/${v.slug}`}
                          onClick={closeMobile}
                          className="text-xs text-foreground border border-border rounded-md px-2 py-1 hover:bg-secondary transition-colors"
                          tabIndex={isMobileMenuOpen ? 0 : -1}
                        >
                          {v.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  href="/villes"
                  onClick={closeMobile}
                  className="block text-sm font-medium text-accent pt-1"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Voir toutes les villes →
                </Link>
              </div>
            )}

            {/* CTA */}
            <div className="pt-3 px-3">
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
              >
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  Discutons de votre projet
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
