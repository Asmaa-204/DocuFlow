import styled from "styled-components";

import { navLinks } from "@data/sidebar/profs";
import SidebarItem from "@components/SidebarItem";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        {navLinks.map((link) => (
          <SidebarItem key={link?.name} data={link} />
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
