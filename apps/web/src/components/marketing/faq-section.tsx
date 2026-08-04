import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";

const questions = [
  {
    question: "Is SynapVault already connected to an AI backend?",
    answer:
      "Not yet. The public interface and product architecture are being built first. The Spring Boot backend, Python AI service, document processing and RAG pipeline will be implemented in later project parts.",
  },
  {
    question: "Will answers include document citations?",
    answer:
      "Yes. The production chat workflow will store page and chunk metadata so users can open the exact source passage supporting an answer.",
  },
  {
    question: "Which files will the first version support?",
    answer:
      "The first production version will focus on PDF, DOCX, TXT and Markdown files. PPTX, spreadsheets, images and source-code files will be introduced only after their extraction pipelines are fully tested.",
  },
  {
    question: "Will documents remain private?",
    answer:
      "The planned architecture uses private object storage, workspace authorization, tenant filtering and signed file access. Users will also receive complete deletion controls.",
  },
  {
    question: "What happens when the documents do not contain an answer?",
    answer:
      "Strict Evidence Mode will refuse to invent an answer. It will explain that the selected documents do not provide enough supporting evidence.",
  },
  {
    question: "Can users chat across multiple documents?",
    answer:
      "Yes. Users will be able to select a document, a folder or an entire workspace while preserving document-level permission and citation filters.",
  },
  {
    question: "Will the platform support teams?",
    answer:
      "Yes. Team workspaces will include owner, administrator, member and viewer roles, along with invitations, sharing controls and activity history.",
  },
  {
    question: "Is the pricing checkout working now?",
    answer:
      "No. Current pricing pages describe planned product tiers. Real checkout, webhook processing and subscription enforcement will be implemented during the billing phase.",
  },
];

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8"
    >
      <SectionHeading
        eyebrow="Frequently asked questions"
        title="Clear answers about the product"
        description="These answers describe the planned production behavior and clearly separate completed frontend work from future backend functionality."
      />

      <div className="mt-14 space-y-4">
        {questions.map((item, index) => (
          <details
            key={item.question}
            name="synapvault-faq"
            open={index === 0}
            className="group rounded-2xl border border-white/75 bg-white/60 shadow-sm backdrop-blur-xl open:bg-white/80"
          >
            <summary className="flex list-none cursor-pointer items-center justify-between gap-5 rounded-2xl px-5 py-5 text-left font-black text-slate-900 outline-none transition focus-visible:ring-2 focus-visible:ring-violet-500 sm:px-6">
              <span>{item.question}</span>

              <ChevronDown
                className="size-5 shrink-0 text-violet-600 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <div className="border-t border-slate-200/70 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
