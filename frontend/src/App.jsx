import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { PublicOnlyRoute, RequireAuth } from "./components/AuthGuards";
import RoleGate from "./components/RoleGate";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import DomainsPage from "./pages/DomainsPage";
import CredentialsPage from "./pages/CredentialsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BillingPage from "./pages/BillingPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import UserManagementPage from "./pages/UserManagementPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ClientsProvider } from "./context/ClientsContext";
import { ROLES, RoleProvider } from "./context/RoleContext";
import { ToastProvider } from "./context/ToastContext";
import { UIProvider } from "./context/UIContext";

export default function App() {
  return (
    <UIProvider>
      <ToastProvider>
        <RoleProvider>
          <AuthProvider>
            <ClientsProvider>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <LoginPage />
                    </PublicOnlyRoute>
                  }
                />

                <Route
                  element={
                    <RequireAuth>
                      <AppLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/clients/:clientId" element={<ClientDetailPage />} />
                  <Route path="/domains" element={<DomainsPage />} />
                  <Route path="/credentials" element={<CredentialsPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/billing" element={<BillingPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route
                    path="/user-management"
                    element={
                      <RoleGate requiredRole={ROLES.SUPER_ADMIN} fallback={<Navigate replace to="/" />}>
                        <UserManagementPage />
                      </RoleGate>
                    }
                  />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </ClientsProvider>
          </AuthProvider>
        </RoleProvider>
      </ToastProvider>
    </UIProvider>
  );
}
