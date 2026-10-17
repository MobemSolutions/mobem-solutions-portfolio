"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TRADES } from "@/lib/automation-content"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { MobemLogo } from "@/components/ui/mobem-logo"
import { ContactButton } from "@/components/contact-form"

const navigation = [
  { name: "Méthode", href: "/methode" },
  { name: "Métiers", href: "/metiers", children: TRADES.map((t) => ({ name: t.navLabel, href: t.href })) },
  { name: "Exemples", href: "/#exemples" },
  { name: "Tarifs", href: "/#tarifs" },
  { name: "À propos", href: "/a-propos" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTradesOpen, setIsTradesOpen] = useState(false)
  const tradesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isTradesOpen) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !tradesRef.current?.contains(e.target as Node)) {
        setIsTradesOpen(false)
      }
    }
    document.addEventListener("mousedown", close)
    document.addEventListener("keydown", close)
    return () => {
      document.removeEventListener("mousedown", close)
      document.removeEventListener("keydown", close)
    }
  }, [isTradesOpen])

  useEffect(() => {
    setIsTradesOpen(false)
    setIsMobileMenuOpen(false)
  }, [pathname])

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
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-200",
        isScrolled || isMobileMenuOpen
          ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(22,22,24,0.08)]"
          : "bg-white/0"
      )}
      role="banner"
    >
      <nav className="mx-auto max-w-[1200px] px-4 sm:px-6" aria-label="Navigation principale">
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center text-ink"
            aria-label="Mobem Solutions - Retour à l'accueil"
          >
            <MobemLogo />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-7">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} ref={tradesRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTradesOpen((o) => !o)}
                    aria-expanded={isTradesOpen}
                    aria-controls="trades-menu"
                    className={cn(
                      "link-underline inline-flex items-center gap-1.5 py-1.5 type-nav transition-colors hover:text-graphite",
                      isTradesOpen || pathname.startsWith("/metiers") ? "text-graphite" : "text-charcoal"
                    )}
                  >
                    {item.name}
                    <ArrowDown className={cn("h-3.5 w-3.5 transition-transform", isTradesOpen && "rotate-180")} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                  {isTradesOpen && (
                    <div
                      id="trades-menu"
                      className="absolute left-0 top-[calc(100%+14px)] w-[300px] origin-top-left rounded-[20px] bg-white p-2 shadow-card animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex items-center justify-between rounded-[14px] px-3 py-2.5 type-nav text-graphite transition-colors hover:bg-black/[0.04] hover:text-blue"
                        >
                          {child.name}
                          <ArrowRight className="h-4 w-4 text-charcoal transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue" aria-hidden="true" />
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        className="mt-1 flex rounded-[14px] px-3 py-2.5 type-meta text-charcoal hover:bg-black/[0.04]"
                      >
                        Tous les métiers
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "link-underline py-1.5 type-nav transition-colors hover:text-graphite",
                    pathname === item.href ? "text-graphite" : "text-charcoal"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <ContactButton className="link-underline type-nav text-graphite">Nous écrire</ContactButton>
            <DiagnosticButton className="!py-1.5 !pl-4 !pr-1.5 gap-3">
              Diagnostic gratuit
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-studio" aria-hidden="true">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </DiagnosticButton>
          </div>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="icon-control lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden transition-[max-height,opacity] duration-200",
            isMobileMenuOpen ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"
          )}
          hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col gap-1 pb-6 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block rounded-[14px] px-3 py-3 text-[17px] font-[550] text-graphite hover:bg-black/[0.04]"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-[12px] px-3 py-2 type-nav text-charcoal hover:bg-black/[0.04]"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <DiagnosticButton className="mt-3 w-full">Diagnostic gratuit</DiagnosticButton>
            <ContactButton className="btn-outline w-full">Nous écrire</ContactButton>
          </div>
        </div>
      </nav>
    </header>
  )
}
