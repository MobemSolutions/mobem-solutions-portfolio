import type { Metadata } from "next"
import Link from "next/link"
import { LegalLayout, LegalList, type LegalSection } from "@/components/legal/legal-layout"

export const metadata: Metadata = {
  title: "Mentions légales | Mobem Solutions",
  description: "Mentions légales du site mobem-solutions.com : éditeur, hébergement, propriété intellectuelle et droit applicable.",
  alternates: { canonical: "https://mobem-solutions.com/mentions-legales" },
}

const SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le site <strong>mobem-solutions.com</strong> est édité par <strong>Arnaud Clavier</strong>, entrepreneur individuel (EI),
          exerçant sous le nom commercial <strong>Mobem Solutions</strong>.
        </p>
        <LegalList
          items={[
            "Adresse : Pornic (44210), France",
            "SIRET : 992 858 456 00013",
            "Immatriculation : Registre national des entreprises (RNE)",
            "TVA : TVA non applicable, article 293 B du Code général des impôts",
            <>
              E-mail : <a href="mailto:contact@mobem-solutions.com">contact@mobem-solutions.com</a>
            </>,
            <>
              Téléphone : <a href="tel:+33754372936">+33 7 54 37 29 36</a>
            </>,
          ]}
        />
        <p>
          Directeur de la publication : <strong>Arnaud Clavier</strong>.
        </p>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement du site",
    content: (
      <>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Site :
          vercel.com.
        </p>
        <p>
          Les automatisations réalisées pour les clients ne sont pas hébergées avec le site. Selon le choix du client, elles
          fonctionnent soit dans un espace dédié géré par Mobem Solutions sur des serveurs situés dans l’Union européenne, soit sur
          les comptes du client. Le détail figure dans les <Link href="/cgv">conditions générales de vente</Link> et dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
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
          Les textes, visuels, logos, schémas d’automatisation et icônes du site appartiennent à Mobem Solutions, sauf mention
          contraire. Toute reproduction ou adaptation sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les noms d’outils cités (Gmail, Google Sheets, Notion, n8n, etc.) sont des marques de leurs propriétaires. Leur mention
          indique une compatibilité technique, pas un partenariat.
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Le traitement des données personnelles collectées sur le site est décrit dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    content: (
      <p>
        Le présent site et ses mentions sont soumis au droit français. Tout litige relève de la compétence exclusive des tribunaux de
        Nantes.
      </p>
    ),
  },
]

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      current="/mentions-legales"
      title="Mentions légales"
      intro={<p>Qui édite ce site, où il est hébergé, et les règles qui s’y appliquent.</p>}
      updated="Dernière mise à jour : 26 octobre 2026"
      sections={SECTIONS}
    />
  )
}
