export default function FiltersDropdown({ value, options, onChange, label = "Filters", className = "" }) {
  return (
    <label className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm ${className}`}>
      <span className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 md:block">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-[8.5rem] bg-transparent text-xs font-medium text-slate-700 outline-none md:text-sm"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
