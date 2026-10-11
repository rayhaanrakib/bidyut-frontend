
"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const PAGE_SIZE = 5;

export const OutageTable = ({
  reports,
  isLoading,
  emptyLabel,
  renderActions,
}: Props) => {
  const { t } = useI18n();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (!reports?.length) {
    return <EmptyState title={emptyLabel} />;
  }

  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentReports = reports.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="space-y-3">
      {currentReports.map((r) => (
        <div
          key={r.id}
          className="rounded-2xl border border-line bg-card p-5 transition hover:border-accent/35"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-foreground">
                  {r.title ?? "Outage report"}
                </p>
                <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                {r.isPriority && (
                  <Badge tone="emerald">★ {t("reports.priority")}</Badge>
                )}
                {r.isBulkIncident && (
                  <Badge tone="red">🔥 {t("reports.bulk")}</Badge>
                )}
                {r.slaBreached && (
                  <Badge tone="amber">SLA breach</Badge>
                )}
              </div>

              <p className="mt-1.5 line-clamp-2 max-w-2xl text-sm text-muted">
                {r.description}
              </p>

              <p className="mt-2 text-xs text-muted/80">
                {r.area?.name ?? "—"} ·{" "}
                {formatDistanceToNow(new Date(r.reportedAt), {
                  addSuffix: true,
                })}
                {r.technician ? ` · 👷 ${r.technician.name}` : ""}
                {r.resolvedAt
                  ? ` · ✅ ${formatDistanceToNow(new Date(r.resolvedAt), {
                      addSuffix: true,
                    })}`
                  : ""}
              </p>
            </div>

            {renderActions && (
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {renderActions(r)}
              </div>
            )}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <p className="text-sm text-muted">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PAGE_SIZE, reports.length)} of{" "}
            {reports.length} reports
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <span className="min-w-16 text-center text-sm font-medium text-foreground">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
