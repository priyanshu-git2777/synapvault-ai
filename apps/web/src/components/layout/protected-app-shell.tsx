"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import {
  getAccessToken,
  getStoredUser,
} from "@/features/auth/auth-storage";
import type { AuthUser } from "@/features/auth/auth.types";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

type ProtectedAppShellProps = {
  children: ReactNode;
};

export function ProtectedAppShell({
  children,
}: ProtectedAppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] =
    useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  useEffect(() => {
    const token = getAccessToken();
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    setUser(storedUser);
    setIsCheckingSession(false);
  }, [router]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (isCheckingSession || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b17] text-white">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-8 w-8 animate-spin text-cyan-300" />

          <p className="text-sm text-slate-400">
            Loading your workspace...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b17] text-white">
      <AppSidebar user={user} />

      <MobileSidebar
        user={user}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <AppHeader
          user={user}
          onOpenMobileSidebar={() =>
            setIsMobileSidebarOpen(true)
          }
        />

        <main className="min-h-[calc(100vh-73px)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}