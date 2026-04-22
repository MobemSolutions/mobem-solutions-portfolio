'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useRef } from 'react'

export function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const value = inputRef.current?.value.trim()
    if (value) {
      router.push(`/blog?q=${encodeURIComponent(value)}`)
    }
  }

  function handleClear() {
    router.push('/blog')
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Rechercher un article…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors"
      >
        Rechercher
      </button>
      {q && (
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          Effacer
        </button>
      )}
    </form>
  )
}
