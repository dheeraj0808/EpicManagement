import { useMemo, useState } from "react";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import DeleteUserModal from "../components/users/DeleteUserModal";
import UserFormModal from "../components/users/UserFormModal";
import { ROLES, useRole } from "../context/RoleContext";
import { initialUsers } from "../data/users";
import { cn } from "../utils/classNames";

const ALL_ROLES = "all";

function roleTone(role) {
  return role === ROLES.SUPER_ADMIN ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700";
}

export default function UserManagementPage() {
  const { canManageUsers } = useRole();
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(ALL_ROLES);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesRole = roleFilter === ALL_ROLES || user.role === roleFilter;

      if (!normalizedSearch) {
        return matchesRole;
      }

      const haystack = [user.name, user.email, user.role].join(" ").toLowerCase();
      return matchesRole && haystack.includes(normalizedSearch);
    });
  }, [roleFilter, searchTerm, users]);

  const openAddUserModal = () => {
    setSelectedUser(null);
    setFormMode("add");
    setFormOpen(true);
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setFormMode("edit");
    setFormOpen(true);
  };

  const closeUserFormModal = () => {
    setFormOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = (userPayload) => {
    if (formMode === "edit" && selectedUser) {
      setUsers((previousUsers) =>
        previousUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...userPayload } : user)),
      );
    } else {
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          id: `user-${Date.now()}`,
          ...userPayload,
        },
      ]);
    }

    closeUserFormModal();
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) {
      return;
    }

    setUsers((previousUsers) => previousUsers.filter((user) => user.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", roleTone(value))}>{value}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openEditUserModal(row)}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setUserToDelete(row)}
            className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (!canManageUsers) {
    return (
      <ContentCard title="Access Restricted" subtitle="Only Super Admin users can access user management controls.">
        <p className="text-sm text-slate-600">Switch back to Super Admin to manage users and roles.</p>
      </ContentCard>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Super Admin</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">User Management</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Manage workspace access and administrative permissions.
        </p>
      </section>

      <ContentCard title="Search & Filter" subtitle="Find users quickly and filter by role.">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, or role"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Role</span>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value={ALL_ROLES}>All Roles</option>
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
            </select>
          </label>
        </div>
      </ContentCard>

      <ContentCard title="Workspace Users" subtitle="Super Admin only controls for managing users.">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {filteredUsers.length} user{filteredUsers.length === 1 ? "" : "s"} shown
          </p>
          <button
            type="button"
            onClick={openAddUserModal}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Add User
          </button>
        </div>

        <DataTable columns={columns} rows={filteredUsers} />
      </ContentCard>

      <UserFormModal
        open={formOpen}
        mode={formMode}
        initialValues={selectedUser}
        onClose={closeUserFormModal}
        onSubmit={handleFormSubmit}
      />

      <DeleteUserModal
        open={Boolean(userToDelete)}
        userName={userToDelete?.name}
        onCancel={() => setUserToDelete(null)}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
