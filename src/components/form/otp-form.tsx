"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { verifyOtp } from "@/api";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyAccount } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { tokenStore } from "@/lib/tokenStore";
import { otpSchema } from "@/validation";

type OtpValues = z.infer<typeof otpSchema>;

const OtpFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-5 animate-pulse">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-4 w-72 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-9 rounded-md border border-input bg-background/50"
          />
        ))}
      </div>

      <div className="h-10 w-24 rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />

      <div className="h-3.5 w-44 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
    </div>
  );
};

const OtpFormMain = () => {
  const router = useRouter();
  const { t } = useI18n();
  const email = useSearchParams().get("email") ?? "";
  const verify = useVerifyAccount();
  const qc = useQueryClient();

  const { control, handleSubmit, formState: { errors } } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(({ otp }) =>
        verify.mutate(
          { email, otp },
          {
            onSuccess: (res) => {
              tokenStore.set(res.data.accessToken);
              qc.setQueryData(["me"], res);
              toast.success(res.message ?? t("toast.done"));
              router.push("/");
            },
            onError: (err) => toast.error(err.message || t("toast.failed")),
          },
        ),
      )}
      noValidate
      className="flex flex-col items-center gap-5"
    >
      <p className="text-center text-sm text-muted">
        {t("auth.otp.sentTo")} <strong className="text-foreground">{email}</strong> — {t("auth.otp.sub")}
      </p>

      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={field.value} onChange={field.onChange}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
            </InputOTPGroup>
          </InputOTP>
        )}
      />
      <FieldError message={errors.otp?.message} />

      <Button type="submit" loading={verify.isPending}>{t("auth.otp.verify")}</Button>
      <p className="text-center text-xs text-muted">
        {t("auth.toRegister")}
        <Link href="/register" className="ml-1 font-medium text-primary underline-offset-4 hover:underline">Register</Link>
      </p>
    </form>
  );
};

export const OtpForm = () => {
  return (
    <Suspense fallback={<OtpFormSkeleton />}>
      <OtpFormMain />
    </Suspense>
  );
};