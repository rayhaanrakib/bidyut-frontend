"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAssignTechnician, useOutages, useTechnicians } from "@/hooks";
import { OutageTable } from "@/components/dashboard/outage-table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/misc";
import { cn } from "@/lib/utils";
import type { OutageReport } from "@/types";

const OutagesView = () => {
  const { t } = useI18n();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "";
  const priorityOnly = searchParams.get("priority") === "true";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.delete("page");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const { data, isLoading } = useOutages({
    status: status || undefined,
    isPriority: priorityOnly ? "true" : undefined,
    page,
  });

  const [target, setTarget] = useState<OutageReport | null>(null);
  const technicians = useTechnicians();
  const assign = useAssignTechnician();

  const doAssign = async (technicianId: string) => {
    if (!target) return;
    try {
      await assign.mutateAsync({ id: target.id, technicianId });
      toast.success("Technician assigned");
      setTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Assign failed");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {t("dash.allOutages")}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParam("priority", priorityOnly ? "" : "true")}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
              priorityOnly
                ? "border-accent/60 bg-primary/12 text-primary"
                : "border-line text-muted hover:bg-surface",
            )}
          >
            ★ Priority only
          </button>
          <Select
            value={status}
            onChange={(e) => setParam("status", e.target.value)}
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
      </div>

      <div className="mt-6">
        <OutageTable
          reports={data?.data}
          isLoading={isLoading}
          emptyLabel={t("c.empty")}
          renderActions={(r) =>
            r.status === "PENDING" ? (
              <Button size="sm" variant="outline" onClick={() => setTarget(r)}>
                {t("assign.button")}
              </Button>
            ) : null
          }
        />
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setParam("page", String(page - 1))}
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
            onClick={() => setParam("page", String(page + 1))}
          >
            →
          </Button>
        </div>
      )}

      <Modal
        open={Boolean(target)}
        onClose={() => setTarget(null)}
        title={t("assign.title")}
      >
        {technicians.isLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <div className="space-y-2">
            {technicians.data?.data?.length === 0 && (
              <p className="py-4 text-center text-sm text-muted">
                No technicians yet — seed one or promote a user.
              </p>
            )}
            {technicians.data?.data?.map((tech) => (
              <button
                key={tech.id}
                onClick={() => doAssign(tech.id)}
                disabled={assign.isPending}
                className="flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-left text-sm transition hover:border-accent/50 hover:bg-surface"
              >
                <span>
                  <span className="font-semibold">{tech.name}</span>
                  <span className="ml-2 text-xs text-muted">{tech.email}</span>
                </span>
                <span className="text-xs font-semibold text-primary">
                  {t("assign.button")} →
                </span>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OutagesView;
