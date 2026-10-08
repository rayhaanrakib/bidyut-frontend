"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { tokenStore } from "./tokenStore";
import type { User } from "./types";

interface RegisterInput {
  name: string; email: string; password: string;
  category?: string;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  pendingEmail: string | null;
  setPendingEmail: (email: string | null) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<User>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  // hydrate the session on first load: token? → who am I?
  useEffect(() => {
    if (!tokenStore.get()) {
      setLoading(false);
      return;
    }
    api<{ user: User }>("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<{ user: User; accessToken: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    tokenStore.set(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    await api("/auth/register", { method: "POST", body: input });
    setPendingEmail(input.email);
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    const res = await api<{ user: User; accessToken: string }>("/auth/verify-otp", {
      method: "POST",
      body: { email, otp },
    });
    tokenStore.set(res.data.accessToken);
    setUser(res.data.user);
    setPendingEmail(null);
    return res.data.user;
  }, []);

  const resetPassword = useCallback(async (email: string, otp: string, newPassword: string) => {
    await api("/auth/reset-password", { method: "POST", body: { email, otp, newPassword } });
  }, []);

  const logout = useCallback(async () => {
    api("/auth/logout", { method: "POST" }).catch(() => null);
    tokenStore.clear();
    setUser(null);
  }, []);

  return (
    <Ctx.Provider
      value={{ user, loading, pendingEmail, setPendingEmail, login, register, verifyOtp, resetPassword, logout }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};