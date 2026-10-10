import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignTechnician,
  cancelReport,
  listOutages,
  reportOutage,
  updateOutageStatus,
} from "@/api";
import type { Envelope } from "@/lib/api";
import type { OutageFilters, OutageReport } from "@/types";

export const useOutages = (filters: OutageFilters = {}) => {
  return useQuery({
    queryKey: ["outages", filters],
    queryFn: () => listOutages({ ...filters }),
  });
};

export const useReportOutage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reportOutage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["outages"] }),
  });
};

export const useUpdateOutageStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOutageStatus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["outages"] }),
  });
};

export const useAssignTechnician = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: assignTechnician,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["outages"] }),
  });
};

export const useCancelReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelReport,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["outages"] }),
  });
};

export const useCancelReportOptimistic = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelReport,
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["outages"] });
      const previous = qc.getQueriesData<Envelope<OutageReport[]>>({ queryKey: ["outages"] });
      qc.setQueriesData<Envelope<OutageReport[]>>({ queryKey: ["outages"] }, (old) =>
        old ? { ...old, data: old.data.filter((r) => r.id !== id) } : old,
      );
      return { previous };
    },
    onError: (_e, _id, ctx) => ctx?.previous.forEach(([key, data]) => qc.setQueryData(key, data)),
    onSettled: () => qc.invalidateQueries({ queryKey: ["outages"] }),
  });
};