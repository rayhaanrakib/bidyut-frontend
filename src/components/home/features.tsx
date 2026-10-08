"use client";

import { BellRing, Flame, LineChart, Radio, ShieldCheck, Timer, Zap, CalendarClock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const Features = () => {
  const { t } = useI18n();
  const items = [
    { icon: Zap, k: "f1" }, { icon: Timer, k: "f2" }, { icon: ShieldCheck, k: "f3" }, { icon: BellRing, k: "f4" },
    { icon: CalendarClock, k: "f5" }, { icon: Flame, k: "f6" }, { icon: LineChart, k: "f7" }, { icon: Radio, k: "f8" },
  ];
  return (
    <section id="features" className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("features.kicker")} title={t("features.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.k} delay={(i % 4) * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{t(`features.${item.k}.title` as const)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`features.${item.k}.body` as const)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};