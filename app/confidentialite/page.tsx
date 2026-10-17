import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalCard, LegalList, LegalTable, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mobem Solutions",
  description: "Politique de confidentialité de Mobem Solutions : données collectées, finalités, durées de conservation, sous-traitants et droits RGPD.",
  alternates: { canonical: "https://mobem-solutions.com/confidentialite" },
}

const MAIL = <a href="mailto:contact@mobem-solutions.com">contact@mobem-solutions.com</a>

const SECTIONS: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          Les données personnelles collectées via le site mobem-solutions.com et dans le cadre de nos échanges commerciaux sont
          traitées par <strong>Arnaud Clavier</strong>, entrepreneur individuel exerçant sous le nom Mobem Solutions.
        </p>
        <LegalCard>
          <p><strong>Contact RGPD</strong></p>
          <p>{MAIL}</p>
        </LegalCard>
      </>
    ),
  },
  {
    id: "collecte",
    title: "Données collectées sur le site",
    content: (
      <>
        <p>Je ne collecte que ce qui est nécessaire pour vous répondre et organiser le diagnostic.</p>
        <LegalTable
          head={["Source", "Données", "Obligatoire"]}
          rows={[
            ["Réservation du diagnostic (Calendly)", "Nom, e-mail, entreprise, créneau choisi, réponses éventuelles au questionnaire de réservation", "Oui"],
            ["Échanges par e-mail", "Contenu des échanges, pièces jointes éventuelles", "Selon votre message"],
            ["Mesure d'audience (Vercel Analytics)", "Pages vues, pays, type d'appareil, en données agrégées et sans cookie", "Non"],
          ]}
        />
        <p>Je ne collecte aucune donnée sensible au sens de l&apos;article 9 du RGPD.</p>
      </>
    ),
  },
  {
    id: "clients",
    title: "Données traitées pour mes clients",
    content: (
      <>
        <p>
          Les automatisations que je mets en place sont installées <strong>sur les propres comptes de mes clients</strong>.
          Les données qu&apos;elles traitent (mails, documents, fichiers de suivi) restent chez eux.
        </p>
        <p>
          Pour ces traitements, le client est responsable de traitement et j&apos;interviens comme sous-traitant au sens de
          l&apos;article 28 du RGPD, dans le cadre d&apos;un accord de traitement des données signé avec chaque mission. Je
          n&apos;accède à ces données que dans la mesure nécessaire à la mise en place, au contrôle et à la maintenance des
          automatisations.
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    content: (
      <LegalTable
        head={["Finalité", "Base légale (art. 6 RGPD)"]}
        rows={[
          ["Répondre à vos demandes et organiser le diagnostic", "Intérêt légitime, mesures précontractuelles"],
          ["Exécuter les missions et facturer", "Exécution du contrat"],
          ["Mesurer l'audience du site de façon anonyme", "Intérêt légitime"],
          ["Conserver les pièces comptables", "Obligation légale"],
        ]}
      />
    ),
  },
  {
    id: "conservation",
    title: "Durées de conservation",
    content: (
      <>
        <LegalTable
          head={["Données", "Durée"]}
          rows={[
            ["Prospects sans suite commerciale", "3 ans après le dernier contact"],
            ["Clients (données contractuelles)", "5 ans après la fin du contrat"],
            ["Factures et pièces comptables", "10 ans (art. L123-22 du Code de commerce)"],
            ["Statistiques d'audience agrégées", "13 mois maximum"],
          ]}
        />
        <p>À l&apos;issue de ces délais, les données sont supprimées ou anonymisées de façon irréversible.</p>
      </>
    ),
  },
  {
    id: "sous-traitants",
    title: "Destinataires et sous-traitants",
    content: (
      <>
        <p>
          Vos données sont réservées à mon usage. Elles ne sont jamais vendues, louées ni cédées. Je fais appel aux
          sous-traitants suivants, encadrés par des clauses contractuelles types de la Commission européenne
          lorsque des données sont traitées hors de l&apos;Union européenne :
        </p>
        <LegalTable
          head={["Prestataire", "Rôle", "Localisation"]}
          rows={[
            ["Vercel Inc.", "Hébergement du site", "États-Unis"],
            ["Calendly LLC", "Réservation du diagnostic", "États-Unis"],
            ["Zoho Corporation", "Messagerie électronique", "Union européenne / Inde"],
          ]}
        />
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          <strong>Mesure d&apos;audience.</strong> Vercel Analytics ne dépose aucun cookie et ne produit que des statistiques
          agrégées : cet usage est exempté de consentement selon les recommandations de la CNIL.
        </p>
        <p>
          <strong>Réservation.</strong> L&apos;agenda Calendly n&apos;est chargé que lorsque vous cliquez sur un bouton de
          réservation. Calendly peut alors déposer des cookies nécessaires à son fonctionnement.
        </p>
        <p>Vous pouvez gérer les cookies à tout moment depuis les paramètres de votre navigateur.</p>
      </>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <LegalList
        items={[
          "Connexions chiffrées en HTTPS sur l'ensemble du site",
          "Accès aux données réservé au seul prestataire",
          "Authentification à deux facteurs sur mes outils internes",
          "Accès aux comptes clients limités à la mission, révocables à tout moment par le client",
          "Aucun stockage de données de paiement",
        ]}
      />
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et
          d&apos;opposition, ainsi que du droit de retirer votre consentement à tout moment (articles 15 à 22 du RGPD).
        </p>
        <p>
          Pour les exercer, écrivez à {MAIL}. Je réponds sous un mois. Vous pouvez également adresser une réclamation à la
          CNIL (cnil.fr).
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    content: (
      <p>
        Cette politique peut évoluer pour suivre la réglementation ou mes pratiques. La version en vigueur est celle publiée sur
        cette page. Voir aussi les <Link href="/mentions-legales">mentions légales</Link> et les <Link href="/cgv">CGV</Link>.
      </p>
    ),
  },
]

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      current="/confidentialite"
      title="Politique de confidentialité"
      intro={<p>Quelles données je collecte, pourquoi, combien de temps, et comment exercer vos droits.</p>}
      updated="Mise à jour : octobre 2026"
      sections={SECTIONS}
    />
  )
}
