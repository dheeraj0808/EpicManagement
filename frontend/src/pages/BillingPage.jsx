import { useMemo } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import DataTable from "../components/DataTable";
import { useClients } from "../context/ClientsContext";
import { invoiceRecords } from "../data/billing";
import { cn } from "../utils/classNames";
import { formatCurrency } from "../utils/formatters";

function statusTone(status) {
  if (status === "Paid") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-amber-100 text-amber-700";
}

export default function BillingPage() {
  const { getClientById } = useClients();

  const invoices = useMemo(() => {
    return invoiceRecords
      .map((invoice) => {
        const client = getClientById(invoice.clientId);

        return {
          ...invoice,
          clientName: client?.companyName || "Unknown Client",
        };
      })
      .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime());
  }, [getClientById]);

  const summary = useMemo(() => {
    const paidCount = invoices.filter((invoice) => invoice.status === "Paid").length;
    const pendingCount = invoices.filter((invoice) => invoice.status === "Pending").length;
    const totalAmount = invoices.reduce((accumulator, invoice) => accumulator + invoice.amount, 0);

    return {
      totalInvoices: invoices.length,
      paidCount,
      pendingCount,
      totalAmount,
    };
  }, [invoices]);

  const billingHistoryByClient = useMemo(() => {
    const grouped = new Map();

    invoices.forEach((invoice) => {
      if (!grouped.has(invoice.clientId)) {
        grouped.set(invoice.clientId, {
          clientId: invoice.clientId,
          clientName: invoice.clientName,
          invoices: [],
          paidAmount: 0,
          pendingAmount: 0,
        });
      }

      const group = grouped.get(invoice.clientId);
      group.invoices.push(invoice);

      if (invoice.status === "Paid") {
        group.paidAmount += invoice.amount;
      } else {
        group.pendingAmount += invoice.amount;
      }
    });

    return Array.from(grouped.values()).sort((left, right) => left.clientName.localeCompare(right.clientName));
  }, [invoices]);

  const invoiceColumns = [
    { key: "invoiceId", label: "Invoice ID" },
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
      key: "amount",
      label: "Amount",
      render: (value) => <span className="font-semibold text-slate-900">{formatCurrency(value)}</span>,
    },
    { key: "dueDate", label: "Due Date" },
    {
      key: "status",
      label: "Status",
      render: (value) => <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusTone(value))}>{value}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl2 border border-slate-200 bg-white/90 p-5 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Billing Module</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Invoice & Payment Tracking</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Monitor invoice status, due dates, and client-level billing history in one place.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Invoices" value={summary.totalInvoices} tone="text-slate-900" />
          <SummaryCard label="Paid" value={summary.paidCount} tone="text-emerald-700" />
          <SummaryCard label="Pending" value={summary.pendingCount} tone="text-amber-700" />
          <SummaryCard label="Total Amount" value={formatCurrency(summary.totalAmount)} tone="text-sky-700" />
        </div>
      </section>

      <ContentCard title="Invoice List" subtitle="All invoices with payment status.">
        <DataTable columns={invoiceColumns} rows={invoices} />
      </ContentCard>

      <ContentCard title="Client Billing History" subtitle="Grouped payment history by client.">
        <div className="grid gap-4 lg:grid-cols-2">
          {billingHistoryByClient.map((clientGroup) => (
            <article key={clientGroup.clientId} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link to={`/clients/${clientGroup.clientId}`} className="text-sm font-semibold text-brand-700 hover:underline">
                    {clientGroup.clientName}
                  </Link>
                  <p className="mt-1 text-xs text-slate-500">{clientGroup.invoices.length} invoices</p>
                </div>

                <div className="text-right text-xs">
                  <p className="font-medium text-emerald-700">Paid: {formatCurrency(clientGroup.paidAmount)}</p>
                  <p className="font-medium text-amber-700">Pending: {formatCurrency(clientGroup.pendingAmount)}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {clientGroup.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{invoice.invoiceId}</p>
                      <p className="text-slate-500">Due {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{formatCurrency(invoice.amount)}</p>
                      <span className={cn("mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold", statusTone(invoice.status))}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
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
