import Row from "@components/Row";
import WorkflowInstanceCard from "./WorkflowInstanceCard";
import { useWorkflowInstances } from "./hooks/useWorkflowInstances";

function WorkflowInstanceList({ instances }) {
  const { renderStepper } = useWorkflowInstances();

  const instancesData = instances.map((instance) => renderStepper(instance));

  return (
    <Row type="vertical">
      {instancesData.map((instance, index) => (
        <WorkflowInstanceCard key={instance.id || index} instance={instance} />
      ))}
    </Row>
  );
}

export default WorkflowInstanceList;
