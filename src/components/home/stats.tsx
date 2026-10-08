"use client";

import { useI18n } from "@/lib/i18n";
import { Counter, FadeIn } from "@/components/ui/misc";

export const Stats = () => {
  const { t } = useI18n();
  const stats = [
    { to: 62, suffix: "", label: "API endpoints" },
    { to: 10, suffix: "", label: "grid models" },
    { to: 4, suffix: "", label: "coordinated roles" },
    { to: 99, suffix: "%", label: "target uptime" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <FadeIn>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t("stats.kicker")}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};