import { formatCurrency } from "../utils/formatters";

export const dashboardMetrics = [
  { label: "Active Clients", value: "128", hint: "+9 this month" },
  { label: "Running Projects", value: "42", hint: "7 due this week" },
  { label: "Domains Managed", value: "312", hint: "99.98% uptime" },
  { label: "Monthly Revenue", value: formatCurrency(98650), hint: "+12.4% growth" },
];

export const activeProjects = [
  {
    project: "Atlas CRM Redesign",
    client: "Northwind Media",
    owner: "Maya Torres",
    status: "In Progress",
  },
  {
    project: "API Security Hardening",
    client: "Blue Peak",
    owner: "Rohan Patel",
    status: "Review",
  },
  {
    project: "Multi-Tenant Migration",
    client: "Evergreen Labs",
    owner: "Amelia Rice",
    status: "Planned",
  },
];

export const recentTickets = [
  {
    id: "SUP-3021",
    subject: "Reset domain SSL certificate",
    priority: "High",
    owner: "Avery Stone",
  },
  {
    id: "SUP-3018",
    subject: "New billing contact request",
    priority: "Normal",
    owner: "Lena Webb",
  },
  {
    id: "SUP-3012",
    subject: "Project handoff checklist",
    priority: "Low",
    owner: "Kai Morgan",
  },
];
