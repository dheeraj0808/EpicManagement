import { useEffect, useMemo, useState } from "react";
import { useUI } from "../context/UIContext";
import { cn } from "../utils/classNames";

const POSITIVE_STATUS_TOKENS = ["active", "paid", "completed", "healthy", "on", "enabled"];
const ATTENTION_STATUS_TOKENS = ["pending", "expiring", "expired", "warning", "urgent", "overdue", "failed", "off"];

function stringifyForSearch(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => stringifyForSearch(item)).join(" ");
  }

  if (typeof value === "object") {
    if ("$$typeof" in value) {
      return "";
    }

    return Object.values(value)
      .map((item) => stringifyForSearch(item))
      .join(" ");
  }

  return "";
}

function matchesTableFilter(row, activeFilter) {
  if (activeFilter === "all") {
    return true;
  }

  const statusProbe = stringifyForSearch({
    status: row.status,
    paymentStatus: row.paymentStatus,
    expiry: row.expiryLabel,
    autoRenew: row.autoRenew,
    role: row.role,
  })
    .trim()
    .toLowerCase();

  if (!statusProbe) {
    return true;
  }

  if (activeFilter === "positive") {
    return POSITIVE_STATUS_TOKENS.some((token) => statusProbe.includes(token));
  }

  if (activeFilter === "attention") {
    return ATTENTION_STATUS_TOKENS.some((token) => statusProbe.includes(token));
  }

  return true;
}

export default function DataTable({
  columns,
  rows,
  rowClassName,
  loading = false,
  defaultPageSize = 8,
  pageSizeOptions = [5, 8, 10, 20],
  enableGlobalControls = true,
  emptyMessage = "No records found for the selected search/filter.",
  simulateInitialLoading = true,
  initialLoadingMs = 550,
}) {
  const { globalSearch, tableFilter } = useUI();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [bootLoading, setBootLoading] = useState(simulateInitialLoading);

  useEffect(() => {
    if (!simulateInitialLoading) {
      setBootLoading(false);
      return;
    }

    const timer = window.setTimeout(() => setBootLoading(false), initialLoadingMs);
    return () => window.clearTimeout(timer);
  }, [initialLoadingMs, simulateInitialLoading]);

  const filteredRows = useMemo(() => {
    const query = enableGlobalControls ? globalSearch.trim().toLowerCase() : "";
    const activeFilter = enableGlobalControls ? tableFilter : "all";

    return rows.filter((row) => {
      if (!matchesTableFilter(row, activeFilter)) {
        return false;
      }

      if (!query) {
        return true;
      }

      return stringifyForSearch(row).toLowerCase().includes(query);
    });
  }, [enableGlobalControls, globalSearch, rows, tableFilter]);

  useEffect(() => {
    setPage(1);
  }, [globalSearch, rowsPerPage, tableFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredRows.slice(startIndex, endIndex);

  const isLoading = loading || bootLoading;

  const visiblePageNumbers = useMemo(() => {
    const first = Math.max(1, currentPage - 1);
    const last = Math.min(totalPages, first + 2);
    const adjustedFirst = Math.max(1, last - 2);
    return Array.from({ length: last - adjustedFirst + 1 }, (_, index) => adjustedFirst + index);
  }, [currentPage, totalPages]);

  const pageLabelStart = filteredRows.length === 0 ? 0 : startIndex + 1;
  const pageLabelEnd = Math.min(endIndex, filteredRows.length);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {pageLabelStart}-{pageLabelEnd} of {filteredRows.length}
        </p>

        <label className="inline-flex items-center gap-2">
          <span>Rows</span>
          <select
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(Number(event.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {pageSizeOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-400"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading
              ? Array.from({ length: Math.min(rowsPerPage, 6) }).map((_, index) => (
                  <tr key={`skeleton-${index}`}>
                    {columns.map((column) => (
                      <td key={`${column.key}-${index}`} className="whitespace-nowrap px-3 py-3">
                        <div className="h-4 w-full max-w-[12rem] animate-pulse rounded-md bg-slate-200/80" />
                      </td>
                    ))}
                  </tr>
                ))
              : null}

            {!isLoading && visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-6 text-center text-sm text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? visibleRows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "animate-fade-up transition-colors duration-200 hover:bg-slate-50/80",
                      typeof rowClassName === "function" ? rowClassName(row) : "",
                    )}
                  >
                    {columns.map((column) => (
                      <td key={`${row.id}-${column.key}`} className="whitespace-nowrap px-3 py-3 text-sm text-slate-700">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={currentPage <= 1 || isLoading}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-600 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {visiblePageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              disabled={isLoading}
              className={cn(
                "rounded-md px-2.5 py-1.5 font-semibold transition",
                pageNumber === currentPage
                  ? "bg-brand-100 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={currentPage >= totalPages || isLoading}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-600 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
