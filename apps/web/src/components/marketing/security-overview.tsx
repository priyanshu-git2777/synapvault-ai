import Link from "next/link";
import {
  ArrowRight,
  DatabaseBackup,
  FileLock2,
  KeyRound,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

const protections = [
  {
    icon: FileLock2,
    title: "Private object storage",
    description:
      "Uploaded documents will use controlled access and signed download links.",
  },
  {
    icon: UserRoundCheck,
    title: "Workspace permissions",
    description:
      "Owners will control who can view, upload, edit, share and administer content.",
  },
  {
    icon: KeyRound,
    title: "Secure authentication",
    description:
      "Access tokens, refresh-token rotation and session revocation will protect accounts.",
  },
  {
    icon: ScanSearch,
    title: "File validation",
    description:
      "Type, size, signature and processing checks will run before document acceptance.",
  },
  {
    icon: DatabaseBackup,
    title: "Data lifecycle controls",
    description:
      "Users will be able to export or permanently delete their documents and account data.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence safeguards",
    description:
      "Strict retrieval and citation validation will reduce unsupported AI answers.",
  },
];

export function SecurityOverview() {
  return (
    <section
      aria-labelledby="security-overview-heading"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
    >
      <GlassPanel strong className="overflow-hidden p-7 sm:p-10 lg:p-14">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Security and privacy"
              title="Trust requires more than accurate answers"
              description="SynapVault is being designed with secure storage, tenant-aware authorization, complete deletion workflows and evidence-first AI behavior."
              align="left"
            />

            <Button asChild variant="gradient" className="mt-8">
              <Link href="/security">
                Read the security approach
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {protections.map((protection) => {
              const Icon = protection.icon;

              return (
                <div
                  key={protection.title}
                  className="rounded-2xl border border-slate-200/70 bg-white/65 p-5"
                >
                  <Icon className="size-5 text-violet-700" aria-hidden="true" />

                  <h3 className="mt-4 text-sm font-black text-slate-950">
                    {protection.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {protection.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
