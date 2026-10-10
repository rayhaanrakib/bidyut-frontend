import { useQuery } from "@tanstack/react-query";
import { activityLogs, heatmap, mySummary, operational, technicianSummary } from "@/api";

export const useOperationalStats = () => {
  return useQuery({
    queryKey: ["analytics-operational"],
    queryFn: () => operational(),
    refetchInterval: 60_000,
  });
};

export const useHeatmap = (days = 30) => {
  return useQuery({
    queryKey: ["analytics-heatmap", days],
    queryFn: () => heatmap(days),
  });
};

export const useMySummary = () => {
  return useQuery({
    queryKey: ["my-summary"],
    queryFn: () => mySummary(),
  });
};

export const useTechnicianSummary = () => {
  return useQuery({
    queryKey: ["tech-summary"],
    queryFn: () => technicianSummary(),
  });
};

export const useActivityLogs = (filters: { action?: string; page?: number } = {}) => {
  return useQuery({
    queryKey: ["activity-logs", filters],
    queryFn: () => activityLogs(filters),
  });
};