export type TocItem = { id: string; text: string; level: 2 | 3 }

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function extractToc(body: any[]): TocItem[] {
  if (!body) return []
  return body
    .filter(b => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map(b => {
      const text = b.children?.map((c: any) => c.text).join('') || ''
      return { id: slugifyHeading(text), text, level: (b.style === 'h2' ? 2 : 3) as 2 | 3 }
    })
    .filter(h => h.text)
}
