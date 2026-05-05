export interface Metier {
  slug: string
  label: string
  labelPluriel?: string
  category: string
  description: string
}

export interface MetierCategory {
  slug: string
  label: string
  metiers: Metier[]
}

export interface Ville {
  slug: string
  label: string
  departement: string
  codePostal: string
  population: string
  region: string
}

export interface Region {
  label: string
  villes: Ville[]
}

export const METIER_CATEGORIES: MetierCategory[] = [
  {
    slug: "batiment-travaux",
    label: "Bâtiment & Travaux",
    metiers: [
      { slug: "plombier", label: "Plombier", category: "Bâtiment & Travaux", description: "Un site internet professionnel permet au plombier d'apparaître en premier lorsqu'un particulier cherche un dépanneur en urgence dans sa ville. Sans présence en ligne, vous perdez chaque jour des appels au profit de concurrents référencés sur Google." },
      { slug: "electricien", label: "Électricien", category: "Bâtiment & Travaux", description: "Un électricien avec un site internet capte les demandes d'intervention des particuliers et professionnels qui cherchent un électricien qualifié dans leur ville. Chaque jour sans site, ce sont des chantiers qui partent chez la concurrence." },
      { slug: "paysagiste", label: "Paysagiste", category: "Bâtiment & Travaux", description: "Un paysagiste avec un site internet attire les propriétaires qui recherchent un professionnel pour aménager leur jardin. Les visuels de vos réalisations convainquent bien mieux qu'un bouche-à-oreille limité à votre quartier." },
      { slug: "macon", label: "Maçon", category: "Bâtiment & Travaux", description: "Un maçon avec un site internet montre ses réalisations et capte des demandes de devis qualifiées. Les travaux de construction et rénovation représentent des marchés importants où la visibilité en ligne est décisive." },
      { slug: "carreleur", label: "Carreleur", category: "Bâtiment & Travaux", description: "Un carreleur avec un site internet peut montrer son savoir-faire avec des photos de réalisations et attirer des clients qui cherchent un artisan de confiance pour leurs travaux de rénovation." },
      { slug: "peintre-en-batiment", label: "Peintre en bâtiment", category: "Bâtiment & Travaux", description: "Un peintre en bâtiment avec un site internet attire les particuliers et professionnels qui recherchent un artisan pour rénover ou décorer leurs espaces. Vos photos de chantier valent mieux qu'un long discours." },
      { slug: "couvreur", label: "Couvreur", category: "Bâtiment & Travaux", description: "Un couvreur avec un site internet capte les demandes urgentes d'intervention après tempête ou pour des rénovations de toiture. La recherche Google est le premier réflexe des propriétaires en cas de problème." },
      { slug: "menuisier", label: "Menuisier", category: "Bâtiment & Travaux", description: "Un menuisier avec un site internet montre ses créations sur-mesure et attire des clients prêts à investir dans du mobilier ou des aménagements de qualité. Vos réalisations sont votre meilleur argument commercial." },
      { slug: "serrurier", label: "Serrurier", category: "Bâtiment & Travaux", description: "Un serrurier avec un site internet capte les demandes urgentes de remplacement de serrure ou d'ouverture de porte. En situation de blocage, les gens cherchent immédiatement sur Google un professionnel de proximité." },
      { slug: "chauffagiste", label: "Chauffagiste", category: "Bâtiment & Travaux", description: "Un chauffagiste avec un site internet capte les demandes d'installation et d'entretien de chaudières. En hiver, les pannes de chauffage créent une urgence et les clients cherchent un professionnel disponible immédiatement." },
      { slug: "pisciniste", label: "Pisciniste", category: "Bâtiment & Travaux", description: "Un pisciniste avec un site internet présente ses réalisations et attire les propriétaires qui souhaitent faire construire ou rénover leur piscine. Vos photos de bassins sont la meilleure vitrine commerciale." },
    ],
  },
  {
    slug: "sante-bien-etre",
    label: "Santé & Bien-être",
    metiers: [
      { slug: "osteopathe", label: "Ostéopathe", category: "Santé & Bien-être", description: "Un ostéopathe avec un site internet permet aux patients de trouver facilement un praticien de confiance et de prendre rendez-vous en ligne. La concurrence entre cabinets est forte et la visibilité Google est déterminante." },
      { slug: "kinesitherapeute", label: "Kinésithérapeute", category: "Santé & Bien-être", description: "Un kinésithérapeute avec un site internet attire de nouveaux patients qui cherchent un praticien pour leur rééducation ou leurs soins. La prise de rendez-vous en ligne est devenue une attente standard." },
      { slug: "psychologue", label: "Psychologue", category: "Santé & Bien-être", description: "Un psychologue avec un site internet permet aux personnes en recherche d'aide de trouver facilement un praticien correspondant à leurs besoins. La confiance se construit dès la première impression en ligne." },
      { slug: "dieteticien", label: "Diététicien", category: "Santé & Bien-être", description: "Un diététicien avec un site internet capte les personnes qui cherchent un accompagnement nutritionnel. Le marché du bien-être est en forte croissance et les patients comparent les professionnels en ligne avant de choisir." },
      { slug: "dentiste", label: "Dentiste", category: "Santé & Bien-être", description: "Un dentiste avec un site internet présente son cabinet, son équipe et ses soins pour rassurer les nouveaux patients. La prise de rendez-vous en ligne est un facteur de choix décisif pour les patients." },
      { slug: "sage-femme", label: "Sage-femme", category: "Santé & Bien-être", description: "Une sage-femme avec un site internet présente ses consultations et accompagnements pour attirer les futures mamans de sa ville. Le bouche-à-oreille ne suffit plus face à la concurrence des grandes maternités." },
      { slug: "infirmier-liberal", label: "Infirmier libéral", category: "Santé & Bien-être", description: "Un infirmier libéral avec un site internet capte les patients qui recherchent des soins à domicile dans leur secteur. La visibilité en ligne permet de maintenir un carnet de patients actif." },
      { slug: "podologue", label: "Podologue", category: "Santé & Bien-être", description: "Un podologue avec un site internet présente ses prestations et ses spécialités pour attirer des patients qui souffrent de problèmes de pieds. La prise de rendez-vous en ligne fidélise durablement." },
      { slug: "sophrologue", label: "Sophrologue", category: "Santé & Bien-être", description: "Un sophrologue avec un site internet partage sa méthode, son approche et ses domaines d'intervention pour attirer des clients en recherche de bien-être et de gestion du stress." },
      { slug: "veterinaire", label: "Vétérinaire", category: "Santé & Bien-être", description: "Un vétérinaire avec un site internet permet aux propriétaires d'animaux de prendre rendez-vous en ligne et de trouver rapidement un professionnel de confiance en cas d'urgence." },
      { slug: "opticien", label: "Opticien", category: "Santé & Bien-être", description: "Un opticien avec un site internet présente ses collections, ses marques et ses services pour attirer des clients qui cherchent lunettes ou lentilles dans leur ville. Le e-commerce est une opportunité supplémentaire." },
      { slug: "pharmacie", label: "Pharmacie", category: "Santé & Bien-être", description: "Une pharmacie avec un site internet améliore la visibilité locale et permet de présenter les services proposés : ordonnances en ligne, livraison, conseils. La fidélisation des clients passe aussi par le numérique." },
    ],
  },
  {
    slug: "beaute",
    label: "Beauté",
    metiers: [
      { slug: "salon-de-coiffure", label: "Salon de coiffure", category: "Beauté", description: "Un salon de coiffure avec un site internet se démarque dans un secteur très concurrentiel en montrant ses réalisations et en proposant la réservation en ligne. Les clients cherchent un coiffeur en ligne avant d'appeler." },
      { slug: "estheticienne", label: "Esthéticienne", category: "Beauté", description: "L'institut de beauté qui n'est pas visible en ligne perd chaque semaine des clientes au profit de concurrents mieux référencés. Un site internet présente vos prestations et active la prise de rendez-vous 24h/24." },
      { slug: "barbier", label: "Barbier", category: "Beauté", description: "Le barbershop est devenu un lieu de style et d'identité masculine. Les clients ne cherchent pas juste une coupe, ils cherchent une expérience. Un site internet positionne votre établissement comme la référence locale." },
    ],
  },
  {
    slug: "mobilite-transport",
    label: "Mobilité & Transport",
    metiers: [
      { slug: "auto-ecole", label: "Auto-école", category: "Mobilité & Transport", description: "Un site internet professionnel permet à l'auto-école de capter les inscriptions en ligne et de mettre en avant son taux de réussite. Les élèves recherchent leur auto-école sur Google avant de s'inscrire." },
      { slug: "garage-automobile", label: "Garage automobile", category: "Mobilité & Transport", description: "Un garage automobile avec un site internet capte les automobilistes qui cherchent un mécanicien de confiance en urgence. La visibilité locale sur Google Maps est déterminante pour attirer de nouveaux clients." },
      { slug: "taxi-vtc", label: "Taxi VTC", category: "Mobilité & Transport", description: "Un chauffeur de taxi ou VTC avec un site internet se libère de la dépendance aux plateformes qui prélèvent 20 à 30% de commission. Votre propre site attire des clients directs et fidèles." },
    ],
  },
  {
    slug: "sport-loisirs",
    label: "Sport & Loisirs",
    metiers: [
      { slug: "coach-sportif", label: "Coach sportif", category: "Sport & Loisirs", description: "Un coach sportif avec un site internet développe sa clientèle au-delà de son réseau personnel. Présentez vos programmes, vos résultats clients et votre approche pour attirer des prospects qualifiés." },
      { slug: "bowling", label: "Bowling", category: "Sport & Loisirs", description: "Un bowling avec un site internet présente ses formules, tarifs et disponibilités pour attirer des groupes et des familles. La réservation en ligne simplifie l'organisation et augmente le taux de remplissage." },
      { slug: "salle-de-sport", label: "Salle de sport", category: "Sport & Loisirs", description: "Une salle de sport avec un site internet présente ses équipements, ses cours et ses tarifs d'abonnement. La visibilité en ligne est essentielle pour se démarquer dans un marché très concurrentiel." },
      { slug: "ecole-de-danse", label: "École de danse", category: "Sport & Loisirs", description: "Une école de danse avec un site internet présente ses disciplines, ses cours et son planning pour attirer de nouveaux élèves. Les parents cherchent en ligne avant d'inscrire leurs enfants." },
      { slug: "ecole-de-musique", label: "École de musique", category: "Sport & Loisirs", description: "Une école de musique avec un site internet présente ses professeurs, ses instruments et ses formules pédagogiques. La visibilité locale est essentielle pour remplir les cours et ateliers." },
      { slug: "photographe", label: "Photographe", category: "Sport & Loisirs", description: "Un photographe avec un site internet présente son portfolio et ses prestations pour attirer des clients mariés, entreprises ou particuliers. Votre site est votre principale vitrine commerciale." },
      { slug: "videaste", label: "Vidéaste", category: "Sport & Loisirs", description: "Un vidéaste avec un site internet présente ses réalisations et ses services pour attirer des clients événementiels, institutionnels ou commerciaux. Le portfolio en ligne est indispensable dans ce métier." },
    ],
  },
  {
    slug: "restauration-commerce",
    label: "Restauration & Commerce",
    metiers: [
      { slug: "restaurant", label: "Restaurant", category: "Restauration & Commerce", description: "Un restaurant avec un site internet présente son menu, ses horaires et son ambiance pour attirer de nouveaux clients. Les réservations en ligne et la présence Google Maps sont des leviers de croissance majeurs." },
      { slug: "boulangerie", label: "Boulangerie", category: "Restauration & Commerce", description: "Une boulangerie avec un site internet renforce sa présence locale et peut présenter ses spécialités, horaires et nouveautés. Les clients fidèles et les touristes cherchent la meilleure boulangerie sur Google." },
      { slug: "epicerie-fine", label: "Épicerie fine", category: "Restauration & Commerce", description: "Une épicerie fine avec un site internet présente ses produits d'exception et peut développer une boutique en ligne pour toucher des clients au-delà de son quartier." },
    ],
  },
  {
    slug: "juridique-finance",
    label: "Juridique & Finance",
    metiers: [
      { slug: "avocat", label: "Avocat", category: "Juridique & Finance", description: "Un avocat avec un site internet présente ses domaines d'expertise et rassure les clients en recherche d'un conseil juridique. La confiance et la crédibilité se construisent dès la première visite en ligne." },
      { slug: "comptable", label: "Comptable", category: "Juridique & Finance", description: "Un cabinet comptable avec un site internet attire les TPE et PME qui cherchent un expert-comptable de confiance. Présentez vos services, votre équipe et vos domaines de spécialisation." },
      { slug: "conseiller-financier", label: "Conseiller financier", category: "Juridique & Finance", description: "Un conseiller financier avec un site internet présente ses services de gestion de patrimoine et d'investissement. La confiance est le premier critère de choix et le site internet est la première impression." },
    ],
  },
]

export const REGIONS: Region[] = [
  {
    label: "Île-de-France",
    villes: [
      { slug: "paris", label: "Paris", departement: "Paris", codePostal: "75", population: "2 100 000 hab.", region: "Île-de-France" },
    ],
  },
  {
    label: "Auvergne-Rhône-Alpes",
    villes: [
      { slug: "lyon", label: "Lyon", departement: "Rhône", codePostal: "69", population: "522 000 hab.", region: "Auvergne-Rhône-Alpes" },
      { slug: "grenoble", label: "Grenoble", departement: "Isère", codePostal: "38", population: "158 000 hab.", region: "Auvergne-Rhône-Alpes" },
      { slug: "clermont-ferrand", label: "Clermont-Ferrand", departement: "Puy-de-Dôme", codePostal: "63", population: "147 000 hab.", region: "Auvergne-Rhône-Alpes" },
      { slug: "saint-etienne", label: "Saint-Étienne", departement: "Loire", codePostal: "42", population: "174 000 hab.", region: "Auvergne-Rhône-Alpes" },
    ],
  },
  {
    label: "Provence-Alpes-Côte d'Azur",
    villes: [
      { slug: "marseille", label: "Marseille", departement: "Bouches-du-Rhône", codePostal: "13", population: "870 000 hab.", region: "Provence-Alpes-Côte d'Azur" },
      { slug: "nice", label: "Nice", departement: "Alpes-Maritimes", codePostal: "06", population: "342 000 hab.", region: "Provence-Alpes-Côte d'Azur" },
      { slug: "toulon", label: "Toulon", departement: "Var", codePostal: "83", population: "176 000 hab.", region: "Provence-Alpes-Côte d'Azur" },
    ],
  },
  {
    label: "Occitanie",
    villes: [
      { slug: "montpellier", label: "Montpellier", departement: "Hérault", codePostal: "34", population: "290 000 hab.", region: "Occitanie" },
      { slug: "toulouse", label: "Toulouse", departement: "Haute-Garonne", codePostal: "31", population: "490 000 hab.", region: "Occitanie" },
      { slug: "perpignan", label: "Perpignan", departement: "Pyrénées-Orientales", codePostal: "66", population: "121 000 hab.", region: "Occitanie" },
      { slug: "balaruc-les-bains", label: "Balaruc-les-Bains", departement: "Hérault", codePostal: "34", population: "7 500 hab.", region: "Occitanie" },
    ],
  },
  {
    label: "Nouvelle-Aquitaine",
    villes: [
      { slug: "bordeaux", label: "Bordeaux", departement: "Gironde", codePostal: "33", population: "257 000 hab.", region: "Nouvelle-Aquitaine" },
      { slug: "limoges", label: "Limoges", departement: "Haute-Vienne", codePostal: "87", population: "130 000 hab.", region: "Nouvelle-Aquitaine" },
    ],
  },
  {
    label: "Pays de la Loire",
    villes: [
      { slug: "nantes", label: "Nantes", departement: "Loire-Atlantique", codePostal: "44", population: "322 000 hab.", region: "Pays de la Loire" },
      { slug: "le-mans", label: "Le Mans", departement: "Sarthe", codePostal: "72", population: "143 000 hab.", region: "Pays de la Loire" },
      { slug: "angers", label: "Angers", departement: "Maine-et-Loire", codePostal: "49", population: "157 000 hab.", region: "Pays de la Loire" },
    ],
  },
  {
    label: "Bretagne",
    villes: [
      { slug: "rennes", label: "Rennes", departement: "Ille-et-Vilaine", codePostal: "35", population: "220 000 hab.", region: "Bretagne" },
      { slug: "brest", label: "Brest", departement: "Finistère", codePostal: "29", population: "140 000 hab.", region: "Bretagne" },
    ],
  },
  {
    label: "Hauts-de-France",
    villes: [
      { slug: "lille", label: "Lille", departement: "Nord", codePostal: "59", population: "233 000 hab.", region: "Hauts-de-France" },
      { slug: "amiens", label: "Amiens", departement: "Somme", codePostal: "80", population: "134 000 hab.", region: "Hauts-de-France" },
    ],
  },
  {
    label: "Grand Est",
    villes: [
      { slug: "strasbourg", label: "Strasbourg", departement: "Bas-Rhin", codePostal: "67", population: "285 000 hab.", region: "Grand Est" },
      { slug: "metz", label: "Metz", departement: "Moselle", codePostal: "57", population: "117 000 hab.", region: "Grand Est" },
    ],
  },
  {
    label: "Bourgogne-Franche-Comté",
    villes: [
      { slug: "dijon", label: "Dijon", departement: "Côte-d'Or", codePostal: "21", population: "157 000 hab.", region: "Bourgogne-Franche-Comté" },
      { slug: "besancon", label: "Besançon", departement: "Doubs", codePostal: "25", population: "116 000 hab.", region: "Bourgogne-Franche-Comté" },
      { slug: "simard", label: "Simard", departement: "Saône-et-Loire", codePostal: "71", population: "230 hab.", region: "Bourgogne-Franche-Comté" },
    ],
  },
  {
    label: "Centre-Val de Loire",
    villes: [
      { slug: "tours", label: "Tours", departement: "Indre-et-Loire", codePostal: "37", population: "136 000 hab.", region: "Centre-Val de Loire" },
      { slug: "orleans", label: "Orléans", departement: "Loiret", codePostal: "45", population: "116 000 hab.", region: "Centre-Val de Loire" },
    ],
  },
  {
    label: "Normandie",
    villes: [
      { slug: "caen", label: "Caen", departement: "Calvados", codePostal: "14", population: "107 000 hab.", region: "Normandie" },
      { slug: "rouen", label: "Rouen", departement: "Seine-Maritime", codePostal: "76", population: "112 000 hab.", region: "Normandie" },
    ],
  },
]

export const ALL_METIERS: Metier[] = METIER_CATEGORIES.flatMap((cat) => cat.metiers)
export const ALL_VILLES: Ville[] = REGIONS.flatMap((r) => r.villes)

export const TOP_METIERS = ALL_METIERS.slice(0, 10)
export const TOP_VILLES = ["paris", "lyon", "marseille", "montpellier", "toulouse", "bordeaux", "nantes", "lille"]

export function getMetierBySlug(slug: string): Metier | undefined {
  return ALL_METIERS.find((m) => m.slug === slug)
}

export function getVilleBySlug(slug: string): Ville | undefined {
  return ALL_VILLES.find((v) => v.slug === slug)
}

export function getMetierCategory(metierSlug: string): MetierCategory | undefined {
  return METIER_CATEGORIES.find((cat) => cat.metiers.some((m) => m.slug === metierSlug))
}
