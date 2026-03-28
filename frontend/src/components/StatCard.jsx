export default function StatCard({ label, value, hint }) {
  return (
    <article className="rounded-xl2 border border-slate-200 bg-white p-4 shadow-panel">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-brand-700">{hint}</p>
    </article>
  );
}
