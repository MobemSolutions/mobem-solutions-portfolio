// Contenu éditorial du site Mobem Solutions — studio d'automatisation.
// Règle : aucun jargon (n8n, API, workflow, agent IA) dans les titres, boutons ou le hero.
// Tous les volumes horaires présentés sont des « exemples types », jamais des résultats clients.

export const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/15min"
/** Démo de 20 minutes : une automatisation montrée en direct, sur un des métiers ou un autre cas */
export const DEMO_URL = "https://calendly.com/arnaud-clavier-mobem-solutions/demo-vos-relances-et-suivis-administratifs-en-auto"

export const TRUST_LINE = "Vos outils restent les vôtres. Hébergé en Europe, chez nous ou chez vous."

/** Icônes disponibles pour les schémas (associées aux composants lucide dans flow-demo.tsx) */
export type FlowIcon =
  | "user-plus" | "send" | "pen" | "clipboard" | "folder-check"
  | "calendar" | "bell" | "file-up" | "shield"
  | "mail" | "tags" | "receipt" | "check"
  | "search" | "zap" | "gauge" | "wrench"

/** Une étape du schéma : une icône, un ou deux mots. Le premier nœud est le déclencheur. */
export interface FlowNode {
  icon: FlowIcon
  label: string
}

export interface BeforeAfter {
  before: string
  after: string
}

export interface TradeTask {
  icon: FlowIcon
  title: string
  text: string
}

export interface Trade {
  slug: string
  href: string
  navLabel: string
  audience: string
  eyebrow: string
  headline: string
  intro: string
  flow: FlowNode[]
  beforeAfter: BeforeAfter
  tasks: TradeTask[]
  faq: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

export const TRADES: Trade[] = [
  {
    slug: "organismes-de-formation",
    href: "/metiers/organismes-de-formation",
    navLabel: "Organismes de formation",
    audience: "Organismes de formation certifiés Qualiopi",
    eyebrow: "Organismes de formation",
    headline: "Vos preuves Qualiopi se tiennent à jour toutes seules",
    intro:
      "Convocations, émargements, questionnaires à chaud et à froid, relances OPCO : chaque session laisse des traces à classer. Nous les faisons partir et se ranger d'elles-mêmes, pour que l'audit se prépare sans courir après les documents.",
    flow: [
      { icon: "user-plus", label: "Inscription" },
      { icon: "send", label: "Convocation" },
      { icon: "pen", label: "Émargement" },
      { icon: "clipboard", label: "Questionnaire" },
      { icon: "folder-check", label: "Preuve rangée" },
    ],
    beforeAfter: { before: "6 h / mois", after: "45 min / mois" },
    tasks: [
      {
        icon: "send",
        title: "Convocations et rappels",
        text: "Dès qu'un stagiaire est inscrit, la convocation part avec le programme, le lieu et les horaires. Un rappel suit la veille.",
      },
      {
        icon: "pen",
        title: "Émargements et attestations",
        text: "Les feuilles d'émargement sont collectées et rangées par session. Les attestations de fin de formation sont générées et envoyées.",
      },
      {
        icon: "clipboard",
        title: "Questionnaires de satisfaction",
        text: "Questionnaire à chaud le dernier jour, à froid quelques semaines après. Les retardataires sont relancés, les réponses consolidées.",
      },
      {
        icon: "file-up",
        title: "Dossiers OPCO",
        text: "Les pièces attendues par l'OPCO sont rassemblées dans le bon dossier et les relances partent à la bonne date.",
      },
    ],
    faq: [
      {
        question: "Faut-il changer de logiciel de gestion de formation ?",
        answer:
          "Non. Nous partons de vos outils actuels : votre tableur, votre messagerie, votre logiciel de gestion s'il en a un. L'automatisation se branche dessus.",
      },
      {
        question: "Les preuves sont-elles utilisables le jour de l'audit ?",
        answer:
          "C'est l'objectif : chaque preuve est rangée par session et par indicateur dans votre propre espace de stockage, avec un tableau de suivi qui montre ce qui manque.",
      },
    ],
    metaTitle: "Automatisation pour organismes de formation Qualiopi | Mobem Solutions",
    metaDescription:
      "Convocations, émargements, preuves d'audit, relances OPCO : vos tâches Qualiopi tournent toutes seules, sur vos propres outils. Diagnostic gratuit.",
  },
  {
    slug: "courtiers-assurance",
    href: "/metiers/courtiers-assurance",
    navLabel: "Courtiers",
    audience: "Courtiers en assurance",
    eyebrow: "Courtiers en assurance",
    headline: "Les pièces arrivent, les échéances se relancent",
    intro:
      "Collecte des pièces, relances avant échéance, traçabilité du devoir de conseil : votre cabinet passe des heures à courir après les justificatifs. Nous automatisons la collecte et le suivi, et vos chargés de clientèle retrouvent du temps pour conseiller.",
    flow: [
      { icon: "calendar", label: "Échéance" },
      { icon: "bell", label: "Relance" },
      { icon: "file-up", label: "Pièces reçues" },
      { icon: "folder-check", label: "Classement" },
      { icon: "shield", label: "Conseil tracé" },
    ],
    beforeAfter: { before: "8 h / mois", after: "1 h / mois" },
    tasks: [
      {
        icon: "file-up",
        title: "Collecte des pièces",
        text: "Le client reçoit la liste exacte des justificatifs à fournir. Chaque pièce reçue est renommée et rangée dans son dossier.",
      },
      {
        icon: "calendar",
        title: "Relances d'échéances",
        text: "Les contrats qui arrivent à échéance sont repérés à l'avance et la relance part au bon moment, avec le bon interlocuteur en copie.",
      },
      {
        icon: "shield",
        title: "Devoir de conseil",
        text: "Les recueils de besoins et les documents remis sont horodatés et archivés : la trace existe sans saisie supplémentaire.",
      },
      {
        icon: "bell",
        title: "Pièces manquantes",
        text: "Un tableau montre en un coup d'œil les dossiers incomplets. Les relances partent seules, jusqu'à réception.",
      },
    ],
    faq: [
      {
        question: "Et si mon client répond à côté ou envoie la mauvaise pièce ?",
        answer:
          "Le dossier reste marqué incomplet et vous êtes prévenu. L'automatisation ne remplace pas votre jugement : elle vous évite de chercher où en est chaque dossier.",
      },
      {
        question: "Fonctionne-t-il avec mon outil de gestion de cabinet ?",
        answer:
          "Nous le vérifions pendant le diagnostic. Dans la plupart des cas, nous nous branchons sur votre messagerie, votre stockage de documents et votre outil métier.",
      },
    ],
    metaTitle: "Automatisation pour courtiers en assurance | Mobem Solutions",
    metaDescription:
      "Collecte de pièces, relances d'échéances, traçabilité du devoir de conseil : automatisées sur vos propres outils. Diagnostic gratuit de 45 min.",
  },
  {
    slug: "cabinets-comptables",
    href: "/metiers/cabinets-comptables",
    navLabel: "Cabinets comptables",
    audience: "Cabinets d'expertise comptable",
    eyebrow: "Cabinets d'expertise comptable",
    headline: "Les justificatifs manquants se réclament d'eux-mêmes",
    intro:
      "Relance des pièces manquantes, tri de la boîte mail, onboarding des nouveaux clients, factures reçues à classer : autant de tâches qui reviennent chaque mois. Nous les automatisons pour que vos collaborateurs se concentrent sur la production et le conseil.",
    flow: [
      { icon: "mail", label: "Mail reçu" },
      { icon: "tags", label: "Tri client" },
      { icon: "receipt", label: "Facture classée" },
      { icon: "bell", label: "Relance pièce" },
      { icon: "check", label: "Dossier complet" },
    ],
    beforeAfter: { before: "10 h / mois", after: "1 h 30 / mois" },
    tasks: [
      {
        icon: "bell",
        title: "Relance des pièces manquantes",
        text: "Chaque client reçoit la liste de ce qui manque pour sa période, puis une relance tant que ce n'est pas arrivé.",
      },
      {
        icon: "mail",
        title: "Tri de la boîte mail",
        text: "Les mails entrants sont classés par client et par nature : facture, relevé, question, urgence. Plus rien ne se perd.",
      },
      {
        icon: "user-plus",
        title: "Onboarding client",
        text: "Lettre de mission, liste des documents, accès : le nouveau client reçoit tout dans l'ordre, sans que personne n'ait à y penser.",
      },
      {
        icon: "receipt",
        title: "Factures reçues",
        text: "Les factures sont extraites des mails, renommées et déposées dans le bon dossier. Utile aussi pour préparer la facture électronique.",
      },
    ],
    faq: [
      {
        question: "Est-ce compatible avec la facture électronique ?",
        answer:
          "Oui, c'est même un bon moment pour s'y préparer : nous organisons vos flux de factures reçues pour qu'ils soient prêts à basculer vers votre plateforme agréée.",
      },
      {
        question: "Mes collaborateurs devront-ils apprendre un nouvel outil ?",
        answer:
          "Non. Ils continuent à travailler dans leur messagerie et leurs dossiers habituels. Ce qui change, c'est ce qu'ils n'ont plus à faire.",
      },
    ],
    metaTitle: "Automatisation pour cabinets d'expertise comptable | Mobem Solutions",
    metaDescription:
      "Relance des pièces manquantes, tri de la boîte mail, onboarding client, factures reçues : automatisés sur vos propres outils. Diagnostic gratuit.",
  },
]

export function beforeAfterLine(data: BeforeAfter) {
  return `Avant : ${data.before} · Après : ${data.after} — exemple type`
}

export function getTrade(slug: string) {
  return TRADES.find((t) => t.slug === slug)
}

// Chiffres de marché — chacun avec sa source affichée.
export const FIGURES: {
  value: string
  countFrom: number
  countTo: number
  suffix: string
  label: string
  source: string
  icon: "building" | "receipt" | "clock"
}[] = [
  {
    value: "40 %",
    countFrom: 0,
    countTo: 40,
    suffix: " %",
    label: "des TPE-PME utilisent déjà l'IA",
    source: "Baromètre France Num 2026",
    icon: "building",
  },
  {
    value: "2027",
    countFrom: 2000,
    countTo: 2027,
    suffix: "",
    label: "facture électronique obligatoire pour toutes les PME",
    source: "economie.gouv.fr",
    icon: "receipt",
  },
  {
    value: "8 h",
    countFrom: 0,
    countTo: 8,
    suffix: " h",
    label: "par semaine d'administratif pour un dirigeant de TPE",
    source: "Enquête SDI auprès de 2 140 dirigeants de TPE",
    icon: "clock",
  },
]

export const METHOD_FLOW: FlowNode[] = [
  { icon: "search", label: "Diagnostiquer" },
  { icon: "zap", label: "Automatiser" },
  { icon: "gauge", label: "Mesurer" },
  { icon: "wrench", label: "Maintenir" },
]

export const METHOD_STEPS = [
  {
    num: "01",
    title: "Diagnostiquer",
    text: "45 minutes pour lister vos tâches répétitives, estimer le temps qu'elles prennent et repérer celles qui valent la peine d'être automatisées.",
  },
  {
    num: "02",
    title: "Automatiser",
    text: "Nous mettons l'automatisation en service, reliée à vos outils actuels, hébergée chez nous ou chez vous. Vous validez chaque étape avant la mise en route.",
  },
  {
    num: "03",
    title: "Mesurer",
    text: "Nous comparons le temps passé avant et après. Vous savez combien d'heures vous récupérez chaque mois, chiffres à l'appui.",
  },
  {
    num: "04",
    title: "Maintenir",
    text: "Nous surveillons, nous ajustons quand vos outils changent, et vous êtes alerté si une automatisation échoue.",
  },
]

export const TRUST_POINTS = [
  { title: "Vos fichiers restent dans vos outils", text: "Mails, documents et tableaux restent dans Gmail, Drive ou votre logiciel métier." },
  { title: "Contrat RGPD", text: "Un accord de traitement des données encadre chaque intervention." },
  { title: "Accès révocables", text: "Vous pouvez retirer nos accès à vos outils à tout moment." },
  { title: "Alerte si une automatisation échoue", text: "Vous êtes prévenu immédiatement, et nous aussi." },
]

/** Les deux façons d'héberger une automatisation : chez Mobem Solutions (par défaut) ou chez le client. */
export const HOSTING_OPTIONS = [
  {
    name: "Chez Mobem Solutions",
    badge: "Par défaut",
    text: "Votre automatisation tourne sur notre serveur, dans un espace dédié à votre entreprise. Rien à installer de votre côté.",
    items: ["Une automatisation dédiée à votre entreprise", "Serveur situé en Europe", "Mises à jour gérées par nous"],
  },
  {
    name: "Chez vous",
    badge: "Si vous préférez",
    text: "Nous installons l'automatisation sur vos propres comptes ou votre serveur. Vous gardez la main sur tout.",
    items: ["Installée sur vos comptes", "Vous détenez tous les accès", "Documentation complète remise"],
  },
]

export interface Plan {
  slug: string
  href: string
  name: string
  icon: "diagnostic" | "pilote" | "pack" | "maintenance"
  price: string
  unit: string
  text: string
  items: string[]
  featured?: boolean
  /** Page dédiée */
  tagline: string
  forWho: string
  steps: { title: string; text: string }[]
  deliverables: string[]
  faq: { question: string; answer: string }[]
}

export const PRICING: Plan[] = [
  {
    slug: "diagnostic",
    href: "/tarifs/diagnostic",
    name: "Diagnostic gratuit",
    icon: "diagnostic",
    price: "0 €",
    unit: "45 min",
    text: "Nous listons vos tâches répétitives et estimons les heures récupérables. Sans engagement.",
    items: ["Inventaire des tâches", "Estimation des heures gagnées", "Recommandations écrites"],
    featured: true,
    tagline: "45 minutes pour savoir ce qui peut tourner tout seul chez vous.",
    forWho:
      "Vous sentez que des tâches répétitives vous prennent du temps chaque semaine, sans savoir lesquelles automatiser ni par où commencer.",
    steps: [
      { title: "Vous réservez un créneau", text: "En visio, ou à Nantes, au moment qui vous arrange." },
      { title: "Nous passons votre semaine en revue", text: "Relances, pièces, mails, factures : vous décrivez, nous posons les bonnes questions." },
      { title: "Vous recevez nos recommandations", text: "Par écrit : les tâches automatisables, le temps estimé pour chacune, et par quoi commencer." },
    ],
    deliverables: [
      "La liste de vos tâches répétitives",
      "Le temps qu'elles vous coûtent, estimé tâche par tâche",
      "Nos recommandations écrites, par ordre de priorité",
      "Aucun engagement, aucun devis imposé",
    ],
    faq: [
      { question: "Faut-il préparer quelque chose ?", answer: "Non. Pensez simplement aux tâches qui reviennent chaque semaine, nous ferons le reste ensemble." },
      {
        question: "Est-ce vraiment gratuit ?",
        answer: "Oui. Le diagnostic sert à vérifier qu'il y a des heures à gagner chez vous. S'il n'y en a pas, nous vous le disons.",
      },
    ],
  },
  {
    slug: "pilote",
    href: "/tarifs/pilote",
    name: "Pilote",
    icon: "pilote",
    price: "dès 900 € HT",
    unit: "une tâche",
    text: "Une première automatisation sur une tâche précise, pour mesurer le gain avant d'aller plus loin.",
    items: ["Une automatisation installée", "Mesure avant / après", "Prise en main de votre équipe"],
    tagline: "Une première automatisation, pour mesurer le gain avant d'aller plus loin.",
    forWho: "Vous voulez essayer sur une tâche précise, et voir le résultat en heures, avant d'engager davantage.",
    steps: [
      { title: "Nous choisissons la tâche", text: "Celle qui rend le plus d'heures pour le moins d'effort, repérée pendant le diagnostic." },
      { title: "Nous la construisons avec vous", text: "Reliée à vos outils, testée sur vos vrais cas. Vous validez chaque étape avant la mise en route." },
      { title: "Nous mesurons le gain", text: "Le temps passé avant et après, pour décider de la suite en connaissance de cause." },
    ],
    deliverables: [
      "Une automatisation en service, reliée à vos outils",
      "La mesure du temps gagné, avant / après",
      "Une prise en main pour votre équipe",
      "Hébergement en Europe, chez nous ou chez vous",
    ],
    faq: [
      {
        question: "Et si le gain n'est pas au rendez-vous ?",
        answer: "Vous le voyez dans la mesure, et vous décidez librement de la suite. Le pilote sert justement à vérifier avant d'aller plus loin.",
      },
      {
        question: "Comment le prix est-il fixé ?",
        answer: "Le devis est établi après le diagnostic, selon la tâche et les outils à connecter. Vous le validez avant que nous commencions.",
      },
    ],
  },
  {
    slug: "pack-metier",
    href: "/tarifs/pack-metier",
    name: "Pack métier",
    icon: "pack",
    price: "dès 2 500 € HT",
    unit: "plusieurs tâches",
    text: "Les automatisations clés de votre métier, pensées ensemble pour couvrir un processus complet.",
    items: ["Plusieurs automatisations reliées", "Tableau de suivi", "Documentation de vos flux"],
    tagline: "Les automatisations clés de votre métier, pensées ensemble.",
    forWho:
      "Plusieurs tâches d'un même processus vous prennent du temps : de l'inscription au bilan de formation, de la pièce reçue au dossier complet, de l'échéance à la relance.",
    steps: [
      { title: "Nous cartographions le processus", text: "Toutes les étapes, qui fait quoi, et où se perd le temps." },
      { title: "Nous automatisons étape par étape", text: "Chaque automatisation est reliée aux autres et validée avec vous avant la suivante." },
      { title: "Nous vous remettons le suivi", text: "Un tableau pour voir ce qui tourne, et une documentation claire de vos flux." },
    ],
    deliverables: [
      "Plusieurs automatisations reliées entre elles",
      "Un tableau de suivi de ce qui tourne",
      "La documentation de vos flux",
      "La mesure des heures gagnées sur tout le processus",
    ],
    faq: [
      {
        question: "Peut-on commencer directement par un pack ?",
        answer: "Oui, si le diagnostic montre un processus complet à automatiser. Sinon, nous recommandons de commencer par un pilote.",
      },
      { question: "Combien de tâches dans un pack ?", answer: "Cela dépend de votre métier : le devis détaille chaque automatisation prévue." },
    ],
  },
  {
    slug: "maintenance",
    href: "/tarifs/maintenance",
    name: "Maintenance",
    icon: "maintenance",
    price: "dès 90 € HT",
    unit: "/ mois",
    text: "Surveillance, ajustements quand vos outils évoluent, et alerte si quelque chose échoue.",
    items: ["Surveillance continue", "Alerte en cas d'échec", "Ajustements inclus"],
    tagline: "Vos automatisations continuent de tourner, même quand vos outils changent.",
    forWho: "Vos automatisations sont en place et vous voulez qu'elles restent fiables, sans avoir à y penser.",
    steps: [
      { title: "Nous surveillons", text: "Chaque automatisation est suivie en continu." },
      { title: "Vous êtes alerté, nous corrigeons", text: "Si quelque chose échoue, vous êtes prévenu, et nous relançons le traitement." },
      { title: "Nous ajustons", text: "Quand un de vos outils évolue, nous adaptons l'automatisation." },
    ],
    deliverables: ["Une surveillance continue", "Une alerte en cas d'échec", "Les ajustements inclus", "Un interlocuteur unique"],
    faq: [
      {
        question: "La maintenance est-elle obligatoire ?",
        answer: "Non. Sans maintenance, vous gardez une documentation claire de ce qui a été installé.",
      },
      {
        question: "Que se passe-t-il quand un outil change ?",
        answer: "Nous adaptons l'automatisation dans le cadre de la maintenance, sans surcoût pour les ajustements courants.",
      },
    ],
  },
]

export const getPlan = (slug: string) => PRICING.find((p) => p.slug === slug)

export const FOUNDER = {
  name: "Arnaud Clavier",
  role: "Fondateur · Concepteur-développeur en automatisation",
  bio: [
    "Mobem Solutions conçoit chaque automatisation de bout en bout : diagnostic, construction, mise en service et suivi. Un seul interlocuteur, du premier appel à la maintenance.",
  ],
  linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
  email: "arnaud.clavier@mobem-solutions.com",
  photo: "/team/arnaud.jpg",
}

export const FAQ = [
  {
    question: "Faut-il changer nos outils ?",
    answer:
      "Non. Nous automatisons ce que vous utilisez déjà : votre messagerie, vos tableurs, votre stockage de documents, votre logiciel métier. Si un outil manque vraiment, nous vous le disons pendant le diagnostic.",
  },
  {
    question: "Où sont nos données ?",
    answer:
      "Vos fichiers restent dans vos outils habituels. L'automatisation, elle, tourne par défaut sur notre serveur en Europe, dans un espace dédié à votre entreprise ; si vous préférez, nous l'installons sur vos propres comptes. Dans les deux cas, un contrat RGPD encadre notre intervention.",
  },
  {
    question: "Que se passe-t-il si une automatisation échoue ?",
    answer:
      "Vous êtes alerté, et nous aussi. Avec la maintenance, nous corrigeons et relançons le traitement. Sans maintenance, vous gardez une documentation claire de ce qui a été installé.",
  },
  {
    question: "Combien d'heures peut-on vraiment récupérer ?",
    answer:
      "Ça dépend de vos tâches, c'est tout l'objet du diagnostic. Les volumes affichés sur ce site sont des exemples types : pour vous, nous mesurons le temps passé avant et après, et vous donnons le vrai chiffre.",
  },
  {
    question: "Quels outils techniques utilisez-vous ?",
    answer:
      "Sous le capot, nous nous appuyons principalement sur n8n, un outil d'automatisation open source que nous hébergeons pour vous en Europe, ou installons chez vous, et sur les API de vos logiciels. Quand c'est utile, un agent IA lit et trie des documents ou des mails — toujours avec une validation humaine sur ce qui compte.",
  },
  {
    question: "Utilisez-vous l'intelligence artificielle ?",
    answer:
      "Seulement quand elle fait gagner du temps sans prendre de risque : classer un mail, lire une facture, résumer une pièce. Le reste est de l'automatisation classique, prévisible et vérifiable.",
  },
]
