import styled from "styled-components";
import { StyledNavLink } from "@components/NavLink";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem 2.4rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s;
  text-align: left;

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }

  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  left: 0;
  margin-top: 0.4rem;
  padding-left: 1rem;
  max-height: ${({ $isOpen }) => ($isOpen ? "30rem" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  &.focus {
    outline: none;
  }
`;

const DropdownLink = styled(StyledNavLink)`
  display: block;
  padding: 0.8rem 1.6rem;
  color: var(--color-grey-600);
  font-size: 1.4rem;
  transition: all 0.3s;
  border-radius: var(--border-radius-sm);

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }

  &.active {
    color: var(--color-brand-600);
    font-weight: 500;
  }
`;

export { DropdownContainer, DropdownButton, DropdownMenu, DropdownLink };
