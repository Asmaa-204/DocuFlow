import Row from "@components/Row";
import Spinner from "@components/Spinner";
import ScrollableList from "@components/ScrollableList";
import useRequests from "@features/request/hooks/useRequests";
import { useState } from "react";
import Heading from "@components/Heading";

import allRequests from "@data/requests/mock_requests";
import RequestDetails from "@features/request/RequestDetails";

function RequestsInbox() {
  const filter = null;
  const { isPending, data: requests } = useRequests({ filter });
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (isPending) return <Spinner />

  return (
    <>
      <Row type="horizontal" style={{ gap: "2vw" }}>
        <Row type="vertical">
          <Heading as="h1">Inbox</Heading>
          <ScrollableList elements={requests} setSelectedElement={setSelectedRequest} />
        </Row>
        <RequestDetails request={selectedRequest}/>
      </Row>
    </>
  );
}

export default RequestsInbox;
