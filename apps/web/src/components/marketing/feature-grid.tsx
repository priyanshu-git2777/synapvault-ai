import type { LucideIcon } from "lucide-react";

import { GlassPanel } from "@/components/ui/glass-panel";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureGridProps {
  items: FeatureItem[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <GlassPanel
            key={item.title}
            className="group p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white/75"
          >
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-700 transition-transform duration-300 group-hover:scale-110">
              <Icon className="size-5" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-950">
              {item.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </GlassPanel>
        );
      })}
    </div>
  );
}
