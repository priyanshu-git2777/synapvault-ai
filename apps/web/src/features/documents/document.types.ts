export type DocumentStatus =
  | "READY"
  | "PROCESSING"
  | "FAILED";

export type DocumentItem = {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "TXT";
  size: string;
  pageCount?: number;
  status: DocumentStatus;
  uploadedAt: string;
};
