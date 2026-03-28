import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { useClients } from "../context/ClientsContext";
import { credentialRecords } from "../data/credentials";
import { cn } from "../utils/classNames";

const ALL_PLATFORMS = "All";
const PLATFORM_OPTIONS = [ALL_PLATFORMS, "WordPress", "Shopify", "App", "Hosting"];

function platformTone(platform) {
  if (platform === "WordPress") return "bg-sky-100 text-sky-700";
  if (platform === "Shopify") return "bg-emerald-100 text-emerald-700";
  if (platform === "Hosting") return "bg-amber-100 text-amber-700";
  return "bg-violet-100 text-violet-700";
}

function tagTone(tag) {
  if (tag === "WP") return "bg-sky-100 text-sky-700";
  if (tag === "Shopify") return "bg-emerald-100 text-emerald-700";
  if (tag === "Hosting") return "bg-amber-100 text-amber-700";
  return "bg-violet-100 text-violet-700";
}

function maskPassword(password) {
  return "*".repeat(Math.max(password.length, 10));
}

async function copyTextToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function CredentialsPage() {
  const { getClientById } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState(ALL_PLATFORMS);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedCredentialId, setCopiedCredentialId] = useState(null);

  const enrichedCredentials = useMemo(() => {
    return credentialRecords.map((credential) => {
      const client = getClientById(credential.linkedClientId);

      return {
        ...credential,
        clientName: client?.companyName || "Unknown Client",
      };
    });
  }, [getClientById]);

  const filteredCredentials = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return enrichedCredentials.filter((credential) => {
      const matchesPlatform = platformFilter === ALL_PLATFORMS || credential.platform === platformFilter;

      if (!matchesPlatform) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = [
        credential.platform,
        credential.websiteUrl,
        credential.username,
        credential.notes,
        credential.clientName,
        credential.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [enrichedCredentials, platformFilter, searchTerm]);

  const summary = useMemo(() => {
    const clientsLinked = new Set(enrichedCredentials.map((credential) => credential.linkedClientId)).size;
    const platformCount = new Set(enrichedCredentials.map((credential) => credential.platform)).size;

    return {
      total: enrichedCredentials.length,
      clientsLinked,
      platformCount,
      filtered: filteredCredentials.length,
    };
  }, [enrichedCredentials, filteredCredentials.length]);

  const togglePasswordVisibility = (credentialId) => {
    setVisiblePasswords((previous) => ({
      ...previous,
      [credentialId]: !previous[credentialId],
    }));
  };

  const copyPassword = async (credentialId, password) => {
    try {
      await copyTextToClipboard(password);
      setCopiedCredentialId(credentialId);

      window.setTimeout(() => {
        setCopiedCredentialId((current) => (current === credentialId ? null : current));
      }, 1300);
    } catch {
      setCopiedCredentialId(null);
    }
  };

  const tableColumns = [
    {
      key: "platform",
      label: "Platform",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", platformTone(value))}>{value}</span>,
    },
    {
      key: "websiteUrl",
      label: "Website URL",
      render: (value) => (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-700 hover:underline"
        >
          {value.replace(/^https?:\/\//, "")}
        </a>
      ),
    },
    { key: "username", label: "Username" },
    {
      key: "password",
      label: "Password",
      render: (value, row) => {
        const visible = Boolean(visiblePasswords[row.id]);

        return (
          <div className="flex items-center gap-2">
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{visible ? value : maskPassword(value)}</code>
            <button
              type="button"
              onClick={() => togglePasswordVisibility(row.id)}
              className="rounded border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              {visible ? "Hide" : "Show"}
            </button>
          </div>
        );
      },
    },
    {
      key: "tags",
      label: "Tags",
      render: (tags) => (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className={cn("rounded-full px-2 py-1 text-xs font-semibold", tagTone(tag))}>
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "linkedClientId",
      label: "Linked Client",
      render: (value, row) => (
        <Link to={`/clients/${value}`} className="font-medium text-brand-700 hover:underline">
          {row.clientName}
        </Link>
      ),
    },
    {
      key: "notes",
      label: "Notes",
      render: (value) => <span className="line-clamp-2 max-w-[240px] text-slate-600">{value}</span>,
    },
    {
      key: "copy",
      label: "Copy",
      render: (_, row) => (
        <button
          type="button"
          onClick={() => copyPassword(row.id, row.password)}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-xs font-medium",
            copiedCredentialId === row.id
              ? "border-emerald-300 bg-emerald-100 text-emerald-700"
              : "border-slate-200 text-slate-600 hover:bg-slate-100",
          )}
        >
          {copiedCredentialId === row.id ? "Copied" : "Copy"}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Secure Vault</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Credentials Management</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Password manager dashboard for platform access, linked clients, and account metadata.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Vault Entries" value={summary.total} tone="text-slate-900" />
          <SummaryCard label="Platforms" value={summary.platformCount} tone="text-violet-700" />
          <SummaryCard label="Linked Clients" value={summary.clientsLinked} tone="text-sky-700" />
          <SummaryCard label="Filtered Results" value={summary.filtered} tone="text-emerald-700" />
        </div>
      </section>

      <ContentCard title="Search & Filter" subtitle="Find credentials quickly by platform, URL, username, tag, or client.">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search credentials..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Platform</span>
            <select
              value={platformFilter}
              onChange={(event) => setPlatformFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              {PLATFORM_OPTIONS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>
        </div>
      </ContentCard>

      <ContentCard title="Credential Vault" subtitle="Passwords are hidden by default. Reveal only when needed.">
        <DataTable columns={tableColumns} rows={filteredCredentials} />
      </ContentCard>
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
