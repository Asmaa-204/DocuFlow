import Button from "@components/Button";
import styled from "styled-components";

const ButtonsBox = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function ActionButtons({
  onCancel,
  onSave,
  isCancelDanger,
  textSave,
  textCancel,
}) {
  return (
    <ButtonsBox>
      <Button
        $variation={isCancelDanger === true ? "danger" : "secondary"}
        onClick={onCancel}
      >
        {textCancel}
      </Button>
      <Button $variation="primary" onClick={onSave}>
        {textSave}
      </Button>
    </ButtonsBox>
  );
}

export default ActionButtons;
