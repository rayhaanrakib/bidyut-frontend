import { api } from "@/lib/api";
import type { MyProfile, TechnicianApplication, User } from "@/types";

export const listUsers = (filters: { search?: string; role?: string; page?: number } = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.role) params.set("role", filters.role);
  params.set("page", String(filters.page ?? 1));
  params.set("limit", "10");
  return api<User[]>(`/users?${params.toString()}`);
};

export const technicianList = () =>
  api<User[]>("/users?role=FIELD_TECHNICIAN&limit=100");

export const createStaff = (input: { name: string; email: string; password: string; role: string }) =>
  api<User>("/users/staff", { method: "POST", body: input });

export const setRole = ({ id, role }: { id: string; role: string }) =>
  api<User>(`/users/${id}/role`, { method: "PATCH", body: { role } });

export const setStatus = ({ id, status }: { id: string; status: string }) =>
  api<User>(`/users/${id}/status`, { method: "PATCH", body: { status } });

export const removeUser = (id: string) =>
  api<User>(`/users/${id}`, { method: "DELETE" });

export const updateMe = (input: { name: string }) =>
  api<User>("/users/me", { method: "PATCH", body: input });

export const updateMyImage = (form: FormData) =>
  api<{ imageUrl: string; imagePublicId: string }>("/users/me/image", { method: "PATCH", form });

export const myProfile = () => api<MyProfile>("/users/me/profile");

export const updateMyProfile = (input: Partial<MyProfile>) =>
  api<MyProfile>("/users/me/profile", { method: "PATCH", body: input });

export const applyAsTechnician = (form: FormData) =>
  api<{ applicationStatus: "PENDING" | "APPROVED" | "REJECTED"; employeeId: string | null }>(
    "/users/apply-as-technician",
    { method: "POST", form },
  );

export const listTechnicianApplications = (status: string, page = 1) =>
  api<TechnicianApplication[]>(`/users/technician-applications?status=${status}&page=${page}&limit=10`);

export const decideApplication = (input: {
  userId: string;
  applicationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}) =>
  api<TechnicianApplication>(`/users/technician-applications/${input.userId}`, {
    method: "PATCH",
    body: { applicationStatus: input.applicationStatus, ...(input.rejectionReason && { rejectionReason: input.rejectionReason }) },
  });