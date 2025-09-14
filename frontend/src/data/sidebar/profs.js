import { translator as t } from "@data/translations/ar";

export const navLinks = [
  {
    name: "dashboard",
    label: t.navigation.dashboard,
    icon: "home",
    to: "/dashboard",
  },
  {
    name: "workflows",
    label: t.navigation.workflows,
    icon: "workflow",
    children: [
      {
        name: "new",
        label: t.workflow.new,
        icon: "new",
        to: "/workflows/new",
      },
      {
        name: "my workflows",
        label: t.workflow.myWorkflows,
        icon: "myWorkflows",
        to: "/workflows/my-workflows",
      },
    ],
  },
  {
    name: "requests",
    icon: "inbox",
    label: t.navigation.requests,
    children: [
      {
        name: "inbox",
        label: t.request.inbox,
        icon: "email",
        to: "/requests/inbox",
      },
      {
        name: "drafts",
        label: t.request.drafts,
        icon: "pen",
        to: "/requests/drafts",
      },
      {
        name: "submitted",
        label: t.request.submitted,
        icon: "submitted",
        to: "/requests/submitted",
      },
    ],
  },
  {
    name: "settings",
    label: t.navigation.settings,
    icon: "settings",
    to: "/settings",
  },
  {
    name: "logout",
    label: t.navigation.logout,
    icon: "logout",
    to: "/login",
  },
];
