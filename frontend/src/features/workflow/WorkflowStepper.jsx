import styled from "styled-components";
import { Steps } from "antd";

const StyledSteps = styled(Steps)`
  margin-top: 25px;

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: var(--color-brand-300); /* for completed steps */
    border-color: var(--color-brand-300);
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: var(--color-brand-500); /* for current step */
    border-color: var(--color-brand-500);
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #f5f5f5; /* Light gray for waiting steps */
    border-color: #d9d9d9;
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon,
  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: white;
  }

  /* Connecting lines between steps - with higher specificity */
  &.ant-steps
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: var(
      --color-brand-300
    ) !important; /* line for completed steps */
  }

  &.ant-steps
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #d9d9d9 !important; /* line for current step */
  }

  &.ant-steps
    .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #d9d9d9 !important; /* line for waiting steps */
  }
`;

function WorkflowStepper({ currentStage, items }) {
  return (
    <StyledSteps
      current={currentStage}
      labelPlacement="vertical"
      items={items}
    />
  );
}

export default WorkflowStepper;
