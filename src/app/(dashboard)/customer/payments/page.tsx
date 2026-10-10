import { Suspense } from "react";
import PaymentsView from "@/components/dashboard/payments-view";

export default function CustomerPaymentsPage() {
  return (
    <Suspense>
      <PaymentsView />
    </Suspense>
  );
}