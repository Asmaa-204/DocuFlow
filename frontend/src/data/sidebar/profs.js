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
        name: "My Workflows",
        icon: "myWorkflows",
        to: "/workflows/my-workflows",
      },
    ]

  },
  {
    name: "Requests",
    icon: "inbox",
    children: [
      {
        name: "Drafts",
        icon: "pen",
        to: "/requests/drafts",
      },
      {
        name: "Submitted",
        icon: "submitted",
        to: "/requests/submitted",
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
