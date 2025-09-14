import RequestsTable from "@features/request/RequestsTable";

import Heading from "@components/Heading";
import Row from "@components/Row";
import RequestsTableOperations from "@features/request/RequestsTableOperations";

import { translator as t } from "@data/translations/ar";

function SubmittedRequests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t.request.submittedRequests}</Heading>
        <RequestsTableOperations />
      </Row>
      <Row>
        <RequestsTable filter="submitted" />
      </Row>
    </>
  );
}

export default SubmittedRequests;
