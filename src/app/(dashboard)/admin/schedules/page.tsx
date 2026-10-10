import { Suspense } from "react";
import SchedulesView from "@/components/dashboard/schedules-view";

export default function AdminSchedulesPage() {
  return (
    <Suspense>
      <SchedulesView />
    </Suspense>
  );
}