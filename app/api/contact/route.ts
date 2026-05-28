import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const VALID_SERVICES = [
  "Design UI/UX",
  "Création de site vitrine",
  "Refonte de site existant",
  "Application web (SaaS / backoffice)",
  "Application mobile",
  "E-commerce",
  "SEO & Référencement naturel",
  "Conseil & stratégie digitale",
] as const

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  company: z.string().max(200).optional(),
  services: z
    .union([z.enum(VALID_SERVICES), z.array(z.enum(VALID_SERVICES))])
    .optional(),
  budget: z.string().max(100).optional(),
  message: z.string().min(1).max(5000),
})

const MOBEM_EMAIL = "contact@mobem-solutions.com"
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Mobem Solutions <noreply@mobem-solutions.com>"

const B = {
  red:    '#E63030',
  ink:    '#0D0D0D',
  paper:  '#F8F7F5',
  white:  '#FFFFFF',
  border: '#E2E2E2',
  subtle: '#F3F3F1',
  muted:  '#6B7280',
  faint:  '#9CA3AF',
}

const SERVICE_ROUTING: Record<string, string> = {
  "Design UI/UX": "antoine.clavier@mobem-solutions.com",
  "Création de site vitrine": "arnaud.clavier@mobem-solutions.com",
  "Refonte de site existant": "arnaud.clavier@mobem-solutions.com",
  "Application web (SaaS / backoffice)": "arnaud.clavier@mobem-solutions.com",
  "Application mobile": "arnaud.clavier@mobem-solutions.com",
  "E-commerce": "arnaud.clavier@mobem-solutions.com",
  "SEO & Référencement naturel": "nathan.portier@mobem-solutions.com",
  "Conseil & stratégie digitale": "nathan.portier@mobem-solutions.com",
}

const header = `
  <tr>
    <td style="background:${B.ink};padding:20px 32px;border-bottom:3px solid ${B.red}">
      <table width="100%" cellpadding="0" cellspacing="0"><tbody><tr>
        <td>
          <span style="display:inline-block;width:28px;height:28px;background:${B.red};color:#fff;font-size:17px;font-weight:900;line-height:28px;text-align:center;margin-right:10px;vertical-align:middle">M</span>
          <span style="font-size:14px;font-weight:700;letter-spacing:-0.2px;color:#fff;vertical-align:middle">Mobem Solutions</span>
        </td>
      </tr></tbody></table>
    </td>
  </tr>
`

const footer = `
  <tr>
    <td style="border-top:1px solid ${B.border};padding:16px 32px;background:${B.subtle}">
      <p style="margin:0;font-size:11px;color:${B.faint};letter-spacing:0.06em;text-transform:uppercase;font-weight:500">
        Mobem Solutions · Nantes, France
      </p>
    </td>
  </tr>
`

function esc(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 })
    }

    const { name, email, company, services, budget, message } = parsed.data

    const safeName    = esc(name)
    const safeEmail   = esc(email)
    const safeCompany = company ? esc(company) : ""
    const safeMessage = esc(message)

    const serviceLabel = Array.isArray(services) ? services[0] : services
    const servicesLine = serviceLabel ? esc(String(serviceLabel)) : "Non précisé"
    const budgetLine   = budget ? esc(String(budget)) : "Non précisé"

    const toAddresses = [MOBEM_EMAIL]
    if (serviceLabel && SERVICE_ROUTING[serviceLabel]) {
      const specialist = SERVICE_ROUTING[serviceLabel]
      if (specialist !== MOBEM_EMAIL) toAddresses.push(specialist)
    }

    // ── Email interne (notification équipe) ──────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: toAddresses,
      subject: `Nouveau contact — ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${B.paper};padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif">
          <tbody><tr><td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid ${B.border}">
              <tbody>
                ${header}
                <tr>
                  <td style="padding:36px 32px">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.red}">
                      Nouveau message reçu
                    </p>
                    <h1 style="margin:0 0 24px;font-size:24px;font-weight:800;color:${B.ink};letter-spacing:-0.4px">
                      ${safeName}${safeCompany ? ` · ${safeCompany}` : ""}
                    </h1>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
                      <tbody>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${B.faint};width:130px">Email</td>
                          <td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:14px"><a href="mailto:${safeEmail}" style="color:${B.red};text-decoration:none">${safeEmail}</a></td>
                        </tr>
                        ${safeCompany ? `<tr><td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${B.faint};width:130px">Entreprise</td><td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:14px">${safeCompany}</td></tr>` : ""}
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${B.faint}">Prestation</td>
                          <td style="padding:10px 0;border-bottom:1px solid ${B.border};font-size:14px">${servicesLine}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${B.faint}">Budget</td>
                          <td style="padding:10px 0;font-size:14px">${budgetLine}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${B.faint}">Message</p>
                    <div style="background:${B.subtle};border-left:3px solid ${B.red};padding:16px 20px">
                      <p style="margin:0;font-size:14px;line-height:1.7;color:${B.ink};white-space:pre-wrap">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
                ${footer}
              </tbody>
            </table>
          </td></tr></tbody>
        </table>
      `,
    })

    // ── Email de confirmation (prospect) ─────────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Votre message a bien été reçu — Mobem Solutions",
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${B.paper};padding:48px 16px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif">
          <tbody><tr><td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid ${B.border}">
              <tbody>
                ${header}
                <tr>
                  <td style="padding:44px 32px 36px">
                    <p style="margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.red}">
                      Message reçu
                    </p>
                    <h1 style="margin:0 0 20px;font-size:30px;font-weight:800;line-height:1.1;color:${B.ink};letter-spacing:-0.6px">
                      Merci ${safeName.split(" ")[0]},<br />on revient vite.
                    </h1>
                    <p style="margin:0 0 10px;font-size:15px;line-height:1.7;color:${B.muted}">
                      Votre message est bien reçu. Un associé vous répondra <strong style="color:${B.ink}">sous 24 heures ouvrées</strong>.
                    </p>
                    <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:${B.muted}">
                      En attendant, n'hésitez pas à jeter un œil à nos <a href="https://mobem-solutions.com/realisations" style="color:${B.red};text-decoration:none">réalisations</a> ou à notre <a href="https://mobem-solutions.com/blog" style="color:${B.red};text-decoration:none">journal</a>.
                    </p>
                    ${(serviceLabel || budget) ? `
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border-left:3px solid ${B.red};background:${B.subtle}">
                      <tbody><tr><td style="padding:16px 20px">
                        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.red}">Récapitulatif</p>
                        ${serviceLabel ? `<p style="margin:0 0 6px;font-size:14px;color:${B.ink}"><span style="color:${B.faint}">Prestation :</span> ${servicesLine}</p>` : ""}
                        ${budget ? `<p style="margin:0;font-size:14px;color:${B.ink}"><span style="color:${B.faint}">Budget :</span> ${budgetLine}</p>` : ""}
                      </td></tr></tbody>
                    </table>
                    ` : ""}
                    <p style="margin:0 0 4px;font-size:15px;color:${B.ink}">À très vite,</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:${B.ink}">Nathan &amp; Arnaud</p>
                    <p style="margin:0;font-size:13px;color:${B.faint}">Mobem Solutions — Nantes</p>
                  </td>
                </tr>
                ${footer}
              </tbody>
            </table>
          </td></tr></tbody>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessayez." }, { status: 500 })
  }
}
