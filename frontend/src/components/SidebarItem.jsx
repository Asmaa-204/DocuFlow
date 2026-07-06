import { NavDropdown } from "@components/NavDropdown";
import NavItem from "@components/NavItem";
import { useAuth } from "@context/AuthContext";

function SidebarItem({ data }) {
  const { user } = useAuth();
  if (user && data.roles && !data.roles.includes(user.role)) return null;

  return data?.children && data?.children?.length > 0 ? (
    <NavDropdown data={data} />
  ) : (
    <NavItem data={data} />
  );
}

export default SidebarItem;
