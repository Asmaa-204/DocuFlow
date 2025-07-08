import { useState, useMemo } from "react";
import { mockInstances } from "@data/mock_Instances";
import { mockWorkflows } from "@data/mock_workflows";
import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import MyWorkflowHeaderOptions from "@features/workflow/MyWorkflowHeaderOptions";
import { useWorkflowInstances } from "@features/workflow/hooks/useWorkflowInstances";

function MyWorkflows() {
  const { getFilteredInstances } = useWorkflowInstances();
  const [selectedType, setSelectedType] = useState("");

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
