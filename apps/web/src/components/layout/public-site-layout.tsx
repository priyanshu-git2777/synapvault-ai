import type { ReactNode } from "react";

import { AnimatedGradientBackground } from "@/components/background/animated-gradient-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface PublicSiteLayoutProps {
  children: ReactNode;
}

export function PublicSiteLayout({ children }: PublicSiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl transition focus:translate-y-0"
      >
        Skip to main content
      </a>

      <AnimatedGradientBackground />
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
