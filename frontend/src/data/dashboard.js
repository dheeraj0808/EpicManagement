export const dashboardStats = [
  {
    label: "Total Clients",
    value: "128",
    hint: "+6 this month",
  },
  {
    label: "Active Projects",
    value: "42",
    hint: "11 launching soon",
  },
  {
    label: "Domains Active",
    value: "312",
    hint: "99.98% uptime",
  },
  {
    label: "Domains Expiring Soon",
    value: "8",
    hint: "within 30 days",
  },
  {
    label: "Total Credentials Stored",
    value: "94",
    hint: "vault synchronized",
  },
];

export const recentActivityLog = [
  {
    id: "ACT-1001",
    actor: "Maya Torres",
    action: "updated DNS records for",
    target: "northwindmedia.com",
    timestamp: "2 min ago",
    type: "domain",
  },
  {
    id: "ACT-1002",
    actor: "Rohan Patel",
    action: "added production credentials for",
    target: "Blue Peak API Gateway",
    timestamp: "16 min ago",
    type: "credential",
  },
  {
    id: "ACT-1003",
    actor: "Lena Webb",
    action: "created a new project",
    target: "Westview Mobile Refresh",
    timestamp: "39 min ago",
    type: "project",
  },
  {
    id: "ACT-1004",
    actor: "Avery Stone",
    action: "onboarded client",
    target: "Evergreen Labs",
    timestamp: "1 hr ago",
    type: "client",
  },
  {
    id: "ACT-1005",
    actor: "Kai Morgan",
    action: "resolved support task for",
    target: "SSL renewal on bluepeak.app",
    timestamp: "2 hr ago",
    type: "support",
  },
];

export const upcomingDomainExpiry = [
  {
    id: 1,
    domain: "bluepeak.app",
    owner: "Blue Peak",
    expiresOn: "2026-04-07",
    daysLeft: 10,
    status: "Urgent",
  },
  {
    id: 2,
    domain: "westviewhealth.io",
    owner: "Westview Health",
    expiresOn: "2026-04-11",
    daysLeft: 14,
    status: "Warning",
  },
  {
    id: 3,
    domain: "sunrisedata.net",
    owner: "Sunrise Data",
    expiresOn: "2026-04-20",
    daysLeft: 23,
    status: "Monitor",
  },
  {
    id: 4,
    domain: "northwindmedia.com",
    owner: "Northwind Media",
    expiresOn: "2026-04-25",
    daysLeft: 28,
    status: "Monitor",
  },
];

export const recentlyAddedClients = [
  {
    id: 1,
    name: "Nexa Retail Group",
    accountManager: "Maya Torres",
    onboardingDate: "2026-03-26",
    plan: "Growth",
  },
  {
    id: 2,
    name: "Pulse Healthcare",
    accountManager: "Lena Webb",
    onboardingDate: "2026-03-24",
    plan: "Enterprise",
  },
  {
    id: 3,
    name: "Driftwave Studio",
    accountManager: "Rohan Patel",
    onboardingDate: "2026-03-22",
    plan: "Starter",
  },
  {
    id: 4,
    name: "Atlas Commerce",
    accountManager: "Avery Stone",
    onboardingDate: "2026-03-20",
    plan: "Growth",
  },
];

export const quickActions = [
  {
    id: "QA-1",
    label: "Add Client",
    description: "Create a new client workspace and assign ownership.",
  },
  {
    id: "QA-2",
    label: "Add Domain",
    description: "Register a client domain and set renewal reminders.",
  },
  {
    id: "QA-3",
    label: "Add Credentials",
    description: "Store secure access details in the credentials vault.",
  },
];
