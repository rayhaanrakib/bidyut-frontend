"use client";

import { motion } from "framer-motion";
import { Home, RotateCw, Unplug } from "lucide-react";
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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-danger/20 blur-[120px]" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid h-24 w-24 place-items-center rounded-full border border-danger/30 bg-danger/10"
      >
        <Unplug className="h-10 w-10 text-danger" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.35em] text-muted"
      >
        Circuit breaker tripped
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl"
      >
        POWER&nbsp;FAILURE
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.26 }}
        className="mt-4 max-w-md text-sm leading-relaxed text-muted"
      >
        {error.message || "An unexpected error occurred on this section of the grid."}
      </motion.p>
      {error.digest && (
        <p className="mt-3 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
          digest · {error.digest}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Button onClick={reset}>
          <RotateCw className="h-4 w-4" /> Restore power
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload page
        </Button>
        <Link href="/">
          <Button variant="ghost">
            <Home className="h-4 w-4" /> Go home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}