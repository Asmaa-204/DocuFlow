export const navLinks = [
  {
    name: "Dashboard",
    icon: "home",
    to: "/dashboard",
  },
  {
    name: "Workflows",
    icon: "workflow",
    children: [
      {
        name: "New",
        icon: "new",
        to: "/workflows/new",
      },
      {
        name: "Drafts",
        icon: "pen",
        to: "/workflows/drafts",
      },
      {
        name: "Submitted",
        icon: "submitted",
        to: "/workflows/submitted",
      },
    ],
  },
  {
    name: "Settings",
    icon: "settings",
    to: "/settings",
  },
  {
    name: "logout",
    icon: "logout",
    to: "/login",
  },
];
