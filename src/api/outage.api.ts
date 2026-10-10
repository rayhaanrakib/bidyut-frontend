import { api } from "@/lib/api";
import type { OutageReport } from "@/types";

export const listOutages = (query: { status?: string; isPriority?: string; page?: number } = {}) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => v !== undefined && v !== "" && params.set(k, String(v)));
  params.set("limit", "10");
  return api<OutageReport[]>(`/outages?${params.toString()}`);
};

export const reportOutage = (payload: { areaId: string; title: string; description: string }) =>
  api<OutageReport>("/outages", { method: "POST", body: payload });

export const updateOutageStatus = ({ id, status }: { id: string; status: string }) =>
  api<OutageReport>(`/outages/${id}/status`, { method: "PATCH", body: { status } });

export const assignTechnician = ({ id, technicianId }: { id: string; technicianId: string }) =>
  api<OutageReport>(`/outages/${id}/assign`, { method: "PATCH", body: { technicianId } });

export const cancelReport = (id: string) =>
  api<OutageReport>(`/outages/${id}/cancel`, { method: "DELETE" });