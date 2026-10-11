
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, RefreshCw, XCircle } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePaymentByTransaction } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { formatBDT, roleHome } from "@/lib/utils";

export const SuccessInner = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  const params = useSearchParams();
  const transactionId = params.get("transactionId");

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = usePaymentByTransaction(transactionId);

  const payment = data?.data;

  const isCompleted = payment?.status === "COMPLETED";
  const isPending = payment?.status === "PENDING";
  const hasError = isError || (!isLoading && !payment);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="w-full rounded-3xl border border-line bg-card p-10">
        {isLoading ? (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-accent" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
              {t("stripe.pending")}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Checking your payment status...
            </p>
          </>
        ) : isCompleted ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
              Payment successful 🎉
            </h1>
            <p className="mt-2 text-sm text-muted">
              {payment.type === "SLA_SUBSCRIPTION"
                ? t("pricing.sla.desc")
                : t("pricing.pass.desc")}
            </p>
            <p className="mt-1 text-xs text-muted">
              A receipt will be sent to your email with a PDF attachment.
            </p>
          </>
        ) : hasError ? (
          <>
            <XCircle className="mx-auto h-16 w-16 text-danger" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
              Unable to verify payment
            </h1>
            <p className="mt-2 text-sm text-muted">
              We couldn't retrieve your payment details. Your payment may still
              have been processed. Refresh or check your payment history before
              trying to pay again.
            </p>
          </>
        ) : isPending ? (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-accent" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
              Payment is being processed
            </h1>
            <p className="mt-2 text-sm text-muted">
              Your payment is awaiting confirmation from Stripe. Refresh this
              page to check the latest status.
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-danger" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
              Payment status: {payment?.status ?? "Unknown"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Your payment is not marked as completed. Check the latest status
              before attempting another payment.
            </p>
          </>
        )}

        {payment && (
          <div className="mt-6 space-y-2 rounded-2xl border border-line bg-surface p-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted">{t("th.transaction")}</span>
              <span className="break-all font-mono text-xs">
                {payment.transactionId}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">{t("th.amount")}</span>
              <span className="font-semibold">
                {formatBDT(payment.amountPaisa)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted">{t("th.status")}</span>
              <Badge tone={statusTone(payment.status)}>
                {payment.status}
              </Badge>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!isCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              loading={isFetching}
              disabled={!transactionId || isFetching}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {t("stripe.refresh")}
            </Button>
          )}

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
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
      }
    >
      <SuccessInner />
    </Suspense>
  );
};

export default PaymentSuccessPage;
