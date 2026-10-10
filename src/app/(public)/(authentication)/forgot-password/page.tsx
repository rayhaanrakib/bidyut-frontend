import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { ForgotForm } from "@/components/form/forgot-form";

export const metadata: Metadata = { title: "Reset password · BIDYUT" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset your password" sub="We'll email you a 6-digit reset code.">
      <ForgotForm />
    </AuthShell>
  );
}