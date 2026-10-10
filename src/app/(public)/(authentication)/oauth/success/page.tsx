"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { roleHome } from "@/lib/utils";
import { tokenStore } from "@/lib/tokenStore";

const OAuthSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hash.get("accessToken");
    const refreshToken = hash.get("refreshToken");

    if (!accessToken) {
      router.replace("/login?error=google_failed");
      return;
    }
    if (refreshToken) {
      tokenStore.setTokens(accessToken, refreshToken);
    } else {
      tokenStore.setAccessToken(accessToken);
    }
    api<{ role: string }>("/auth/me")
      .then(({ data }) => router.replace(roleHome(data.role)))
      .catch(() => router.replace("/login?error=google_failed"));
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center gap-3 text-sm text-muted">
      <Loader2 className="h-5 w-5 animate-spin text-accent" /> Signing you in with Google…
    </main>
  );
};

export default OAuthSuccessPage;