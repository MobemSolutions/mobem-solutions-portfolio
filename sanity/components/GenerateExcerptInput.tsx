import { useCallback, useState } from 'react'
import { set, unset, useFormValue } from 'sanity'
import type { StringInputProps } from 'sanity'

export function GenerateExcerptInput(props: StringInputProps) {
  const { onChange, value, elementProps } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const title = useFormValue(['title']) as string | undefined
  const body = useFormValue(['body']) as unknown[] | undefined

  const handleGenerate = useCallback(async () => {
    if (!title) {
      setError('Renseignez d\'abord le titre de l\'article.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/generate-excerpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })
      if (!res.ok) throw new Error('Erreur API')
      const { excerpt } = await res.json()
      onChange(excerpt ? set(excerpt) : unset())
    } catch {
      setError('Impossible de générer l\'extrait. Vérifiez ANTHROPIC_API_KEY.')
    } finally {
      setLoading(false)
    }
  }, [title, body, onChange])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <textarea
        {...elementProps}
        value={value ?? ''}
        rows={3}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontFamily: 'inherit',
          fontSize: 14,
          border: '1px solid var(--card-border-color, #e2e8f0)',
          borderRadius: 4,
          resize: 'vertical',
          background: 'transparent',
          color: 'inherit',
          lineHeight: 1.6,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !title}
          style={{
            padding: '7px 16px',
            background: loading ? '#ccc' : '#E63030',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            cursor: loading || !title ? 'not-allowed' : 'pointer',
            opacity: loading || !title ? 0.65 : 1,
          }}
        >
          {loading ? 'Génération…' : '✦ Générer'}
        </button>
        {error && (
          <span style={{ fontSize: 12, color: '#E63030' }}>{error}</span>
        )}
        <span style={{ fontSize: 11, color: '#888', marginLeft: 'auto' }}>
          {(value ?? '').length} / 200 caractères
        </span>
      </div>
    </div>
  )
}
