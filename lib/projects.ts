export type ColorScheme = "amber" | "slate" | "gold" | "teal" | "blue" | "rose"

export type Project = {
  id: number
  slug: string
  title: string
  tagline: string
  client: {
    name: string
    sector: string
    location: string
    size: string
  }
  category: string
  categoryLabel: string
  description: string
  tags: string[]
  featured: boolean
  colorScheme: ColorScheme
  heroMetric: string

  challenge: string
  approach: {
    step: number
    title: string
    description: string
  }[]
  deliverables: string[]
  results: {
    value: string
    label: string
    description: string
  }[]
  performance: {
    performance: number
    accessibility: number
    seo: number
    bestPractices: number
  }
  testimonial: {
    quote: string
    author: string
    role: string
  }
  duration: string
  year: number
  images?: {
    maquette: string   // vue maquettage / hero desktop
    mobile: string     // vue mobile flottante
    home: string       // grande capture livrables
    section1: string   // capture section 1
    section2?: string  // capture section 2 (optionnel si combinée avec section1)
  }
}

export const COLOR_SCHEMES: Record<ColorScheme, {
  cardGradient: string
  heroBg: string
  mockupBg: string
  accentText: string
  badge: string
  gaugeColor: string
}> = {
  amber: {
    cardGradient: "from-amber-500/15 to-orange-400/8",
    heroBg: "from-amber-100 to-orange-50 dark:from-amber-950/20 dark:to-orange-900/10",
    mockupBg: "from-amber-200/50 to-orange-100/50",
    accentText: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    gaugeColor: "#F59E0B",
  },
  slate: {
    cardGradient: "from-slate-600/15 to-blue-900/8",
    heroBg: "from-slate-100 to-blue-50 dark:from-slate-900/30 dark:to-blue-950/15",
    mockupBg: "from-slate-200/50 to-blue-100/50",
    accentText: "text-slate-600 dark:text-slate-300",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
    gaugeColor: "#64748B",
  },
  gold: {
    cardGradient: "from-yellow-500/15 to-amber-300/8",
    heroBg: "from-yellow-50 to-amber-100/50 dark:from-yellow-950/20 dark:to-amber-950/10",
    mockupBg: "from-yellow-200/50 to-amber-100/50",
    accentText: "text-yellow-600 dark:text-yellow-400",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    gaugeColor: "#EAB308",
  },
  teal: {
    cardGradient: "from-teal-500/15 to-emerald-400/8",
    heroBg: "from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/10",
    mockupBg: "from-teal-200/50 to-emerald-100/50",
    accentText: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    gaugeColor: "#14B8A6",
  },
  blue: {
    cardGradient: "from-blue-600/15 to-cyan-500/8",
    heroBg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/10",
    mockupBg: "from-blue-200/50 to-cyan-100/50",
    accentText: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    gaugeColor: "#3B82F6",
  },
  rose: {
    cardGradient: "from-rose-700/15 to-slate-600/8",
    heroBg: "from-rose-50 to-slate-50 dark:from-rose-950/20 dark:to-slate-900/10",
    mockupBg: "from-rose-200/50 to-slate-100/50",
    accentText: "text-rose-700 dark:text-rose-400",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    gaugeColor: "#E11D48",
  },
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "solutions-digitales-artisanat",
    title: "Digitalisation Artisanale",
    tagline: "Architecture de conversion pour les métiers du second œuvre",
    client: {
      name: "Étude de Cas Sectorielle", 
      sector: "Bâtiment & Artisanat",
      location: "Zone Urbaine à forte concurrence", // Plus de ville précise
      size: "Cible : TPE / Artisans indépendants", 
    },
    category: "vitrine",
    categoryLabel: "Site vitrine",
    description:
      "Système de capture de leads et stratégie de référencement local pour entreprises du bâtiment.",
    tags: ["Solution Sectorielle", "Performance", "SEO Local", "UX Design"],
    featured: true,
    colorScheme: "amber",
    heroMetric: "Core Web Vitals : OK",

    challenge:
      "Dans un secteur où la recommandation physique sature, comment capter la demande digitale croissante ? Ce projet définit une infrastructure capable de positionner un artisan local face aux grands annuaires nationaux, en misant sur une vitesse de chargement instantanée et un parcours utilisateur ultra-simplifié.",

    approach: [
      {
        step: 1,
        title: "Analyse des Intentions de Recherche",
        description:
          "Identification des mots-clés transactionnels locaux. L'objectif est de capter l'utilisateur au moment précis où son besoin est urgent (dépannage, devis immédiat).",
      },
      {
        step: 2,
        title: "Interface de Confiance Immédiate",
        description:
          "Design axé sur la preuve sociale et la clarté technique. Utilisation d'une iconographie métier moderne pour valider l'expertise visuelle dès la première seconde.",
      },
      {
        step: 3,
        title: "Ingénierie Next.js & SEO local",
        description:
          "Développement d'une structure optimisée pour l'indexation mobile. Implémentation du balisage Schema.org pour une visibilité accrue dans les packs locaux de Google.",
      },
      {
        step: 4,
        title: "Optimisation de la Conversion",
        description:
          "Déploiement de tunnels de contact courts (One-tap call) et de formulaires de devis segmentés pour réduire le taux d'abandon.",
      },
    ],

    deliverables: [
      "Identité numérique cohérente (Logotype, Design System)",
      "Plateforme web haute-performance (Next.js / Tailwind)",
      "Configuration avancée du profil d'établissement local",
      "Tableau de bord de suivi des performances web",
      "Infrastructure d'emailing professionnel sécurisée",
    ],

    results: [
      { value: "X2", label: "Flux de leads", description: "Objectif moyen constaté après optimisation du tunnel" },
      { value: "Top 3", label: "Visibilité Locale", description: "Cible de positionnement sur les requêtes stratégiques" },
      { value: "99/100", label: "Score Performance", description: "Optimisation Lighthouse (LCP < 1s)" },
      { value: "SLA 99.9%", label: "Disponibilité", description: "Hébergement haute disponibilité sur Edge Network" },
    ],

    performance: { performance: 99, accessibility: 98, seo: 100, bestPractices: 100 },

    testimonial: {
      quote:
        "Le succès d'un artisan aujourd'hui dépend de sa capacité à être trouvé instantanément. Cette étude prouve qu'une architecture technique solide surclasse toujours un design générique en termes de rentabilité.",
      author: "Nathan Portier",
      role: "Responsable Croissance, Mobem Solutions",
    },

    duration: "4 à 6 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation1-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation1-Mobile.png",
      home:     "/realisations-illustrations/Realisation1-HomeView.png",
      section1: "/realisations-illustrations/Realisation1-Section1-Section2.png",
    },
  },

{
    id: 2,
    slug: "refonte-digitale-services-reglementes",
    title: "Services Sensibles & Réglementés",
    tagline: "Allier conformité légale et approche humaine par le design",
    client: {
      name: "Étude de Cas Sectorielle",
      sector: "Services Funéraires & Prévoyance",
      location: "Bassin de population dense",
      size: "Profil Type : PME familiale — Services de proximité",
    },
    category: "refonte",
    categoryLabel: "Refonte digitale",
    description:
      "Refonte digitale axée sur l'empathie, la transparence tarifaire et l'accessibilité universelle (WCAG).",
    tags: ["Accessibilité WCAG", "UX Empathique", "Conformité Légale", "Next.js"],
    featured: true,
    colorScheme: "slate",
    heroMetric: "SEO Optimized",

    challenge:
      "Comment une entreprise familiale peut-elle rivaliser avec les grands groupes nationaux sur un secteur où l'urgence et l'émotion dominent ? Cette étude analyse la transformation d'une identité vieillissante en une plateforme numérique rassurante, capable de répondre aux obligations légales de transparence tout en offrant une expérience utilisateur fluide pour des personnes en situation de stress.",

    approach: [
      {
        step: 1,
        title: "Immersion & Audit Réglementaire",
        description:
          "Analyse des codes du secteur : sobriété, dignité et obligations légales (affichage des tarifs, devis types). Étude des parcours utilisateurs en situation d'urgence mobile.",
      },
      {
        step: 2,
        title: "Design System Empathique",
        description:
          "Conception d'une interface sobre (palette ardoise/lin) privilégiant la lisibilité. Chaque interaction est pensée pour être apaisante et directe, évitant toute friction cognitive.",
      },
      {
        step: 3,
        title: "Architecture de Contenu & Transparence",
        description:
          "Structuration des informations critiques : guides pratiques, FAQ réglementaire et outils de contact immédiat. Mise en conformité numérique des documents contractuels.",
      },
      {
        step: 4,
        title: "Développement & Accessibilité Totale",
        description:
          "Implémentation des normes WCAG 2.1 AA. Optimisation technique pour garantir un accès instantané, même en zone de faible couverture réseau ou sur terminaux anciens.",
      },
    ],

    deliverables: [
      "Système d'identité visuelle (Logo, Typographie, Iconographie)",
      "Plateforme web accessible aux normes WCAG 2.1 AA",
      "Module de gestion des tarifs et devis types réglementés",
      "Stratégie de référencement sur les intentions de recherche d'urgence",
      "Audit de conformité numérique et accessibilité",
    ],

    results: [
      { value: "+80%", label: "Taux de rétention", description: "Engagement accru des utilisateurs sur les contenus informatifs" },
      { value: "A+", label: "Accessibilité", description: "Conformité totale aux standards d'inclusion numérique" },
      { value: "99/100", label: "SEO Technique", description: "Optimisation maximale pour les moteurs de recherche" },
      { value: "100%", label: "Conformité", description: "Respect strict des obligations d'affichage légal" },
    ],

    performance: { performance: 95, accessibility: 100, seo: 99, bestPractices: 100 },

    testimonial: {
      quote:
        "Dans les secteurs réglementés, la technologie doit s'effacer derrière le service. Cette étude montre qu'une interface parfaitement accessible est le meilleur vecteur de confiance pour une entreprise de proximité.",
      author: "Arnaud Clavier",
      role: "Responsable Développement, Mobem Solutions",
    },

    duration: "8 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation2-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation2-Mobile.png",
      home:     "/realisations-illustrations/Realisation2-HomeView.png",
      section1: "/realisations-illustrations/Realisation2-Section1-Section2.png",
      section2: "/realisations-illustrations/Realisation2-Section1-Section2.png",
    },
  },

  {
    id: 3,
    slug: "plateforme-acquisition-evenementielle",
    title: "Événementiel & Lieux d'Exception",
    tagline: "Maximiser la valeur de réservation par une expérience immersive",
    client: {
      name: "Étude de Cas : Domaine de Réception",
      sector: "Hôtellerie & Événementiel Premium",
      location: "Zone de rayonnement régionale",
      size: "Cible : Domaines indépendants & Lieux de séminaires",
    },
    category: "vitrine",
    categoryLabel: "Site vitrine",
    description:
      "Système de qualification intelligente et tunnel de conversion haute-fidélité pour lieux événementiels.",
    tags: ["UX Immersive", "Lead Qualification", "Conversion", "SEO Local"],
    featured: true,
    colorScheme: "gold",
    heroMetric: "UX Ready",

    challenge:
      "Comment réduire la dépendance aux plateformes de mise en relation tierces (commissions élevées) tout en automatisant la qualification des prospects ? Cette étude analyse la transformation d'un lieu d'exception dont l'image numérique sous-évaluait le potentiel commercial, entraînant une saturation administrative et un manque à gagner sur les dates premium.",

    approach: [
      {
        step: 1,
        title: "Ingénierie du Parcours Client",
        description:
          "Cartographie des segments (B2B/B2C) et conception d'un tunnel de qualification dynamique. L'objectif est de filtrer les demandes selon le budget, la date et la capacité avant même le premier contact humain.",
      },
      {
        step: 2,
        title: "Direction Artistique Haute-Fidélité",
        description:
          "Identité visuelle premium : palette or doux et tons naturels. Mise en avant d'une composition éditoriale immersive capable de vendre l'expérience sensorielle du lieu avant la visite physique.",
      },
      {
        step: 3,
        title: "Système de Réservation Intelligent",
        description:
          "Développement d'un formulaire de devis auto-qualifiant synchronisé avec les calendriers de gestion. Intégration de galeries haute-performance utilisant le lazy-loading pour une fluidité totale.",
      },
      {
        step: 4,
        title: "Stratégie d'Autorité SEO",
        description:
          "Déploiement d'une structure de contenu ciblant les requêtes transactionnelles à forte valeur (séminaires, mariages, galas). Optimisation de la longue traîne sur le secteur géographique cible.",
      },
    ],

    deliverables: [
      "Système d'identité visuelle et charte graphique premium",
      "Plateforme web immersive optimisée pour la conversion mobile",
      "Module de qualification automatique des demandes entrantes",
      "Infrastructure SEO axée sur les segments B2B et B2C",
      "Guide opérationnel de gestion des leads numériques",
    ],

    results: [
      { value: "X3", label: "Volume de Leads", description: "Hausse constatée des demandes qualifiées en direct" },
      { value: "-60%", label: "Charge Admin", description: "Gain de temps grâce à la pré-qualification automatique" },
      { value: "96/100", label: "Score UX", description: "Fluidité du parcours de réservation (Lighthouse)" },
      { value: "Top 3", label: "Visibilité", description: "Positionnement sur les mots-clés sectoriels stratégiques" },
    ],

    performance: { performance: 96, accessibility: 97, seo: 100, bestPractices: 94 },

    testimonial: {
      quote:
        "Passer d'une simple visibilité à une machine d'acquisition directe change radicalement la rentabilité d'un lieu. Notre approche permet de reprendre le contrôle sur les réservations sans dépendre des intermédiaires.",
      author: "Antoine Clavier", // Antoine en tant que responsable design/UX
      role: "Responsable Design, Mobem Solutions",
    },

    duration: "7 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation3-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation3-Mobile.png",
      home:     "/realisations-illustrations/Realisation3-HomeView.png",
      section1: "/realisations-illustrations/Realisation3-Section1-Section2.png",
      section2: "/realisations-illustrations/Realisation3-Section1-Section2.png",
    },
  },

{
    id: 4,
    slug: "digitalisation-cabinet-sante-specialisee",
    title: "Santé & Paramédical",
    tagline: "Reprendre la maîtrise de sa patientèle par une stratégie d'acquisition directe",
    client: {
      name: "Étude de Cas : Cabinet Libéral",
      sector: "Santé & Soins Spécialisés",
      location: "Zone de santé sous-dotée",
      size: "Cible : Structures de 4 à 10 praticiens",
    },
    category: "vitrine",
    categoryLabel: "Site vitrine",
    description:
      "Digitalisation de cabinet : automatisation du parcours patient et SEO santé à haute valeur ajoutée.",
    tags: ["Souveraineté Numérique", "SEO Santé", "Conformité Ordinale", "UX Mobile"],
    featured: false,
    colorScheme: "teal",
    heroMetric: "Performance 99/100",

    challenge:
      "Comment un cabinet de spécialistes peut-il s'émanciper des plateformes de prise de rendez-vous centralisées et de leurs coûts récurrents ? Cette étude analyse la mise en place d'un écosystème propriétaire permettant de valoriser des compétences techniques spécifiques (matériel de pointe, expertises rares) souvent invisibilisées par les algorithmes des plateformes tiers.",

    approach: [
      {
        step: 1,
        title: "Audit Technique & Déontologique",
        description:
          "Recensement des spécialités et des équipements différenciants. Analyse du parcours patient local et vérification de la conformité avec les codes de déontologie professionnelle en vigueur.",
      },
      {
        step: 2,
        title: "Interface Médicale Inclusive",
        description:
          "Design sobre et hautement accessible (WCAG). Structuration de l'information par praticien et par pathologie pour offrir une réponse immédiate aux besoins des patients.",
      },
      {
        step: 3,
        title: "Architecture de Données & RGPD",
        description:
          "Mise en place de protocoles de sécurité pour le traitement des demandes de contact et respect strict de la confidentialité des données de santé (HDS).",
      },
      {
        step: 4,
        title: "SEO Local & Conversion Directe",
        description:
          "Optimisation sur les requêtes de soins spécialisés. Intégration de tunnels de prise de rendez-vous hybrides (Direct/Plateforme) pour maximiser l'autonomie du cabinet.",
      },
    ],

    deliverables: [
      "Plateforme cabinet multi-praticiens optimisée mobile",
      "Identité visuelle médicale (Charte graphique & Accessibilité)",
      "Système de prise de rendez-vous propriétaire ou intégré",
      "Stratégie de visibilité locale sur les pôles de spécialités",
      "Documentation de conformité aux règles ordinales",
    ],

    results: [
      { value: "X2", label: "Acquisition Directe", description: "Hausse du flux de nouveaux patients hors plateformes tiers" },
      { value: "Top 3", label: "Indexation Santé", description: "Positionnement sur les mots-clés d'expertises spécifiques" },
      { value: "100/100", label: "Accessibilité", description: "Score de conformité web pour les publics en situation de handicap" },
      { value: "-40%", label: "Coûts Plateformes", description: "Réduction de la dépendance aux services payants centralisés" },
    ],

    performance: { performance: 98, accessibility: 100, seo: 100, bestPractices: 96 },

    testimonial: {
      quote:
        "La souveraineté numérique est cruciale dans le domaine de la santé. Nous aidons les praticiens à valoriser leur expertise réelle plutôt qu'à être un simple numéro dans une base de données mondiale.",
      author: "Arnaud Clavier",
      role: "Responsable Développement, Mobem Solutions",
    },

    duration: "5 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation4-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation4-Mobile.png",
      home:     "/realisations-illustrations/Realisation4-HomeView.png",
      section1: "/realisations-illustrations/Realisation4-Section1-Section2.png",
      section2: "/realisations-illustrations/Realisation4-Section1-Section2.png",
    },
  },

{
    id: 5,
    slug: "repositionnement-b2b-ingenierie-technique",
    title: "Industrie & Ingénierie B2B",
    tagline: "Transformer l'expertise technique en levier d'acquisition institutionnel",
    client: {
      name: "Étude de Cas : Bureau d'Études",
      sector: "Ingénierie & Géotechnique",
      location: "Rayonnement National",
      size: "Cible : PME d'ingénierie et de conseil technique",
    },
    category: "b2b",
    categoryLabel: "Stratégie B2B",
    description:
      "Architecture de contenu expert et système de génération de leads pour prescripteurs du bâtiment.",
    tags: ["Autorité SEO", "Lead Generation B2B", "Stratégie E-E-A-T", "Next.js"],
    featured: false,
    colorScheme: "blue",
    heroMetric: "Scalable Architecture",

    challenge:
      "Comment rendre visible une expertise hautement technique auprès des décideurs (promoteurs, collectivités, maîtres d'ouvrage) ? Cette étude analyse le passage d'un modèle basé uniquement sur le réseau physique à un système d'acquisition digital automatisé, capable de capter des appels d'offres et des consultations spontanées sur des marchés complexes.",

    approach: [
      {
        step: 1,
        title: "Audit des Cycles de Décision B2B",
        description:
          "Analyse des parcours d'achat complexes. Identification des points de contact clés entre les prescripteurs techniques et les donneurs d'ordre institutionnels.",
      },
      {
        step: 2,
        title: "Identité de Marque Institutionnelle",
        description:
          "Positionnement graphique axé sur la rigueur et la fiabilité. Création d'un univers visuel 'Ingénierie' qui rassure les directions techniques et financières.",
      },
      {
        step: 3,
        title: "Stratégie d'Autorité (E-E-A-T)",
        description:
          "Déploiement d'une bibliothèque de contenus experts. Vulgarisation technique de haut niveau pour positionner l'entreprise comme référente sur son secteur auprès des moteurs de recherche.",
      },
      {
        step: 4,
        title: "Ingénierie de Capture de Leads",
        description:
          "Développement de tunnels de conversion spécifiques aux appels d'offres : formulaires de pré-qualification technique et accès sécurisé aux ressources documentaires.",
      },
    ],

    deliverables: [
      "Refonte de l'identité institutionnelle et charte graphique B2B",
      "Plateforme web orientée 'Expertise' avec architecture scalable",
      "Écosystème de contenus techniques optimisés SEO",
      "Système de lead magnet (Livre blanc / Plaquette technique)",
      "Dashboard de suivi du tunnel de vente digital",
    ],

    results: [
      { value: "X4", label: "Trafic Qualifié", description: "Hausse de l'audience issue de recherches professionnelles ciblées" },
      { value: "Top 1%", label: "Autorité SEO", description: "Positionnement sur les requêtes d'ingénierie stratégiques" },
      { value: "99/100", label: "Performance", description: "Score technique garantissant une crédibilité totale" },
      { value: "SaaS Ready", label: "Architecture", description: "Structure prête pour l'intégration d'outils métiers" },
    ],

    performance: { performance: 99, accessibility: 97, seo: 100, bestPractices: 98 },

    testimonial: {
      quote:
        "Dans l'industrie, le site web n'est pas un accessoire, c'est une preuve de compétence. Nous créons des outils qui parlent le langage des ingénieurs tout en servant les objectifs des directeurs commerciaux.",
      author: "Nathan Portier",
      role: "Responsable Croissance & Communication, Mobem Solutions",
    },

    duration: "10 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation5-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation5-Mobile.png",
      home:     "/realisations-illustrations/Realisation5-HomeView.png",
      section1: "/realisations-illustrations/Realisation5-Section1-Section2.png",
      section2: "/realisations-illustrations/Realisation5-Section1-Section2.png",
    },
  },

  {
    id: 6,
    slug: "identite-premium-conseil-juridique",
    title: "Conseil & Professions Libérales",
    tagline: "Affirmer l'excellence métier par un positionnement numérique de haute facture",
    client: {
      name: "Étude de Cas : Cabinet d'Avocats",
      sector: "Droit des Affaires & Conseil Juridique",
      location: "Quartier d'affaires métropolitain",
      size: "Cible : Cabinets d'associés et Sociétés de conseil",
    },
    category: "refonte",
    categoryLabel: "Refonte digitale",
    description:
      "Identité premium et architecture d'acquisition pour cabinets d'expertise et professions libérales de haut niveau.",
    tags: ["Identité Premium", "SEO Juridique", "Stratégie E-E-A-T", "Conversion"],
    featured: false,
    colorScheme: "rose",
    heroMetric: "Conversion Focused",

    challenge:
      "Comment un cabinet d'expertise établi peut-il renouveler sa clientèle et attirer les entreprises en croissance ? Cette étude analyse la refonte d'une image institutionnelle vieillissante en une plateforme d'autorité moderne, capable de capter des dossiers à forte valeur ajoutée en zone urbaine ultra-concurrentielle.",

    approach: [
      {
        step: 1,
        title: "Audit d'Image & Déontologie",
        description:
          "Analyse des codes du luxe et du prestige appliqués au conseil. Vérification stricte de la conformité avec les règlements intérieurs des ordres professionnels.",
      },
      {
        step: 2,
        title: "Direction Artistique 'Sobre-Luxe'",
        description:
          "Conception d'un univers graphique alliant héritage et modernité. Palette ardoise, or doux et blanc cassé. Typographie avec grâce pour instaurer une confiance immédiate chez les décideurs.",
      },
      {
        step: 3,
        title: "Architecture de Contenu d'Autorité",
        description:
          "Structuration des expertises par pôles de compétences. Vulgarisation juridique de haut niveau visant à démontrer le savoir-faire avant même la première consultation.",
      },
      {
        step: 4,
        title: "Ingénierie SEO de Haute Précision",
        description:
          "Ciblage des requêtes transactionnelles à forte valeur (Cessions, Contentieux, Restructurations). Optimisation de l'autorité (E-E-A-T) pour dominer les résultats organiques locaux.",
      },
    ],

    deliverables: [
      "Système d'identité visuelle premium et supports de marque",
      "Plateforme web haute-performance conforme aux règles déontologiques",
      "Stratégie de contenu éditorial axée sur l'expertise métier",
      "Optimisation avancée du référencement sur les segments stratégiques",
      "Tunnel de mise en relation sécurisé et confidentiel",
    ],

    results: [
      { value: "X2.5", label: "Visibilité", description: "Hausse des impressions sur les recherches d'expertises ciblées" },
      { value: "Top 3", label: "Positionnement", description: "Cible de résultats sur les mots-clés juridiques majeurs" },
      { value: "100/100", label: "Score SEO", description: "Optimisation technique irréprochable (Lighthouse)" },
      { value: "+45%", label: "Taux de Conversion", description: "Amélioration de la transformation visiteur-prospect" },
    ],

    performance: { performance: 96, accessibility: 98, seo: 100, bestPractices: 100 },

    testimonial: {
      quote:
        "Le digital est devenu le nouveau bouche-à-oreille. Une présence en ligne soignée n'est plus une option pour les professions libérales, c'est l'extension directe de leur réputation.",
      author: "Nathan Portier",
      role: "Responsable Croissance, Mobem Solutions",
    },

    duration: "9 semaines",
    year: 2026,
    images: {
      maquette: "/realisations-illustrations/Realisation6-HomeView.png",
      mobile:   "/realisations-illustrations/Realisation6-Mobile.png",
      home:     "/realisations-illustrations/Realisation6-HomeView.png",
      section1: "/realisations-illustrations/Realisation6-Section1-Section2.png",
      section2: "/realisations-illustrations/Realisation6-Section1-Section2.png",
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { next: Project; prev: Project } {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    next: projects[(index + 1) % projects.length],
    prev: projects[(index - 1 + projects.length) % projects.length],
  }
}
