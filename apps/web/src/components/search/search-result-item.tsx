import {
  FileText,
  Search,
} from "lucide-react";

import {
  HighlightText,
} from "./highlight-text";

import type {
  SearchMatch,
} from "@/features/search/search.types";

type SearchResultItemProps = {
  result: SearchMatch;
  query: string;
};

export function SearchResultItem({
  result,
  query,
}: SearchResultItemProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/20 hover:bg-white/[0.05]">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
          <FileText className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-medium text-white">
              Page {result.pageNumber}
            </h3>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400">
              <Search className="h-3 w-3" />

              {result.matchCount}{" "}
              {result.matchCount === 1
                ? "match"
                : "matches"}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            <HighlightText
              text={result.snippet}
              query={query}
            />
          </p>

          <button
            type="button"
            className="mt-4 text-xs font-medium text-cyan-200 transition hover:text-cyan-100"
          >
            Open page {result.pageNumber}
          </button>
        </div>
      </div>
    </article>
  );
}