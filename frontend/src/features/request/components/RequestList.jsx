import styled from "styled-components";
import { format } from "date-fns";
import { useState } from "react";

const List = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow-y: auto;
  background-color: var(--color-grey-0);
  height: 100%;
  flex: 1;
`;

const ElementItem = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-grey-100);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  &.selected {
    background-color: var(--color-brand-50);
    border-left: 4px solid var(--color-brand-600);
  }
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
`;

const WorkflowTitle = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
  font-size: 1.4rem;
  flex: 1;
  margin-right: 1rem;
`;

const RequestDate = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  white-space: nowrap;
`;

const RequestId = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  font-weight: 400;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--color-grey-500);
  font-size: 1.4rem;
`;

function RequestList({ elements, setSelectedElement }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (element) => {
    setSelectedId(element.id);
    setSelectedElement(element);
  };

  return (
    <List>
      {elements?.length === 0 ? (
        <EmptyState>No requests found</EmptyState>
      ) : (
        elements?.map((element) => (
          <ElementItem
            key={element.id}
            className={selectedId === element.id ? "selected" : ""}
            onClick={() => handleSelect(element)}
          >
            <RequestHeader>
              <WorkflowTitle>{element.workflowTitle}</WorkflowTitle>
              <RequestDate>
                {format(new Date(element.sentAt), "dd/MM/yyyy")}
              </RequestDate>
            </RequestHeader>
            <RequestId>#{element.id}</RequestId>
          </ElementItem>
        ))
      )}
    </List>
  );
}

export default RequestList;