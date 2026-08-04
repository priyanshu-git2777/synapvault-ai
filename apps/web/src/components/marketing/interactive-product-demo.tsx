"use client";

import { useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  FileSearch,
  FileText,
  GraduationCap,
  Network,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

type DemoMode = "chat" | "summary" | "study" | "graph";

interface DemoModeItem {
  id: DemoMode;
  label: string;
  icon: typeof FileSearch;
}

const modes: DemoModeItem[] = [
  {
    id: "chat",
    label: "Document chat",
    icon: FileSearch,
  },
  {
    id: "summary",
    label: "Summary",
    icon: BookOpenCheck,
  },
  {
    id: "study",
    label: "Study tools",
    icon: GraduationCap,
  },
  {
    id: "graph",
    label: "Knowledge graph",
    icon: Network,
  },
];

export function InteractiveProductDemo() {
  const [activeMode, setActiveMode] = useState<DemoMode>("chat");

  return (
    <GlassPanel strong className="mt-14 overflow-hidden p-3 sm:p-4">
      <div className="overflow-hidden rounded-[1.4rem] border border-slate-200/70 bg-white/80">
        <div className="flex flex-col gap-4 border-b border-slate-200/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-slate-950">
              Interactive product preview
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Select a capability to inspect the intended workflow.
            </p>
          </div>

          <div
            className="flex max-w-full gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Product demonstration modes"
          >
            {modes.map((mode) => {
              const Icon = mode.icon;
              const selected = mode.id === activeMode;

              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`demo-panel-${mode.id}`}
                  id={`demo-tab-${mode.id}`}
                  onClick={() => setActiveMode(mode.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition",
                    selected
                      ? "bg-slate-950 text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-700",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-[520px] lg:grid-cols-[220px_1fr]">
          <DemoSidebar />

          <div className="min-w-0 p-4 sm:p-6">
            {activeMode === "chat" && <ChatDemo />}
            {activeMode === "summary" && <SummaryDemo />}
            {activeMode === "study" && <StudyDemo />}
            {activeMode === "graph" && <GraphDemo />}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function DemoSidebar() {
  return (
    <aside className="hidden border-r border-slate-200/70 bg-slate-50/70 p-4 lg:block">
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-left text-xs font-bold text-white shadow-lg shadow-violet-500/15"
      >
        <Sparkles className="size-4" aria-hidden="true" />
        New conversation
      </button>

      <div className="mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>

        <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-3">
          <p className="text-xs font-bold text-violet-800">
            AI Research Project
          </p>

          <p className="mt-1 text-[10px] text-violet-600">4 documents</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
          Documents
        </p>

        <div className="mt-3 space-y-2">
          <DemoDocument name="Research Paper.pdf" pages="34 pages" />
          <DemoDocument name="Technical Notes.pdf" pages="18 pages" />
          <DemoDocument name="Meeting Summary.docx" pages="6 pages" />
        </div>
      </div>
    </aside>
  );
}

interface DemoDocumentProps {
  name: string;
  pages: string;
}

function DemoDocument({ name, pages }: DemoDocumentProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start gap-2">
        <FileText
          className="mt-0.5 size-4 shrink-0 text-indigo-600"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold text-slate-700">
            {name}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">{pages}</p>
        </div>
      </div>
    </div>
  );
}

function ChatDemo() {
  return (
    <div
      id="demo-panel-chat"
      role="tabpanel"
      aria-labelledby="demo-tab-chat"
      className="flex h-full flex-col"
    >
      <DemoTitle
        icon={FileSearch}
        title="Evidence-grounded document chat"
        description="Answers remain connected to the source pages used to produce them."
      />

      <div className="mt-8 flex flex-1 flex-col">
        <div className="max-w-[88%] self-end rounded-2xl rounded-br-md bg-slate-950 px-4 py-3 text-sm leading-6 text-white">
          Which factors improved retrieval accuracy in the study?
        </div>

        <div className="mt-5 max-w-[95%] rounded-2xl rounded-bl-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-black text-violet-700">
            <ShieldCheck className="size-5" aria-hidden="true" />
            Grounded answer
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            The study reported stronger retrieval when semantic vector search
            was combined with keyword matching, metadata filtering and a
            reranking stage. Citation validation also reduced unsupported
            statements in generated answers.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <CitationCard
              page="Page 12"
              text="Hybrid retrieval increased relevant passage coverage."
            />

            <CitationCard
              page="Page 18"
              text="Reranking improved the ordering of candidate chunks."
            />
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Answer supported by two passages
          </div>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <Search className="size-5 text-slate-400" aria-hidden="true" />

            <span className="flex-1 text-sm text-slate-400">
              Ask a question about these documents
            </span>

            <span className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-bold text-white">
              Ask
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CitationCard({ page, text }: { page: string; text: string }) {
  return (
    <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">
      <p className="text-xs font-black text-violet-700">{page}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}

function SummaryDemo() {
  return (
    <div
      id="demo-panel-summary"
      role="tabpanel"
      aria-labelledby="demo-tab-summary"
    >
      <DemoTitle
        icon={BookOpenCheck}
        title="Structured document summary"
        description="Convert long material into a source-aware overview."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <DemoCard title="Executive summary">
          <p className="text-sm leading-7 text-slate-600">
            The paper evaluates retrieval strategies for grounded language
            models and recommends hybrid search followed by reranking and
            citation verification.
          </p>
        </DemoCard>

        <DemoCard title="Key findings">
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              Hybrid retrieval improved source coverage.
            </li>

            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              Reranking improved result relevance.
            </li>

            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              Citation checks reduced unsupported claims.
            </li>
          </ul>
        </DemoCard>

        <DemoCard title="Important concepts">
          <div className="flex flex-wrap gap-2">
            {[
              "Hybrid search",
              "Embeddings",
              "Reranking",
              "Citation validation",
              "Grounded generation",
            ].map((concept) => (
              <span
                key={concept}
                className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"
              >
                {concept}
              </span>
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Source coverage">
          <div className="space-y-4">
            <CoverageBar label="Introduction" width="92%" />
            <CoverageBar label="Methodology" width="84%" />
            <CoverageBar label="Results" width="96%" />
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

function StudyDemo() {
  return (
    <div id="demo-panel-study" role="tabpanel" aria-labelledby="demo-tab-study">
      <DemoTitle
        icon={GraduationCap}
        title="Source-grounded study studio"
        description="Create quizzes and flashcards from the selected material."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <DemoCard title="Practice question">
          <p className="text-sm font-bold leading-7 text-slate-800">
            Why is reranking useful after hybrid retrieval?
          </p>

          <div className="mt-5 space-y-3">
            {[
              "It compresses the original PDF",
              "It reorders candidate passages by relevance",
              "It creates user accounts",
              "It replaces document extraction",
            ].map((answer, index) => (
              <div
                key={answer}
                className={
                  index === 1
                    ? "rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"
                    : "rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600"
                }
              >
                {String.fromCharCode(65 + index)}. {answer}
              </div>
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Flashcard">
          <div className="grid min-h-64 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 p-7 text-center text-white shadow-xl shadow-indigo-500/20">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-100">
                Question
              </p>

              <p className="mt-5 text-xl font-black leading-8">
                What is hybrid retrieval?
              </p>

              <p className="mt-6 text-sm leading-7 text-white/80">
                Combining semantic and keyword retrieval methods to improve
                source discovery.
              </p>

              <p className="mt-5 text-xs font-bold text-cyan-100">
                Source: Page 12
              </p>
            </div>
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

function GraphDemo() {
  const nodes = [
    {
      label: "Document AI",
      className: "left-1/2 top-7 -translate-x-1/2 bg-slate-950 text-white",
    },
    {
      label: "Hybrid Search",
      className: "left-8 top-40 bg-violet-100 text-violet-800",
    },
    {
      label: "Reranking",
      className: "right-8 top-40 bg-blue-100 text-blue-800",
    },
    {
      label: "Citations",
      className: "bottom-8 left-16 bg-emerald-100 text-emerald-800",
    },
    {
      label: "Verification",
      className: "bottom-8 right-16 bg-cyan-100 text-cyan-800",
    },
  ];

  return (
    <div id="demo-panel-graph" role="tabpanel" aria-labelledby="demo-tab-graph">
      <DemoTitle
        icon={Network}
        title="Interactive knowledge relationships"
        description="Connect topics, concepts and evidence across documents."
      />

      <div className="relative mt-8 min-h-[370px] overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_center,rgba(238,242,255,0.95),white)]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="400"
            y1="75"
            x2="130"
            y2="180"
            stroke="rgba(124,58,237,0.3)"
            strokeWidth="3"
          />
          <line
            x1="400"
            y1="75"
            x2="670"
            y2="180"
            stroke="rgba(37,99,235,0.3)"
            strokeWidth="3"
          />
          <line
            x1="130"
            y1="180"
            x2="180"
            y2="330"
            stroke="rgba(5,150,105,0.3)"
            strokeWidth="3"
          />
          <line
            x1="670"
            y1="180"
            x2="620"
            y2="330"
            stroke="rgba(8,145,178,0.3)"
            strokeWidth="3"
          />
          <line
            x1="180"
            y1="330"
            x2="620"
            y2="330"
            stroke="rgba(99,102,241,0.25)"
            strokeWidth="3"
          />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.label}
            className={`absolute z-10 rounded-2xl border border-white/80 px-4 py-3 text-xs font-black shadow-lg backdrop-blur-xl ${node.className}`}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileSearch;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-700">
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function DemoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="text-sm font-black text-slate-950">{title}</h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CoverageBar({ label, width }: { label: string; width: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span>{label}</span>
        <span>{width}</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
          style={{ width }}
        />
      </div>
    </div>
  );
}
