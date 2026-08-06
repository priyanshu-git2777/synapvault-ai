import type { AuthResponse, AuthUser } from "./auth.types";

const ACCESS_TOKEN_KEY = "synapvault_access_token";
const USER_KEY = "synapvault_user";

export function saveAuthSession(response: AuthResponse): void {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    response.accessToken,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(response.user),
  );
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}