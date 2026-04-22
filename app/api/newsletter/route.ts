import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateConfirmToken } from '@/lib/newsletter-token'
import { ConfirmEmail } from '@/emails/ConfirmEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Mobem Solutions <noreply@mobem-solutions.com>'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mobem-solutions.com'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
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
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 })
  }
}
