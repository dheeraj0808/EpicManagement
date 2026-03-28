import { useState } from "react";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { cn } from "../utils/classNames";

const INITIAL_USERS = [
  { id: "user-001", name: "Maya Torres", email: "maya@epicmanagement.com", role: "Admin", status: "Active" },
  { id: "user-002", name: "Lena Webb", email: "lena@epicmanagement.com", role: "Admin", status: "Active" },
  { id: "user-003", name: "Rohan Patel", email: "rohan@epicmanagement.com", role: "Admin", status: "Active" },
  {
    id: "user-004",
    name: "Priya Sharma",
    email: "priya@epicmanagement.com",
    role: "Super Admin",
    status: "Active",
  },
];

function roleTone(role) {
  return role === "Super Admin" ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700";
}

export default function UserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);

  const removeUser = (userId) => {
    setUsers((previousUsers) => previousUsers.filter((user) => user.id !== userId));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", roleTone(value))}>{value}</span>,
    },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <button
          type="button"
          onClick={() => removeUser(row.id)}
          className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
        >
          Remove User
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Super Admin</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">User Management</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Manage workspace access and administrative permissions.
        </p>
      </section>

      <ContentCard title="Workspace Users" subtitle="Super Admin only controls for managing users.">
        <DataTable columns={columns} rows={users} />
      </ContentCard>
    </div>
  );
}
