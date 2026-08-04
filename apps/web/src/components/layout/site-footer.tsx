import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/lib/site-config";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Create account", href: "/register" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/70 bg-white/35 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo />

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            Turn documents into trusted, connected intelligence with grounded
            answers, exact citations and secure collaborative workspaces.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="SynapVault creator on GitHub"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <FaGithub className="size-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="SynapVault creator on LinkedIn"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <FaLinkedin className="size-4" aria-hidden="true" />
            </a>

            <Link
              href="/contact"
              aria-label="Contact SynapVault"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <Mail className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Resources" links={resourceLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>

      <div className="border-t border-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} SynapVault AI. All rights reserved.
          </p>

          <p>Built for trustworthy document intelligence.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}) {
  return (
    <div>
      <h2 className="font-black text-slate-950">{title}</h2>

      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-sm text-slate-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
