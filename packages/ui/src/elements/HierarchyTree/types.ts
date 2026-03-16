import type { TypeWithID, Where } from 'payload'
import type React from 'react'

export type HierarchyDocument = {
  [key: string]: unknown
} & TypeWithID

export type HierarchyInitialData = {
  baseFilter?: null | Where
  docs: HierarchyDocument[]
  // Metadata about what was loaded - keyed by parent ID ('null' for root)
  loadedParents: Record<string, { hasMore: boolean; loadedCount?: number; totalDocs: number }>
}

export type HierarchyTreeProps = {
  baseFilter?: null | Where
  collectionSlug: string
  filterByCollections?: string[]
  icon?: React.ReactNode
  /** Initial data for first render (before context hydration). After hydration, context data takes precedence. */
  initialData?: HierarchyInitialData | null
  /** Initial expanded nodes for first render (before context hydration). After hydration, context takes precedence. */
  initialExpandedNodes?: (number | string)[]
  onNodeClick?: ({ id }: { id: null | number | string }) => void
  selectedNodeId?: null | number | string
  useAsTitle?: string
}
