import { useState, useMemo } from "react";
import { useWorkflowInstances } from "./useWorkflowInstances";
import { useAllWorkflows } from "./useAllWorkflows";

/**
 * High-level hook that manages the complete My Workflows page state
 * Combines data fetching, processing, and filtering logic
 */
export function useMyWorkflowsPage() {
  const { getFilteredInstances, useMyInstances, useProcessedInstances } =
    useWorkflowInstances();
  const { isPending: isWorkflowsPending, data: workflows } = useAllWorkflows();
  const { isPending: isInstancesPending, data: instances } = useMyInstances();

  const [selectedType, setSelectedType] = useState(0);

  const isPending = isInstancesPending || isWorkflowsPending;

  // Process raw data into display format
  const { instancesData, workflowsMap } = useProcessedInstances(
    instances,
    workflows,
    isPending
  );

  // Filter processed data
  const filteredInstances = useMemo(
    () => getFilteredInstances(instancesData, selectedType),
    [instancesData, selectedType, getFilteredInstances]
  );

  function handleFilterChange(e) {
    setSelectedType(Number(e.target.value));
  }

  return {
    // Data
    instances,
    workflows,
    workflowsMap,
    filteredInstances,

    // State
    selectedType,
    isPending,

    // Actions
    handleFilterChange,
  };
}
