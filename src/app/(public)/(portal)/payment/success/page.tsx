"use client";

import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePaymentByTransaction } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { formatBDT, roleHome } from "@/lib/utils";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const SuccessInner = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  const params = useSearchParams();
  const transactionId = params.get("transactionId");
  const { data, refetch, isFetching } = usePaymentByTransaction(transactionId);
  const payment = data?.data;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="w-full rounded-3xl border border-line bg-card p-10">
        {payment?.status === "COMPLETED" ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">Payment successful 🎉</h1>
            <p className="mt-2 text-sm text-muted">{payment.type === "SLA_SUBSCRIPTION" ? t("pricing.sla.desc") : t("pricing.pass.desc")}</p>
            <p className="mt-1 text-xs text-muted">🧾 A receipt is in your email — the PDF attachment works as your invoice.</p>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-accent" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">{t("stripe.pending")}</h1>
            <p className="mt-2 text-sm text-muted">{t("pricing.note")}</p>
          </>
        )}

        {payment && (
          <div className="mt-6 space-y-2 rounded-2xl border border-line bg-surface p-5 text-sm">
            <div className="flex justify-between"><span className="text-muted">{t("th.transaction")}</span><span className="font-mono text-xs">{payment.transactionId}</span></div>
            <div className="flex justify-between"><span className="text-muted">{t("th.amount")}</span><span className="font-semibold">{formatBDT(payment.amountPaisa)}</span></div>
            <div className="flex justify-between"><span className="text-muted">{t("th.status")}</span><Badge tone={statusTone(payment.status)}>{payment.status}</Badge></div>
          </div>
        )}

        <div className="mt-7 flex justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => refetch()} loading={isFetching}>
            <RefreshCw className="h-3.5 w-3.5" /> {t("stripe.refresh")}
          </Button>
          <Link href={roleHome(user?.role)}>
            <Button size="sm">{t("nav.dashboard")}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
};

export default PaymentSuccessPage;