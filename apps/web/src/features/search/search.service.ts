import {
  getAccessToken,
} from "@/features/auth/auth-storage";

import type {
  DocumentSearchResponse,
} from "./search.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080/api/v1";

async function readError(
  response: Response,
): Promise<string> {
  try {
    const body =
      (await response.json()) as {
        message?: string;
        error?: string;
      };

    return (
      body.message ??
      body.error ??
      "Search request failed."
    );
  } catch {
    return "Search request failed.";
  }
}

export async function searchDocument(
  documentId: number,
  query: string,
): Promise<DocumentSearchResponse> {
  const token =
    getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please sign in again.",
    );
  }

  const params =
    new URLSearchParams({
      q: query,
    });

  const response =
    await fetch(
      `${API_BASE_URL}/documents/${documentId}/search?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      await readError(response),
    );
  }

  return response.json() as Promise<DocumentSearchResponse>;
}