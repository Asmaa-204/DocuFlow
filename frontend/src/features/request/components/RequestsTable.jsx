import { useSearchParams } from "react-router-dom";

import Empty from "@components/Empty";
import Spinner from "@components/Spinner";
import Menus from "@components/Menu";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import RequestRow from "./RequestRow";

import useRequests from "../hooks/useRequests";
import { PAGE_SIZE } from "@utils/consts";

import { translator as t } from "@data/translations/ar";

function RequestsTable({ filter }) {
  const { isPending, data: requests } = useRequests({ filter });
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!requests?.length) return <Empty resource={t.request.requests} />;

  // Filter by status from URL params
  const statusFilter = searchParams.get("status") || "all";
  let filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((req) => req.status === statusFilter);

  // Sort by date from URL params
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  filteredRequests = [...filteredRequests].sort((a, b) => {
    const dateA = new Date(a[field] || a.createdAt);
    const dateB = new Date(b[field] || b.createdAt);
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  });

  if (!filteredRequests?.length)
    return <Empty resource={t.request.requests} />;

  //TODO: remove when pagination is done
  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = filteredRequests.slice(startIndex, endIndex);
  //-----------------------------------------

  return (
    <Menus>
      <Table columns="0.6fr 2.4fr 1fr 2fr 2rem">
        <Table.Header>
          <div>#</div>
          <div>{t.general.type}</div>
          <div>{t.general.status}</div>
          <div>{filter === "draft" ? t.time.lastUpdated : t.time.sent}</div>
          {filter == "draft" && <div></div>}
        </Table.Header>

        <Table.Body
          data={paginatedData}
          render={(request) => (
            <RequestRow key={request?.id} request={request} />
          )}
        />
        <Table.Footer>
          <Pagination numResults={filteredRequests?.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RequestsTable;
