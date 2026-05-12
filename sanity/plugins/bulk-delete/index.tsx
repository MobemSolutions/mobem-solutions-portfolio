import { definePlugin } from 'sanity'
import { TrashIcon } from '@sanity/icons'
import { BulkDeleteTool } from './BulkDeleteTool'

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
