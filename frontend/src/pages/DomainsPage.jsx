import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { useClients } from "../context/ClientsContext";
import { domainRecords } from "../data/domains";
import { cn } from "../utils/classNames";

const STATUS_FILTERS = ["All", "Active", "Expiring", "Expired"];
const SORT_OPTIONS = {
  ASC: "asc",
  DESC: "desc",
};
const EXPIRY_WARNING_DAYS = 30;

function getDaysUntilExpiry(expiryDateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiryDate = new Date(expiryDateString);
  expiryDate.setHours(0, 0, 0, 0);

  const diffTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getDomainStatus(daysUntilExpiry) {
  if (daysUntilExpiry < 0) {
    return "Expired";
  }

  if (daysUntilExpiry <= EXPIRY_WARNING_DAYS) {
    return "Expiring";
  }

  return "Active";
}

function getExpiryLabel(daysUntilExpiry) {
  if (daysUntilExpiry < 0) {
    const absoluteDays = Math.abs(daysUntilExpiry);
    return `Expired ${absoluteDays} day${absoluteDays === 1 ? "" : "s"} ago`;
  }

  if (daysUntilExpiry === 0) {
    return "Expires today";
  }

  if (daysUntilExpiry === 1) {
    return "Expires in 1 day";
  }

  return `Expires in ${daysUntilExpiry} days`;
}

function statusTone(status) {
  if (status === "Active") return "bg-emerald-100 text-emerald-700";
  if (status === "Expiring") return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

function expiryTone(daysUntilExpiry) {
  if (daysUntilExpiry < 0) return "bg-rose-100 text-rose-700";
  if (daysUntilExpiry <= EXPIRY_WARNING_DAYS) return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

function autoRenewTone(autoRenew) {
  return autoRenew ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700";
}

export default function DomainsPage() {
  const { getClientById } = useClients();
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDirection, setSortDirection] = useState(SORT_OPTIONS.ASC);

  const enrichedDomains = useMemo(() => {
    return domainRecords.map((domain) => {
      const daysUntilExpiry = getDaysUntilExpiry(domain.expiryDate);
      const status = getDomainStatus(daysUntilExpiry);
      const client = getClientById(domain.clientId);

      return {
        ...domain,
        status,
        daysUntilExpiry,
        expiryLabel: getExpiryLabel(daysUntilExpiry),
        clientName: client?.companyName || "Unknown Client",
      };
    });
  }, [getClientById]);

  const visibleDomains = useMemo(() => {
    const filtered = enrichedDomains.filter((domain) => {
      if (statusFilter === "All") {
        return true;
      }

      return domain.status === statusFilter;
    });

    return filtered.sort((left, right) => {
      const leftDate = new Date(left.expiryDate).getTime();
      const rightDate = new Date(right.expiryDate).getTime();

      if (sortDirection === SORT_OPTIONS.ASC) {
        return leftDate - rightDate;
      }

      return rightDate - leftDate;
    });
  }, [enrichedDomains, sortDirection, statusFilter]);

  const summary = useMemo(() => {
    const active = enrichedDomains.filter((domain) => domain.status === "Active").length;
    const expiring = enrichedDomains.filter((domain) => domain.status === "Expiring").length;
    const expired = enrichedDomains.filter((domain) => domain.status === "Expired").length;

    return {
      total: enrichedDomains.length,
      active,
      expiring,
      expired,
    };
  }, [enrichedDomains]);

  const tableColumns = [
    { key: "domainName", label: "Domain Name" },
    {
      key: "clientName",
      label: "Client",
      render: (_, row) => (
        <Link to={`/clients/${row.clientId}`} className="font-medium text-brand-700 hover:underline">
          {row.clientName}
        </Link>
      ),
    },
    { key: "registrar", label: "Registrar" },
    { key: "purchaseDate", label: "Purchase Date" },
    { key: "expiryDate", label: "Expiry Date" },
    {
      key: "expiryLabel",
      label: "Expiry Warning",
      render: (value, row) => (
        <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", expiryTone(row.daysUntilExpiry))}>{value}</span>
      ),
    },
    {
      key: "autoRenew",
      label: "Auto-renew",
      render: (value) => (
        <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", autoRenewTone(value))}>{value ? "On" : "Off"}</span>
      ),
    },
    { key: "hostingProvider", label: "Hosting Provider" },
    {
      key: "status",
      label: "Status",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusTone(value))}>{value}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Domain Management</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Domain Portfolio Tracker</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Track lifecycle, renewals, hosting ownership, and expiry risk across all managed domains.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Domains" value={summary.total} tone="text-slate-900" />
          <SummaryCard label="Active" value={summary.active} tone="text-emerald-700" />
          <SummaryCard label="Expiring" value={summary.expiring} tone="text-amber-700" />
          <SummaryCard label="Expired" value={summary.expired} tone="text-rose-700" />
        </div>
      </section>

      <ContentCard title="Filters" subtitle="Narrow down by status and control expiry ordering.">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Sort by Expiry</span>
            <select
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value={SORT_OPTIONS.ASC}>Soonest First</option>
              <option value={SORT_OPTIONS.DESC}>Latest First</option>
            </select>
          </label>
        </div>
      </ContentCard>

      <ContentCard
        title="Domain Inventory"
        subtitle={`${visibleDomains.length} domain${visibleDomains.length === 1 ? "" : "s"} in current view`}
      >
        <DataTable
          columns={tableColumns}
          rows={visibleDomains}
          rowClassName={(row) => {
            if (row.status === "Expired") return "bg-rose-50/70 hover:bg-rose-100/80";
            if (row.status === "Expiring") return "bg-amber-50/70 hover:bg-amber-100/80";
            return "";
          }}
        />
      </ContentCard>
    </div>
  );
}

function SummaryCard({ label, value, tone }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn("mt-1 text-2xl font-semibold", tone)}>{value}</p>
    </article>
  );
}
