"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, ChevronDown, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { METIER_CATEGORIES, REGIONS } from "@/lib/seo-data"

const navigation = [
  { num: "01", name: "Accueil", href: "/" },
  { num: "02", name: "Réalisations", href: "/realisations", external: true },
  { num: "03", name: "Blog", href: "/blog", external: true },
]

function triggerRipple(e: React.PointerEvent<HTMLElement>) {
  const btn = e.currentTarget
  const ripple = document.createElement("span")
  const size = Math.max(btn.offsetWidth, btn.offsetHeight)
  const rect = btn.getBoundingClientRect()
  ripple.className = "nav-ripple"
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  btn.appendChild(ripple)
  ripple.addEventListener("animationend", () => ripple.remove())
}

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
  const pathname = usePathname()

  const closeMobile = () => setIsMobileMenuOpen(false)

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
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
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
            href={pathname === "/" ? "#hero" : "/"}
            onClick={pathname === "/" ? (e) => handleNavClick(e, "#hero") : undefined}
            className="group flex items-center gap-3 transition-opacity hover:opacity-70"
            aria-label="Mobem Solutions - Retour à l'accueil"
          >
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-[-0.02em] text-foreground uppercase">Mobem</span>
              <span className="text-[12px] font-light tracking-[0.06em] text-muted-foreground">Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                onPointerDown={triggerRipple}
                className="relative overflow-hidden inline-flex items-baseline gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="hover"
              >
                {item.name}
              </Link>
            ))}

            {/* Dropdown Sites par métier */}
            <div className="relative" ref={metierRef}>
              <button
                onClick={() => { setIsMetierDropdownOpen((v) => !v); setIsVilleDropdownOpen(false) }}
                onPointerDown={triggerRipple}
                className="relative overflow-hidden inline-flex items-baseline gap-2 text-sm font-medium text-muted-foreground transition-[color,transform,opacity] hover:text-foreground active:scale-[0.95] active:opacity-70"
                aria-expanded={isMetierDropdownOpen}
                data-cursor="hover"
              >
                Sites par métier
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 self-center", isMetierDropdownOpen && "rotate-180")} />
              </button>

              {isMetierDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] border border-border bg-card shadow-xl z-50 flex flex-col max-h-[min(560px,calc(100vh-5rem))]">
                  <div className="overflow-y-auto p-5 flex-1">
                    <div className="grid grid-cols-3 gap-6">
                      {METIER_CATEGORIES.map((cat) => (
                        <div key={cat.slug}>
                          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-2">{cat.label}</p>
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
                  <div className="shrink-0 px-5 py-3 border-t border-border flex justify-between items-center bg-card">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                      {METIER_CATEGORIES.reduce((acc, c) => acc + c.metiers.length, 0)} métiers disponibles
                    </span>
                    <Link
                      href="/metiers"
                      onClick={() => setIsMetierDropdownOpen(false)}
                      className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent hover:text-accent/80 transition-colors"
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
                onPointerDown={triggerRipple}
                className="relative overflow-hidden inline-flex items-baseline gap-2 text-sm font-medium text-muted-foreground transition-[color,transform,opacity] hover:text-foreground active:scale-[0.95] active:opacity-70"
                aria-expanded={isVilleDropdownOpen}
                data-cursor="hover"
              >
                Nos villes
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 self-center", isVilleDropdownOpen && "rotate-180")} />
              </button>

              {isVilleDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-[480px] border border-border bg-card shadow-xl z-50 flex flex-col max-h-[min(520px,calc(100vh-5rem))]">
                  <div className="overflow-y-auto p-5 flex-1 scrollbar-thin">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {REGIONS.map((region) => (
                        <div key={region.label}>
                          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-2">{region.label}</p>
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
                  <div className="shrink-0 px-5 py-3 border-t border-border flex justify-end bg-card">
                    <Link
                      href="/villes"
                      onClick={() => setIsVilleDropdownOpen(false)}
                      className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent hover:text-accent/80 transition-colors"
                    >
                      Voir toutes les villes →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA + thème */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
              onPointerDown={triggerRipple}
              className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground text-sm font-medium transition-colors cta-hover"
              data-cursor="hover"
            >
              Diagnostic gratuit
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile — thème + burger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={mounted && resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-9 h-9 border border-border flex items-center justify-center text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden transition-[max-height,opacity] duration-200",
            isMobileMenuOpen ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="pb-6 pt-2 border-t border-border">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.external ? closeMobile : (e) => handleNavClick(e, item.href)}
                className="flex items-baseline gap-3 px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground border-b border-border"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.name}
              </Link>
            ))}

            {/* Accordéon Sites par métier */}
            <button
              onClick={() => setIsMobileMetierOpen((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground border-b border-border"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <span>Sites par métier</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileMetierOpen && "rotate-180")} />
            </button>

            {isMobileMetierOpen && (
              <div className="border-b border-border bg-secondary/30">
                <div className="p-4 space-y-4">
                  {METIER_CATEGORIES.map((cat) => (
                    <div key={cat.slug}>
                      <p className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-2">{cat.label}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.metiers.map((m) => (
                          <Link
                            key={m.slug}
                            href={`/metiers/${m.slug}`}
                            onClick={closeMobile}
                            className="text-[11px] text-accent border border-accent/20 px-2.5 py-1 hover:bg-accent/5 transition-colors"
                            tabIndex={isMobileMenuOpen ? 0 : -1}
                          >
                            {m.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <Link
                    href="/metiers"
                    onClick={closeMobile}
                    className="text-[11px] text-accent"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    Voir tous les métiers →
                  </Link>
                </div>
              </div>
            )}

            {/* Accordéon Nos villes */}
            <button
              onClick={() => setIsMobileVilleOpen((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground border-b border-border"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <span>Nos villes</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileVilleOpen && "rotate-180")} />
            </button>

            {isMobileVilleOpen && (
              <div className="border-b border-border bg-secondary/30">
                <div className="p-4 space-y-4">
                  {REGIONS.map((region) => (
                    <div key={region.label}>
                      <p className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-2">{region.label}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.villes.map((v) => (
                          <Link
                            key={v.slug}
                            href={`/villes/${v.slug}`}
                            onClick={closeMobile}
                            className="text-[11px] text-foreground border border-border px-2.5 py-1 hover:bg-secondary transition-colors"
                            tabIndex={isMobileMenuOpen ? 0 : -1}
                          >
                            {v.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <Link
                    href="/villes"
                    onClick={closeMobile}
                    className="text-[11px] text-accent"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    Voir toutes les villes →
                  </Link>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4 px-4">
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                onPointerDown={triggerRipple as unknown as React.PointerEventHandler<HTMLAnchorElement>}
                className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-accent-foreground text-sm font-medium transition-colors cta-hover"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Diagnostic gratuit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
