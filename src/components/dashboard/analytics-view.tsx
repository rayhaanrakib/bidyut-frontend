"use client";

import { useI18n } from "@/lib/i18n";
import { useHeatmap, useOperationalStats } from "@/hooks";
import { StatCard } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/misc";

const AnalyticsView = () => {
  const { t } = useI18n();
  const { data: ops, isLoading } = useOperationalStats();
  const { data: heat, isLoading: heatLoading } = useHeatmap(30);

  const rows = heat?.data?.rows ?? [];
  const max = Math.max(1, ...rows.map((r) => r.reportCount));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{t("dash.analytics")}</h1>

      {isLoading || !ops ? (
        <Skeleton className="h-36 w-full" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total" value={ops.data.outages.totalReports} />
          <StatCard label="Pending" value={ops.data.outages.pending} tone={ops.data.outages.pending ? "danger" : "success"} />
          <StatCard label="Assigned" value={ops.data.outages.assigned} />
          <StatCard label="In progress" value={ops.data.outages.inProgress} />
          <StatCard label="Resolved today" value={ops.data.outages.resolvedToday} tone="success" />
          <StatCard label="SLA subs" value={ops.data.users.activeSlaSubscriptions} />
        </div>
      )}

      <div className="rounded-3xl border border-line bg-card p-6">
        <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">🔥 {t("an.worstAreas")}</h2>
          <span className="text-xs text-muted">GET /analytics/heatmap?days=30</span>
        </div>
        <div className="mt-6 space-y-4">
          {heatLoading && <Skeleton className="h-40 w-full" />}
          {!heatLoading && rows.length === 0 && <p className="py-8 text-center text-sm text-muted">{t("c.empty")}</p>}
          {rows.map((r) => (
            <div key={r.areaId}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{r.areaName} <span className="font-normal text-muted">· {r.feederName}</span></span>
                <span className="text-muted">
                  {r.reportCount} reports{r.avgResolutionMinutes !== null ? ` · ${r.avgResolutionMinutes}m ${t("an.avgFix")}` : ""}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                  style={{ width: `${(r.reportCount / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;