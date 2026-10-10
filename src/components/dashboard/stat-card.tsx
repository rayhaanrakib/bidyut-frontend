"use client";

import { cn } from "@/lib/utils";

export const StatCard = ({ label, value, hint, tone }: { label: string; value: React.ReactNode; hint?: string; tone?: "default" | "danger" | "success" }) => {
  return (
    <div className="rounded-2xl border border-line bg-card p-5 transition hover:border-accent/40">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">{label}</p>
      <p className={cn(
        "mt-2 text-3xl font-extrabold tracking-tight",
        tone === "danger" && "text-danger", tone === "success" && "text-emerald-500", (!tone || tone === "default") && "text-primary",
      )}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
};