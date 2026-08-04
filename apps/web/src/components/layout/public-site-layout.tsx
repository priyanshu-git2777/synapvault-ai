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
      <AnimatedGradientBackground />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
