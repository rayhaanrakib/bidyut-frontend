import apiClient, { API_URL } from "./apiClient";
import { tokenStore } from "./tokenStore";

export interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, unknown> | null;
  form?: FormData;
};

type ErrorResponse = {
  status?: number;
  message?: string;
  data?: {
    message?: string;
  };
};

type RefreshResponse = {
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const call = <T,>(
  path: string,
  { method = "GET", body, form }: Options,
): Promise<Envelope<T>> => {
  const headers: Record<string, string> = {};
  const token = tokenStore.get();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return apiClient<Envelope<T>>(path, {
    method,
    body: form ?? body,
    headers,
  });
};

let refreshing: Promise<boolean> | null = null;

const refreshAccessToken = async (): Promise<boolean> => {
  if (refreshing) {
    return refreshing;
  }

  refreshing = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        return false;
      }

      const json: RefreshResponse = await response.json();
      const accessToken = json.data?.accessToken;

      if (!accessToken) {
        return false;
      }

      tokenStore.setTokens(accessToken, json.data?.refreshToken ?? "");
      return true;
    } catch {
      return false;
    } finally {
      refreshing = null;
    }
  })();

  return refreshing;
};

const request = async <T>(
  path: string,
  options: Options,
  allowRefresh: boolean,
): Promise<Envelope<T>> => {
  try {
    return await call<T>(path, options);
  } catch (error: unknown) {
    const err = error as ErrorResponse;
    const status = err.status ?? 0;

    const mayRefresh = path === "/auth/me" || !path.startsWith("/auth/");

    if (status === 401 && mayRefresh && allowRefresh && typeof window !== "undefined") {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        return request<T>(path, options, false);
      }

      tokenStore.clear();

      if (!path.startsWith("/auth/") && !window.location.pathname.startsWith("/login")) {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`;
      }
    }

    throw new ApiError(
      err.data?.message ??
        err.message ??
        `Request failed (${status})`,
      status,
    );
  }
};

export const api = async <T = unknown,>(
  path: string,
  options: Options = {},
): Promise<Envelope<T>> => request<T>(path, options, true);