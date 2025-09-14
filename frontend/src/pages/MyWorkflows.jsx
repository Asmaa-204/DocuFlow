import WorkflowInstanceList from "@features/workflow/WorkflowInstanceList";
import MyWorkflowHeaderOptions from "@features/workflow/MyWorkflowHeaderOptions";
import { useMyWorkflowsPage } from "@features/workflow/hooks/useMyWorkflowsPage";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* full page height */
  direction: rtl; /* 👈 RTL for Arabic */
`;

const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  padding: 1rem 2rem;
  background: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
`;

const ListWrapper = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem 2rem;
`;

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
    <Page>
      <HeaderWrapper>
        <MyWorkflowHeaderOptions
          selectedType={selectedType}
          handleFilterChange={handleFilterChange}
          instances={instances}
          workflowsMap={workflowsMap}
          isPending={isPending}
        />
      </HeaderWrapper>
      <ListWrapper>
        <WorkflowInstanceList
          isPending={isPending}
          instancesData={filteredInstances}
        />
      </ListWrapper>
    </Page>
  );
}

export default MyWorkflows;
