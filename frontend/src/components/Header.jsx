import { formatLongDate } from "../utils/formatters";
import { useRole } from "../context/RoleContext";
import { useToast } from "../context/ToastContext";
import { useUI } from "../context/UIContext";
import FiltersDropdown from "./FiltersDropdown";

export default function Header({ title, onMenuOpen }) {
  const { role, setRole, availableRoles } = useRole();
  const { globalSearch, setGlobalSearch, tableFilter, setTableFilter, tableFilterOptions, isDarkMode, toggleThemeMode } =
    useUI();
  const { showToast } = useToast();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
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

        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="global-search">
              Global Search
            </label>
            <input
              id="global-search"
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Global search across tables..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:w-72"
            />

            <FiltersDropdown value={tableFilter} options={tableFilterOptions} onChange={setTableFilter} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                toggleThemeMode();
                showToast(`Switched to ${isDarkMode ? "light" : "dark"} mode`, "info");
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>

            <button
              type="button"
              onClick={() => showToast("No new notifications right now", "info")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Notifications"
            >
              Alerts
            </button>

            <label className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 xl:block">Role</label>
          </div>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:text-sm"
            aria-label="Select role"
          >
            {availableRoles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>

          <p className="hidden rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 xl:block">
            {formatLongDate(new Date())}
          </p>
        </div>
      </div>
    </header>
  );
}
