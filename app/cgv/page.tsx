import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalCard, LegalList, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Conditions générales de vente | Mobem Solutions",
  description:
    "CGV de Mobem Solutions : diagnostic, automatisation des tâches administratives, mesure des heures gagnées et maintenance, sur les propres outils du client.",
  alternates: { canonical: "https://mobem-solutions.com/cgv" },
}

const SECTIONS: LegalSection[] = [
  {
    id: "objet",
    title: "Objet et acceptation",
    content: (
      <>
        <p>
          Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Mobem Solutions
          (le « Prestataire ») et tout client professionnel (le « Client ») ayant commandé ses prestations.
        </p>
        <p>
          Toute commande implique l&apos;acceptation pleine et entière des présentes CGV, qui prévalent sur tout autre document du
          Client, sauf convention particulière acceptée par écrit par le Prestataire.
        </p>
      </>
    ),
  },
  {
    id: "prestataire",
    title: "Identité du Prestataire",
    content: (
      <p>
        Le Prestataire est <strong>Arnaud Clavier</strong>, entrepreneur individuel exerçant sous le nom commercial Mobem
        Solutions (SIRET 992 858 456 00013, Pornic, Loire-Atlantique). Il réalise lui-même les prestations et constitue
        l&apos;interlocuteur unique du Client, du diagnostic à la maintenance.
      </p>
    ),
  },
  {
    id: "prestations",
    title: "Prestations proposées",
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { t: "Diagnostic", d: "Entretien gratuit et sans engagement (45 min environ) pour recenser les tâches répétitives et estimer le temps récupérable." },
            { t: "Pilote", d: "Mise en place d'une première automatisation sur une tâche précise, avec mesure avant / après." },
            { t: "Pack métier", d: "Ensemble d'automatisations reliées couvrant un processus complet du Client." },
            { t: "Maintenance", d: "Abonnement mensuel de surveillance, d'alerte en cas d'échec et d'ajustements (article 10)." },
          ].map((p) => (
            <LegalCard key={p.t}>
              <p><strong>{p.t}</strong></p>
              <p className="mt-1">{p.d}</p>
            </LegalCard>
          ))}
        </div>
        <p>
          Le périmètre, les livrables, les outils concernés, les délais et le prix de chaque mission sont précisés dans le devis
          signé, qui fait partie intégrante du contrat.
        </p>
      </>
    ),
  },
  {
    id: "commande",
    title: "Formation du contrat",
    content: (
      <>
        <p>
          Le contrat est formé à la réception par le Prestataire du devis signé, accompagné du paiement de l&apos;acompte prévu.
          Aucun travail n&apos;est engagé avant ce paiement. Le diagnostic gratuit n&apos;engage ni le Client ni le Prestataire.
        </p>
        <p>Les devis sont valables trente (30) jours à compter de leur date d&apos;émission.</p>
      </>
    ),
  },
  {
    id: "prix",
    title: "Prix et paiement",
    content: (
      <>
        <p>Les prix sont exprimés en euros hors taxes. La TVA applicable est ajoutée au taux en vigueur à la date de facturation.</p>
        <h3>Pilote et pack métier</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { pct: "30 %", label: "À la commande", detail: "Acompte" },
            { pct: "40 %", label: "À la recette", detail: "Automatisation testée et validée" },
            { pct: "30 %", label: "À la mise en service", detail: "Solde" },
          ].map((e) => (
            <LegalCard key={e.label}>
              <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink">{e.pct}</p>
              <p className="mt-2"><strong>{e.label}</strong></p>
              <p>{e.detail}</p>
            </LegalCard>
          ))}
        </div>
        <h3>Maintenance</h3>
        <p>L&apos;abonnement de maintenance est facturé mensuellement, à terme à échoir.</p>
        <h3>Retard de paiement</h3>
        <p>
          Tout retard entraîne de plein droit, sans mise en demeure préalable, des pénalités au taux d&apos;intérêt légal majoré de
          cinq (5) points, ainsi qu&apos;une indemnité forfaitaire de recouvrement de 40 €. Les paiements s&apos;effectuent par
          virement bancaire sur le compte du Prestataire.
        </p>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspension pour non-paiement",
    content: (
      <p>
        En cas de facture impayée quinze (15) jours après son échéance, le Prestataire peut suspendre les prestations en cours,
        y compris la maintenance, jusqu&apos;au règlement intégral des sommes dues et des pénalités. Les automatisations déjà
        installées sur les comptes du Client restent sa propriété et ne sont ni supprimées ni désactivées par le Prestataire.
      </p>
    ),
  },
  {
    id: "comptes",
    title: "Comptes, outils et accès du Client",
    content: (
      <>
        <p>
          Les automatisations sont reliées aux comptes et outils du Client (messagerie, tableurs, stockage de documents,
          logiciel métier), dont il reste titulaire et dont il assume les abonnements. Elles sont hébergées, au choix du Client :
        </p>
        <LegalList
          items={[
            <>
              <strong>par le Prestataire</strong>, sur un serveur situé dans l&apos;Union européenne, dans un espace dédié au
              Client (option par défaut) ;
            </>,
            <>
              <strong>par le Client</strong>, sur ses propres comptes ou son serveur, l&apos;outil d&apos;automatisation restant
              alors à sa charge.
            </>,
          ]}
        />
        <p>
          Le Client fournit au Prestataire les accès strictement nécessaires à la mission et peut les retirer à tout moment. Le
          Prestataire s&apos;engage à ne les utiliser que pour la mission confiée.
        </p>
        <p>
          Le Prestataire ne peut être tenu responsable des interruptions, changements de fonctionnement ou évolutions tarifaires
          des services tiers utilisés par le Client. Leur impact sur une automatisation est traité dans le cadre de la
          maintenance ou fait l&apos;objet d&apos;un devis.
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles et sous-traitance",
    content: (
      <>
        <p>
          Lorsque les automatisations traitent des données personnelles pour le compte du Client, celui-ci agit en qualité de
          responsable de traitement et le Prestataire en qualité de sous-traitant au sens de l&apos;article 28 du RGPD. Un accord
          de traitement des données est signé avec le devis.
        </p>
        <p>
          Le Prestataire privilégie des services hébergés dans l&apos;Union européenne lorsqu&apos;un service tiers est nécessaire,
          et en informe le Client avant toute mise en place.
        </p>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          Après paiement intégral, le Client dispose des droits d&apos;utilisation et de modification des automatisations réalisées
          spécifiquement pour lui (scénarios, paramétrages, modèles de messages, documentation), pour ses besoins propres, sans
          limitation de durée.
        </p>
        <p>
          Le Prestataire conserve la propriété de ses méthodes, savoir-faire, modèles et modules réutilisables, sur lesquels le
          Client bénéficie d&apos;un droit d&apos;usage non exclusif et non cessible, limité au fonctionnement des automatisations
          livrées.
        </p>
      </>
    ),
  },
  {
    id: "maintenance",
    title: "Maintenance",
    content: (
      <>
        <p>
          La maintenance est une prestation distincte de la mise en place initiale, souscrite pour une durée d&apos;un mois
          renouvelable tacitement et résiliable par chaque partie avec un préavis d&apos;un mois.
        </p>
        <LegalList
          items={[
            "Surveillance des exécutions des automatisations et alerte en cas d'échec",
            "Correction des automatisations défaillantes et relance des traitements concernés",
            "Ajustements rendus nécessaires par l'évolution des outils du Client, dans la limite prévue au contrat",
            "Point régulier sur le fonctionnement et les heures gagnées",
          ]}
        />
        <p>
          Les incidents bloquants sont pris en charge sous quarante-huit (48) heures ouvrées. Sont exclus : la création de
          nouvelles automatisations, les interventions rendues nécessaires par une modification faite par un tiers, et les pannes
          imputables aux services tiers.
        </p>
      </>
    ),
  },
  {
    id: "client",
    title: "Obligations du Client",
    content: (
      <>
        <p>
          Le Client s&apos;engage à fournir en temps utile les accès, exemples de documents et informations nécessaires, et à
          participer à la recette. Tout retard de sa part décale d&apos;autant les délais convenus.
        </p>
        <p>
          Le Client dispose de sept (7) jours ouvrés après la présentation d&apos;une automatisation pour formuler ses
          observations par écrit. Passé ce délai, l&apos;automatisation est réputée validée.
        </p>
        <p>
          Le Client reste responsable de la licéité des données traitées et des décisions prises à partir des résultats des
          automatisations. Les étapes faisant appel à l&apos;intelligence artificielle sont, sauf accord contraire, soumises à une
          validation humaine.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <>
        <p>
          Le Prestataire est tenu à une obligation de moyens. Les estimations d&apos;heures gagnées communiquées lors du diagnostic
          ou présentées sur le site sont indicatives ; seul le gain mesuré après mise en service fait foi, sans constituer un
          engagement de résultat.
        </p>
        <p>
          La responsabilité du Prestataire est limitée aux dommages directs et prévisibles, dans la limite des sommes
          effectivement perçues au titre du contrat concerné. Elle ne couvre pas les dommages indirects (perte
          d&apos;exploitation, perte de chiffre d&apos;affaires, atteinte à l&apos;image).
        </p>
      </>
    ),
  },
  {
    id: "references",
    title: "Références clients",
    content: (
      <p>
        Le Prestataire ne cite le nom, le logo ou les résultats d&apos;un Client qu&apos;avec son accord écrit préalable. Cet accord
        peut être retiré à tout moment sur simple demande.
      </p>
    ),
  },
  {
    id: "confidentialite",
    title: "Confidentialité",
    content: (
      <p>
        Les parties s&apos;engagent à garder confidentielles les informations échangées dans le cadre de la mission, pendant toute
        sa durée et deux (2) ans après son terme. Voir aussi la <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "resiliation",
    title: "Résiliation",
    content: (
      <p>
        En cas de manquement grave, l&apos;autre partie peut résilier le contrat par lettre recommandée avec accusé de réception,
        après mise en demeure restée sans effet pendant quinze (15) jours. En cas de résiliation par le Client sans faute du
        Prestataire, les sommes facturées restent dues et les travaux réalisés sont facturés au prorata.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable et litiges",
    content: (
      <p>
        Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige relève de la compétence
        exclusive des tribunaux compétents de Nantes.
      </p>
    ),
  },
]

export default function CgvPage() {
  return (
    <LegalLayout
      current="/cgv"
      title="Conditions générales de vente"
      intro={<p>Comment se déroulent nos missions d&apos;automatisation, du diagnostic gratuit à la maintenance.</p>}
      updated="En vigueur au 17 octobre 2026"
      sections={SECTIONS}
    />
  )
}
