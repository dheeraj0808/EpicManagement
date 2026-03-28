import { formatCurrency } from "../utils/formatters";

export const pageContent = {
  clients: {
    description: "Track account health and upcoming conversations.",
    stats: [
      { label: "Total Clients", value: "128", hint: "17 enterprise" },
      { label: "Renewals Soon", value: "11", hint: "within 30 days" },
      { label: "Avg NPS", value: "62", hint: "+3 since last quarter" },
    ],
    tableTitle: "Client Snapshot",
    columns: [
      { key: "name", label: "Name" },
      { key: "segment", label: "Segment" },
      { key: "owner", label: "Owner" },
      { key: "health", label: "Health" },
    ],
    rows: [
      { id: 1, name: "Northwind Media", segment: "Enterprise", owner: "Maya", health: "Strong" },
      { id: 2, name: "Blue Peak", segment: "Growth", owner: "Rohan", health: "Watch" },
      { id: 3, name: "Westview Health", segment: "SMB", owner: "Lena", health: "Strong" },
    ],
  },
  domains: {
    description: "Overview of ownership, expiry windows, and DNS status.",
    stats: [
      { label: "Domains", value: "312", hint: "across 49 clients" },
      { label: "Expiring Soon", value: "8", hint: "next 45 days" },
      { label: "DNS Errors", value: "2", hint: "needs validation" },
    ],
    tableTitle: "Domain Inventory",
    columns: [
      { key: "domain", label: "Domain" },
      { key: "registrar", label: "Registrar" },
      { key: "expires", label: "Expires" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { id: 1, domain: "northwindmedia.com", registrar: "Namecheap", expires: "2026-08-16", status: "Healthy" },
      { id: 2, domain: "bluepeak.app", registrar: "Cloudflare", expires: "2026-05-03", status: "Renew" },
      { id: 3, domain: "evergreenlabs.io", registrar: "GoDaddy", expires: "2027-01-22", status: "Healthy" },
    ],
  },
  credentials: {
    description: "Shared access matrix for infrastructure and third-party tools.",
    stats: [
      { label: "Stored Secrets", value: "94", hint: "vault synced" },
      { label: "Rotations Due", value: "6", hint: "within 14 days" },
      { label: "MFA Coverage", value: "97%", hint: "target is 100%" },
    ],
    tableTitle: "Credential Audit",
    columns: [
      { key: "service", label: "Service" },
      { key: "environment", label: "Environment" },
      { key: "lastRotated", label: "Last Rotated" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { id: 1, service: "AWS Root", environment: "Production", lastRotated: "2025-12-14", owner: "Security" },
      { id: 2, service: "Stripe API", environment: "Production", lastRotated: "2025-11-09", owner: "Billing" },
      { id: 3, service: "SendGrid", environment: "Staging", lastRotated: "2026-01-19", owner: "Platform" },
    ],
  },
  projects: {
    description: "Delivery pipeline with owner accountability and milestones.",
    stats: [
      { label: "Open Projects", value: "42", hint: "9 onboarding" },
      { label: "At Risk", value: "4", hint: "need escalation" },
      { label: "On-Time Rate", value: "91%", hint: "+2% vs last month" },
    ],
    tableTitle: "Project Pipeline",
    columns: [
      { key: "project", label: "Project" },
      { key: "stage", label: "Stage" },
      { key: "owner", label: "Owner" },
      { key: "eta", label: "ETA" },
    ],
    rows: [
      { id: 1, project: "Atlas CRM Redesign", stage: "Build", owner: "Maya", eta: "Apr 12" },
      { id: 2, project: "Billing Revamp", stage: "Review", owner: "Lena", eta: "Apr 20" },
      { id: 3, project: "Data Lake Setup", stage: "Discovery", owner: "Rohan", eta: "May 05" },
    ],
  },
  billing: {
    description: "Invoice flow, outstanding balances, and payment confidence.",
    stats: [
      { label: "Monthly Billed", value: formatCurrency(124000), hint: "+7.6% this month" },
      { label: "Outstanding", value: formatCurrency(18250), hint: "4 invoices pending" },
      { label: "Collection Rate", value: "96%", hint: "healthy trend" },
    ],
    tableTitle: "Invoice Queue",
    columns: [
      { key: "invoice", label: "Invoice" },
      { key: "client", label: "Client" },
      { key: "amount", label: "Amount" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { id: 1, invoice: "INV-1044", client: "Northwind Media", amount: formatCurrency(8600), status: "Paid" },
      { id: 2, invoice: "INV-1045", client: "Blue Peak", amount: formatCurrency(4250), status: "Pending" },
      { id: 3, invoice: "INV-1046", client: "Evergreen Labs", amount: formatCurrency(6300), status: "Pending" },
    ],
  },
  support: {
    description: "Monitor support queue, response quality, and SLA pressure.",
    stats: [
      { label: "Open Tickets", value: "26", hint: "5 high priority" },
      { label: "Avg Response", value: "24m", hint: "target under 30m" },
      { label: "SLA Breaches", value: "1", hint: "this week" },
    ],
    tableTitle: "Latest Tickets",
    columns: [
      { key: "ticket", label: "Ticket" },
      { key: "topic", label: "Topic" },
      { key: "priority", label: "Priority" },
      { key: "assignee", label: "Assignee" },
    ],
    rows: [
      { id: 1, ticket: "SUP-3021", topic: "SSL renewal issue", priority: "High", assignee: "Avery" },
      { id: 2, ticket: "SUP-3018", topic: "Billing contact update", priority: "Normal", assignee: "Lena" },
      { id: 3, ticket: "SUP-3012", topic: "Domain transfer help", priority: "Low", assignee: "Kai" },
    ],
  },
  settings: {
    description: "Control workspace defaults and team-level preferences.",
    stats: [
      { label: "Team Members", value: "23", hint: "6 admins" },
      { label: "2FA Enabled", value: "21", hint: "2 pending" },
      { label: "Audit Logs", value: "1,204", hint: "last 30 days" },
    ],
    tableTitle: "Recent Setting Changes",
    columns: [
      { key: "setting", label: "Setting" },
      { key: "value", label: "Value" },
      { key: "changedBy", label: "Changed By" },
      { key: "updatedAt", label: "Updated" },
    ],
    rows: [
      { id: 1, setting: "Session Timeout", value: "45 minutes", changedBy: "Admin", updatedAt: "Mar 27" },
      { id: 2, setting: "Password Policy", value: "Strong", changedBy: "Security", updatedAt: "Mar 26" },
      { id: 3, setting: "Default Currency", value: "USD", changedBy: "Finance", updatedAt: "Mar 25" },
    ],
  },
};
