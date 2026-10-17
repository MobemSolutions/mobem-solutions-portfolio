import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { HOURS, SECTORS, TASKS, TEAM_SIZES, TIMINGS, TOOLS } from "@/lib/contact-options"

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(200).default(""),
  phone: z.string().trim().max(40).default(""),
  sector: z.enum(SECTORS),
  teamSize: z.enum(TEAM_SIZES).or(z.literal("")).default(""),
  tasks: z.array(z.enum(TASKS)).max(TASKS.length).default([]),
  hours: z.enum(HOURS).or(z.literal("")).default(""),
  tools: z.array(z.enum(TOOLS)).max(TOOLS.length).default([]),
  message: z.string().trim().max(5000).default(""),
  timing: z.enum(TIMINGS).or(z.literal("")).default(""),
  website: z.boolean().default(false),
  consent: z.literal(true),
  url: z.string().max(0).default(""),
})

const MOBEM_EMAIL = "contact@mobem-solutions.com"
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Mobem Solutions <noreply@mobem-solutions.com>"

// Limite simple par IP (au mieux par instance) : 5 envois par tranche de 10 minutes.
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const C = {
  blue: "#0d44e8",
  ink: "#000000",
  graphite: "#161618",
  charcoal: "#6a6a6b",
  border: "#e8e8ec",
  soft: "#f4f6fb",
  canvas: "#f7f7f9",
}

function esc(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function layout(inner: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};padding:40px 16px;font-family:${FONT}">
    <tbody><tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;border:1px solid ${C.border}">
        <tbody>
          <tr><td style="padding:28px 32px 0">
            <span style="font-size:16px;font-weight:700;color:${C.ink};letter-spacing:-0.2px">Mobem Solutions</span>
          </td></tr>
          ${inner}
          <tr><td style="padding:20px 32px 28px;border-top:1px solid ${C.border}">
            <p style="margin:0;font-size:12px;color:${C.charcoal}">Mobem Solutions · Automatisation des tâches administratives · près de Nantes</p>
          </td></tr>
        </tbody>
      </table>
    </td></tr></tbody>
  </table>`
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-size:12px;color:${C.charcoal};width:150px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-size:14px;color:${C.graphite}">${value}</td>
  </tr>`
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  // Champ piège rempli : on répond « succès » sans rien envoyer.
  if (body && typeof body === "object" && "url" in body && (body as { url?: unknown }).url) {
    return NextResponse.json({ success: true })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Certains champs sont incomplets." }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY manquante")
    return NextResponse.json({ error: "Le service d'envoi n'est pas configuré." }, { status: 503 })
  }

  const d = parsed.data
  const name = esc(d.name)
  const firstName = esc(d.name.split(" ")[0])
  const list = (items: string[]) => (items.length ? items.map(esc).join(", ") : "Non précisé")
  const orDash = (v: string) => (v ? esc(v) : "Non précisé")

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // ── Notification interne ───────────────────────────────────────────
    // Resend ne lève pas d'exception en cas d'échec : il renvoie { error }.
    const internal = await resend.emails.send({
      from: FROM_EMAIL,
      to: [MOBEM_EMAIL],
      replyTo: d.email,
      subject: `Nouvelle demande — ${d.name}${d.company ? ` (${d.company})` : ""} · ${d.sector}`,
      html: layout(`
        <tr><td style="padding:24px 32px 8px">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:${C.blue}">Nouvelle demande de contact</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:${C.ink};letter-spacing:-0.4px">${name}${d.company ? ` · ${esc(d.company)}` : ""}</h1>
        </td></tr>
        <tr><td style="padding:16px 32px 8px">
          <table width="100%" cellpadding="0" cellspacing="0"><tbody>
            ${row("E-mail", `<a href="mailto:${esc(d.email)}" style="color:${C.blue};text-decoration:none">${esc(d.email)}</a>`)}
            ${d.phone ? row("Téléphone", esc(d.phone)) : ""}
            ${row("Métier", esc(d.sector))}
            ${row("Taille de l'équipe", orDash(d.teamSize))}
            ${row("Tâches à automatiser", list(d.tasks))}
            ${row("Temps perdu / semaine", orDash(d.hours))}
            ${row("Outils utilisés", list(d.tools))}
            ${row("Échéance", orDash(d.timing))}
            ${row("Site internet", d.website ? "Oui, intéressé(e)" : "Non")}
          </tbody></table>
        </td></tr>
        ${
          d.message
            ? `<tr><td style="padding:16px 32px 24px">
          <p style="margin:0 0 8px;font-size:12px;color:${C.charcoal}">La tâche qui fait le plus perdre de temps</p>
          <div style="background:${C.soft};border-radius:14px;padding:16px 18px">
            <p style="margin:0;font-size:14px;line-height:1.7;color:${C.graphite};white-space:pre-wrap">${esc(d.message)}</p>
          </div>
        </td></tr>`
            : ""
        }
      `),
    })

    if (internal.error) throw internal.error

    // ── Confirmation au prospect ───────────────────────────────────────
    const confirmation = await resend.emails.send({
      from: FROM_EMAIL,
      to: d.email,
      replyTo: MOBEM_EMAIL,
      subject: "Votre demande a bien été reçue — Mobem Solutions",
      html: layout(`
        <tr><td style="padding:28px 32px 8px">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:${C.blue}">Demande reçue</p>
          <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;line-height:1.15;color:${C.ink};letter-spacing:-0.6px">Merci ${firstName},<br />nous revenons vers vous très vite.</h1>
          <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:${C.charcoal}">
            Nous étudions vos réponses et vous répondons <strong style="color:${C.graphite}">sous 24 heures ouvrées</strong>,
            avec une première idée des tâches automatisables.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.charcoal}">
            Vous préférez en parler de vive voix ? Réservez directement votre diagnostic gratuit de 45 minutes.
          </p>
          <a href="https://mobem-solutions.com/#diagnostic" style="display:inline-block;background:${C.blue};color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 18px;border-radius:14px">Réserver mon diagnostic gratuit</a>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.soft};border-radius:14px"><tbody><tr><td style="padding:16px 18px">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:${C.graphite}">Récapitulatif</p>
            <p style="margin:0 0 4px;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Métier :</span> ${esc(d.sector)}</p>
            <p style="margin:0 0 4px;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Tâches :</span> ${list(d.tasks)}</p>
            <p style="margin:0;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Temps perdu / semaine :</span> ${orDash(d.hours)}</p>
          </td></tr></tbody></table>
        </td></tr>
      `),
    })

    // La demande est déjà arrivée chez nous : un échec de la confirmation n'est pas bloquant.
    if (confirmation.error) console.error("Contact form: confirmation non envoyée", confirmation.error)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." }, { status: 500 })
  }
}
