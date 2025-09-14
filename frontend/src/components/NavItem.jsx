import { icons } from "@data/icons";
import { StyledNavLink } from "@components/NavLink";
import LogoutButton from "@features/auth/logout/LogoutButton";

function NavItem({ data }) {
  const { icon, to, name, label } = data;
  const IconComponent = icons[icon];

  if (name === "logout") {
    return (
      <StyledNavLink>
        {IconComponent && <IconComponent />}
        <LogoutButton />
      </StyledNavLink>
    );
  }

  return (
    <li>
      <StyledNavLink to={to}>
        {IconComponent && <IconComponent />}
        <span>{label}</span>
      </StyledNavLink>
    </li>
  );
}

export default NavItem;
