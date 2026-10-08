"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useId } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "bn", label: "বাংলা" },
];

export const LangToggle = ({ className }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  const pillId = useId();
  return (
    <div
      role="group"
      aria-label="Language / ভাষা"
      className={cn("flex items-center gap-0.5 rounded-xl border border-line bg-surface p-1", className)}
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
      {OPTIONS.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            title={o.id === "en" ? "English" : "বাংলা"}
            className={cn(
              "relative cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold transition",
              active ? "text-primary-foreground" : "text-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-lg bg-primary"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
};