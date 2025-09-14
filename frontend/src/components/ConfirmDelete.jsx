import styled from "styled-components";

import Button from "./Button";
import Heading from "./Heading";

import { translator as t } from "@data/translations/ar";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-start;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {t.actions.delete} {resourceName}
      </Heading>
      <p>
        {t.confirmation.delete} {t.general.the}
        {resourceName} {t.confirmation.permanently}؟{" "}
        {t.confirmation.irreversible}.
      </p>
      <div>
        <Button $variation="danger" onClick={onConfirm} disabled={disabled}>
          {t.actions.delete}
        </Button>
        <Button $variation="secondary" onClick={onClose} disabled={disabled}>
          {t.actions.cancel}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
