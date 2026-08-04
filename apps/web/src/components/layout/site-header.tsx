"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Docs", href: "/docs" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-white/70 bg-white/75 shadow-sm shadow-slate-900/5 backdrop-blur-2xl"
            : "border-transparent bg-white/25 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <BrandLogo />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>

            <Button asChild variant="gradient">
              <Link href="/register">Start for free</Link>
            </Button>
          </div>

          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed right-0 top-20 z-50 h-[calc(100dvh-5rem)] w-[min(88vw,360px)] border-l border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-3xl transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-2xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
          >
            Contact
          </Link>
        </nav>

        <div className="mt-8 grid gap-3 border-t border-slate-200/70 pt-6">
          <Button asChild variant="outline" className="w-full">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              Log in
            </Link>
          </Button>

          <Button asChild variant="gradient" className="w-full">
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              Start for free
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
