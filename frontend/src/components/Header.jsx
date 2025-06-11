import styled from "styled-components";

import HeaderMenu from "@components/HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}
