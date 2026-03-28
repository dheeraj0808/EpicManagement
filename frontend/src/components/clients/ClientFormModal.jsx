import { useEffect, useState } from "react";
import { cn } from "../../utils/classNames";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  address: "",
  notes: "",
};

export default function ClientFormModal({ open, mode, initialValues, onClose, onSubmit }) {
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

  const handleChange = (field, value) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) nextErrors.name = "Name is required";
    if (!formValues.email.trim()) nextErrors.email = "Email is required";
    if (!formValues.phone.trim()) nextErrors.phone = "Phone is required";
    if (!formValues.companyName.trim()) nextErrors.companyName = "Company Name is required";
    if (!formValues.address.trim()) nextErrors.address = "Address is required";

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
      phone: formValues.phone.trim(),
      companyName: formValues.companyName.trim(),
      address: formValues.address.trim(),
      notes: formValues.notes.trim(),
    });
  };

  const title = mode === "edit" ? "Edit Client" : "Add Client";
  const submitLabel = mode === "edit" ? "Save Changes" : "Create Client";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/45" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">Manage core client profile information.</p>
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
          <div className="grid gap-4 md:grid-cols-2">
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
            <Field
              label="Phone"
              value={formValues.phone}
              error={errors.phone}
              onChange={(value) => handleChange("phone", value)}
            />
            <Field
              label="Company Name"
              value={formValues.companyName}
              error={errors.companyName}
              onChange={(value) => handleChange("companyName", value)}
            />
          </div>

          <Field
            label="Address"
            value={formValues.address}
            error={errors.address}
            onChange={(value) => handleChange("address", value)}
          />

          <Field
            label="Notes"
            type="textarea"
            value={formValues.notes}
            error={errors.notes}
            onChange={(value) => handleChange("notes", value)}
          />

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
  if (type === "textarea") {
    return (
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
        <textarea
          rows={4}
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
