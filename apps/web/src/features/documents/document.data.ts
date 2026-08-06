import type { DocumentItem } from "./document.types";

export const sampleDocuments: DocumentItem[] = [
  {
    id: "document-1",
    name: "Backend System Design Notes.pdf",
    type: "PDF",
    size: "4.8 MB",
    pageCount: 42,
    status: "READY",
    uploadedAt: "Today, 10:32 AM",
  },
  {
    id: "document-2",
    name: "Java Interview Preparation.pdf",
    type: "PDF",
    size: "7.2 MB",
    pageCount: 68,
    status: "READY",
    uploadedAt: "Yesterday, 8:15 PM",
  },
  {
    id: "document-3",
    name: "Product Requirements.docx",
    type: "DOCX",
    size: "1.4 MB",
    pageCount: 16,
    status: "PROCESSING",
    uploadedAt: "Yesterday, 4:20 PM",
  },
  {
    id: "document-4",
    name: "Computer Networks Notes.pdf",
    type: "PDF",
    size: "5.1 MB",
    pageCount: 51,
    status: "READY",
    uploadedAt: "August 4, 2026",
  },
];