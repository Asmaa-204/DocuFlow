import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = icons[data?.icon];

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {IconComponent && <IconComponent />}
        <span>{data?.name}</span>
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
