"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export const Faq = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const items = [1, 2, 3, 4, 5].map((i) => ({ q: t(`faq.q${i}` as const), a: t(`faq.a${i}` as const) }));

  return (
    <section className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading kicker={t("faq.kicker")} title={t("faq.title")} />
        <div className="space-y-3">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className={cn("overflow-hidden rounded-2xl border bg-card transition-colors", open === i ? "border-accent/40" : "border-line")}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left text-sm font-semibold"
                  aria-expanded={open === i}
                >
                  {item.q}
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-300", open === i && "rotate-180 text-accent")} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};