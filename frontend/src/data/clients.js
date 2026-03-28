export const initialClients = [
  {
    id: "client-1001",
    name: "Aarav Mehta",
    email: "aarav@northwindmedia.com",
    phone: "+1 (415) 555-0190",
    companyName: "Northwind Media",
    address: "201 Pine Street, San Francisco, CA 94104",
    notes: "Primary decision maker. Prefers weekly email updates every Friday.",
    projects: [
      { id: "pr-901", name: "Website Redesign", status: "In Progress", owner: "Maya Torres" },
      { id: "pr-902", name: "SEO Migration", status: "Planning", owner: "Lena Webb" },
    ],
    domains: [
      { id: "dm-801", domain: "northwindmedia.com", expiresOn: "2026-11-04", status: "Healthy" },
      { id: "dm-802", domain: "northwindstudio.io", expiresOn: "2026-06-18", status: "Monitor" },
    ],
    credentials: [
      { id: "cr-701", label: "WordPress Admin", type: "CMS", lastUpdated: "2026-03-10" },
      { id: "cr-702", label: "Cloudflare", type: "DNS", lastUpdated: "2026-02-28" },
    ],
    billing: [
      { id: "bl-601", invoiceId: "INV-2101", amount: "$4,800", dueDate: "2026-04-10", status: "Pending" },
      { id: "bl-602", invoiceId: "INV-2084", amount: "$3,250", dueDate: "2026-03-15", status: "Paid" },
    ],
    noteTimeline: [
      { id: "nt-501", author: "Maya Torres", date: "2026-03-26", text: "Client approved homepage direction." },
      { id: "nt-502", author: "Lena Webb", date: "2026-03-21", text: "Requested analytics dashboard in phase two." },
    ],
  },
  {
    id: "client-1002",
    name: "Sophia Bennett",
    email: "sophia@bluepeak.app",
    phone: "+1 (332) 555-0182",
    companyName: "Blue Peak",
    address: "55 Hudson Yards, New York, NY 10001",
    notes: "High-growth account. Prefers Slack for urgent communication.",
    projects: [
      { id: "pr-903", name: "API Security Hardening", status: "Review", owner: "Rohan Patel" },
      { id: "pr-904", name: "Billing Automation", status: "In Progress", owner: "Avery Stone" },
    ],
    domains: [
      { id: "dm-803", domain: "bluepeak.app", expiresOn: "2026-04-07", status: "Urgent" },
      { id: "dm-804", domain: "bluepeaklabs.com", expiresOn: "2027-01-14", status: "Healthy" },
    ],
    credentials: [
      { id: "cr-703", label: "Stripe API", type: "Payments", lastUpdated: "2026-03-01" },
      { id: "cr-704", label: "AWS Console", type: "Cloud", lastUpdated: "2026-03-18" },
    ],
    billing: [
      { id: "bl-603", invoiceId: "INV-2107", amount: "$6,900", dueDate: "2026-04-03", status: "Pending" },
      { id: "bl-604", invoiceId: "INV-2091", amount: "$5,100", dueDate: "2026-03-12", status: "Paid" },
    ],
    noteTimeline: [
      { id: "nt-503", author: "Rohan Patel", date: "2026-03-25", text: "Security review completed with no critical issues." },
      { id: "nt-504", author: "Avery Stone", date: "2026-03-20", text: "Requested custom invoice breakdown by service." },
    ],
  },
  {
    id: "client-1003",
    name: "Daniel Brooks",
    email: "daniel@evergreenlabs.io",
    phone: "+1 (206) 555-0135",
    companyName: "Evergreen Labs",
    address: "410 2nd Ave S, Seattle, WA 98104",
    notes: "Needs monthly domain and credential health report.",
    projects: [
      { id: "pr-905", name: "Multi-Tenant Migration", status: "Planning", owner: "Amelia Rice" },
    ],
    domains: [
      { id: "dm-805", domain: "evergreenlabs.io", expiresOn: "2027-01-22", status: "Healthy" },
    ],
    credentials: [
      { id: "cr-705", label: "GitHub Organization", type: "Development", lastUpdated: "2026-02-15" },
      { id: "cr-706", label: "SendGrid", type: "Email", lastUpdated: "2026-03-08" },
    ],
    billing: [
      { id: "bl-605", invoiceId: "INV-2103", amount: "$3,700", dueDate: "2026-04-12", status: "Pending" },
    ],
    noteTimeline: [
      { id: "nt-505", author: "Amelia Rice", date: "2026-03-24", text: "Kickoff meeting scheduled for next Monday." },
    ],
  },
  {
    id: "client-1004",
    name: "Emily Carter",
    email: "emily@westviewhealth.io",
    phone: "+1 (617) 555-0101",
    companyName: "Westview Health",
    address: "90 State Street, Boston, MA 02109",
    notes: "Compliance-sensitive account. Keep audit trails for all changes.",
    projects: [
      { id: "pr-906", name: "HIPAA Hosting Setup", status: "In Progress", owner: "Kai Morgan" },
      { id: "pr-907", name: "Patient Portal UX", status: "Planning", owner: "Maya Torres" },
    ],
    domains: [
      { id: "dm-806", domain: "westviewhealth.io", expiresOn: "2026-04-11", status: "Warning" },
      { id: "dm-807", domain: "westviewcare.org", expiresOn: "2026-09-01", status: "Healthy" },
    ],
    credentials: [
      { id: "cr-707", label: "Azure AD", type: "Identity", lastUpdated: "2026-03-11" },
      { id: "cr-708", label: "MongoDB Atlas", type: "Database", lastUpdated: "2026-03-02" },
    ],
    billing: [
      { id: "bl-606", invoiceId: "INV-2105", amount: "$7,450", dueDate: "2026-04-08", status: "Pending" },
      { id: "bl-607", invoiceId: "INV-2096", amount: "$6,300", dueDate: "2026-03-20", status: "Paid" },
    ],
    noteTimeline: [
      { id: "nt-506", author: "Kai Morgan", date: "2026-03-27", text: "Completed infrastructure security checklist." },
      { id: "nt-507", author: "Maya Torres", date: "2026-03-23", text: "Design review requested by product lead." },
    ],
  },
];
