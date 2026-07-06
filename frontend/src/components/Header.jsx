import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import BurgerMenu from "@components/BurgerMenu";
import DarkModeToggle from "@components/DarkModeToggle";
import { translator as t } from "@data/translations/ar";
import { useAuth } from "@context/AuthContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  padding: 1.2rem 4.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const HeaderEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function Header() {
  const navigate = useNavigate();

  const handleStartWorkflow = () => {
    navigate("/workflows/new");
  };

  const { user } = useAuth();

  return (
    <StyledHeader>
      <HeaderStart>
        <BurgerMenu />
      </HeaderStart>

      <HeaderEnd>
        {
          user && user.role == "professor"
          &&
          <Button onClick={handleStartWorkflow}>
            <HiPlus />
            {t.workflow.startNew}
          </Button>
        }
        <DarkModeToggle />
        <UserAvatar />
      </HeaderEnd>
    </StyledHeader>
  );
}

export default Header;
