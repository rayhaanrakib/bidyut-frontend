
"use client";

import { motion } from "framer-motion";
import { Home, RotateCw, Unplug, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-danger/10 blur-[120px]" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid h-24 w-24 place-items-center rounded-full border border-danger/20 bg-danger/10"
      >
        <Unplug className="h-10 w-10 text-danger" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2"
      >
        <ShieldCheck className="h-4 w-4 text-muted" />
        <span className="text-xs font-medium text-muted">
          Something went wrong
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl"
      >
        We hit a small bump
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.26 }}
        className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base"
      >
        We couldn’t load this page right now. Your account and saved information
        haven’t been intentionally changed by this error. Please try again, or
        return to the home page.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="mt-8 flex w-full max-w-sm flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row"
      >
        <Button onClick={reset} className="min-h-11 gap-2">
          <RotateCw className="h-4 w-4" />
          Try again
        </Button>

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="min-h-11 gap-2"
        >
          Reload page
        </Button>

        <Button variant="ghost"  className="min-h-11 gap-2">
          <Link href="/">
            <Home className="h-3 w-3" />
            Go to home
          </Link>
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-10 max-w-sm text-xs leading-5 text-muted"
      >
        If the problem continues, please try again later or contact our support
        team.
      </motion.p>
    </main>
  );
}
