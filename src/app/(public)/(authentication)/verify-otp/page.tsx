import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { OtpForm } from "@/components/form/otp-form";

export const metadata: Metadata = { title: "Verify your email · BIDYUT" };

export default function VerifyOtpPage() {
  return (
    <AuthShell title="Check your email" subtitle="We sent a 6-digit code. It expires in 10 minutes.">
      <OtpForm />
    </AuthShell>
  );
}