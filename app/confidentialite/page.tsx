import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalList, LegalTable, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mobem Solutions",
  description:
    "Politique de confidentialité de Mobem Solutions : données traitées sur le site et dans la relation commerciale, données traitées dans les automatisations des clients, et vos droits RGPD.",
  alternates: { canonical: "https://mobem-solutions.com/confidentialite" },
}

const MAIL = <a href="mailto:contact@mobem-solutions.com">contact@mobem-solutions.com</a>

const SECTIONS: LegalSection[] = [
  {
    id: "roles",
    title: "Deux situations, deux responsabilités",
    content: (
      <>
        <p>Mobem Solutions traite des données personnelles dans deux situations différentes, avec des responsabilités différentes :</p>
        <LegalList
          items={[
            <>
              <strong>Sur ce site et dans la relation commerciale</strong> (formulaire de contact, prise de rendez-vous, e-mails,
              devis et factures), Mobem Solutions est responsable du traitement. Les sections 2 à 8 décrivent ces traitements.
            </>,
            <>
              <strong>Dans les automatisations réalisées pour ses clients</strong>, Mobem Solutions agit pour le compte du client,
              qui reste responsable du traitement de ses propres données. Mobem Solutions est alors sous-traitant au sens de
              l’article 28 du RGPD. La section 9 résume ce cadre, détaillé dans le contrat de sous-traitance signé avec chaque
              client.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <p>
        <strong>Arnaud Clavier</strong>, entrepreneur individuel (EI), Mobem Solutions, Pornic. Contact pour toute question sur vos
        données : {MAIL}.
      </p>
    ),
  },
  {
    id: "collecte",
    title: "Données collectées",
    content: (
      <>
        <LegalTable
          head={["Source", "Données"]}
          rows={[
            ["Formulaire de contact", "Nom, e-mail, entreprise, téléphone (facultatif), métier, tâches et outils utilisés, message"],
            ["Prise de rendez-vous (Calendly)", "Nom, e-mail, entreprise, créneau choisi, réponses au questionnaire facultatif"],
            ["Échanges par e-mail", "Contenu des échanges et coordonnées"],
            ["Relation contractuelle", "Coordonnées du client et de ses interlocuteurs, devis, factures, paiements"],
            ["Mesure d’audience (Vercel Analytics)", "Données anonymes : pages vues, pays, type d’appareil"],
          ]}
        />
        <p>
          Le site ne collecte aucune donnée sensible au sens de l’article 9 du RGPD. Merci de ne pas en transmettre par le
          formulaire de contact.
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    content: (
      <LegalTable
        head={["Finalité", "Base légale"]}
        rows={[
          ["Répondre à vos demandes, organiser et réaliser le diagnostic", "Mesures précontractuelles et intérêt légitime"],
          ["Exécuter les missions, facturer, assurer le suivi", "Exécution du contrat"],
          ["Mesurer l’audience du site de façon anonyme", "Intérêt légitime"],
          ["Tenir la comptabilité", "Obligation légale"],
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
            ["Prospects sans suite", "3 ans après le dernier contact"],
            ["Données contractuelles des clients", "5 ans après la fin du contrat"],
            ["Factures et pièces comptables", "10 ans"],
            ["Statistiques d’audience agrégées", "13 mois au plus"],
          ]}
        />
        <p>À l’issue de ces durées, les données sont supprimées ou rendues anonymes de façon irréversible.</p>
      </>
    ),
  },
  {
    id: "sous-traitants",
    title: "Destinataires et sous-traitants",
    content: (
      <>
        <p>
          Vos données sont traitées par Arnaud Clavier seul. Elles ne sont ni vendues, ni louées, ni cédées. Les prestataires
          techniques suivants y ont accès pour les besoins de leur service :
        </p>
        <LegalTable
          head={["Prestataire", "Rôle", "Localisation"]}
          rows={[
            ["Vercel Inc.", "Hébergement du site, mesure d’audience", "États-Unis"],
            ["Calendly LLC", "Prise de rendez-vous", "États-Unis"],
            ["Resend", "Envoi des e-mails du formulaire de contact", "États-Unis"],
            ["Zoho Corporation", "Messagerie professionnelle", "Union européenne et Inde"],
          ]}
        />
        <p>
          Les transferts hors de l’Union européenne sont encadrés par des garanties appropriées : le cadre de protection des données
          UE-États-Unis lorsque le prestataire y adhère, ou à défaut les clauses contractuelles types de la Commission européenne.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Vercel Analytics ne dépose pas de cookie et mesure l’audience de façon anonyme. Le module Calendly ne se charge que lorsque
        vous cliquez sur un bouton de prise de rendez-vous ; il peut alors déposer des cookies nécessaires à son fonctionnement. Vous
        pouvez gérer les cookies depuis les réglages de votre navigateur.
      </p>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Site entièrement en HTTPS, accès aux outils limité au seul prestataire, double authentification sur les outils internes,
        aucune donnée de paiement conservée.
      </p>
    ),
  },
  {
    id: "automatisations",
    title: "Les données traitées dans les automatisations des clients",
    content: (
      <>
        <p>
          Les automatisations se connectent aux outils du client (par exemple Google Sheets, Gmail, Google Drive). Les données des
          personnes concernées (stagiaires, contacts, formateurs…) restent stockées dans ces outils, qui appartiennent au client.
        </p>
        <LegalList
          items={[
            <>
              <strong>Hébergement des automatisations.</strong> Par défaut, dans un espace géré par Mobem Solutions sur la
              plateforme n8n Cloud (n8n GmbH, Allemagne), sur des serveurs situés à Francfort. Chaque client dispose de connexions
              et d’automatisations distinctes. Sur demande, les automatisations peuvent être installées sur les comptes du client.
            </>,
            <>
              <strong>Conservation minimale des données traitées.</strong> Seules les exécutions en erreur sont conservées, le
              temps d’en diagnostiquer la cause, puis supprimées automatiquement. Les exécutions réussies ne sont pas enregistrées :
              la plateforme conserve les automatisations et les connexions, pas le contenu des données qui y transitent.
            </>,
            <>
              <strong>Accès.</strong> Mobem Solutions n’accède aux comptes du client que pour l’installation, la surveillance et la
              maintenance. Le client peut retirer ces accès à tout moment.
            </>,
            <>
              <strong>Contrat de sous-traitance.</strong> Un contrat conforme à l’article 28 du RGPD est signé avec chaque client. Il
              précise les données traitées, les mesures de sécurité, les sous-traitants ultérieurs et le sort des données en fin de
              contrat.
            </>,
          ]}
        />
        <p>
          Les personnes dont les données sont traitées dans ces automatisations exercent leurs droits auprès du client concerné.
          Mobem Solutions aide le client à y répondre.
        </p>
      </>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que
          du droit de retirer votre consentement (articles 15 à 22 du RGPD). Écrivez à {MAIL} : une réponse vous sera apportée dans
          un délai d’un mois.
        </p>
        <p>Vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).</p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    content: (
      <p>
        Cette politique peut évoluer. La version publiée sur cette page est celle en vigueur. Voir aussi les{" "}
        <Link href="/mentions-legales">mentions légales</Link> et les <Link href="/cgv">CGV</Link>.
      </p>
    ),
  },
]

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      current="/confidentialite"
      title="Politique de confidentialité"
      intro={<p>Quelles données nous traitons, pourquoi, combien de temps, et comment exercer vos droits.</p>}
      updated="Dernière mise à jour : 26 octobre 2026"
      sections={SECTIONS}
    />
  )
}
