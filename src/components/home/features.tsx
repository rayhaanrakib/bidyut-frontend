"use client";

import { BellRing, Flame, LineChart, Radio, ShieldCheck, Timer, Zap, CalendarClock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const Features = () => {
  const { t } = useI18n();
  const items = [
    { icon: Zap, title: "features.f1.title" as const, body: "features.f1.body" as const },
    { icon: Timer, title: "features.f2.title" as const, body: "features.f2.body" as const },
    { icon: ShieldCheck, title: "features.f3.title" as const, body: "features.f3.body" as const },
    { icon: BellRing, title: "features.f4.title" as const, body: "features.f4.body" as const },
    { icon: CalendarClock, title: "features.f5.title" as const, body: "features.f5.body" as const },
    { icon: Flame, title: "features.f6.title" as const, body: "features.f6.body" as const },
    { icon: LineChart, title: "features.f7.title" as const, body: "features.f7.body" as const },
    { icon: Radio, title: "features.f8.title" as const, body: "features.f8.body" as const },
  ];
  return (
    <section id="features" className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("features.kicker")} title={t("features.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 4) * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{t(item.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(item.body)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};