import Link from "next/link";
import type { ReactNode } from "react";
import { BrainCircuit, CheckCircle2 } from "lucide-react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

const benefits = [
  "Chat with documents using trusted sources",
  "Organize knowledge inside secure workspaces",
  "Generate answers with clear citations",
];

export function AuthShell({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthShellProps) {
  return (
    <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
      <div className="hidden border-r border-white/10 bg-white/[0.04] p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
              <BrainCircuit className="h-6 w-6" />
            </span>

            <span>
              <span className="block text-lg font-semibold">
                SynapVault AI
              </span>
              <span className="block text-xs text-slate-400">
                Connected document intelligence
              </span>
            </span>
          </Link>

          <div className="mt-16">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
              Your knowledge workspace
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight text-white">
              Turn every document into trusted, connected intelligence.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-300">
              Upload documents, ask questions and discover useful information
              without searching through every page manually.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-950/40 p-6 sm:p-10 lg:p-12">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-3 text-white lg:hidden"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
            <BrainCircuit className="h-5 w-5" />
          </span>

          <span className="font-semibold">SynapVault AI</span>
        </Link>

        <div className="mx-auto w-full max-w-md">
          <div>
            <p className="text-sm font-medium text-cyan-300">
              Welcome to SynapVault
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 leading-7 text-slate-400">{description}</p>
          </div>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}