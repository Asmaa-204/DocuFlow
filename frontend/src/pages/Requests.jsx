import RequestsTable from "@features/request/components/RequestsTable";
import RequestsTableOperations from "@features/request/components/RequestsTableOperations";

import Heading from "@components/Heading";
import Row from "@components/Row";

function Requests({ filter }) {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{filter} Requests</Heading>
        <RequestsTableOperations />
      </Row>
      <Row>
        <RequestsTable filter={filter} />
      </Row>
    </>
  );
}

export default Requests;
