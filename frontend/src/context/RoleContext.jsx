import { createContext, useContext, useMemo, useState } from "react";

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
};

const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: {
    fullAccess: true,
    manageUsers: true,
    deleteCriticalData: true,
  },
  [ROLES.ADMIN]: {
    fullAccess: false,
    manageUsers: false,
    deleteCriticalData: false,
  },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.ADMIN);

  const permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[ROLES.ADMIN];

  const value = useMemo(
    () => ({
      role,
      setRole,
      availableRoles: Object.values(ROLES),
      isSuperAdmin: role === ROLES.SUPER_ADMIN,
      isAdmin: role === ROLES.ADMIN,
      canManageUsers: permissions.manageUsers,
      canDeleteCriticalData: permissions.deleteCriticalData,
      hasFullAccess: permissions.fullAccess,
    }),
    [permissions.deleteCriticalData, permissions.fullAccess, permissions.manageUsers, role],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }

  return context;
}
