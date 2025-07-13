import { useState, useMemo, useEffect } from "react";
import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import MyWorkflowHeaderOptions from "@features/workflow/MyWorkflowHeaderOptions";
import { useWorkflowInstances } from "@features/workflow/hooks/useWorkflowInstances";
import { useAllWorkflows } from "@features/workflow/hooks/useAllWorkflows";

function MyWorkflows() {
  const { getFilteredInstances, useMyInstances, renderStepper } =
    useWorkflowInstances();
  const { isPending: isWorkflowsPending, data: workflows } = useAllWorkflows();
  const { isPending: isInstancesPending, data: instances } = useMyInstances();

  const [selectedType, setSelectedType] = useState(0);
  
  // Derive isPending directly - no state needed!
  const isPending = isInstancesPending || isWorkflowsPending;
  let instancesData = []; 
  let workflowsMap = {};

  if (!isPending && workflows && instances) {
    console.log(workflows);
    console.log("-----------------------------");
    console.log(instances);
  
      workflowsMap = workflows.reduce((acc, workflow) => {
        acc[workflow.id] = workflow;
        return acc;
      }, {});

    instancesData = instances.map((instance) =>
      renderStepper(instance, workflowsMap)
    );
  }

  const filteredInstances = useMemo(
    () => getFilteredInstances(instancesData, selectedType),
    [selectedType, getFilteredInstances]
  );

  console.log(`filtered to: ${filteredInstances}`);

  function handleFilterChange(e) {
    console.log(`Selected value: ${e.target.value}`);
    setSelectedType(Number(e.target.value));
  }

  return (
    <div>
      <MyWorkflowHeaderOptions
        selectedType={selectedType}
        handleFilterChange={handleFilterChange}
        instances={instances}
        workflowsMap={workflowsMap}
        isPending={isPending}
      />
      <WorkflowInstanceList
        isPending={isPending}
        instancesData={filteredInstances}
      />
    </div>
  );
}

export default MyWorkflows;
