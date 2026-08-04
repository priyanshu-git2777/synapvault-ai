import type { Metadata } from "next";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { GlassPanel } from "@/components/ui/glass-panel";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the development-stage terms for the SynapVault AI website.",
};

export default function TermsPage() {
  return (
    <PublicSiteLayout>
      <article className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <header>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl">
            Terms of Service
          </h1>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            Development-stage terms — Last updated August 4, 2026
          </p>
        </header>

        <GlassPanel strong className="mt-10 p-6 sm:p-10">
          <LegalSection title="1. Development-stage website">
            SynapVault AI is under active development. Current pages and product
            demonstrations may describe features that are planned but not yet
            available.
          </LegalSection>

          <LegalSection title="2. No active account service">
            Registration, login, document processing, billing and production AI
            services are not yet active. Disabled controls are shown to
            communicate future product structure.
          </LegalSection>

          <LegalSection title="3. Acceptable use">
            Once interactive services are enabled, users must not upload
            unlawful content, malware, stolen data, material they have no right
            to process or content intended to attack service infrastructure.
          </LegalSection>

          <LegalSection title="4. User content">
            Users will remain responsible for the documents and prompts they
            provide. Production terms will explain service permissions needed to
            store, process and retrieve that content.
          </LegalSection>

          <LegalSection title="5. AI limitations">
            AI-generated responses may be incomplete or incorrect. Users must
            inspect citations and apply independent judgment, particularly for
            legal, medical, financial, academic or safety-critical decisions.
          </LegalSection>

          <LegalSection title="6. Intellectual property">
            The SynapVault name, interface, source code and original product
            material are protected by applicable intellectual-property rules.
            Third-party libraries remain subject to their own licenses.
          </LegalSection>

          <LegalSection title="7. Availability">
            Development environments may be changed, reset or temporarily
            unavailable without notice. Production uptime commitments do not
            currently exist.
          </LegalSection>

          <LegalSection title="8. Payments">
            No payment service is active. Future paid plans, refunds,
            cancellation and renewal terms will be added before checkout is
            enabled.
          </LegalSection>

          <LegalSection title="9. Termination">
            Future production terms will permit suspension or termination for
            abuse, security threats, unlawful use or repeated violation of
            product policies.
          </LegalSection>

          <LegalSection title="10. Changes">
            These development-stage terms may change as features and legal
            requirements are finalized. The latest revision date will appear at
            the top of the page.
          </LegalSection>

          <LegalSection title="11. Contact">
            Questions may be directed to {siteConfig.supportEmail}. This address
            must be configured before the website is publicly deployed.
          </LegalSection>
        </GlassPanel>
      </article>
    </PublicSiteLayout>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200/70 py-7 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>

      <p className="mt-3 text-sm leading-8 text-slate-600">{children}</p>
    </section>
  );
}
