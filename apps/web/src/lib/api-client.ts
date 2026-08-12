import { getAccessToken } from "@/features/auth/auth-storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiFieldErrors = Record<string, string>;

export class ApiClientError extends Error {
  status: number;
  fieldErrors?: ApiFieldErrors;

  constructor(
    message: string,
    status: number,
    fieldErrors?: ApiFieldErrors,
  ) {
    super(message);

    this.name = "ApiClientError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  authenticated?: boolean;
};

type ErrorResponse = {
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    authenticated = false,
    body,
    ...requestOptions
  } = options;

  if (!API_URL) {
    throw new ApiClientError(
      "NEXT_PUBLIC_API_URL is not configured.",
      0,
    );
  }

  const headers = new Headers(requestOptions.headers);

  headers.set("Content-Type", "application/json");

  if (authenticated) {
    const token = getAccessToken();

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`,
      );
    }
  }

  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...requestOptions,
        headers,
        body:
          body === undefined
            ? undefined
            : JSON.stringify(body),
      },
    );

    if (!response.ok) {
      let message = "The request failed.";
      let fieldErrors: ApiFieldErrors | undefined;

      try {
        const data =
          (await response.json()) as ErrorResponse;

        message =
          data.message ?? message;

        fieldErrors =
          data.fieldErrors;
      } catch {
        // Keep default message.
      }

      throw new ApiClientError(
        message,
        response.status,
        fieldErrors,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError(
      "Unable to connect to the backend server.",
      0,
    );
  }
}