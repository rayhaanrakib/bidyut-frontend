import { api } from "@/lib/api";
import type { User } from "@/types";

export type AuthSession = { user: User; accessToken: string; refreshToken: string; isNewUser?: boolean };

export const userLogin = (payload: { email: string; password: string }) =>
  api<AuthSession>("/auth/login", { method: "POST", body: payload });

export const userRegister = (payload: { name: string; email: string; password: string; category: string }) =>
  api<{ email: string }>("/auth/register", { method: "POST", body: payload });

export const verifyOtp = (payload: { email: string; otp: string }) =>
  api<AuthSession>("/auth/verify-otp", { method: "POST", body: payload });

export const getMe = () => api<{ user: User }>("/auth/me");

export const userLogout = () => api<null>("/auth/logout", { method: "POST" });

export const forgotPassword = (payload: { email: string }) =>
  api<null>("/auth/forgot-password", { method: "POST", body: payload });

export const resetPassword = (payload: { email: string; otp: string; newPassword: string }) =>
  api<null>("/auth/reset-password", { method: "POST", body: payload });

export const googleOAuth = (payload: { idToken: string }) =>
  api<AuthSession>("/auth/google", { method: "POST", body: payload });