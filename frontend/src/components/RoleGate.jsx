import { useRole } from "../context/RoleContext";

export default function RoleGate({ requiredRole, fallback = null, children }) {
  const { role } = useRole();

  if (requiredRole && role !== requiredRole) {
    return fallback;
  }

  return children;
}
