import { api } from "@/lib/api";
import type { Payment } from "@/types";

export const checkoutSession = (input: {
  type: "PRIORITY_RESTORATION" | "SLA_SUBSCRIPTION";
  outageReportId?: string;
  provider?: "STRIPE" | "SSLCOMMERZ";
}) => api<{ url: string; transactionId: string }>("/payments/checkout-session", { method: "POST", body: input });

export const myPayments = (page = 1) =>
  api<Payment[]>(`/payments/my-payments?page=${page}&limit=10`);

export const adminPayments = (filters: { page?: number; limit?: number; status?: string; type?: string; sortBy?: string; sortOrder?: string } = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.status) params.set("status", filters.status);
  if (filters.type) params.set("type", filters.type);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  return api<Payment[]>(`/payments/all?${params.toString()}`);
};

export const paymentByTransaction = (transactionId: string) =>
  api<Payment>(`/payments/${transactionId}`);

export const refund = (transactionId: string) =>
  api<Payment>("/payments/refund", { method: "POST", body: { transactionId } });