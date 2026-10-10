import { Suspense } from "react";
import UsersView from "@/components/dashboard/users-view";

export default function AdminUsersPage() {
  return (
    <Suspense>
      <UsersView />
    </Suspense>
  );
}