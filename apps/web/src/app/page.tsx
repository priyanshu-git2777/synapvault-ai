import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  FileSearch,
  GitCompareArrows,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { InteractiveProductDemo } from "@/components/marketing/interactive-product-demo";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SecurityOverview } from "@/components/marketing/security-overview";
import { SupportedFileTypes } from "@/components/marketing/supported-file-types";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Trusted Document Intelligence",
  description:
    "Upload documents, ask grounded questions and inspect exact source citations with SynapVault AI.",
};

const benefits = [
  "Grounded answers",
  "Exact citations",
  "Private workspaces",
  "Hybrid retrieval",
];

const features = [
  {
    icon: FileSearch,
    title: "Evidence-based chat",
    description:
      "Ask questions while keeping every answer connected to its supporting pages and passages.",
  },
  {
    icon: Search,
    title: "Hybrid retrieval",
    description:
      "Combine semantic search, keyword matching, metadata filters and reranking.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Evidence Mode",
    description:
      "Refuse unsupported answers when the selected documents do not contain enough evidence.",
  },
  {
    icon: GitCompareArrows,
    title: "Document comparison",
    description:
      "Identify changed statements, missing sections, numerical differences and contradictions.",
  },
  {
    icon: Network,
    title: "Knowledge connections",
    description:
      "Transform isolated files into timelines, concepts, mind maps and relationship graphs.",
  },
  {
    icon: BrainCircuit,
    title: "Study and research tools",
    description:
      "Generate summaries, quizzes, flashcards and research notes connected to their sources.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Upload securely",
    description:
      "Add supported documents to a private workspace with validation and processing status.",
  },
  {
    number: "02",
    title: "Extract and index",
    description:
      "Text is cleaned, split into meaningful chunks and prepared for hybrid retrieval.",
  },
  {
    number: "03",
    title: "Ask naturally",
    description:
      "Ask questions across one document, selected documents or an entire workspace.",
  },
  {
    number: "04",
    title: "Inspect evidence",
    description:
      "Open source pages and verify whether the retrieved material supports the response.",
  },
];

export default function HomePage() {
  return (
    <PublicSiteLayout>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/65 px-4 py-2 text-xs font-black text-violet-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="size-4" aria-hidden="true" />
            Production-focused document intelligence
          </div>

          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
            Your documents become{" "}
            <span className="gradient-text">trusted intelligence.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
            Upload complex documents, ask questions across your knowledge and
            receive grounded answers with exact citations instead of unsupported
            AI guesses.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gradient">
              <Link href="/register">
                Start for free
                <ArrowRight />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="#product-demo">View product demo</Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
              >
                <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-3" aria-hidden="true" />
                </span>

                {benefit}
              </div>
            ))}
          </div>
        </div>

        <HeroPreview />
      </section>

      <TrustStrip />

      <section
        id="product-demo"
        aria-labelledby="product-demo-heading"
        className="scroll-mt-24 py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Interactive preview"
            title="See how the complete product will work"
            description="Explore the planned document chat, summarization, study and knowledge-graph experiences through an honest frontend demonstration."
          />

          <InteractiveProductDemo />
        </div>
      </section>

      <section
        aria-labelledby="capabilities-heading"
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <SectionHeading
          eyebrow="Core capabilities"
          title="More than another PDF chatbot"
          description="SynapVault combines reliable retrieval, answer verification, document management and practical knowledge workflows."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <GlassPanel
                key={feature.title}
                className="group p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white/75"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-black text-slate-950">
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
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Simple workflow"
                title="From upload to verified answer"
                description="Every step helps users understand where an answer came from and whether the available evidence supports it."
                align="left"
              />

              <Button asChild variant="gradient" className="mt-8">
                <Link href="/register">
                  Create your workspace
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workflow.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-slate-200/70 bg-white/65 p-6"
                >
                  <span className="text-sm font-black text-violet-600">
                    {step.number}
                  </span>

                  <h3 className="mt-7 text-xl font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>

      <SupportedFileTypes />
      <SecurityOverview />
      <FaqSection />
      <FinalCta />
    </PublicSiteLayout>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-r from-violet-300/35 via-blue-300/30 to-cyan-300/35 blur-3xl"
        aria-hidden="true"
      />

      <GlassPanel strong className="overflow-hidden p-3 sm:p-4">
        <div className="rounded-[1.35rem] border border-slate-200/70 bg-white/85">
          <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>

            <span className="text-xs font-bold text-slate-500">
              Research Workspace
            </span>
          </div>

          <div className="grid min-h-[440px] grid-cols-[88px_1fr] sm:grid-cols-[145px_1fr]">
            <aside className="border-r border-slate-200/70 bg-slate-50/60 p-3">
              <div className="rounded-xl bg-violet-100 px-3 py-3 text-xs font-black text-violet-700">
                New chat
              </div>

              <div className="mt-5 space-y-3">
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                <div className="h-2 w-3/5 rounded-full bg-slate-200" />
              </div>
            </aside>

            <div className="flex min-w-0 flex-col p-4 sm:p-5">
              <div className="max-w-[90%] self-end rounded-2xl rounded-br-md bg-slate-950 px-4 py-3 text-xs leading-5 text-white">
                What improved answer accuracy?
              </div>

              <div className="mt-4 max-w-[96%] rounded-2xl rounded-bl-md border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black text-violet-700">
                  <Bot className="size-4" aria-hidden="true" />
                  Verified answer
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-600">
                  Hybrid retrieval, reranking and citation validation improved
                  the quality of grounded responses.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
                    Page 12
                  </span>

                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    Page 18
                  </span>

                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    Supported
                  </span>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-slate-200" />

                  <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>

          <div>
            <p className="text-xs font-black text-slate-950">
              Evidence validated
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Two supporting passages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
