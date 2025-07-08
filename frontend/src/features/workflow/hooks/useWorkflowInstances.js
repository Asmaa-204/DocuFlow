import { mockWorkflows } from "@data/mock_workflows";

export function useWorkflowInstances() {
  function getFilteredInstances(instances, selectedType) {
    if (!selectedType) return instances;
    return instances.filter(
      (inst) => inst.workflow_definition_id === selectedType
    );
  }

  function renderStepper(instance) {
    const definition = mockWorkflows[`${instance.workflow_definition_id}`];
    if (!definition) {
      console.error(
        "Workflow definition not found for ID:",
        instance.workflow_definition_id
      );
      return;
    }

    const allStages = definition.stages;
    const currentStageId = instance.current_stage;

    let currentStageIndex = Number.POSITIVE_INFINITY;
    const stepperSteps = allStages.map((stage, index) => {
      if (stage.id === currentStageId) {
        currentStageIndex = index;
      }
      return {
        title: stage.name, // stage title
      };
    });

    const instanceCardData = {
      id: instance.id,
      header: definition.name,
      title: instance.name, // stage title
      description: instance.description,
      currently_assigned_to: instance.assigned_to_user_id,
      start_datetime: instance.start_datetime,
      last_updated_datetime: instance.last_updated_datetime,
      current_stage: currentStageIndex,
      items: stepperSteps,
    };
    return instanceCardData;
  }

  return { renderStepper, getFilteredInstances };
}
