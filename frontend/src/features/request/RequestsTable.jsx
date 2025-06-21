import Empty from "@components/Empty";
import Spinner from "@components/Spinner";
import Menus from "@components/Menu";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import RequestRow from "./RequestRow";

import useRequests from "./hooks/useRequests";

function RequestsTable({ filter }) {
  const { isPending, data: requests } = useRequests({ filter });

  if (isPending) return <Spinner />;
  if (!requests?.length) return <Empty resource="Requests" />;

  return (
    <Menus>
      <Table columns="0.6fr 2.4fr 1fr 2fr 2rem">
        <Table.Header>
          <div>ID</div>
          <div>Type</div>
          <div>Status</div>
          <div>Date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={requests}
          render={(request) => (
            <RequestRow key={request?.id} request={request} />
          )}
        />
        <Table.Footer>
          <Pagination numResults={5} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RequestsTable;
