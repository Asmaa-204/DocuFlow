import styled from "styled-components";

import RequestedDoc from "./RequestedDoc";
import Heading from "@components/Heading";

import { translator as t } from "@data/translations/ar";

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

function RequestedDocsList({ type, documents, mode }) {
  return (
    <>
      <Heading as="h3">{t.documents[type]}</Heading>
      <ItemsGrid>
        {documents?.map((doc) => (
          <RequestedDoc mode={mode} key={doc?.id} doc={doc} type={type} />
        ))}
      </ItemsGrid>
    </>
  );
}

export default RequestedDocsList;
