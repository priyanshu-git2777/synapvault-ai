import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/15 hover:bg-white/[0.055]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-slate-400" />
      </div>

      <p className="mt-5 text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </article>
  );
}