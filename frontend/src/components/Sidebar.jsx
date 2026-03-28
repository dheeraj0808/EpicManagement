import { navigationItems } from "../data/navigation";
import { useRole } from "../context/RoleContext";
import { cn } from "../utils/classNames";
import NavItem from "./NavItem";

export default function Sidebar({ open, onClose }) {
  const { role } = useRole();

  const visibleNavigationItems = navigationItems.filter((item) => !item.requiredRole || item.requiredRole === role);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/45 transition md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-transform md:translate-x-0 md:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">EpicManagement</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Control Console</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close navigation"
          >
            X
          </button>
        </div>

        <nav className="space-y-1.5">
          {visibleNavigationItems.map((item) => (
            <NavItem key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Current Role</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{role}</p>
        </div>
      </aside>
    </>
  );
}
