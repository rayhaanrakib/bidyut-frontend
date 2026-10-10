import { Suspense } from "react";
import AnalyticsView from "@/components/dashboard/analytics-view";

export default function AdminAnalyticsPage() {
  return (
    <Suspense>
      <AnalyticsView />
    </Suspense>
  );
}