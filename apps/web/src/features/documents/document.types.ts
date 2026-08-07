export type DocumentStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "READY"
  | "FAILED";

export type DocumentItem = {
  id: number;
  name: string;
  contentType: string;
  fileSize: number;
  status: DocumentStatus;
  pageCount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DocumentCountResponse = {
  total: number;
};