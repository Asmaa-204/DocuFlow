import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

import { useClickOutside } from "@hooks/useClickOutside";

const Menu = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1000;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: 15px;
  top: 23px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  & span {
    width: max-content;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [selectedId, setSelectedId] = useState("");
  const open = setSelectedId;
  const close = () => setSelectedId("");

  return (
    <MenusContext.Provider value={{ selectedId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

function List({ children, id }) {
  const { selectedId, close } = useContext(MenusContext);
  const ref = useClickOutside(false, close);

  if (selectedId !== id) return;

  return <StyledList ref={ref}>{children}</StyledList>;
}

function Toggle({ id }) {
  const { open, close, selectedId } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    selectedId === "" || selectedId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick();
    close();
  }
  return (
    <ul>
      <StyledButton onClick={handleClick}>
        {icon} <span> {children} </span>
      </StyledButton>
    </ul>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
