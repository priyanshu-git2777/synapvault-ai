import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function FinalCta() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <GlassPanel className="mx-auto max-w-6xl p-8 text-center sm:p-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Start building with SynapVault AI
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Upload your documents, ask questions and receive answers grounded in
          your own content.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/register">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </GlassPanel>
    </section>
  );
}
