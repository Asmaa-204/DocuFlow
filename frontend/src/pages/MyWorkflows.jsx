import { useState, useMemo, useEffect } from "react";
import { mockInstances } from "@data/mock_Instances";
import { mockWorkflows } from "@data/mock_workflows";
import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import MyWorkflowHeaderOptions from "@features/workflow/MyWorkflowHeaderOptions";
import { useWorkflowInstances } from "@features/workflow/hooks/useWorkflowInstances";
import { useAllWorkflows } from "@features/workflow/hooks/useAllWorkflows";

function MyWorkflows() {
  const { getFilteredInstances, useMyInstances } = useWorkflowInstances();
  const { isPending: isWorkflowsPending, data: workflows } = useAllWorkflows();
  const { isPending: isInstancesPending, data: instances } = useMyInstances();

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    console.log(workflows);
    console.log('-----------------------------');
    console.log(instances);
  }, [workflows, instances]);

  const filteredInstances = useMemo(
    () => getFilteredInstances(mockInstances, selectedType),
    [selectedType, getFilteredInstances]
  );

  function handleFilterChange(e) {
    setSelectedType(e.target.value);
  }

  return (
    <div>
      <MyWorkflowHeaderOptions
        selectedType={selectedType}
        handleFilterChange={handleFilterChange}
				instances={mockInstances}
				workflows={mockWorkflows}
      />
      <WorkflowInstanceList instances={filteredInstances} />
    </div>
  );
}

export default MyWorkflows;
