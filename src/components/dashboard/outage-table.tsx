"use client";

import { formatDistanceToNow } from "date-fns";
import { useI18n } from "@/lib/i18n";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton, EmptyState } from "@/components/ui/misc";
import type { OutageReport } from "@/types";

interface Props {
  reports: OutageReport[] | undefined;
  isLoading: boolean;
  emptyLabel: string;
  renderActions?: (report: OutageReport) => React.ReactNode;
}

export const OutageTable = ({ reports, isLoading, emptyLabel, renderActions }: Props) => {
  const { t } = useI18n();

  if (isLoading) {
    return <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }
  if (!reports?.length) return <EmptyState title={emptyLabel} />;

  return (
    <div className="space-y-3">
      {reports.map((r) => (
        <div key={r.id} className="rounded-2xl border border-line bg-card p-5 transition hover:border-accent/35">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{r.title ?? "Outage report"}</p>
                <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                {r.isPriority && <Badge tone="emerald">★ {t("reports.priority")}</Badge>}
                {r.isBulkIncident && <Badge tone="red">🔥 {t("reports.bulk")}</Badge>}
                {r.slaBreached && <Badge tone="amber">SLA breach</Badge>}
              </div>
              <p className="mt-1.5 line-clamp-2 max-w-2xl text-sm text-muted">{r.description}</p>
              <p className="mt-2 text-xs text-muted/80">
                {r.area?.name ?? "—"} · {formatDistanceToNow(new Date(r.reportedAt), { addSuffix: true })}
                {r.technician ? ` · 👷 ${r.technician.name}` : ""}
                {r.resolvedAt ? ` · ✅ ${formatDistanceToNow(new Date(r.resolvedAt), { addSuffix: true })}` : ""}
              </p>
            </div>
            {renderActions && <div className="flex shrink-0 flex-wrap items-center gap-2">{renderActions(r)}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};