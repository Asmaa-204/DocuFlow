import styled from "styled-components";

import {
  HiDocumentText,
  HiClipboardDocumentList,
  HiPlus,
} from "react-icons/hi2";

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  border: 2px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  cursor: pointer;
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
  right: -0.8rem;
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

function RequestedDoc({ doc: { name }, type }) {
  return (
    <ItemCard>
      <ItemIcon>
        {type === "form" ? <HiClipboardDocumentList /> : <HiDocumentText />}
      </ItemIcon>
      <ItemLabel>{name}</ItemLabel>
      <AddIcon>
        <HiPlus />
      </AddIcon>
    </ItemCard>
  );
}

export default RequestedDoc;
