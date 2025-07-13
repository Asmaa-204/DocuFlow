import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyInstances } from "../services/getMyInstances";

/**
 * Custom hook for managing workflow instances
 * Provides filtering, rendering, and data fetching utilities
 */
export function useWorkflowInstances() {
  /**
   * Filters instances by workflow type
   * @param {Array} instances - Array of workflow instances
   * @param {string|number} selectedType - Workflow type ID to filter by
   * @returns {Array} Filtered instances or all instances if no filter
   */
  function getFilteredInstances(instances, selectedType) {
    if (!instances?.length) return [];
    if (!selectedType) return instances;
    return instances.filter((inst) => inst.workflowId === selectedType);
  }

  /**
   * Transforms instance data for display in stepper component
   * @param {Object} instance - Workflow instance data
   * @param {Object} workflowsMap - Map of workflow definitions by ID
   * @returns {Object} Formatted instance data for UI display
   */
  function renderStepper(instance, workflowsMap) {
    const definition = workflowsMap[instance.workflowId];

    if (!definition) {
      console.error(
        "Workflow definition not found for ID:",
        instance.workflowId
      );
      return {
        id: instance.id,
        workflowId: instance.workflowId,
        header: "Unknown Workflow",
        description: instance.description,
        start_datetime: instance.createdAt,
        last_updated_datetime: instance.updatedAt,
        current_stage: 0,
        items: [],
      };
    }

    const stepperSteps = definition.stages.map((stage) => ({
      title: stage.title,
    }));

    return {
      id: instance.id,
      workflowId: instance.workflowId,
      header: definition.title,
      description: instance.description,
      start_datetime: instance.createdAt,
      last_updated_datetime: instance.updatedAt,
      current_stage: instance.stageId - 1,
      items: stepperSteps,
    };
  }

  /**
   * Hook for fetching user's workflow instances
   * @returns {Object} Query result with data and loading state
   */
  function useMyInstances() {
    const { data, isPending, error } = useQuery({
      queryKey: ["my-instances"],
      queryFn: getMyInstances,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });

    return { data, isPending, error };
  }

  /**
   * Processes raw instances and workflows into display-ready data
   * @param {Array} instances - Raw instance data
   * @param {Array} workflows - Raw workflow data
   * @param {boolean} isPending - Loading state
   * @returns {Object} Processed data with workflowsMap and instancesData
   */
  function useProcessedInstances(instances, workflows, isPending) {
    return useMemo(() => {
      if (isPending || !workflows?.length || !instances?.length) {
        return { instancesData: [], workflowsMap: {} };
      }

      const workflowsMap = workflows.reduce((acc, workflow) => {
        acc[workflow.id] = workflow;
        return acc;
      }, {});

      const instancesData = instances.map((instance) =>
        renderStepper(instance, workflowsMap)
      );

      return { instancesData, workflowsMap };
    }, [isPending, workflows, instances]);
  }

  return {
    renderStepper,
    getFilteredInstances,
    useMyInstances,
    useProcessedInstances,
  };
}
