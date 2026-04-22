import Link from 'next/link'

export function DraftBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-accent px-5 py-3 text-accent-foreground shadow-lg">
      <span className="text-sm font-medium">
        Prévisualisation active — contenu en brouillon visible
      </span>
      <Link
        href="/api/disable-draft"
        className="text-sm font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        Quitter la prévisualisation
      </Link>
    </div>
  )
}
