import { cn } from "@/lib/utils"

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>
}

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: React.ReactNode
  text?: React.ReactNode
  align?: "left" | "center"
  as?: "h1" | "h2"
  className?: string
}

export function SectionHeading({ id, eyebrow, title, text, align = "left", as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div data-animate="" className={cn("flex flex-col gap-4", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cn("type-section max-w-[22ch] text-ink text-balance", align === "center" && "mx-auto")}>
        {title}
      </Tag>
      {text && <p className={cn("type-body max-w-[60ch] text-charcoal", align === "center" && "mx-auto")}>{text}</p>}
    </div>
  )
}

export function SourceCaption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-caption text-charcoal", className)}>{children}</p>
}

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-[20px] bg-white shadow-card">
      {items.map((item) => (
        <details key={item.question} className="faq-details group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 type-feature text-graphite">
            {item.question}
          </summary>
          <p className="max-w-[68ch] pb-6 text-[16px] leading-[1.65] text-charcoal">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

/** Sur-titre en capitales espacées. */
export function Eyebrow({
  children,
  className,
  id,
  as: Tag = "p",
}: {
  children: React.ReactNode
  className?: string
  id?: string
  as?: "p" | "h2" | "span"
}) {
  return (
    <Tag id={id} className={cn("eyebrow text-[#838385]", className)}>
      {children}
    </Tag>
  )
}
