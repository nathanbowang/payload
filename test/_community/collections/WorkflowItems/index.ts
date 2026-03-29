import type { CollectionConfig } from 'payload'

export const workflowItemsSlug = 'workflow-items'

export const WorkflowItemsCollection: CollectionConfig = {
  slug: workflowItemsSlug,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'workflowTab',
          fields: [
            {
              name: 'flag',
              type: 'checkbox',
              required: true,
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
