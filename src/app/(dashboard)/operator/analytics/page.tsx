import { Suspense } from "react";
import AnalyticsView from "@/components/dashboard/analytics-view";

export default function OperatorAnalyticsPage() {
  return (
    <Suspense>
      <AnalyticsView />
    </Suspense>
  );
}