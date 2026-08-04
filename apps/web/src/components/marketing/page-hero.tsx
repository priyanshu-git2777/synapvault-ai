import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border border-violet-200/80 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 shadow-sm backdrop-blur-xl">
          {eyebrow}
        </div>

        <h1 className="mt-7 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="lg">
            <Link href="/register">
              Start for free
              <ArrowRight />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </div>
      </div>

      {children}
    </section>
  );
}
