"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

import {
  FileUp,
  LoaderCircle,
  UploadCloud,
} from "lucide-react";

import type {
  DocumentItem,
} from "@/features/documents/document.types";

type UploadPanelProps = {
  isUploading?: boolean;

  onUpload: (
    file: File,
  ) => Promise<DocumentItem | null>;
};

export function UploadPanel({
  isUploading = false,
  onUpload,
}: UploadPanelProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [localError, setLocalError] =
    useState<string | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  async function processFile(
    file: File,
  ) {
    setLocalError(null);

    if (
      file.type !== "application/pdf" &&
      !file.name
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      setLocalError(
        "Please choose a PDF file.",
      );

      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      setLocalError(
        "PDF size cannot exceed 10 MB.",
      );

      return;
    }

    await onUpload(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      void processFile(file);
    }
  }

  function handleDragOver(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      void processFile(file);
    }
  }

  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
          <FileUp className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Add knowledge
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Upload a PDF and add it to
            your SynapVault learning
            workspace.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-6 rounded-2xl border border-dashed p-6 text-center transition ${
          isDragging
            ? "border-cyan-300/60 bg-cyan-300/[0.08]"
            : "border-white/15 bg-black/10"
        }`}
      >
        <UploadCloud className="mx-auto h-8 w-8 text-cyan-200" />

        <p className="mt-4 text-sm font-medium text-white">
          Drop a PDF here
        </p>

        <p className="mt-1 text-xs text-slate-500">
          PDF up to 10 MB
        </p>

        <button
          type="button"
          disabled={isUploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Browse files"
          )}
        </button>
      </div>

      {localError && (
        <p className="mt-4 text-sm text-rose-300">
          {localError}
        </p>
      )}
    </aside>
  );
}