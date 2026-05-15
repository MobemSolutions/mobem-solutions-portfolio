import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border min-h-[85vh] grid grid-cols-1 lg:grid-cols-[1fr_auto]">

          {/* Left — main content */}
          <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 border-r border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-8">
                Erreur de navigation
              </div>
              <h1 className="font-extrabold leading-[0.88] tracking-[-0.05em] text-[clamp(120px,18vw,220px)] text-foreground/10 select-none mb-0">
                404
              </h1>
              <div className="-mt-4 lg:-mt-8">
                <h2 className="font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(40px,5.5vw,80px)] mb-6">
                  Page <em className="font-serif font-normal italic text-accent">introuvable.</em>
                </h2>
                <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] mb-10">
                  Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou explorez nos contenus.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors"
                  >
                    Retour à l'accueil
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/blog"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 px-6 py-4 border border-border font-medium text-[14px] hover:bg-secondary transition-colors"
                  >
                    Voir le blog
                  </Link>
                  <Link
                    href="/realisations"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 px-6 py-4 border border-border font-medium text-[14px] hover:bg-secondary transition-colors"
                  >
                    Réalisations
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom status */}
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground border-t border-border pt-6">
              mobem-solutions.com · Code 404
            </div>
          </div>

          {/* Right — diagnostic links */}
          <div className="hidden lg:flex flex-col w-[340px] border-b border-border">
            <div className="px-8 py-6 border-b border-border">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Navigation rapide</p>
            </div>
            {[
              { label: "Accueil", href: "/", desc: "Page principale" },
              { label: "Réalisations", href: "/realisations", desc: "Projets livrés" },
              { label: "Services", href: "/#prestations", desc: "Nos offres" },
              { label: "Blog", href: "/blog", desc: "Articles & analyses" },
              { label: "Contact", href: "/#contact", desc: "Diagnostic gratuit" },
              { label: "Plan du site", href: "/plan-du-site", desc: "Toutes les pages" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                className="group flex items-center justify-between px-8 py-5 border-b border-border hover:bg-[rgba(230,48,48,0.04)] transition-colors"
              >
                <div>
                  <div className="text-[15px] font-medium">{item.label}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:text-accent transition-colors" aria-hidden="true">
                  <path d="M7 17 L17 7" /><path d="M9 7 H17 V15" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
