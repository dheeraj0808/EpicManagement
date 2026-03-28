import { useEffect, useState } from "react";
import { ROLES } from "../../context/RoleContext";
import { cn } from "../../utils/classNames";

const EMPTY_FORM = {
  name: "",
  email: "",
  role: ROLES.ADMIN,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserFormModal({ open, mode, initialValues, onClose, onSubmit }) {
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      return;
    }

    setFormValues(initialValues ? { ...EMPTY_FORM, ...initialValues } : EMPTY_FORM);
    setErrors({});
  }, [initialValues, open]);

  if (!open) {
    return null;
  }

  const title = mode === "edit" ? "Edit User" : "Add User";
  const submitLabel = mode === "edit" ? "Save Changes" : "Create User";

  const handleChange = (field, value) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formValues.email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    if (![ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(formValues.role)) {
      nextErrors.role = "Select a valid role";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/45" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">Create and update user access permissions.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            label="Name"
            value={formValues.name}
            error={errors.name}
            onChange={(value) => handleChange("name", value)}
          />

          <Field
            label="Email"
            type="email"
            value={formValues.email}
            error={errors.email}
            onChange={(value) => handleChange("email", value)}
          />

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Role</span>
            <select
              value={formValues.role}
              onChange={(event) => handleChange("role", event.target.value)}
              className={cn(
                "w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition",
                errors.role
                  ? "border-rose-300 ring-2 ring-rose-100"
                  : "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
              )}
            >
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
            </select>
            {errors.role ? <span className="mt-1 block text-xs text-rose-600">{errors.role}</span> : null}
          </label>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", error }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "w-full rounded-xl border px-3 py-2 text-sm text-slate-900 outline-none transition",
          error
            ? "border-rose-300 ring-2 ring-rose-100"
            : "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
        )}
      />
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
