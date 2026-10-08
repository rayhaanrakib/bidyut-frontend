"use client";

import { EyeOff, PhoneOff, HeartPulse } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const Problem = () => {
  const { t } = useI18n();
  const cards = [
    { icon: EyeOff, title: t("problem.p1.title"), body: t("problem.p1.body") },
    { icon: PhoneOff, title: t("problem.p2.title"), body: t("problem.p2.body") },
    { icon: HeartPulse, title: t("problem.p3.title"), body: t("problem.p3.body") },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading kicker={t("problem.kicker")} title={t("problem.title")} />
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <FadeIn key={c.title} delay={i * 0.1}>
            <div className="group h-full rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px] hover:shadow-accent/25">
              <c.icon className="h-7 w-7 text-danger transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};