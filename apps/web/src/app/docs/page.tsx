import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Database,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { PageHero } from "@/components/marketing/page-hero";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Explore the planned SynapVault AI product and developer documentation.",
};

const sections = [
  {
    icon: Rocket,
    title: "Getting started",
    description:
      "Account setup, workspaces, document upload and your first grounded question.",
  },
  {
    icon: Search,
    title: "Document retrieval",
    description:
      "How hybrid search, metadata filtering, reranking and citations work.",
  },
  {
    icon: Database,
    title: "Document processing",
    description:
      "Extraction, OCR, chunking, embedding generation and indexing.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Permissions, tenant isolation, private sharing and data deletion.",
  },
  {
    icon: Braces,
    title: "API reference",
    description:
      "REST endpoints, authentication, request models and error responses.",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description:
      "Practical guides for research, study, comparison and team workflows.",
  },
];

export default function DocsPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="Documentation"
        title="Understand how SynapVault works"
        description="This documentation hub is now part of the real route structure. Detailed guides will be added as each backend feature is implemented."
      />

      <section className="mx-auto -mt-8 grid w-full max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <GlassPanel
              key={section.title}
              className="group p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/75"
            >
              <Icon className="size-6 text-violet-700" />

              <h2 className="mt-5 text-xl font-bold text-slate-950">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {section.description}
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:gap-3"
              >
                Request information
                <ArrowRight className="size-4" />
              </Link>
            </GlassPanel>
          );
        })}
      </section>
    </PublicSiteLayout>
  );
}
