import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
}

export function GlassPanel({
  className,
  strong = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border shadow-[0_24px_80px_rgba(30,41,59,0.10)] backdrop-blur-2xl",
        strong ? "border-white/90 bg-white/78" : "border-white/70 bg-white/55",
        className,
      )}
      {...props}
    />
  );
}
