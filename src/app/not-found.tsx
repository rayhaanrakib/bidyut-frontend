"use client";

import { motion } from "framer-motion";
import { Activity, Home, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[11px] uppercase text-muted"
      >
        status · 404 · outage detected
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-4 select-none text-[7rem] font-extrabold leading-none tracking-tighter sm:text-[10rem]"
      >
        <span className="absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 text-primary/15">404</span>
        <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">404</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 200, damping: 14 }}
        className="-mt-2 flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <Zap className="h-4 w-4 animate-pulse" /> Lost in the grid
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.36 }}
        className="mt-4 max-w-md text-sm leading-relaxed text-muted"
      >
        This feeder doesn&apos;t exist — the page you&apos;re after was moved, renamed, or never
        energized. The live grid, however, is one click away.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link href="/">
          <Button>
            <Home className="h-4 w-4" /> Back home
          </Button>
        </Link>
        <Link href="/grid-status">
          <Button variant="outline">
            <Activity className="h-4 w-4" /> Live grid status
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}