import { NavDropdown } from "@components/NavDropdown";
import NavItem from "@components/NavItem";

function SidebarItem({ data }) {
  return data?.children && data?.children?.length > 0 ? (
    <NavDropdown data={data} />
  ) : (
    <NavItem data={data} />
  );
}

export default SidebarItem;
