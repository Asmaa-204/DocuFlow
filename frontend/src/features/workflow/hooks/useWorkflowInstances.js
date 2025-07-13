import { getMyInstances } from "../services/getMyInstances";
import { useQuery } from "@tanstack/react-query";

export function useWorkflowInstances() {
  function getFilteredInstances(instances, selectedType) {
    if (!instances) return null;
    if (!selectedType) return instances;
    return instances.filter(
      (inst) => inst.workflowId === selectedType
    );
  }

  function renderStepper(instance, workflows) {
    const definition = workflows[`${instance.workflowId}`];
    if (!definition) {
      console.error(
        "Workflow definition not found for ID:",
        instance.workflowId
      );
      return;
    }

    const allStages = definition.stages;

    const stepperSteps = allStages.map((stage) => {
      return {
        title: stage.title, // stage title
      };
    });

    const instanceCardData = {
      id: instance.id,
      workflowId: instance.workflowId,
      header: definition.title,
      description: instance.description,
      start_datetime: instance.createdAt,
      last_updated_datetime: instance.updatedAt,
      current_stage: instance.stageId - 1,
      items: stepperSteps,
    };
    return instanceCardData;
  }

  function useMyInstances() {
    const { data, isPending } = useQuery({
      queryKey: ["my-instances"],
      queryFn: getMyInstances,
    });

    return { data, isPending };
  }

  return { renderStepper, getFilteredInstances, useMyInstances };
}
