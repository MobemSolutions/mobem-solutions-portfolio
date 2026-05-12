'use client'

import { useState, useEffect, useCallback } from 'react'
import { useClient } from 'sanity'

type DocType = 'post' | 'realisation'

interface SanityDoc {
  _id: string
  _type: string
  title?: string
  client?: string
  publishedAt?: string
  _createdAt: string
  slug?: { current: string }
}

const TABS: { id: DocType; label: string }[] = [
  { id: 'post', label: 'Articles' },
  { id: 'realisation', label: 'Réalisations' },
]

const QUERIES: Record<DocType, string> = {
  post: `*[_type == "post"] | order(publishedAt desc) { _id, _type, title, publishedAt, _createdAt, slug }`,
  realisation: `*[_type == "realisation"] | order(_createdAt desc) { _id, _type, title, client, _createdAt, slug }`,
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  )
}

const s = {
  wrap: { maxWidth: 760, margin: '0 auto', padding: 24, fontFamily: 'system-ui, -apple-system, sans-serif' } as React.CSSProperties,
  header: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 } as React.CSSProperties,
  h1: { margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: 'var(--black, #101112)' } as React.CSSProperties,
  sub: { margin: 0, fontSize: 13, color: 'var(--gray-500, #6b7280)' } as React.CSSProperties,
  tabRow: { display: 'flex', gap: 8, marginBottom: 16 } as React.CSSProperties,
  card: { border: '1px solid var(--gray-200, #e5e7eb)', borderRadius: 6, overflow: 'hidden' } as React.CSSProperties,
  listHeader: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'var(--gray-50, #f9fafb)', borderBottom: '1px solid var(--gray-200, #e5e7eb)' } as React.CSSProperties,
  row: (selected: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
    borderBottom: '1px solid var(--gray-100, #f3f4f6)',
    background: selected ? 'rgba(59,130,246,0.06)' : 'transparent',
    cursor: 'pointer', transition: 'background 100ms',
  }),
  checkbox: { width: 16, height: 16, cursor: 'pointer', flexShrink: 0, accentColor: '#3b82f6' } as React.CSSProperties,
  label: (selected: boolean): React.CSSProperties => ({
    flex: 1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    fontWeight: selected ? 600 : 400,
  }),
  date: { fontSize: 12, color: '#9ca3af', flexShrink: 0, width: 96, textAlign: 'right' } as React.CSSProperties,
  actionBar: (danger: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    padding: '10px 14px', borderRadius: 6, marginBottom: 12,
    background: danger ? '#fef2f2' : '#fffbeb',
    border: `1px solid ${danger ? '#fecaca' : '#fde68a'}`,
    position: 'sticky', top: 0, zIndex: 10,
  }),
  btnBase: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 5, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'background 120ms' } as React.CSSProperties,
  empty: { padding: '48px 16px', textAlign: 'center', fontSize: 14, color: '#9ca3af' } as React.CSSProperties,
  foot: { marginTop: 8, fontSize: 12, color: '#9ca3af' } as React.CSSProperties,
  success: { padding: '10px 14px', borderRadius: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: 13, color: '#15803d', marginBottom: 12 } as React.CSSProperties,
}

export function BulkDeleteTool() {
  const client = useClient({ apiVersion: '2024-01-01' })

  const [activeTab, setActiveTab] = useState<DocType>('post')
  const [docs, setDocs] = useState<SanityDoc[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [lastDeleted, setLastDeleted] = useState(0)

  const fetchDocs = useCallback(async () => {
    setLoading(true)
    setSelected(new Set())
    setConfirming(false)
    setLastDeleted(0)
    try {
      const results = await client.fetch<SanityDoc[]>(QUERIES[activeTab])
      setDocs(results)
    } finally {
      setLoading(false)
    }
  }, [client, activeTab])

  useEffect(() => { fetchDocs() }, [fetchDocs])

  const toggleOne = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setConfirming(false)
  }

  const toggleAll = () => {
    setSelected(selected.size === docs.length ? new Set() : new Set(docs.map(d => d._id)))
    setConfirming(false)
  }

  const handleDelete = async () => {
    if (selected.size === 0) return
    setDeleting(true)
    try {
      const ids = Array.from(selected)
      const tx = client.transaction()
      for (const id of ids) {
        tx.delete(id)
        tx.delete(`drafts.${id}`)
      }
      await tx.commit()
      setLastDeleted(ids.length)
      await fetchDocs()
    } finally {
      setDeleting(false)
      setConfirming(false)
    }
  }

  const docLabel = (doc: SanityDoc) =>
    doc.title || doc.client || doc.slug?.current || doc._id

  const allSelected = docs.length > 0 && selected.size === docs.length
  const someSelected = selected.size > 0
  const n = selected.size

  return (
    <div style={s.wrap}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <p style={s.h1}>Suppression en masse</p>
          <p style={s.sub}>Cochez les éléments à supprimer puis cliquez sur la corbeille.</p>
        </div>
        <button
          style={{ ...s.btnBase, background: '#f3f4f6', color: '#374151' }}
          onClick={fetchDocs}
          disabled={loading || deleting}
        >
          <IconRefresh /> Actualiser
        </button>
      </div>

      {/* Tabs */}
      <div style={s.tabRow}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={loading || deleting}
            style={{
              ...s.btnBase,
              background: activeTab === tab.id ? '#101112' : '#f3f4f6',
              color: activeTab === tab.id ? '#fff' : '#374151',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Action bar */}
      {someSelected && (
        <div style={s.actionBar(confirming)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              {n} sélectionné{n > 1 ? 's' : ''}
            </span>
            {confirming && (
              <span style={{ fontSize: 13, color: '#b91c1c' }}>
                Cette action est irréversible. Confirmer ?
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {confirming ? (
              <>
                <button
                  style={{ ...s.btnBase, background: '#f3f4f6', color: '#374151' }}
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                >
                  Annuler
                </button>
                <button
                  style={{ ...s.btnBase, background: '#dc2626', color: '#fff' }}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <IconTrash />
                  {deleting ? 'Suppression…' : `Supprimer ${n} élément${n > 1 ? 's' : ''}`}
                </button>
              </>
            ) : (
              <button
                style={{ ...s.btnBase, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
                onClick={() => setConfirming(true)}
              >
                <IconTrash /> Supprimer ({n})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Success */}
      {lastDeleted > 0 && !someSelected && (
        <div style={s.success}>
          ✓ {lastDeleted} élément{lastDeleted > 1 ? 's' : ''} supprimé{lastDeleted > 1 ? 's' : ''} avec succès.
        </div>
      )}

      {/* List */}
      <div style={s.card}>
        {loading ? (
          <div style={s.empty}>Chargement…</div>
        ) : docs.length === 0 ? (
          <div style={s.empty}>Aucun document trouvé.</div>
        ) : (
          <>
            {/* Header row */}
            <div style={s.listHeader}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                style={s.checkbox}
                aria-label="Tout sélectionner"
              />
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Titre
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', width: 96, textAlign: 'right' }}>
                Date
              </span>
            </div>

            {/* Rows */}
            {docs.map((doc, i) => {
              const sel = selected.has(doc._id)
              return (
                <div
                  key={doc._id}
                  style={{ ...s.row(sel), borderBottom: i < docs.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                  onClick={() => toggleOne(doc._id)}
                >
                  <input
                    type="checkbox"
                    checked={sel}
                    onChange={() => toggleOne(doc._id)}
                    onClick={e => e.stopPropagation()}
                    style={s.checkbox}
                    aria-label={`Sélectionner ${docLabel(doc)}`}
                  />
                  <span style={s.label(sel)}>{docLabel(doc)}</span>
                  <span style={s.date}>{formatDate(doc.publishedAt || doc._createdAt)}</span>
                </div>
              )
            })}
          </>
        )}
      </div>

      <p style={s.foot}>
        {docs.length} document{docs.length > 1 ? 's' : ''} · Cliquer sur une ligne pour la sélectionner
      </p>
    </div>
  )
}
