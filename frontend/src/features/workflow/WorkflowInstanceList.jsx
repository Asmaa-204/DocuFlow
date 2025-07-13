import Row from "@components/Row";
import WorkflowInstanceCard from "./WorkflowInstanceCard";
import styled from "styled-components";
import Spinner from "@components/Spinner";

import { useWorkflowInstances } from "./hooks/useWorkflowInstances";

const Container = styled.div`
  margin: 20px 0;
`;

function WorkflowInstanceList({ isPending, instancesData }) {
  if (isPending) return <Spinner />;

  console.log(`Instances Data: \n${instancesData}`);
  console.log(instancesData[0]);
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
