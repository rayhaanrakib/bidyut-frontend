import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { RegisterForm } from "@/components/form/register-form";

export const metadata: Metadata = { title: "Create your account · BIDYUT" };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Free forever. Priority optional.">
      <RegisterForm />
    </AuthShell>
  );
}