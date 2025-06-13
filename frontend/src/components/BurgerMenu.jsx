import styled from "styled-components";
import { HiOutlineBars3 } from "react-icons/hi2";

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;
  
  background: none;
  
  border: none;
  border-radius: var(--border-radius-sm);
  
  cursor: pointer;
  
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  &:hover svg {
    color: var(--color-grey-800);
  }
`;

function BurgerMenu() {
  return (
    <MenuButton>
      <HiOutlineBars3 />
    </MenuButton>
  );
}

export default BurgerMenu;
