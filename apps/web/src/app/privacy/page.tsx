import type { Metadata } from "next";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { GlassPanel } from "@/components/ui/glass-panel";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the development-stage privacy policy for SynapVault AI.",
};

export default function PrivacyPage() {
  return (
    <PublicSiteLayout>
      <article className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <header>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            Development-stage policy — Last updated August 4, 2026
          </p>
        </header>

        <GlassPanel strong className="mt-10 p-6 sm:p-10">
          <LegalSection title="1. Current product status">
            SynapVault AI is currently under active development. The public
            website does not yet provide active user registration, document
            upload, payment processing or production AI services.
          </LegalSection>

          <LegalSection title="2. Information currently collected">
            The current frontend does not intentionally store submitted contact
            form information on a server. Contact form behavior is presently a
            local interface demonstration. Standard hosting logs may be
            introduced when the website is deployed.
          </LegalSection>

          <LegalSection title="3. Future account information">
            When authentication is activated, the service may process account
            information such as name, email address, password hash, session
            information, workspace membership and user preferences.
          </LegalSection>

          <LegalSection title="4. Future document processing">
            When document upload becomes available, SynapVault may process
            original files, extracted text, document metadata, text chunks,
            vector embeddings, summaries, chat messages and generated learning
            materials.
          </LegalSection>

          <LegalSection title="5. Purpose of processing">
            Information will be processed to provide secure accounts, document
            storage, search, grounded AI responses, collaboration, service
            reliability, abuse prevention and user-requested data exports or
            deletion.
          </LegalSection>

          <LegalSection title="6. Data sharing">
            The production service may use infrastructure and AI providers
            required for storage, email delivery, monitoring and model
            inference. Provider details will be documented before those
            integrations are activated.
          </LegalSection>

          <LegalSection title="7. Data deletion">
            The planned product will allow users to delete documents,
            conversations, generated vectors and account information. The final
            deletion and backup-retention policy will be published before
            production release.
          </LegalSection>

          <LegalSection title="8. Security">
            Planned controls include password hashing, session revocation,
            private storage, tenant-aware authorization, signed file access,
            rate limiting and audit logging. No system can guarantee absolute
            security.
          </LegalSection>

          <LegalSection title="9. Children">
            The production service is not currently designed specifically for
            children. Age and consent requirements will be finalized before
            commercial release.
          </LegalSection>

          <LegalSection title="10. Policy updates">
            This policy will be updated as production features and providers are
            introduced. The latest revision date will be displayed at the top of
            this page.
          </LegalSection>

          <LegalSection title="11. Contact">
            Privacy questions can be directed to {siteConfig.supportEmail}. This
            address is a planned product address and must be configured before
            public deployment.
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
