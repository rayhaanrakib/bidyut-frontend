import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArea,
  createFeeder,
  createSubstation,
  createZone,
  deleteArea,
  deleteFeeder,
  deleteSubstation,
  deleteZone,
  getAreas,
  getZones,
  listAreas,
  listFeeders,
  listSubstations,
  listZones,
  updateArea,
  updateFeeder,
  updateSubstation,
  updateZone,
} from "@/api";

export const useZones = () => {
  return useQuery({
    queryKey: ["zones"],
    queryFn: () => getZones(),
  });
};

export const useAreas = (feederId?: string | null) => {
  return useQuery({
    queryKey: ["areas", feederId ?? "all"],
    queryFn: () => getAreas(feederId),
  });
};

export const useZoneList = (params: { search?: string; page?: number; limit?: number; enabled?: boolean } = {}) => {
  const { enabled, ...rest } = params;
  return useQuery({
    queryKey: ["grid", "zones", rest],
    queryFn: () => listZones(rest),
    enabled: enabled ?? true,
  });
};

export const useSubstationList = (params: { zoneId?: string; search?: string; page?: number; limit?: number; enabled?: boolean } = {}) => {
  const { enabled, ...rest } = params;
  return useQuery({
    queryKey: ["grid", "substations", rest],
    queryFn: () => listSubstations(rest),
    enabled: enabled ?? true,
  });
};

export const useFeederList = (params: { substationId?: string; search?: string; page?: number; limit?: number; enabled?: boolean } = {}) => {
  const { enabled, ...rest } = params;
  return useQuery({
    queryKey: ["grid", "feeders", rest],
    queryFn: () => listFeeders(rest),
    enabled: enabled ?? true,
  });
};

export const useAreaList = (params: { feederId?: string; search?: string; page?: number; limit?: number; enabled?: boolean } = {}) => {
  const { enabled, ...rest } = params;
  return useQuery({
    queryKey: ["grid", "areas", rest],
    queryFn: () => listAreas(rest),
    enabled: enabled ?? true,
  });
};

export const useCreateZone = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createZone,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useUpdateZone = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateZone,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useDeleteZone = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteZone,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useCreateSubstation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSubstation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useUpdateSubstation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSubstation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useDeleteSubstation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSubstation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useCreateFeeder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createFeeder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useUpdateFeeder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateFeeder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useDeleteFeeder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteFeeder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grid"] }),
  });
};

export const useCreateArea = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createArea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["areas"] });
    },
  });
};

export const useUpdateArea = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateArea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["areas"] });
    },
  });
};

export const useDeleteArea = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteArea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["grid"] });
      qc.invalidateQueries({ queryKey: ["areas"] });
    },
  });
};