import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getAllRealisations } from "@/lib/sanity"
import { CASES, type Case } from "@/lib/cases"

const KPI_OVERRIDES: Record<string, string> = {
  "Cabinet d'Avocats": 'Livré en 8 j',
  "Chambre d'Hôtes":   '×3 réservations',
}

function normaliseSanityCase(r: any): Case {
  const client = r.client ?? ''
  return {
    idx:        r.idx         ?? '',
    client,
    sector:     r.sector      ?? '',
    tag:        r.tag         ?? '',
    kpi:        KPI_OVERRIDES[client] ?? r.kpi ?? '',
    year:       r.year        ?? '',
    cat:        r.cat         ?? '',
    slug:       r.slug        ?? '',
    desc:       r.desc        ?? '',
    stats:      (r.stats ?? []).map((s: { v: string; l: string }) => [s.v, s.l] as [string, string]),
    kpis:       r.kpis        ?? [],
    body:       r.body        ?? [],
    stack:      r.stack       ?? [],
    quote:      r.quote       ?? { text: '', author: '', role: '' },
    coverImage: r.coverImage  ?? undefined,
  }
}

export async function PortfolioBand() {
  const raw = await getAllRealisations().catch(() => [])
  const cases: Case[] = (raw.length > 0 ? raw.map(normaliseSanityCase) : CASES).slice(0, 3)

  return (
    <section className="bg-inverted text-inverted-foreground border-t border-border" aria-labelledby="portfolio-band-heading">

      {/* Editorial header */}
      <div className="flex items-end justify-between gap-6 px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-10 lg:pb-12 border-b border-inverted-foreground/10">
        <h2
          id="portfolio-band-heading"
          className="text-[clamp(44px,6vw,80px)] font-bold leading-[0.92] tracking-[-0.04em]"
        >
          Nos <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">réalisations.</span>
        </h2>
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2.5 px-5 py-3 border border-inverted-foreground/20 font-mono text-[11px] uppercase tracking-widest shrink-0 mb-1 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          Tout voir <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-inverted-foreground/10">
        {cases.map((c, i) => {
          const imgUrl = (c as any).coverImage?.asset?.url as string | undefined
          return (
            <Link
              key={c.slug || i}
              href={`/realisations/${c.slug}`}
              data-cursor="hover"
              className="group flex flex-col gap-0 transition-colors duration-300 hover:bg-accent"
            >
              {/* Thumbnail — framed with dark padding */}
              <div className="px-5 pt-6 pb-0">
                <div className="relative aspect-video overflow-hidden bg-white/5">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={c.client}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 scale-[1.02] group-hover:scale-100 transition-all duration-500 ease-out"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  {/* KPI badge */}
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest bg-white text-accent group-hover:bg-accent group-hover:text-white px-2 py-0.5 transition-colors duration-300">
                    {c.kpi}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 px-5 pt-4 pb-6">
                <h3 className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-inverted-foreground group-hover:text-white transition-colors duration-300">
                  {c.client}
                </h3>
                <p className="text-[11px] leading-relaxed text-inverted-foreground/60 group-hover:text-white transition-colors duration-300">
                  {c.desc}
                </p>
                <span className="font-mono text-[9px] uppercase tracking-widest text-inverted-foreground/60 border border-inverted-foreground/25 px-2 py-1 self-start mt-1 group-hover:border-white/60 group-hover:text-white transition-colors duration-300">
                  {c.tag}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="pb-8 lg:pb-10" />

    </section>
  )
}
