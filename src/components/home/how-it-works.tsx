"use client";

import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const HowItWorks = () => {
  const { t } = useI18n();
  const steps = [
    { n: "01", title: "how.s1.title" as const, body: "how.s1.body" as const },
    { n: "02", title: "how.s2.title" as const, body: "how.s2.body" as const },
    { n: "03", title: "how.s3.title" as const, body: "how.s3.body" as const },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading kicker={t("how.kicker")} title={t("how.title")} />
      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent md:block" />
        {steps.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.15} className="relative text-center">
            <div className="mx-auto flex items-center justify-center rounded-2xl border border-line bg-card font-mono text-lg font-bold text-primary shadow-[0_0_30px_-10px] shadow-accent/40" style={{ height: 72, width: 72 }}>
              {s.n}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{t(s.title)}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{t(s.body)}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};