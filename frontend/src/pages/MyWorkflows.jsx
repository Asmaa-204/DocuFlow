import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import MyWorkflowHeaderOptions from "@features/workflow/MyWorkflowHeaderOptions";
import { useMyWorkflowsPage } from "@features/workflow/hooks/useMyWorkflowsPage";

/**
 * My Workflows page - displays user's workflow instances with filtering
 */
function MyWorkflows() {
  const {
    instances,
    workflowsMap,
    filteredInstances,
    selectedType,
    isPending,
    handleFilterChange,
  } = useMyWorkflowsPage();

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
