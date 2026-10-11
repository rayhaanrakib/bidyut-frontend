"use client";

import { Suspense, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const AuthShellSkeleton = () => {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden bg-[#09130f] text-white lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:p-10 xl:p-14 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/10" />
          <div className="space-y-1.5">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-2.5 w-32 rounded bg-white/5" />
          </div>
        </div>

        <div className="my-16 max-w-2xl space-y-7">
          <div className="h-7 w-60 rounded-full bg-white/10" />
          <div className="space-y-4">
            <div className="h-12 w-full rounded-xl bg-white/10 xl:h-16" />
            <div className="h-12 w-3/4 rounded-xl bg-white/10 xl:h-16" />
          </div>
          <div className="space-y-2 max-w-md">
            <div className="h-4 w-full rounded bg-white/5" />
            <div className="h-4 w-4/5 rounded bg-white/5" />
          </div>
          <div className="h-5 w-48 rounded bg-white/5" />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div className="h-3 w-36 rounded bg-white/5" />
          <div className="h-3 w-28 rounded bg-white/5" />
        </div>
      </aside>

      <section className="relative flex min-h-screen flex-col px-4 py-5 sm:px-8 sm:py-8 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between lg:hidden animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-neutral-200/40 dark:bg-neutral-800/40" />
            <div className="h-4 w-20 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
          </div>
          <div className="h-8 w-16 rounded-full bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-14 lg:py-8">
          <div className="w-full max-w-[440px] animate-pulse">
            <div className="mb-8 lg:mb-10">
              <div className="mb-5 h-1 w-10 rounded-full bg-emerald-400/50" />
              <div className="h-9 w-3/4 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10" />
              <div className="mt-3 h-4 w-1/2 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>

            <div className="rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[28px] sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-16 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
              </div>
              <div className="h-10 w-full rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />
            </div>

            <div className="mx-auto mt-6 h-3.5 w-56 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
          </div>
        </div>
      </section>
    </main>
  );
};

const AuthShellMain = ({
  title,
  subtitle,
  children,
}: AuthShellProps) => {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden bg-[#09130f] text-white lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "linear-gradient(to bottom right, black, transparent 85%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-emerald-400/15 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[100px]"
        />

        <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300 text-[#07130f] shadow-lg shadow-emerald-300/15">
            <Zap className="h-6 w-6 fill-current" />
          </span>

          <span>
            <span className="block text-lg font-black tracking-[0.16em]">
              BIDYUT
            </span>
            <span className="mt-0.5 block text-[9px] tracking-[0.2em] text-white/45">
              POWER MANAGEMENT
            </span>
          </span>
        </Link>

        <div className="relative z-10 my-16 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-emerald-300">
            <Activity className="h-3.5 w-3.5" />
            GRID INTELLIGENCE PLATFORM
          </div>

          <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] xl:text-7xl">
            Every power cut,
            <br />
            <span className="text-emerald-300">tracked in real time.</span>
          </h2>

          <p className="mt-7 max-w-md text-sm leading-7 text-white/55 xl:text-base">
            Zone → Substation → Feeder → Area.
            <br />
            One connected view of power distribution.
          </p>

          <div className="mt-12 flex max-w-md items-center gap-3 border-t border-white/10 pt-5">
            <div className="flex -space-x-1">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-300/50" />
              <span className="h-2 w-2 rounded-full bg-emerald-300/20" />
            </div>
            <span className="text-[11px] tracking-wide text-white/40">
              MONITOR · REPORT · RESTORE
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] tracking-[0.12em] text-white/35">
          <span>BANGLADESH POWER UTILITY</span>
          <span>BUILT FOR CLARITY</span>
        </div>
      </aside>

      <section className="relative flex min-h-screen flex-col px-4 py-5 sm:px-8 sm:py-8 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f]">
              <Zap className="h-5 w-5 fill-current" />
            </span>

            <span className="text-base font-black tracking-[0.14em]">
              BIDYUT
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted transition hover:text-foreground"
          >
            Home
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-14 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[440px]"
          >
            <div className="mb-8 lg:mb-10">
              <div className="mb-5 h-1 w-10 rounded-full bg-emerald-400" />

              <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted sm:text-[15px]">
                {subtitle}
              </p>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[28px] sm:p-8">
              {children}
            </div>

            <p className="mt-6 text-center text-[11px] leading-5 text-muted/75">
              BIDYUT · Bangladesh power utility platform
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export const AuthShell = (props: AuthShellProps) => {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <AuthShellMain {...props} />
    </Suspense>
  );
};