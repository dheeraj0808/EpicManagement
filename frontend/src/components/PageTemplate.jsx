import ContentCard from "./ContentCard";
import DataTable from "./DataTable";
import StatCard from "./StatCard";

export default function PageTemplate({ title, description, stats, tableTitle, columns, rows }) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Overview</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} hint={card.hint} />
        ))}
      </section>

      <ContentCard title={tableTitle} subtitle="Dummy data for initial UI scaffolding.">
        <DataTable columns={columns} rows={rows} />
      </ContentCard>
    </div>
  );
}
