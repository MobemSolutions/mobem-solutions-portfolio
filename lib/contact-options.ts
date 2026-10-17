// Questions du formulaire de contact, partagées entre le formulaire (client) et la route /api/contact (validation).

export const SECTORS = [
  "Organisme de formation",
  "Courtier en assurance",
  "Cabinet comptable",
  "Autre TPE / PME",
] as const

export const TEAM_SIZES = ["Seul(e)", "2 à 10", "11 à 50", "Plus de 50"] as const

export const TASKS = [
  "Relances clients ou stagiaires",
  "Collecte de pièces et justificatifs",
  "Tri et réponses aux e-mails",
  "Preuves Qualiopi et audits",
  "Factures et rapprochements",
  "Prise de rendez-vous",
  "Onboarding de nouveaux clients",
  "Saisie et reporting",
] as const

export const HOURS = ["Moins de 2 h", "2 à 5 h", "5 à 10 h", "Plus de 10 h"] as const

export const TOOLS = [
  "Gmail",
  "Outlook",
  "Google Sheets",
  "Excel",
  "Google Drive",
  "Notion",
  "Logiciel métier",
] as const

export const TIMINGS = ["Dès que possible", "Dans les 3 mois", "Je me renseigne"] as const

export interface ContactPayload {
  name: string
  email: string
  company: string
  phone: string
  sector: (typeof SECTORS)[number] | ""
  teamSize: (typeof TEAM_SIZES)[number] | ""
  tasks: (typeof TASKS)[number][]
  hours: (typeof HOURS)[number] | ""
  tools: (typeof TOOLS)[number][]
  message: string
  timing: (typeof TIMINGS)[number] | ""
  website: boolean
  consent: boolean
  /** Champ piège anti-spam : doit rester vide */
  url: string
}
