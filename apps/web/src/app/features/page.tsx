import type { Metadata } from "next";
import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  FileSearch,
  GitCompareArrows,
  GraduationCap,
  Languages,
  Network,
  ScanText,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import {
  FeatureGrid,
  type FeatureItem,
} from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the document intelligence, retrieval and collaboration capabilities planned for SynapVault AI.",
};

const features: FeatureItem[] = [
  {
    icon: FileSearch,
    title: "Citation-based document chat",
    description:
      "Ask questions across selected documents and inspect the exact pages used for every grounded answer.",
  },
  {
    icon: Search,
    title: "Hybrid retrieval",
    description:
      "Combine vector similarity, keyword search, metadata filtering and reranking.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Evidence Mode",
    description:
      "Prevent unsupported responses by requiring sufficient document evidence before an answer is produced.",
  },
  {
    icon: ScanText,
    title: "OCR and visual extraction",
    description:
      "Process scanned pages, screenshots, tables and document images.",
  },
  {
    icon: GitCompareArrows,
    title: "Document comparison",
    description:
      "Find changed statements, contradictions, missing clauses and numerical differences.",
  },
  {
    icon: Network,
    title: "Knowledge graphs",
    description:
      "Connect people, concepts, events, organizations and source passages.",
  },
  {
    icon: GraduationCap,
    title: "Study studio",
    description:
      "Generate source-grounded quizzes, explanations, flashcards and revision material.",
  },
  {
    icon: BookOpenCheck,
    title: "Research workspace",
    description:
      "Organize claims, evidence, notes, citations, questions and source groups.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Share secure workspaces and manage members through role-based permissions.",
  },
  {
    icon: Languages,
    title: "Multilingual answers",
    description:
      "Ask in one language and receive grounded explanations in another.",
  },
  {
    icon: BarChart3,
    title: "Workspace analytics",
    description:
      "Inspect document usage, processing performance, common questions and AI consumption.",
  },
  {
    icon: BrainCircuit,
    title: "Specialized AI modes",
    description:
      "Choose tutor, reviewer, research, comparison or strict evidence behavior.",
  },
];

export default function FeaturesPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="Product capabilities"
        title="A complete intelligence layer for your documents"
        description="SynapVault brings retrieval, verification, organization and practical AI workflows into one secure platform."
      >
        <FeatureGrid items={features} />
      </PageHero>
    </PublicSiteLayout>
  );
}
