"use server";

import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { demoInvoices } from "@/lib/demo-data";

export async function listInvoices() {
  const session = await requireSession();
  try {
    const invoices = await prisma.invoice.findMany({
      where:
        session.user.role === "CLIENT"
          ? { project: { clientId: session.user.id } }
          : undefined,
      include: { project: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    });
    const mapped = invoices.map((inv) => ({
      id: inv.id,
      projectTitle: inv.project.title,
      amount: Number(inv.amount),
      currency: inv.currency,
      status: inv.status,
      dueDate: inv.dueDate?.toISOString().slice(0, 10) ?? null,
    }));
    return mapped.length > 0 ? mapped : demoInvoices;
  } catch {
    return demoInvoices;
  }
}

export async function createCheckoutSession(invoiceId: string) {
  const session = await requireSession();
  if (!isStripeConfigured()) {
    return { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env" };
  }
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { project: true },
  });
  if (!invoice) {
    return { error: "Invoice not found" };
  }
  if (session.user.role === "CLIENT" && invoice.project.clientId !== session.user.id) {
    return { error: "Unauthorized" };
  }
  const stripe = getStripe();
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.AUTH_URL}/workspace/billing?paid=1`,
    cancel_url: `${process.env.AUTH_URL}/workspace/billing?canceled=1`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: invoice.currency,
          unit_amount: Math.round(Number(invoice.amount) * 100),
          product_data: {
            name: `Invoice — ${invoice.project.title}`,
          },
        },
      },
    ],
    metadata: { invoiceId: invoice.id },
  });
  return { url: checkout.url };
}
