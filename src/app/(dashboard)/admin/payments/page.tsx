import { Suspense } from "react";
import PaymentsView from "@/components/dashboard/payments-view";

export default function AdminPaymentsPage() {
  return (
    <Suspense>
      <PaymentsView />
    </Suspense>
  );
}