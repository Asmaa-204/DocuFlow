import styled from "styled-components";

import RequestDetails from "@features/Inbox/RequestDetails";
import InboxMessages from "@features/Inbox/InboxMessages";

const InboxContainer = styled.div`
  display: flex;
  height: 100%;
  background: var(--color-grey-50);
`;

const DetailsPanel = styled.div`
  flex: 2.2;
  padding: 2.4rem 3.2rem;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
`;

function RequestsInbox() {
  return (
    <InboxContainer className="full-width">
      <InboxMessages />
      <DetailsPanel>
        <RequestDetails />
      </DetailsPanel>
    </InboxContainer>
  );
}

export default RequestsInbox;
