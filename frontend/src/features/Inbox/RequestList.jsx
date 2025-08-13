import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import RequestElement from "./RequestElement";
import SpinnerMini from "@components/SpinnerMini";

import { useIncomingRequests } from "@features/request/hooks/useIncomingRequests";
import Empty from "@components/Empty";

const List = styled.ul`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow-y: auto;
  background-color: var(--color-grey-0);
  height: 100%;
  flex: 1;

  &:has(p:first-child) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function RequestList() {
  const { requests, isPending } = useIncomingRequests();
  const [searchParams] = useSearchParams();

  if (isPending) return <SpinnerMini />;

  const filter = searchParams.get("status");

  const filteredRequests =
    filter === "all" || !filter
      ? requests
      : requests.filter((request) => request.status === filter);

  return (
    <List>
      {requests.length === 0 ? (
        <Empty resource="requests" />
      ) : (
        filteredRequests?.map((request) => (
          <RequestElement request={request} key={request.id} />
        ))
      )}
    </List>
  );
}

export default RequestList;
