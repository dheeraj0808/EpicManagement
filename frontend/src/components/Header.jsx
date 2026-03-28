import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useUI } from "../context/UIContext";
import FiltersDropdown from "./FiltersDropdown";

export default function Header({ title, onMenuOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { globalSearch, setGlobalSearch, tableFilter, setTableFilter, tableFilterOptions, isDarkMode, toggleThemeMode } =
    useUI();
  const { showToast } = useToast();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
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

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            <label className="sr-only" htmlFor="global-search">
              Global Search
            </label>
            <input
              id="global-search"
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Global search across tables..."
              className="min-w-0 w-40 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:w-56 xl:w-72"
            />

            <FiltersDropdown value={tableFilter} options={tableFilterOptions} onChange={setTableFilter} />
          </div>

          <div className="flex shrink-0 items-center gap-2">
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

            <span className="hidden rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 xl:block">
              {user?.role}
            </span>
          </div>

          <span className="hidden shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 lg:block">
            {user?.email}
          </span>

          <button
            type="button"
            onClick={() => {
              logout();
              showToast("Logged out successfully", "info");
              navigate("/login", { replace: true });
            }}
            className="shrink-0 rounded-xl border border-rose-600 bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
