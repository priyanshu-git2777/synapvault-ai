import Link from "next/link";
import {
  FileText,
  MoreHorizontal,
} from "lucide-react";

import type {
  DocumentItem,
  DocumentStatus,
} from "@/features/documents/document.types";

type DocumentCardProps = {
  document: DocumentItem;
};

function getStatusClasses(
  status: DocumentStatus,
): string {
  switch (status) {
    case "READY":
      return "border-emerald-300/15 bg-emerald-300/10 text-emerald-200";

    case "PROCESSING":
      return "border-amber-300/15 bg-amber-300/10 text-amber-200";

    case "FAILED":
      return "border-rose-300/15 bg-rose-300/10 text-rose-200";

    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

export function DocumentCard({
  document,
}: DocumentCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/15 hover:bg-white/[0.055]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-300/10 text-rose-200">
          <FileText className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/documents/${document.id}`}
                className="block truncate text-sm font-medium text-white transition hover:text-cyan-200"
              >
                {document.name}
              </Link>

              <p className="mt-1 text-xs text-slate-500">
                {document.type} · {document.size}
                {document.pageCount
                  ? ` · ${document.pageCount} pages`
                  : ""}
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/5 hover:text-white"
              aria-label={`Options for ${document.name}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusClasses(
                document.status,
              )}`}
            >
              {document.status}
            </span>

            <span className="text-xs text-slate-600">
              {document.uploadedAt}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}