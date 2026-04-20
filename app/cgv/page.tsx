import type { Metadata } from "next"
import Link from "next/link"
import { LegalHeader } from "@/components/legal-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Mobem Solutions",
  description: "CGV de Mobem Solutions — Groupement Momentané d'Entreprises spécialisé dans la création de sites web, l'audit technique et la maintenance digitale.",
  robots: { index: false, follow: false },
}

const sections = [
  { id: "structure", label: "Structure juridique & représentation" },
  { id: "prestations", label: "Prestations proposées" },
  { id: "formation", label: "Formation du contrat" },
  { id: "financier", label: "Conditions financières" },
  { id: "suspension", label: "Clause de suspension" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "responsabilite-contenu", label: "Responsabilité sur les contenus" },
  { id: "portfolio", label: "Clause portfolio" },
  { id: "hebergement", label: "Hébergement" },
  { id: "maintenance", label: "Pack Sérénité (Maintenance)" },
  { id: "obligations", label: "Obligations du client" },
  { id: "limitation", label: "Limitation de responsabilité" },
  { id: "confidentialite", label: "Confidentialité" },
  { id: "resiliation", label: "Résiliation" },
  { id: "droit", label: "Droit applicable" },
]

export default function CGVPage() {
  return (
    <>
      <LegalHeader />
      <main className="pt-20 lg:pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="py-12 lg:py-16 border-b border-border">
            <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">Informations légales</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Conditions Générales de Vente
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Les présentes CGV régissent l'ensemble des relations contractuelles entre Mobem Solutions et tout
              client ayant passé commande de ses prestations.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">En vigueur au 1er janvier 2025</p>
          </div>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Sidebar TOC */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  Sommaire
                </p>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
                  {sections.map((s, i) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex gap-2 text-sm text-muted-foreground hover:text-foreground py-1.5 border-l-2 border-transparent hover:border-accent pl-3 transition-colors"
                    >
                      <span className="text-accent/60 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.label}</span>
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Voir aussi :{" "}
                    <Link href="/mentions-legales" className="underline hover:text-foreground">
                      Mentions légales
                    </Link>{" "}
                    —{" "}
                    <Link href="/confidentialite" className="underline hover:text-foreground">
                      Confidentialité
                    </Link>
                  </p>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-14">

              {/* Préambule */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground mb-3">Préambule</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Toute commande passée auprès de Mobem Solutions implique l'acceptation pleine et entière des
                  présentes CGV, qui prévalent sur tout autre document du Client, sauf convention particulière
                  expressément acceptée par le Mandataire.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { name: "Nathan Portier", role: "Mandataire administratif & commercial, Responsable Croissance & Communication" },
                    { name: "Arnaud Clavier", role: "Co-Mandataire technique, Responsable Développement" },
                    { name: "Antoine Clavier", role: "Responsable Design" },
                  ].map((m) => (
                    <div key={m.name} className="rounded-lg border border-border bg-background p-3">
                      <p className="text-sm font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <section id="structure" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Article 1 — Structure juridique du GME et représentation
                </h2>
                <div className="prose-legal space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">1.1 Nature juridique</h3>
                    <p>
                      Mobem Solutions est un Groupement Momentané d'Entreprises (GME) constitué pour la durée de
                      chaque projet. Pour la phase de réalisation, le GME est solidaire : chaque membre répond de
                      l'exécution de l'ensemble des obligations du groupement vis-à-vis du Client.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">1.2 Mandataire unique</h3>
                    <p>
                      Le GME désigne <strong>Nathan Portier</strong> comme Mandataire administratif et{" "}
                      <strong>Arnaud Clavier</strong> comme Co-Mandataire technique. Nathan Portier centralise
                      l'émission des factures et l'encaissement des règlements. Arnaud Clavier dispose du pouvoir
                      de représentation pour toutes les décisions relatives à la conception technique.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">1.3 Cessation de la solidarité</h3>
                    <p>
                      La solidarité entre les membres du GME cesse automatiquement dès le paiement intégral de la
                      facture finale liée au projet concerné. Passé ce terme, chaque membre retrouve sa pleine
                      indépendance juridique.
                    </p>
                  </div>
                </div>
              </section>

              <section id="prestations" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 2 — Prestations proposées
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Création de sites web",
                      desc: "Conception, intégration, développement et mise en ligne (vitrine, e-commerce, sur-mesure).",
                    },
                    {
                      title: "Audit technique",
                      desc: "Analyse de performance, sécurité, référencement naturel (SEO) et recommandations stratégiques.",
                    },
                    {
                      title: "Pack Sérénité",
                      desc: "Maintenance récurrente, sécurité et mises à jour (voir Article 10).",
                    },
                  ].map((p) => (
                    <div key={p.title} className="rounded-xl border border-border bg-card p-5">
                      <p className="font-semibold text-foreground text-sm">{p.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Le détail des livrables, délais et tarifs est précisé dans le devis signé par les deux parties,
                  lequel fait partie intégrante du contrat.
                </p>
              </section>

              <section id="formation" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 3 — Formation du contrat et commande
                </h2>
                <div className="prose-legal space-y-3">
                  <p>
                    Tout contrat est réputé formé à la date de réception par le Mandataire du devis signé par le
                    Client, accompagné du paiement de l'acompte stipulé. <strong>En l'absence de paiement de
                    l'acompte, aucun travail ne sera engagé.</strong>
                  </p>
                  <p>
                    Les devis sont valables <strong>trente (30) jours</strong> à compter de leur date d'émission.
                    Passé ce délai, le Prestataire se réserve le droit de les réviser.
                  </p>
                </div>
              </section>

              <section id="financier" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 4 — Conditions financières
                </h2>
                <div className="prose-legal space-y-6">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">4.1 Tarifs</h3>
                    <p>
                      Les prix sont indiqués en euros hors taxes (HT). La TVA applicable est ajoutée au taux en
                      vigueur au jour de la facturation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-3">4.2 Modalités de paiement</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { pct: "30 %", label: "À la commande", detail: "Acompte" },
                        { pct: "40 %", label: "Recette provisoire", detail: "Validation maquettes / développement" },
                        { pct: "30 %", label: "Livraison finale", detail: "Solde" },
                      ].map((e) => (
                        <div key={e.label} className="rounded-xl border border-border bg-card p-4 text-center">
                          <p className="text-2xl font-bold text-accent">{e.pct}</p>
                          <p className="text-sm font-medium text-foreground mt-1">{e.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{e.detail}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Les paiements sont effectués par virement bancaire sur le compte du Mandataire.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">4.3 Retard de paiement</h3>
                    <p>
                      En cas de retard de paiement, des pénalités sont applicables de plein droit, sans mise en
                      demeure préalable, au taux légal majoré de <strong>cinq (5) points</strong>, calculées à
                      compter du lendemain de la date d'échéance. Une indemnité forfaitaire de recouvrement de{" "}
                      <strong>40 €</strong> est également due.
                    </p>
                  </div>
                </div>
              </section>

              <section id="suspension" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 5 — Clause de suspension pour non-paiement
                </h2>
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 prose-legal">
                  <p className="font-semibold text-foreground text-sm mb-3">
                    Clause de réserve de propriété et de suspension d'accès
                  </p>
                  <p>
                    Mobem Solutions se réserve la propriété intégrale des livrables numériques jusqu'au paiement
                    complet du prix convenu. En cas de non-paiement d'une facture à J+15 après son échéance,
                    Mobem Solutions se réserve le droit de <strong>suspendre immédiatement et sans préavis</strong>{" "}
                    l'accès au site web (mise hors ligne ou désactivation des accès). Le rétablissement interviendra
                    après règlement intégral des sommes dues et des pénalités.
                  </p>
                </div>
              </section>

              <section id="propriete" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 6 — Propriété intellectuelle
                </h2>
                <div className="prose-legal space-y-6">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">6.1 Cession de droits au Client</h3>
                    <p>
                      Après paiement intégral, le Client bénéficie d'une cession des droits de propriété
                      intellectuelle sur les éléments spécifiquement créés pour lui : contenus rédactionnels,
                      créations graphiques originales, design final du site web. Cette cession est accordée pour
                      une exploitation mondiale, tous supports, sans limitation de durée.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">6.2 Réserves du Prestataire</h3>
                    <p>
                      Mobem Solutions conserve la pleine propriété de ses méthodes, outils, scripts, gabarits,
                      frameworks et bibliothèques de code réutilisables. Le Client bénéficie d'un droit d'usage
                      perpétuel, non exclusif et non cessible, strictement limité à l'exploitation du site livré.
                    </p>
                  </div>
                </div>
              </section>

              <section id="responsabilite-contenu" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 7 — Responsabilité sur les contenus du Client
                </h2>
                <div className="prose-legal space-y-3">
                  <p>
                    Le Client est seul responsable de la légalité, de l'exactitude et de la conformité des contenus
                    qu'il fournit (textes, images, vidéos, logos, sons…). Il garantit notamment disposer de tous les
                    droits nécessaires et que ces contenus respectent le RGPD, le droit de la presse, le droit à
                    l'image et les règles de concurrence.
                  </p>
                  <p>
                    Le Client garantit Mobem Solutions contre toute réclamation de tiers liée à ces contenus.
                  </p>
                </div>
              </section>

              <section id="portfolio" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 8 — Clause portfolio
                </h2>
                <div className="prose-legal">
                  <p>
                    Le Client autorise expressément et irrévocablement Mobem Solutions à citer sa raison sociale,
                    reproduire son logotype et présenter des captures écran du projet réalisé à titre de référence
                    commerciale (site internet, réseaux sociaux, présentations…), sans limitation de durée ni de
                    territoire.
                  </p>
                  <p className="mt-3">
                    Cette autorisation est accordée à titre gratuit. Elle ne pourra être révoquée qu'en cas
                    d'inexactitude manifeste ou de litige judiciaire en cours, sur demande écrite au Mandataire.
                  </p>
                </div>
              </section>

              <section id="hebergement" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 9 — Hébergement
                </h2>
                <div className="prose-legal space-y-3">
                  <p>
                    Le contrat d'hébergement est souscrit au nom et pour le compte du Client auprès d'un prestataire
                    tiers. Le Client en est le titulaire et en assume la responsabilité financière.
                  </p>
                  <p>
                    Mobem Solutions ne saurait être tenu responsable des interruptions de service, pertes de données
                    ou pannes imputables à l'hébergeur tiers.
                  </p>
                </div>
              </section>

              <section id="maintenance" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 10 — Le Pack Sérénité (Maintenance)
                </h2>
                <div className="prose-legal space-y-6">
                  <p>
                    Le Pack Sérénité est une prestation de maintenance récurrente, distincte de la mission de
                    création initiale, soumise à un contrat spécifique et à une facturation périodique.
                  </p>
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Contenu de la prestation</h3>
                    <ul className="space-y-2">
                      {[
                        "Surveillance et application des mises à jour de sécurité (CMS, plugins, thèmes)",
                        "Sauvegardes régulières du site et de ses données",
                        "Mises à jour fonctionnelles dans la limite des heures prévues au contrat",
                        "Surveillance de la disponibilité du site (monitoring)",
                        "Rapport mensuel de performance et de sécurité",
                      ].map((item) => (
                        <li key={item} className="flex gap-2 text-sm">
                          <span className="text-accent mt-0.5 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-sm font-medium text-foreground">Garantie d'intervention</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Intervention sous <strong>48 heures ouvrables</strong> pour tout bug bloquant. Les
                      dysfonctionnements non bloquants sont traités selon leur priorité.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Exclusions</h3>
                    <p>
                      Sont exclus : les nouvelles fonctionnalités, les refontes de design, les interventions rendues
                      nécessaires par des modifications effectuées par un tiers, et les défaillances imputables à
                      l'hébergeur.
                    </p>
                  </div>
                </div>
              </section>

              <section id="obligations" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 11 — Obligations du Client et impact sur les délais
                </h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Le Client s'engage à fournir en temps et en heure l'ensemble des éléments nécessaires : logos,
                    chartes graphiques, textes, photographies, accès aux plateformes (hébergement, domaine, réseaux
                    sociaux).
                  </p>
                  <p>
                    Tout retard dans la fourniture des éléments décale automatiquement la date de livraison finale
                    du nombre de jours ouvrables de retard constaté, sans pénalité pour le GME.
                  </p>
                  <p>
                    Le Client dispose d'un délai de <strong>sept (7) jours ouvrables</strong> à compter de la
                    présentation de chaque livrable intermédiaire pour formuler ses observations écrites. Passé ce
                    délai sans réponse, le livrable est réputé validé et accepté sans réserve.
                  </p>
                </div>
              </section>

              <section id="limitation" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 12 — Limitation de responsabilité du Prestataire
                </h2>
                <div className="prose-legal space-y-3">
                  <p>
                    La responsabilité de Mobem Solutions est limitée aux dommages directs et prévisibles, dans la
                    limite du montant des sommes effectivement perçues au titre du contrat concerné.
                  </p>
                  <p>
                    Mobem Solutions ne saurait être tenu responsable de tout dommage indirect (perte d'exploitation,
                    perte de chiffre d'affaires, atteinte à l'image…) quand bien même le Prestataire aurait été
                    averti de la possibilité de tels dommages.
                  </p>
                </div>
              </section>

              <section id="confidentialite" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 13 — Confidentialité
                </h2>
                <div className="prose-legal">
                  <p>
                    Les parties s'engagent mutuellement à préserver la confidentialité des informations échangées
                    dans le cadre du projet et à ne pas les divulguer à des tiers sans accord écrit préalable,
                    pendant toute la durée du contrat et <strong>deux (2) ans après son terme</strong>.
                  </p>
                </div>
              </section>

              <section id="resiliation" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 15 — Résiliation
                </h2>
                <div className="prose-legal space-y-3">
                  <p>
                    En cas de manquement grave, l'autre partie pourra résilier le contrat de plein droit par lettre
                    recommandée avec accusé de réception, après mise en demeure restée sans effet pendant{" "}
                    <strong>quinze (15) jours</strong>.
                  </p>
                  <p>
                    En cas de résiliation à l'initiative du Client sans faute du Prestataire, les sommes déjà
                    facturées restent dues et les travaux réalisés seront facturés au prorata, avec application
                    d'une indemnité de résiliation égale à <strong>20 % du solde restant</strong>.
                  </p>
                </div>
              </section>

              <section id="droit" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Article 17 — Droit applicable et juridiction compétente
                </h2>
                <div className="prose-legal">
                  <p>
                    Les présentes CGV sont soumises au <strong>droit français</strong>. En cas de litige, et après
                    tentative de résolution amiable, le <strong>Tribunal de Commerce de Nantes</strong> sera seul
                    compétent.
                  </p>
                </div>
              </section>

              <div className="pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Mobem Solutions — CGV en vigueur au 1er janvier 2025
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  GME | Nathan Portier (Mandataire) & Arnaud Clavier (Co-Mandataire) — Tribunal de Commerce de Nantes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
