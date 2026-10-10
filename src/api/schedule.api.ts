import { api } from "@/lib/api";
import type { Schedule } from "@/types";

export const listSchedules = (page = 1) =>
  api<Schedule[]>(`/schedules?page=${page}&limit=10`);

export const createSchedule = (input: {
  title: string; reason?: string; type: string;
  areaId?: string; feederId?: string; startTime: string; endTime: string;
}) => api<Schedule>("/schedules", { method: "POST", body: input });

export const updateScheduleStatus = ({ id, status }: { id: string; status: string }) =>
  api<Schedule>(`/schedules/${id}/status`, { method: "PATCH", body: { status } });

export const deleteSchedule = (id: string) =>
  api<Schedule>(`/schedules/${id}`, { method: "DELETE" });