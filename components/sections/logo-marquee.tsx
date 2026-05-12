const STACK = [
  { name: "Next.js",              src: "/ressources/caroussel-logos/technos/icons8-next.js.svg" },
  { name: "TypeScript",           src: "/ressources/caroussel-logos/technos/typescript.svg" },
  { name: "Tailwind CSS",         src: "/ressources/caroussel-logos/technos/icons8-tailwind-css.svg" },
  { name: "Node.js",              src: "/ressources/caroussel-logos/technos/icons8-nodejs.svg" },
  { name: "Supabase",             src: "/ressources/caroussel-logos/technos/icons8-supabase.svg" },
  { name: "PostgreSQL",           src: "/ressources/caroussel-logos/technos/icons8-postgresql.svg" },
  { name: "Claude AI",            src: "/ressources/caroussel-logos/technos/icons8-claude.svg" },
  { name: "Vercel",               src: "/ressources/caroussel-logos/technos/vercel-icon-svgrepo-com.svg" },
  { name: "Docker",               src: "/ressources/caroussel-logos/technos/icons8-docker.svg" },
  { name: "GitHub",               src: "/ressources/caroussel-logos/technos/icons8-github.svg" },
  // { name: "Lighthouse",        src: "/ressources/caroussel-logos/technos/Google_Lighthouse_logo.svg" },
  // { name: "Screaming Frog",       src: "/ressources/caroussel-logos/technos/screaming-frog-1.svg", large: true },
  { name: "Google Search Console",src: "/ressources/caroussel-logos/technos/icons8-google-web-search.svg" },
  { name: "W3C",                  src: "/ressources/caroussel-logos/technos/w3c-ar21.svg" },
]

function StackItem({ name, src, large }: { name: string; src: string; large?: boolean }) {
  return (
    <div
      className="inline-flex flex-col items-center justify-center shrink-0 gap-3 py-7"
      style={{
        borderRight: "1px solid var(--color-border)",
        paddingLeft: large ? "80px" : "48px",
        paddingRight: large ? "80px" : "48px",
      }}
    >
      <div
        className="bg-foreground/50 transition-colors"
        style={{
          width: large ? "130px" : "32px",
          height: large ? "130px" : "32px",
          mask: `url(${src}) center / contain no-repeat`,
          WebkitMask: `url(${src}) center / contain no-repeat`,
        }}
        aria-hidden="true"
      />
      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const items = [...STACK, ...STACK]

  return (
    <div
      role="region"
      aria-label="Stack technique"
      className="marquee-wrap overflow-hidden border-t border-b border-border"
    >
      <div className="marquee-track flex" aria-hidden="true">
        {items.map((s, i) => (
          <StackItem key={`${s.name}-${i}`} name={s.name} src={s.src} />
        ))}
      </div>
    </div>
  )
}
