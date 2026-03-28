import { formatLongDate } from "../utils/formatters";
import { useRole } from "../context/RoleContext";

export default function Header({ title, onMenuOpen }) {
  const { role, setRole, availableRoles } = useRole();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuOpen}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 md:hidden"
          >
            Menu
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Workspace</p>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 md:block">Role</label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            aria-label="Select role"
          >
            {availableRoles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>

          <p className="hidden rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 sm:block">
            {formatLongDate(new Date())}
          </p>
          <button
            type="button"
            className="hidden rounded-xl bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 md:block"
          >
            New Entry
          </button>
        </div>
      </div>
    </header>
  );
}
