import { icons } from "@data/icons";
import { StyledNavLink } from "@components/NavLink";

function NavItem({ data }) {
  const { icon, to, name } = data;
  const IconComponent = icons[icon];

  return (
    <li key={name}>
      <StyledNavLink to={to}>
        {IconComponent && <IconComponent />}
        <span>{name}</span>
      </StyledNavLink>
    </li>
  );
}

export default NavItem;
