import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const MOBEM_EMAIL = "contact@mobem-solutions.com"
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Mobem Solutions <noreply@mobem-solutions.com>"

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, services, budget, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
    }

    const servicesLine = services?.length
      ? services.join(", ")
      : "Non précisé"

    const budgetLine = budget || "Non précisé"

    // Email de notification interne
    await resend.emails.send({
      from: FROM_EMAIL,
      to: MOBEM_EMAIL,
      subject: `Nouveau contact — ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
          <h2 style="color:#111;border-bottom:2px solid #f59e0b;padding-bottom:8px">Nouveau message de ${name}</h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px">Nom</td><td style="padding:8px 0;font-weight:500">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#f59e0b">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#6b7280">Entreprise</td><td style="padding:8px 0;font-weight:500">${company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">Services</td><td style="padding:8px 0">${servicesLine}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Budget</td><td style="padding:8px 0">${budgetLine}</td></tr>
          </table>
          <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0;color:#6b7280;font-size:13px;margin-bottom:8px">Message</p>
            <p style="margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:24px">Reçu via mobem-solutions.com</p>
        </div>
      `,
    })

    // Email de confirmation au prospect
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Votre message a bien été reçu — Mobem Solutions",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
          <div style="background:#111;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#f59e0b;margin:0;font-size:20px">Mobem Solutions</h1>
          </div>
          <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0 0 16px">Bonjour ${name},</p>
            <p style="margin:0 0 16px">Nous avons bien reçu votre message et vous en remercions. Un associé reviendra vers vous <strong>sous 24 heures ouvrées</strong>.</p>

            <div style="background:#f9fafb;border-left:3px solid #f59e0b;padding:16px;margin:24px 0;border-radius:0 8px 8px 0">
              <p style="margin:0;color:#6b7280;font-size:13px;margin-bottom:6px">Votre message</p>
              <p style="margin:0;white-space:pre-wrap;font-size:14px">${message}</p>
            </div>

            <p style="margin:0 0 8px;color:#6b7280;font-size:14px">Récapitulatif de votre demande :</p>
            <ul style="margin:0 0 24px;padding:0 0 0 20px;color:#374151;font-size:14px">
              ${services?.length ? `<li>Services : ${servicesLine}</li>` : ""}
              ${budget ? `<li>Budget : ${budgetLine}</li>` : ""}
            </ul>

            <p style="margin:0 0 4px">À très vite,</p>
            <p style="margin:0;font-weight:600">Nathan & Arnaud</p>
            <p style="margin:0;color:#6b7280;font-size:13px">Mobem Solutions — Nantes</p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
            <p style="margin:0;color:#9ca3af;font-size:12px">
              Cet email est une confirmation automatique. Pour nous joindre directement :
              <a href="mailto:${MOBEM_EMAIL}" style="color:#f59e0b">${MOBEM_EMAIL}</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessayez." }, { status: 500 })
  }
}
