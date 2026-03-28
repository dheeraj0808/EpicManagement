export const navigationItems = [
  { path: "/", label: "Dashboard", code: "DB" },
  { path: "/clients", label: "Clients", code: "CL" },
  { path: "/domains", label: "Domains", code: "DM" },
  { path: "/credentials", label: "Credentials", code: "CR" },
  { path: "/projects", label: "Projects", code: "PR" },
  { path: "/billing", label: "Billing", code: "BL" },
  { path: "/support", label: "Support", code: "SP" },
  { path: "/user-management", label: "User Management", code: "UM", requiredRole: "Super Admin" },
  { path: "/settings", label: "Settings", code: "ST" },
];

export const pageTitleByPath = navigationItems.reduce((result, item) => {
  result[item.path] = item.label;
  return result;
}, {});
