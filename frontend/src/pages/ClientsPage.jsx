import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import ClientFormModal from "../components/clients/ClientFormModal";
import DeleteClientModal from "../components/clients/DeleteClientModal";
import { useClients } from "../context/ClientsContext";

const ALL_COMPANIES = "all";

export default function ClientsPage() {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState(ALL_COMPANIES);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);

  const companyOptions = useMemo(() => {
    const uniqueCompanies = Array.from(new Set(clients.map((client) => client.companyName))).sort();
    return [ALL_COMPANIES, ...uniqueCompanies];
  }, [clients]);

  const filteredClients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesCompany = companyFilter === ALL_COMPANIES || client.companyName === companyFilter;

      if (!normalizedSearch) {
        return matchesCompany;
      }

      const haystack = [client.name, client.email, client.phone, client.companyName, client.address]
        .join(" ")
        .toLowerCase();

      return matchesCompany && haystack.includes(normalizedSearch);
    });
  }, [clients, companyFilter, searchTerm]);

  const openAddClientModal = () => {
    setSelectedClient(null);
    setFormMode("add");
    setFormOpen(true);
  };

  const openEditClientModal = (client) => {
    setSelectedClient(client);
    setFormMode("edit");
    setFormOpen(true);
  };

  const closeClientFormModal = () => {
    setFormOpen(false);
    setSelectedClient(null);
  };

  const handleFormSubmit = (clientPayload) => {
    if (formMode === "edit" && selectedClient) {
      updateClient(selectedClient.id, clientPayload);
    } else {
      addClient(clientPayload);
    }

    closeClientFormModal();
  };

  const confirmDeleteClient = () => {
    if (!clientToDelete) {
      return;
    }

    deleteClient(clientToDelete.id);
    setClientToDelete(null);
  };

  const tableColumns = [
    {
      key: "name",
      label: "Name",
      render: (value, row) => (
        <Link to={`/clients/${row.id}`} className="font-semibold text-slate-900 hover:text-brand-700 hover:underline">
          {value}
        </Link>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "companyName", label: "Company Name" },
    {
      key: "address",
      label: "Address",
      render: (value) => <span className="line-clamp-1 max-w-[220px]">{value}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openEditClientModal(row)}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setClientToDelete(row)}
            className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">CRM Module</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Client Management</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Manage client profiles, search records quickly, and open detail views for projects, domains,
              credentials, billing, and notes.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddClientModal}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Add Client
          </button>
        </div>
      </section>

      <ContentCard title="Search & Filter" subtitle="Find clients by keyword or narrow by company.">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, phone, company, or address"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Company</span>
            <select
              value={companyFilter}
              onChange={(event) => setCompanyFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value={ALL_COMPANIES}>All Companies</option>
              {companyOptions
                .filter((company) => company !== ALL_COMPANIES)
                .map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </ContentCard>

      <ContentCard
        title="Client List"
        subtitle={`${filteredClients.length} record${filteredClients.length === 1 ? "" : "s"} shown`}
      >
        <DataTable columns={tableColumns} rows={filteredClients} />
      </ContentCard>

      <ClientFormModal
        open={formOpen}
        mode={formMode}
        initialValues={selectedClient}
        onClose={closeClientFormModal}
        onSubmit={handleFormSubmit}
      />

      <DeleteClientModal
        open={Boolean(clientToDelete)}
        clientName={clientToDelete?.name}
        onCancel={() => setClientToDelete(null)}
        onConfirm={confirmDeleteClient}
      />
    </div>
  );
}
