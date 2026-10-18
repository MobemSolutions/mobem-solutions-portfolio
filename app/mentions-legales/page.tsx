import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalCard, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Mentions légales | Mobem Solutions",
  description: "Mentions légales du site mobem-solutions.com — Mobem Solutions, studio d'automatisation des tâches administratives à Nantes.",
  alternates: { canonical: "https://mobem-solutions.com/mentions-legales" },
}

const SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le site <strong>mobem-solutions.com</strong> est édité par <strong>Arnaud Clavier</strong>, entrepreneur individuel
          exerçant sous le nom commercial <strong>Mobem Solutions</strong> (automatisation des tâches administratives des TPE et PME).
        </p>
        <LegalCard>
          <p><strong>Arnaud Clavier — Mobem Solutions</strong></p>
          <p>Entrepreneur individuel</p>
          <p>SIRET : 992 858 456 00013 · Pornic (44)</p>
          <p>
            Contact : <a href="mailto:contact@mobem-solutions.com">contact@mobem-solutions.com</a>
          </p>
        </LegalCard>
      </>
    ),
  },
  {
    id: "publication",
    title: "Directeur de la publication",
    content: (
      <p>
        Le directeur de la publication est <strong>Arnaud Clavier</strong>. Il peut être joint à l&apos;adresse <a href="mailto:contact@mobem-solutions.com">contact@mobem-solutions.com</a>.
      </p>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé par :</p>
        <LegalCard>
          <p><strong>Vercel Inc.</strong></p>
          <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          <p>vercel.com</p>
        </LegalCard>
        <p>
          Cet hébergement concerne uniquement le présent site. Les automatisations réalisées pour les clients sont hébergées
          séparément : sur le serveur de Mobem Solutions, situé dans l&apos;Union européenne, ou sur les comptes du client selon son
          choix.
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
          L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos, schémas d&apos;automatisation, icônes) est la
          propriété de Mobem Solutions, sauf mention contraire. Toute reproduction, représentation, modification ou adaptation,
          totale ou partielle, est interdite sans autorisation écrite préalable.
        </p>
        <p>
          Toute exploitation non autorisée constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de
          la propriété intellectuelle.
        </p>
        <p>
          Les noms d&apos;outils cités (Gmail, Outlook, Google Sheets, Excel, Google Drive, Notion, Calendly…) sont des marques de
          leurs propriétaires respectifs. Leur mention indique une compatibilité et n&apos;implique aucun partenariat.
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Mobem Solutions traite les données personnelles conformément au RGPD (UE 2016/679) et à la loi Informatique et
        Libertés. Le détail des traitements, des durées de conservation et de vos droits figure dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    content: (
      <p>
        Le présent site et ses mentions légales sont soumis au droit français. Tout litige relatif à son utilisation relève de la
        compétence exclusive des tribunaux de Nantes.
      </p>
    ),
  },
]

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      current="/mentions-legales"
      title="Mentions légales"
      intro={<p>Qui édite ce site, qui l&apos;héberge, et les règles qui s&apos;appliquent à son contenu.</p>}
      updated="Mise à jour : octobre 2026"
      sections={SECTIONS}
    />
  )
}
