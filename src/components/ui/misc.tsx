"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-surface", className)} />
);

export const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }} className={className}>
    {children}
  </motion.div>
);

export const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setN((v) => (v >= to ? (clearInterval(t), to) : v + Math.max(1, Math.round(to / 40)))), 30);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
};

export const SectionHeading = ({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) => (
  <FadeIn className="mx-auto max-w-2xl text-center mb-12">
    {kicker && <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{kicker}</p>}
    <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
    {sub && <p className="mt-3 leading-relaxed text-muted">{sub}</p>}
  </FadeIn>
);