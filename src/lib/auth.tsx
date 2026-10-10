"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext } from "react";
import { getMe } from "@/api";
import { api } from "./api";
import { tokenStore } from "./tokenStore";
import type { User } from "@/types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const LEGACY_TOKEN_KEY = "accessToken";

if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore storage errors
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const user = data?.data?.user ?? null;

  const logout = useCallback(() => {
    api("/auth/logout", { method: "POST" }).catch(() => null);
    tokenStore.clear();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LEGACY_TOKEN_KEY);
    }
    qc.setQueryData(["me"], null);
  }, [qc]);

  return <Ctx.Provider value={{ user, loading: isLoading, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};