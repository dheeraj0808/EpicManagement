import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import DomainsPage from "./pages/DomainsPage";
import CredentialsPage from "./pages/CredentialsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BillingPage from "./pages/BillingPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import { ClientsProvider } from "./context/ClientsContext";

export default function App() {
  return (
    <ClientsProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailPage />} />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </ClientsProvider>
  );
}
