import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin: 4rem 0;
`;

const Step = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.4rem;
  position: relative;
  z-index: 2;

  ${({ $isActive, $isCompleted }) => {
    if ($isActive) {
      return `
        background-color: var(--color-brand-600);
        color: var(--color-grey-0);
        border: 3px solid var(--color-brand-600);
      `;
    } else if ($isCompleted) {
      return `
        background-color: var(--color-brand-600);
        color: var(--color-grey-0);
        border: 3px solid var(--color-brand-600);
      `;
    } else {
      return `
        background-color: var(--color-grey-0);
        color: var(--color-grey-400);
        border: 3px solid var(--color-grey-300);
      `;
    }
  }}
`;

const StepConnector = styled.div`
  height: 3px;
  width: 8rem;
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? "var(--color-brand-600)" : "var(--color-grey-300)"};
  position: relative;
  z-index: 1;
`;

function ProgressStepper({ currentStep = 1, totalSteps = 5 }) {
  return (
    <StepperContainer>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={stepNumber}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Step $isActive={isActive} $isCompleted={isCompleted}>
              {stepNumber}
            </Step>
            {stepNumber < totalSteps && (
              <StepConnector $isCompleted={isCompleted} />
            )}
          </div>
        );
      })}
    </StepperContainer>
  );
}

export default ProgressStepper;
