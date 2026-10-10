import { api } from "@/lib/api";
import type { ActivityLog, HeatmapRow, OperationalStats } from "@/types";

export const operational = () => api<OperationalStats>("/analytics/operational");

export const heatmap = (days = 30) =>
  api<{ windowDays: number; rows: HeatmapRow[] }>(`/analytics/heatmap?days=${days}`);

export const mySummary = () =>
  api<{ totalReports: number; openReports: number; resolvedReports: number; completedPayments: number; totalSpentBDT: number; sla: { slaActive: boolean; slaExpiryDate: string | null } }>("/analytics/my-summary");

export const technicianSummary = () =>
  api<{ assignedReports: number; resolvedReports: number; avgResolutionMinutes: number | null }>("/analytics/technician-summary");

export const activityLogs = (filters: { action?: string; page?: number } = {}) => {
  const params = new URLSearchParams();
  if (filters.action) params.set("action", filters.action);
  params.set("page", String(filters.page ?? 1));
  params.set("limit", "15");
  return api<ActivityLog[]>(`/analytics/activity-logs?${params.toString()}`);
};