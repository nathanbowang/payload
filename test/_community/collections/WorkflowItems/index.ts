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
      type: 'group',
      name: 'group',
      fields: [
        {
          name: 'groupFlag',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'tab',
          fields: [
            {
              name: 'tabFlag',
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
