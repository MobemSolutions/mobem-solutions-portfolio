import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateConfirmToken } from '@/lib/newsletter-token'
import { ConfirmEmail } from '@/emails/ConfirmEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Mobem Solutions <noreply@mobem-solutions.com>'
const BASE_URL = (process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL)
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? 'https://mobem-solutions.com')
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    // Check for existing confirmed subscription
    if (AUDIENCE_ID) {
      try {
        const { data: audienceData, error: listError } = await resend.contacts.list({ audienceId: AUDIENCE_ID })
        if (!listError && audienceData?.data) {
          const existing = audienceData.data.find(
            (c: { email: string; unsubscribed: boolean }) =>
              c.email.toLowerCase() === email.toLowerCase() && !c.unsubscribed
          )
          if (existing) {
            return NextResponse.json(
              { error: 'Vous êtes déjà inscrit(e) à notre newsletter.', alreadySubscribed: true },
              { status: 409 }
            )
          }
        }
      } catch (e) {
        console.error('[newsletter] contacts.list error:', e)
      }
    }

    const token = generateConfirmToken(email)
    const confirmUrl = `${BASE_URL}/api/newsletter/confirm?token=${token}`

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Confirmez votre abonnement — Mobem Solutions',
      react: ConfirmEmail({ email, confirmUrl }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[newsletter] send error:', err)
    return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 })
  }
}
