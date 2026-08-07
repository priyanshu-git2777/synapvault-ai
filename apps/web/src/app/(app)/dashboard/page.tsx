"use client";

import {
  useState,
} from "react";

import {
  Database,
  FileCheck2,
  Files,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import {
  DashboardStatCard,
} from "@/components/dashboard/dashboard-stat-card";

import {
  RecentDocuments,
} from "@/components/dashboard/recent-documents";

import {
  UploadPanel,
} from "@/components/dashboard/upload-panel";

import {
  getStoredUser,
} from "@/features/auth/auth-storage";

import type {
  AuthUser,
} from "@/features/auth/auth.types";

import {
  useDocuments,
} from "@/features/documents/use-documents";

export default function DashboardPage() {
  const [user] =
    useState<AuthUser | null>(
      () => getStoredUser(),
    );

  const {
    documents,
    isLoading,
    isUploading,
    error,
    upload,
  } = useDocuments();

  const firstName =
    user?.name
      .trim()
      .split(" ")[0] || "there";

  const totalStorage =
    documents.reduce(
      (total, document) =>
        total + document.fileSize,
      0,
    );

  const totalStorageMb =
    totalStorage === 0
      ? "0 MB"
      : `${(
          totalStorage /
          (1024 * 1024)
        ).toFixed(1)} MB`;

  const readyCount =
    documents.filter(
      (document) =>
        document.status === "READY",
    ).length;

  return (
    <div className="mx-auto max-w-7xl">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/[0.09] via-white/[0.035] to-violet-300/[0.08] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" />
            AI learning workspace
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Upload learning documents,
            organize your knowledge and
            prepare them for AI-powered
            search, explanations, quizzes
            and study tools.
          </p>
        </div>
      </section>

      {error && (
        <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total documents"
          value={
            isLoading
              ? "..."
              : String(
                  documents.length,
                )
          }
          description="PDFs stored in your workspace"
          icon={Files}
        />

        <DashboardStatCard
          title="Ready for chat"
          value={String(readyCount)}
          description="Will become available after AI processing"
          icon={FileCheck2}
        />

        <DashboardStatCard
          title="AI conversations"
          value="0"
          description="AI chat arrives in a later part"
          icon={MessageSquareText}
        />

        <DashboardStatCard
          title="Knowledge storage"
          value={totalStorageMb}
          description="PDF storage currently used"
          icon={Database}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <RecentDocuments
          documents={documents}
          isLoading={isLoading}
        />

        <UploadPanel
          isUploading={isUploading}
          onUpload={upload}
        />
      </section>
    </div>
  );
}