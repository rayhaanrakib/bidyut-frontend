"use client";

import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/misc";
import { usePublicGridStatus, useSchedules } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

const SchedulesPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { data, isLoading } = useSchedules(1);
  const demo = process.env.NEXT_PUBLIC_DEMO_AREA_ID || null;
  const { data: pub } = usePublicGridStatus(demo);

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("nav.schedules")}</h1>
        <p className="mt-2 text-sm text-muted">{t("features.f5.body")}</p>

        {!user && pub?.data?.nextScheduled && (
          <div className="mt-6 rounded-2xl border border-line bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("hero.nextOutage")} — {pub.data.area.name}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold">{pub.data.nextScheduled.title}</p>
              <Badge tone="blue">{pub.data.nextScheduled.type}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted">
              {format(new Date(pub.data.nextScheduled.startsAt), "EEE d MMM, HH:mm")} → {format(new Date(pub.data.nextScheduled.endsAt), "HH:mm")}
            </p>
          </div>
        )}

        {user ? (
          <div className="mt-8 space-y-3">
            {isLoading && <Skeleton className="h-24 w-full" />}
            {data?.data?.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5 transition hover:border-accent/40">
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {format(new Date(s.startTime), "EEE d MMM, HH:mm")} → {format(new Date(s.endTime), "HH:mm")} ·{" "}
                    {formatDistanceToNow(new Date(s.startTime), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={s.type === "EMERGENCY" ? "red" : "blue"}>{s.type}</Badge>
                  <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-sm text-muted">{t("auth.toLogin")}</p>
            <Link href="/login" className="mt-4 inline-block">
              <Button size="sm">{t("nav.login")}</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SchedulesPage;