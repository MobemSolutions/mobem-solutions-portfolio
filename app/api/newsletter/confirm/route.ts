import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifyConfirmToken } from '@/lib/newsletter-token'

const resend = new Resend(process.env.RESEND_API_KEY)
const MOBEM_EMAIL = 'contact@mobem-solutions.com'
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Mobem Solutions <noreply@mobem-solutions.com>'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mobem-solutions.com'
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/?newsletter=invalid`)
  }

  const email = verifyConfirmToken(token)

  if (!email) {
    return NextResponse.redirect(`${BASE_URL}/?newsletter=expired`)
  }

  await Promise.all([
    // Stocker l'abonné dans l'audience Resend (idempotent — Resend déduplique par email)
    AUDIENCE_ID
      ? resend.contacts.create({ audienceId: AUDIENCE_ID, email, unsubscribed: false })
      : Promise.resolve(),

    // Notification interne
    resend.emails.send({
      from: FROM_EMAIL,
      to: MOBEM_EMAIL,
      subject: `✅ Nouvel abonné confirmé — ${email}`,
      html: `<p>Nouvel abonné confirmé via double opt-in :<br><strong>${email}</strong></p>`,
    }),

    // Email de bienvenue
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Bienvenue dans la newsletter Mobem Solutions',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden">
          <div style="background:#0f0f0f;padding:28px 40px;border-bottom:2px solid #E86A33">
            <span style="font-size:20px;font-weight:700;color:#E86A33">Mobem<span style="color:#ffffff"> Solutions</span></span>
          </div>
          <div style="padding:48px 40px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#E86A33">Bienvenue</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#111827;letter-spacing:-0.4px;line-height:1.3">
              Vous faites maintenant partie de la newsletter.
            </h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151">
              Merci d'avoir confirmé votre abonnement. Chaque article est rédigé avec soin pour vous apporter des insights concrets sur la stratégie digitale, le design et la performance web.
            </p>
            <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#374151">
              En attendant notre prochain article, retrouvez nos publications récentes sur le blog :
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:10px;background:#E86A33">
                  <a href="${BASE_URL}/blog" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px">
                    Voir les articles →
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div style="border-top:1px solid #f3f4f6;padding:20px 40px;background:#fafafa">
            <p style="margin:0 0 4px;font-size:12px;color:#9ca3af">Mobem Solutions · Nantes, France</p>
            <p style="margin:0;font-size:12px;color:#9ca3af">
              Pour vous désabonner, contactez
              <a href="mailto:${MOBEM_EMAIL}" style="color:#E86A33;text-decoration:none"> ${MOBEM_EMAIL}</a>.
            </p>
          </div>
        </div>
      `,
    }),
  ])

  return NextResponse.redirect(`${BASE_URL}/newsletter/confirme`)
}
