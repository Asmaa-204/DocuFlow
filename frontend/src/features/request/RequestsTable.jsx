import { useSearchParams } from "react-router-dom";

import Empty from "@components/Empty";
import Spinner from "@components/Spinner";
import Menus from "@components/Menu";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import RequestRow from "./RequestRow";

import useRequests from "./hooks/useRequests";
import { PAGE_SIZE } from "@utils/consts";

function RequestsTable({ filter }) {
  const { isPending, data: requests } = useRequests({ filter });
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!requests?.length) return <Empty resource="Requests" />;

  //TODO: remove when pagination is done
  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = requests.slice(startIndex, endIndex);
  //-----------------------------------------

  console.log(filter);
  return (
    <Menus>
      <Table columns="0.6fr 2.4fr 1fr 2fr 2rem">
        <Table.Header>
          <div>ID</div>
          <div>Type</div>
          <div>Status</div>
          <div>Date</div>
          {filter == "draft" && <div></div>}
        </Table.Header>

        <Table.Body
          data={paginatedData}
          render={(request) => (
            <RequestRow key={request?.id} request={request} />
          )}
        />
        <Table.Footer>
          <Pagination numResults={requests?.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RequestsTable;
