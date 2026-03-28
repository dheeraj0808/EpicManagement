import { NavLink } from "react-router-dom";
import { cn } from "../utils/classNames";

export default function NavItem({ item, onNavigate }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
          isActive
            ? "bg-brand-100 text-brand-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        )
      }
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
        {item.code}
      </span>
      <span>{item.label}</span>
    </NavLink>
  );
}
