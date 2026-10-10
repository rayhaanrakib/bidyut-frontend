import { Suspense } from "react";
import OutagesView from "@/components/dashboard/outages-view";

export default function OperatorOutagesPage() {
  return (
    <Suspense>
      <OutagesView />
    </Suspense>
  );
}