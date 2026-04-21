"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Accueil", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Réalisations", href: "#realisations" },
  { name: "Équipe", href: "#equipe" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

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
  {/* Logo XXL */}
  <Link
    href="#hero"
    onClick={(e) => handleNavClick(e, "#hero")}
    className="group relative flex items-center transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    aria-label="Mobem Solutions - Retour à l'accueil"
  >
    <img 
      src="/mobem-logo-redimension-removebg-preview.png" 
      alt="Logo Mobem Solutions" 
      className="h-12 w-auto sm:h-14 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
    />
  </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA and Theme Toggle */}
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
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
            >
              <Link href="#contact">Discutons de votre projet</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
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
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="space-y-1 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
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
