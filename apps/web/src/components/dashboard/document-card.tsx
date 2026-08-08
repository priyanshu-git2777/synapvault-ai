"use client";

import Link from "next/link";

import {
  FileText,
  Trash2,
} from "lucide-react";

import type { DocumentItem } from "@/features/documents/document.types";

import {
  formatDocumentDate,
  formatFileSize,
  getStatusLabel,
} from "@/features/documents/document.utils";

type DocumentCardProps = {
  document: DocumentItem;

  onDelete?: (
    documentId: number,
  ) => void | Promise<void>;
};

export function DocumentCard({
  document,
  onDelete,
}: DocumentCardProps) {
  const pageText =
    document.pageCount === null
      ? "Page count pending"
      : `${document.pageCount} pages`;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/20 hover:bg-white/[0.055]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-200">
          <FileText className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/documents/${document.id}`}
            className="block"
          >
            <h3 className="truncate font-medium text-white transition hover:text-cyan-200">
              {document.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              PDF ·{" "}
              {formatFileSize(
                document.fileSize,
              )}{" "}
              · {pageText}
            </p>
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-cyan-200">
              {getStatusLabel(
                document.status,
              )}
            </span>

            <span className="text-xs text-slate-600">
              {formatDocumentDate(
                document.createdAt,
              )}
            </span>
          </div>

          {onDelete && (
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <button
                type="button"
                onClick={() =>
                  void onDelete(
                    document.id,
                  )
                }
                className="inline-flex items-center gap-2 text-xs text-slate-500 transition hover:text-rose-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete document
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}