"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import type { AuthUser } from "@/features/auth/auth.types";

type AppHeaderProps = {
  user: AuthUser;
  onOpenMobileSidebar: () => void;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AppHeader({
  user,
  onOpenMobileSidebar,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] items-center border-b border-white/10 bg-[#070b17]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden w-full max-w-md sm:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              placeholder="Search documents and conversations..."
              className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-300 ring-2 ring-[#070b17]" />
          </button>

          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-40 truncate text-sm font-medium text-white">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                {user.role}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-violet-300 text-sm font-bold text-slate-950">
              {getInitials(user.name)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}