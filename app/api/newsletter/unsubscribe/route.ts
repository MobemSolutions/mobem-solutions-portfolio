import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifyUnsubscribeToken } from '@/lib/newsletter-token'

const resend = new Resend(process.env.RESEND_API_KEY)
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mobem-solutions.com'
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/?newsletter=invalid`)
  }

  const email = verifyUnsubscribeToken(token)
  if (!email) {
    return NextResponse.redirect(`${BASE_URL}/?newsletter=invalid`)
  }

  if (AUDIENCE_ID) {
    // Trouver le contact par email et le marquer désabonné
    const { data: audienceData } = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    const contact = audienceData?.data?.find((c) => c.email === email)
    if (contact) {
      await resend.contacts.update({
        audienceId: AUDIENCE_ID,
        id: contact.id,
        unsubscribed: true,
      })
    }
  }

  return NextResponse.redirect(`${BASE_URL}/?newsletter=unsubscribed`)
}
