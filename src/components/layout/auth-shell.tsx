"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const AuthShell = ({ title, subtitle, children }: AuthShellProps) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 py-12">
      <aside className="relative hidden flex-col justify-center border-r border-line px-12 py-16 lg:flex xl:px-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">
            Every power cut,{" "}
            <span className="text-gradient">tracked in real time.</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            Zone → Substation → Feeder → Area. Sixty-two endpoints of grid
            intelligence behind one clean interface.
          </p>
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