import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { HiDocumentText, HiClipboardDocumentList, HiPlus } from "react-icons/hi2";

import Button from "@components/Button";
import TextArea from "@components/inputs/TextArea";
import Heading from "@components/Heading";

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

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin-bottom: 1.6rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  border: 2px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  &:hover {
    border-color: var(--color-brand-600);
    background-color: var(--color-grey-50);
  }
`;

const ItemIcon = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }
`;

const AddIcon = styled.div`
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  background-color: var(--color-grey-800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 1.2rem;
    height: 1.2rem;
    color: var(--color-grey-0);
  }
`;

const ItemLabel = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  text-align: center;
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

const CancelButton = styled(Button)`
  background-color: var(--color-red-700);
  
  &:hover {
    background-color: var(--color-red-800);
  }
`;

const SaveButton = styled(Button)`
  background-color: var(--color-blue-700);
  
  &:hover {
    background-color: var(--color-blue-800);
  }
`;

const SendButton = styled(Button)`
  background-color: var(--color-brand-600);
  
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const documents = [
  { id: 1, name: "Document", icon: HiDocumentText },
  { id: 2, name: "Document", icon: HiDocumentText },
  { id: 3, name: "Document", icon: HiDocumentText },
];

const forms = [
  { id: 1, name: "Form", icon: HiClipboardDocumentList },
  { id: 2, name: "Form", icon: HiClipboardDocumentList },
  { id: 3, name: "Form", icon: HiClipboardDocumentList },
];

function NewRequestForm() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      note: "I think you should accept as soon as possible as I really need this to be accepted as soon as possible if you please.",
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
        <p style={{ color: "var(--color-grey-600)", marginBottom: "3rem" }}>
          Request For Su
        </p>

        <Section>
          <SectionTitle>Documents</SectionTitle>
          <ItemsGrid>
            {documents.map((doc) => {
              const IconComponent = doc.icon;
              return (
                <ItemCard key={doc.id}>
                  <ItemIcon>
                    <IconComponent />
                  </ItemIcon>
                  <ItemLabel>{doc.name}</ItemLabel>
                  <AddIcon>
                    <HiPlus />
                  </AddIcon>
                </ItemCard>
              );
            })}
          </ItemsGrid>
        </Section>

        <Section>
          <SectionTitle>Forms</SectionTitle>
          <ItemsGrid>
            {forms.map((form) => {
              const IconComponent = form.icon;
              return (
                <ItemCard key={form.id}>
                  <ItemIcon>
                    <IconComponent />
                  </ItemIcon>
                  <ItemLabel>{form.name}</ItemLabel>
                  <AddIcon>
                    <HiPlus />
                  </AddIcon>
                </ItemCard>
              );
            })}
          </ItemsGrid>
        </Section>

        <NoteSection>
          <NoteLabel>Note</NoteLabel>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Add a note..."
                rows={4}
              />
            )}
          />
        </NoteSection>
      </Content>

      <Footer>
        <CancelButton type="button" onClick={handleCancel}>
          CANCEL
        </CancelButton>
        
        <ButtonGroup>
          <SaveButton type="button" onClick={handleSaveAsDraft}>
            SAVE AS DRAFT
          </SaveButton>
          <SendButton type="submit">
            SEND
          </SendButton>
        </ButtonGroup>
      </Footer>
    </Container>
  );
}

export default NewRequestForm;