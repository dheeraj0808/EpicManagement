import { formatLongDate } from "../utils/formatters";

export default function Header({ title, onMenuOpen }) {
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

        <div className="hidden items-center gap-3 sm:flex">
          <p className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500">
            {formatLongDate(new Date())}
          </p>
          <button
            type="button"
            className="rounded-xl bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            New Entry
          </button>
        </div>
      </div>
    </header>
  );
}
