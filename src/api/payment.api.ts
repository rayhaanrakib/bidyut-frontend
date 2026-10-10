import { api } from "@/lib/api";
import type { Payment } from "@/types";

export const checkoutSession = (input: {
  type: "PRIORITY_RESTORATION" | "SLA_SUBSCRIPTION";
  outageReportId?: string;
  provider?: "STRIPE" | "SSLCOMMERZ";
}) => api<{ url: string; transactionId: string }>("/payments/checkout-session", { method: "POST", body: input });

export const myPayments = (page = 1) =>
  api<Payment[]>(`/payments/my-payments?page=${page}&limit=10`);

export const paymentByTransaction = (transactionId: string) =>
  api<Payment>(`/payments/${transactionId}`);

export const refund = (transactionId: string) =>
  api<Payment>("/payments/refund", { method: "POST", body: { transactionId } });