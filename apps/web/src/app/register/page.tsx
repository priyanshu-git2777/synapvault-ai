import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your SynapVault AI account.",
};

export default function RegisterPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="gradient-orb gradient-orb-three -z-10" />
      <div className="gradient-orb gradient-orb-four -z-10" />

      <div className="w-full max-w-md">
        <div className="mb-7 flex items-center justify-between">
          <BrandLogo />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>

        <GlassPanel strong className="p-7 sm:p-9">
          <div className="grid size-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-700">
            <UserPlus className="size-5" />
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Account registration becomes active after the secure Spring Boot
            authentication API is completed.
          </p>

          <form className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-800"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                disabled
                placeholder="Your full name"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 text-sm outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-bold text-slate-800"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                disabled
                placeholder="you@example.com"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 text-sm outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-bold text-slate-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                disabled
                placeholder="Minimum 8 characters"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 text-sm outline-none disabled:cursor-not-allowed"
              />
            </div>

            <Button disabled variant="gradient" className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-700 hover:text-violet-800"
            >
              Log in
            </Link>
          </p>
        </GlassPanel>
      </div>
    </main>
  );
}
