import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";

import RequestTag from "./RequestTag";
import UserAvatar from "@components/UserAvatar";

const ListItem = styled.li`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-grey-100);
  cursor: pointer;
  transition: background-color 0.2s ease;

  display: flex;
  justify-content: space-between;

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

const SentAt = styled.span`
  align-self: flex-start;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  white-space: nowrap;
`;

const SenderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SenderDetails = styled.div`
  font-weight: 500;
  color: var(--color-grey-800);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WorkflowTitle = styled.div`
  color: var(--color-grey-500);
  font-size: 1.1rem;
`;

function InboxRequestListItem({ request }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id, workflowTitle, status, sentAt } = request;

  function handleSelect(request) {
    searchParams.set("request", request.id);
    setSearchParams(searchParams);
  }

  return (
    <ListItem
      className={Number(searchParams.get("request")) === id ? "selected" : ""}
      onClick={() => handleSelect(request)}
    >
      <SenderSection>
        <UserAvatar src="/default-user.jpg" alt="sender avatar" />
        <div>
          <SenderDetails>
            <span>{request.senderName || "Shehab Khaled"}</span>
            <RequestTag version="icons" status={status} />
          </SenderDetails>
          <WorkflowTitle>{workflowTitle}</WorkflowTitle>
        </div>
      </SenderSection>
      <SentAt>{format(new Date(sentAt), "EEEE hh:mm a")}</SentAt>
    </ListItem>
  );
}

export default InboxRequestListItem;
