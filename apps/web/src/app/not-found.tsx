import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function NotFoundPage() {
  return (
    <PublicSiteLayout>
      <section className="mx-auto grid min-h-[70vh] w-full max-w-7xl place-items-center px-5 py-20 sm:px-8">
        <GlassPanel strong className="w-full max-w-2xl p-8 text-center sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-violet-100 text-violet-700">
            <FileQuestion className="size-8" />
          </div>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-violet-700">
            Error 404
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            This page could not be found.
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-8 text-slate-600">
            The address may be incorrect, or the page may have been moved.
          </p>

          <Button asChild variant="gradient" className="mt-8">
            <Link href="/">
              <ArrowLeft />
              Return home
            </Link>
          </Button>
        </GlassPanel>
      </section>
    </PublicSiteLayout>
  );
}
