import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { DocumentItem } from "@/features/documents/document.types";

import { DocumentCard } from "./document-card";

type RecentDocumentsProps = {
  documents: DocumentItem[];
};

export function RecentDocuments({
  documents,
}: RecentDocumentsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Documents recently added to your workspace
          </p>
        </div>

        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
          />
        ))}
      </div>
    </section>
  );
}