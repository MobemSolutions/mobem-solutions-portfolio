// Gabarits HTML des e-mails du formulaire de contact (notification interne et confirmation au prospect).
// Tableaux et styles en ligne : seule mise en page fiable dans les clients mail.
import { BOOKING_URL } from "@/lib/automation-content"
import type { ContactPayload } from "@/lib/contact-options"

export const MOBEM_EMAIL = "contact@mobem-solutions.com"

const C = {
  blue: "#0d44e8",
  ink: "#161618",
  charcoal: "#6a6a6b",
  muted: "#838385",
  border: "#e5e5e8",
  tint: "#e6edff",
  canvas: "#f2f3f5",
  paper: "#fcfcfc",
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
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid ${C.border}">
        <tbody>
          <tr><td align="center" style="padding:32px 32px 4px">
            <a href="${SITE}" style="text-decoration:none">
              <img src="${SITE}/email/logo-black.png" width="102" height="32" alt="Mobem Solutions" style="display:block;border:0;outline:none;height:32px;width:102px" />
            </a>
          </td></tr>
          ${inner}
        </tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px"><tbody><tr><td align="center" style="padding:24px 16px 0;font-size:12px;line-height:1.7;color:${C.muted}">
        <a href="${SITE}" style="color:${C.ink};text-decoration:none;font-weight:600">mobem-solutions.com</a>
        &nbsp;·&nbsp;
        <a href="mailto:${MOBEM_EMAIL}" style="color:${C.ink};text-decoration:none">${MOBEM_EMAIL}</a>
        &nbsp;·&nbsp;
        <a href="https://www.linkedin.com/in/mobem-solutions-136816404/" style="color:${C.ink};text-decoration:none">LinkedIn</a>
        <br />Vos outils restent les vôtres. Hébergé en Europe, chez nous ou chez vous.
        <br />${footnote}
      </td></tr></tbody></table>
    </td></tr></tbody>
  </table>`
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-size:12px;color:${C.muted};width:150px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.border};font-size:14px;color:${C.ink}">${value}</td>
  </tr>`
}

const list = (items: string[]) => (items.length ? items.map(esc).join(", ") : "Non précisé")
const orDash = (v: string) => (v ? esc(v) : "Non précisé")

/** Notification envoyée à Mobem Solutions. */
export function internalEmail(d: ContactPayload) {
  const name = esc(d.name)
  const firstName = esc(d.name.split(" ")[0])
  return layout(`
        <tr><td align="center" style="padding:24px 32px 8px">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.muted}">Nouvelle demande</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:${C.ink};letter-spacing:-0.4px">${name}${d.company ? ` · ${esc(d.company)}` : ""}</h1>
          <p style="margin:12px 0 0"><a href="mailto:${esc(d.email)}" style="display:inline-block;background:${C.blue};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:999px">Répondre à ${firstName}</a></p>
        </td></tr>
        <tr><td style="padding:16px 32px 8px">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tbody>
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
            ? `<tr><td style="padding:16px 32px 28px">
          <p style="margin:0 0 8px;font-size:12px;color:${C.muted}">La tâche qui fait le plus perdre de temps</p>
          <div style="background:${C.canvas};border-radius:12px;padding:16px 18px">
            <p style="margin:0;font-size:14px;line-height:1.7;color:${C.ink};white-space:pre-wrap">${esc(d.message)}</p>
          </div>
        </td></tr>`
            : `<tr><td style="padding:0 0 20px"></td></tr>`
        }
      `, `${esc(d.sector)} · ${list(d.tasks)}`, "Notification interne · formulaire de contact de mobem-solutions.com")
}

/** Confirmation envoyée au prospect. */
export function confirmationEmail(d: ContactPayload) {
  const firstName = esc(d.name.split(" ")[0])
  return layout(`
        <tr><td align="center" style="padding:20px 32px 0">
          <img src="${SITE}/email/sent.png" width="200" height="160" alt="" style="display:block;border:0;height:160px;width:200px" />
        </td></tr>
        <tr><td align="center" style="padding:8px 40px 0">
          <h1 style="margin:0;font-size:30px;font-weight:700;line-height:1.15;color:${C.ink};letter-spacing:-0.8px">C'est bien reçu, ${firstName}.</h1>
          <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:${C.charcoal}">
            Nous étudions votre demande et revenons vers vous <strong style="color:${C.ink}">sous 24 heures ouvrées</strong>,
            avec une première idée des tâches que nous pouvons automatiser chez vous.
          </p>
        </td></tr>

        <!-- Encadré : aller plus vite -->
        <tr><td style="padding:28px 32px 0">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.paper};border:1px solid ${C.border};border-radius:12px"><tbody><tr><td style="padding:20px 22px">
            <table cellpadding="0" cellspacing="0" role="presentation"><tbody><tr>
              <td style="vertical-align:middle;padding-right:10px">
                <div style="width:20px;height:20px;border-radius:10px;border:2px solid ${C.ink};text-align:center;font-size:12px;font-weight:700;line-height:20px;color:${C.ink};font-family:Georgia,serif">i</div>
              </td>
              <td style="vertical-align:middle;font-size:15px;font-weight:700;color:${C.ink}">Envie d'aller plus vite ?</td>
            </tr></tbody></table>
            <p style="margin:10px 0 16px;font-size:14px;line-height:1.65;color:${C.charcoal}">
              Choisissez directement un créneau pour un échange de 20 minutes en visio. Nous vous montrons l'automatisation adaptée à votre métier et nous voyons ensemble ce qui peut être automatisé chez vous.
            </p>
            <a href="${BOOKING_URL}" style="display:inline-block;background:${C.tint};color:${C.blue};text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:999px">Réserver un échange</a>
          </td></tr></tbody></table>
        </td></tr>

        <!-- Récapitulatif -->
        <tr><td style="padding:24px 32px 0">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.muted}">Votre demande</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tbody>
            ${row("Métier", esc(d.sector))}
            ${row("Tâches", list(d.tasks))}
            ${row("Temps perdu / semaine", orDash(d.hours))}
          </tbody></table>
        </td></tr>

        <tr><td align="center" style="padding:28px 32px 32px">
          <p style="margin:0;font-size:14px;color:${C.ink}">Une question ? <a href="mailto:${MOBEM_EMAIL}" style="color:${C.blue};text-decoration:none;font-weight:600">Répondez simplement à cet e-mail</a></p>
          <p style="margin:20px 0 0;font-size:14px;color:${C.charcoal}">À très vite,<br /><strong style="color:${C.ink}">Mobem Solutions</strong></p>
        </td></tr>
      `, `Merci ${firstName}, nous revenons vers vous sous 24 heures ouvrées.`)
}
