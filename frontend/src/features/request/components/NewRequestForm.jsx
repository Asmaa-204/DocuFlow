import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@components/Button";
import TextArea from "@components/inputs/TextArea";
import Heading from "@components/Heading";
import RequestedDocsList from "./RequestedDocsList";

import { useAllWorkflows } from "@features/workflow/hooks/useAllWorkflows";
import useRequestData from "../hooks/useRequestData";
import Spinner from "@components/Spinner";
import { usePatchRequest } from "../hooks/usePatchRequest";

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
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-200);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const P = styled.p`
  color: var(--color-grey-600);
  margin-bottom: 3rem;
`;

function NewRequestForm() {
  const { data: workflows } = useAllWorkflows();
  const { workflowId, instanceId, requestId } = useParams();
  const { request, isPending } = useRequestData({ requestId });

  const { patchRequest } = usePatchRequest();
  const navigate = useNavigate();

  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      note: "",
      selectedDocuments: [],
      selectedForms: [],
    },
  });

  const selectedWorkflow = workflows?.find(
    (wf) => wf?.id === Number(workflowId)
  );

  function sendRequest(isDraft) {
    const data = getValues();
    let requestPayload = {
      instanceId: Number(instanceId),
      note: data.note,
    };

    if (!isDraft) requestPayload = { ...requestPayload, status: "pending" };

    patchRequest(
      { request: requestPayload, id: request.id },
      {
        onSuccess: () => {
          navigate(`/requests/${isDraft ? "draft" : "submitted"}`);
        },
      }
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Container onSubmit={handleSubmit(() => sendRequest(false))}>
      <Content>
        <Heading as="h1">Request #{request.id}</Heading>
        <P>Request For {selectedWorkflow?.title}</P>

        {request?.documents?.length > 0 && (
          <RequestedDocsList
            mode="edit"
            type="documents"
            documents={request?.documents}
          />
        )}

        <NoteSection>
          <NoteLabel>Note</NoteLabel>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextArea {...field} placeholder="Add a note..." rows={4} />
            )}
          />
        </NoteSection>
      </Content>

      <Footer>
        {
          //TODO: delete the request when it's done in backend
        }
        <Button $variation="danger" type="button" onClick={() => navigate("/")}>
          CANCEL
        </Button>

        <ButtonGroup>
          <Button
            disabled={!formState.isDirty}
            type="button"
            $variation="secondary"
            onClick={() => sendRequest(true)}
          >
            SAVE AS DRAFT
          </Button>
          <Button type="submit">SEND</Button>
        </ButtonGroup>
      </Footer>
    </Container>
  );
}

export default NewRequestForm;
