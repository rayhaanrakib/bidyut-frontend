import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { LoginForm } from "@/components/form/login-form";

export const metadata: Metadata = { title: "Log in · BIDYUT" };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to report and track outages.">
      <LoginForm />
    </AuthShell>
  );
}