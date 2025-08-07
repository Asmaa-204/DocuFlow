import styled from "styled-components";
import Heading from "@components/Heading";
import ActionButtons from "@components/ActionButtons";

const CardDiv = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Notes = styled.div`
  background-color: var(--color-grey-100);
  min-height: 100px;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  font-size: 16px;
`;

function NotesSection({ request, heading = "h3", onReject, onAccept }) {
  return (
    <CardDiv>
      <div>
        <Heading as={heading}>Notes</Heading>
        <Notes>
          {request.notes}
          Nothing to look at for now
        </Notes>
      </div>
      <ActionButtons
        isCancelDanger={true}
        textSave="Accept"
        textCancel="Reject"
        onCancel={onReject}
        onSave={onAccept}
      />
    </CardDiv>
  );
}

export default NotesSection;
