'use client'

import { DEFAULT_HIERARCHY_TREE_LIMIT } from 'payload/shared'
import React, { useCallback, useMemo } from 'react'

import type { HierarchyTreeProps } from './types.js'

import { useConfig } from '../../providers/Config/index.js'
import { useHierarchy } from '../../providers/Hierarchy/index.js'
import { Tree } from '../Tree/index.js'

export const HierarchyTree: React.FC<HierarchyTreeProps> = ({
  baseFilter,
  collectionSlug,
  filterByCollections,
  icon,
  initialData: initialDataProp,
  initialExpandedNodes: initialExpandedNodesProp,
  onNodeClick,
  selectedNodeId,
  useAsTitle: useAsTitleProp,
}) => {
  const {
    getExpandedNodesForCollection,
    getTreeDataForCollection,
    toggleNodeForCollection,
    typeFieldName,
  } = useHierarchy()

  // Get initialData from context (cleared on refresh, hydrated by HydrateHierarchyProvider)
  // Falls back to prop for first render before hydration completes
  // Skip context data if baseFilter has changed (tenant switch without navigation)
  const contextData = getTreeDataForCollection(collectionSlug)
  const baseFilterKey = baseFilter ? JSON.stringify(baseFilter) : ''
  const contextBaseFilterKey = contextData?.baseFilter ? JSON.stringify(contextData.baseFilter) : ''
  const contextDataMatchesFilter = baseFilterKey === contextBaseFilterKey
  const initialData = contextDataMatchesFilter ? (contextData ?? initialDataProp) : initialDataProp
  const { getEntityConfig } = useConfig()

  const collectionConfig = getEntityConfig({ collectionSlug })
  const hierarchyConfig =
    collectionConfig.hierarchy && typeof collectionConfig.hierarchy === 'object'
      ? collectionConfig.hierarchy
      : undefined
  const parentFieldName = hierarchyConfig?.parentFieldName
  const treeLimit = hierarchyConfig?.admin?.treeLimit ?? DEFAULT_HIERARCHY_TREE_LIMIT
  const useAsTitle = useAsTitleProp ?? collectionConfig.admin?.useAsTitle

  // Get all possible type values from relatedCollections for filtering empty arrays
  const allPossibleTypeValues = useMemo(
    () =>
      hierarchyConfig?.relatedCollections
        ? Object.keys(hierarchyConfig.relatedCollections)
        : undefined,
    [hierarchyConfig?.relatedCollections],
  )

  // Get expanded nodes for THIS collection specifically
  // Falls back to prop for first render before hydration completes
  const expandedNodes = useMemo(() => {
    const contextExpanded = getExpandedNodesForCollection(collectionSlug)
    if (contextExpanded.size > 0) {
      return contextExpanded
    }
    // Fallback to initial prop before context is hydrated
    return initialExpandedNodesProp ? new Set(initialExpandedNodesProp) : contextExpanded
  }, [collectionSlug, getExpandedNodesForCollection, initialExpandedNodesProp])

  // Toggle node for THIS collection specifically
  const handleToggleNode = useCallback(
    ({ id }: { id: number | string }) => {
      toggleNodeForCollection(collectionSlug, id)
    },
    [collectionSlug, toggleNodeForCollection],
  )

  return (
    <Tree
      allPossibleTypeValues={allPossibleTypeValues}
      baseFilter={baseFilter}
      collectionSlug={collectionSlug}
      expandedNodes={expandedNodes}
      filterByCollections={filterByCollections}
      icon={icon}
      initialData={initialData}
      onNodeClick={onNodeClick}
      parentFieldName={parentFieldName}
      selectedNodeId={selectedNodeId}
      toggleNode={handleToggleNode}
      treeLimit={treeLimit}
      typeFieldName={typeFieldName}
      useAsTitle={useAsTitle}
    />
  )
}
