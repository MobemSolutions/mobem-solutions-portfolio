"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navigation = [
  { num: "01", name: "Accueil", href: "/" },
  { num: "02", name: "Réalisations", href: "/realisations", external: true },
  { num: "03", name: "Services", href: "/#services", external: true },
  { num: "05", name: "Blog", href: "/blog", external: true },  
  { num: "06", name: "À propos", href: "/a-propos", external: true },
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
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") return
    const target = sessionStorage.getItem("pendingScroll")
    if (!target) return
    // Don't remove here: Strict Mode runs effects twice, the cleanup would cancel
    // the first interval and the second run needs sessionStorage still intact.
    let attempts = 0
    const poll = setInterval(() => {
      const el = document.querySelector(target)
      if (el) {
        clearInterval(poll)
        sessionStorage.removeItem("pendingScroll")
        el.scrollIntoView({ behavior: "smooth" })
      } else if (++attempts >= 40) {
        clearInterval(poll)
        sessionStorage.removeItem("pendingScroll")
      }
    }, 50)
    return () => clearInterval(poll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const anchor = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null
    if (anchor) {
      e.preventDefault()
      if (pathname === "/") {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" })
      } else {
        sessionStorage.setItem("pendingScroll", anchor)
        router.push("/")
      }
    }
    setIsMobileMenuOpen(false)
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
                onClick={(e) => handleNavClick(e, item.href)}
                onPointerDown={triggerRipple}
                className="relative overflow-hidden inline-flex items-baseline gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="hover"
              >
                {item.name}
              </Link>
            ))}

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
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-baseline gap-3 px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground border-b border-border"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.name}
              </Link>
            ))}

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
