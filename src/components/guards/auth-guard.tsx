"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { AuthLoading } from "./auth-loading";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const redirect = window.location.pathname + window.location.search;
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [loading, user, router]);

  if (loading) return <AuthLoading />;
  if (!user) return null;
  return <>{children}</>;
};