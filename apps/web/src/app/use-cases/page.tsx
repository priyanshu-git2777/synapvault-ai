import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Code2,
  FileCheck2,
  GraduationCap,
  Landmark,
  Microscope,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import {
  FeatureGrid,
  type FeatureItem,
} from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Discover how students, researchers, engineers and teams can use SynapVault AI.",
};

const useCases: FeatureItem[] = [
  {
    icon: GraduationCap,
    title: "Students and educators",
    description:
      "Turn course material into explanations, revision notes, flashcards and source-backed tests.",
  },
  {
    icon: Microscope,
    title: "Researchers",
    description:
      "Compare papers, track claims, find conflicting evidence and map relationships between sources.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business teams",
    description:
      "Search policies, reports, procedures, meeting material and internal knowledge from one workspace.",
  },
  {
    icon: FileCheck2,
    title: "Document reviewers",
    description:
      "Compare versions, identify missing information and inspect risky or inconsistent statements.",
  },
  {
    icon: Code2,
    title: "Engineering teams",
    description:
      "Search technical documentation, architecture decisions, API references and project knowledge.",
  },
  {
    icon: Landmark,
    title: "Regulated organizations",
    description:
      "Use controlled workspaces, audit activity and strict evidence requirements for sensitive material.",
  },
];

export default function UseCasesPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="Use cases"
        title="Built for people who need reliable answers"
        description="From study material to internal company knowledge, SynapVault helps users find information without losing connection to the original evidence."
      >
        <FeatureGrid items={useCases} />
      </PageHero>
    </PublicSiteLayout>
  );
}
