import styled from "styled-components";

import RequestedDoc from "./RequestedDoc";
import Heading from "@components/Heading";

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

function RequestedDocsList({ type, documents }) {
  return (
    <>
      <Heading as="h3">{type}</Heading>
      <ItemsGrid>
        {documents.map((doc) => (
          <RequestedDoc key={doc?.id} doc={doc} type={type} />
        ))}
      </ItemsGrid>
    </>
  );
}

export default RequestedDocsList;
