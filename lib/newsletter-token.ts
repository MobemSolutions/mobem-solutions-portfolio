import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.NEWSLETTER_SECRET ?? 'change-me-in-production'
const TTL_MS = 24 * 60 * 60 * 1000 // 24h

export function generateUnsubscribeToken(email: string): string {
  const encoded = Buffer.from(email).toString('base64url')
  const sig = createHmac('sha256', SECRET).update(encoded).digest('base64url')
  return `${encoded}.${sig}`
}

export function verifyUnsubscribeToken(token: string): string | null {
  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return null
  const encoded = token.slice(0, dotIdx)
  const sig = token.slice(dotIdx + 1)
  const expected = createHmac('sha256', SECRET).update(encoded).digest('base64url')
  try {
    if (!timingSafeEqual(Buffer.from(sig, 'base64url'), Buffer.from(expected, 'base64url'))) return null
  } catch { return null }
  return Buffer.from(encoded, 'base64url').toString()
}

export function generateConfirmToken(email: string): string {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + TTL_MS })).toString('base64url')
  const sig = createHmac('sha256', SECRET).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyConfirmToken(token: string): string | null {
  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return null

  const payload = token.slice(0, dotIdx)
  const sig = token.slice(dotIdx + 1)
  const expected = createHmac('sha256', SECRET).update(payload).digest('base64url')

  try {
    if (!timingSafeEqual(Buffer.from(sig, 'base64url'), Buffer.from(expected, 'base64url'))) return null
  } catch {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (typeof data.email !== 'string' || data.exp < Date.now()) return null
    return data.email
  } catch {
    return null
  }
}
