import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

import Select from "@components/inputs/Select";
import ProgressStepper from "@components/ProgressStepper";
import Button from "@components/Button";
import Heading from "@components/Heading";

import { useAllWorkflows } from "./hooks/useAllWorkflows";
import { useCreateInstance } from "./hooks/useCreateInstance";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
`;

const Content = styled.div`
  overflow-y: auto;
  padding-bottom: 2rem;
`;

const Footer = styled.footer`
  padding-top: 2rem;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
  align-items: start;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  width: 100%;
  min-height: 12rem;
  padding: 1.6rem;

  border: var(--border-radius-tiny) solid var(--color-brand-600);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);

  font-size: 1.4rem;
  line-height: 1.6;

  color: var(--color-grey-700);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  padding: 1.2rem 3.2rem;

  font-size: 1.6rem;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 12rem;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 3rem;
`;

function WorkFlowForm() {
  const { data: workflows } = useAllWorkflows();
  const { createInstance } = useCreateInstance();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      workflowId: "",
    },
  });

  const selectedWorkflow = watch("workflowId");

  async function onSubmit(data) {
    createInstance({ ...data, workflowId: Number(data.workflowId) });
  }

  const selectedOption = workflows?.find(
    (option) => option?.id == selectedWorkflow
  );

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <StyledHeading as="h1">Start New Workflow</StyledHeading>

        <FormSection>
          <SelectContainer>
            <Controller
              control={control}
              name="workflowId"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Choose a workflow"
                  options={workflows}
                />
              )}
            />
          </SelectContainer>

          <Description>
            {selectedWorkflow
              ? selectedOption?.description
              : "Select a workflow to see its description."}
          </Description>
        </FormSection>
      </Content>

      <Footer>
        <ProgressStepper
          currentStep={1}
          totalSteps={selectedOption?.stages.length || 0}
        />
        <ButtonContainer>
          <StyledButton disabled={!selectedOption} type="submit">
            Start
          </StyledButton>
        </ButtonContainer>
      </Footer>
    </Container>
  );
}

export default WorkFlowForm;
