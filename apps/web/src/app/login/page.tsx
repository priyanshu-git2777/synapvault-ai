import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your SynapVault AI account.",
};

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="gradient-orb gradient-orb-one -z-10" />
      <div className="gradient-orb gradient-orb-two -z-10" />

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
          <div className="grid size-12 place-items-center rounded-2xl bg-violet-100 text-violet-700">
            <LockKeyhole className="size-5" />
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Authentication will connect to the Spring Boot backend in the
            authentication phase.
          </p>

          <form className="mt-7 space-y-5">
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-800"
                >
                  Password
                </label>

                <span className="text-xs font-semibold text-slate-400">
                  Available in Part 7
                </span>
              </div>

              <input
                id="password"
                type="password"
                disabled
                placeholder="••••••••"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 text-sm outline-none disabled:cursor-not-allowed"
              />
            </div>

            <Button disabled variant="gradient" className="w-full">
              Log in
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-violet-700 hover:text-violet-800"
            >
              Create one
            </Link>
          </p>
        </GlassPanel>
      </div>
    </main>
  );
}
