import styled from "styled-components";
import Button from "@components/Button";
import TextArea from "@components/inputs/TextArea";
import Heading from "@components/Heading";
import { RequestedDocsList } from "..";
import { usePatchRequest } from "../hooks/usePatchRequest";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NoteSection = styled.div`
  margin-bottom: 2rem;
`;

const NoteLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-200);
  
  &.full-width {
    justify-content: stretch;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StatusMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  font-weight: 500;
  
  ${props => props.$status === 'approved' && `
    background-color: var(--color-green-100);
    color: var(--color-green-700);
    border: 1px solid var(--color-green-200);
  `}
  
  ${props => props.$status === 'rejected' && `
    background-color: var(--color-red-100);
    color: var(--color-red-700);
    border: 1px solid var(--color-red-200);
  `}
`;

const P = styled.p`
  color: var(--color-grey-600);
  margin-bottom: 3rem;
`;

function RequestDetails({ request }) {
  const { patchRequest } = usePatchRequest();
  const navigate = useNavigate();

  function respondToRequest(status) {
    patchRequest(
      { id: request.id, request: { status } },
      { onSuccess: () => navigate(`/`)}
    );
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approved':
        return 'You approved this request';
      case 'rejected':
        return 'You rejected this request';
      default:
        return '';
    }
  };

  const isPending = request?.status === 'pending' || !request?.status;

  return (
    <Container>
      <Content>
        <Heading as="h1">{`Request #${request?.id}`}</Heading>
        
        <RequestedDocsList type="documents" documents={request?.documents} />
      
        <NoteSection>
          <NoteLabel>Note</NoteLabel>
          <TextArea 
            value={request?.note || "No note provided"} 
            placeholder="No note provided"
            rows={4} 
            readOnly 
          />
        </NoteSection>

        <Footer className={!isPending ? 'full-width' : ''}>
          {isPending ? (
            <ButtonGroup>
              <Button
                type="button"
                $variation="danger"
                onClick={() => respondToRequest("rejected")}
              >
                Reject 
              </Button>

              <Button
                type="button"
                $variation="primary"
                onClick={() => respondToRequest("approved")} 
              >
                Approve
              </Button>
            </ButtonGroup>
          ) : (
            <StatusMessage $status={request?.status}>
              {getStatusMessage(request?.status)}
            </StatusMessage>
          )}
        </Footer>
      </Content>
    </Container>
  );
}

export default RequestDetails;