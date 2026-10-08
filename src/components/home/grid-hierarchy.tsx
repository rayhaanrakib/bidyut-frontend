"use client";

import { ArrowRight, Landmark, Network, Split, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const GridHierarchy = () => {
  const { t } = useI18n();
  const nodes = [
    { icon: Landmark, label: t("grid.zone"), example: "Dhaka Central" },
    { icon: Network, label: t("grid.substation"), example: "Mirpur 132/33 kV" },
    { icon: Split, label: t("grid.feeder"), example: "Feeder 11" },
    { icon: MapPin, label: t("grid.area"), example: "Mirpur 10" },
  ];
  return (
    <section className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("grid.kicker")} title={t("grid.title")} sub={t("grid.sub")} />
        <div className="flex flex-col items-stretch justify-center gap-3 lg:flex-row lg:items-center">
          {nodes.map((n, i) => (
            <FadeIn key={n.label} delay={i * 0.12} className="contents">
              <div className="group flex items-center gap-3 rounded-2xl border border-line bg-card p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-lg lg:flex-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <n.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">{n.label}</p>
                  <p className="truncate text-sm font-semibold">{n.example}</p>
                </div>
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight className="mx-2 hidden h-4 w-4 shrink-0 text-accent lg:block" />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};