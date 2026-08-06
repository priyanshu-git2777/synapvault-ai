import {
  Filter,
  Plus,
  Search,
} from "lucide-react";

import { DocumentCard } from "@/components/dashboard/document-card";
import { sampleDocuments } from "@/features/documents/document.data";

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-200">
            Knowledge library
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Documents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage documents available to your AI workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          <Plus className="h-4 w-4" />
          Upload document
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="search"
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

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {sampleDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
          />
        ))}
      </section>
    </div>
  );
}