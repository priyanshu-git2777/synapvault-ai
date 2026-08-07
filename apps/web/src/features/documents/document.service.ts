import {
  getAccessToken,
} from "@/features/auth/auth-storage";

import type {
  DocumentCountResponse,
  DocumentItem,
} from "./document.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080/api/v1";

async function parseError(
  response: Response,
): Promise<string> {
  try {
    const body = (await response.json()) as {
      message?: string;
      error?: string;
    };

    return (
      body.message ??
      body.error ??
      "The request failed."
    );
  } catch {
    return "The request failed.";
  }
}

function authHeaders(): HeadersInit {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please sign in again.",
    );
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getDocuments():
Promise<DocumentItem[]> {
  const response = await fetch(
    `${API_BASE_URL}/documents`,
    {
      method: "GET",
      headers: authHeaders(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      await parseError(response),
    );
  }

  return response.json() as Promise<
    DocumentItem[]
  >;
}

export async function getDocumentCount():
Promise<number> {
  const response = await fetch(
    `${API_BASE_URL}/documents/count`,
    {
      method: "GET",
      headers: authHeaders(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      await parseError(response),
    );
  }

  const result =
    (await response.json()) as
      DocumentCountResponse;

  return result.total;
}

export async function uploadDocument(
  file: File,
): Promise<DocumentItem> {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please sign in again.",
    );
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/documents`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(
      await parseError(response),
    );
  }

  return response.json() as Promise<
    DocumentItem
  >;
}

export async function deleteDocument(
  documentId: number,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/documents/${documentId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(
      await parseError(response),
    );
  }
}