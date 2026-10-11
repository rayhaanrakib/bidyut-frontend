"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userRegister } from "@/api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { useRegistration } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { registerSchema } from "@/validation";
import type { DictKey } from "@/lib/dictionaries";

const CATEGORIES = ["RESIDENTIAL", "COMMERCIAL", "HEALTHCARE", "EDUCATION"] as const;

const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], DictKey> = {
  RESIDENTIAL: "category.RESIDENTIAL",
  COMMERCIAL: "category.COMMERCIAL",
  HEALTHCARE: "category.HEALTHCARE",
  EDUCATION: "category.EDUCATION",
};

type RegisterValues = z.infer<typeof registerSchema>;

const RegisterFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
          <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-10 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
          <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
          <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
          <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>

        <div className="h-10 w-full rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />
      </div>

      <div className="mx-auto h-4 w-44 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
    </div>
  );
};

const RegisterFormMain = () => {
  const router = useRouter();
  const { t } = useI18n();
  const registerUser = useRegistration();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", category: "RESIDENTIAL" },
  });

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={handleSubmit((values) =>
          registerUser.mutate(values, {
            onSuccess: (res) => {
              toast.success(res.message ?? t("toast.done"));
              router.push(`/verify-otp?email=${values.email}`);
            },
            onError: (err) => toast.error(err.message || t("toast.failed")),
          }),
        )}
        noValidate
      >
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">{t("auth.name")}</FieldLabel>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            <FieldError message={errors.name?.message} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
            <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register("password")} />
            <FieldError message={errors.password?.message} />
          </Field>

          <Field data-invalid={!!errors.category}>
            <FieldLabel htmlFor="category">{t("auth.category")}</FieldLabel>
            <Select id="category" aria-invalid={!!errors.category} {...register("category")}>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{t(CATEGORY_LABELS[cat])}</option>)}
            </Select>
            <FieldError message={errors.category?.message} />
          </Field>

          <Button type="submit" loading={registerUser.isPending}>{t("auth.signUp")}</Button>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted">
        <Link href="/login" className="ml-1 font-medium text-primary underline-offset-4 hover:underline">{t("auth.toLogin")}</Link>
      </p>
    </div>
  );
};

export const RegisterForm = () => {
  return (
    <Suspense fallback={<RegisterFormSkeleton />}>
      <RegisterFormMain />
    </Suspense>
  );
};