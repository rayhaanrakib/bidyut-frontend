"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import {
  useCancelReport,
  useCheckout,
  useOutages,
  useUpdateOutageStatus,
} from "@/hooks";
import { OutageTable } from "@/components/dashboard/outage-table";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

const ReportsView = () => {
  const { user } = useAuth();
  const { t } = useI18n();

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Track which report is currently processing priority checkout.
  const [priorityLoadingId, setPriorityLoadingId] = useState<string | null>(
    null
  );

  const { data, isLoading } = useOutages({
    status: status || undefined,
    page,
  });

  const cancel = useCancelReport();
  const checkout = useCheckout();
  const updateStatus = useUpdateOutageStatus();

  const isCustomer = user?.role === "CUSTOMER";
  const isTechnician = user?.role === "FIELD_TECHNICIAN";

  const payPriority = async (reportId: string) => {
    // Set loading only for the selected report.
    setPriorityLoadingId(reportId);

    try {
      const res = await checkout.mutateAsync({
        type: "PRIORITY_RESTORATION",
        outageReportId: reportId,
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Checkout failed"
      );
    } finally {
      // Clear the loading state when checkout finishes or fails.
      setPriorityLoadingId(null);
    }
  };

  const advance = async (report: { id: string; status: string }) => {
    const next =
      report.status === "ASSIGNED" ? "IN_PROGRESS" : "RESOLVED";

    try {
      await updateStatus.mutateAsync({
        id: report.id,
        status: next,
      });

      toast.success(
        `Marked ${next.replace("_", " ").toLowerCase()}`
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Update failed"
      );
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          {isTechnician ? t("dash.assignments") : t("dash.reports")}
        </h1>

        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="w-44"
          aria-label={t("th.status")}
        >
          <option value="">All statuses</option>

          {[
            "PENDING",
            "ASSIGNED",
            "IN_PROGRESS",
            "RESOLVED",
            "CANCELLED",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-6">
        <OutageTable
          reports={data?.data}
          isLoading={isLoading}
          emptyLabel={t("c.empty")}
          renderActions={(r) => (
            <>
              {isCustomer &&
                r.status === "PENDING" &&
                !r.isPriority && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => payPriority(r.id)}
                    loading={priorityLoadingId === r.id}
                    disabled={priorityLoadingId !== null}
                  >
                    {t("reports.payPriority")}
                  </Button>
                )}

              {isCustomer && r.status === "PENDING" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-danger"
                  onClick={async () => {
                    try {
                      await cancel.mutateAsync(r.id);
                      toast.success("Report cancelled");
                    } catch (err) {
                      toast.error(
                        err instanceof Error
                          ? err.message
                          : "Cancel failed"
                      );
                    }
                  }}
                >
                  {t("reports.cancel")}
                </Button>
              )}

              {isTechnician && r.status === "ASSIGNED" && (
                <Button
                  size="sm"
                  onClick={() => advance(r)}
                >
                  Start work
                </Button>
              )}

              {isTechnician && r.status === "IN_PROGRESS" && (
                <Button
                  size="sm"
                  onClick={() => advance(r)}
                >
                  Mark resolved
                </Button>
              )}
            </>
          )}
        />
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            ←
          </Button>

          <span className="text-muted">
            {page} / {data.meta.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= data.meta.totalPages}
            onClick={() => setPage(page + 1)}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReportsView;