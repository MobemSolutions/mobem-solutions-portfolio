import { definePlugin } from 'sanity'
import { BulkDeleteTool } from './BulkDeleteTool'

function TrashIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export const bulkDeletePlugin = definePlugin({
  name: 'bulk-delete',
  tools: [
    {
      name: 'bulk-delete',
      title: 'Corbeille',
      icon: TrashIcon,
      component: BulkDeleteTool,
    },
  ],
})
