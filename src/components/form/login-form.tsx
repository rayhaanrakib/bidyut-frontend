"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { googleOAuth, userLogin } from "@/api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { FieldError, Input } from "@/components/ui/input";
import DemoLoginSection from "@/components/form/demo-login-section";
import { useMutation2 } from "@/hooks";
import { type DemoRole, demoCredentials } from "@/lib/demo";
import { useI18n } from "@/lib/i18n";
import { roleHome } from "@/lib/utils";
import { loginSchema } from "@/validation";

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { t } = useI18n();
  const redirect = useSearchParams().get("redirect");
  const [activeRole, setActiveRole] = useState<DemoRole | null>(null);

  const login = useMutation2(userLogin);
  const google = useMutation2(googleOAuth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const land = (res?: { user?: { role: string } } | null) =>
    router.push(redirect ?? roleHome(res?.user?.role));

  const demoLogin = (role: DemoRole) => {
    setActiveRole(role);
    login.mutate(demoCredentials(role), { onSuccess: land });
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit((values) => login.mutate(values, { onSuccess: land }))} noValidate>
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
            <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
            <FieldError message={errors.password?.message} />
          </Field>

          <Button type="submit" loading={login.isPending}>{t("auth.signIn")}</Button>
        </FieldGroup>
      </form>

      <DemoLoginSection
        activeRole={login.isPending ? activeRole : null}
        disabled={login.isPending}
        onSelect={demoLogin}
      />

      <FieldSeparator>{t("auth.orGoogle")}</FieldSeparator>
      <GoogleLogin
        onSuccess={(res) => google.mutate({ idToken: res.credential ?? "" }, { onSuccess: land })}
        onError={() => toast.error(t("toast.failed"))}
      />

      <p className="text-center text-sm text-muted">
        {t("auth.toRegister")}
        <Link href="/register" className="ml-1 font-medium text-primary underline-offset-4 hover:underline">Register</Link>
      </p>
    </div>
  );
};