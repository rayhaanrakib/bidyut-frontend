"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type AuthSession, userLogin } from "@/api";
import { Button } from "@/components/ui/button";
import DemoLoginSection from "@/components/form/demo-login-section";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { FieldError, Input } from "@/components/ui/input";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { useLogin } from "@/hooks";
import { type DemoRole, demoCredentials } from "@/lib/demo";
import { useI18n } from "@/lib/i18n";
import { tokenStore } from "@/lib/tokenStore";
import { loginSchema } from "@/validation";

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { t } = useI18n();
  const qc = useQueryClient();
  const params = useSearchParams();
  const raw = params.get("redirect");
  const redirect = raw && !raw.startsWith("/login") ? raw : null;
  const googleFailed = params.get("error") === "google_failed";
  const [showPassword, setShowPassword] = useState(false);
  const [demoRole, setDemoRole] = useState<DemoRole | null>(null);

  const { mutate: login, isPending: loginPending } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSuccess = (res: { data: AuthSession; message?: string }) => {
    tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
    qc.setQueryData(["me"], res);
    toast.success(res.message ?? t("toast.done"));
    router.push(redirect ?? "/");
  };

  const onError = (err: Error) => toast.error(err.message || t("toast.failed"));

  const demoLogin = (role: DemoRole) => {
    setDemoRole(role);
    login(demoCredentials(role), {
      onSuccess,
      onError,
      onSettled: () => setDemoRole(null),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {googleFailed && (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {t("auth.googleFailed")}
        </p>
      )}

      <form
        onSubmit={handleSubmit((values) => login(values, { onSuccess, onError }))}
        noValidate
      >
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
              <Link href="/forgot-password" className="text-xs font-medium text-primary underline-offset-4 hover:underline">
                {t("auth.forgot.link")}
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                {showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FieldError message={errors.password?.message} />
          </Field>

          <Button type="submit" disabled={demoRole !== null} loading={loginPending && !demoRole}>
            {loginPending && !demoRole ? t("auth.submitting") : t("auth.signIn")}
          </Button>
        </FieldGroup>
      </form>

      <DemoLoginSection activeRole={demoRole} disabled={demoRole !== null} onSelect={demoLogin} />

      <FieldSeparator>{t("auth.orGoogle")}</FieldSeparator>
      <GoogleLoginComponent />

      <p className="text-center text-sm text-muted">
        <Link href="/register" className="ml-1 font-medium text-primary underline-offset-4 hover:underline">{t("auth.toRegister")}</Link>
      </p>
    </div>
  );
};