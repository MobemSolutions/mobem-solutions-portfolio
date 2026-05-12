import { NextRequest, NextResponse } from 'next/server'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ''

export async function POST(req: NextRequest) {

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurée.' }, { status: 503 })
  }

  const { title, body } = await req.json()

  if (!title) {
    return NextResponse.json({ error: 'title requis.' }, { status: 400 })
  }

  const bodyText = body
    ? JSON.stringify(body).replace(/"text":"([^"]+)"/g, '$1').replace(/[{}"[\]]/g, ' ').trim().slice(0, 800)
    : ''

  const prompt = `Tu es rédacteur pour Mobem Solutions, une agence web basée à Nantes. Génère une méta-description SEO (extrait) en français pour un article de blog avec le titre suivant.

Titre : "${title}"
${bodyText ? `Début du contenu : ${bodyText}` : ''}

Règles :
- Maximum 160 caractères (compte bien)
- Ton direct et professionnel
- Pas de guillemets autour de la réponse
- Commence par un verbe d'action ou un constat
- Inclus une promesse de valeur concrète

Réponds uniquement avec le texte de l'extrait, rien d'autre.`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur API Anthropic.' }, { status: 502 })
  }

  const data = await res.json()
  const excerpt = (data.content?.[0]?.text ?? '').trim().slice(0, 200)

  return NextResponse.json({ excerpt })
}
