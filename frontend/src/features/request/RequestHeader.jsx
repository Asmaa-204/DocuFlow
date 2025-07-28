import styled from "styled-components";
import Row from "@components/Row";
import ID from "@components/ID";
import Heading from "@components/Heading";

const CardDiv = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }
`;

function RequestHeader({ request, heading = "h3" }) {
  return (
    <CardDiv>
      <Row type="horizontal">
        <Heading as={heading}>
          <b>{request.workflowTitle}</b>
        </Heading>
        <ID>#{request.id}</ID>
      </Row>
      <p> From: {request.userId}</p>
    </CardDiv>
  );
}

export default RequestHeader;
