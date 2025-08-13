import Spinner from "@components/Spinner";
import useIncomingRequests from "@features/request/hooks/useIncomingRequests";
import { useState } from "react";
import Heading from "@components/Heading";
import styled from "styled-components";
import RequestList from "@features/request/components/RequestList";


import RequestDetails from "@features/request/components/RequestDetails";

const InboxContainer = styled.div`
  display: flex;
  gap: 0;
  height: 100%;
`;

const InboxSidebar = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  border-right: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
`;

const DetailsPanel = styled.div`
  flex: 1;
  padding: 2rem;
  min-width: 0; /* Allows flex item to shrink below content size */
`;

function RequestsInbox() {
  const { isPending, data: requests } = useIncomingRequests();
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (isPending) return <Spinner />

  return (
    <InboxContainer>
      <InboxSidebar>
        <Heading as="h1">Inbox</Heading>
        <RequestList elements={requests} setSelectedElement={setSelectedRequest} />
      </InboxSidebar>
      {selectedRequest && (
        <DetailsPanel>
          <RequestDetails request={selectedRequest} />
        </DetailsPanel>
      )}
    </InboxContainer>
  );
}

export default RequestsInbox;