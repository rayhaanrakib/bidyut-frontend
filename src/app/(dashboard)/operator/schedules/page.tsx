import { Suspense } from "react";
import SchedulesView from "@/components/dashboard/schedules-view";

export default function OperatorSchedulesPage() {
  return (
    <Suspense>
      <SchedulesView />
    </Suspense>
  );
}