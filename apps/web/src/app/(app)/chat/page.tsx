import {
  BrainCircuit,
  FileText,
  MessageSquareText,
  Send,
  Sparkles,
} from "lucide-react";

export default function ChatPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-137px)] max-w-6xl flex-col">
      <div>
        <p className="text-sm font-medium text-cyan-200">
          SynapVault assistant
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          AI Chat
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ask questions using knowledge from your documents.
        </p>
      </div>

      <section className="mt-6 flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
              <BrainCircuit className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                New conversation
              </p>

              <p className="text-xs text-slate-500">
                No documents selected
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
          >
            <FileText className="h-4 w-4" />
            Select sources
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <Sparkles className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Ask your documents anything
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select one or more documents and start a grounded
              conversation with citations.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
              >
                Summarize the main concepts
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
              >
                Find important action items
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-black/10 p-3">
            <MessageSquareText className="mb-2 h-5 w-5 shrink-0 text-slate-500" />

            <textarea
              rows={1}
              placeholder="Ask a question about your documents..."
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-white outline-none placeholder:text-slate-600"
            />

            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-200 text-slate-950 transition hover:bg-cyan-100"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}