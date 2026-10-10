"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { tokenStore } from "@/lib/tokenStore";


export default function OAuthCallbackPage() {
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
    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center gap-3 text-sm text-muted">
      <Loader2 className="h-5 w-5 animate-spin text-accent" /> Signing you in with Google…
    </main>
  );
}