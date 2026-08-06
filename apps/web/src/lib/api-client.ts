import type { ApiErrorResponse } from "@/features/auth/auth.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export class ApiClientError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body:
      options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
  });

  if (!response.ok) {
    let errorData: ApiErrorResponse = {};

    try {
      errorData = (await response.json()) as ApiErrorResponse;
    } catch {
      errorData = {
        message: "The server returned an invalid response.",
      };
    }

    throw new ApiClientError(
      errorData.message ?? "The request failed.",
      response.status,
      errorData.fieldErrors,
    );
  }

  return (await response.json()) as T;
}