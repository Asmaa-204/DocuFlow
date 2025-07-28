import ProgressStepper from "@components/ProgressStepper";

/**
 * Stepper component for displaying workflow progress
 * Shows current stage and completed/pending stages
 */
function WorkflowStepper({ currentStage = 0, items = [] }) {
  return (
    <ProgressStepper 
      currentStep={currentStage}
      items={items}
    />  
  );
}

export default WorkflowStepper;
