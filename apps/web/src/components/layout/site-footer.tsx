import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { BrandLogo } from "@/components/brand/brand-logo";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Contact", href: "/contact" },
  { label: "Sign in", href: "/login" },
  { label: "Create account", href: "/register" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/70 bg-white/35 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandLogo />

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            Turn documents into trusted, connected intelligence with grounded
            answers, exact citations and secure collaborative workspaces.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950"
            >
              <FaGithub className="size-4" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950"
            >
              <FaLinkedin className="size-4" />
            </a>

            <Link
              href="/contact"
              aria-label="Contact SynapVault"
              className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/60 text-slate-600 transition hover:-translate-y-0.5 hover:text-slate-950"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-slate-950">Product</h2>

          <div className="mt-5 grid gap-3">
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-slate-600 transition hover:text-violet-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-slate-950">Resources</h2>

          <div className="mt-5 grid gap-3">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-slate-600 transition hover:text-violet-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
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
