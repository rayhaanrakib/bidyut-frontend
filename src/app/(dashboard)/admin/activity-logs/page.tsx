
"use client";

import { format } from "date-fns";
import {
  Activity,
  ArrowDownLeft,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  CreditCard,
  FileText,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useActivityLogs } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton, EmptyState } from "@/components/ui/misc";

type ActionTone =
  | "emerald"
  | "red"
  | "amber"
  | "blue"
  | "violet"
  | "neutral";

const getActionDetails = (action: string) => {
  const normalized = action.toUpperCase();

  if (normalized.includes("REFUND")) {
    return {
      title: "Refund processed",
      description: "A refund-related action was recorded.",
      tone: "amber" as ActionTone,
      icon: ArrowDownLeft,
    };
  }

  if (
    normalized.includes("BLOCKED") ||
    normalized.includes("DELETED") ||
    normalized.includes("FAILED")
  ) {
    return {
      title: normalized.includes("BLOCKED")
        ? "Access blocked"
        : normalized.includes("DELETED")
          ? "Record deleted"
          : "Action failed",
      description: "A restricted or unsuccessful action was recorded.",
      tone: "red" as ActionTone,
      icon: CircleAlert,
    };
  }

  if (
    normalized.includes("PAYMENT") ||
    normalized.includes("PAID")
  ) {
    return {
      title: "Payment activity",
      description: "A payment-related action was recorded.",
      tone: "emerald" as ActionTone,
      icon: CreditCard,
    };
  }

  if (
    normalized.includes("ASSIGNED") ||
    normalized.includes("TECHNICIAN")
  ) {
    return {
      title: "Technician assignment",
      description: "A technician-related update was recorded.",
      tone: "blue" as ActionTone,
      icon: UserRound,
    };
  }

  if (
    normalized.includes("STATUS") ||
    normalized.includes("RESOLVED") ||
    normalized.includes("COMPLETED")
  ) {
    return {
      title: "Status updated",
      description: "The status of a record was changed.",
      tone: "emerald" as ActionTone,
      icon: CheckCircle2,
    };
  }

  if (
    normalized.includes("ROLE") ||
    normalized.includes("PERMISSION") ||
    normalized.includes("LOGIN")
  ) {
    return {
      title: "Account activity",
      description: "An account or permission change was recorded.",
      tone: "violet" as ActionTone,
      icon: ShieldCheck,
    };
  }

  if (
    normalized.includes("OUTAGE") ||
    normalized.includes("REPORT")
  ) {
    return {
      title: "Outage report activity",
      description: "An outage report was created or updated.",
      tone: "blue" as ActionTone,
      icon: Activity,
    };
  }

  return {
    title: normalized
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    description: "An activity was recorded in the system.",
    tone: "neutral" as ActionTone,
    icon: FileText,
  };
};

const formatLabel = (value: string) =>
  value
    .replaceAll("_", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const ActivityLogsPage = () => {
  const { t } = useI18n();
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const { data, isLoading } = useActivityLogs({
    action: action.trim() || undefined,
    page,
  });

  const logs = data?.data ?? [];

  const selectedLog = useMemo(
    () => logs.find((log) => log.id === selectedLogId),
    [logs, selectedLogId],
  );

  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#0b1411] p-6 text-white sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
              <Activity className="h-3.5 w-3.5" />
              System activity
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("dash.activity")}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              Keep track of important changes, account activity, payments, and
              outage updates in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">
                {isLoading ? "—" : logs.length}
              </p>
              <p className="text-xs text-white/50">Activities on this page</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Activity history</h2>
            <p className="mt-1 text-sm text-muted">
              Search for a type of activity to find relevant records.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

            <Input
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
                setPage(1);
                setSelectedLogId(null);
              }}
              placeholder="Search payments, roles, outages..."
              className="w-full pl-9 pr-10"
              aria-label="Search activity history"
            />

            {action && (
              <button
                type="button"
                onClick={() => {
                  setAction("");
                  setPage(1);
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </>
        ) : logs.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card px-5 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-muted">
              <Search className="h-6 w-6" />
            </div>
            <EmptyState title={t("c.empty")} />
            {action && (
              <p className="mt-2 text-sm text-muted">
                Try a different search term or clear your search.
              </p>
            )}
            {action && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAction("");
                  setPage(1);
                }}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          logs.map((log) => {
            const details = getActionDetails(log.action);
            const ActionIcon = details.icon;
            const expanded = selectedLogId === log.id;

            return (
              <article
                key={log.id}
                className="overflow-hidden rounded-2xl border border-line bg-card transition duration-200 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-black/[0.03]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedLogId(expanded ? null : log.id)
                  }
                  aria-expanded={expanded}
                  className="flex w-full flex-col gap-4 p-4 text-left sm:p-5 md:flex-row md:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                      <ActionIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{details.title}</h3>
                        <Badge tone={details.tone}>{formatLabel(log.action)}</Badge>
                      </div>

                      <p className="mt-1 text-sm leading-5 text-muted">
                        {details.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <UserRound className="h-3.5 w-3.5" />
                          {log.actor?.name ?? "System"}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          {formatLabel(log.entity)}
                          {log.entityId
                            ? ` · Ref ${log.entityId.slice(0, 8)}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-line pt-3 md:border-0 md:pt-0">
                    <div className="flex items-center gap-2 text-xs text-muted sm:text-sm">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {format(new Date(log.createdAt), "d MMM yyyy, HH:mm")}
                      </span>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {expanded && (
                  <div className="border-t border-line bg-surface/50 px-4 py-5 sm:px-5">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-line bg-card p-4">
                        <p className="text-xs font-medium text-muted">
                          Activity
                        </p>
                        <p className="mt-2 break-words text-sm font-semibold">
                          {formatLabel(log.action)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-line bg-card p-4">
                        <p className="text-xs font-medium text-muted">
                          Performed by
                        </p>
                        <p className="mt-2 break-words text-sm font-semibold">
                          {log.actor?.name ?? "System"}
                        </p>
                        {log.actor?.role && (
                          <p className="mt-1 text-xs text-muted">
                            {formatLabel(log.actor.role)}
                          </p>
                        )}
                      </div>

                      <div className="rounded-xl border border-line bg-card p-4">
                        <p className="text-xs font-medium text-muted">
                          Related record
                        </p>
                        <p className="mt-2 break-words text-sm font-semibold">
                          {formatLabel(log.entity)}
                        </p>
                        {log.entityId && (
                          <p className="mt-1 break-all font-mono text-xs text-muted">
                            {log.entityId}
                          </p>
                        )}
                      </div>
                    </div>

                    {log.metadata &&
                      Object.keys(log.metadata).length > 0 && (
                        <div className="mt-4 rounded-xl border border-line bg-card p-4">
                          <h4 className="mb-3 text-sm font-semibold">
                            Additional details
                          </h4>

                          <dl className="grid gap-3 sm:grid-cols-2">
                            {Object.entries(log.metadata).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="min-w-0 rounded-lg bg-surface p-3"
                                >
                                  <dt className="text-xs font-medium text-muted">
                                    {formatLabel(key)}
                                  </dt>
                                  <dd className="mt-1 whitespace-pre-wrap break-words text-sm">
                                    {formatValue(value)}
                                  </dd>
                                </div>
                              ),
                            )}
                          </dl>
                        </div>
                      )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Page <span className="font-semibold text-foreground">{page}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => {
                setPage((current) => current - 1);
                setSelectedLogId(null);
              }}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => {
                setPage((current) => current + 1);
                setSelectedLogId(null);
              }}
            >
              Next
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsPage;
