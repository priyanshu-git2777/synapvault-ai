import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  FileSearch,
  ShieldCheck,
  Target,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why SynapVault AI is being built and what engineering principles guide the project.",
};

const principles = [
  {
    icon: FileSearch,
    title: "Evidence before confidence",
    description:
      "Answers should show the source material supporting them instead of presenting unsupported certainty.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    description:
      "Security, deletion and authorization should be part of the architecture rather than late additions.",
  },
  {
    icon: Code2,
    title: "Real engineering",
    description:
      "The platform is being built with production services, database migrations, testing and deployment workflows.",
  },
  {
    icon: BrainCircuit,
    title: "Practical intelligence",
    description:
      "AI should help users study, research, compare and understand—not merely create attractive demonstrations.",
  },
];

export default function AboutPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="About SynapVault"
        title="Building trustworthy document intelligence"
        description="SynapVault AI is a full-stack engineering project focused on turning documents into searchable, connected and verifiable knowledge."
      />

      <section className="mx-auto -mt-6 w-full max-w-7xl px-5 pb-20 sm:px-8">
        <GlassPanel strong className="p-7 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-xl shadow-indigo-500/20">
                <Target className="size-6" aria-hidden="true" />
              </div>

              <h2 className="mt-7 text-3xl font-black tracking-[-0.035em] text-slate-950">
                The mission
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Make large document collections easier to understand while
                preserving the user&apos;s ability to inspect evidence, control
                access and remove their data.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                The project combines Java backend engineering, Python AI
                processing, modern frontend development, search systems,
                databases, security and cloud deployment.
              </p>

              <Button asChild variant="gradient" className="mt-8">
                <Link href="/features">
                  Explore the product
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="rounded-2xl border border-slate-200/70 bg-white/65 p-5"
                  >
                    <Icon
                      className="size-5 text-violet-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-4 font-black text-slate-950">
                      {principle.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassPanel>
      </section>
    </PublicSiteLayout>
  );
}
