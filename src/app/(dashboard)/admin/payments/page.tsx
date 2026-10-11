"use client";

import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { adminPayments, refund } from "@/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton, EmptyState } from "@/components/ui/misc";
import { formatBDT } from "@/lib/utils";
import type { Payment } from "@/types";

const AdminPaymentsPage = () => {
  const { t } = useI18n();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [confirmRefund, setConfirmRefund] = useState<Payment | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments", page, status, type],
    queryFn: () => adminPayments({ page, status: status || undefined, type: type || undefined, limit: 20 }),
  });

  const refundMutation = useMutation({
    mutationFn: (transactionId: string) => refund(transactionId),
    onSuccess: () => {
      toast.success("Payment refunded successfully");
      qc.invalidateQueries({ queryKey: ["admin-payments"] });
      setConfirmRefund(null);
      setSelectedPayment(null);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Refund failed");
    },
  });

  const payments = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted">{meta ? `${meta.total} total transactions` : ""}</p>
      </div>

      <div className="rounded-2xl border border-line bg-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="w-40" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="REFUNDED">Refunded</option>
          </Select>
          <Select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="w-48" aria-label="Filter by type">
            <option value="">All types</option>
            <option value="SLA_SUBSCRIPTION">SLA Subscription</option>
            <option value="PRIORITY_RESTORATION">Priority Restoration</option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        {isLoading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : payments.length === 0 ? (
          <EmptyState title={t("c.empty")} />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0 hover:bg-surface/50">
                  <td className="px-5 py-3.5 font-mono text-xs">{p.transactionId}</td>
                  <td className="px-5 py-3.5 text-foreground">{(p as any).user?.name ?? "—"}</td>
                  <td className="px-5 py-3.5 text-foreground">{p.type === "SLA_SUBSCRIPTION" ? "SLA (30d)" : "Priority"}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedPayment(p)}>
                        Details
                      </Button>
                      {p.status === "COMPLETED" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-600 hover:text-amber-700"
                          onClick={() => setConfirmRefund(p)}
                        >
                          Refund
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            ←
          </Button>
          <span className="text-muted">
            {page} / {meta.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>
            →
          </Button>
        </div>
      )}

      {/* Details Modal */}
      <Modal open={Boolean(selectedPayment)} onClose={() => setSelectedPayment(null)} title="Payment Details">
        {selectedPayment && (
          <div className="max-h-96 space-y-3 overflow-y-auto">
            <div className="rounded-lg border border-line bg-surface p-3">
              <p className="text-xs uppercase tracking-wider text-muted">Transaction ID</p>
              <p className="mt-2 break-all font-mono text-sm font-semibold text-foreground">{selectedPayment.transactionId}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface p-3">
                <p className="text-xs uppercase tracking-wider text-muted">Amount</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{formatBDT(selectedPayment.amountPaisa)}</p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <p className="text-xs uppercase tracking-wider text-muted">Type</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {selectedPayment.type === "SLA_SUBSCRIPTION" ? "SLA Subscription" : "Priority Restoration"}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <p className="text-xs uppercase tracking-wider text-muted">Status</p>
                <p className="mt-2">
                  <Badge tone={statusTone(selectedPayment.status)}>{selectedPayment.status}</Badge>
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-3">
                <p className="text-xs uppercase tracking-wider text-muted">Created</p>
                <p className="mt-2 text-sm text-foreground">{format(new Date(selectedPayment.createdAt), "d MMM yyyy, HH:mm")}</p>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-surface p-3">
              <p className="text-xs uppercase tracking-wider text-muted">Customer</p>
              <p className="mt-2 break-all text-sm font-semibold text-foreground">{(selectedPayment as any).user?.name ?? "—"}</p>
              <p className="mt-1 break-all text-xs text-muted">{(selectedPayment as any).user?.email ?? ""}</p>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedPayment(null)}>
                Close
              </Button>
              {selectedPayment.status === "COMPLETED" && (
                <Button
                  variant="outline"
                  className="text-amber-600 hover:text-amber-700"
                  size="sm"
                  onClick={() => {
                    setSelectedPayment(null);
                    setConfirmRefund(selectedPayment);
                  }}
                >
                  Refund Payment
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Refund Confirmation Modal */}
      <Modal open={Boolean(confirmRefund)} onClose={() => setConfirmRefund(null)} title="Confirm Refund">
        {confirmRefund && (
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm text-muted">
                Refund <span className="font-semibold text-foreground">{formatBDT(confirmRefund.amountPaisa)}</span> to{" "}
                <span className="font-semibold text-foreground">{(confirmRefund as any).user?.name}</span>?
              </p>
              <p className="mt-3 text-xs text-muted">This action will reverse the charge and undo side effects (priority flag / SLA status).</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmRefund(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                loading={refundMutation.isPending}
                onClick={() => {
                  refundMutation.mutate(confirmRefund.transactionId);
                }}
              >
                Confirm Refund
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPaymentsPage;
