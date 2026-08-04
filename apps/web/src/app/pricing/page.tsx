import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Review the planned Free, Pro and Team plans for SynapVault AI.",
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Explore document intelligence for personal learning.",
    features: [
      "Limited monthly document processing",
      "Single personal workspace",
      "Document chat with citations",
      "Basic summaries",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Coming soon",
    description: "For professionals with larger knowledge collections.",
    features: [
      "Higher storage and processing limits",
      "Advanced RAG and reranking",
      "Document comparison",
      "Quizzes and flashcards",
      "Knowledge graphs and exports",
    ],
    highlighted: true,
  },
  {
    name: "Team",
    price: "Coming soon",
    description: "For secure collaboration and shared intelligence.",
    features: [
      "Shared workspaces",
      "Member roles and permissions",
      "Team analytics",
      "Audit history",
      "Priority support",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <PublicSiteLayout>
      <PageHero
        eyebrow="Transparent plans"
        title="Start free and scale when your knowledge grows"
        description="Payments are not active yet. Billing will be implemented as a complete production feature in a later project phase."
      />

      <section className="mx-auto -mt-8 grid w-full max-w-7xl gap-5 px-5 pb-20 sm:px-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <GlassPanel
            key={plan.name}
            strong={plan.highlighted}
            className={
              plan.highlighted
                ? "relative border-violet-300 p-7 ring-4 ring-violet-100/70"
                : "p-7"
            }
          >
            {plan.highlighted && (
              <span className="absolute right-5 top-5 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                Recommended
              </span>
            )}

            <h2 className="text-xl font-bold text-slate-950">{plan.name}</h2>

            <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">
              {plan.price}
            </p>

            <p className="mt-4 min-h-14 text-sm leading-7 text-slate-600">
              {plan.description}
            </p>

            <Button
              asChild
              variant={plan.highlighted ? "gradient" : "outline"}
              className="mt-7 w-full"
            >
              <Link href="/register">Create free account</Link>
            </Button>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="size-3" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
      </section>
    </PublicSiteLayout>
  );
}
