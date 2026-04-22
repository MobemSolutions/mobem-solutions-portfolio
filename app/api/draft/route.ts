import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Token invalide', { status: 401 })
  }

  ;(await draftMode()).enable()
  redirect(slug ? `/blog/${slug}` : '/blog')
}
