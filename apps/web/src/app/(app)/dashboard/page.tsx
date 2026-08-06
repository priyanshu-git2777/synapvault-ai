"use client";

import {  useState } from "react";
import {
  Database,
  FileCheck2,
  Files,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { RecentDocuments } from "@/components/dashboard/recent-documents";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { getStoredUser } from "@/features/auth/auth-storage";
import type { AuthUser } from "@/features/auth/auth.types";
import { sampleDocuments } from "@/features/documents/document.data";

export default function DashboardPage() {
  const [user] = useState<AuthUser | null>(() => getStoredUser());

  const firstName =
    user?.name.trim().split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-7xl">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/[0.09] via-white/[0.035] to-violet-300/[0.08] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" />
            AI knowledge workspace
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Upload documents, organize your knowledge and ask
            questions across everything stored inside your
            SynapVault workspace.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total documents"
          value="24"
          description="Four documents added this week"
          icon={Files}
        />

        <DashboardStatCard
          title="Ready for chat"
          value="21"
          description="Documents successfully processed"
          icon={FileCheck2}
        />

        <DashboardStatCard
          title="AI conversations"
          value="38"
          description="Questions asked across your workspace"
          icon={MessageSquareText}
        />

        <DashboardStatCard
          title="Knowledge storage"
          value="128 MB"
          description="Of your current workspace storage"
          icon={Database}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <RecentDocuments
          documents={sampleDocuments}
        />

        <UploadPanel />
      </section>
    </div>
  );
}