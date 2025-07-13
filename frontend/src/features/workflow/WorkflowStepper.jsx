import styled from "styled-components";
import { Steps } from "antd";

const StyledSteps = styled(Steps)`
  margin-top: 25px;

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: var(--color-brand-300);
    border-color: var(--color-brand-300);
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: var(--color-brand-500);
    border-color: var(--color-brand-500);
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon,
  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: white;
  }

  /* Connecting lines between steps */
  &.ant-steps
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: var(--color-brand-300) !important;
  }

  &.ant-steps
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #d9d9d9 !important;
  }

  &.ant-steps
    .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #d9d9d9 !important;
  }
`;

/**
 * Stepper component for displaying workflow progress
 * Shows current stage and completed/pending stages
 */
function WorkflowStepper({ currentStage = 0, items = [] }) {
  
  if (!items.length) {
    return (
      <StyledSteps
        current={0}
        labelPlacement="vertical"
        items={[{ title: "No stages available" }]}
      />
    );
  }

  return (
    <StyledSteps
      current={currentStage}
      labelPlacement="vertical"
      items={items}
    />
  );
}

export default WorkflowStepper;
