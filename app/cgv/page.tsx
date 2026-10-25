import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalList, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Conditions générales de vente | Mobem Solutions",
  description:
    "CGV de Mobem Solutions : diagnostic, pilote, pack métier, maintenance et hébergement des automatisations pour les clients professionnels.",
  alternates: { canonical: "https://mobem-solutions.com/cgv" },
}

const SECTIONS: LegalSection[] = [
  {
    id: "objet",
    title: "Objet et champ d’application",
    content: (
      <>
        <p>
          Les présentes conditions générales de vente (CGV) s’appliquent aux prestations réalisées par Mobem Solutions pour des
          clients professionnels : entreprises, associations, organismes de formation et autres structures agissant pour les
          besoins de leur activité. Elles ne s’appliquent pas aux consommateurs.
        </p>
        <p>
          Toute commande vaut acceptation des CGV. Elles prévalent sur les conditions du client, sauf accord écrit contraire. En
          cas de contradiction, le devis signé prévaut sur les CGV.
        </p>
      </>
    ),
  },
  {
    id: "prestataire",
    title: "Prestataire",
    content: (
      <p>
        <strong>Arnaud Clavier</strong>, entrepreneur individuel (EI), exerçant sous le nom commercial Mobem Solutions, 10 rue Mondésir, 44210 Pornic.
        SIRET 992 858 456 00013. Il réalise personnellement les prestations et reste l’interlocuteur unique du client.
      </p>
    ),
  },
  {
    id: "prestations",
    title: "Prestations",
    content: (
      <>
        <LegalList
          items={[
            <>
              <strong>Diagnostic</strong> : échange gratuit d’environ 45 minutes, sans engagement.
            </>,
            <>
              <strong>Pilote</strong> : mise en place d’une automatisation sur une tâche, avec mesure avant et après.
            </>,
            <>
              <strong>Pack métier</strong> : plusieurs automatisations reliées couvrant un processus métier.
            </>,
            <>
              <strong>Maintenance</strong> : abonnement mensuel de surveillance, correction et ajustement des automatisations
              (article 9).
            </>,
            <>
              <strong>Site vitrine</strong> : sur devis.
            </>,
          ]}
        />
        <p>Le périmètre, les livrables, les outils connectés, les délais et le prix de chaque prestation sont fixés dans le devis.</p>
      </>
    ),
  },
  {
    id: "commande",
    title: "Devis et commande",
    content: (
      <p>
        Les devis sont valables 30 jours. Le contrat est formé à la réception du devis signé et de l’acompte. Aucun travail ne
        commence avant ce paiement. Le contrat de sous-traitance des données personnelles (article 13) est signé en même temps que
        le devis.
      </p>
    ),
  },
  {
    id: "prix",
    title: "Prix et paiement",
    content: (
      <>
        <p>
          <strong>Prix.</strong> Les prix sont exprimés en euros. Mobem Solutions bénéficie de la franchise en base de TVA : aucune
          TVA n’est facturée (« TVA non applicable, art. 293 B du CGI »). Si Mobem Solutions devient redevable de la TVA, le
          montant total à payer des devis signés et des abonnements en cours reste inchangé jusqu’à leur terme ou, pour la
          maintenance, jusqu’à la date anniversaire suivante.
        </p>
        <p>
          <strong>Échéancier du pilote et du pack métier.</strong> Un acompte de 50 % à la commande, puis le solde de 50 % à la
          mise en service. Pour le pack métier, la mise en service s’entend de la dernière automatisation prévue au devis.
        </p>
        <p>
          <strong>Maintenance.</strong> Facturée mensuellement, d’avance.
        </p>
        <p>
          <strong>Délai de paiement.</strong> 30 jours à compter de la date d’émission de la facture, par virement. Aucun escompte
          n’est accordé pour paiement anticipé.
        </p>
        <p>
          <strong>Retard de paiement.</strong> Toute somme non payée à l’échéance entraîne de plein droit, sans rappel préalable,
          des pénalités au taux de refinancement de la Banque centrale européenne majoré de 10 points, et une indemnité forfaitaire
          pour frais de recouvrement de 40 € (article L441-10 du Code de commerce).
        </p>
      </>
    ),
  },
  {
    id: "outils",
    title: "Outils et coûts tiers",
    content: (
      <>
        <p>
          Les automatisations se connectent aux outils du client (Google Workspace, Gmail, messagerie, logiciels métier…). Ces
          outils restent la propriété du client, sous ses propres abonnements, et à sa charge.
        </p>
        <p>
          Lorsque Mobem Solutions héberge les automatisations, le coût de la plateforme d’automatisation est compris dans
          l’abonnement de maintenance. Lorsque le client les héberge sur ses propres comptes, l’abonnement à la plateforme est à sa
          charge.
        </p>
        <p>
          Mobem Solutions n’est pas responsable des changements de fonctionnement, de prix ou de conditions décidés par les éditeurs
          de ces outils. Une adaptation rendue nécessaire par un tel changement est couverte par la maintenance lorsqu’elle reste
          limitée ; à défaut, elle fait l’objet d’un devis.
        </p>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement des automatisations",
    content: (
      <>
        <p>Le client choisit entre deux modes, indiqués dans le devis :</p>
        <LegalList
          items={[
            <>
              <strong>Hébergement par Mobem Solutions (par défaut)</strong> : les automatisations fonctionnent dans un espace géré
              par Mobem Solutions, sur la plateforme n8n Cloud, avec des serveurs situés dans l’Union européenne. Chaque client
              dispose d’automatisations et de connexions distinctes. La conception et la modification des automatisations sont
              réservées à Mobem Solutions. Cet hébergement est lié à l’abonnement de maintenance.
            </>,
            <>
              <strong>Hébergement par le client</strong> : les automatisations sont installées sur les comptes ou le serveur du
              client, qui en assure l’abonnement.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "recette",
    title: "Recette",
    content: (
      <p>
        À la livraison de chaque automatisation, le client dispose de 7 jours ouvrés pour la tester et signaler par écrit les
        anomalies constatées par rapport au devis. Sans retour écrit dans ce délai, ou dès sa mise en service, l’automatisation est
        réputée acceptée.
      </p>
    ),
  },
  {
    id: "maintenance",
    title: "Maintenance",
    content: (
      <>
        <p>
          <strong>Durée.</strong> L’abonnement prend effet à la mise en service. Il comporte un engagement initial de 2 mois, puis
          se renouvelle de mois en mois. Chaque partie peut le résilier par écrit avec un préavis d’un mois, effectif au plus tôt à
          la fin de l’engagement initial.
        </p>
        <p>
          <strong>Contenu.</strong> Surveillance et alertes en cas d’erreur, correction des pannes, relance des traitements
          interrompus, ajustements courants (délais, textes, paramètres) dans la limite prévue au devis, mises à jour rendues
          nécessaires par l’évolution des règles applicables au client lorsqu’elles restent limitées, assistance par e-mail.
        </p>
        <p>
          <strong>Délai d’intervention.</strong> Les incidents bloquants sont pris en charge sous 48 heures ouvrées après leur
          signalement ou leur détection.
        </p>
        <p>
          <strong>Exclusions.</strong> Nouvelles automatisations, refonte d’une automatisation existante, pannes et changements
          imputables à des services tiers, modifications faites par le client sur la structure de ses outils sans en avoir informé
          Mobem Solutions. Ces interventions font l’objet d’un devis.
        </p>
      </>
    ),
  },
  {
    id: "reversibilite",
    title: "Fin de contrat et réversibilité",
    content: (
      <>
        <p>À la fin de l’abonnement de maintenance, pour quelque cause que ce soit :</p>
        <LegalList
          items={[
            "lorsque Mobem Solutions héberge les automatisations, elle remet au client, dans un délai de 30 jours, les fichiers de ses automatisations et leur documentation, et l’accompagne lors d’une séance d’une heure pour les installer sur ses propres comptes ;",
            "à l’issue de ce délai, Mobem Solutions supprime de son espace les automatisations et les connexions du client, et le confirme par écrit sur demande ;",
            "les données du client n’ont jamais quitté ses propres outils et y restent disponibles.",
          ]}
        />
        <p>Lorsque le client héberge les automatisations, elles restent sur ses comptes et Mobem Solutions supprime ses accès.</p>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspension",
    content: (
      <p>
        Si une facture reste impayée 15 jours après son échéance, Mobem Solutions peut suspendre les prestations en cours, y
        compris la maintenance, après en avoir informé le client par écrit. Les automatisations continuent de fonctionner pendant la
        suspension. Si l’impayé dure plus de 60 jours, Mobem Solutions peut résilier le contrat ; l’article 10 s’applique alors.
      </p>
    ),
  },
  {
    id: "client",
    title: "Obligations du client",
    content: (
      <>
        <p>Le client s’engage à :</p>
        <LegalList
          items={[
            "fournir dans les délais convenus les accès, informations et documents nécessaires, tout retard décalant les délais d’autant ;",
            "participer à la recette et valider le contenu des messages et documents envoyés par les automatisations ;",
            "garantir l’exactitude des données saisies dans ses outils, dont dépendent les envois ;",
            "informer Mobem Solutions avant toute modification de la structure de ses outils (colonnes, onglets, comptes) ;",
            "respecter ses propres obligations envers les personnes dont il traite les données, notamment leur information et, si nécessaire, le recueil de leur consentement ;",
            "valider humainement les résultats de toute étape faisant appel à l’intelligence artificielle, sauf accord contraire.",
          ]}
        />
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Pour les données traitées dans les automatisations, le client est responsable du traitement et Mobem Solutions sous-traitant
        au sens de l’article 28 du RGPD. Un contrat de sous-traitance, signé avec le devis, précise les données concernées, les
        mesures de sécurité, les sous-traitants ultérieurs et le sort des données en fin de contrat. Mobem Solutions privilégie des
        services hébergés dans l’Union européenne et informe le client avant tout recours à un nouveau sous-traitant. Voir aussi la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <p>
        Après paiement complet, le client peut utiliser et modifier librement les automatisations réalisées spécifiquement pour lui.
        Mobem Solutions conserve la propriété de ses méthodes, modules réutilisables et modèles, que le client peut utiliser
        uniquement pour faire fonctionner les automatisations livrées.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <>
        <p>
          Mobem Solutions est tenue d’une obligation de moyens. Les gains de temps annoncés sont des estimations ; seuls les gains
          mesurés après mise en service font foi.
        </p>
        <p>
          Les automatisations aident le client à produire et conserver des preuves de ses pratiques. Elles ne garantissent pas
          l’obtention, le maintien ou le renouvellement d’une certification (notamment Qualiopi), qui dépendent de l’ensemble des
          pratiques du client et de l’appréciation de l’auditeur.
        </p>
        <p>
          Mobem Solutions n’est pas responsable des conséquences de données inexactes saisies par le client, de contenus validés par
          lui, ni des interruptions de services tiers.
        </p>
        <p>
          La responsabilité de Mobem Solutions est limitée aux sommes perçues au titre du contrat concerné au cours des 12 derniers
          mois et exclut les préjudices indirects (perte de chiffre d’affaires, de clientèle ou d’image).
        </p>
      </>
    ),
  },
  {
    id: "references",
    title: "Références",
    content: (
      <p>
        Mobem Solutions ne cite le nom, le logo ou les résultats d’un client qu’avec son accord écrit préalable, révocable à tout
        moment.
      </p>
    ),
  },
  {
    id: "confidentialite",
    title: "Confidentialité",
    content: <p>Chaque partie garde confidentielles les informations échangées pendant la mission et pendant 2 ans après sa fin.</p>,
  },
  {
    id: "force-majeure",
    title: "Force majeure",
    content: (
      <p>
        Aucune partie n’est responsable d’un manquement causé par un événement de force majeure au sens de l’article 1218 du Code
        civil. Si l’empêchement dure plus de 30 jours, chaque partie peut résilier le contrat par écrit.
      </p>
    ),
  },
  {
    id: "resiliation",
    title: "Résiliation pour manquement",
    content: (
      <p>
        En cas de manquement grave d’une partie, l’autre peut résilier le contrat par lettre recommandée avec avis de réception, 15
        jours après une mise en demeure restée sans effet. Si le client résilie sans faute de Mobem Solutions, les sommes facturées
        restent dues et le travail réalisé est facturé au prorata.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable et litiges",
    content: (
      <p>
        Les CGV sont soumises au droit français. Les parties recherchent d’abord une solution amiable. À défaut, les tribunaux de
        Nantes sont seuls compétents. Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    ),
  },
]

export default function CgvPage() {
  return (
    <LegalLayout
      current="/cgv"
      title="Conditions générales de vente"
      intro={<p>Comment se déroulent nos missions d’automatisation, du diagnostic gratuit à la maintenance.</p>}
      updated="En vigueur au 26 octobre 2026"
      sections={SECTIONS}
    />
  )
}
