"use client";

import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

const mock = [
  { name: "Mirpur 10", count: 14, minutes: 96 },
  { name: "Halishahar", count: 11, minutes: 88 },
  { name: "Agrabad", count: 9, minutes: 74 },
  { name: "Uttara Sector 4", count: 6, minutes: 65 },
  { name: "Bashundhara R/A", count: 4, minutes: 52 },
];

export const AnalyticsPreview = () => {
  const { t } = useI18n();
  const max = Math.max(...mock.map((m) => m.count));

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker={t("an.kicker")}
        title={t("an.title")}
        sub={t("an.sub")}
      />
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t("an.worstAreas")}
              </p>
              <div className="mt-5 space-y-4">
                {mock.map((m, i) => (
                  <div key={m.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-semibold">{m.name}</span>
                      <span className="text-muted">
                        {m.count} · {m.minutes} {t("an.avgFix")}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                        style={{
                          width: `${(m.count / max) * 100}%`,
                          transitionDelay: `${i * 90}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "4h", l: t("pricing.sla.f2") },
              { v: "24/7", l: t("features.f2.title") },
              { v: "15min", l: t("features.f6.title") },
              { v: "100%", l: t("faq.q4") },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-line bg-card p-6 transition hover:border-accent/40"
              >
                <p className="text-3xl font-extrabold text-gradient">{s.v}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
