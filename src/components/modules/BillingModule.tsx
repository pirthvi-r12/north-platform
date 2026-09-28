"use client";

import { useEffect, useState, useTransition } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { createCheckoutSession, listInvoices } from "@/app/actions/invoices";

type InvoiceRow = Awaited<ReturnType<typeof listInvoices>>[number];

export function BillingModule() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    listInvoices().then(setInvoices);
  }, []);

  function pay(invoiceId: string) {
    startTransition(async () => {
      const result = await createCheckoutSession(invoiceId);
      if ("url" in result && result.url) {
        window.location.href = result.url;
      } else {
        alert(result.error ?? "Unable to start checkout");
      }
    });
  }

  return (
    <div>
      <PageHeader
        index="06"
        title="Billing & Invoices"
        emphasis="settled."
        description="Stripe-connected invoice tracking with live status and instant checkout."
      />
      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/50">
        <table className="min-w-full text-sm">
          <thead className="bg-soft-pearl/80 text-left text-xs uppercase tracking-wider text-warm-sand">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-black/8">
                <td className="px-4 py-3 font-medium">{inv.projectTitle}</td>
                <td className="px-4 py-3">${inv.amount.toLocaleString()}</td>
                <td className="px-4 py-3">{inv.dueDate ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      inv.status === "PAID"
                        ? "bg-emerald-100 text-emerald-800"
                        : inv.status === "OVERDUE"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {inv.status !== "PAID" ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => pay(inv.id)}
                      className="rounded-lg bg-deep-red px-3 py-1.5 text-xs font-semibold text-soft-pearl"
                    >
                      Pay now
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
