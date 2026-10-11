"use client";

import { format } from "date-fns";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useCheckout, useMyPayments, useRefund } from "@/hooks";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton, EmptyState } from "@/components/ui/misc";
import { formatBDT } from "@/lib/utils";

const PaymentsView = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyPayments(page);
  const checkout = useCheckout();
  const refund = useRefund();
  const refundInput = useRef<HTMLInputElement>(null);
  const isAdmin = user?.role === "ADMIN";

  const buySla = async () => {
    try {
      const res = await checkout.mutateAsync({ type: "SLA_SUBSCRIPTION" });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{t("dash.payments")}</h1>
        {user?.role === "CUSTOMER" && (
          <Button onClick={buySla} loading={checkout.isPending}>{t("pay.buySla")}</Button>
        )}
      </div>

      {isAdmin && (
        <div className="mt-6 rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold text-foreground">{t("dash.refund")}</p>
          <p className="mt-1 text-xs text-muted">Reverses the Stripe charge and undoes the side effects atomically (priority flag / SLA).</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Input ref={refundInput} placeholder="TXN-…" className="max-w-xs font-mono" aria-label={t("th.transaction")} />
            <Button
              variant="danger" size="md"
              loading={refund.isPending}
              onClick={async () => {
                const txn = refundInput.current?.value.trim();
                if (!txn) return toast.error("Enter a transaction ID");
                try { await refund.mutateAsync(txn); toast.success("Refunded + side effects reversed"); if (refundInput.current) refundInput.current.value = ""; }
                catch (err) { toast.error(err instanceof Error ? err.message : "Refund failed"); }
              }}
            >
              Refund
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6">
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : !data?.data?.length ? (
          <EmptyState title={t("c.empty")} />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-5 py-3.5">{t("th.transaction")}</th>
                  <th className="px-5 py-3.5">{t("th.type")}</th>
                  <th className="px-5 py-3.5">{t("th.amount")}</th>
                  <th className="px-5 py-3.5">{t("th.status")}</th>
                  <th className="px-5 py-3.5">{t("th.date")}</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((p) => (
                  <tr key={p.id} className="border-b border-line/60 last:border-0 hover:bg-surface/50">
                    <td className="px-5 py-3.5 font-mono text-xs">{p.transactionId}</td>
                    <td className="px-5 py-3.5 text-foreground">{p.type === "SLA_SUBSCRIPTION" ? "SLA (30d)" : "Priority pass"}</td>
                    <td className="px-5 py-3.5 font-semibold text-foreground">{formatBDT(p.amountPaisa)}</td>
                    <td className="px-5 py-3.5"><Badge tone={statusTone(p.status)}>{p.status}</Badge></td>
                    <td className="px-5 py-3.5 text-muted">{format(new Date(p.createdAt), "d MMM, HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>←</Button>
          <span className="text-muted">{page} / {data.meta.totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= data.meta.totalPages} onClick={() => setPage(page + 1)}>→</Button>
        </div>
      )}
    </div>
  );
};

export default PaymentsView;