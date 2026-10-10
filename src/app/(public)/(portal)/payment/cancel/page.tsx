"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { roleHome } from "@/lib/utils";
import { XCircle } from "lucide-react";
import Link from "next/link";

const PaymentCancelPage = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <XCircle className="h-16 w-16 text-danger" />
        <h1 className="mt-5 text-2xl font-extrabold">Payment cancelled</h1>
        <p className="mt-2 text-sm text-muted">No charge was made. You can start a new checkout anytime.</p>
        <div className="mt-7 flex gap-3">
          <Link href="/customer/payments"><Button variant="outline" size="sm">{t("dash.payments")}</Button></Link>
          <Link href={roleHome(user?.role)}><Button size="sm">{t("nav.dashboard")}</Button></Link>
        </div>
      </main>
    </div>
  );
};

export default PaymentCancelPage;