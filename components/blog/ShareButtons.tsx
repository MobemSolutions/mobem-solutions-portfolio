'use client'

import { useState } from 'react'
import { Linkedin, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = `https://mobem-solutions.com/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const twitterHref = `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 border-t border-border">
      <span className="text-sm text-muted-foreground mr-1">Partager :</span>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X / Twitter"
        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {/* <span className="hidden sm:inline">X</span> */}
      </a>

      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        {/* <span className="hidden sm:inline">LinkedIn</span> */}
      </a>

      <button
        onClick={copyLink}
        aria-label="Copier le lien"
        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="hidden sm:inline text-green-500">Copié !</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Copier le lien</span>
          </>
        )}
      </button>
    </div>
  )
}
