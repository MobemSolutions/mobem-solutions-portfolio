export type Case = {
  idx: string
  client: string
  sector: string
  tag: string
  kpi: string
  year: string
  cat: string
  slug: string
  desc: string
  stats: [string, string][]
  kpis: { v: string; l: string; d: string }[]
  body: {
    title: string
    content: string
  }[]
  stack: string[]
  quote: { text: string; author: string; role: string }
  coverImage?: { asset: any; alt?: string }
  ficheImage?: { asset: any; alt?: string }
  prev?: string
  next?: string
}

export const CASES: Case[] = [
  {
    idx: "01", client: "PME Industrielle", sector: "Industrie · Loire-Atlantique", tag: "Refonte + SEO", kpi: "+241% trafic",
    year: "2025", cat: "refonte", slug: "atelier-vernay",
    desc: "Refonte complète d'un site corporate vieillissant pour une PME industrielle. Architecture SEO repensée, performance pour usage industriel sur réseaux faibles.",
    stats: [["+241%", "Trafic organique"], ["1.2s", "LCP mobile"], ["96", "Lighthouse"]],
    kpis: [
      { v: "+241%", l: "Trafic organique en 6 mois", d: "" },
      { v: "1.2s",  l: "LCP mobile (Core Web Vitals)", d: "" },
      { v: "96",    l: "Score Lighthouse Performance", d: "" },
      { v: "×3.4",  l: "Demandes de devis qualifiées", d: "" },
    ],
    body: [
      { title: "01 · Contexte terrain", content: "PME industrielle spécialisée dans le tournage de précision pour l'aéronautique et la défense. 42 collaborateurs, un atelier de 2 800 m², un carnet de commandes solide — mais un site web datant de 2014, lent, mal référencé et déconnecté de la réalité commerciale. Les prospects ne trouvaient plus l'entreprise sur Google, et quand ils arrivaient sur le site, ils repartaient sans laisser de trace. Le formulaire de contact recevait moins de 3 demandes par mois." },
      { title: "02 · Diagnostic", content: "Architecture SEO inexistante : aucune page ciblant les certifications (EN 9100, ISO 9001). Performance désastreuse : 8.4s de LCP sur mobile, 22s pour atteindre l'interactivité. Aucun élément de réassurance : pas de chiffres clés, pas de logos clients, pas de certifications visibles. Formulaire générique sans qualification du besoin." },
      { title: "03 · Prescription", content: "Reconstruction de l'arborescence autour de 18 pages métier × certification × secteur. Refonte de la performance technique : passage à un stack léger (Astro + Vercel), images WebP, polices auto-hébergées. Remplacement du formulaire générique par un parcours qualifié en 3 étapes." },
      { title: "04 · Exécution par sprints", content: "11 semaines, 5 sprints de 2 semaines, chacun validé sur une métrique précise. Sprint 1 : stack technique + design system. Sprint 2 : 6 pages pilier. Sprint 3 : 12 pages secondaires. Sprint 4 : refonte conversion + CRM. Sprint 5 : mise en ligne avec redirections 301." },
      { title: "05 · Résultats à 12 mois", content: "+241% de trafic organique vs même période n-1. ×3.4 sur le nombre de demandes de devis qualifiées (de 3/mois à 10/mois). 2 nouveaux comptes stratégiques signés directement via le formulaire devis. 3 nouvelles certifications mises en avant ont attiré des contacts qualifiés inattendus." },
    ],
    stack: ["Astro", "TypeScript", "Tailwind", "Sanity CMS", "Vercel", "HubSpot CRM", "Plausible", "Resend"],
    quote: { text: "", author: "", role: "" },
    next: "cabinet-lefranc",
  },
  {
    idx: "02", client: "Cabinet d'Avocats", sector: "Services pro. · Nantes", tag: "Site essentiel", kpi: "Livré en 8 j",
    year: "2025", cat: "essentiel", slug: "cabinet-lefranc",
    desc: "Site essentiel pour cabinet d'avocats. Editorial sobre, prise de RDV en ligne, conformité RGPD intégrale.",
    stats: [["1.2s", "LCP"], ["100", "Accessibilité"], ["8j", "Délai livraison"]],
    kpis: [
      { v: "1.2s",  l: "LCP mobile", d: "" },
      { v: "100",   l: "Score Accessibilité", d: "" },
      { v: "8 j",   l: "Délai de livraison", d: "" },
      { v: "RGPD",  l: "Conformité intégrale", d: "" },
    ],
    body: [
      { title: "01 · Contexte", content: "Cabinet d'avocats spécialisé en droit des affaires. Un cabinet reconnu localement, mais une présence web inexistante qui les excluait de la recherche digitale." },
      { title: "02 · Diagnostic", content: "Aucun site web actif. Présence numérique limitée à un annuaire professionnel. Concurrents bien positionnés sur les requêtes locales. Besoin urgent de crédibilité digitale." },
      { title: "03 · Prescription", content: "Site essentiel en 8 jours. Architecture sobre et professionnelle. Prise de RDV en ligne. Pages SEO ciblant les requêtes locales en droit des affaires." },
      { title: "04 · Résultats", content: "LCP mobile à 1.2s. Score d'accessibilité 100/100. Mise en ligne en 8 jours. Conformité RGPD intégrale avec politique de confidentialité et mentions légales." },
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Calendly", "Resend"],
    quote: { text: "", author: "", role: "" },
    prev: "atelier-vernay", next: "maison-ferre",
  },
  {
    idx: "03", client: "Chambre d'Hôtes", sector: "Hospitalité · Bordeaux", tag: "Plateforme + CRM", kpi: "×3 réservations",
    year: "2026", cat: "plateforme", slug: "maison-ferre",
    desc: "Plateforme réservation chambres d'hôtes. Connexion Stripe, calendrier en temps réel, CRM intégré pour suivi clientèle.",
    stats: [["×3.1", "Conversion"], ["98", "Lighthouse"], ["320k€", "Revenus 2025"]],
    kpis: [
      { v: "×3.1",   l: "Taux de conversion", d: "" },
      { v: "98",     l: "Score Lighthouse", d: "" },
      { v: "320k€",  l: "Revenus en ligne 2025", d: "" },
      { v: "24/7",   l: "Réservation en ligne", d: "" },
    ],
    body: [
      { title: "01 · Contexte", content: "Propriété de charme bordelaise proposant 6 chambres d'hôtes haut de gamme. La gestion des réservations se faisait par email et téléphone, limitant la capacité et créant des frictions." },
      { title: "02 · Diagnostic", content: "Taux d'abandon élevé sur le formulaire de demande manuel. 40% des demandes reçues en dehors des heures d'ouverture sans réponse immédiate. Aucune visibilité sur les revenus prévisionnels." },
      { title: "03 · Prescription", content: "Plateforme de réservation en ligne avec disponibilités en temps réel, paiement Stripe sécurisé, confirmation automatique, et CRM intégré pour le suivi des clients récurrents." },
      { title: "04 · Résultats", content: "Taux de conversion multiplié par 3.1. 320k€ de revenus générés via la plateforme en 2025. Score Lighthouse 98. Réduction de 80% du temps de gestion administrative des réservations." },
    ],
    stack: ["Next.js", "Stripe", "Sanity", "Vercel", "Resend", "Google Calendar API"],
    quote: { text: "", author: "", role: "" },
    prev: "cabinet-lefranc", next: "groupe-penard",
  },
  {
    idx: "04", client: "Groupe BTP", sector: "BTP · ETI Vendée", tag: "Stratégie + DS", kpi: "WCAG AAA",
    year: "2026", cat: "refonte", slug: "groupe-penard",
    desc: "Design system + refonte multi-marques pour ETI du BTP. Cohérence sur 6 filiales, gouvernance éditoriale formalisée.",
    stats: [["AAA", "WCAG"], ["6", "Sites unifiés"], ["142", "Composants DS"]],
    kpis: [
      { v: "AAA",  l: "Conformité WCAG", d: "" },
      { v: "6",    l: "Sites unifiés", d: "" },
      { v: "142",  l: "Composants Design System", d: "" },
      { v: "11s",  l: "Durée de mission", d: "" },
    ],
    body: [
      { title: "01 · Contexte", content: "ETI du BTP regroupant 6 filiales en Vendée et Pays de la Loire. Chaque filiale avait son propre site web, sa propre identité, son propre CMS — une hétérogénéité impossible à maintenir." },
      { title: "02 · Diagnostic", content: "6 sites créés par 4 agences différentes sur 8 ans. Aucune cohérence visuelle ou éditoriale. Maintenance coûteuse et fragmentation des données analytiques. Absence de gouvernance contenu." },
      { title: "03 · Prescription", content: "Design system propriétaire (142 composants documentés), refonte des 6 sites sur une architecture unifiée, gouvernance éditoriale formalisée avec rôles et workflows CMS." },
      { title: "04 · Résultats", content: "142 composants documentés dans le design system. 6 sites unifiés avec identité cohérente. Conformité WCAG AAA. Réduction de 65% du temps de maintenance mensuel." },
    ],
    stack: ["Next.js", "Storybook", "Sanity", "Vercel", "Figma", "GitHub Actions"],
    quote: { text: "", author: "", role: "" },
    prev: "maison-ferre", next: "studio-carene",
  },
  {
    idx: "05", client: "Cabinet Architecture", sector: "Architecture · Rennes", tag: "Portfolio sur mesure", kpi: "94 Lighthouse",
    year: "2025", cat: "plateforme", slug: "studio-carene",
    desc: "Portfolio architecte avec rendu immersif des projets. Galeries plein écran, animations subtiles, WebP optimisé.",
    stats: [["94", "Lighthouse"], ["+58%", "Temps moyen"], ["12", "Projets en ligne"]],
    kpis: [
      { v: "94",    l: "Score Lighthouse", d: "" },
      { v: "+58%",  l: "Temps moyen sur le site", d: "" },
      { v: "12",    l: "Projets en ligne", d: "" },
      { v: "WebP",  l: "Images optimisées", d: "" },
    ],
    body: [
      { title: "01 · Contexte", content: "Cabinet d'architecture primé, spécialisé dans la réhabilitation de patrimoine industriel. Le portfolio existant était un PDF envoyé par email — inadapté pour des prospects exigeants." },
      { title: "02 · Diagnostic", content: "Aucun site web. Dépendance aux plateformes généralistes (Behance) qui dilue l'identité. Impossibilité de contrôler la narration autour de chaque projet." },
      { title: "03 · Prescription", content: "Portfolio immersif avec galeries plein écran, navigation par projet, pages de cas détaillées, et animations GSAP calibrées pour ne pas impacter les performances Core Web Vitals." },
      { title: "04 · Résultats", content: "Score Lighthouse 94. Temps moyen sur le site +58% vs benchmark sectoriel. 12 projets présentés avec narration complète. Demandes de candidature spontanées multipliées par 2." },
    ],
    stack: ["Astro", "GSAP", "Cloudinary", "Vercel", "Sanity"],
    quote: { text: "", author: "", role: "" },
    prev: "groupe-penard", next: "boucherie-marchand",
  },
  {
    idx: "06", client: "Boucherie Artisanale", sector: "Commerce · Lyon", tag: "Site essentiel + SEO", kpi: "#1 Google local",
    year: "2025", cat: "seo", slug: "boucherie-marchand",
    desc: "Boucherie traditionnelle propulsée en première position locale. Fiche Google optimisée, schémas LocalBusiness, photos métier.",
    stats: [["#1", "Google local"], ["+412", "Avis Google"], ["+86%", "Appels reçus"]],
    kpis: [
      { v: "#1",    l: "Position Google local", d: "" },
      { v: "+412",  l: "Avis Google en 6 mois", d: "" },
      { v: "+86%",  l: "Appels téléphoniques", d: "" },
      { v: "1.4s",  l: "LCP mobile", d: "" },
    ],
    body: [
      { title: "01 · Contexte", content: "Boucherie artisanale tenue depuis 1978, troisième génération aux commandes. Une clientèle fidèle mais vieillissante, et une concurrence de grandes surfaces en expansion." },
      { title: "02 · Diagnostic", content: "Aucune présence numérique. Fiche Google non revendiquée. 0 avis en ligne malgré une réputation locale excellente. L'établissement était invisible pour les nouveaux arrivants dans le quartier." },
      { title: "03 · Prescription", content: "Site essentiel optimisé SEO local, stratégie Google Business Profile, schémas LocalBusiness, campagne d'activation des avis clients, photos professionnelles métier." },
      { title: "04 · Résultats", content: "#1 sur 'boucherie Lyon 6' en 4 mois. +412 avis Google collectés via QR code. +86% d'appels entrants. Nouveaux clients représentent désormais 34% de la clientèle." },
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Schema.org", "Google Business API"],
    quote: { text: "", author: "", role: "" },
    prev: "studio-carene", next: "atelier-vernay",
  },
]

export const getCaseBySlug = (slug: string): Case | undefined =>
  CASES.find((c) => c.slug === slug)

export const getAdjacentCases = (slug: string) => {
  const idx = CASES.findIndex((c) => c.slug === slug)
  return {
    prev: idx > 0 ? CASES[idx - 1] : null,
    next: idx < CASES.length - 1 ? CASES[idx + 1] : null,
  }
}
