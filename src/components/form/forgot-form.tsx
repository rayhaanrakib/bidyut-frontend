"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword, resetPassword } from "@/api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForgotPassword, useResetPassword } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { forgotSchema, resetSchema } from "@/validation";

type ForgotValues = z.infer<typeof forgotSchema>;
type ResetValues = z.infer<typeof resetSchema>;

export const ForgotForm = () => {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const send = useForgotPassword();
  const reset = useResetPassword();

  const f1 = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const f2 = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: "", newPassword: "" },
  });

  if (!sent)
    return (
      <form
        onSubmit={f1.handleSubmit((values) =>
          send.mutate(values, {
            onSuccess: (res) => {
              toast.success(res.message ?? t("toast.done"));
              setEmail(values.email);
              setSent(true);
            },
            onError: (err) => toast.error(err.message || t("toast.failed")),
          }),
        )}
        noValidate
        className="flex flex-col gap-5"
      >
        <FieldGroup>
          <Field data-invalid={!!f1.formState.errors.email}>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" autoComplete="email" placeholder="you@example.com"
              aria-invalid={!!f1.formState.errors.email} {...f1.register("email")} />
            <FieldError message={f1.formState.errors.email?.message} />
          </Field>
          <Button type="submit" loading={send.isPending}>{t("auth.forgot.send")}</Button>
        </FieldGroup>
      </form>
    );

  return (
    <form
      onSubmit={f2.handleSubmit(({ otp, newPassword }) =>
        reset.mutate({ email, otp, newPassword }, {
          onSuccess: (res) => {
            toast.success(res.message ?? t("toast.done"));
            router.push("/login");
          },
          onError: (err) => toast.error(err.message || t("toast.failed")),
        }),
      )}
      noValidate
      className="flex flex-col items-center gap-5"
    >
      <p className="text-center text-sm text-muted">
        {t("auth.otp.sentTo")} <strong className="text-foreground">{email}</strong>
      </p>

      <Controller
        control={f2.control}
        name="otp"
        render={({ field }) => (
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={field.value} onChange={field.onChange}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
            </InputOTPGroup>
          </InputOTP>
        )}
      />
      <FieldError message={f2.formState.errors.otp?.message} />

      <Field data-invalid={!!f2.formState.errors.newPassword} className="w-full">
        <FieldLabel htmlFor="newPassword">{t("auth.forgot.newPassword")}</FieldLabel>
        <Input id="newPassword" type="password" autoComplete="new-password"
          aria-invalid={!!f2.formState.errors.newPassword} {...f2.register("newPassword")} />
        <FieldError message={f2.formState.errors.newPassword?.message} />
      </Field>

      <Button type="submit" loading={reset.isPending}>{t("auth.forgot.reset")}</Button>
    </form>
  );
};