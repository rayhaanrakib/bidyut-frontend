"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const AuthShell = ({ title, subtitle, children }: AuthShellProps) => {
  return (
    <div className="container mx-auto grid min-h-screen lg:grid-cols-2 px-8 py-20">
      <aside className="relative hidden flex-col justify-center border-r border-line px-12 py-16 lg:flex xl:px-20">
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
      </aside>

      <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-md rounded-2xl border border-line p-6 sm:p-9"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </motion.div>
      </main>
    </div>
  );
};