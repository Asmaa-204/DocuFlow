import Row from "@components/Row";
import WorkflowInstanceCard from "./WorkflowInstanceCard";
import { useWorkflowInstances } from "./hooks/useWorkflowInstances";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
`;

function WorkflowInstanceList({ instances }) {
  const { renderStepper } = useWorkflowInstances();

  const instancesData = instances.map((instance) => renderStepper(instance));

  return (
    <Container>
      <Row type="vertical">
        {instancesData.map((instance, index) => (
          <WorkflowInstanceCard
            key={instance.id || index}
            instance={instance}
          />
        ))}
      </Row>
    </Container>
  );
}

export default WorkflowInstanceList;
