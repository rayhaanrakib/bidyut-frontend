import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyAsTechnician,
  createStaff,
  decideApplication,
  listTechnicianApplications,
  listUsers,
  myProfile,
  removeUser,
  setRole,
  setStatus,
  technicianList,
  updateMe,
  updateMyImage,
  updateMyProfile,
} from "@/api";


import type { MyProfile, TechnicianApplication, User, MyProfileResponse } from "@/types";

export const useMyProfile = () => {
  return useQuery<MyProfileResponse>({
    queryKey: ["my-profile"],
    queryFn: myProfile,
    retry: false,
    refetchOnMount: "always",
  });
};


export const useUpdateMyProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
};

export const useUpdateMe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
};

export const useUpdateMyImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyImage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
};

export const useApplyAsTechnician = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applyAsTechnician,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
};

export const useUsers = (filters: { search?: string; role?: string; page?: number } = {}) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => listUsers(filters),
  });
};

export const useTechnicians = () => {
  return useQuery({
    queryKey: ["users", "technicians"],
    queryFn: () => technicianList(),
  });
};

export const useCreateStaff = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useSetUserRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: setRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useSetUserStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: setStatus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useTechnicianApplications = (status: string, page = 1) => {
  return useQuery({
    queryKey: ["applications", status, page],
    queryFn: () => listTechnicianApplications(status, page),
  });
};

export const useDecideApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: decideApplication,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });
};