import Link from "next/link";
import { BrainCircuit } from "lucide-react";

interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="SynapVault AI home"
      className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <BrainCircuit className="size-5" aria-hidden="true" />
        <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-slate-950">
            SynapVault
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-600">
            AI
          </span>
        </span>
      )}
    </Link>
  );
}
