"use client";

import { CalendarClock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { usePublicGridStatus } from "@/hooks";
import { FadeIn, SectionHeading, Skeleton } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const SchedulesPreview = () => {
  const { t } = useI18n();
  const demoAreaId = process.env.NEXT_PUBLIC_DEMO_AREA_ID || null;
  const { data, isLoading } = usePublicGridStatus(demoAreaId);
  const next = data?.data?.nextScheduled;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading kicker={t("nav.schedules")} title={t("features.f5.title")} />
      <FadeIn>
        <div className="overflow-hidden rounded-3xl border border-line bg-card">
          <div className="flex items-center justify-between border-b border-line bg-surface/50 px-6 py-4">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="h-4 w-4 text-accent" /> {data?.data?.area?.name ?? "—"}
            </span>
            <Link href="/schedules">
              <Button variant="ghost" size="sm">{t("nav.schedules")} <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </div>
          <div className="p-6">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : next ? (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/50 p-5 transition hover:border-accent/40">
                <div>
                  <p className="font-semibold">{next.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(next.startsAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    {" → "}
                    {new Date(next.endsAt).toLocaleTimeString(undefined, { timeStyle: "short" })}
                  </p>
                </div>
                <Badge tone={next.type === "EMERGENCY" ? "red" : "blue"}>{next.type}</Badge>
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted">{t("hero.allClear")} ✨</p>
            )}
            <p className="mt-5 text-xs leading-relaxed text-muted/70">
              {t("grid.sub")}
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};