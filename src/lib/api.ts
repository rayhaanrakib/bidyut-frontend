import apiClient from "./apiClient";
import { tokenStore } from "./tokenStore";

export { API_URL } from "./apiClient";

export interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number; totalPages: number };
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, any> | BodyInit | null;
  form?: FormData;
};

export const api = async <T = unknown,>(path: string, { method = "GET", body, form }: Options = {}): Promise<Envelope<T>> => {
  const headers: Record<string, string> = {};
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  const requestBody = form ?? body;

  try {
    return await apiClient<Envelope<T>>(path, { method, body: requestBody, headers });
  } catch (err: any) {
    throw new ApiError(err?.data?.message ?? err?.message ?? `Request failed (${err?.status ?? 0})`, err?.status ?? 0);
  }
};