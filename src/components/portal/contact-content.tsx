"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Textarea } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { contactSchema } from "@/validation";

type ContactValues = z.infer<typeof contactSchema>;

export const ContactContent = () => {
  const { t } = useI18n();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    // The B7A7 backend has no contact endpoint yet — when yours lands, this is the whole wire-in:
    // await api("/public/contact", { method: "POST", body: values });
    toast.success(t("contact.sent"));
    reset();
  };

  return (
    <main className="container mx-auto min-h-screen grid items-center gap-10 px-4 py-24 lg:grid-cols-[1fr_420px] justify-center">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">{t("contact.title")}</h1>
        <p className="mt-4 leading-relaxed text-muted">{t("contact.sub")}</p>

        <div className="mt-8 space-y-3 rounded-2xl border border-line bg-card p-5 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <Mail className="h-4 w-4 text-primary" /> support@bidyut.demo
          </p>
          <p className="flex items-center gap-2 text-muted">
            <MessageSquare className="h-4 w-4 text-primary" /> {t("contact.response")}
          </p>
          <p className="flex items-center gap-2 text-muted">
            <ShieldCheck className="h-4 w-4 text-primary" /> Live outages? Report them from your dashboard — they page the on-call operator directly.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="h-fit rounded-3xl border border-line bg-card p-6">
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">{t("contact.name")}</FieldLabel>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            <FieldError message={errors.name?.message} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </Field>

          <Field data-invalid={!!errors.subject}>
            <FieldLabel htmlFor="subject">{t("contact.subject")}</FieldLabel>
            <Input id="subject" aria-invalid={!!errors.subject} {...register("subject")} />
            <FieldError message={errors.subject?.message} />
          </Field>

          <Field data-invalid={!!errors.message}>
            <FieldLabel htmlFor="message">{t("contact.message")}</FieldLabel>
            <Textarea id="message" rows={5} aria-invalid={!!errors.message} {...register("message")} />
            <FieldError message={errors.message?.message} />
          </Field>

          <Button type="submit" loading={isSubmitting}>{t("contact.send")}</Button>
        </FieldGroup>
      </form>
    </main>
  );
};