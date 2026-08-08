
import Link from "next/link";
import {
  ArrowRight,
  FileText,
} from "lucide-react";

import type {
  DocumentItem,
} from "@/features/documents/document.types";

import {
  formatFileSize,
  getStatusLabel,
} from "@/features/documents/document.utils";

type RecentDocumentsProps = {
  documents: DocumentItem[];
  isLoading?: boolean;
};

export function RecentDocuments({
  documents,
  isLoading = false,
}: RecentDocumentsProps) {
  const recent =
    documents.slice(0, 4);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Documents recently added to
            your workspace
          </p>
        </div>

        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-100"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-500">
            Loading documents...
          </div>
        )}

        {!isLoading &&
          recent.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
              <FileText className="mx-auto h-8 w-8 text-slate-600" />

              <p className="mt-3 text-sm font-medium text-slate-300">
                No documents yet
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Upload your first PDF to
                start building your learning
                workspace.
              </p>
            </div>
          )}

        {!isLoading &&
          recent.map((document) => (
            <div
              key={document.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <Link
  href={`/documents/${document.id}`}
  className="block truncate text-sm font-medium text-white transition hover:text-cyan-200"
>
  {document.name}
</Link>

                <p className="mt-1 text-xs text-slate-500">
                  PDF ·{" "}
                  {formatFileSize(
                    document.fileSize,
                  )}
                </p>
              </div>

              <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
                {getStatusLabel(
                  document.status,
                )}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}