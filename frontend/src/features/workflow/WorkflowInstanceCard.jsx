import styled from "styled-components";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import Row from "@components/Row";
import ID from "@components/ID";
import WorkflowStepper from "./WorkflowStepper";

const Card = styled.div`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--color-grey-200);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  direction: rtl;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Header = styled.span`
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--color-grey-800);
`;

const Dates = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

const IDWrapper = styled.div`
  margin-inline-start: auto;
  font-weight: 600;
  color: var(--color-brand-600);
`;

function WorkflowInstanceCard({ instance }) {
  return (
    <Card>
      <Row type="horizontal" style={{ justifyContent: "space-between" }}>
        <HeaderContainer>
          <Header>{instance.header}</Header>
          <Dates>
            {format(new Date(instance.start_datetime), "d MMMM yyyy", {
              locale: ar,
            })}
            {" - "}
            {format(new Date(instance.last_updated_datetime), "d MMMM yyyy", {
              locale: ar,
            })}
          </Dates>
        </HeaderContainer>
        <IDWrapper>
          <ID>#{instance.id}</ID>
        </IDWrapper>
      </Row>
      <WorkflowStepper
        currentStage={instance.current_stage}
        items={instance.items}
      />
    </Card>
  );
}

export default WorkflowInstanceCard;
