"use client";

import { useRef, useState } from "react";
import {
  FileUp,
  LoaderCircle,
  UploadCloud,
} from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedFileTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export function UploadPanel() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPreparing, setIsPreparing] = useState(false);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function validateAndSelectFile(file: File) {
    setErrorMessage("");

    if (!allowedFileTypes.includes(file.type)) {
      setSelectedFile(null);
      setErrorMessage(
        "Only PDF, DOCX and TXT files are supported.",
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setErrorMessage(
        "The selected file must be smaller than 10 MB.",
      );
      return;
    }

    setSelectedFile(file);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    validateAndSelectFile(file);
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    validateAndSelectFile(file);
  }

  async function handleTemporaryUpload() {
    if (!selectedFile) {
      setErrorMessage("Select a document before uploading.");
      return;
    }

    setIsPreparing(true);
    setErrorMessage("");

    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    setIsPreparing(false);

    setErrorMessage(
      "The upload interface works. Backend document storage will be connected in Part 7.",
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.025] p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
          <FileUp className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Add knowledge
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Upload documents and make them searchable with
            SynapVault AI.
          </p>
        </div>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="mt-6 rounded-2xl border border-dashed border-white/15 bg-black/10 p-6 text-center transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.025]"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="mt-4 text-sm font-medium text-white">
          Drop a document here
        </p>

        <p className="mt-1 text-xs text-slate-500">
          PDF, DOCX or TXT up to 10 MB
        </p>

        <button
          type="button"
          onClick={openFilePicker}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          Browse files
        </button>
      </div>

      {selectedFile && (
        <div className="mt-4 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
          <p className="truncate text-sm font-medium text-emerald-100">
            {selectedFile.name}
          </p>

          <p className="mt-1 text-xs text-emerald-200/60">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[0.07] px-4 py-3 text-sm text-amber-100">
          {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleTemporaryUpload}
        disabled={!selectedFile || isPreparing}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-200 font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPreparing && (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        )}

        {isPreparing
          ? "Preparing document..."
          : "Upload document"}
      </button>
    </section>
  );
}