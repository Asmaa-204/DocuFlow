import RequestsTable from "@features/request/RequestsTable";

import Heading from "@components/Heading";
import Row from "@components/Row";
import RequestsTableOperations from "@features/request/RequestsTableOperations";

function SubmittedRequests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Submitted Requests</Heading>
        <RequestsTableOperations />
      </Row>
      <Row>
        <RequestsTable filter="submitted" />
      </Row>
    </>
  );
}

export default SubmittedRequests;
