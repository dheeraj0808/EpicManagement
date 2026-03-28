import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { useClients } from "../context/ClientsContext";
import { projectRecords } from "../data/projects";
import { cn } from "../utils/classNames";

const VIEW_MODES = {
  TABLE: "table",
  KANBAN: "kanban",
};

const KANBAN_COLUMNS = ["Pending", "In Progress", "Completed"];

function statusTone(status) {
  if (status === "Completed") return "bg-emerald-100 text-emerald-700";
  if (status === "In Progress") return "bg-sky-100 text-sky-700";
  return "bg-amber-100 text-amber-700";
}

function typeTone(type) {
  if (type === "Website") return "bg-indigo-100 text-indigo-700";
  if (type === "App") return "bg-violet-100 text-violet-700";
  if (type === "Shopify") return "bg-emerald-100 text-emerald-700";
  return "bg-slate-200 text-slate-700";
}

function ViewToggleButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl px-3 py-1.5 text-sm font-medium transition",
        active ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      )}
    >
      {children}
    </button>
  );
}

export default function ProjectsPage() {
  const { getClientById } = useClients();
  const [viewMode, setViewMode] = useState(VIEW_MODES.TABLE);

  const projects = useMemo(() => {
    return projectRecords
      .map((project) => {
        const client = getClientById(project.clientId);

        return {
          ...project,
          clientName: client?.companyName || "Unknown Client",
        };
      })
      .sort((left, right) => new Date(left.deadline).getTime() - new Date(right.deadline).getTime());
  }, [getClientById]);

  const statusCounts = useMemo(() => {
    return {
      total: projects.length,
      pending: projects.filter((project) => project.status === "Pending").length,
      inProgress: projects.filter((project) => project.status === "In Progress").length,
      completed: projects.filter((project) => project.status === "Completed").length,
    };
  }, [projects]);

  const tableColumns = [
    { key: "projectName", label: "Project Name" },
    {
      key: "clientName",
      label: "Client",
      render: (_, row) => (
        <Link to={`/clients/${row.clientId}`} className="font-medium text-brand-700 hover:underline">
          {row.clientName}
        </Link>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", typeTone(value))}>{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusTone(value))}>{value}</span>,
    },
    { key: "deadline", label: "Deadline" },
    { key: "assignedTeamMember", label: "Assigned Team Member" },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Project Tracking</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Delivery Pipeline</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Track project delivery across teams with clear ownership, status, deadlines, and client linkage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ViewToggleButton active={viewMode === VIEW_MODES.TABLE} onClick={() => setViewMode(VIEW_MODES.TABLE)}>
              Table View
            </ViewToggleButton>
            <ViewToggleButton active={viewMode === VIEW_MODES.KANBAN} onClick={() => setViewMode(VIEW_MODES.KANBAN)}>
              Kanban View
            </ViewToggleButton>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Projects" value={statusCounts.total} tone="text-slate-900" />
          <SummaryCard label="Pending" value={statusCounts.pending} tone="text-amber-700" />
          <SummaryCard label="In Progress" value={statusCounts.inProgress} tone="text-sky-700" />
          <SummaryCard label="Completed" value={statusCounts.completed} tone="text-emerald-700" />
        </div>
      </section>

      {viewMode === VIEW_MODES.TABLE ? (
        <ContentCard title="Project Table" subtitle="Structured list with all tracking fields.">
          <DataTable columns={tableColumns} rows={projects} />
        </ContentCard>
      ) : (
        <section className="grid gap-4 xl:grid-cols-3">
          {KANBAN_COLUMNS.map((columnStatus) => {
            const columnProjects = projects.filter((project) => project.status === columnStatus);

            return (
              <ContentCard
                key={columnStatus}
                title={columnStatus}
                subtitle={`${columnProjects.length} project${columnProjects.length === 1 ? "" : "s"}`}
              >
                <div className="space-y-3">
                  {columnProjects.length === 0 ? (
                    <p className="text-sm text-slate-500">No projects in this lane.</p>
                  ) : (
                    columnProjects.map((project) => (
                      <article key={project.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{project.projectName}</h3>
                          <span className={cn("rounded-full px-2 py-1 text-[11px] font-semibold", statusTone(project.status))}>
                            {project.status}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-slate-500">
                          Client:{" "}
                          <Link to={`/clients/${project.clientId}`} className="font-medium text-brand-700 hover:underline">
                            {project.clientName}
                          </Link>
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <span className={cn("rounded-full px-2 py-1 text-[11px] font-semibold", typeTone(project.type))}>
                            {project.type}
                          </span>
                          <span className="rounded-full bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700">
                            Due {project.deadline}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-slate-600">Assigned: {project.assignedTeamMember}</p>
                      </article>
                    ))
                  )}
                </div>
              </ContentCard>
            );
          })}
        </section>
      )}
    </div>
  );
}

function SummaryCard({ label, value, tone }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn("mt-1 text-2xl font-semibold", tone)}>{value}</p>
    </article>
  );
}
