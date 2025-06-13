import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";

import Button from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import BurgerMenu from "@components/BurgerMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
 
  padding: 1.2rem 4.8rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderLeft>
        <BurgerMenu />
      </HeaderLeft>

      <HeaderRight>
        <Button>
          <HiPlus />
          Start a new workflow
        </Button>
        <UserAvatar />
      </HeaderRight>
    </StyledHeader>
  );
}

export default Header;
