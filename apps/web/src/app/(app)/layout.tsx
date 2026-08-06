import type { ReactNode } from "react";

import { ProtectedAppShell } from "@/components/layout/protected-app-shell";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <ProtectedAppShell>
      {children}
    </ProtectedAppShell>
  );
}