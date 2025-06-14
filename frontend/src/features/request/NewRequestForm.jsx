import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

import Button from "@components/Button";
import TextArea from "@components/inputs/TextArea";
import Heading from "@components/Heading";
import RequestedDocsList from "./RequestedDocsList";

import { documents, forms } from "@data/workflow/requestedDocs";

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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      note: "",
      selectedDocuments: [],
      selectedForms: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleSaveAsDraft = () => {
    console.log("Save as draft clicked");
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <Heading as="h1">New Request</Heading>
        <P>Request For Supervisor Approval</P>

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
        <Button $variety="danger" type="button" onClick={handleCancel}>
          CANCEL
        </Button>

        <ButtonGroup>
          <Button
            type="button"
            $variety="secondary"
            onClick={handleSaveAsDraft}
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
