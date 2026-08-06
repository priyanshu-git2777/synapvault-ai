"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BrainCircuit,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";

import {
  clearAuthSession,
} from "@/features/auth/auth-storage";
import type { AuthUser } from "@/features/auth/auth.types";

type AppSidebarProps = {
  user: AuthUser;
};

const navigationItems = [
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

export function AppSidebar({
  user,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAuthSession();
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#0a0f1f]/95 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-[73px] items-center border-b border-white/10 px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
            <BrainCircuit className="h-6 w-6" />
          </span>

          <div>
            <p className="font-semibold text-white">
              SynapVault AI
            </p>

            <p className="text-xs text-slate-500">
              Document intelligence
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <Link
          href="/documents"
          className="mb-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-200 font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <Plus className="h-4 w-4" />
          Add document
        </Link>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-cyan-300/10 px-3 py-3 text-sm font-medium text-cyan-100"
                    : "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-violet-400/15 bg-violet-400/10 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-300/10 text-violet-200">
            <Sparkles className="h-5 w-5" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white">
            AI workspace
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Upload documents and ask questions across your
            knowledge base.
          </p>

          <Link
            href="/chat"
            className="mt-4 inline-flex text-xs font-medium text-violet-200 transition hover:text-violet-100"
          >
            Start a conversation →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-violet-300 text-sm font-bold text-slate-950">
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
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}