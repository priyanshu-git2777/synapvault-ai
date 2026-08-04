import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  FileSearch,
  FileText,
  Network,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

const trustItems = [
  "Grounded answers",
  "Exact citations",
  "Private workspaces",
  "Hybrid retrieval",
];

const coreFeatures = [
  {
    icon: FileSearch,
    title: "Evidence-first answers",
    description:
      "Every answer is connected to the document pages and passages used to produce it.",
  },
  {
    icon: Search,
    title: "Hybrid retrieval",
    description:
      "Semantic vector search, keyword matching and reranking work together for stronger retrieval.",
  },
  {
    icon: ShieldCheck,
    title: "Secure workspaces",
    description:
      "Documents, chats and generated resources stay protected by workspace permissions.",
  },
  {
    icon: Network,
    title: "Connected knowledge",
    description:
      "Transform isolated documents into timelines, comparisons, mind maps and knowledge graphs.",
  },
  {
    icon: BrainCircuit,
    title: "AI study studio",
    description:
      "Generate summaries, flashcards and quizzes while keeping every explanation connected to its source.",
  },
  {
    icon: Bot,
    title: "Specialized AI modes",
    description:
      "Switch between strict evidence, tutor, reviewer, research and comparison workflows.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Upload",
    description:
      "Add PDFs, DOCX, text and Markdown files to a secure workspace.",
    icon: UploadCloud,
  },
  {
    number: "02",
    title: "Process",
    description:
      "SynapVault extracts, cleans, chunks, indexes and connects your content.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Ask",
    description:
      "Ask natural-language questions across one document or an entire workspace.",
    icon: Bot,
  },
  {
    number: "04",
    title: "Verify",
    description:
      "Inspect citations, source passages and evidence coverage before trusting an answer.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <PublicSiteLayout>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/65 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="size-4" />
            Production-grade document intelligence
          </div>

          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
            Your documents become{" "}
            <span className="gradient-text">trusted intelligence.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
            Upload complex documents, ask questions across your knowledge and
            receive grounded answers with exact citations—not unsupported AI
            guesses.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gradient">
              <Link href="/register">
                Start for free
                <ArrowRight />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/features">Explore features</Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-3" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <ProductPreview />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-700">
            One intelligent workspace
          </p>

          <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
            More than another PDF chatbot
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            SynapVault combines document management, reliable retrieval, answer
            verification and practical knowledge tools.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <GlassPanel
                key={feature.title}
                className="group p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white/75"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <GlassPanel strong className="overflow-hidden p-7 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-700">
                Simple workflow
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                From upload to verified answer
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Every step is designed to help users understand where an answer
                came from and whether the available evidence supports it.
              </p>

              <Button asChild variant="gradient" className="mt-8">
                <Link href="/register">
                  Create your workspace
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workflow.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-3xl border border-slate-200/70 bg-white/65 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-violet-600">
                        {step.number}
                      </span>

                      <Icon className="size-5 text-indigo-600" />
                    </div>

                    <h3 className="mt-7 text-xl font-bold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassPanel>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <GlassPanel className="relative overflow-hidden px-6 py-14 text-center sm:px-12">
          <div className="absolute left-1/2 top-0 -z-10 size-80 -translate-x-1/2 rounded-full bg-violet-300/30 blur-3xl" />

          <Quote className="mx-auto size-9 text-violet-600" />

          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
            Build knowledge you can inspect, verify and use.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Start with a secure workspace and turn scattered files into
            searchable, connected and source-grounded intelligence.
          </p>

          <Button asChild variant="gradient" size="lg" className="mt-9">
            <Link href="/register">
              Start building
              <ArrowRight />
            </Link>
          </Button>
        </GlassPanel>
      </section>
    </PublicSiteLayout>
  );
}

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-r from-violet-300/35 via-blue-300/30 to-cyan-300/35 blur-3xl" />

      <GlassPanel strong className="overflow-hidden p-3 sm:p-4">
        <div className="rounded-[1.35rem] border border-slate-200/70 bg-white/80">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Research Workspace
            </span>
          </div>

          <div className="grid min-h-[440px] grid-cols-[90px_1fr] sm:grid-cols-[150px_1fr]">
            <aside className="border-r border-slate-200/70 p-3">
              <div className="rounded-xl bg-violet-100 px-3 py-3 text-xs font-bold text-violet-700">
                New chat
              </div>

              <div className="mt-4 space-y-3">
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                <div className="h-2 w-3/5 rounded-full bg-slate-200" />
              </div>

              <div className="mt-7 hidden rounded-xl border border-slate-200 bg-white p-3 sm:block">
                <FileText className="size-4 text-indigo-600" />
                <p className="mt-2 text-[10px] font-bold text-slate-700">
                  AI Research.pdf
                </p>
                <p className="mt-1 text-[9px] text-emerald-600">Ready</p>
              </div>
            </aside>

            <div className="flex flex-col p-4 sm:p-5">
              <div className="max-w-[88%] self-end rounded-2xl rounded-br-md bg-slate-950 px-4 py-3 text-xs leading-5 text-white">
                What are the paper&apos;s main findings?
              </div>

              <div className="mt-4 max-w-[94%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-700">
                  <BrainCircuit className="size-4" />
                  Verified answer
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-600">
                  The research identifies retrieval quality, citation
                  verification and controlled context selection as major factors
                  affecting grounded AI responses.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700">
                    Page 12
                  </span>
                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                    Page 18
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    Evidence supported
                  </span>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-slate-200" />
                  <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/80 bg-white/75 p-4 shadow-xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-950">
              Evidence validated
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              3 supporting passages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
