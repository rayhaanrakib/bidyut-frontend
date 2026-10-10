import { api } from "@/lib/api";
import type { Area } from "@/types";

export interface Zone {
  id: string;
  name: string;
  code: string | null;
}

export interface Substation {
  id: string;
  name: string;
  zoneId: string;
}

export interface Feeder {
  id: string;
  name: string;
  substationId: string;
  capacityMW: number | null;
}

const gridQuery = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") search.set(key, String(value));
  });
  const q = search.toString();
  return q ? `?${q}` : "";
};

export const getZones = () => api<{ id: string; name: string; code: string }[]>("/grid/zones");

export const getAreas = (feederId?: string | null) => {
  const q = feederId ? `?feederId=${feederId}` : "";
  return api<Area[]>(`/grid/areas${q}`);
};

export type GridListParams = { search?: string; page?: number; limit?: number };

export const listZones = (params: GridListParams = {}) =>
  api<Zone[]>(`/grid/zones${gridQuery({ search: params.search, page: params.page, limit: params.limit })}`);

export const listSubstations = (params: GridListParams & { zoneId?: string } = {}) =>
  api<Substation[]>(`/grid/substations${gridQuery({ zoneId: params.zoneId, search: params.search, page: params.page, limit: params.limit })}`);

export const listFeeders = (params: GridListParams & { substationId?: string } = {}) =>
  api<Feeder[]>(`/grid/feeders${gridQuery({ substationId: params.substationId, search: params.search, page: params.page, limit: params.limit })}`);

export const listAreas = (params: GridListParams & { feederId?: string } = {}) =>
  api<Area[]>(`/grid/areas${gridQuery({ feederId: params.feederId, search: params.search, page: params.page, limit: params.limit })}`);

export const createZone = (input: { name: string; code?: string }) =>
  api<Zone>("/grid/zones", { method: "POST", body: input });

export const updateZone = ({ id, ...input }: { id: string; name?: string; code?: string }) =>
  api<Zone>(`/grid/zones/${id}`, { method: "PATCH", body: input });

export const deleteZone = (id: string) =>
  api<Zone>(`/grid/zones/${id}`, { method: "DELETE" });

export const createSubstation = (input: { name: string; zoneId: string }) =>
  api<Substation>("/grid/substations", { method: "POST", body: input });

export const updateSubstation = ({ id, ...input }: { id: string; name?: string }) =>
  api<Substation>(`/grid/substations/${id}`, { method: "PATCH", body: input });

export const deleteSubstation = (id: string) =>
  api<Substation>(`/grid/substations/${id}`, { method: "DELETE" });

export const createFeeder = (input: { name: string; substationId: string; capacityMW?: number }) =>
  api<Feeder>("/grid/feeders", { method: "POST", body: input });

export const updateFeeder = ({ id, ...input }: { id: string; name?: string; capacityMW?: number }) =>
  api<Feeder>(`/grid/feeders/${id}`, { method: "PATCH", body: input });

export const deleteFeeder = (id: string) =>
  api<Feeder>(`/grid/feeders/${id}`, { method: "DELETE" });

export const createArea = (input: { name: string; feederId: string }) =>
  api<Area>("/grid/areas", { method: "POST", body: input });

export const updateArea = ({ id, ...input }: { id: string; name?: string }) =>
  api<Area>(`/grid/areas/${id}`, { method: "PATCH", body: input });

export const deleteArea = (id: string) =>
  api<Area>(`/grid/areas/${id}`, { method: "DELETE" });