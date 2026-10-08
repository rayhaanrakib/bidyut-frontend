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