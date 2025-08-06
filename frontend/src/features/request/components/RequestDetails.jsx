import styled from "styled-components";
import Row from "@components/Row";
import Heading from "@components/Heading";
import EmptyState from "./EmptyState";
import RequestCard from "./RequestCard";
import RequestHeader from "./RequestHeader";
import FormsSection from "./FormsSection";
import NotesSection from "./NotesSection";

const Container = styled.div`
  width: 65%;
  height: 100%;
`;

function RequestDetails({ request }) {
  if (!request) {
    return <EmptyState />;
  }

  const handleReject = () => {
    console.log("Rejected request:", request.id);
    // TODO: Implement reject logic
  };

  const handleAccept = () => {
    console.log("Accepted request:", request.id);
    // TODO: Implement accept logic
  };

  return (
    <Container>
      <Row type="vertical" style={{ height: "100%" }}>
        <Heading as="h1">Details</Heading>
        <RequestCard>
          <RequestHeader request={request} />
          <FormsSection />
          <NotesSection
            request={request}
            onReject={handleReject}
            onAccept={handleAccept}
          />
        </RequestCard>
      </Row>
    </Container>
  );
}

export default RequestDetails;
