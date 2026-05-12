'use client'

import { useState, useEffect, useCallback } from 'react'
import { useClient } from 'sanity'
import { Box, Card, Flex, Stack, Text, Button, Spinner, Badge } from '@sanity/ui'
import { TrashIcon, ResetIcon } from '@sanity/icons'

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

  const dateOf = (doc: SanityDoc) =>
    formatDate(doc.publishedAt || doc._createdAt)

  const allSelected = docs.length > 0 && selected.size === docs.length
  const someSelected = selected.size > 0

  return (
    <Box padding={4} style={{ maxWidth: 760, margin: '0 auto' }}>

      {/* Header */}
      <Flex align="center" justify="space-between" marginBottom={4}>
        <Stack space={1}>
          <Text size={3} weight="semibold">Suppression en masse</Text>
          <Text size={1} muted>Cochez les éléments à supprimer puis cliquez sur la corbeille.</Text>
        </Stack>
        <Button
          icon={ResetIcon}
          mode="ghost"
          tone="default"
          text="Actualiser"
          onClick={fetchDocs}
          disabled={loading || deleting}
        />
      </Flex>

      {/* Tabs */}
      <Flex gap={2} marginBottom={4}>
        {TABS.map(tab => (
          <Button
            key={tab.id}
            text={tab.label}
            mode={activeTab === tab.id ? 'default' : 'ghost'}
            tone={activeTab === tab.id ? 'primary' : 'default'}
            onClick={() => setActiveTab(tab.id)}
            disabled={loading || deleting}
          />
        ))}
      </Flex>

      {/* Action bar */}
      {someSelected && (
        <Card
          tone={confirming ? 'critical' : 'caution'}
          padding={3}
          radius={2}
          marginBottom={3}
          style={{ position: 'sticky', top: 0, zIndex: 10 }}
        >
          <Flex align="center" justify="space-between" gap={3}>
            <Flex align="center" gap={2}>
              <Badge tone={confirming ? 'critical' : 'caution'} size={1}>
                {selected.size} sélectionné{selected.size > 1 ? 's' : ''}
              </Badge>
              {confirming && (
                <Text size={1} weight="semibold">
                  Confirmer la suppression définitive ?
                </Text>
              )}
            </Flex>
            <Flex gap={2}>
              {confirming ? (
                <>
                  <Button
                    text="Annuler"
                    mode="ghost"
                    tone="default"
                    onClick={() => setConfirming(false)}
                    disabled={deleting}
                  />
                  <Button
                    icon={deleting ? undefined : TrashIcon}
                    text={deleting ? 'Suppression…' : `Supprimer ${selected.size} élément${selected.size > 1 ? 's' : ''}`}
                    tone="critical"
                    onClick={handleDelete}
                    disabled={deleting}
                  />
                </>
              ) : (
                <Button
                  icon={TrashIcon}
                  text={`Supprimer (${selected.size})`}
                  tone="critical"
                  mode="ghost"
                  onClick={() => setConfirming(true)}
                />
              )}
            </Flex>
          </Flex>
        </Card>
      )}

      {/* Last deleted notice */}
      {lastDeleted > 0 && !someSelected && (
        <Card tone="positive" padding={3} radius={2} marginBottom={3}>
          <Text size={1}>
            ✓ {lastDeleted} élément{lastDeleted > 1 ? 's' : ''} supprimé{lastDeleted > 1 ? 's' : ''} avec succès.
          </Text>
        </Card>
      )}

      {/* List */}
      <Card border radius={2}>
        {loading ? (
          <Flex align="center" justify="center" padding={6}>
            <Spinner muted />
          </Flex>
        ) : docs.length === 0 ? (
          <Box padding={6}>
            <Text muted align="center">Aucun document trouvé.</Text>
          </Box>
        ) : (
          <Stack>
            {/* List header */}
            <Box
              padding={3}
              style={{
                borderBottom: '1px solid var(--card-border-color)',
                background: 'var(--card-bg2-color)',
              }}
            >
              <Flex align="center" gap={3}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--card-focus-ring-color)' }}
                  aria-label="Tout sélectionner"
                />
                <Text size={1} weight="semibold" muted style={{ flex: 1 }}>Titre</Text>
                <Text size={1} weight="semibold" muted style={{ width: 100, textAlign: 'right' }}>Date</Text>
              </Flex>
            </Box>

            {/* Rows */}
            {docs.map((doc, i) => {
              const isSelected = selected.has(doc._id)
              return (
                <Box
                  key={doc._id}
                  padding={3}
                  style={{
                    borderBottom: i < docs.length - 1 ? '1px solid var(--card-border-color)' : 'none',
                    background: isSelected ? 'var(--card-focus-ring-color, rgba(0,125,255,0.06))' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 120ms',
                  }}
                  onClick={() => toggleOne(doc._id)}
                >
                  <Flex align="center" gap={3}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(doc._id)}
                      onClick={e => e.stopPropagation()}
                      style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--card-focus-ring-color)', flexShrink: 0 }}
                      aria-label={`Sélectionner ${docLabel(doc)}`}
                    />
                    <Text
                      size={2}
                      weight={isSelected ? 'semibold' : 'regular'}
                      style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {docLabel(doc)}
                    </Text>
                    <Text size={1} muted style={{ width: 100, textAlign: 'right', flexShrink: 0 }}>
                      {dateOf(doc)}
                    </Text>
                  </Flex>
                </Box>
              )
            })}
          </Stack>
        )}
      </Card>

      <Box marginTop={2}>
        <Text size={1} muted>
          {docs.length} document{docs.length > 1 ? 's' : ''} · Cliquer sur une ligne pour la sélectionner
        </Text>
      </Box>
    </Box>
  )
}
