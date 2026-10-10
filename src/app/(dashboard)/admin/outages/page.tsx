import { Suspense } from "react";
import OutagesView from "@/components/dashboard/outages-view";

export default function AdminOutagesPage() {
  return (
    <Suspense>
      <OutagesView />
    </Suspense>
  );
}