import styled from "styled-components";
import { format } from "date-fns";
import Row from "@components/Row";
import ID from "@components/ID";
import WorkflowStepper from "./WorkflowStepper";

const Card = styled.div`
  padding: 18px;
  padding-bottom: -10px;
  width: 100%;
  // background: #ffffffff;
  border-radius: 10px;
  border-width: 2px;
  border-color: #dee1e6ff; /* neutral-300 */
  border-style: solid;
`;

const HeaderContainer = styled.div``;

const Header = styled.span`
  font-weight: bold;
  font-size: 2rem;
  margin-right: 10px;
`;

const Dates = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  font-weight: normal;
`;

function WorkflowInstanceCard({ instance }) {
  return (
    <Card>
      <Row type="horizontal">
        <HeaderContainer>
          <Header>{instance.header}</Header>
          <Dates>
            {format(new Date(instance.start_datetime), "dd/MM/yyyy")} {" - "}
            {format(new Date(instance.last_updated_datetime), "dd/MM/yyyy")}
          </Dates>
        </HeaderContainer>
        <ID>#{instance.id}</ID>
      </Row>
      <WorkflowStepper
        currentStage={instance.current_stage}
        items={instance.items}
      />
    </Card>
  );
}

export default WorkflowInstanceCard;
