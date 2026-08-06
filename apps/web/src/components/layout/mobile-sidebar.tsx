"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BrainCircuit,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  X,
} from "lucide-react";

import {
  clearAuthSession,
} from "@/features/auth/auth-storage";
import type { AuthUser } from "@/features/auth/auth.types";

type MobileSidebarProps = {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
};

const mobileNavigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    label: "AI Chat",
    href: "/chat",
    icon: MessageSquareText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function MobileSidebar({
  user,
  isOpen,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAuthSession();
    onClose();
    router.replace("/login");
    router.refresh();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close navigation"
      />

      <aside className="relative flex h-full w-[86%] max-w-sm flex-col border-r border-white/10 bg-[#0a0f1f] shadow-2xl">
        <div className="flex h-[73px] items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <BrainCircuit className="h-6 w-6" />
            </span>

            <span className="font-semibold text-white">
              SynapVault AI
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {mobileNavigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-xl bg-cyan-300/10 px-3 py-3 text-sm font-medium text-cyan-100"
                    : "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-violet-300 text-sm font-bold text-slate-950">
              {getInitials(user.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.name}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-rose-300"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}