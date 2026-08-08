"use client";

import {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Filter,
  LoaderCircle,
  Plus,
  Search,
} from "lucide-react";

import { DocumentCard } from "@/components/dashboard/document-card";
import { useDocuments } from "@/features/documents/use-documents";

export default function DocumentsPage() {
  const {
    documents,
    isLoading,
    isUploading,
    error,
    upload,
    remove,
  } = useDocuments();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [search, setSearch] =
    useState("");

  const filteredDocuments =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return documents;
      }

      return documents.filter(
        (document) =>
          document.name
            .toLowerCase()
            .includes(query),
      );
    }, [documents, search]);

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    await upload(file);

    event.target.value = "";
  }

  async function handleDelete(
    documentId: number,
  ) {
    const confirmed =
      window.confirm(
        "Delete this document? This cannot be undone.",
      );

    if (!confirmed) {
      return;
    }

    await remove(documentId);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-200">
            Knowledge library
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Documents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Upload and manage PDFs in your SynapVault workspace.
          </p>
        </div>

        <button
          type="button"
          disabled={isUploading}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Upload document
            </>
          )}
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search your documents..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading documents...
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center">
          <p className="text-base font-medium text-white">
            {search
              ? "No matching documents"
              : "No documents yet"}
          </p>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {search
              ? "Try another search term."
              : "Upload your first PDF to begin building your SynapVault workspace."}
          </p>
        </div>
      ) : (
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          {filteredDocuments.map(
            (document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onDelete={handleDelete}
              />
            ),
          )}
        </section>
      )}
    </div>
  );
}