import type { Metadata } from "next";
import {
  DatabaseBackup,
  FileLock2,
  Fingerprint,
  KeyRound,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import {
  FeatureGrid,
  type FeatureItem,
} from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn about the security principles guiding the SynapVault AI architecture.",
};

const securityItems: FeatureItem[] = [
  {
    icon: FileLock2,
    title: "Private document storage",
    description:
      "Uploaded files remain private and are accessed through controlled application permissions.",
  },
  {
    icon: Fingerprint,
    title: "Strong authentication",
    description:
      "Authentication will include password hashing, token rotation, session revocation and account protection.",
  },
  {
    icon: KeyRound,
    title: "Role-based authorization",
    description:
      "Workspace owners control who can view, upload, edit, share and administer content.",
  },
  {
    icon: ScanSearch,
    title: "Upload validation",
    description:
      "Files will be checked for allowed type, actual content signature, size and processing safety.",
  },
  {
    icon: DatabaseBackup,
    title: "Data lifecycle controls",
    description:
      "Users will be able to export or permanently delete documents, chats, vectors and account information.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence safeguards",
    description:
      "Strict retrieval and citation checks reduce unsupported AI responses and misleading claims.",
  },
];

export default function SecurityPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="Security by design"
        title="Your knowledge should remain under your control"
        description="SynapVault is being designed with tenant isolation, controlled document access, secure storage and complete deletion workflows."
      >
        <FeatureGrid items={securityItems} />
      </PageHero>
    </PublicSiteLayout>
  );
}
