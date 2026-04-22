import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { NewArticleAlert } from '@/emails/NewArticleAlert'
import { generateUnsubscribeToken } from '@/lib/newsletter-token'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Mobem Solutions <noreply@mobem-solutions.com>'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mobem-solutions.com'
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET ?? ''
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

function sanityImageUrl(ref: string): string | undefined {
  const match = ref.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) return undefined
  const [, hash, dimensions, format] = match
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${hash}-${dimensions}.${format}?w=600&auto=format`
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

export async function POST(req: NextRequest) {
  // Vérifier le secret du webhook Sanity
  const secret = req.headers.get('sanity-webhook-secret')
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  // Ignorer les brouillons et les types non-article
  if (body._type !== 'post' || (body._id as string)?.startsWith('drafts.')) {
    return NextResponse.json({ skipped: true })
  }

  const title: string = body.title
  const slug: string = body.slug?.current
  const excerpt: string = body.excerpt
  const publishedAt: string | undefined = body.publishedAt
  const imageRef: string | undefined = body.mainImage?.asset?._ref
  const imageUrl = imageRef ? sanityImageUrl(imageRef) : undefined

  if (!title || !slug) {
    return NextResponse.json({ error: 'title et slug requis' }, { status: 400 })
  }

  if (!AUDIENCE_ID) {
    return NextResponse.json({ error: 'RESEND_AUDIENCE_ID manquant' }, { status: 500 })
  }

  // Récupérer tous les abonnés confirmés
  const { data: audienceData, error: listError } = await resend.contacts.list({ audienceId: AUDIENCE_ID })
  if (listError) {
    return NextResponse.json({ error: 'Impossible de récupérer les abonnés' }, { status: 500 })
  }

  const subscribers = (audienceData?.data ?? []).filter((c) => !c.unsubscribed)
  if (subscribers.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  // Construire les emails (batch de 100 max par appel Resend)
  const emails = subscribers.map((contact) => ({
    from: FROM_EMAIL,
    to: contact.email,
    subject: `${title} — Notre dernière analyse`,
    react: NewArticleAlert({
      title,
      excerpt,
      slug,
      imageUrl,
      publishedAt,
      unsubscribeUrl: `${BASE_URL}/api/newsletter/unsubscribe?token=${generateUnsubscribeToken(contact.email)}`,
    }),
  }))

  for (const batch of chunk(emails, 100)) {
    await resend.batch.send(batch)
  }

  return NextResponse.json({ sent: emails.length })
}
