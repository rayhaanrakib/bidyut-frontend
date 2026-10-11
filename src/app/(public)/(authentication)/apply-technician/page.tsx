"use client";

import { Suspense, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  HardHat,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useApplyAsTechnician } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

const SPECIALIZATIONS = [
  {
    value: "LINE",
    title: "Line Technician",
    description: "Power lines, field inspections, and distribution faults.",
    icon: Zap,
  },
  {
    value: "TRANSFORMER",
    title: "Transformer",
    description: "Transformer maintenance and equipment fault assessment.",
    icon: ShieldCheck,
  },
  {
    value: "METERING",
    title: "Metering",
    description: "Meter installation, testing, and service inspections.",
    icon: BadgeCheck,
  },
  {
    value: "GENERATION",
    title: "Generation",
    description: "Generation equipment checks and technical maintenance.",
    icon: BriefcaseBusiness,
  },
];

const APPLICATION_STEPS = [
  {
    number: "01",
    title: "Submit your details",
    description: "Choose your specialization and attach your resume.",
  },
  {
    number: "02",
    title: "Application review",
    description: "An administrator reviews your submitted information.",
  },
  {
    number: "03",
    title: "Start your role",
    description:
      "If approved, your account switches to the technician dashboard on your next login.",
  },
];

const ApplyTechnicianSkeleton = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background pb-16">
      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1411] sm:rounded-[36px]">
          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-16 lg:py-20 animate-pulse">
            <div>
              <div className="inline-flex h-8 w-52 rounded-full bg-white/10" />

              <div className="mt-7 space-y-4">
                <div className="h-10 w-11/12 rounded-xl bg-white/10 sm:h-12 lg:h-16" />
                <div className="h-10 w-2/3 rounded-xl bg-white/10 sm:h-12 lg:h-16" />
              </div>

              <div className="mt-5 space-y-2 max-w-lg">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>

              <div className="mt-8 h-12 w-52 rounded-full bg-white/10" />

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
                <div className="h-4 w-32 rounded bg-white/5" />
                <div className="h-4 w-28 rounded bg-white/5" />
              </div>
            </div>

            <div className="relative lg:justify-self-end lg:w-full lg:max-w-sm">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/10" />
                  <div className="h-6 w-20 rounded-full bg-white/5" />
                </div>
                <div className="h-3 w-28 rounded bg-white/5" />
                <div className="h-7 w-3/4 rounded bg-white/10" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full rounded bg-white/5" />
                  <div className="h-3.5 w-4/5 rounded bg-white/5" />
                </div>
                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-full rounded bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end animate-pulse">
            <div>
              <div className="h-3 w-36 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="mt-3 h-8 w-64 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
            </div>
            <div className="space-y-2 max-w-md w-full">
              <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              <div className="h-4 w-4/5 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6 space-y-5 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-4 w-6 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
                </div>
                <div className="h-5 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-3.5 w-4/5 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                </div>
                <div className="h-4 w-20 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="space-y-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="h-8 w-64 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
              <div className="space-y-1.5 max-w-md">
                <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="h-4 w-5/6 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="space-y-2 flex-1 pt-1">
                    <div className="h-4 w-36 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                    <div className="h-3.5 w-4/5 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-20 w-full rounded-2xl border border-border/70 bg-card p-4" />
          </div>

          <div className="rounded-[28px] border border-border/70 bg-card p-5 sm:p-8 lg:p-10 space-y-6 animate-pulse">
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="h-7 w-56 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
              <div className="h-4 w-72 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-44 w-full rounded-2xl border border-dashed border-border bg-background/50" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-11 w-full rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-11 w-full rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>

              <div className="border-t border-border/70 pt-5 space-y-3">
                <div className="h-12 w-full rounded-xl bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="mx-auto h-3 w-64 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between animate-pulse">
          <div className="h-4 w-16 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
          <div className="h-3 w-48 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
        </footer>
      </div>
    </main>
  );
};

const ApplyTechnicianMain = () => {
  const apply = useApplyAsTechnician();
  const [specialization, setSpecialization] = useState("LINE");
  const [experienceYears, setExperienceYears] = useState("");
  const [certification, setCertification] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please attach your resume before submitting.");
      return;
    }

    const form = new FormData();
    form.append("resume", file);
    form.append("specialization", specialization);

    if (experienceYears) {
      form.append("experienceYears", experienceYears);
    }

    if (certification.trim()) {
      form.append("certification", certification.trim());
    }

    try {
      await apply.mutateAsync(form);
      setDone(true);
      toast.success("Your technician application has been submitted.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Application submission failed.",
      );
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background pb-16">
      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1411] text-white sm:rounded-[36px] mt-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px] sm:h-[440px] sm:w-[440px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-teal-500/10 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "linear-gradient(to bottom right, black, transparent 80%)",
            }}
          />

          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-16 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-300">
                <HardHat className="h-4 w-4" />
                TECHNICIAN APPLICATION
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
                Your skills keep
                <br />
                the grid <span className="text-emerald-300">moving.</span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Apply to join the BIDYUT field team. Tell us about your
                technical experience, select your area of specialization, and
                submit your resume for review.
              </p>

              <a
                href="#application-form"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-300 px-5 py-3.5 text-sm font-bold text-[#07130f] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                Start your application
                <ArrowDown className="h-4 w-4" />
              </a>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/55">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-300" />
                  Resume required
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  Admin reviewed
                </span>
              </div>
            </div>

            <div className="relative lg:justify-self-end lg:w-full lg:max-w-sm">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-[#07130f]">
                    <HardHat className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    Field team
                  </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  YOUR NEXT STEP
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Put your expertise to work.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  Your application helps the team understand your technical
                  background and the work you are qualified to support.
                </p>

                <div className="mt-7 space-y-4 border-t border-white/10 pt-5">
                  {[
                    "Select your technical specialization",
                    "Share your experience and credentials",
                    "Submit your resume for review",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <p className="text-sm text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-3xl border border-emerald-300/15" />
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                AREAS OF EXPERTISE
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Where do you specialize?
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted">
              Choose the technical area that best matches your experience in
              the application form below.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZATIONS.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSpecialization(item.value)}
                  aria-pressed={specialization === item.value}
                  className={`group rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 sm:p-6 ${
                    specialization === item.value
                      ? "border-emerald-500/50 bg-emerald-500/[0.07] shadow-lg shadow-emerald-950/[0.04]"
                      : "border-border/70 bg-card hover:border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                        specialization === item.value
                          ? "bg-emerald-500 text-white"
                          : "bg-emerald-500/10 text-primary group-hover:bg-emerald-500 group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="text-xs font-semibold text-muted/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[60px] text-sm leading-6 text-muted">
                    {item.description}
                  </p>

                  <div
                    className={`mt-5 flex items-center gap-2 text-xs font-semibold ${
                      specialization === item.value
                        ? "text-primary"
                        : "text-muted"
                    }`}
                  >
                    {specialization === item.value ? "Selected" : "Select area"}
                    {specialization === item.value ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Three steps to get started.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              Submit your information and wait for an administrator to review
              your application.
            </p>

            <div className="mt-8 space-y-6">
              {APPLICATION_STEPS.map((step, index) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] text-xs font-bold text-primary">
                      {step.number}
                    </span>
                    {index !== APPLICATION_STEPS.length - 1 && (
                      <span className="mt-2 h-8 w-px bg-border" />
                    )}
                  </div>

                  <div className="pb-3">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-xs leading-5 text-muted">
                Approval is subject to administrative review. Your technician
                dashboard becomes available on your next login if approved.
              </p>
            </div>
          </div>

          <div
            id="application-form"
            className="scroll-mt-24 rounded-[28px] border border-border/70 bg-card p-5 shadow-sm sm:p-8 lg:p-10"
          >
            {done ? (
              <div className="py-10 sm:py-16">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                  <Clock3 className="h-8 w-8" />
                </div>

                <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  APPLICATION RECEIVED
                </p>

                <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
                  Your application is under review.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-center text-sm leading-7 text-muted">
                  Thank you for applying to join the BIDYUT technician team.
                  An administrator will review your information. You can sign
                  in again after approval to access your technician dashboard.
                </p>

                <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-border/70 bg-background p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm font-medium">
                      Application submitted
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Clock3 className="h-5 w-5 shrink-0 text-amber-500" />
                    <span className="text-sm font-medium">
                      Waiting for administrator review
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    APPLICATION FORM
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Tell us about yourself.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    Complete the fields below and attach your resume to submit
                    your application.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="resume"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Resume <span className="text-red-500">*</span>
                    </label>

                    <label
                      htmlFor="resume"
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-5 py-8 text-center transition hover:border-emerald-500/50 hover:bg-emerald-500/[0.03] sm:py-10"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-primary">
                        <FileText className="h-6 w-6" />
                      </span>

                      <span className="mt-4 text-sm font-semibold">
                        {file ? file.name : "Upload your resume"}
                      </span>

                      <span className="mt-2 text-xs leading-5 text-muted">
                        PDF, PNG or JPG
                      </span>

                      <span className="mt-4 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold transition group-hover:border-emerald-500/30">
                        Browse files
                      </span>

                      <input
                        id="resume"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        required
                        onChange={(e) =>
                          setFile(e.target.files?.[0] ?? null)
                        }
                        className="sr-only"
                      />
                    </label>

                    {file && (
                      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-2">
                          <FileText className="h-4 w-4 shrink-0 text-primary" />
                          <span className="truncate text-xs">{file.name}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="shrink-0 text-xs font-medium text-muted transition hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="specialization"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Specialization <span className="text-red-500">*</span>
                    </label>

                    <Select
                      id="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full"
                    >
                      {SPECIALIZATIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.title}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="experienceYears"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Years of experience
                    </label>

                    <input
                      id="experienceYears"
                      type="number"
                      min={0}
                      max={50}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                    <p className="mt-2 text-xs text-muted">
                      Enter 0 if you have no professional experience yet.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="certification"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Certification
                      <span className="ml-2 text-xs font-normal text-muted">
                        Optional
                      </span>
                    </label>

                    <input
                      id="certification"
                      value={certification}
                      onChange={(e) => setCertification(e.target.value)}
                      placeholder="e.g. Electrical installation certification"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div className="border-t border-border/70 pt-5">
                    <Button
                      type="submit"
                      loading={apply.isPending}
                      className="h-12 w-full rounded-xl text-sm font-semibold"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit application
                    </Button>

                    <p className="mt-4 text-center text-xs leading-5 text-muted">
                      Please ensure your resume and information are accurate
                      before submitting.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

const ApplyTechnicianPage = () => {
  return (
    <Suspense fallback={<ApplyTechnicianSkeleton />}>
      <ApplyTechnicianMain />
    </Suspense>
  );
};

export default ApplyTechnicianPage;