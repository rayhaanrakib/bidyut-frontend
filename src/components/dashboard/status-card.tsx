"use client";

import { CalendarClock, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { usePublicGridStatus } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/misc";

export const Countdown = ({ to, prefix }: { to: string; prefix: string }) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(to).getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return (
    <span className="font-mono font-semibold text-primary">
      {prefix} {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
};

export const LiveStatusCard = ({ areaId }: { areaId: string }) => {
  const { t } = useI18n();
  const { data, isLoading } = usePublicGridStatus(areaId);
  const status = data?.data;

  if (isLoading || !status) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className={`flex items-center justify-between px-6 py-5 ${status.loadSheddingNow ? "bg-danger/10" : "bg-emerald-500/10"}`}>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{status.area.name}</h2>
          <p className="mt-0.5 text-xs text-muted">
            {status.area.zone} → {status.area.substation} → {status.area.feeder}
          </p>
        </div>
        <Badge tone={status.loadSheddingNow ? "red" : "emerald"}>
          <span className={`live-dot h-1.5 w-1.5 rounded-full ${status.loadSheddingNow ? "bg-danger text-danger" : "bg-emerald-500 text-emerald-500"}`} />
          {status.loadSheddingNow ? t("hero.liveNow") : t("hero.allClear")}
        </Badge>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <Zap className="h-3 w-3" /> {t("hero.activeReports")}
          </div>
          <p className="mt-2 text-3xl font-extrabold text-primary">{status.activeOutageReports}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <CalendarClock className="h-3 w-3" /> {t("hero.nextOutage")}
          </div>
          {status.nextScheduled ? (
            <div className="mt-2">
              <p className="text-sm font-semibold leading-snug text-foreground">{status.nextScheduled.title}</p>
              <Countdown to={status.nextScheduled.startsAt} prefix={`— ${t("countdown.in")}`} />
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">—</p>
          )}
        </div>
      </div>
    </div>
  );
};