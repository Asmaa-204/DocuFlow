import { useState, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import styled from "styled-components";

import { icons } from "@data/icons";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
} from "@components/Dropdown";
import NavItem from "@components/NavItem";

export const StyledDropdownIcon = styled(RiArrowDropDownLine)`
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export function NavDropdown({ data }) {
  const location = useLocation();
  const isAnyChildActive = data?.children?.some(
    (child) =>
      child.to && matchPath({ path: child.to, end: false }, location.pathname)
  );

  const [isOpen, setIsOpen] = useState(isAnyChildActive);

  useEffect(() => {
    setIsOpen(isAnyChildActive);
  }, [isAnyChildActive]);

  const IconComponent = icons[data?.icon];

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
        {IconComponent && <IconComponent />}
        <span>{data?.label}</span>
        <StyledDropdownIcon $isOpen={isOpen} />
      </DropdownButton>

      <DropdownMenu $isOpen={isOpen}>
        {data?.children.map((child) => (
          <NavItem key={child?.name} data={child} />
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
