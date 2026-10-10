import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileView from "@/components/dashboard/profile-view";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileView />
      </Suspense>
    </>
  );
}