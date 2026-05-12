import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CopyEmail } from "@/components/ui/copy-email"

export const metadata: Metadata = {
  title: "Mentions Légales | Mobem Solutions",
  description: "Mentions légales du site mobem-solutions.com — Mobem Solutions, Groupement Momentané d'Entreprises.",
  robots: { index: false, follow: false },
}

const sections = [
  { id: "presentation", label: "Présentation du site" },
  { id: "responsables", label: "Responsables de publication" },
  { id: "hebergement", label: "Hébergement" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "donnees", label: "Données personnelles" },
  { id: "droit", label: "Droit applicable" },
]

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 border-b border-border">
            <nav className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-foreground">Mentions légales</span>
            </nav>
            <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
              Informations légales
            </div>
            <h1 className="font-extrabold leading-[0.92] tracking-[-0.04em] text-[clamp(40px,6vw,88px)] mb-4">
              Mentions <em className="font-serif font-normal italic text-accent">légales.</em>
            </h1>
            <p className="text-[16px] leading-[1.55] text-muted-foreground max-w-[640px]">
              Conformément aux articles 6-III et 19 de la Loi n°&nbsp;2004-575 du 21 juin 2004 pour la Confiance
              dans l'économie numérique, dite L.C.E.N.
            </p>
          </div>
        </section>

        {/* ── Content + TOC ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] border-b border-border">

          {/* TOC */}
          <aside className="border-b lg:border-b-0 lg:border-r border-border px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-4">Sommaire</p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    data-cursor="hover"
                    className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted-foreground hover:text-accent transition-colors py-1.5 pl-3 border-l border-border hover:border-accent">
                    {s.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                  Voir aussi :{" "}
                  <Link href="/confidentialite" className="text-accent hover:underline">Confidentialité</Link>
                  {" "}—{" "}
                  <Link href="/cgv" className="text-accent hover:underline">CGV</Link>
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-16 space-y-16 max-w-[780px]">

              <section id="presentation" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">1. Présentation du site</h2>
                <div className="prose-legal">
                  <p>
                    Le site <strong>mobem-solutions.com</strong> est édité par le Groupement Momentané d'Entreprises
                    (GME) <strong>Mobem Solutions</strong>.
                  </p>
                  <p className="mt-4">Le groupement est composé des membres suivants :</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {[
                      { name: "Nathan Portier",  role: "Mandataire — Responsable Croissance & Communication", siret: "91514447100017", address: "50 rue des 2 ponts, 49300 Cholet" },
                      { name: "Arnaud Clavier",  role: "Co-Mandataire — Responsable Développement Technique", siret: "99285845600013", address: "10 rue Mondésir, 44210 Pornic" },
                      { name: "Antoine Clavier", role: "Responsable Design", siret: "94931641800019", address: "10 rue Mondésir, 44210 Pornic" },
                    ].map((m) => (
                      <div key={m.name} className="border border-border bg-card p-4">
                        <p className="font-semibold text-foreground text-sm">{m.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                        <p className="text-xs text-muted-foreground mt-2">SIRET : <span className="font-mono">{m.siret}</span></p>
                        <p className="text-xs text-muted-foreground">{m.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="responsables" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">2. Responsables de la publication</h2>
                <div className="prose-legal">
                  <p>
                    Les responsables de la publication sont <strong>Nathan Portier</strong> et{" "}
                    <strong>Arnaud Clavier</strong>, en leur qualité de Co-Mandataires du GME Mobem Solutions.
                  </p>
                  <p className="mt-4">
                    Contact :{" "}
                    <CopyEmail email="contact@mobem-solutions.com" />
                  </p>
                </div>
              </section>

              <section id="hebergement" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">3. Hébergement</h2>
                <div className="prose-legal">
                  <p>Le site est hébergé par :</p>
                  <div className="mt-4 border border-border bg-card p-5 inline-block">
                    <p className="font-semibold text-foreground">Vercel Inc.</p>
                    <p className="text-sm text-muted-foreground mt-1">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                    <p className="text-sm text-muted-foreground">vercel.com</p>
                  </div>
                </div>
              </section>

              <section id="propriete" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">4. Propriété intellectuelle</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    L'ensemble des contenus présents sur ce site (textes, graphismes, logos, icônes, sons, logiciels)
                    sont la propriété exclusive du GME Mobem Solutions ou de ses membres, sauf mention contraire.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des
                    éléments du site est strictement interdite sans autorisation écrite préalable des responsables de
                    publication.
                  </p>
                  <p>
                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera
                    considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des
                    articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                  </p>
                </div>
              </section>

              <section id="donnees" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">5. Données personnelles (RGPD)</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Le GME Mobem Solutions s'engage à ce que la collecte et le traitement de vos données soient
                    conformes au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi
                    Informatique et Libertés.
                  </p>
                  <ul className="space-y-2 list-none">
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span>
                        <strong>Finalité :</strong> Les données collectées via les formulaires de contact servent
                        exclusivement à la gestion de la relation commerciale.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span>
                        <strong>Conservation :</strong> 3 ans après le dernier contact commercial.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span>
                        <strong>Droits des utilisateurs :</strong> Vous disposez d'un droit d'accès, de rectification
                        et de suppression de vos données en écrivant à{" "}
                        <CopyEmail email="contact@mobem-solutions.com" />
                        .
                      </span>
                    </li>
                  </ul>
                  <p>
                    Pour plus de détails, consultez notre{" "}
                    <Link href="/confidentialite" className="text-accent hover:underline">
                      Politique de confidentialité
                    </Link>
                    .
                  </p>
                </div>
              </section>

              <section id="droit" className="scroll-mt-28">
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6">6. Droit applicable</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Tout litige en relation avec l'utilisation du site est soumis au droit français. Il est fait
                    attribution exclusive de juridiction aux tribunaux compétents d'Angers.
                  </p>
                </div>
              </section>

              <div className="pt-8 border-t border-border">
                <p className="font-mono text-[11px] text-muted-foreground">Dernière mise à jour : mai 2026</p>
              </div>
            </div>
          </div>
      </main>
      <Footer />
    </>
  )
}
