import { Suspense } from "react";
import UsersView from "@/components/dashboard/users-view";

export default function OperatorUsersPage() {
  return (
    <Suspense>
      <UsersView />
    </Suspense>
  );
}