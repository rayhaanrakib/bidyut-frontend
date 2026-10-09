import apiClient from "@/lib/apiClient";

export const userLogin = (payload: { email: string; password: string }) =>
  apiClient("/auth/login", { method: "POST", body: payload });

export const userRegister = (payload: { name: string; email: string; password: string; category: string }) =>
  apiClient("/auth/register", { method: "POST", body: payload });

export const verifyOtp = (payload: { email: string; otp: string }) =>
  apiClient("/auth/verify-otp", { method: "POST", body: payload });

export const getMe = () => apiClient("/auth/me");

export const userLogout = () => apiClient("/auth/logout", { method: "POST" });

export const forgotPassword = (payload: { email: string }) =>
  apiClient("/auth/forgot-password", { method: "POST", body: payload });

export const resetPassword = (payload: { email: string; otp: string; newPassword: string }) =>
  apiClient("/auth/reset-password", { method: "POST", body: payload });

export const googleOAuth = (payload: { idToken: string }) =>
  apiClient("/auth/google", { method: "POST", body: payload });