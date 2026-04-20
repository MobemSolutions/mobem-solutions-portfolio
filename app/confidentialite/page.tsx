import type { Metadata } from "next"
import Link from "next/link"
import { LegalHeader } from "@/components/legal-header"
import { Footer } from "@/components/footer"
import { CopyEmail } from "@/components/ui/copy-email"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Mobem Solutions",
  description: "Politique de confidentialité et gestion des données personnelles de Mobem Solutions, conforme au RGPD.",
  robots: { index: false, follow: false },
}

const sections = [
  { id: "responsable", label: "Responsable du traitement" },
  { id: "donnees", label: "Données collectées" },
  { id: "finalites", label: "Finalités du traitement" },
  { id: "bases", label: "Bases légales" },
  { id: "conservation", label: "Durée de conservation" },
  { id: "partage", label: "Partage & sous-traitants" },
  { id: "cookies", label: "Cookies & traceurs" },
  { id: "securite", label: "Sécurité des données" },
  { id: "droits", label: "Vos droits RGPD" },
  { id: "mineurs", label: "Mineurs" },
  { id: "modifications", label: "Modifications de la politique" },
  { id: "contact", label: "Nous contacter" },
]

export default function ConfidentialitePage() {
  return (
    <>
      <LegalHeader />
      <main className="pt-20 lg:pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="py-12 lg:py-16 border-b border-border">
            <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">Informations légales</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Politique de confidentialité
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Mobem Solutions s'engage à protéger la vie privée de ses visiteurs et clients. Cette politique décrit
              comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD
              (Règlement UE 2016/679).
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : janvier 2025</p>
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
                    <Link href="/cgv" className="underline hover:text-foreground">
                      CGV
                    </Link>
                  </p>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-14">

              <section id="responsable" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Responsable du traitement</h2>
                <div className="prose-legal space-y-3">
                  <p>
                    Le traitement des données personnelles collectées via le site mobem-solutions.com est géré par
                    le GME <strong>Mobem Solutions</strong>, représenté conjointement par ses mandataires :
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="font-semibold text-foreground text-sm">Nathan Portier</p>
                      <p className="text-xs text-muted-foreground mt-1">Mandataire administratif & commercial</p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">SIRET : 91514447100017</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="font-semibold text-foreground text-sm">Arnaud Clavier</p>
                      <p className="text-xs text-muted-foreground mt-1">Co-Mandataire technique</p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">SIRET : 99285845600013</p>
                    </div>
                  </div>
                  <p>
                    Contact DPO / RGPD :{" "}
                    <CopyEmail email="contact@mobem-solutions.com" />
                  </p>
                </div>
              </section>

              <section id="donnees" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Données collectées</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Nous appliquons le principe de <strong>minimisation des données</strong> : nous ne collectons
                    que ce qui est strictement nécessaire à la gestion de nos relations commerciales.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 font-medium text-foreground">Source</th>
                          <th className="text-left py-3 pr-4 font-medium text-foreground">Données collectées</th>
                          <th className="text-left py-3 font-medium text-foreground">Obligatoire</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          {
                            source: "Formulaire de contact",
                            data: "Nom, prénom, adresse email, téléphone, message",
                            required: "Oui",
                          },
                          {
                            source: "Calendly (prise de RDV)",
                            data: "Nom, email, téléphone, sujet de l'appel, disponibilités",
                            required: "Oui",
                          },
                          {
                            source: "Cookies analytiques",
                            data: "Pages visitées, durée de session, pays, type d'appareil (données agrégées et anonymisées)",
                            required: "Non",
                          },
                          {
                            source: "Emails (Zoho Mail)",
                            data: "Contenu des échanges commerciaux, pièces jointes éventuelles",
                            required: "Contextuel",
                          },
                        ].map((row) => (
                          <tr key={row.source}>
                            <td className="py-3 pr-4 text-foreground font-medium align-top">{row.source}</td>
                            <td className="py-3 pr-4 text-muted-foreground align-top">{row.data}</td>
                            <td className="py-3 text-muted-foreground align-top">{row.required}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nous ne collectons <strong>jamais</strong> de données sensibles (santé, opinions politiques,
                    origines ethniques, données biométriques) au sens de l'article 9 du RGPD.
                  </p>
                </div>
              </section>

              <section id="finalites" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Finalités du traitement</h2>
                <div className="space-y-3">
                  {[
                    {
                      title: "Gestion des demandes commerciales",
                      desc: "Répondre à vos demandes de devis, d'information ou de contact via le formulaire du site.",
                    },
                    {
                      title: "Organisation des rendez-vous",
                      desc: "Gérer et confirmer les rendez-vous téléphoniques ou visio via Calendly.",
                    },
                    {
                      title: "Exécution des contrats",
                      desc: "Assurer la bonne réalisation des prestations commandées et la facturation associée.",
                    },
                    {
                      title: "Amélioration du site",
                      desc: "Analyser l'usage du site (pages visitées, performances) pour améliorer l'expérience utilisateur via des données agrégées anonymisées.",
                    },
                    {
                      title: "Obligations légales",
                      desc: "Conserver certaines données comptables et contractuelles conformément aux obligations légales françaises.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="bases" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Bases légales des traitements</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Chaque traitement repose sur une base légale au sens de l'article 6 du RGPD :
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        base: "Consentement (art. 6.1.a)",
                        desc: "Pour les cookies analytiques non essentiels, vous consentez librement lors de votre première visite.",
                      },
                      {
                        base: "Exécution d'un contrat (art. 6.1.b)",
                        desc: "Pour le traitement des données nécessaires à la réalisation des prestations commandées.",
                      },
                      {
                        base: "Intérêt légitime (art. 6.1.f)",
                        desc: "Pour la gestion des demandes commerciales entrantes et l'amélioration de nos services.",
                      },
                      {
                        base: "Obligation légale (art. 6.1.c)",
                        desc: "Pour la conservation des documents comptables et contractuels imposée par la loi.",
                      },
                    ].map((b) => (
                      <div key={b.base} className="rounded-xl border border-border bg-card p-4">
                        <p className="text-sm font-semibold text-foreground">{b.base}</p>
                        <p className="text-sm text-muted-foreground mt-2">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="conservation" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Durée de conservation</h2>
                <div className="prose-legal">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-4 font-medium text-foreground">Type de données</th>
                          <th className="text-left py-3 font-medium text-foreground">Durée de conservation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { type: "Prospects (formulaire de contact, sans suite commerciale)", duration: "3 ans après le dernier contact" },
                          { type: "Clients (données contractuelles)", duration: "5 ans après la fin du contrat (prescription commerciale)" },
                          { type: "Documents comptables et factures", duration: "10 ans (obligation légale, art. L123-22 C. com.)" },
                          { type: "Données analytiques (cookies)", duration: "13 mois maximum" },
                          { type: "Échanges emails", duration: "3 ans après le dernier contact commercial" },
                        ].map((row) => (
                          <tr key={row.type}>
                            <td className="py-3 pr-4 text-muted-foreground align-top">{row.type}</td>
                            <td className="py-3 text-foreground font-medium align-top">{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    À l'issue de ces délais, les données sont supprimées ou anonymisées de façon irréversible.
                  </p>
                </div>
              </section>

              <section id="partage" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Partage et sous-traitants</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Vos données sont strictement réservées à l'usage des membres de Mobem Solutions (Nathan
                    Portier, Arnaud Clavier, Antoine Clavier). <strong>Elles ne sont jamais vendues,
                    louées ou cédées à des tiers à des fins commerciales.</strong>
                  </p>
                  <p>
                    Nous faisons appel aux sous-traitants suivants, tous conformes au RGPD et ayant signé les
                    clauses contractuelles types de la Commission européenne lorsqu'ils traitent des données hors UE :
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        name: "Vercel Inc.",
                        role: "Hébergement du site web",
                        location: "États-Unis (Privacy Shield / SCCs)",
                        link: "vercel.com/legal/privacy-policy",
                      },
                      {
                        name: "Zoho Corporation",
                        role: "Messagerie électronique",
                        location: "Inde / UE (GDPR compliant)",
                        link: "zoho.com/privacy.html",
                      },
                      {
                        name: "Calendly LLC",
                        role: "Prise de rendez-vous en ligne",
                        location: "États-Unis (SCCs)",
                        link: "calendly.com/privacy",
                      },
                    ].map((st) => (
                      <div key={st.name} className="rounded-xl border border-border bg-card p-4">
                        <p className="font-semibold text-foreground text-sm">{st.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{st.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{st.location}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    En dehors de ces sous-traitants et des cas imposés par la loi (réquisitions judiciaires,
                    autorités compétentes), aucun transfert de données n'est effectué.
                  </p>
                </div>
              </section>

              <section id="cookies" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Cookies et traceurs</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Conformément à la directive ePrivacy et aux recommandations de la CNIL, voici les cookies
                    utilisés sur ce site :
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground text-sm">Cookies essentiels</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">Toujours actifs</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nécessaires au bon fonctionnement du site (préférences de thème clair/sombre). Aucun
                        consentement requis (exemptés par la CNIL).
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground text-sm">Cookies analytiques</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Consentement requis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Vercel Analytics : mesure d'audience anonymisée (pages vues, durée de session, pays,
                        type d'appareil). Aucune donnée personnelle identifiable n'est transmise. Conservation :
                        13 mois maximum.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground text-sm">Cookies tiers (Calendly)</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Consentement requis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lors du chargement du widget Calendly, des cookies tiers peuvent être déposés par
                        Calendly LLC pour assurer le fonctionnement de la prise de rendez-vous.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez à tout moment modifier vos préférences cookies via les paramètres de votre
                    navigateur ou en nous contactant à{" "}
                    <CopyEmail email="contact@mobem-solutions.com" />
                    .
                  </p>
                </div>
              </section>

              <section id="securite" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Sécurité des données</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Mobem Solutions met en œuvre les mesures techniques et organisationnelles appropriées pour
                    protéger vos données personnelles contre tout accès non autorisé, perte, altération ou
                    divulgation :
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Connexions chiffrées en HTTPS/TLS sur l'ensemble du site (certificat géré par Vercel)",
                      "Accès aux données limité aux seuls membres du GME selon le principe du moindre privilège",
                      "Messagerie professionnelle sécurisée via Zoho Mail avec authentification à deux facteurs",
                      "Hébergement sur infrastructure Vercel certifiée SOC 2 Type II",
                      "Aucun stockage de données de paiement (les paiements sont traités par des prestataires tiers sécurisés)",
                      "Revue régulière des accès et des autorisations",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits et
                    libertés, nous vous en informerons dans les meilleurs délais conformément à l'article 34 du
                    RGPD.
                  </p>
                </div>
              </section>

              <section id="droits" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Vos droits RGPD</h2>
                <div className="prose-legal space-y-4">
                  <p>
                    Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants concernant vos
                    données personnelles :
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        right: "Droit d'accès (art. 15)",
                        desc: "Obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.",
                      },
                      {
                        right: "Droit de rectification (art. 16)",
                        desc: "Corriger des données inexactes ou incomplètes vous concernant.",
                      },
                      {
                        right: "Droit à l'effacement (art. 17)",
                        desc: "Demander la suppression de vos données sous certaines conditions (\"droit à l'oubli\").",
                      },
                      {
                        right: "Droit à la limitation (art. 18)",
                        desc: "Restreindre temporairement le traitement de vos données pendant une contestation.",
                      },
                      {
                        right: "Droit à la portabilité (art. 20)",
                        desc: "Recevoir vos données dans un format structuré et lisible par machine.",
                      },
                      {
                        right: "Droit d'opposition (art. 21)",
                        desc: "Vous opposer à tout moment au traitement fondé sur l'intérêt légitime.",
                      },
                      {
                        right: "Droit de retrait du consentement",
                        desc: "Retirer votre consentement à tout moment pour les traitements qui en dépendent.",
                      },
                      {
                        right: "Droit de réclamation",
                        desc: "Introduire une réclamation auprès de la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas respectés.",
                      },
                    ].map((r) => (
                      <div key={r.right} className="rounded-xl border border-border bg-card p-4">
                        <p className="text-sm font-semibold text-foreground">{r.right}</p>
                        <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
                    <p className="font-semibold text-foreground text-sm mb-2">Exercer vos droits</p>
                    <p className="text-sm text-muted-foreground">
                      Pour exercer l'un de ces droits, adressez votre demande par email à{" "}
                      <CopyEmail email="contact@mobem-solutions.com" />{" "}
                      en précisant votre identité. Nous traiterons votre demande dans un délai d'un (1) mois
                      maximum. En cas de demande complexe, ce délai peut être prolongé de deux (2) mois
                      supplémentaires, avec information préalable.
                    </p>
                  </div>
                </div>
              </section>

              <section id="mineurs" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Mineurs</h2>
                <div className="prose-legal">
                  <p>
                    Le site mobem-solutions.com est destiné à des professionnels et entreprises. Nous ne collectons
                    pas sciemment de données personnelles concernant des personnes de moins de 18 ans. Si vous
                    pensez qu'un mineur nous a fourni des données personnelles, contactez-nous immédiatement à{" "}
                    <CopyEmail email="contact@mobem-solutions.com" />{" "}
                    afin que nous puissions les supprimer.
                  </p>
                </div>
              </section>

              <section id="modifications" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">11. Modifications de la politique</h2>
                <div className="prose-legal space-y-3">
                  <p>
                    Mobem Solutions se réserve le droit de modifier la présente politique de confidentialité à
                    tout moment, notamment pour se conformer à l'évolution de la réglementation ou de nos pratiques.
                  </p>
                  <p>
                    La version en vigueur est celle publiée sur cette page, avec la date de dernière mise à jour
                    indiquée en en-tête. Pour les modifications substantielles affectant vos droits, nous vous en
                    informerons par email ou par une notification visible sur le site.
                  </p>
                </div>
              </section>

              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-foreground mb-4">12. Nous contacter</h2>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pour toute question relative à cette politique ou à l'exercice de vos droits :
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-accent shrink-0">→</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <CopyEmail email="contact@mobem-solutions.com" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent shrink-0">→</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Autorité de contrôle</p>
                        <p className="text-sm text-muted-foreground">
                          CNIL — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — cnil.fr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Mobem Solutions — Politique de confidentialité en vigueur au 1er janvier 2025
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  GME | Nathan Portier & Arnaud Clavier — Nantes, France
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
