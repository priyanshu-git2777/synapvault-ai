"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, MessageSquareText, Send } from "lucide-react";

import { PublicSiteLayout } from "@/components/layout/public-site-layout";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PublicSiteLayout>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 backdrop-blur-xl">
            Contact
          </div>

          <h1 className="mt-7 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl">
            Let&apos;s discuss your document workflow.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
            Share your use case, product feedback or collaboration idea. The
            backend email delivery will be connected in the authentication and
            communication phase.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="size-5 text-violet-700" />
              Product and technical enquiries
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <MessageSquareText className="size-5 text-violet-700" />
              Feature and workflow feedback
            </div>
          </div>
        </div>

        <GlassPanel strong className="p-6 sm:p-8">
          {submitted ? (
            <div className="grid min-h-[430px] place-items-center text-center">
              <div>
                <CheckCircle2 className="mx-auto size-14 text-emerald-600" />

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  Form validation is working
                </h2>

                <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                  Your message was accepted by the frontend. Actual email
                  delivery will be connected to the backend in a later part.
                </p>

                <Button
                  variant="outline"
                  className="mt-7"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-800"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  placeholder="Your full name"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white/75 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
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
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white/75 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-slate-800"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  minLength={4}
                  placeholder="What would you like to discuss?"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white/75 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-slate-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Describe your use case or question."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white/75 p-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <Button type="submit" variant="gradient" className="w-full">
                Submit message
                <Send />
              </Button>
            </form>
          )}
        </GlassPanel>
      </section>
    </PublicSiteLayout>
  );
}
