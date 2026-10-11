"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Textarea } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { contactSchema } from "@/validation";

type ContactValues = z.infer<typeof contactSchema>;

const supportTopics = [
  {
    number: "01",
    title: "General enquiries",
    description:
      "Questions about your account, service, or using the BIDYUT platform.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Technical support",
    description:
      "Help with unexpected errors, account access, or reporting a problem.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Power outages",
    description:
      "Report an outage through your dashboard so it can enter the proper reporting workflow.",
    icon: Zap,
  },
];

const ContactSkeleton = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background pb-20">
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1411] px-6 py-14 sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end animate-pulse">
            <div>
              <div className="inline-flex h-8 w-44 rounded-full bg-white/10" />

              <div className="mt-8 space-y-4">
                <div className="h-10 w-11/12 rounded-xl bg-white/10 sm:h-12 lg:h-16" />
                <div className="h-10 w-2/3 rounded-xl bg-white/10 sm:h-12 lg:h-16" />
              </div>

              <div className="mt-6 space-y-2 max-w-xl">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>

              <div className="mt-8 h-12 w-48 rounded-full bg-white/10" />
            </div>

            <div className="relative lg:justify-self-end lg:max-w-sm w-full">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-white/10" />
                <div className="h-3 w-24 rounded bg-white/5" />
                <div className="h-6 w-3/4 rounded bg-white/10" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-white/5" />
                  <div className="h-3.5 w-5/6 rounded bg-white/5" />
                </div>
                <div className="h-5 w-full rounded bg-white/5" />
              </div>
            </div>
          </div>

          <div className="mt-14 h-5 w-64 rounded bg-white/5 animate-pulse sm:mt-20" />
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end animate-pulse">
            <div>
              <div className="h-3 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="mt-3 h-8 w-64 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
            </div>
            <div className="space-y-2 max-w-md w-full">
              <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              <div className="h-4 w-5/6 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-3xl border border-border/70 bg-card p-6 sm:p-7 space-y-6 animate-pulse"
              >
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-4 w-6 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
                </div>
                <div className="h-6 w-1/2 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-4 w-11/12 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                </div>
                <div className="h-4 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              </div>
            ))}
          </div>
        </section>

        <section className="grid scroll-mt-24 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col justify-between">
            <div className="animate-pulse space-y-4">
              <div className="h-3.5 w-24 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="space-y-2">
                <div className="h-8 w-11/12 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
                <div className="h-8 w-3/4 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
              </div>
              <div className="space-y-2 max-w-md">
                <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="h-4 w-11/12 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex h-[88px] items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 animate-pulse">
                <div className="h-11 w-11 rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-4 w-40 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                </div>
              </div>

              <div className="flex h-[156px] items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5 animate-pulse">
                <div className="h-11 w-11 rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-44 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                    <div className="h-3 w-5/6 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-card p-5 sm:rounded-[32px] sm:p-8 lg:p-10 space-y-5">
            <div className="mb-8 space-y-2 animate-pulse">
              <div className="h-6 w-44 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="h-4 w-72 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>

            <div className="space-y-4 animate-pulse">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-16 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-12 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="h-[148px] w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
              </div>

              <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="h-4 w-56 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="h-12 w-full rounded-xl bg-neutral-200/40 dark:bg-neutral-800/40 sm:w-32" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-border/70 pt-8 sm:mt-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
              <div className="space-y-1.5">
                <div className="h-4 w-16 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-3 w-48 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>
            </div>
            <div className="space-y-2 max-w-xs w-full">
              <div className="h-3 w-full rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
              <div className="h-3 w-4/5 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const ContactMain = () => {
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    toast.success(t("contact.sent"));
    reset();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background pb-20">
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1411] px-6 py-14 text-white sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[440px] w-[440px] rounded-full bg-emerald-400/15 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 left-[35%] -z-10 h-[380px] w-[380px] rounded-full bg-teal-500/10 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "linear-gradient(to bottom right, black, transparent 75%)",
            }}
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3.5 py-2 text-xs font-semibold tracking-wide text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                CONTACT & SUPPORT
              </div>

              <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
                Every question
                <br />
                deserves a{" "}
                <span className="text-emerald-300">clear answer.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                {t("contact.sub")}
              </p>

              <a
                href="#contact-form"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-300 px-5 py-3.5 text-sm font-bold text-[#07130f] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                Start a conversation
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative lg:justify-self-end lg:max-w-sm">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-[#07130f]">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                  HERE TO HELP
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Let’s figure it out together.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  Choose the right support channel and give us the details we
                  need to understand your question.
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Clock3 className="h-4 w-4 shrink-0 text-emerald-300" />
                  <p className="text-xs leading-5 text-white/60">
                    Include relevant details so your enquiry is easier to
                    understand.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 -z-10 h-full w-full rounded-3xl border border-emerald-300/15 sm:-right-4" />
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:mt-20">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Support-focused
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-300" />
              Power service platform
            </span>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                HOW CAN WE HELP?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Find the right support.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted">
              Start with the topic closest to your situation. For an active
              outage, use the dedicated reporting workflow instead of the
              general contact form.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;
              const isOutage = topic.number === "03";

              return (
                <article
                  key={topic.number}
                  className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/[0.05] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-primary transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-semibold tracking-widest text-muted/60">
                      {topic.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {topic.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">
                    {topic.description}
                  </p>

                  {isOutage ? (
                    <Link
                      href="/login"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Sign in to report
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a
                      href="#contact-form"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Contact our team
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="contact-form"
          className="grid scroll-mt-24 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                GET IN TOUCH
              </p>

              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Tell us what’s on your mind.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                Share your question or describe the issue you are experiencing.
                Please avoid including passwords or other sensitive account
                information.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:support@bidyut.demo"
                className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 transition hover:border-emerald-500/40 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">EMAIL SUPPORT</p>
                  <p className="mt-1 break-all text-sm font-semibold">
                    support@bidyut.demo
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-primary" />
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Need to report an outage?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Sign in and submit an outage report to provide the service
                    location and relevant details.
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Go to sign in
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-card p-5 shadow-sm sm:rounded-[32px] sm:p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-semibold tracking-tight">
                Send us a message
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Fields marked with an asterisk are required.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">
                      {t("contact.name")} *
                    </FieldLabel>
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                  </Field>

                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">
                      {t("auth.email")} *
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </Field>
                </div>

                <Field data-invalid={!!errors.subject}>
                  <FieldLabel htmlFor="subject">
                    {t("contact.subject")} *
                  </FieldLabel>
                  <Input
                    id="subject"
                    placeholder="What can we help you with?"
                    aria-invalid={!!errors.subject}
                    {...register("subject")}
                  />
                  <FieldError message={errors.subject?.message} />
                </Field>

                <Field data-invalid={!!errors.message}>
                  <FieldLabel htmlFor="message">
                    {t("contact.message")} *
                  </FieldLabel>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Describe your question or issue..."
                    className="resize-y"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  <FieldError message={errors.message?.message} />
                </Field>

                <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-5 text-muted">
                    Please do not include passwords or payment credentials in
                    your message.
                  </p>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="h-12 w-full rounded-xl px-6 sm:w-auto"
                  >
                    {t("contact.send")}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </div>
        </section>

        <section className="mt-20 border-t border-border/70 pt-8 sm:mt-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-[#07130f]">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <div>
                <p className="text-sm font-black tracking-[0.14em]">
                  BIDYUT
                </p>
                <p className="mt-1 text-xs text-muted">
                  Bangladesh power utility platform
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted sm:text-right">
              Better communication starts with the right information. Choose
              the right channel and let’s take it from there.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export const ContactContent = () => {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactMain />
    </Suspense>
  );
};