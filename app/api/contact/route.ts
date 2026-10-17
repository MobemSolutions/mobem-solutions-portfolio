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

// Les images d'e-mail doivent être servies en PNG par une URL publique (les clients mail bloquent le SVG).
const SITE = process.env.APP_URL ?? "https://mobem-solutions.com"

function layout(inner: string, preheader: string, footnote = "Vous recevez cet e-mail suite à votre demande sur mobem-solutions.com.") {
  return `
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.canvas};padding:40px 16px;font-family:${FONT}">
    <tbody><tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;background:#ffffff;border-radius:20px;border:1px solid ${C.border};overflow:hidden">
        <tbody>
          <tr><td bgcolor="${C.blue}" style="background:${C.blue};background-image:linear-gradient(135deg,#3d6cf5 0%,#0d44e8 55%,#0a2fa8 100%);padding:28px 32px 26px;border-radius:20px 20px 0 0">
            <a href="${SITE}" style="text-decoration:none">
              <img src="${SITE}/email/logo-white.png" width="114" height="36" alt="Mobem Solutions" style="display:block;border:0;outline:none;height:36px;width:114px" />
            </a>
            <p style="margin:18px 0 0;font-size:15px;line-height:1.45;color:#ffffff;opacity:0.85">Vos tâches administratives tournent toutes seules.</p>
          </td></tr>
          ${inner}
          <tr><td style="padding:24px 32px 28px;border-top:1px solid ${C.border}">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr>
              <td style="vertical-align:middle">
                <img src="${SITE}/email/logo-black.png" width="76" height="24" alt="Mobem Solutions" style="display:block;border:0;height:24px;width:76px" />
              </td>
              <td align="right" style="vertical-align:middle;font-size:12px">
                <a href="${SITE}" style="color:${C.graphite};text-decoration:none;font-weight:600">mobem-solutions.com</a>
                <span style="color:${C.border}">&nbsp;·&nbsp;</span>
                <a href="mailto:${MOBEM_EMAIL}" style="color:${C.graphite};text-decoration:none">Nous écrire</a>
                <span style="color:${C.border}">&nbsp;·&nbsp;</span>
                <a href="https://www.linkedin.com/in/mobem-solutions-136816404/" style="color:${C.graphite};text-decoration:none">LinkedIn</a>
              </td>
            </tr></tbody></table>
            <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:${C.charcoal}">
              Automatisation des tâches administratives pour les TPE et PME, installée sur vos propres outils. Basée près de Nantes.
            </p>
          </td></tr>
        </tbody>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:${C.charcoal};font-family:${FONT}">${footnote}</p>
    </td></tr></tbody>
  </table>`
}

function step(n: number, title: string, text: string) {
  return `<tr>
    <td style="vertical-align:top;width:40px;padding:0 0 16px">
      <div style="width:28px;height:28px;border-radius:14px;background:${C.blue};color:#ffffff;font-size:13px;font-weight:700;line-height:28px;text-align:center">${n}</div>
    </td>
    <td style="vertical-align:top;padding:3px 0 16px">
      <p style="margin:0;font-size:15px;font-weight:600;color:${C.graphite}">${title}</p>
      <p style="margin:2px 0 0;font-size:14px;line-height:1.55;color:${C.charcoal}">${text}</p>
    </td>
  </tr>`
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
      `, `${esc(d.sector)} · ${list(d.tasks)}`, "Notification interne · formulaire de contact de mobem-solutions.com"),
    })

    if (internal.error) throw internal.error

    // ── Confirmation au prospect ───────────────────────────────────────
    const confirmation = await resend.emails.send({
      from: FROM_EMAIL,
      to: d.email,
      replyTo: MOBEM_EMAIL,
      subject: "Votre demande a bien été reçue — Mobem Solutions",
      html: layout(`
        <tr><td style="padding:32px 32px 8px">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:${C.blue}">Demande reçue</p>
          <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;line-height:1.15;color:${C.ink};letter-spacing:-0.6px">Merci ${firstName},<br />nous revenons vers vous très vite.</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.charcoal}">
            Nous étudions vos réponses et vous répondons <strong style="color:${C.graphite}">sous 24 heures ouvrées</strong>,
            avec une première idée des tâches automatisables chez vous.
          </p>
        </td></tr>
        <tr><td style="padding:0 32px 8px">
          <p style="margin:0 0 16px;font-size:12px;font-weight:600;color:${C.graphite}">Les prochaines étapes</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tbody>
            ${step(1, "Diagnostic gratuit de 45 minutes", "Nous listons ensemble vos tâches répétitives et le temps qu'elles vous coûtent.")}
            ${step(2, "Une première automatisation", "Installée sur vos propres comptes, avec vos outils actuels.")}
            ${step(3, "Les heures gagnées, mesurées", "Avant / après, chiffres à l'appui.")}
          </tbody></table>
        </td></tr>
        <tr><td style="padding:8px 32px 28px">
          <a href="${SITE}/#diagnostic" style="display:inline-block;background:${C.blue};color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:13px 20px;border-radius:14px">Réserver mon diagnostic gratuit &rarr;</a>
          <p style="margin:12px 0 0;font-size:13px;color:${C.charcoal}">Ou répondez simplement à cet e-mail.</p>
        </td></tr>
        <tr><td style="padding:0 32px 24px">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.soft};border-radius:14px"><tbody><tr><td style="padding:16px 18px">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:${C.graphite}">Votre demande</p>
            <p style="margin:0 0 4px;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Métier :</span> ${esc(d.sector)}</p>
            <p style="margin:0 0 4px;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Tâches :</span> ${list(d.tasks)}</p>
            <p style="margin:0;font-size:14px;color:${C.graphite}"><span style="color:${C.charcoal}">Temps perdu / semaine :</span> ${orDash(d.hours)}</p>
          </td></tr></tbody></table>
        </td></tr>
        <tr><td style="padding:0 32px 28px">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid ${C.border};border-radius:14px"><tbody><tr><td style="padding:14px 18px;font-size:13px;line-height:1.5;color:${C.graphite}">
            <span style="color:${C.blue};font-weight:700">&#10003;</span>&nbsp; Installé sur vos propres comptes. Vos données restent chez vous.
          </td></tr></tbody></table>
          <p style="margin:24px 0 0;font-size:15px;color:${C.graphite}">À très vite,</p>
          <p style="margin:2px 0 0;font-size:15px;font-weight:700;color:${C.ink}">Mobem Solutions</p>
          <p style="margin:2px 0 0;font-size:13px;color:${C.charcoal}">« Diagnostiquer avant de prescrire. »</p>
        </td></tr>
      `, `Merci ${firstName}, nous revenons vers vous sous 24 heures ouvrées.`),
    })

    // La demande est déjà arrivée chez nous : un échec de la confirmation n'est pas bloquant.
    if (confirmation.error) console.error("Contact form: confirmation non envoyée", confirmation.error)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." }, { status: 500 })
  }
}
