export default function ContentCard({ title, subtitle, children }) {
  return (
    <section className="animate-fade-up rounded-xl2 border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
