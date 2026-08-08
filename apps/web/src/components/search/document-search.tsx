"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  LoaderCircle,
  Search,
  X,
} from "lucide-react";

import {
  searchDocument,
} from "@/features/search/search.service";

import type {
  DocumentSearchResponse,
} from "@/features/search/search.types";

import {
  SearchResultItem,
} from "./search-result-item";

type DocumentSearchProps = {
  documentId: number;
  documentStatus: string;
};

export function DocumentSearch({
  documentId,
  documentStatus,
}: DocumentSearchProps) {
  const [query, setQuery] =
    useState("");

  const [result, setResult] =
    useState<DocumentSearchResponse | null>(
      null,
    );

  const [error, setError] =
    useState<string | null>(null);

  const [isSearching, setIsSearching] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalized =
      query.trim();

    if (normalized.length < 2) {
      setError(
        "Enter at least 2 characters.",
      );

      return;
    }

    try {
      setError(null);
      setIsSearching(true);

      const response =
        await searchDocument(
          documentId,
          normalized,
        );

      setResult(response);
    } catch (searchError) {
      setResult(null);

      setError(
        searchError instanceof Error
          ? searchError.message
          : "Unable to search this document.",
      );
    } finally {
      setIsSearching(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResult(null);
    setError(null);
  }

  const isReady =
    documentStatus === "READY";

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
      <div>
        <p className="text-sm font-medium text-cyan-200">
          Smart document search
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Find anything in this PDF
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Search for an exact word or
          phrase and SynapVault will show
          every matching page.
        </p>
      </div>

      {!isReady && (
        <div className="mt-6 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-3 text-sm text-amber-100">
          This document must finish
          processing before it can be
          searched.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              value={query}
              disabled={!isReady}
              onChange={(event) =>
                setQuery(
                  event.target.value,
                )
              }
              placeholder="Search inheritance, TCP, method overriding..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-50"
            />

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={
              !isReady ||
              isSearching
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search PDF
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
            <div>
              <p className="text-sm text-slate-500">
                Results for
              </p>

              <p className="mt-1 font-medium text-white">
                “{result.query}”
              </p>
            </div>

            <div className="text-sm text-slate-400">
              <span className="font-medium text-white">
                {result.totalMatches}
              </span>{" "}
              matches across{" "}
              <span className="font-medium text-white">
                {result.matchingPages}
              </span>{" "}
              pages
            </div>
          </div>

          {result.results.length === 0 ? (
            <div className="py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-700" />

              <p className="mt-4 text-sm font-medium text-slate-300">
                No matches found
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Try another word or phrase.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {result.results.map(
                (searchResult) => (
                  <SearchResultItem
                    key={
                      searchResult.pageId
                    }
                    result={
                      searchResult
                    }
                    query={
                      result.query
                    }
                  />
                ),
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}