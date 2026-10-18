import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { HOURS, SECTORS, TASKS, TEAM_SIZES, TIMINGS, TOOLS } from "@/lib/contact-options"
import { MOBEM_EMAIL, confirmationEmail, internalEmail } from "@/lib/contact-emails"

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(200).default(""),
  phone: z.string().trim().max(40).default(""),
  sector: z.enum(SECTORS),
  teamSize: z.enum(TEAM_SIZES).or(z.literal("")).default(""),
  tasks: z.array(z.enum(TASKS)).max(TASKS.length).default([]),
  hours: z.enum(HOURS).or(z.literal("")).default(""),
  tools: z.array(z.enum(TOOLS)).max(TOOLS.length).default([]),
  message: z.string().trim().max(5000).default(""),
  timing: z.enum(TIMINGS).or(z.literal("")).default(""),
  website: z.boolean().default(false),
  consent: z.literal(true),
  url: z.string().max(0).default(""),
})

const FROM_EMAIL = process.env.FROM_EMAIL ?? "Mobem Solutions <noreply@mobem-solutions.com>"

// Limite simple par IP (au mieux par instance) : 5 envois par tranche de 10 minutes.
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  // Champ piège rempli : on répond « succès » sans rien envoyer.
  if (body && typeof body === "object" && "url" in body && (body as { url?: unknown }).url) {
    return NextResponse.json({ success: true })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Certains champs sont incomplets." }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY manquante")
    return NextResponse.json({ error: "Le service d'envoi n'est pas configuré." }, { status: 503 })
  }

  const d = parsed.data

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // ── Notification interne ───────────────────────────────────────────
    // Resend ne lève pas d'exception en cas d'échec : il renvoie { error }.
    const internal = await resend.emails.send({
      from: FROM_EMAIL,
      to: [MOBEM_EMAIL],
      replyTo: d.email,
      subject: `Nouvelle demande — ${d.name}${d.company ? ` (${d.company})` : ""} · ${d.sector}`,
      html: internalEmail(d),
    })

    if (internal.error) throw internal.error

    // ── Confirmation au prospect ───────────────────────────────────────
    const confirmation = await resend.emails.send({
      from: FROM_EMAIL,
      to: d.email,
      replyTo: MOBEM_EMAIL,
      subject: "C'est bien reçu — Mobem Solutions",
      html: confirmationEmail(d),
    })

    // La demande est déjà arrivée chez nous : un échec de la confirmation n'est pas bloquant.
    if (confirmation.error) console.error("Contact form: confirmation non envoyée", confirmation.error)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." }, { status: 500 })
  }
}
