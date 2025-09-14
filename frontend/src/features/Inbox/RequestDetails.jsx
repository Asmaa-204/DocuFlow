import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { RequestedDocsList } from "../request";
import RequestTag from "./RequestTag";
import Spinner from "@components/Spinner";
import ActionButtons from "@components/ActionButtons";
import TextArea from "@components/inputs/TextArea";
import UserAvatar from "@components/UserAvatar";
import Heading from "@components/Heading";

import useRequestData from "../request/hooks/useRequestData";
import { usePatchRequest } from "../request/hooks/usePatchRequest";
import { translator as t } from "@data/translations/ar";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
`;

const StyledHeading = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.2rem;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-200);

  &.full-width {
    justify-content: stretch;
  }
`;

const StatusMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  font-weight: 500;

  ${(props) =>
    props.$status === "approved" &&
    `
    background-color: var(--color-green-100);
    color: var(--color-green-700);
    border: 1px solid var(--color-green-200);
  `}

  ${(props) =>
    props.$status === "rejected" &&
    `
    background-color: var(--color-red-100);
    color: var(--color-red-700);
    border: 1px solid var(--color-red-200);
  `}
`;

const RequestId = styled.div`
  color: var(--color-grey-400);
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 2.5rem 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 600;
  color: var(--color-grey-800);
`;

const UserDate = styled.div`
  color: var(--color-grey-500);
  font-size: 1.1rem;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

function RequestDetails() {
  const { patchRequest } = usePatchRequest();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { request, isPending: isLoadingRequest } = useRequestData({
    requestId: searchParams.get("request"),
  });

  function respondToRequest(status) {
    patchRequest(
      { id: request.id, request: { status } },
      { onSuccess: () => navigate(`/`) }
    );
  }

  const isPending = request?.status === "pending" || !request?.status;

  if (!searchParams.get("request"))
    return <Empty>{t.request.clickRequest}</Empty>;
  if (isLoadingRequest) return <Spinner />;

  return (
    <Container>
      <Content>
        <StyledHeading>
          {
            // TODO: the heading should be replaced
          }
          <Heading as="h1">request for Supervision</Heading>
          <RequestTag status={request.status} />
        </StyledHeading>

        <RequestId>#{request?.id}</RequestId>
        <UserRow>
          <UserAvatar src={request?.avatar || "/default-user.jpg"} />
          <UserInfo>
            <UserName>{request?.senderName || "Shehab Khaled"}</UserName>
            <UserDate>
              {t.time.on}{" "}
              {format(new Date(request.sentAt), "EEEE d MMMM yyyy, h:mm a", {
                locale: ar,
              })}
            </UserDate>
          </UserInfo>
        </UserRow>

        <RequestedDocsList
          type="documents"
          mode="view"
          documents={request.documents}
        />

        <Heading as="h3">{t.request.note}</Heading>
        <TextArea
          value={request?.note || t.request.noNote}
          placeholder={t.request.noNote}
          rows={4}
          readOnly
        />

        <Footer className={!isPending ? "full-width" : ""}>
          {isPending ? (
            <ActionButtons
              onCancel={() => respondToRequest("rejected")}
              onSave={() => respondToRequest("approved")}
              textCancel={t.actions.reject}
              textSave={t.actions.approve}
              isCancelDanger={true}
            />
          ) : (
            <StatusMessage $status={request?.status}>
              {t.request[request?.status]}
            </StatusMessage>
          )}
        </Footer>
      </Content>
    </Container>
  );
}

export default RequestDetails;
