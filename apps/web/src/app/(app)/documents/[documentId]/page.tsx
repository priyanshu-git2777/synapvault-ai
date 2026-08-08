"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  FileText,
  LoaderCircle,
} from "lucide-react";

import { useParams } from "next/navigation";

import { DocumentSearch } from "@/components/search/document-search";

import { getDocument } from "@/features/documents/document.service";

import type { DocumentItem } from "@/features/documents/document.types";

import {
  formatDocumentDate,
  formatFileSize,
  getStatusLabel,
} from "@/features/documents/document.utils";

export default function DocumentDetailsPage() {
  const params =
    useParams<{
      documentId: string;
    }>();

  const rawDocumentId =
    params?.documentId;

  const documentId =
    Number(rawDocumentId);

  const [document, setDocument] =
    useState<DocumentItem | null>(
      null,
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDocument() {
      if (
        !rawDocumentId ||
        !Number.isInteger(documentId) ||
        documentId <= 0
      ) {
        if (active) {
          setError(
            "Invalid document ID.",
          );

          setIsLoading(false);
        }

        return;
      }

      try {
        setError(null);

        const result =
          await getDocument(
            documentId,
          );

        if (active) {
          setDocument(result);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load document.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadDocument();

    return () => {
      active = false;
    };
  }, [documentId, rawDocumentId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-3 text-sm text-slate-500">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        Loading document...
      </div>
    );
  }

  if (
    error ||
    !document
  ) {
    return (
      <div className="mx-auto max-w-4xl">
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Documents
        </Link>

        <div className="mt-8 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5 text-sm text-rose-200">
          {error ??
            "Document was not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Link
        href="/documents"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to documents
      </Link>

      <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/[0.07] via-white/[0.025] to-violet-300/[0.06] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <FileText className="h-7 w-7" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-cyan-200">
              PDF document
            </p>

            <h1 className="mt-1 truncate text-2xl font-semibold text-white sm:text-3xl">
              {document.name}
            </h1>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
              <span>
                {formatFileSize(
                  document.fileSize,
                )}
              </span>

              <span>
                {document.pageCount ===
                null
                  ? "Page count pending"
                  : `${document.pageCount} pages`}
              </span>

              <span>
                {getStatusLabel(
                  document.status,
                )}
              </span>

              <span>
                Uploaded{" "}
                {formatDocumentDate(
                  document.createdAt,
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <DocumentSearch
          documentId={
            document.id
          }
          documentStatus={
            document.status
          }
        />
      </div>
    </div>
  );
}