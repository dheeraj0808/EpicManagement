import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import {
  dashboardStats,
  quickActions,
  recentActivityLog,
  recentlyAddedClients,
  upcomingDomainExpiry,
} from "../data/dashboard";

const domainExpiryColumns = [
  { key: "domain", label: "Domain" },
  { key: "owner", label: "Owner" },
  { key: "expiresOn", label: "Expires" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const tone =
        value === "Urgent"
          ? "bg-rose-100 text-rose-700"
          : value === "Warning"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-700";

      return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
    },
  },
];

const recentClientColumns = [
  { key: "name", label: "Client" },
  { key: "accountManager", label: "Account Manager" },
  { key: "onboardingDate", label: "Added On" },
  {
    key: "plan",
    label: "Plan",
    render: (value) => {
      const tone =
        value === "Enterprise"
          ? "bg-indigo-100 text-indigo-700"
          : value === "Growth"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-700";

      return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
    },
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Dashboard</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Website Management Control Center</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Snapshot of client operations, domain health, credential coverage, and recent team activity.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardStats.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ContentCard title="Recent Activity" subtitle="Live operational activity stream">
            <ul className="space-y-4">
              {recentActivityLog.map((activity) => (
                <li
                  key={activity.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-sm text-slate-600"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p>
                      <span className="font-semibold text-slate-900">{activity.actor}</span> {activity.action}{" "}
                      <span className="font-medium text-slate-800">{activity.target}</span>
                    </p>
                    <span className="whitespace-nowrap text-xs text-slate-400">{activity.timestamp}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ContentCard>
        </div>

        <ContentCard title="Quick Actions" subtitle="Frequently used shortcuts">
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-brand-200 hover:bg-brand-50/40"
              >
                <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                <p className="mt-1 text-xs text-slate-500">{action.description}</p>
              </button>
            ))}
          </div>
        </ContentCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ContentCard title="Upcoming Domain Expiry" subtitle="Domains requiring timely renewal">
          <DataTable columns={domainExpiryColumns} rows={upcomingDomainExpiry} />
        </ContentCard>

        <ContentCard title="Recently Added Clients" subtitle="Newest accounts onboarded to the platform">
          <DataTable columns={recentClientColumns} rows={recentlyAddedClients} />
        </ContentCard>
      </section>
    </div>
  );
}
