import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSchedule, deleteSchedule, listSchedules, updateScheduleStatus } from "@/api";

export const useSchedules = (page = 1) => {
  return useQuery({
    queryKey: ["schedules", page],
    queryFn: () => listSchedules(page),
  });
};

export const useCreateSchedule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  });
};

export const useUpdateScheduleStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateScheduleStatus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  });
};

export const useDeleteSchedule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schedules"] }),
  });
};