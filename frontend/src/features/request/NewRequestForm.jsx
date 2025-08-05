import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Button from "@components/Button";
import TextArea from "@components/inputs/TextArea";
import Heading from "@components/Heading";
import RequestedDocsList from "./RequestedDocsList";

import { documents, forms } from "@data/workflow/requestedDocs";
import { useAllWorkflows } from "@features/workflow/hooks/useAllWorkflows";
import { useSendRequest } from "./hooks/useSendRequest";

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
  const { workflowId, instanceId } = useParams();
  const { mutate } = useSendRequest();

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      note: "",
      selectedDocuments: [],
      selectedForms: [],
    },
  });

  const selectedWorkflow = workflows?.find(
    (wf) => wf.id === Number(workflowId)
  );

  function sendRequest(isDraft) {
    const data = getValues();
    const requestPayload = {
      instanceId: Number(instanceId),
      note: data.note,
      isDraft,
    };

    mutate(requestPayload, {
      onSuccess: () => {
        navigate(`/requests/${isDraft ? "draft" : "submitted"}`);
      },
    });
  }

  return (
    <Container onSubmit={handleSubmit(() => sendRequest(false))}>
      <Content>
        <Heading as="h1">New Request</Heading>
        <P>Request For {selectedWorkflow?.title}</P>

        <RequestedDocsList type="documents" documents={documents} />
        <RequestedDocsList type="forms" documents={forms} />

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
        <Button $variation="danger" type="button" onClick={() => reset()}>
          CANCEL
        </Button>

        <ButtonGroup>
          <Button
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
