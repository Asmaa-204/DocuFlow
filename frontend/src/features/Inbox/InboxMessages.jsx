import styled from "styled-components";
import Heading from "@components/Heading";
import RequestList from "@features/Inbox/RequestList";

import Filter from "@components/Filter";
import TableOperations from "@components/TableOperations";
import Row from "@components/Row";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  border-right: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
`;

const options = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "pending", label: "Pending" },
];

function InboxMessages() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">Inbox</Heading>
        <TableOperations>
          <Filter
            filterBy="status"
            options={options}
            resetParams={[{ name: "page", value: 1 }]}
          />
        </TableOperations>
      </Row>
      <RequestList />
    </Container>
  );
}

export default InboxMessages;
