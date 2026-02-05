import styled from "styled-components";

import {
  HiDocumentText,
  HiClipboardDocumentList,
  HiPlus,
} from "react-icons/hi2";

import Modal from "@components/Modal";
import Form from "./Form";
import DocumentPreview from "./DocumentPreview";

import { translator as t } from "@data/translations/ar";

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  border: 2px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  cursor: ${(props) => (props.$mode === "edit" ? "pointer" : "default")};
  transition: all 0.3s;
  position: relative;

  &:hover {
    border-color: var(--color-brand-600);
    background-color: var(--color-grey-50);
  }
`;

const ItemIcon = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }
`;

const AddIcon = styled.div`
  position: absolute;
  top: -0.8rem;
  left: -0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  background-color: var(--color-grey-800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 1.2rem;
    height: 1.2rem;
    color: var(--color-grey-0);
  }
`;

const ItemLabel = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  text-align: center;
`;

function RequestedDoc({ doc: { name, id }, type, mode = "view" }) {
  return (
    <Modal>
      <Modal.Open opens={mode === "edit" ? "fill-forms" : "preview-doc"}>
        <ItemCard $mode={mode || "view"}>
          <ItemIcon>
            {type === "form" ? <HiClipboardDocumentList /> : <HiDocumentText />}
          </ItemIcon>
          <ItemLabel>{name || `${t.documents.document} #${id}`}</ItemLabel>
          {mode === "edit" && (
            <AddIcon>
              <HiPlus />
            </AddIcon>
          )}
        </ItemCard>
      </Modal.Open>
      {mode === "edit" ? (
        <Modal.Window name="fill-forms">
          <Form id={id} />
        </Modal.Window>
      ) : (
        <Modal.Window name="preview-doc" width="80%">
          <DocumentPreview docId={id} />
        </Modal.Window>
      )}
    </Modal>
  );
}

export default RequestedDoc;
