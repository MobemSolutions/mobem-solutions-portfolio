import { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"
import { slugifyHeading } from "@/lib/toc"
import { ArrowRight, Info, AlertTriangle } from "lucide-react"

export const richTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const position = value.position || 'full'
      const size = value.size || 'full'

      const sizeMap: Record<string, string> = {
        small: 'max-w-xs',
        medium: 'max-w-md',
        large: 'max-w-2xl',
        full: 'w-full',
      }

      const wrapMap: Record<string, string> = {
        full: 'w-full',
        center: `${sizeMap[size]} mx-auto`,
        left: `${sizeMap[size]} float-left mr-6 mb-2 mt-1`,
        right: `${sizeMap[size]} float-right ml-6 mb-2 mt-1`,
      }

      return (
        <figure className={`my-8 ${wrapMap[position]}`}>
          <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <Image
              src={urlFor(value).width(1200).quality(90).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      if (value.type === "cta") {
        return (
          <div className="my-10 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-foreground text-lg mb-1">
                {value.text || "Vous avez un projet web ?"}
              </p>
              <p className="text-sm text-muted-foreground">Obtenez un audit gratuit de votre site existant.</p>
            </div>
            {value.ctaLabel && (
              <Link
                href={value.ctaHref || "#contact"}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors shrink-0"
              >
                {value.ctaLabel}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        )
      }
      if (value.type === "warning") {
        return (
          <div className="my-6 flex gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">{value.text}</p>
          </div>
        )
      }
      return (
        <div className="my-6 flex gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">{value.text}</p>
        </div>
      )
    },
  },

  block: {
    h2: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text).join('') || ''
      const id = slugifyHeading(text)
      return (
        <h2 id={id} className="mt-12 mb-4 text-2xl md:text-3xl font-bold text-foreground scroll-mt-24">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text).join('') || ''
      const id = slugifyHeading(text)
      return (
        <h3 id={id} className="mt-8 mb-3 text-xl md:text-2xl font-bold text-foreground scroll-mt-24">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-foreground scroll-mt-24">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-8 text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-accent pl-6 italic text-foreground text-lg font-medium">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 space-y-2 list-disc marker:text-accent">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 space-y-2 list-decimal marker:text-accent marker:font-semibold">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="text-muted-foreground leading-7">{children}</li>,
    number: ({ children }) => <li className="text-muted-foreground leading-7">{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-accent">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#"
      const isExternal = href.startsWith("http")
      return isExternal ? (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
}
