import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import { activeProjects, dashboardMetrics, recentTickets } from "../data/dashboard";

const projectColumns = [
  { key: "project", label: "Project" },
  { key: "client", label: "Client" },
  { key: "owner", label: "Owner" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const tone =
        value === "In Progress"
          ? "bg-brand-100 text-brand-700"
          : value === "Review"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-700";

      return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
    },
  },
];

const ticketColumns = [
  { key: "id", label: "Ticket" },
  { key: "subject", label: "Subject" },
  { key: "priority", label: "Priority" },
  { key: "owner", label: "Owner" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Today</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Operations Snapshot</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This dashboard is connected to dummy data and ready for API integration.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ContentCard title="Active Projects" subtitle="Delivery pipeline">
          <DataTable columns={projectColumns} rows={activeProjects} />
        </ContentCard>

        <ContentCard title="Support Queue" subtitle="Latest support tickets">
          <DataTable columns={ticketColumns} rows={recentTickets} />
        </ContentCard>
      </section>
    </div>
  );
}
