"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useHeatmap, useMySummary, useOperationalStats, useTechnicianSummary } from "@/hooks";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/misc";

const OverviewPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">{t("dash.overview")}</h1>
      {user?.role === "CUSTOMER" && <CustomerOverview />}
      {user?.role === "FIELD_TECHNICIAN" && <TechnicianOverview />}
      {(user?.role === "POWER_OPERATOR" || user?.role === "ADMIN") && <OperatorOverview />}
    </div>
  );
};

export default OverviewPage;
export const CustomerOverview = () => {
  const { t } = useI18n();
  const { data, isLoading } = useMySummary();
  if (isLoading || !data) return <Skeleton className="mt-6 h-40 w-full" />;
  const s = data.data;
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("dash.reports")} value={s.totalReports} />
        <StatCard label="Open" value={s.openReports} tone={s.openReports > 0 ? "danger" : "success"} />
        <StatCard label="Resolved" value={s.resolvedReports} tone="success" />
        <StatCard label={t("th.amount")} value={`৳${s.totalSpentBDT}`} hint={`${s.completedPayments} payments`} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5">
        <div>
          <p className="text-sm font-semibold">SLA Subscription</p>
          <p className="mt-1 text-xs text-muted">
            {s.sla?.slaActive
              ? `Active until ${format(new Date(s.sla.slaExpiryDate!), "d MMM yyyy")}`
              : t("reports.slaBanner")}
          </p>
        </div>
        {s.sla?.slaActive ? (
          <Badge tone="emerald">ACTIVE</Badge>
        ) : (
          <Link href="/customer/payments"><Button size="sm">{t("pay.buySla")}</Button></Link>
        )}
      </div>
    </div>
  );
};

export const TechnicianOverview = () => {
  const { t } = useI18n();
  const { data, isLoading } = useTechnicianSummary();
  if (isLoading || !data) return <Skeleton className="mt-6 h-40 w-full" />;
  const s = data.data;
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <StatCard label="Assigned" value={s.assignedReports} />
      <StatCard label="Resolved" value={s.resolvedReports} tone="success" />
      <StatCard label="Avg. fix time" value={s.avgResolutionMinutes !== null ? `${s.avgResolutionMinutes}m` : "—"} />
    </div>
  );
};

export const OperatorOverview = () => {
  const { t } = useI18n();
  const { data, isLoading } = useOperationalStats();
  const { data: heat } = useHeatmap(30);
  if (isLoading || !data) return <Skeleton className="mt-6 h-40 w-full" />;
  const s = data.data;
  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Pending" value={s.outages.pending} tone={s.outages.pending > 0 ? "danger" : "success"} />
        <StatCard label="Assigned" value={s.outages.assigned} />
        <StatCard label="In progress" value={s.outages.inProgress} />
        <StatCard label="Resolved today" value={s.outages.resolvedToday} tone="success" />
        <StatCard label="Upcoming schedules" value={s.upcomingSchedules} />
      </div>
      {heat?.data?.rows?.[0] && (
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">{t("an.worstAreas")}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold">{heat.data.rows[0].areaName}</span>
            <span className="text-sm text-muted">{heat.data.rows[0].reportCount} reports / 30d</span>
          </div>
          <Link href="/operator/analytics" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            {t("dash.analytics")} →
          </Link>
        </div>
      )}
    </div>
  );
};