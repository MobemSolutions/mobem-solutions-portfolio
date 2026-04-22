'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/lib/toc'

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0% -60% 0%' }
    )

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Sommaire
      </p>
      <nav className="space-y-0.5">
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'block text-sm py-1.5 border-l-2 transition-colors',
              item.level === 3 ? 'pl-6' : 'pl-3',
              active === item.id
                ? 'border-accent text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-accent/50'
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
