import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { useClients } from "../context/ClientsContext";
import { cn } from "../utils/classNames";

const TABS = [
  { key: "projects", label: "Projects" },
  { key: "domains", label: "Domains" },
  { key: "credentials", label: "Credentials" },
  { key: "billing", label: "Billing" },
  { key: "notes", label: "Notes" },
];

function statusBadgeClass(status) {
  if (status === "In Progress" || status === "Paid" || status === "Healthy") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending" || status === "Warning" || status === "Monitor" || status === "Planning") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Urgent") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-slate-700";
}

function Badge({ status }) {
  return <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusBadgeClass(status))}>{status}</span>;
}

export default function ClientDetailPage() {
  const { clientId } = useParams();
  const { getClientById } = useClients();
  const [activeTab, setActiveTab] = useState("projects");

  const client = getClientById(clientId);

  const content = useMemo(() => {
    if (!client) {
      return null;
    }

    if (activeTab === "projects") {
      return (
        <DataTable
          columns={[
            { key: "name", label: "Project" },
            { key: "owner", label: "Owner" },
            { key: "status", label: "Status", render: (value) => <Badge status={value} /> },
          ]}
          rows={client.projects}
        />
      );
    }

    if (activeTab === "domains") {
      return (
        <DataTable
          columns={[
            { key: "domain", label: "Domain" },
            { key: "expiresOn", label: "Expires On" },
            { key: "status", label: "Status", render: (value) => <Badge status={value} /> },
          ]}
          rows={client.domains}
        />
      );
    }

    if (activeTab === "credentials") {
      return (
        <DataTable
          columns={[
            { key: "label", label: "Credential" },
            { key: "type", label: "Type" },
            { key: "lastUpdated", label: "Last Updated" },
          ]}
          rows={client.credentials}
        />
      );
    }

    if (activeTab === "billing") {
      return (
        <DataTable
          columns={[
            { key: "invoiceId", label: "Invoice" },
            { key: "amount", label: "Amount" },
            { key: "dueDate", label: "Due Date" },
            { key: "status", label: "Status", render: (value) => <Badge status={value} /> },
          ]}
          rows={client.billing}
        />
      );
    }

    return (
      <div className="space-y-4">
        <article className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client Notes</p>
          <p className="mt-2 text-sm text-slate-700">{client.notes || "No notes provided yet."}</p>
        </article>

        <div className="space-y-3">
          {client.noteTimeline.length === 0 ? (
            <p className="text-sm text-slate-500">No timeline notes yet.</p>
          ) : (
            client.noteTimeline.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))
          )}
        </div>
      </div>
    );
  }, [activeTab, client]);

  if (!client) {
    return (
      <ContentCard title="Client Not Found" subtitle="This client may have been deleted or never existed.">
        <Link
          to="/clients"
          className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back to Clients
        </Link>
      </ContentCard>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/clients" className="text-sm font-medium text-brand-700 hover:underline">
              {"<- Back to Client List"}
            </Link>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{client.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{client.companyName}</p>
          </div>

          <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-medium text-slate-800">Email:</span> {client.email}
            </p>
            <p>
              <span className="font-medium text-slate-800">Phone:</span> {client.phone}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-slate-800">Address:</span> {client.address}
            </p>
          </div>
        </div>
      </section>

      <ContentCard title="Client Workspace" subtitle="Structured CRM view across projects, assets, and billing.">
        <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-xl px-3 py-1.5 text-sm font-medium transition",
                activeTab === tab.key
                  ? "bg-brand-100 text-brand-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {content}
      </ContentCard>
    </div>
  );
}
