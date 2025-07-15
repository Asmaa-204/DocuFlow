import RequestsTable from "@features/request/RequestsTable";

import Heading from "@components/Heading";
import Row from "@components/Row";
import RequestsTableOperations from "@features/request/RequestsTableOperations";

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
