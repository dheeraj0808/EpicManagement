import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ROLES, useRole } from "./RoleContext";

const AUTH_STORAGE_KEY = "epicmanagement-auth-session";

const DEMO_ACCOUNTS = {
  "admin@gmail.com": {
    role: ROLES.ADMIN,
    name: "Admin User",
  },
  "superadmin@gmail.com": {
    role: ROLES.SUPER_ADMIN,
    name: "Super Admin User",
  },
};

const AuthContext = createContext(null);

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession);
    if (!parsedSession?.email || !parsedSession?.role) {
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
}

function sleep(durationMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export function AuthProvider({ children }) {
  const { setRole } = useRole();
  const [session, setSession] = useState(() => getStoredSession());

  useEffect(() => {
    if (session?.role) {
      setRole(session.role);
    }
  }, [session?.role, setRole]);

  const login = useCallback(
    async ({ email, password }) => {
      await sleep(900);

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      if (!normalizedPassword) {
        throw new Error("Password is required");
      }

      const account = DEMO_ACCOUNTS[normalizedEmail];

      if (!account) {
        throw new Error("Invalid email or password");
      }

      const nextSession = {
        email: normalizedEmail,
        role: account.role,
        name: account.name,
      };

      setSession(nextSession);
      setRole(account.role);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
      }

      return nextSession;
    },
    [setRole],
  );

  const logout = useCallback(() => {
    setSession(null);
    setRole(ROLES.ADMIN);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [setRole]);

  const value = useMemo(
    () => ({
      user: session,
      isAuthenticated: Boolean(session),
      login,
      logout,
      demoEmails: Object.keys(DEMO_ACCOUNTS),
    }),
    [login, logout, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
