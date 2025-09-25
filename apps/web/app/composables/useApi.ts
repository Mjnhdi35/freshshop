import type { ApiResponse, ErrorResponse } from "~/types/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody = any> {
  method?: HttpMethod;
  body?: TBody;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export const useApi = () => {
  const config = useRuntimeConfig();

  const getToken = (): string | null => {
    if (!process.client) return null;
    return localStorage.getItem("accessToken");
  };

  const request = async <T = any, TBody = any>(
    path: string,
    options: RequestOptions<TBody> = {},
  ): Promise<ApiResponse<T>> => {
    const token = getToken();

    try {
      const isInternal = path.startsWith("/api/");
      const url = isInternal ? path : `${config.public.apiBase}${path}`;
      const res = await $fetch<ApiResponse<T> | ErrorResponse>(url, {
        method: options.method || "GET",
        body: options.body as any,
        query: options.query,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers || {}),
        },
        credentials: options.credentials || "include",
      });

      if ((res as any).success === false) {
        throw res as ErrorResponse;
      }

      return res as ApiResponse<T>;
    } catch (error: any) {
      const statusCode = error?.statusCode || error?.response?.status || 500;

      if (statusCode === 401) {
        // Optionally handle refresh token flow here
        if (process.client) {
          // If unauthorized, clear tokens to force re-login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      const fallback: ErrorResponse = {
        success: false,
        message: error?.data?.message || error?.message || "Có lỗi xảy ra",
        error: error?.name || "Error",
        statusCode,
        timestamp: new Date().toISOString(),
        path: path,
        details: error?.data || error,
      };

      throw fallback;
    }
  };

  return {
    get: <T = any>(path: string, query?: Record<string, any>) =>
      request<T>(path, { method: "GET", query }),
    post: <T = any, TBody = any>(path: string, body?: TBody) =>
      request<T, TBody>(path, { method: "POST", body }),
    put: <T = any, TBody = any>(path: string, body?: TBody) =>
      request<T, TBody>(path, { method: "PUT", body }),
    patch: <T = any, TBody = any>(path: string, body?: TBody) =>
      request<T, TBody>(path, { method: "PATCH", body }),
    del: <T = any>(path: string) => request<T>(path, { method: "DELETE" }),
    request,
  };
};
