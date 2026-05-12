import { cn } from "@/lib/utils"

type Variant = "accent" | "neutral" | "muted"

const variants: Record<Variant, string> = {
  accent: "border-accent/40 text-accent",
  neutral: "border-border text-foreground",
  muted: "border-border text-muted-foreground",
}

export function EditorialBadge({
  children,
  variant = "accent",
  className,
}: {
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] uppercase tracking-[0.08em] border px-2.5 py-1",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
